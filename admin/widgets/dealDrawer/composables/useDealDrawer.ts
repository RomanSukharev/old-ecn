import {
  DealStageEnum,
  DealTypeEnum,
  type DealInput,
  type DocumentInput,
} from "~/shared/api/generated";
import * as yup from "yup";
import type { IProps } from "../types";

export function useDealDrawer(props: IProps) {
  const drawerTitle = computed(() =>
    props.id ? "Редактирование сделки" : "Создание сделки",
  );

  const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

  const validationSchema: yup.ObjectSchema<DealInput> = yup.object({
    id: yup.string().nullable(),
    address: yup.string().nullable(),
    buyerPhone: yup.string().required(),
    sellerPhone: yup.string().required(),
    commissionAmount: yup.number().nullable(),
    dealDate: yup.date(),
    depositDate: yup.date(),
    internalComment: yup.string().nullable(),
    stage: yup
      .mixed<DealStageEnum>()
      .oneOf(Object.values(DealStageEnum))
      .required(),
    type: yup
      .mixed<DealTypeEnum>()
      .oneOf(Object.values(DealTypeEnum))
      .required(),
    buyerAgentID: yup.string().nullable(),
    buyerContactID: yup.string().nullable(),
    buyerDocuments: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    sellerAgentID: yup.string().nullable(),
    sellerContactID: yup.string().nullable(),
    sellerDocuments: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    mortgageBrokerID: yup.string().nullable(),
    mortgageDocuments: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    propertyID: yup.string().nullable(),
    accountantDocuments: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    accountantID: yup.string().nullable(),
    lawerDocuments: yup
      .array(yup.mixed<DocumentInput>().required())
      .default([]),
    lawerID: yup.string().nullable(),
    mortgageRequestID: yup.string().nullable(),
  });

  const {
    errors,
    defineField,
    handleSubmit,
    isSubmitting,
    setErrors,
    setTouched,
  } = useForm<DealInput>({
    validationSchema,
  });

  const [address] = defineField("address");
  const [buyerPhone] = defineField("buyerPhone");
  const [sellerPhone] = defineField("sellerPhone");
  const [commissionAmount] = defineField("commissionAmount");
  const [dealDate] = defineField("dealDate");
  const [depositDate] = defineField("depositDate");
  const [internalComment] = defineField("internalComment");
  const [stage] = defineField("stage");
  const [type] = defineField("type");
  const [buyerAgentID] = defineField("buyerAgentID");
  const [buyerContactID] = defineField("buyerContactID");
  const [buyerDocuments] = defineField("buyerDocuments");
  const [sellerAgentID] = defineField("sellerAgentID");
  const [sellerContactID] = defineField("sellerContactID");
  const [mortgageRequestID] = defineField("mortgageRequestID");
  const [sellerDocuments] = defineField("sellerDocuments");
  const [mortgageBrokerID] = defineField("mortgageBrokerID");
  const [mortgageDocuments] = defineField("mortgageDocuments");
  const [propertyID] = defineField("propertyID");
  const [accountantDocuments] = defineField("accountantDocuments");
  const [lawerDocuments] = defineField("lawerDocuments");
  const [accountantID] = defineField("accountantID");
  const [lawerID] = defineField("lawerID");

  const loading = ref(false);

  const clearPhone = (value: string): string => {
    if (!value) return "";

    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 11 && cleaned[0] === "7") {
      cleaned = "8" + cleaned.slice(1);
    } else if (cleaned.length < 11) {
      cleaned = "8" + cleaned;
    }

    return cleaned.slice(0, 11);
  };

  return {
    drawerTitle,
    saveButtonTitle,
    errors,
    handleSubmit,
    isSubmitting,
    address,
    buyerPhone,
    sellerPhone,
    commissionAmount,
    dealDate,
    depositDate,
    internalComment,
    stage,
    type,
    buyerAgentID,
    buyerContactID,
    buyerDocuments,
    sellerAgentID,
    sellerContactID,
    sellerDocuments,
    mortgageBrokerID,
    mortgageRequestID,
    mortgageDocuments,
    propertyID,
    accountantDocuments,
    lawerDocuments,
    accountantID,
    lawerID,
    clearPhone,
    setErrors,
    setTouched,
    loading,
  };
}
