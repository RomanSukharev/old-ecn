import {
  DealEnum,
  PropertySourceEnum,
  PropertyStatusEnum,
  PropertySubTypeEnum,
  PropertyTypeEnum,
  PublicationStatusEnum,
  QuarterEnum,
  RehabTypeEnum,
  ToiletTypeEnum,
} from "../api/generated";

export const publicationStatuses = [
  {
    id: PublicationStatusEnum.DRAFT,
    title: "Черновик",
  },
  {
    id: PublicationStatusEnum.PUBLISHED,
    title: "Опубликован",
  },
  {
    id: PublicationStatusEnum.UNPUBLISHED,
    title: "Не опубликован",
  },
];

export const readinessQuarters = [
  {
    id: QuarterEnum.I,
    title: "I",
  },
  {
    id: QuarterEnum.II,
    title: "II",
  },
  {
    id: QuarterEnum.III,
    title: "III",
  },
  {
    id: QuarterEnum.IV,
    title: "IV",
  },
];

export const deals = [
  {
    id: DealEnum.SELL,
    title: "Продажа",
  },
  {
    id: DealEnum.RENT,
    title: "Аренда",
  },
];

export const propertySources = [
  {
    id: PropertySourceEnum.AVITO,
    title: "Авито",
  },
  {
    id: PropertySourceEnum.YOULA,
    title: "Юла",
  },
  {
    id: PropertySourceEnum.CIAN,
    title: "ЦИАН",
  },
  {
    id: PropertySourceEnum.DOMCLICK,
    title: "Домклик",
  },
  {
    id: PropertySourceEnum.YANDEX,
    title: "Яндекс",
  },
  {
    id: PropertySourceEnum.OTHER_AGGREGATOR,
    title: "Другие площадки",
  },
  {
    id: PropertySourceEnum.RECOMMENDATION,
    title: "Рекомендация",
  },
  {
    id: PropertySourceEnum.RETURNED_CLIENT,
    title: "Повторный клиент",
  },
  {
    id: PropertySourceEnum.LISTS,
    title: "Расклейка",
  },
  {
    id: PropertySourceEnum.SELECTION,
    title: "Делал подборку",
  },
  {
    id: PropertySourceEnum.OTHER,
    title: "Другое",
  },
];

export const propertyTypes = [
  {
    id: PropertyTypeEnum.USED,
    title: "Вторичная недвижимость",
  },
  {
    id: PropertyTypeEnum.NEW,
    title: "Новостройки",
  },
  {
    id: PropertyTypeEnum.VILLAGE,
    title: "Коттеджные посёлки",
  },
  {
    id: PropertyTypeEnum.SUBURBAN,
    title: "Загородная недвижимость",
  },
  {
    id: PropertyTypeEnum.COMMERCIAL,
    title: "Коммерческая недвижимость",
  },
];

export const propertySubTypes = [
  {
    id: PropertySubTypeEnum.APARTMENT,
    title: "Апартаменты",
  },
  {
    id: PropertySubTypeEnum.FLAT,
    title: "Квартира",
  },
  {
    id: PropertySubTypeEnum.GARAGE,
    title: "Гараж",
  },
  {
    id: PropertySubTypeEnum.HOUSE,
    title: "Дом",
  },
  {
    id: PropertySubTypeEnum.LAND,
    title: "Земельный участок",
  },
  {
    id: PropertySubTypeEnum.PARKING,
    title: "Машиноместо",
  },
  {
    id: PropertySubTypeEnum.ROOM,
    title: "Комната",
  },
  {
    id: PropertySubTypeEnum.STUDIO,
    title: "Студия",
  },
  {
    id: PropertySubTypeEnum.SUMMER_HOUSE,
    title: "Дача",
  },
  {
    id: PropertySubTypeEnum.TOWNHOUSE,
    title: "Таунхаус",
  },
];

export const propertyStatuses = [
  {
    id: PropertyStatusEnum.TRASH,
    title: "В отжиме",
  },
  {
    id: PropertyStatusEnum.PUBLISHED,
    title: "Опубликован",
  },
  {
    id: PropertyStatusEnum.UNPUBLISHED,
    title: "Не опубликован",
  },
];

export const toiletTypes = [
  {
    id: ToiletTypeEnum.SPLITTED,
    title: "Раздельный",
  },
  {
    id: ToiletTypeEnum.UNITED,
    title: "Совмещённый",
  },
];

export const rehabTypes = [
  {
    id: RehabTypeEnum.NONE,
    title: "Нет",
  },
  {
    id: RehabTypeEnum.DRAFT,
    title: "Черновая отделка",
  },
  {
    id: RehabTypeEnum.DEVELOPER,
    title: "От застройщика",
  },
  {
    id: RehabTypeEnum.CLEAN,
    title: "Чистовая отделка",
  },
  {
    id: RehabTypeEnum.DESIGN,
    title: "Дизайнерский",
  },
];
