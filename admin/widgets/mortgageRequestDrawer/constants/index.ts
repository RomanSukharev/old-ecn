import {
  MortgageRequestStatusEnum,
  PropertyTypeEnum,
} from "~/shared/api/generated";

export const mortgageRequestTypes = [
  {
    id: MortgageRequestStatusEnum.APPROVED,
    title: "Одобрено",
  },
  {
    id: MortgageRequestStatusEnum.OBJECT_APPROVAL,
    title: "Согласование объекта",
  },
  {
    id: MortgageRequestStatusEnum.REFUSAL,
    title: "Отказ",
  },
  {
    id: MortgageRequestStatusEnum.SENT,
    title: "Продан",
  },
];

export const propertyTypes = [
  {
    id: PropertyTypeEnum.NEW,
    title: "Новостройки",
  },
  {
    id: PropertyTypeEnum.USED,
    title: "Вторичная",
  },
  {
    id: PropertyTypeEnum.VILLAGE,
    title: "Коттеджные поселки",
  },
  {
    id: PropertyTypeEnum.SUBURBAN,
    title: "Загородная",
  },
  {
    id: PropertyTypeEnum.COMMERCIAL,
    title: "Коммерческая",
  },
];
