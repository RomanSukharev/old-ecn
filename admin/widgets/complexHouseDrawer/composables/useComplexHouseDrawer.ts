import type {
  ComplexHouseInput,
  DocumentInput,
  ImageInput,
  QuarterEnum,
  PublicationStatusEnum,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useComplexHouseDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование новостройки" : "Создание новостройки",
  );
  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<ComplexHouseInput> = yup.object({
    address: yup.string().required(),
    cadastrNumber: yup.string().nullable(),
    complexID: yup.string().nullable(),
    description: yup.string().required(),
    documents: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    id: yup.string().nullable(),
    images: yup.array(yup.mixed<ImageInput>().required()).default([]),
    internalInfo: yup.string().nullable(),
    isReady: yup.boolean().nullable(),
    lat: yup.number().nullable(),
    lon: yup.number().nullable(),
    projectDeclarations: yup
      .array(yup.mixed<ImageInput>().required())
      .default([]),
    publicationStatus: yup.mixed<PublicationStatusEnum>().nullable(),
    readinessQuarter: yup.mixed<QuarterEnum>().nullable(),
    readinessYear: yup.number().nullable(),
    seoText: yup.string().nullable(),
    title: yup.string().required(),
    tourLink: yup.string().nullable(),
    youtubeLink: yup.string().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<ComplexHouseInput>({
    validationSchema,
  });

  const [address] = defineField("address");
  const [cadastrNumber] = defineField("cadastrNumber");
  const [complexID] = defineField("complexID");
  const [description] = defineField("description");
  const [documents] = defineField("documents");
  const [id] = defineField("id");
  const [images] = defineField("images");
  const [internalInfo] = defineField("internalInfo");
  const [isReady] = defineField("isReady");
  const [lat] = defineField("lat");
  const [lon] = defineField("lon");
  const [projectDeclarations] = defineField("projectDeclarations");
  const [publicationStatus] = defineField("publicationStatus");
  const [readinessQuarter] = defineField("readinessQuarter");
  const [readinessYear] = defineField("readinessYear");
  const [seoText] = defineField("seoText");
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
    complexID,
    description,
    documents,
    id,
    images,
    internalInfo,
    isReady,
    lat,
    lon,
    projectDeclarations,
    publicationStatus,
    readinessQuarter,
    readinessYear,
    seoText,
    title,
    tourLink,
    youtubeLink,

    setErrors,
    setTouched,

    loading,
  };
}
