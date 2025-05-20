import type { ComplexHouseFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isComplexHousesDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<ComplexHouseFilter>({
    complexID: undefined,
    isDeleted: undefined,
    publicationStatus: undefined,
    withPhotos: undefined,
  });

  async function onApplyFilter(
    filterResult: ComplexHouseFilter,
  ): Promise<void> {
    filter.complexID = filterResult?.complexID;
    filter.isDeleted = filterResult?.isDeleted;
    filter.publicationStatus = filterResult?.publicationStatus;
    filter.withPhotos = filterResult?.withPhotos;
  }

  const complexHousesTable = ref();

  watch([keyword, filter], () => {
    complexHousesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isComplexHousesDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    complexHousesTable,
  };
}
