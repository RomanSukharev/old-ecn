import type { TaskInput } from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useTaskDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование задачи" : "Создание задачи",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<TaskInput> = yup.object({
    assigneeID: yup.string().nullable(),
    contactID: yup.string().nullable(),
    contactPhone: yup.string().nullable(),
    dealID: yup.string().nullable(),
    details: yup.string().required(),
    durationDays: yup.number().integer().nullable(),
    durationHours: yup.number().integer().nullable(),
    id: yup.string().nullable(),
    isHot: yup.boolean().nullable(),
    leadID: yup.string().nullable(),
    propertyID: yup.string().nullable(),
    reporterID: yup.string().nullable(),
    startDate: yup.date().nullable(),
    tag: yup.string().nullable(),
    title: yup.string().required(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<TaskInput>({
    validationSchema,
  });

  const [title] = defineField("title");
  const [assigneeID] = defineField("assigneeID");
  const [contactID] = defineField("contactID");
  const [contactPhone] = defineField("contactPhone");
  const [dealID] = defineField("dealID");
  const [details] = defineField("details");
  const [durationDays] = defineField("durationDays");
  const [durationHours] = defineField("durationHours");
  const [id] = defineField("id");
  const [isHot] = defineField("isHot");
  const [leadID] = defineField("leadID");
  const [propertyID] = defineField("propertyID");
  const [reporterID] = defineField("reporterID");
  const [startDate] = defineField("startDate");
  const [tag] = defineField("tag");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,
    title,
    assigneeID,
    contactID,
    contactPhone,
    dealID,
    details,
    durationDays,
    durationHours,
    id,
    isHot,
    leadID,
    propertyID,
    reporterID,
    startDate,
    tag,
    setErrors,
    setTouched,
    loading,
  };
}
