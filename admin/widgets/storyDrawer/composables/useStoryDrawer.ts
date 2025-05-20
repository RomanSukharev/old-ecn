import {
  type StoryInput,
  type ImageInput,
  type ContentBlockInput,
  StoryCategoryEnum,
  ContentBlockType,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useStoryDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование новости" : "Создание новости",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<StoryInput> = yup.object({
    id: yup.string().nullable(),
    title: yup.string().required(),
    teaser: yup.string().nullable(),
    category: yup
      .mixed<StoryCategoryEnum>()
      .oneOf(Object.values(StoryCategoryEnum))
      .required(),
    cover: yup.array(yup.mixed<ImageInput>().nullable()),
    contentBlocks: yup
      .array(
        yup.object({
          data: yup.mixed<ContentBlockInput[]>().required(),
          type: yup
            .mixed<ContentBlockType>()
            .oneOf(Object.values(ContentBlockType))
            .required(),
          isVisible: yup.boolean().required(),
        }),
      )
      .required()
      .min(1),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<StoryInput>({
    validationSchema,
  });

  const [id] = defineField("id");
  const [title] = defineField("title");
  const [teaser] = defineField("teaser");
  const [category] = defineField("category");
  const [cover] = defineField("cover");
  const [contentBlocks] = defineField("contentBlocks");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    id,
    title,
    teaser,
    category,
    cover,
    contentBlocks,

    setErrors,
    setTouched,

    loading,
  };
}
