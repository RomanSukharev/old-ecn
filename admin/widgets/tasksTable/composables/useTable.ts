import {
  useDeleteTaskMutation,
  useBulkDeleteTasksMutation,
  useTasksQuery,
  type TaskFilter,
  type Task,
} from "~/shared/api/generated";

import {
  TaskColumn,
  ExecutorColumn,
  CheckerColumn,
  ObjectNameColumn,
  ContactColumn,
  LeadColumn,
  DealColumn,
  StartColumn,
  EndColumn,
  PeriodColumn,
  InformationColumn,
} from "../components/internal/columns";

export function useTable(
  filter: TaskFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    {
      key: "task",
      header: "Задача",
      renderer: (props: { data: TAny }) =>
        h(TaskColumn, {
          data: props.data,
          onEdit: (id: string) => onEditItem(id),
        }),
    },
    { key: "executor", header: "Исполнитель", renderer: ExecutorColumn },
    { key: "checker", header: "Проверяющий", renderer: CheckerColumn },
    { key: "object", header: "Объект", renderer: ObjectNameColumn },
    { key: "contact", header: "Контакт", renderer: ContactColumn },
    { key: "lead", header: "Лид", renderer: LeadColumn },
    { key: "deal", header: "Сделка", renderer: DealColumn },
    { key: "start", header: "Начало", renderer: StartColumn },
    { key: "end", header: "Окончание", renderer: EndColumn },
    { key: "period", header: "Срок", renderer: PeriodColumn },
    { key: "information", header: "Информация", renderer: InformationColumn },
  ]);

  const selectedItems = ref<Task[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useTasksQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.tasks.nodes || []);

  const isTaskDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isTaskDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную задачу?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteTaskMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Задача удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить задачу",
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
      message: "Удалить выбранные задачи?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteTasksMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Задачи удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить задачу",
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
    isTaskDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editLeadId,
  };
}
