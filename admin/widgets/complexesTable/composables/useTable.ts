import type { ComplexFilter, Complex } from "@/shared/api/generated";
import {
  useComplexesQuery,
  useDeleteComplexMutation,
  useBulkDeleteComplexesMutation,
} from "@/shared/api/generated";

import {
  ImagesColumn,
  TitleColumn,
  DeveloperColumn,
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
      key: "developer",
      header: "Застройщик",
      renderer: DeveloperColumn,
    },
    {
      key: "address",
      header: "Адрес",
      renderer: AddressColumn,
    },
    { key: "status", header: "Статус", renderer: StatusColumn },
    { key: "createdAt", header: "дата создания", renderer: CreatedAtColumn },
  ]);

  const selectedItems = ref<Complex[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useComplexesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.complexes.nodes || []);

  const isComplexDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isComplexDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный жилой комплекс?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteComplexMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Жилой комплекс удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить жилой комплекс",
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
      message: "Удалить выбранные ЖК?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteComplexesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Жилые комплексы удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить ЖК",
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
    isComplexDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
