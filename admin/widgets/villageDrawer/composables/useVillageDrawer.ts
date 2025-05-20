import type {
  VillageInput,
  DocumentInput,
  ImageInput,
  QuarterEnum,
  PublicationStatusEnum,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useVillageDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование поселка" : "Создание поселка",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<VillageInput> = yup.object({
    address: yup.string().required(),
    cadastrNumber: yup.string().nullable(),
    cityDistance: yup.number().nullable(),
    description: yup.string().required(),
    developerID: yup.string().nullable(),
    documents: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    id: yup.string().nullable(),
    images: yup.array(yup.mixed<ImageInput>().required()).default([]),
    inCity: yup.boolean().nullable(),
    internalInfo: yup.string().nullable(),
    isReady: yup.boolean().nullable(),
    lat: yup.number().nullable(),
    lon: yup.number().nullable(),
    projectDeclarations: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    publicationStatus: yup.mixed<PublicationStatusEnum>().nullable(),
    readinessQuarter: yup.mixed<QuarterEnum>().nullable(),
    readinessYear: yup.number().nullable(),
    region: yup.string().nullable(),
    seoText: yup.string().nullable(),
    subRegion: yup.string().nullable(),
    title: yup.string().required(),
    tourLink: yup.string().url().nullable(),
    youtubeLink: yup.string().url().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<VillageInput>({
    validationSchema,
  });

  const [address] = defineField("address");
  const [cadastrNumber] = defineField("cadastrNumber");
  const [cityDistance] = defineField("cityDistance");
  const [description] = defineField("description");
  const [developerID] = defineField("developerID");
  const [documents] = defineField("documents");
  const [id] = defineField("id");
  const [images] = defineField("images");
  const [inCity] = defineField("inCity");
  const [internalInfo] = defineField("internalInfo");
  const [isReady] = defineField("isReady");
  const [lat] = defineField("lat");
  const [lon] = defineField("lon");
  const [projectDeclarations] = defineField("projectDeclarations");
  const [publicationStatus] = defineField("publicationStatus");
  const [readinessQuarter] = defineField("readinessQuarter");
  const [readinessYear] = defineField("readinessYear");
  const [region] = defineField("region");
  const [seoText] = defineField("seoText");
  const [subRegion] = defineField("subRegion");
  const [title] = defineField("title");
  const [tourLink] = defineField("tourLink");
  const [youtubeLink] = defineField("youtubeLink");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    address,
    cadastrNumber,
    cityDistance,
    description,
    developerID,
    documents,
    id,
    images,
    inCity,
    internalInfo,
    isReady,
    lat,
    lon,
    projectDeclarations,
    publicationStatus,
    readinessQuarter,
    readinessYear,
    region,
    seoText,
    subRegion,
    title,
    tourLink,
    youtubeLink,
    setErrors,
    setTouched,
    loading,
  };
}
