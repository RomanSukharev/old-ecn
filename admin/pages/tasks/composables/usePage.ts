import type { TaskFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isTaskDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<TaskFilter>({
    contact: undefined,
    createdAtMax: undefined,
    createdAtMin: undefined,
    employee: undefined,
    property: undefined,
  });

  async function onApplyFilter(filterResult: TaskFilter): Promise<void> {
    filter.contact = filterResult?.contact;
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.employee = filterResult?.employee;
    filter.property = filterResult?.property;
  }

  const tasksTable = ref();

  watch([keyword, filter], () => {
    tasksTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isFilterDrawerVisible,
    isTaskDrawerVisible,
    filter,
    tasksTable,
    onApplyFilter,
  };
}
