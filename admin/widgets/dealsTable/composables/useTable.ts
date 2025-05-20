import {
  useDeleteDealMutation,
  useBulkDeleteDealsMutation,
  useDealsQuery,
  type DealFilter,
  type Deal,
} from "~/shared/api/generated";

import {
  NumberStageColumn,
  ObjectNameColumn,
  TypeDealColumn,
  ContactsColumn,
  AgentColumn,
  CommissionColumn,
  DateDepositPaidColumn,
  DateDealColumn,
} from "../components/internal/columns";

export function useTable(
  filter: DealFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    {
      key: "numberStage",
      header: "Номер и этап",
      renderer: NumberStageColumn,
    },
    {
      key: "objectName",
      header: "Название объекта, информация о нём",
      renderer: ObjectNameColumn,
    },
    { key: "typeDeal", header: "Тип сделки", renderer: TypeDealColumn },
    { key: "сontact", header: "Контакт", renderer: ContactsColumn },
    { key: "agent", header: "Агент", renderer: AgentColumn },
    { key: "сommission", header: "Комиссия", renderer: CommissionColumn },
    {
      key: "dateDepositPaid",
      header: "Дата задатка",
      renderer: DateDepositPaidColumn,
    },
    { key: "dateDeal", header: "Дата сделки", renderer: DateDealColumn },
  ]);

  const selectedItems = ref<Deal[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useDealsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.deals.nodes || []);

  const isDealDrawerVisible = ref(false);
  const editDealId = ref<string>();

  async function onEditItem(id: string) {
    editDealId.value = id;
    isDealDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную сделку?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteDealMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Сделка удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить сделку",
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
      message: "Удалить выбранные сделки?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },
      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteDealsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Сделки удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить сделки",
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
    isDealDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editDealId,
  };
}
