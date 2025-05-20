import { PropertyTypeEnum } from "../api/generated";

export function getPropertyType(deal: PropertyTypeEnum): string {
  switch (deal) {
    case PropertyTypeEnum.COMMERCIAL:
      return "Коммерческая недвижимость";
    case PropertyTypeEnum.NEW:
      return "Новостройки";
    case PropertyTypeEnum.SUBURBAN:
      return "Загородная";
    case PropertyTypeEnum.USED:
      return "Вторичная";
    case PropertyTypeEnum.VILLAGE:
      return "Коттеджные поселки";
    default:
      return "Не указан";
  }
}
