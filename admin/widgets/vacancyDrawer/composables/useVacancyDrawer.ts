import {
  type VacancyInput,
  VacancyScheduleEnum,
  PublicationStatusEnum,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useVacancyDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование вакансии" : "Создание вакансии",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<VacancyInput> = yup.object({
    id: yup.string().nullable(),
    title: yup.string().required(),
    description: yup.string().required(),
    experience: yup.string().nullable(),
    salary: yup.string().nullable(),
    schedule: yup
      .mixed<VacancyScheduleEnum>()
      .oneOf(Object.values(VacancyScheduleEnum))
      .required(),
    publicationStatus: yup
      .mixed<PublicationStatusEnum>()
      .oneOf(Object.values(PublicationStatusEnum))
      .required(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<VacancyInput>({
    validationSchema,
  });

  const [title] = defineField("title");
  const [description] = defineField("description");
  const [experience] = defineField("experience");
  const [salary] = defineField("salary");
  const [schedule] = defineField("schedule");
  const [publicationStatus] = defineField("publicationStatus");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,
    title,
    description,
    experience,
    salary,
    schedule,
    publicationStatus,
    setErrors,
    setTouched,
    loading,
  };
}
