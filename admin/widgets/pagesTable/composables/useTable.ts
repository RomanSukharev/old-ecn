import {
  // useBulkDeletePagesMutation,
  useDeletePageMutation,
  usePagesQuery,
  type Page,
} from "~/shared/api/generated";

import {
  URLColumn,
  TitleColumn,
  DescriptionColumn,
  StatusColumn,
} from "../components/internal/columns";

export function useTable(search: Ref<string | undefined>) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "url", header: "URL", renderer: URLColumn },
    { key: "title", header: "Название", renderer: TitleColumn },
    { key: "description", header: "Описание", renderer: DescriptionColumn },
    { key: "status", header: "Статус", renderer: StatusColumn },
  ]);

  const selectedItems = ref<Page[]>([]);

  const variables = computed(() => ({
    search: toValue(search),
  }));

  const { result, loading, refetch } = usePagesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.pages.nodes || []);

  const isPageDrawerVisible = ref(false);
  const editPageId = ref<string>();

  async function onEditItem(id: string) {
    editPageId.value = id;
    isPageDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную страницу?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeletePageMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Страница удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить страницу",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ id });
      },
    });
  }

  // async function onBulkDeleteItems(ids: string[]) {
  //   confirm.require({
  //     message: "Удалить выбранные страницы?",
  //     header: "Внимание",
  //     rejectLabel: "Отменить",
  //     acceptLabel: "Удалить",
  //     acceptProps: {
  //       severity: "danger",
  //     },
  //     accept: () => {
  //       const { mutate, onDone, onError } = useBulkDeletePagesMutation();

  //       onDone(() => {
  //         toast.add({
  //           summary: "Операция завершена",
  //           detail: "Страницы удалены",
  //           severity: "info",
  //           life: 5000,
  //         });

  //         selectedItems.value = [];
  //         refetch();
  //       });

  //       onError(() => {
  //         toast.add({
  //           summary: "Ошибка",
  //           detail: "Не удалось удалить страницы",
  //           severity: "error",
  //           life: 5000,
  //         });
  //       });

  //       mutate({ ids });
  //     },
  //   });
  // }

  return {
    loading: readonly(loading),
    items: readonly(items),
    columns: readonly(columns),
    selectedItems,
    refetch,
    isPageDrawerVisible,
    onEditItem,
    onDeleteItem,
    // onBulkDeleteItems,
    editPageId,
  };
}
