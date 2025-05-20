import { type ComplexFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isComplexDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<ComplexFilter>({
    developerID: undefined,
    isDeleted: undefined,
    publicationStatus: undefined,
    withPhotos: undefined,
  });

  async function onApplyFilter(filterResult: ComplexFilter): Promise<void> {
    filter.developerID = filterResult?.developerID;
    filter.isDeleted = filterResult?.isDeleted;
    filter.publicationStatus = filterResult?.publicationStatus;
    filter.withPhotos = filterResult?.withPhotos;
  }

  const complexesTable = ref();

  watch([keyword, filter], () => {
    complexesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isComplexDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    complexesTable,
  };
}
