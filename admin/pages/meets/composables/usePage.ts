import type { MeetFilter } from "~/shared/api/generated";
// import { ViewModeEnum } from "../types";

export function usePage() {
  const keyword = ref<string>();

  const isMeetDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  // const viewMode = ref<ViewModeEnum>(ViewModeEnum.LIST);

  const filter = reactive<MeetFilter>({
    contact: undefined,
    createdAtMax: undefined,
    createdAtMin: undefined,
    employee: undefined,
    property: undefined,
    status: undefined,
    type: undefined,
  });

  async function onApplyFilter(filterResult: MeetFilter): Promise<void> {
    filter.contact = filterResult?.contact;
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.employee = filterResult?.employee;
    filter.property = filterResult?.property;
    filter.status = filterResult?.status;
    filter.type = filterResult?.type;
  }

  const meetsTable = ref();
  const meetsCalendar = ref();

  watch([keyword, filter], () => {
    if (meetsCalendar.value) {
      meetsCalendar.value.selectedItems = undefined;
    }
    if (meetsTable.value) {
      meetsTable.value.selectedItems = undefined;
    }
  });

  return {
    keyword,
    isFilterDrawerVisible,
    isMeetDrawerVisible,
    filter,
    meetsTable,
    meetsCalendar,
    onApplyFilter,
    // viewMode,
  };
}
