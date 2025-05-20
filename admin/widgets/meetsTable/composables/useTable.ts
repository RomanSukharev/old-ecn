import {
  useDeleteMeetMutation,
  useBulkDeleteMeetsMutation,
  useMeetsQuery,
  // type MeetFilter,
  type Meet,
} from "~/shared/api/generated";

import {
  ShowTimeColumn,
  ObjectColumn,
  AddressColumn,
  BuyerAgentColumn,
  BuyerColumn,
  BuyerPhoneColumn,
  SellerAgentColumn,
  SellerColumn,
  SellerPhoneColumn,
  InformationColumn,
  ResultColumn,
} from "../components/internal/columns";

export function useTable(
  // filter: MeetFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    {
      key: "time",
      header: "Время показа",
      renderer: ShowTimeColumn,
    },
    {
      key: "object",
      header: "Объект",
      renderer: ObjectColumn,
    },
    { key: "address", header: "Адрес", renderer: AddressColumn },
    { key: "buyerAgent", header: "Агент", renderer: BuyerAgentColumn },
    { key: "buyer", header: "Покупатель", renderer: BuyerColumn },
    { key: "buyerPhone", header: "Телефон", renderer: BuyerPhoneColumn },
    {
      key: "sellerAgent",
      header: "Агент",
      renderer: SellerAgentColumn,
    },
    { key: "seller", header: "Продавец", renderer: SellerColumn },
    { key: "sellerPhone", header: "Телефон", renderer: SellerPhoneColumn },
    { key: "information", header: "Информация", renderer: InformationColumn },
    { key: "result", header: "Результат", renderer: ResultColumn },
  ]);

  const selectedItems = ref<Meet[]>([]);

  const variables = computed(() => ({
    // filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useMeetsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.meets.nodes || []);

  const isMeetDrawerVisible = ref(false);
  const editDealId = ref<string>();

  async function onEditItem(id: string) {
    editDealId.value = id;
    isMeetDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную встречу?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteMeetMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Встреча удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить встречу",
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
      message: "Удалить выбранные встречи?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },
      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteMeetsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Встречи удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить встречи",
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
    isMeetDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editDealId,
  };
}
