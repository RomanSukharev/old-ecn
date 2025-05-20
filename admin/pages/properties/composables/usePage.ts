import { type PropertyFilter, PropertyTypeEnum } from "~/shared/api/generated";

export function usePage() {
  const keyword = ref<string>();

  const isPropertyDrawerVisible = ref(false);
  const isFilterDrawerVisible = ref(false);

  const filter = reactive<PropertyFilter>({
    complexID: undefined,
    deal: undefined,
    fromDeveloper: undefined,
    inCity: undefined,
    isDeleted: undefined,
    isHot: undefined,
    isReady: undefined,
    maxArea: undefined,
    maxCityDistance: undefined,
    maxCreatedAt: undefined,
    maxLandArea: undefined,
    maxPrice: undefined,
    maxPricePerAr: undefined,
    maxPricePerMeter: undefined,
    minArea: undefined,
    minCityDistance: undefined,
    minCreatedAt: undefined,
    minLandArea: undefined,
    minPrice: undefined,
    minPricePerAr: undefined,
    minPricePerMeter: undefined,
    statuses: undefined,
    subType: undefined,
    type: PropertyTypeEnum.NEW,
    villageID: undefined,
    withPhotos: undefined,
  });

  async function onApplyFilter(filterResult: PropertyFilter): Promise<void> {
    filter.complexID = filterResult?.complexID;
    filter.deal = filterResult?.deal;
    filter.fromDeveloper = filterResult?.fromDeveloper;
    filter.inCity = filterResult?.inCity;
    filter.isDeleted = filterResult?.isDeleted;
    filter.isHot = filterResult?.isHot;
    filter.isReady = filterResult?.isReady;
    filter.maxArea = filterResult?.maxArea;
    filter.maxCityDistance = filterResult?.maxCityDistance;
    filter.maxCreatedAt = filterResult?.maxCreatedAt;
    filter.maxLandArea = filterResult?.maxLandArea;
    filter.maxPrice = filterResult?.maxPrice;
    filter.maxPricePerAr = filterResult?.maxPricePerAr;
    filter.minPricePerMeter = filterResult?.minPricePerMeter;
    filter.statuses = filterResult?.statuses;
    filter.subType = filterResult?.subType;
    filter.type = filterResult?.type;
    filter.villageID = filterResult?.villageID;
    filter.withPhotos = filterResult?.withPhotos;
  }

  const propertiesTable = ref();

  watch([keyword, filter], () => {
    propertiesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isPropertyDrawerVisible,
    isFilterDrawerVisible,
    filter,
    onApplyFilter,
    propertiesTable,
  };
}
