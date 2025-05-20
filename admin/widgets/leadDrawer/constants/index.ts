import {
  LeadSourceEnum,
  LeadStatusEnum,
  LeadTypeEnum,
} from "~/shared/api/generated";

export const leadTypes = [
  {
    id: LeadTypeEnum.SALER,
    title: "Продавец",
  },
  {
    id: LeadTypeEnum.BUYER,
    title: "Покупатель",
  },
  {
    id: LeadTypeEnum.BOTH,
    title: "Продавец и покупатель",
  },
];

export const leadSources = [
  {
    id: LeadSourceEnum.SOURCE,
    title: "Источник",
  },
];

export const leadStatuses = [
  {
    id: LeadStatusEnum.NEW,
    title: "Новый",
  },
  {
    id: LeadStatusEnum.IN_PROGRESS,
    title: "В работе",
  },
  {
    id: LeadStatusEnum.REFUSED,
    title: "Отказ",
  },
  {
    id: LeadStatusEnum.SUCCESS,
    title: "Успешный",
  },
  {
    id: LeadStatusEnum.THINKING,
    title: "Думает",
  },
];
