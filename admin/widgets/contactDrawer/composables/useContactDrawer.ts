import {
  ContactSourceEnum,
  CounterPartyTypeEnum,
  type ContactInput,
  type DocumentInput,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useContactDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование контакта" : "Создание контакта",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<ContactInput> = yup.object({
    id: yup.string().nullable(),
    surname: yup.string().required(),
    name: yup.string().required(),
    patronymic: yup.string().nullable(),
    birthday: yup.date().nullable(),
    phone: yup.string().required(),
    additionalPhones: yup.array(yup.string().defined()).default([]),
    email: yup.string().email().required(),
    company: yup.string().nullable(),
    agentIDs: yup.array(yup.string().defined()).nullable(),
    type: yup
      .mixed<CounterPartyTypeEnum>()
      .oneOf(Object.values(CounterPartyTypeEnum))
      .required(),
    source: yup
      .mixed<ContactSourceEnum>()
      .oneOf(Object.values(ContactSourceEnum))
      .required(),
    note: yup.string().nullable(),
    passportIssueDate: yup.date().nullable(),
    passportIssuedBy: yup.string().nullable(),
    passportIssuerCode: yup.string().nullable(),
    passportNumber: yup.string().nullable(),
    contracts: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    documents: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    address: yup.string().nullable(),
    internalInfo: yup.string().nullable(),
    dealIDs: yup.array(yup.string().defined()).default([]),
    propertyIDs: yup.array(yup.string().defined()).default([]),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<ContactInput>({
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
  const [agentIDs] = defineField("agentIDs");
  const [type] = defineField("type");
  const [source] = defineField("source");
  const [note] = defineField("note");
  const [passportIssueDate] = defineField("passportIssueDate");
  const [passportIssuedBy] = defineField("passportIssuedBy");
  const [passportIssuerCode] = defineField("passportIssuerCode");
  const [passportNumber] = defineField("passportNumber");
  const [contracts] = defineField("contracts");
  const [documents] = defineField("documents");
  const [address] = defineField("address");
  const [internalInfo] = defineField("internalInfo");
  const [dealIDs] = defineField("dealIDs");
  const [propertyIDs] = defineField("propertyIDs");

  const loading = ref(false);

  const formatIssuerCode = (event: Event) => {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, "");
    if (value.length > 3) {
      value = value.slice(0, 3) + "-" + value.slice(3, 6);
    }
    passportIssuerCode.value = value.slice(0, 7);
  };

  const formatPassportNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const partFirst = cleaned.slice(0, 4);
    const partSecond = cleaned.slice(4, 10);
    return partFirst + (partSecond ? ` ${partSecond}` : "");
  };

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
    agentIDs,
    type,
    source,
    note,
    passportIssueDate,
    passportIssuedBy,
    passportIssuerCode,
    passportNumber,
    contracts,
    documents,
    address,
    internalInfo,
    dealIDs,
    propertyIDs,
    formatIssuerCode,
    formatPassportNumber,
    setErrors,
    setTouched,
    loading,
  };
}
