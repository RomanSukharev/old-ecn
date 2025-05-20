import type { Item } from "vue3-easy-data-table";
import {
  useVillagesQuery,
  useDeleteVillageMutation,
  useBulkDeleteVillagesMutation,
  type VillageFilter,
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
  filter: VillageFilter | undefined,
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
    { key: "createdAt", header: "Дата создания", renderer: CreatedAtColumn },
  ]);

  const selectedItems = ref<Item[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useVillagesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.villages.nodes || []);

  const isVillageDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isVillageDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный КП?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteVillageMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "КП удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить КП",
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
      message: "Удалить выбранные КП?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteVillagesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "КП удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить КП",
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
    isVillageDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
