import {
  useBulkDeleteReviewsMutation,
  useDeleteReviewMutation,
  useReviewsQuery,
  type Review,
} from "~/shared/api/generated";

import {
  CreatedAtColumn,
  StatusColumn,
  EmployeeColumn,
  AuthorColumn,
  TextColumn,
} from "../components/internal/columns";

export function useTable(search: Ref<string | undefined>) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "createdAt", header: "Дата и время", renderer: CreatedAtColumn },
    { key: "status", header: "Статус", renderer: StatusColumn },
    { key: "employee", header: "Сотрудник", renderer: EmployeeColumn },
    { key: "authorName", header: "Автор", renderer: AuthorColumn },
    { key: "text", header: "Текст", renderer: TextColumn },
  ]);

  const selectedItems = ref<Review[]>([]);

  const variables = computed(() => ({
    search: toValue(search),
  }));

  const { result, loading, refetch } = useReviewsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.reviews.nodes || []);

  const isReviewDrawerVisible = ref(false);
  const editReviewId = ref<string>();

  async function onEditItem(id: string) {
    editReviewId.value = id;
    isReviewDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный отзыв?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteReviewMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Отзыв удален",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить отзыв",
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
      message: "Удалить выбранные отзывы?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },
      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteReviewsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Отзывы удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить отзывы",
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
    isReviewDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editReviewId,
  };
}
