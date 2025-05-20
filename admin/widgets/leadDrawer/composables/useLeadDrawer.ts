import {
  LeadSourceEnum,
  LeadStatusEnum,
  LeadTypeEnum,
  type LeadInput,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование лида" : "Создание лида",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<LeadInput> = yup.object({
    id: yup.string().nullable(),
    test: yup.string(),
    surname: yup.string().required(),
    name: yup.string().required(),
    patronymic: yup.string().nullable(),
    birthday: yup.date().nullable(),
    phone: yup.string().required(),
    additionalPhones: yup.array(yup.string().defined()).default([]),
    email: yup.string().email().required(),
    company: yup.string().nullable(),
    address: yup.string().nullable(),
    agentIDs: yup.array(yup.string().defined()).nullable(),
    type: yup
      .mixed<LeadTypeEnum>()
      .oneOf(Object.values(LeadTypeEnum))
      .required(),
    source: yup
      .mixed<LeadSourceEnum>()
      .oneOf(Object.values(LeadSourceEnum))
      .required(),
    request: yup.string().nullable(),
    status: yup
      .mixed<LeadStatusEnum>()
      .oneOf(Object.values(LeadStatusEnum))
      .required(),
    comment: yup.string().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<LeadInput>({
    validationSchema,
  });

  const [surname] = defineField("surname");
  const [name] = defineField("name");
  const [patronymic] = defineField("patronymic");
  const [birthday] = defineField("birthday");
  const [phone] = defineField("phone");
  const [additionalPhones] = defineField("additionalPhones");
  const [email] = defineField("email");
  const [company] = defineField("company");
  const [address] = defineField("address");
  const [agentIDs] = defineField("agentIDs");
  const [type] = defineField("type");
  const [source] = defineField("source");
  const [request] = defineField("request");
  const [status] = defineField("status");
  const [comment] = defineField("comment");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,

    errors,
    handleSubmit,
    isSubmitting,

    surname,
    name,
    patronymic,
    birthday,
    phone,
    additionalPhones,
    email,
    company,
    address,
    type,
    agentIDs,
    source,
    request,
    status,
    comment,

    setErrors,
    setTouched,

    loading,
  };
}
