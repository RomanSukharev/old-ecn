import {
  useDeleteStoryMutation,
  useStoriesQuery,
  type Story,
} from "~/shared/api/generated";

import {
  CoverColumn,
  CategoryColumn,
  TitleColumn,
  DescriptionColumn,
  CreatedAtColumn,
} from "../components/internal";

export function useTable(search: Ref<string | undefined>) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "actions", header: "Изображение", renderer: CoverColumn },
    { key: "category", header: "Категория", renderer: CategoryColumn },
    { key: "title", header: "Заголовок", renderer: TitleColumn },
    { key: "description", header: "Тизер", renderer: DescriptionColumn },
    { key: "createdAt", header: "Дата и время", renderer: CreatedAtColumn },
  ]);

  const selectedItems = ref<Story[]>([]);

  const variables = computed(() => ({
    search: toValue(search),
  }));

  const { result, loading, refetch } = useStoriesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.stories.nodes || []);

  const isStoryDrawerVisible = ref(false);
  const editStoryId = ref<string>();

  async function onEditItem(id: string) {
    editStoryId.value = id;
    isStoryDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную новость?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteStoryMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Новость удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить новость",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ id });
      },
    });
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    columns: readonly(columns),
    selectedItems,
    refetch,
    isStoryDrawerVisible,
    onEditItem,
    onDeleteItem,
    editStoryId,
  };
}
