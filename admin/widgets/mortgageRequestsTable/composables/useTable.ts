import {
  useMortgageRequestsQuery,
  useDeleteMortgageRequestMutation,
  useBulkDeleteMortgageRequestsMutation,
  type MortgageRequestFilter,
  type MortgageRequest,
} from "~/shared/api/generated";
import {
  StageAndInternalNumberColumn,
  ContactColumn,
  ObjectNameColumn,
  AgentColumn,
  BrokerColumn,
  AmountColumn,
  PercentageColumn,
  FirstDepositColumn,
  ValidTillDateColumn,
  DatesColumn,
} from "../components/internal/columns";

export function useTable(
  filter: MortgageRequestFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    {
      key: "internalNumber",
      header: "Номер и этап",
      renderer: StageAndInternalNumberColumn,
    },
    { key: "contact", header: "Контакт", renderer: ContactColumn },
    {
      key: "objectName",
      header: "Название объекта, информация о нём",
      renderer: ObjectNameColumn,
    },
    {
      key: "agent",
      header: "Агент",
      renderer: AgentColumn,
    },
    {
      key: "broker",
      header: "Брокер",
      renderer: BrokerColumn,
    },
    {
      key: "amount",
      header: "Сумма",
      renderer: AmountColumn,
    },
    {
      key: "percentage",
      header: "Ставка",
      renderer: PercentageColumn,
    },
    {
      key: "firstDeposit",
      header: "Первоначальный взнос",
      renderer: FirstDepositColumn,
    },
    {
      key: "validTillDate",
      header: "Действие решения",
      renderer: ValidTillDateColumn,
    },
    {
      key: "dates",
      header: "Даты",
      renderer: DatesColumn,
    },
  ]);

  const selectedItems = ref<MortgageRequest[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useMortgageRequestsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.mortgageRequests.nodes || []);

  const isMortgageRequestDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isMortgageRequestDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную заявку?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteMortgageRequestMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Заявка удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить заявку",
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
      message: "Удалить выбранный заявки?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } =
          useBulkDeleteMortgageRequestsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Заявки удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить заявки",
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
    isMortgageRequestDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
