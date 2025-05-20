import { type LeadFilter, LeadTypeEnum } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isLeadDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<LeadFilter>({
    company: undefined,
    createdAtMax: undefined,
    createdAtMin: undefined,
    status: undefined,
    type: LeadTypeEnum.SALER,
    email: undefined,
    phone: undefined,
  });

  async function onApplyFilter(filterResult: LeadFilter): Promise<void> {
    filter.company = filterResult?.company;
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.status = filterResult?.status;
    filter.type = filterResult?.type;
    filter.email = filterResult?.email;
    filter.phone = filterResult?.phone;
  }

  const leadsTable = ref();

  watch([keyword, filter], () => {
    leadsTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isLeadDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    leadsTable,
  };
}
