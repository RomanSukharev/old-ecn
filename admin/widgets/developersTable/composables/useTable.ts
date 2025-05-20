import type { Developer } from "@/shared/api/generated";
import {
  useDevelopersQuery,
  useDeleteDeveloperMutation,
  useBulkDeleteDevelopersMutation,
} from "@/shared/api/generated";

import { TitleColumn, LinkColumn } from "../components/internal/columns";

export function useTable(search: Ref<string | undefined>) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "title", header: "Изображение", renderer: TitleColumn },
    { key: "url", header: "URL", renderer: LinkColumn },
  ]);

  const selectedItems = ref<Developer[]>([]);

  const variables = computed(() => ({
    search: toValue(search),
  }));

  const { result, loading, refetch } = useDevelopersQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.developers.nodes || []);

  const isDeveloperDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isDeveloperDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранного застройщика?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteDeveloperMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Застройщик удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить застройщика",
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
      message: "Удалить выбранных застройщиков?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteDevelopersMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Застройщики удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить застройщиков",
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
    isDeveloperDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
