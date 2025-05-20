import { MeetTypeEnum, CounterPartyTypeEnum } from "~/shared/api/generated";

export const meetTypes = [
  {
    id: MeetTypeEnum.SALE,
    title: "Продажа",
  },
  {
    id: MeetTypeEnum.RENT,
    title: "Аренда",
  },
];

export const contactTypes = [
  {
    id: CounterPartyTypeEnum.SALER,
    title: "Продавец",
  },
  {
    id: CounterPartyTypeEnum.BUYER,
    title: "Покупатель",
  },
];

export const viewModes = [
  {
    id: "oneAgent",
    title: "1 агент",
    name: "oneAgent",
  },
  {
    id: "twoAgent",
    title: "2 агента",
    name: "twoAgent",
  },
  {
    id: "anotherAgency",
    title: "Другое агентство",
    name: "anotherAgency",
  },
];

export const viewTabs = [
  {
    id: "list",
    title: "Список",
  },
  {
    id: "calendar",
    title: "Календарь",
  },
];
