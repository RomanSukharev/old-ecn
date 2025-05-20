import { type VillageFilter } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isVillageDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<VillageFilter>({
    developerID: undefined,
    isDeleted: undefined,
    publicationStatus: undefined,
    withPhotos: undefined,
  });

  async function onApplyFilter(filterResult: VillageFilter): Promise<void> {
    filter.developerID = filterResult?.developerID;
    filter.isDeleted = filterResult?.isDeleted;
    filter.publicationStatus = filterResult?.publicationStatus;
    filter.withPhotos = filterResult?.withPhotos;
  }

  const villagesTable = ref();

  watch([keyword, filter], () => {
    villagesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isVillageDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    villagesTable,
  };
}
