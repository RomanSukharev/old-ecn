import {
  MortgageRequestStatusEnum,
  type MortgageRequestInput,
  type DocumentInput,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useMortgageRequestDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование ипотечной заявки" : "Создание ипотечной заявки",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<MortgageRequestInput> = yup.object({
    agentID: yup.string().nullable(),
    amount: yup.number().nullable(),
    bankIDs: yup.array(yup.string().required()).nullable(),
    comment: yup.string().nullable(),
    contactID: yup.string().nullable(),
    contracts: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    dealID: yup.string().nullable(),
    documents: yup.array(yup.mixed<DocumentInput>().required()).default([]),
    firstDeposit: yup.number().nullable(),
    id: yup.string().nullable(),
    mortgageBrokerID: yup.string().nullable(),
    percentage: yup.number().nullable(),
    period: yup.number().nullable(),
    propertyID: yup.string().nullable(),
    responseDate: yup.date().nullable(),
    sendDate: yup.date().nullable(),
    status: yup
      .mixed<MortgageRequestStatusEnum>()
      .oneOf(Object.values(MortgageRequestStatusEnum))
      .nullable(),
    validTillDate: yup.date().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<MortgageRequestInput>({
    validationSchema,
  });

  const [agentID] = defineField("agentID");
  const [amount] = defineField("amount");
  const [bankIDs] = defineField("bankIDs");
  const [comment] = defineField("comment");
  const [contactID] = defineField("contactID");
  const [contracts] = defineField("contracts");
  const [dealID] = defineField("dealID");
  const [documents] = defineField("documents");
  const [firstDeposit] = defineField("firstDeposit");
  const [id] = defineField("id");
  const [mortgageBrokerID] = defineField("mortgageBrokerID");
  const [percentage] = defineField("percentage");
  const [period] = defineField("period");
  const [propertyID] = defineField("propertyID");
  const [responseDate] = defineField("responseDate");
  const [sendDate] = defineField("sendDate");
  const [status] = defineField("status");
  const [validTillDate] = defineField("validTillDate");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,
    agentID,
    amount,
    bankIDs,
    comment,
    contactID,
    contracts,
    dealID,
    documents,
    firstDeposit,
    id,
    mortgageBrokerID,
    percentage,
    period,
    propertyID,
    responseDate,
    sendDate,
    status,
    validTillDate,
    setErrors,
    setTouched,
    loading,
  };
}
