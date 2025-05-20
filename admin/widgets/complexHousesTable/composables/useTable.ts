import type { ComplexFilter, Complex } from "@/shared/api/generated";
import {
  useComplexHousesQuery,
  useDeleteComplexHouseMutation,
  useBulkDeleteComplexHousesMutation,
} from "@/shared/api/generated";

import {
  ImagesColumn,
  TitleColumn,
  ComplexesColumn,
  AddressColumn,
  StatusColumn,
  CreatedAtColumn,
} from "../components/internal/columns";

export function useTable(
  filter: ComplexFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "images", header: "Изображение", renderer: ImagesColumn },
    {
      key: "title",
      header: "Название",
      renderer: TitleColumn,
    },
    {
      key: "complexes",
      header: "Жилой комплекс",
      renderer: ComplexesColumn,
    },
    {
      key: "address",
      header: "Адрес",
      renderer: AddressColumn,
    },
    { key: "status", header: "Статус", renderer: StatusColumn },
    { key: "createdAt", header: "Дата создания", renderer: CreatedAtColumn },
  ]);

  const selectedItems = ref<Complex[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useComplexHousesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.complexHouses.nodes || []);

  const isComplexHouseDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isComplexHouseDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную новостройку?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteComplexHouseMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Новостройка удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить новостройку",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ id });
      },
    });
  }

  async function onBulkDeleteItems(ids: string[]) {
    confirm.require({
      message: "Удалить выбранные новостройки?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } =
          useBulkDeleteComplexHousesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Новостройки удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить новостройки",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    columns: readonly(columns),
    selectedItems,
    refetch,
    isComplexHouseDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
