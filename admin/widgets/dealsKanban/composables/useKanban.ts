import {
  type DealStageEnum,
  useDealsQuery,
  useDeleteDealMutation,
  useSaveDealMutation,
  type DealFilter,
  type Deal,
} from "~/shared/api/generated";
import { dealStages } from "~/widgets/dealDrawer/constants";

export function useKanban(
  filter: DealFilter | undefined,
  search: Ref<string | undefined>,
) {
  const items = computed(() => {
    return result.value?.deals.nodes || [];
  });

  const stages = computed(() => {
    return dealStages.map((stage) => ({
      ...stage,
      deals: items.value.filter((deal) => deal.stage === stage.id),
    }));
  });
  const selectedItems = ref<Deal[]>([]);
  const confirm = useConfirm();
  const toast = useToast();
  const isDealDrawerVisible = ref(false);
  const editDealId = ref<string>();

  const variables = computed<{ filter?: DealFilter; search?: string }>(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useDealsQuery(variables, {
    debounce: 300,
  });

  async function onEditItem(id: string) {
    editDealId.value = id;
    isDealDrawerVisible.value = true;
  }

  async function updateDealStage({
    dealId,
    newStageId,
  }: {
    dealId: string;
    newStageId: DealStageEnum;
  }) {
    const { mutate, onDone, onError } = useSaveDealMutation();

    if (typeof dealId !== "string") {
      console.error("dealId должен быть строкой");
      return;
    }

    onDone(() => {
      toast.add({
        summary: "Операция завершена",
        detail: "Стадия сделки успешно обновлена",
        severity: "success",
        life: 5000,
      });
      // refetch();
    });

    onError(() => {
      toast.add({
        summary: "Ошибка",
        detail: "Не удалось обновить стадию сделки",
        severity: "error",
        life: 5000,
      });
    });

    mutate({
      input: {
        id: dealId,
        stage: newStageId,
      },
    });
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

  return {
    loading: readonly(loading),
    items: readonly(items),
    stages,
    selectedItems,
    isDealDrawerVisible,
    editDealId,
    refetch,
    onDeleteItem,
    onEditItem,
    updateDealStage,
  };
}
