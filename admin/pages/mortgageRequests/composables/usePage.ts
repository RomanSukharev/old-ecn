import type { MortgageRequestFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isMortgageRequestDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<MortgageRequestFilter>({
    createdAtMax: undefined,
    createdAtMin: undefined,
    status: undefined,
    contact: undefined,
    deal: undefined,
    employee: undefined,
    property: undefined,
  });

  async function onApplyFilter(
    filterResult: MortgageRequestFilter,
  ): Promise<void> {
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.status = filterResult?.status;
    filter.contact = filterResult?.contact;
    filter.deal = filterResult?.deal;
    filter.employee = filterResult?.employee;
    filter.property = filterResult?.property;
  }

  const mortgageRequestsTable = ref();

  watch([keyword, filter], () => {
    mortgageRequestsTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isFilterDrawerVisible,
    isMortgageRequestDrawerVisible,
    filter,
    mortgageRequestsTable,
    onApplyFilter,
  };
}
