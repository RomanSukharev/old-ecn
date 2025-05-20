import { type ReviewInput, ReviewStatusEnum } from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useReviewDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование отзыва" : "Создание отзыва",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<ReviewInput> = yup.object({
    id: yup.string().nullable(),
    authorName: yup.string().required(),
    authorPhone: yup.string().required(),
    employeeID: yup.string().required(),
    status: yup
      .mixed<ReviewStatusEnum>()
      .oneOf(Object.values(ReviewStatusEnum))
      .required(),
    text: yup.string().min(10).required(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<ReviewInput>({
    validationSchema,
  });

  const [authorName] = defineField("authorName");
  const [authorPhone] = defineField("authorPhone");
  const [employeeID] = defineField("employeeID");
  const [status] = defineField("status");
  const [text] = defineField("text");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,
    authorName,
    authorPhone,
    employeeID,
    status,
    text,
    setErrors,
    setTouched,
    loading,
  };
}
