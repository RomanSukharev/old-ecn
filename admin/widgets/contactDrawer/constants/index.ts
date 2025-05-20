import {
  ContactSourceEnum,
  CounterPartyTypeEnum,
} from "~/shared/api/generated";

export const contactSources = [
  {
    id: ContactSourceEnum.SOURCE,
    title: "Источник",
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
  {
    id: CounterPartyTypeEnum.BOTH,
    title: "Продавец и покупатель",
  },
];
