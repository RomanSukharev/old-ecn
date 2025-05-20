import {
  DealStageEnum,
  DealTypeEnum,
  PropertyTypeEnum,
} from "~/shared/api/generated";

export const dealStages = [
  {
    id: DealStageEnum.DEPOSIT_PREPARATION,
    title: "Подготовка к задатку",
  },
  {
    id: DealStageEnum.DEPOSIT_PAID,
    title: "Задаток",
  },
  {
    id: DealStageEnum.SCHEDULED_FOR_DEAL,
    title: "Записаны на сделку",
  },
  {
    id: DealStageEnum.MFC_REGISTRATION,
    title: "На регистрации в МФЦ",
  },
  {
    id: DealStageEnum.REGISTERED,
    title: "Зарегестрировано (оплата комиссии)",
  },
];

export const dealTypes = [
  {
    id: DealTypeEnum.PURCHASE,
    title: "Покупка",
  },
  {
    id: DealTypeEnum.SALE,
    title: "Продажа",
  },
];

export const dealPropertyTypes = [
  {
    id: PropertyTypeEnum.COMMERCIAL,
    title: "Коммерческая недвижимость",
  },
  {
    id: PropertyTypeEnum.NEW,
    title: "Новостройки",
  },
  {
    id: PropertyTypeEnum.SUBURBAN,
    title: "Загородная",
  },
  {
    id: PropertyTypeEnum.USED,
    title: "Вторичная",
  },
  {
    id: PropertyTypeEnum.VILLAGE,
    title: "Коттеджные поселки",
  },
];
export const viewModes = [
  {
    id: "kanban",
    title: "Канбан",
  },
  {
    id: "list",
    title: "Список",
  },
];
