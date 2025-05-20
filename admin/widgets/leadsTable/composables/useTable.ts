import {
  useDeleteLeadMutation,
  useBulkDeleteLeadsMutation,
  useLeadsQuery,
  type LeadFilter,
  type Lead,
} from "~/shared/api/generated";
import {
  AgentColumn,
  ContactColumn,
  DateColumn,
  InternalNumberColumn,
  LeadColumn,
  LocalityColumn,
  PropertyColumn,
  RequestColumn,
  SourceColumn,
} from "../components/internal/columns";

export function useTable(
  filter: LeadFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "internalNumber", header: "Номер", renderer: InternalNumberColumn },
    { key: "lead", header: "Лид", renderer: LeadColumn },
    { key: "contact", header: "Контакты", renderer: ContactColumn },
    { key: "source", header: "Источник", renderer: SourceColumn },
    { key: "request", header: "Заявка", renderer: RequestColumn },
    { key: "agent", header: "Агент", renderer: AgentColumn },
    { key: "property", header: "Объект", renderer: PropertyColumn },
    { key: "locality", header: "Населённый пункт", renderer: LocalityColumn },
    { key: "dates", header: "Дата", renderer: DateColumn },
  ]);

  const selectedItems = ref<Lead[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useLeadsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.leads.nodes || []);

  const isLeadDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isLeadDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный лид?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteLeadMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Лид удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить лид",
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
      message: "Удалить выбранные лиды?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteLeadsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Лиды удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить лиды",
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
    isLeadDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
