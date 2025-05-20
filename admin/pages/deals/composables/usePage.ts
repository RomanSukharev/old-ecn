import { type DealFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isDealDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<DealFilter>({
    contact: undefined,
    createdAtMax: undefined,
    createdAtMin: undefined,
    employee: undefined,
    finishedAtMax: undefined,
    finishedAtMin: undefined,
    isDeleted: undefined,
    phone: undefined,
    propertyType: undefined,
    Type: undefined,
    stage: undefined,
  });

  async function onApplyFilter(filterResult: DealFilter): Promise<void> {
    filter.Type = filterResult?.Type;
    filter.contact = filterResult?.contact;
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.employee = filterResult?.employee;
    filter.finishedAtMax = filterResult?.finishedAtMax;
    filter.finishedAtMin = filterResult?.finishedAtMin;
    filter.isDeleted = filterResult?.isDeleted;
    filter.propertyType = filterResult?.propertyType;
    filter.phone = filterResult?.phone;
    filter.stage = filterResult?.stage;
  }

  const dealsTable = ref();
  const dealsKanban = ref();

  watch([keyword, filter], () => {
    if (dealsTable.value) {
      dealsTable.value.selectedItems = undefined;
    }
    if (dealsKanban.value) {
      dealsKanban.value.selectedItems = undefined;
    }
  });

  return {
    keyword,
    isDealDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    dealsTable,
    dealsKanban,
  };
}
