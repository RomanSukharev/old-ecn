import * as yup from "yup";
import { type PageInput, ContentBlockType } from "~/shared/api/generated";
import { PublicationStatusEnum } from "~/shared/api/generated";
import type { IProps } from "../types";

export function usePageDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование страницы" : "Создание страницы",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<PageInput> = yup.object({
    id: yup.string().nullable(),
    title: yup.string().required(),
    description: yup.string().required(),
    url: yup.string().required(),
    status: yup
      .mixed<PublicationStatusEnum>()
      .oneOf(Object.values(PublicationStatusEnum))
      .required(),
    contentBlocks: yup
      .array(
        yup.object({
          data: yup.object().required(),
          type: yup
            .mixed<ContentBlockType>()
            .oneOf(Object.values(ContentBlockType))
            .required(),
          isVisible: yup.boolean().required(),
        }),
      )
      .default([]),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<PageInput>({
    validationSchema,
    initialValues: {
      contentBlocks: [],
    },
  });

  const [title] = defineField("title");
  const [description] = defineField("description");
  const [url] = defineField("url");
  const [status] = defineField("status");
  const [contentBlocks] = defineField("contentBlocks");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    title,
    description,
    url,
    status,
    contentBlocks,

    setErrors,
    setTouched,

    loading,
  };
}
