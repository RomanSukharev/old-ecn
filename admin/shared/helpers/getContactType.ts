import { DealTypeEnum } from "../api/generated";

export function getContactType(deal: DealTypeEnum): string {
  switch (deal) {
    case DealTypeEnum.PURCHASE:
      return "Покупка";
    case DealTypeEnum.SALE:
      return "Продажа";
    default:
      return "Не указан";
  }
}
