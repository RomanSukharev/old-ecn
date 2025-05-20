import {
  type ContactFilter,
  CounterPartyTypeEnum,
} from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isContactDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<ContactFilter>({
    type: CounterPartyTypeEnum.SALER,
    company: undefined,
    createdAtMax: undefined,
    createdAtMin: undefined,
    email: undefined,
    phone: undefined,
  });

  async function onApplyFilter(filterResult: ContactFilter): Promise<void> {
    filter.company = filterResult?.company;
    filter.createdAtMax = filterResult?.createdAtMax;
    filter.createdAtMin = filterResult?.createdAtMin;
    filter.email = filterResult?.email;
    filter.phone = filterResult?.phone;
  }

  const contactsTable = ref();

  watch([keyword, filter], () => {
    contactsTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isContactDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    contactsTable,
  };
}
