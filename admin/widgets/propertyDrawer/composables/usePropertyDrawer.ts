import {
  type PropertyInput,
  type DocumentInput,
  type ImageInput,
  type CommercialUsageEnum,
  DealEnum,
  type QuarterEnum,
  type RehabTypeEnum,
  type PropertySourceEnum,
  type PropertyStatusEnum,
  type PropertySubTypeEnum,
  type ToiletTypeEnum,
  type PropertyTypeEnum,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function usePropertyDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id
      ? "Редактирование объекта недвижимости"
      : "Создание объекта недвижимости",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<PropertyInput> = yup.object({
    address: yup.string().nullable(),
    area: yup.number().nullable(),
    cadastrNumber: yup.string().nullable(),
    ceilingHeight: yup.number().nullable(),
    cityDistance: yup.number().nullable(),
    comissionAmount: yup.number().nullable(),
    comissionPercent: yup.number().nullable(),
    commercialUsage: yup
      .array(yup.mixed<CommercialUsageEnum>().defined())
      .nullable(),
    complexHouseID: yup.string().nullable(),
    complexID: yup.string().nullable(),
    deal: yup.mixed<DealEnum>().oneOf(Object.values(DealEnum)).required(),
    description: yup.string().nullable(),
    documents: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    floor: yup.number().nullable(),
    floors: yup.number().nullable(),
    fromDeveloper: yup.boolean().nullable(),
    id: yup.string().nullable(),
    images: yup.array(yup.mixed<ImageInput>().required()).default([]),
    inCity: yup.boolean().nullable(),
    inComplex: yup.boolean().nullable(),
    inVillage: yup.boolean().nullable(),
    internalInfo: yup.string().nullable(),
    isHot: yup.boolean().nullable(),
    isReady: yup.boolean().nullable(),
    kitchenArea: yup.number().nullable(),
    landArea: yup.number().nullable(),
    lat: yup.number().nullable(),
    livingArea: yup.number().nullable(),
    lon: yup.number().nullable(),
    price: yup.number().nullable(),
    readinessQuarter: yup.mixed<QuarterEnum>().nullable(),
    readinessYear: yup.number().nullable(),
    region: yup.string().nullable(),
    rehabType: yup.mixed<RehabTypeEnum>().nullable(),
    rooms: yup.number().nullable(),
    seoText: yup.string().nullable(),
    source: yup.mixed<PropertySourceEnum>().nullable(),
    status: yup.mixed<PropertyStatusEnum>().nullable(),
    subRegion: yup.string().nullable(),
    subType: yup.mixed<PropertySubTypeEnum>().nullable(),
    title: yup.string().nullable(),
    toiletType: yup.mixed<ToiletTypeEnum>().nullable(),
    tourLink: yup.string().nullable(),
    type: yup.mixed<PropertyTypeEnum>().nullable(),
    villageID: yup.string().nullable(),
    youtubeLink: yup.string().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<PropertyInput>({
    validationSchema,
  });

  const [address] = defineField("address");
  const [area] = defineField("area");
  const [cadastrNumber] = defineField("cadastrNumber");
  const [ceilingHeight] = defineField("ceilingHeight");
  const [cityDistance] = defineField("cityDistance");
  const [comissionAmount] = defineField("comissionAmount");
  const [comissionPercent] = defineField("comissionPercent");
  const [commercialUsage] = defineField("commercialUsage");
  const [complexHouseID] = defineField("complexHouseID");
  const [complexID] = defineField("complexID");
  const [deal] = defineField("deal");
  const [description] = defineField("description");
  const [documents] = defineField("documents");
  const [floor] = defineField("floor");
  const [floors] = defineField("floors");
  const [fromDeveloper] = defineField("fromDeveloper");
  const [id] = defineField("id");
  const [images] = defineField("images");
  const [inCity] = defineField("inCity");
  const [inComplex] = defineField("inComplex");
  const [inVillage] = defineField("inVillage");
  const [internalInfo] = defineField("internalInfo");
  const [isHot] = defineField("isHot");
  const [isReady] = defineField("isReady");
  const [kitchenArea] = defineField("kitchenArea");
  const [landArea] = defineField("landArea");
  const [lat] = defineField("lat");
  const [livingArea] = defineField("livingArea");
  const [lon] = defineField("lon");
  const [price] = defineField("price");
  const [readinessQuarter] = defineField("readinessQuarter");
  const [readinessYear] = defineField("readinessYear");
  const [region] = defineField("region");
  const [rehabType] = defineField("rehabType");
  const [rooms] = defineField("rooms");
  const [seoText] = defineField("seoText");
  const [source] = defineField("source");
  const [status] = defineField("status");
  const [subRegion] = defineField("subRegion");
  const [subType] = defineField("subType");
  const [title] = defineField("title");
  const [toiletType] = defineField("toiletType");
  const [tourLink] = defineField("tourLink");
  const [type] = defineField("type");
  const [villageID] = defineField("villageID");
  const [youtubeLink] = defineField("youtubeLink");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    address,
    area,
    cadastrNumber,
    ceilingHeight,
    cityDistance,
    comissionAmount,
    comissionPercent,
    commercialUsage,
    complexHouseID,
    complexID,
    deal,
    description,
    documents,
    floor,
    floors,
    fromDeveloper,
    id,
    images,
    inCity,
    inComplex,
    inVillage,
    internalInfo,
    isHot,
    isReady,
    kitchenArea,
    landArea,
    lat,
    livingArea,
    lon,
    price,
    readinessQuarter,
    readinessYear,
    region,
    rehabType,
    rooms,
    seoText,
    source,
    status,
    subRegion,
    subType,
    title,
    toiletType,
    tourLink,
    type,
    villageID,
    youtubeLink,

    setErrors,
    setTouched,

    loading,
  };
}
