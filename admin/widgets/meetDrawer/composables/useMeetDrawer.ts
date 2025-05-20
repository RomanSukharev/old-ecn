import {
  MeetCancelReasonEnum,
  MeetStatusEnum,
  MeetTypeEnum,
  type MeetInput,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useMeetDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование встречи / показа" : "Создание встречи / показа",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<MeetInput> = yup.object({
    accountantID: yup.string().nullable(),
    address: yup.string().nullable(),
    buyerAgency: yup.string().nullable(),
    buyerAgentID: yup.string().nullable(),
    buyerContactID: yup.string().nullable(),
    buyerPhone: yup.string().nullable(),
    cancelReason: yup
      .mixed<MeetCancelReasonEnum>()
      .oneOf(Object.values(MeetCancelReasonEnum))
      .nullable(),
    cancelReasonCustom: yup.string().nullable(),
    comment: yup.string().nullable(),
    dateTime: yup.date().nullable(),
    id: yup.string().nullable(),
    isOnline: yup.boolean().nullable(),
    lawerID: yup.string().nullable(),
    mortgageBrokerID: yup.string().nullable(),
    propertyID: yup.string().nullable(),
    sellerAgentID: yup.string().nullable(),
    sellerContactID: yup.string().nullable(),
    sellerPhone: yup.string().nullable(),
    status: yup
      .mixed<MeetStatusEnum>()
      .oneOf(Object.values(MeetStatusEnum))
      .nullable(),
    type: yup
      .mixed<MeetTypeEnum>()
      .oneOf(Object.values(MeetTypeEnum))
      .nullable(),
    useDealDeposit: yup.boolean().nullable(),
    useMortgage: yup.boolean().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<MeetInput>({
    validationSchema,
  });

  const [accountantID] = defineField("accountantID");
  const [address] = defineField("address");
  const [buyerAgency] = defineField("buyerAgency");
  const [buyerAgentID] = defineField("buyerAgentID");
  const [buyerContactID] = defineField("buyerContactID");
  const [buyerPhone] = defineField("buyerPhone");
  const [cancelReason] = defineField("cancelReason");
  const [cancelReasonCustom] = defineField("cancelReasonCustom");
  const [comment] = defineField("comment");
  const [dateTime] = defineField("dateTime");
  const [isOnline] = defineField("isOnline");
  const [lawerID] = defineField("lawerID");
  const [mortgageBrokerID] = defineField("mortgageBrokerID");
  const [propertyID] = defineField("propertyID");
  const [sellerAgentID] = defineField("sellerAgentID");
  const [sellerContactID] = defineField("sellerContactID");
  const [sellerPhone] = defineField("sellerPhone");
  const [status] = defineField("status");
  const [type] = defineField("type");
  const [useDealDeposit] = defineField("useDealDeposit");
  const [useMortgage] = defineField("useMortgage");

  const loading = ref(false);

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,

    accountantID,
    address,
    buyerAgency,
    buyerAgentID,
    buyerContactID,
    buyerPhone,
    cancelReason,
    cancelReasonCustom,
    comment,
    dateTime,
    isOnline,
    lawerID,
    mortgageBrokerID,
    propertyID,
    sellerAgentID,
    sellerContactID,
    sellerPhone,
    status,
    type,
    useDealDeposit,
    useMortgage,
    setErrors,
    setTouched,
    loading,
  };
}
