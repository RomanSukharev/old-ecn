import * as yup from "yup";
import type { DeveloperInput, ImageInput } from "~/shared/api/generated";
import type { IProps } from "../types";

export function useDeveloperDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование застройщика" : "Создание застройщика",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<DeveloperInput> = yup.object({
    id: yup.string().nullable(),
    logo: yup.mixed<ImageInput>().nullable(),
    title: yup.string().required(),
    url: yup.string().url().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<DeveloperInput>({
    validationSchema,
  });

  const [id] = defineField("id");
  const [logo] = defineField("logo");
  const [title] = defineField("title");
  const [url] = defineField("url");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    id,
    logo,
    title,
    url,
    setErrors,
    setTouched,
    loading,
  };
}
