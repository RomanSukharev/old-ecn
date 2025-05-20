// Этот файл был сгенерирован автоматически. Не редактируйте вручную!

/* eslint-disable */

import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import type * as VueCompositionApi from "vue";
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Cursor: { input: any; output: any };
  JSON: { input: any; output: any };
  Time: { input: any; output: any };
  Upload: { input: any; output: any };
};

export enum CommercialUsageEnum {
  BASE = "BASE",
  BUSINESS = "BUSINESS",
  FREE_USAGE = "FREE_USAGE",
  OFFICE = "OFFICE",
  PARKING = "PARKING",
  PRODUCTION = "PRODUCTION",
  RETAIL = "RETAIL",
  WAREHOUSE = "WAREHOUSE",
}

export type Complex = {
  address: Scalars["String"]["output"];
  cadastrNumber?: Maybe<Scalars["String"]["output"]>;
  cityDistance?: Maybe<Scalars["Int"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  description: Scalars["String"]["output"];
  developer?: Maybe<Developer>;
  documents?: Maybe<Array<Document>>;
  id: Scalars["ID"]["output"];
  images?: Maybe<Array<Image>>;
  inCity?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  readinessQuarter?: Maybe<QuarterEnum>;
  readinessYear?: Maybe<Scalars["Int"]["output"]>;
  region?: Maybe<Scalars["String"]["output"]>;
  seoText?: Maybe<Scalars["String"]["output"]>;
  subRegion?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  tourLink?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Time"]["output"];
  youtubeLink?: Maybe<Scalars["String"]["output"]>;
};

export type ComplexConnection = {
  edges: Array<ComplexEdge>;
  nodes: Array<Complex>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ComplexEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Complex;
};

export type ComplexHouse = {
  address: Scalars["String"]["output"];
  cadastrNumber?: Maybe<Scalars["String"]["output"]>;
  complex?: Maybe<Complex>;
  createdAt: Scalars["Time"]["output"];
  description: Scalars["String"]["output"];
  documents?: Maybe<Array<Document>>;
  id: Scalars["ID"]["output"];
  images?: Maybe<Array<Image>>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  readinessQuarter?: Maybe<QuarterEnum>;
  readinessYear?: Maybe<Scalars["Int"]["output"]>;
  seoText?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  tourLink?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Time"]["output"];
  youtubeLink?: Maybe<Scalars["String"]["output"]>;
};

export type ComplexHouseConnection = {
  edges: Array<ComplexHouseEdge>;
  nodes: Array<ComplexHouse>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ComplexHouseEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: ComplexHouse;
};

export type ComplexHouseFilter = {
  complexID?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ContentBlock = {
  data: Scalars["JSON"]["output"];
  isVisible: Scalars["Boolean"]["output"];
  type: ContentBlockType;
};

export type ContentBlockInput = {
  data: Scalars["JSON"]["input"];
  isVisible: Scalars["Boolean"]["input"];
  type: ContentBlockType;
};

export enum ContentBlockType {
  ACCORDION = "ACCORDION",
  CITE = "CITE",
  FILES = "FILES",
  IMAGES = "IMAGES",
  SPECIAL = "SPECIAL",
  TEXT = "TEXT",
  YOUTUBE = "YOUTUBE",
}

export enum DealEnum {
  RENT = "RENT",
  SELL = "SELL",
}

export type Developer = {
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  logo?: Maybe<Image>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Time"]["output"];
  url?: Maybe<Scalars["String"]["output"]>;
};

export type DeveloperConnection = {
  edges: Array<DeveloperEdge>;
  nodes: Array<Developer>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type DeveloperEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Developer;
};

export type Document = {
  createdAt: Scalars["Time"]["output"];
  fileName: Scalars["String"]["output"];
  fileType: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  path: Scalars["String"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
  url: Scalars["String"]["output"];
};

export type DocumentInput = {
  file?: InputMaybe<Scalars["Upload"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Employee = {
  avatar?: Maybe<Image>;
  birthday?: Maybe<Scalars["Time"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted: Scalars["Boolean"]["output"];
  isPublished: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  patronymic?: Maybe<Scalars["String"]["output"]>;
  phone: Scalars["String"]["output"];
  publicImage?: Maybe<Image>;
  shortDescription?: Maybe<Scalars["String"]["output"]>;
  surname: Scalars["String"]["output"];
  updatedAt: Scalars["Time"]["output"];
};

export type EmployeeConnection = {
  edges: Array<EmployeeEdge>;
  nodes: Array<Employee>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type EmployeeEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Employee;
};

export type Image = {
  blurHash?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  fileName: Scalars["String"]["output"];
  fileType: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  path: Scalars["String"]["output"];
  preset: ImagePreset;
  previewPath?: Maybe<Scalars["String"]["output"]>;
  previewUrl?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  url: Scalars["String"]["output"];
};

export type ImageInput = {
  file?: InputMaybe<Scalars["Upload"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  preset?: InputMaybe<ImagePreset>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ImagePreset {
  CONTENT_KB_ARTICLE_COVER = "CONTENT_KB_ARTICLE_COVER",
  CONTENT_SITE_STORY_COVER = "CONTENT_SITE_STORY_COVER",
  CONTENT_SITE_STORY_PHOTO = "CONTENT_SITE_STORY_PHOTO",
  ESTATE_COMPLEX_PHOTO = "ESTATE_COMPLEX_PHOTO",
  ESTATE_PROPERTY_PHOTO = "ESTATE_PROPERTY_PHOTO",
  STAFF_EMPLOYEE_AVATAR = "STAFF_EMPLOYEE_AVATAR",
  STAFF_EMPLOYEE_PUBLIC_IMAGE = "STAFF_EMPLOYEE_PUBLIC_IMAGE",
}

export type Mutation = {
  createVacancyRequest: Scalars["Boolean"]["output"];
  uploadDocument: Document;
  uploadImage: Image;
};

export type MutationCreateVacancyRequestArgs = {
  input: VacancyRequestInput;
};

export type MutationUploadDocumentArgs = {
  input: DocumentInput;
};

export type MutationUploadImageArgs = {
  input: ImageInput;
};

export type Node = {
  id: Scalars["ID"]["output"];
};

export type Page = {
  contentBlocks: Array<ContentBlock>;
  createdAt: Scalars["Time"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  status: PublicationStatusEnum;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Time"]["output"];
  url: Scalars["String"]["output"];
};

export type PageConnection = {
  edges: Array<PageEdge>;
  nodes: Array<Page>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type PageEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Page;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars["Cursor"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["Cursor"]["output"]>;
};

export type PaginationInput = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Property = {
  address?: Maybe<Scalars["String"]["output"]>;
  area?: Maybe<Scalars["Float"]["output"]>;
  cadastrNumber?: Maybe<Scalars["String"]["output"]>;
  ceilingHeight?: Maybe<Scalars["Float"]["output"]>;
  cityDistance?: Maybe<Scalars["Int"]["output"]>;
  comissionAmount?: Maybe<Scalars["Float"]["output"]>;
  comissionPercent?: Maybe<Scalars["Float"]["output"]>;
  commercialUsage?: Maybe<Array<Maybe<CommercialUsageEnum>>>;
  complex?: Maybe<Complex>;
  complexHouse?: Maybe<ComplexHouse>;
  createdAt: Scalars["Time"]["output"];
  deal?: Maybe<DealEnum>;
  description?: Maybe<Scalars["String"]["output"]>;
  documents?: Maybe<Array<Maybe<Document>>>;
  floor?: Maybe<Scalars["Int"]["output"]>;
  floors?: Maybe<Scalars["Int"]["output"]>;
  fromDeveloper?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  images?: Maybe<Array<Maybe<Image>>>;
  inCity?: Maybe<Scalars["Boolean"]["output"]>;
  inComplex?: Maybe<Scalars["Boolean"]["output"]>;
  inVillage?: Maybe<Scalars["Boolean"]["output"]>;
  internalID?: Maybe<Scalars["Int"]["output"]>;
  isHot?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  kitchenArea?: Maybe<Scalars["Float"]["output"]>;
  landArea?: Maybe<Scalars["Float"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  livingArea?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  pricePerAr?: Maybe<Scalars["Float"]["output"]>;
  pricePerMeter?: Maybe<Scalars["Float"]["output"]>;
  readinessQuarter?: Maybe<QuarterEnum>;
  readinessYear?: Maybe<Scalars["Int"]["output"]>;
  refreshDate?: Maybe<Scalars["Time"]["output"]>;
  region?: Maybe<Scalars["String"]["output"]>;
  rehabType?: Maybe<RehabTypeEnum>;
  rooms?: Maybe<Scalars["Int"]["output"]>;
  seoText?: Maybe<Scalars["String"]["output"]>;
  subRegion?: Maybe<Scalars["String"]["output"]>;
  subType?: Maybe<PropertySubTypeEnum>;
  title?: Maybe<Scalars["String"]["output"]>;
  toiletType?: Maybe<ToiletTypeEnum>;
  tourLink?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<PropertyTypeEnum>;
  updatedAt: Scalars["Time"]["output"];
  village?: Maybe<Village>;
  youtubeLink?: Maybe<Scalars["String"]["output"]>;
};

export type PropertyConnection = {
  edges: Array<PropertyEdge>;
  nodes: Array<Property>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type PropertyEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Property;
};

export type PropertyFilter = {
  complexHouseID?: InputMaybe<Scalars["String"]["input"]>;
  complexID?: InputMaybe<Scalars["String"]["input"]>;
  deal?: InputMaybe<DealEnum>;
  fromDeveloper?: InputMaybe<Scalars["Boolean"]["input"]>;
  inCity?: InputMaybe<Scalars["Boolean"]["input"]>;
  isHot?: InputMaybe<Scalars["Boolean"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxArea?: InputMaybe<Scalars["Float"]["input"]>;
  maxCityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  maxLandArea?: InputMaybe<Scalars["Float"]["input"]>;
  maxPrice?: InputMaybe<Scalars["Float"]["input"]>;
  maxPricePerAr?: InputMaybe<Scalars["Float"]["input"]>;
  maxPricePerMeter?: InputMaybe<Scalars["Float"]["input"]>;
  maxRooms?: InputMaybe<Scalars["Float"]["input"]>;
  minArea?: InputMaybe<Scalars["Float"]["input"]>;
  minCityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  minLandArea?: InputMaybe<Scalars["Float"]["input"]>;
  minPrice?: InputMaybe<Scalars["Float"]["input"]>;
  minPricePerAr?: InputMaybe<Scalars["Float"]["input"]>;
  minPricePerMeter?: InputMaybe<Scalars["Float"]["input"]>;
  minRooms?: InputMaybe<Scalars["Float"]["input"]>;
  subType?: InputMaybe<PropertySubTypeEnum>;
  type?: InputMaybe<PropertyTypeEnum>;
  villageID?: InputMaybe<Scalars["String"]["input"]>;
  withPhotos?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum PropertySourceEnum {
  AVITO = "AVITO",
  CIAN = "CIAN",
  DOMCLICK = "DOMCLICK",
  LISTS = "LISTS",
  OTHER = "OTHER",
  OTHER_AGGREGATOR = "OTHER_AGGREGATOR",
  RECOMMENDATION = "RECOMMENDATION",
  RETURNED_CLIENT = "RETURNED_CLIENT",
  SELECTION = "SELECTION",
  YANDEX = "YANDEX",
  YOULA = "YOULA",
}

export enum PropertyStatusEnum {
  ARCHIVED = "ARCHIVED",
  ON_MODERATION = "ON_MODERATION",
  PUBLISHED = "PUBLISHED",
  TRASH = "TRASH",
  UNPUBLISHED = "UNPUBLISHED",
}

export enum PropertySubTypeEnum {
  APARTMENT = "APARTMENT",
  FLAT = "FLAT",
  GARAGE = "GARAGE",
  HOUSE = "HOUSE",
  LAND = "LAND",
  PARKING = "PARKING",
  ROOM = "ROOM",
  STUDIO = "STUDIO",
  SUMMER_HOUSE = "SUMMER_HOUSE",
  TOWNHOUSE = "TOWNHOUSE",
}

export enum PropertyTypeEnum {
  COMMERCIAL = "COMMERCIAL",
  NEW = "NEW",
  SUBURBAN = "SUBURBAN",
  USED = "USED",
  VILLAGE = "VILLAGE",
}

/** Статус публикации */
export enum PublicationStatusEnum {
  /** Черновик */
  DRAFT = "DRAFT",
  /** Запись опубликована */
  PUBLISHED = "PUBLISHED",
  /** Запись снята с публикации */
  UNPUBLISHED = "UNPUBLISHED",
}

export enum QuarterEnum {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
}

export type Query = {
  complex: Complex;
  complexHouse: ComplexHouse;
  complexHouses: ComplexHouseConnection;
  complexes: ComplexConnection;
  developer: Developer;
  developers: DeveloperConnection;
  employee: Employee;
  employees: EmployeeConnection;
  generatePdf: Scalars["String"]["output"];
  /** Получение страницы по URL */
  page: Page;
  properties: PropertyConnection;
  property: Property;
  /** Получение отзыва по идентификатору */
  review: Review;
  /** Получение списка отзывов */
  reviews: ReviewConnection;
  /** Получение списка новостей */
  stories: StoryConnection;
  /** Получение новости по идентификатору */
  story: Story;
  /** Получение списка вакансий */
  vacancies: VacancyConnection;
  /** Получение вакансии по идентификатору */
  vacancy: Vacancy;
  village: Village;
  villages: VillageConnection;
};

export type QueryComplexArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryComplexHouseArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryComplexHousesArgs = {
  filter?: InputMaybe<ComplexHouseFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryComplexesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDeveloperArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDevelopersArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryEmployeeArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryEmployeesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGeneratePdfArgs = {
  content: Scalars["String"]["input"];
  fileName: Scalars["String"]["input"];
};

export type QueryPageArgs = {
  url: Scalars["String"]["input"];
};

export type QueryPropertiesArgs = {
  filter?: InputMaybe<PropertyFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryReviewArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryReviewsArgs = {
  filter?: InputMaybe<ReviewsFilterInput>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStoriesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStoryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryVacanciesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryVacancyArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryVillageArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryVillagesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Readiness = {
  quarter?: Maybe<Scalars["Int"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export enum RehabTypeEnum {
  CLEAN = "CLEAN",
  DESIGN = "DESIGN",
  DEVELOPER = "DEVELOPER",
  DRAFT = "DRAFT",
  NONE = "NONE",
}

/** Отзыв */
export type Review = {
  /** Имя автора */
  authorName: Scalars["String"]["output"];
  /** Номер телефона автора */
  authorPhone: Scalars["String"]["output"];
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Сотрудник */
  employee?: Maybe<Employee>;
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Статус отзыва */
  status: ReviewStatusEnum;
  /** Текст отзыва */
  text: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

export type ReviewConnection = {
  edges: Array<ReviewEdge>;
  nodes: Array<Review>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ReviewEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Review;
};

/** Статус отзыва */
export enum ReviewStatusEnum {
  /** Подтверждён */
  APPROVED = "APPROVED",
  /** Отклонён */
  DECLINED = "DECLINED",
  /** Новый */
  NEW = "NEW",
}

/** Расширенный фильтр по отзывам */
export type ReviewsFilterInput = {
  /** Набор идентфикаторов сотрудников для фильтрации */
  employees?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  /** Набор статусов для фильтрации */
  statuses?: InputMaybe<Array<ReviewStatusEnum>>;
};

/** Режим сортировки для списочных методов */
export type Sort = {
  /** Направление сортировки по выбранному полю */
  direction?: InputMaybe<SortDirection>;
  /** Поле, по которому производится сортировка */
  field?: InputMaybe<Scalars["String"]["input"]>;
};

/** Направления сортировки */
export enum SortDirection {
  /** По возрастанию */
  ASC = "ASC",
  /** По убыванию */
  DESC = "DESC",
}

/** Новость */
export type Story = {
  category: StoryCategoryEnum;
  contentBlocks: Array<ContentBlock>;
  cover?: Maybe<Image>;
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  teaser?: Maybe<Scalars["String"]["output"]>;
  /** Название */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

/** Категория новости */
export enum StoryCategoryEnum {
  /** Жизнь компании */
  COMPANY = "COMPANY",
  /** Недвижимость */
  ESTATE = "ESTATE",
  /** Новости */
  NEWS = "NEWS",
}

export type StoryConnection = {
  edges: Array<StoryEdge>;
  nodes: Array<Story>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type StoryEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Story;
};

export enum ToiletTypeEnum {
  SPLITTED = "SPLITTED",
  UNITED = "UNITED",
}

/** Вакансия */
export type Vacancy = {
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Описание вакансии */
  description: Scalars["String"]["output"];
  /** Стаж */
  experience?: Maybe<Scalars["String"]["output"]>;
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Статус вакансии */
  publicationStatus: PublicationStatusEnum;
  /** Заработная плата */
  salary?: Maybe<Scalars["String"]["output"]>;
  /** График работы */
  schedule: VacancyScheduleEnum;
  /** Название вакансии */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

export type VacancyConnection = {
  edges: Array<VacancyEdge>;
  nodes: Array<Vacancy>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type VacancyEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Vacancy;
};

/** Отклик на вакансию */
export type VacancyRequestInput = {
  /** Вложения */
  attachments?: InputMaybe<Array<DocumentInput>>;
  /** Сопроводительное письмо */
  letter: Scalars["String"]["input"];
  /** Имя соискателя */
  name: Scalars["String"]["input"];
  /** Связанная вакансия */
  vacancy: Scalars["ID"]["input"];
};

/** График работы по вакансии */
export enum VacancyScheduleEnum {
  /** Полный день */
  FULL_TIME = "FULL_TIME",
  /** Частичная занятость */
  PART_TIME = "PART_TIME",
}

export type Village = {
  address: Scalars["String"]["output"];
  cadastrNumber?: Maybe<Scalars["String"]["output"]>;
  cityDistance?: Maybe<Scalars["Int"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  description: Scalars["String"]["output"];
  developer?: Maybe<Developer>;
  documents?: Maybe<Array<Document>>;
  id: Scalars["ID"]["output"];
  images?: Maybe<Array<Image>>;
  inCity?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  readinessQuarter?: Maybe<QuarterEnum>;
  readinessYear?: Maybe<Scalars["Int"]["output"]>;
  region?: Maybe<Scalars["String"]["output"]>;
  seoText?: Maybe<Scalars["String"]["output"]>;
  subRegion?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  tourLink?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Time"]["output"];
  youtubeLink?: Maybe<Scalars["String"]["output"]>;
};

export type VillageConnection = {
  edges: Array<VillageEdge>;
  nodes: Array<Village>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type VillageEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Village;
};

export type HomeQuery_complexes_ComplexConnection_nodes_Complex_developer_Developer =
  { title: string };

export type HomeQuery_complexes_ComplexConnection_nodes_Complex_images_Image = {
  url: string;
};

export type HomeQuery_complexes_ComplexConnection_nodes_Complex = {
  id: string;
  title: string;
  address: string;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  isReady?: boolean;
  developer?: HomeQuery_complexes_ComplexConnection_nodes_Complex_developer_Developer;
  images?: Array<HomeQuery_complexes_ComplexConnection_nodes_Complex_images_Image>;
};

export type HomeQuery_complexes_ComplexConnection = {
  nodes: Array<HomeQuery_complexes_ComplexConnection_nodes_Complex>;
};

export type HomeQuery_villages_VillageConnection_nodes_Village_developer_Developer =
  { title: string };

export type HomeQuery_villages_VillageConnection_nodes_Village_images_Image = {
  url: string;
};

export type HomeQuery_villages_VillageConnection_nodes_Village = {
  id: string;
  title: string;
  address: string;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  isReady?: boolean;
  developer?: HomeQuery_villages_VillageConnection_nodes_Village_developer_Developer;
  images?: Array<HomeQuery_villages_VillageConnection_nodes_Village_images_Image>;
};

export type HomeQuery_villages_VillageConnection = {
  nodes: Array<HomeQuery_villages_VillageConnection_nodes_Village>;
};

export type HomeQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image =
  { url: string };

export type HomeQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image =
  { url: string };

export type HomeQuery_employees_EmployeeConnection_nodes_Employee = {
  id: string;
  name: string;
  surname: string;
  shortDescription?: string;
  description?: string;
  avatar?: HomeQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image;
  publicImage?: HomeQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image;
};

export type HomeQuery_employees_EmployeeConnection = {
  nodes: Array<HomeQuery_employees_EmployeeConnection_nodes_Employee>;
};

export type HomeQuery_Query = {
  complexes: HomeQuery_complexes_ComplexConnection;
  villages: HomeQuery_villages_VillageConnection;
  employees: HomeQuery_employees_EmployeeConnection;
};

export type HomeQueryVariables = Exact<{ [key: string]: never }>;

export type HomeQuery = HomeQuery_Query;

export type VacanciesQuery_vacancies_VacancyConnection_nodes_Vacancy = {
  id: string;
  title: string;
  description: string;
  experience?: string;
  salary?: string;
  schedule: VacancyScheduleEnum;
};

export type VacanciesQuery_vacancies_VacancyConnection = {
  nodes: Array<VacanciesQuery_vacancies_VacancyConnection_nodes_Vacancy>;
};

export type VacanciesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image =
  { url: string };

export type VacanciesQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image =
  { url: string };

export type VacanciesQuery_employees_EmployeeConnection_nodes_Employee = {
  id: string;
  name: string;
  surname: string;
  shortDescription?: string;
  description?: string;
  avatar?: VacanciesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image;
  publicImage?: VacanciesQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image;
};

export type VacanciesQuery_employees_EmployeeConnection = {
  nodes: Array<VacanciesQuery_employees_EmployeeConnection_nodes_Employee>;
};

export type VacanciesQuery_Query = {
  vacancies: VacanciesQuery_vacancies_VacancyConnection;
  employees: VacanciesQuery_employees_EmployeeConnection;
};

export type VacanciesQueryVariables = Exact<{ [key: string]: never }>;

export type VacanciesQuery = VacanciesQuery_Query;

export type StoriesQuery_stories_StoryConnection_nodes_Story_cover_Image = {
  url: string;
};

export type StoriesQuery_stories_StoryConnection_nodes_Story = {
  id: string;
  category: StoryCategoryEnum;
  title: string;
  teaser?: string;
  createdAt: any;
  updatedAt: any;
  cover?: StoriesQuery_stories_StoryConnection_nodes_Story_cover_Image;
};

export type StoriesQuery_stories_StoryConnection = {
  totalCount: number;
  nodes: Array<StoriesQuery_stories_StoryConnection_nodes_Story>;
};

export type StoriesQuery_Query = {
  stories: StoriesQuery_stories_StoryConnection;
};

export type StoriesQueryVariables = Exact<{ [key: string]: never }>;

export type StoriesQuery = StoriesQuery_Query;

export type StoryQuery_story_Story_cover_Image = { id: string; url: string };

export type StoryQuery_story_Story_contentBlocks_ContentBlock = {
  data: any;
  type: ContentBlockType;
  isVisible: boolean;
};

export type StoryQuery_story_Story = {
  id: string;
  category: StoryCategoryEnum;
  title: string;
  teaser?: string;
  createdAt: any;
  updatedAt: any;
  cover?: StoryQuery_story_Story_cover_Image;
  contentBlocks: Array<StoryQuery_story_Story_contentBlocks_ContentBlock>;
};

export type StoryQuery_Query = { story: StoryQuery_story_Story };

export type StoryQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type StoryQuery = StoryQuery_Query;

export type ComplexQuery_complex_Complex_developer_Developer = {
  id: string;
  title: string;
};

export type ComplexQuery_complex_Complex_images_Image = {
  id: string;
  url: string;
  title?: string;
};

export type ComplexQuery_complex_Complex_documents_Document = {
  id: string;
  url: string;
  title?: string;
  fileName: string;
};

export type ComplexQuery_complex_Complex_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string;
  fileName: string;
};

export type ComplexQuery_complex_Complex = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  seoText?: string;
  youtubeLink?: string;
  tourLink?: string;
  inCity?: boolean;
  cityDistance?: number;
  region?: string;
  subRegion?: string;
  isReady?: boolean;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  createdAt: any;
  updatedAt: any;
  developer?: ComplexQuery_complex_Complex_developer_Developer;
  images?: Array<ComplexQuery_complex_Complex_images_Image>;
  documents?: Array<ComplexQuery_complex_Complex_documents_Document>;
  projectDeclarations?: Array<ComplexQuery_complex_Complex_projectDeclarations_Document>;
};

export type ComplexQuery_Query = { complex: ComplexQuery_complex_Complex };

export type ComplexQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ComplexQuery = ComplexQuery_Query;

export type ComplexHouseQuery_complexHouse_ComplexHouse_complex_Complex = {
  id: string;
  title: string;
};

export type ComplexHouseQuery_complexHouse_ComplexHouse_images_Image = {
  id: string;
  url: string;
  title?: string;
};

export type ComplexHouseQuery_complexHouse_ComplexHouse_documents_Document = {
  id: string;
  url: string;
  title?: string;
  fileName: string;
};

export type ComplexHouseQuery_complexHouse_ComplexHouse_projectDeclarations_Document =
  { id: string; url: string; title?: string; fileName: string };

export type ComplexHouseQuery_complexHouse_ComplexHouse = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  seoText?: string;
  youtubeLink?: string;
  tourLink?: string;
  isReady?: boolean;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  createdAt: any;
  updatedAt: any;
  complex?: ComplexHouseQuery_complexHouse_ComplexHouse_complex_Complex;
  images?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_images_Image>;
  documents?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_documents_Document>;
  projectDeclarations?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_projectDeclarations_Document>;
};

export type ComplexHouseQuery_Query = {
  complexHouse: ComplexHouseQuery_complexHouse_ComplexHouse;
};

export type ComplexHouseQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ComplexHouseQuery = ComplexHouseQuery_Query;

export type ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_complex_Complex =
  { id: string; title: string };

export type ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_images_Image =
  { id: string; url: string; title?: string };

export type ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse =
  {
    id: string;
    title: string;
    description: string;
    address: string;
    lat?: number;
    lon?: number;
    cadastrNumber?: string;
    isReady?: boolean;
    readinessQuarter?: QuarterEnum;
    readinessYear?: number;
    createdAt: any;
    updatedAt: any;
    complex?: ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_complex_Complex;
    images?: Array<ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_images_Image>;
  };

export type ComplexHousesQuery_complexHouses_ComplexHouseConnection = {
  totalCount: number;
  nodes: Array<ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse>;
};

export type ComplexHousesQuery_Query = {
  complexHouses: ComplexHousesQuery_complexHouses_ComplexHouseConnection;
};

export type ComplexHousesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<ComplexHouseFilter>;
}>;

export type ComplexHousesQuery = ComplexHousesQuery_Query;

export type ComplexesQuery_complexes_ComplexConnection_nodes_Complex_developer_Developer =
  { id: string; title: string };

export type ComplexesQuery_complexes_ComplexConnection_nodes_Complex_images_Image =
  { id: string; url: string; title?: string };

export type ComplexesQuery_complexes_ComplexConnection_nodes_Complex = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  inCity?: boolean;
  cityDistance?: number;
  isReady?: boolean;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  createdAt: any;
  updatedAt: any;
  developer?: ComplexesQuery_complexes_ComplexConnection_nodes_Complex_developer_Developer;
  images?: Array<ComplexesQuery_complexes_ComplexConnection_nodes_Complex_images_Image>;
};

export type ComplexesQuery_complexes_ComplexConnection = {
  totalCount: number;
  nodes: Array<ComplexesQuery_complexes_ComplexConnection_nodes_Complex>;
};

export type ComplexesQuery_Query = {
  complexes: ComplexesQuery_complexes_ComplexConnection;
};

export type ComplexesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ComplexesQuery = ComplexesQuery_Query;

export type DeveloperQuery_developer_Developer = {
  id: string;
  title: string;
  url?: string;
  createdAt: any;
  updatedAt: any;
};

export type DeveloperQuery_Query = {
  developer: DeveloperQuery_developer_Developer;
};

export type DeveloperQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeveloperQuery = DeveloperQuery_Query;

export type DevelopersQuery_developers_DeveloperConnection_nodes_Developer = {
  id: string;
  title: string;
  url?: string;
  createdAt: any;
  updatedAt: any;
};

export type DevelopersQuery_developers_DeveloperConnection = {
  totalCount: number;
  nodes: Array<DevelopersQuery_developers_DeveloperConnection_nodes_Developer>;
};

export type DevelopersQuery_Query = {
  developers: DevelopersQuery_developers_DeveloperConnection;
};

export type DevelopersQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type DevelopersQuery = DevelopersQuery_Query;

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_complex_Complex =
  { id: string; title: string };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_complexHouse_ComplexHouse =
  { id: string; title: string };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_village_Village =
  { id: string; title: string };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_documents_Document =
  { id: string; url: string; title?: string };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_images_Image =
  { id: string; url: string; title?: string };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property = {
  id: string;
  internalID?: number;
  deal?: DealEnum;
  type?: PropertyTypeEnum;
  subType?: PropertySubTypeEnum;
  commercialUsage?: Array<CommercialUsageEnum>;
  fromDeveloper?: boolean;
  inComplex?: boolean;
  inVillage?: boolean;
  isHot?: boolean;
  title?: string;
  description?: string;
  address?: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  seoText?: string;
  youtubeLink?: string;
  tourLink?: string;
  refreshDate?: any;
  price?: number;
  pricePerMeter?: number;
  pricePerAr?: number;
  isReady?: boolean;
  readinessYear?: number;
  readinessQuarter?: QuarterEnum;
  inCity?: boolean;
  cityDistance?: number;
  region?: string;
  subRegion?: string;
  rooms?: number;
  area?: number;
  landArea?: number;
  livingArea?: number;
  kitchenArea?: number;
  toiletType?: ToiletTypeEnum;
  rehabType?: RehabTypeEnum;
  floor?: number;
  floors?: number;
  ceilingHeight?: number;
  comissionPercent?: number;
  comissionAmount?: number;
  createdAt: any;
  updatedAt: any;
  complex?: PropertiesQuery_properties_PropertyConnection_nodes_Property_complex_Complex;
  complexHouse?: PropertiesQuery_properties_PropertyConnection_nodes_Property_complexHouse_ComplexHouse;
  village?: PropertiesQuery_properties_PropertyConnection_nodes_Property_village_Village;
  documents?: Array<PropertiesQuery_properties_PropertyConnection_nodes_Property_documents_Document>;
  images?: Array<PropertiesQuery_properties_PropertyConnection_nodes_Property_images_Image>;
};

export type PropertiesQuery_properties_PropertyConnection = {
  totalCount: number;
  nodes: Array<PropertiesQuery_properties_PropertyConnection_nodes_Property>;
};

export type PropertiesQuery_Query = {
  properties: PropertiesQuery_properties_PropertyConnection;
};

export type PropertiesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<PropertyFilter>;
}>;

export type PropertiesQuery = PropertiesQuery_Query;

export type PropertyQuery_property_Property_complex_Complex_images_Image = {
  id: string;
  url: string;
};

export type PropertyQuery_property_Property_complex_Complex = {
  id: string;
  title: string;
  images?: Array<PropertyQuery_property_Property_complex_Complex_images_Image>;
};

export type PropertyQuery_property_Property_complexHouse_ComplexHouse = {
  id: string;
  title: string;
};

export type PropertyQuery_property_Property_village_Village_images_Image = {
  id: string;
  url: string;
};

export type PropertyQuery_property_Property_village_Village = {
  id: string;
  title: string;
  images?: Array<PropertyQuery_property_Property_village_Village_images_Image>;
};

export type PropertyQuery_property_Property_documents_Document = {
  id: string;
  url: string;
  title?: string;
};

export type PropertyQuery_property_Property_images_Image = {
  id: string;
  url: string;
  title?: string;
};

export type PropertyQuery_property_Property = {
  id: string;
  internalID?: number;
  deal?: DealEnum;
  type?: PropertyTypeEnum;
  subType?: PropertySubTypeEnum;
  commercialUsage?: Array<CommercialUsageEnum>;
  fromDeveloper?: boolean;
  inComplex?: boolean;
  inVillage?: boolean;
  isHot?: boolean;
  title?: string;
  description?: string;
  address?: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  seoText?: string;
  youtubeLink?: string;
  tourLink?: string;
  refreshDate?: any;
  price?: number;
  pricePerMeter?: number;
  pricePerAr?: number;
  isReady?: boolean;
  readinessYear?: number;
  readinessQuarter?: QuarterEnum;
  inCity?: boolean;
  cityDistance?: number;
  region?: string;
  subRegion?: string;
  rooms?: number;
  area?: number;
  landArea?: number;
  livingArea?: number;
  kitchenArea?: number;
  toiletType?: ToiletTypeEnum;
  rehabType?: RehabTypeEnum;
  floor?: number;
  floors?: number;
  ceilingHeight?: number;
  comissionPercent?: number;
  comissionAmount?: number;
  createdAt: any;
  updatedAt: any;
  complex?: PropertyQuery_property_Property_complex_Complex;
  complexHouse?: PropertyQuery_property_Property_complexHouse_ComplexHouse;
  village?: PropertyQuery_property_Property_village_Village;
  documents?: Array<PropertyQuery_property_Property_documents_Document>;
  images?: Array<PropertyQuery_property_Property_images_Image>;
};

export type PropertyQuery_Query = { property: PropertyQuery_property_Property };

export type PropertyQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type PropertyQuery = PropertyQuery_Query;

export type VillageQuery_village_Village_developer_Developer = {
  id: string;
  title: string;
};

export type VillageQuery_village_Village_images_Image = {
  id: string;
  url: string;
  title?: string;
};

export type VillageQuery_village_Village_documents_Document = {
  id: string;
  url: string;
  title?: string;
  fileName: string;
};

export type VillageQuery_village_Village_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string;
  fileName: string;
};

export type VillageQuery_village_Village = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  seoText?: string;
  youtubeLink?: string;
  tourLink?: string;
  inCity?: boolean;
  cityDistance?: number;
  region?: string;
  subRegion?: string;
  isReady?: boolean;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  createdAt: any;
  updatedAt: any;
  developer?: VillageQuery_village_Village_developer_Developer;
  images?: Array<VillageQuery_village_Village_images_Image>;
  documents?: Array<VillageQuery_village_Village_documents_Document>;
  projectDeclarations?: Array<VillageQuery_village_Village_projectDeclarations_Document>;
};

export type VillageQuery_Query = { village: VillageQuery_village_Village };

export type VillageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type VillageQuery = VillageQuery_Query;

export type VillagesQuery_villages_VillageConnection_nodes_Village_developer_Developer =
  { id: string; title: string };

export type VillagesQuery_villages_VillageConnection_nodes_Village_images_Image =
  { id: string; url: string; title?: string };

export type VillagesQuery_villages_VillageConnection_nodes_Village = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number;
  lon?: number;
  cadastrNumber?: string;
  inCity?: boolean;
  cityDistance?: number;
  isReady?: boolean;
  readinessQuarter?: QuarterEnum;
  readinessYear?: number;
  createdAt: any;
  updatedAt: any;
  developer?: VillagesQuery_villages_VillageConnection_nodes_Village_developer_Developer;
  images?: Array<VillagesQuery_villages_VillageConnection_nodes_Village_images_Image>;
};

export type VillagesQuery_villages_VillageConnection = {
  totalCount: number;
  nodes: Array<VillagesQuery_villages_VillageConnection_nodes_Village>;
};

export type VillagesQuery_Query = {
  villages: VillagesQuery_villages_VillageConnection;
};

export type VillagesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type VillagesQuery = VillagesQuery_Query;

export type EmployeeQuery_employee_Employee_avatar_Image = { url: string };

export type EmployeeQuery_employee_Employee_publicImage_Image = { url: string };

export type EmployeeQuery_employee_Employee = {
  id: string;
  name: string;
  surname: string;
  description?: string;
  shortDescription?: string;
  avatar?: EmployeeQuery_employee_Employee_avatar_Image;
  publicImage?: EmployeeQuery_employee_Employee_publicImage_Image;
};

export type EmployeeQuery_Query = { employee: EmployeeQuery_employee_Employee };

export type EmployeeQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type EmployeeQuery = EmployeeQuery_Query;

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image =
  { url: string };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image =
  { url: string };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee = {
  id: string;
  name: string;
  surname: string;
  shortDescription?: string;
  avatar?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image;
  publicImage?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_publicImage_Image;
};

export type EmployeesQuery_employees_EmployeeConnection = {
  nodes: Array<EmployeesQuery_employees_EmployeeConnection_nodes_Employee>;
};

export type EmployeesQuery_Query = {
  employees: EmployeesQuery_employees_EmployeeConnection;
};

export type EmployeesQueryVariables = Exact<{ [key: string]: never }>;

export type EmployeesQuery = EmployeesQuery_Query;

export const HomeDocument = gql`
  query home {
    complexes(limit: 6) {
      nodes {
        id
        title
        address
        readinessQuarter
        readinessYear
        isReady
        developer {
          title
        }
        images {
          url
        }
      }
    }
    villages(limit: 30) {
      nodes {
        id
        title
        address
        readinessQuarter
        readinessYear
        isReady
        developer {
          title
        }
        images {
          url
        }
      }
    }
    employees(limit: 30) {
      nodes {
        id
        name
        surname
        shortDescription
        description
        avatar {
          url
        }
        publicImage {
          url
        }
      }
    }
  }
`;

/**
 * __useHomeQuery__
 *
 * To run a query within a Vue component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useHomeQuery();
 */
export function useHomeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<HomeQuery, HomeQueryVariables>(
    HomeDocument,
    {},
    options,
  );
}
export function useHomeLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<HomeQuery, HomeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<HomeQuery, HomeQueryVariables>(
    HomeDocument,
    {},
    options,
  );
}
export type HomeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<HomeQuery, HomeQueryVariables>;
export const VacanciesDocument = gql`
  query vacancies {
    vacancies {
      nodes {
        id
        title
        description
        experience
        salary
        schedule
      }
    }
    employees(limit: 30) {
      nodes {
        id
        name
        surname
        shortDescription
        description
        avatar {
          url
        }
        publicImage {
          url
        }
      }
    }
  }
`;

/**
 * __useVacanciesQuery__
 *
 * To run a query within a Vue component, call `useVacanciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVacanciesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVacanciesQuery();
 */
export function useVacanciesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        VacanciesQuery,
        VacanciesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VacanciesQuery,
          VacanciesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VacanciesQuery,
          VacanciesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<VacanciesQuery, VacanciesQueryVariables>(
    VacanciesDocument,
    {},
    options,
  );
}
export function useVacanciesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        VacanciesQuery,
        VacanciesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VacanciesQuery,
          VacanciesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VacanciesQuery,
          VacanciesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    VacanciesQuery,
    VacanciesQueryVariables
  >(VacanciesDocument, {}, options);
}
export type VacanciesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<VacanciesQuery, VacanciesQueryVariables>;
export const StoriesDocument = gql`
  query stories {
    stories {
      totalCount
      nodes {
        id
        category
        title
        teaser
        cover {
          url
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useStoriesQuery__
 *
 * To run a query within a Vue component, call `useStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useStoriesQuery();
 */
export function useStoriesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<StoriesQuery, StoriesQueryVariables>(
    StoriesDocument,
    {},
    options,
  );
}
export function useStoriesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<StoriesQuery, StoriesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<StoriesQuery, StoriesQueryVariables>(
    StoriesDocument,
    {},
    options,
  );
}
export type StoriesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<StoriesQuery, StoriesQueryVariables>;
export const StoryDocument = gql`
  query story($id: ID!) {
    story(id: $id) {
      id
      category
      title
      teaser
      cover {
        id
        url
      }
      contentBlocks {
        data
        type
        isVisible
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useStoryQuery__
 *
 * To run a query within a Vue component, call `useStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useStoryQuery({
 *   id: // value for 'id'
 * });
 */
export function useStoryQuery(
  variables:
    | StoryQueryVariables
    | VueCompositionApi.Ref<StoryQueryVariables>
    | ReactiveFunction<StoryQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<StoryQuery, StoryQueryVariables>(
    StoryDocument,
    variables,
    options,
  );
}
export function useStoryLazyQuery(
  variables?:
    | StoryQueryVariables
    | VueCompositionApi.Ref<StoryQueryVariables>
    | ReactiveFunction<StoryQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<StoryQuery, StoryQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<StoryQuery, StoryQueryVariables>(
    StoryDocument,
    variables,
    options,
  );
}
export type StoryQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<StoryQuery, StoryQueryVariables>;
export const ComplexDocument = gql`
  query complex($id: ID!) {
    complex(id: $id) {
      id
      title
      description
      address
      lat
      lon
      cadastrNumber
      seoText
      youtubeLink
      tourLink
      inCity
      cityDistance
      region
      subRegion
      developer {
        id
        title
      }
      isReady
      readinessQuarter
      readinessYear
      images {
        id
        url
        title
      }
      documents {
        id
        url
        title
        fileName
      }
      projectDeclarations {
        id
        url
        title
        fileName
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useComplexQuery__
 *
 * To run a query within a Vue component, call `useComplexQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexQuery({
 *   id: // value for 'id'
 * });
 */
export function useComplexQuery(
  variables:
    | ComplexQueryVariables
    | VueCompositionApi.Ref<ComplexQueryVariables>
    | ReactiveFunction<ComplexQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<ComplexQuery, ComplexQueryVariables>(
    ComplexDocument,
    variables,
    options,
  );
}
export function useComplexLazyQuery(
  variables?:
    | ComplexQueryVariables
    | VueCompositionApi.Ref<ComplexQueryVariables>
    | ReactiveFunction<ComplexQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ComplexQuery, ComplexQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<ComplexQuery, ComplexQueryVariables>(
    ComplexDocument,
    variables,
    options,
  );
}
export type ComplexQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ComplexQuery, ComplexQueryVariables>;
export const ComplexHouseDocument = gql`
  query complexHouse($id: ID!) {
    complexHouse(id: $id) {
      id
      complex {
        id
        title
      }
      title
      description
      address
      lat
      lon
      cadastrNumber
      seoText
      youtubeLink
      tourLink
      isReady
      readinessQuarter
      readinessYear
      images {
        id
        url
        title
      }
      documents {
        id
        url
        title
        fileName
      }
      projectDeclarations {
        id
        url
        title
        fileName
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useComplexHouseQuery__
 *
 * To run a query within a Vue component, call `useComplexHouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexHouseQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexHouseQuery({
 *   id: // value for 'id'
 * });
 */
export function useComplexHouseQuery(
  variables:
    | ComplexHouseQueryVariables
    | VueCompositionApi.Ref<ComplexHouseQueryVariables>
    | ReactiveFunction<ComplexHouseQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHouseQuery,
        ComplexHouseQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHouseQuery,
          ComplexHouseQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHouseQuery,
          ComplexHouseQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ComplexHouseQuery,
    ComplexHouseQueryVariables
  >(ComplexHouseDocument, variables, options);
}
export function useComplexHouseLazyQuery(
  variables?:
    | ComplexHouseQueryVariables
    | VueCompositionApi.Ref<ComplexHouseQueryVariables>
    | ReactiveFunction<ComplexHouseQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHouseQuery,
        ComplexHouseQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHouseQuery,
          ComplexHouseQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHouseQuery,
          ComplexHouseQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ComplexHouseQuery,
    ComplexHouseQueryVariables
  >(ComplexHouseDocument, variables, options);
}
export type ComplexHouseQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ComplexHouseQuery,
    ComplexHouseQueryVariables
  >;
export const ComplexHousesDocument = gql`
  query complexHouses(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: ComplexHouseFilter
  ) {
    complexHouses(
      ids: $ids
      start: $start
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      totalCount
      nodes {
        id
        complex {
          id
          title
        }
        title
        description
        address
        lat
        lon
        cadastrNumber
        isReady
        readinessQuarter
        readinessYear
        images {
          id
          url
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useComplexHousesQuery__
 *
 * To run a query within a Vue component, call `useComplexHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexHousesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexHousesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useComplexHousesQuery(
  variables:
    | ComplexHousesQueryVariables
    | VueCompositionApi.Ref<ComplexHousesQueryVariables>
    | ReactiveFunction<ComplexHousesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHousesQuery,
        ComplexHousesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHousesQuery,
          ComplexHousesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHousesQuery,
          ComplexHousesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ComplexHousesQuery,
    ComplexHousesQueryVariables
  >(ComplexHousesDocument, variables, options);
}
export function useComplexHousesLazyQuery(
  variables:
    | ComplexHousesQueryVariables
    | VueCompositionApi.Ref<ComplexHousesQueryVariables>
    | ReactiveFunction<ComplexHousesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHousesQuery,
        ComplexHousesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHousesQuery,
          ComplexHousesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHousesQuery,
          ComplexHousesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ComplexHousesQuery,
    ComplexHousesQueryVariables
  >(ComplexHousesDocument, variables, options);
}
export type ComplexHousesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ComplexHousesQuery,
    ComplexHousesQueryVariables
  >;
export const ComplexesDocument = gql`
  query complexes(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
  ) {
    complexes(
      ids: $ids
      start: $start
      limit: $limit
      sort: $sort
      search: $search
    ) {
      totalCount
      nodes {
        id
        title
        description
        address
        lat
        lon
        cadastrNumber
        inCity
        cityDistance
        developer {
          id
          title
        }
        isReady
        readinessQuarter
        readinessYear
        images {
          id
          url
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useComplexesQuery__
 *
 * To run a query within a Vue component, call `useComplexesQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 * });
 */
export function useComplexesQuery(
  variables:
    | ComplexesQueryVariables
    | VueCompositionApi.Ref<ComplexesQueryVariables>
    | ReactiveFunction<ComplexesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexesQuery,
        ComplexesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexesQuery,
          ComplexesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexesQuery,
          ComplexesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<ComplexesQuery, ComplexesQueryVariables>(
    ComplexesDocument,
    variables,
    options,
  );
}
export function useComplexesLazyQuery(
  variables:
    | ComplexesQueryVariables
    | VueCompositionApi.Ref<ComplexesQueryVariables>
    | ReactiveFunction<ComplexesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexesQuery,
        ComplexesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexesQuery,
          ComplexesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexesQuery,
          ComplexesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ComplexesQuery,
    ComplexesQueryVariables
  >(ComplexesDocument, variables, options);
}
export type ComplexesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ComplexesQuery, ComplexesQueryVariables>;
export const DeveloperDocument = gql`
  query developer($id: ID!) {
    developer(id: $id) {
      id
      title
      url
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useDeveloperQuery__
 *
 * To run a query within a Vue component, call `useDeveloperQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeveloperQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDeveloperQuery({
 *   id: // value for 'id'
 * });
 */
export function useDeveloperQuery(
  variables:
    | DeveloperQueryVariables
    | VueCompositionApi.Ref<DeveloperQueryVariables>
    | ReactiveFunction<DeveloperQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        DeveloperQuery,
        DeveloperQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DeveloperQuery,
          DeveloperQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DeveloperQuery,
          DeveloperQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<DeveloperQuery, DeveloperQueryVariables>(
    DeveloperDocument,
    variables,
    options,
  );
}
export function useDeveloperLazyQuery(
  variables?:
    | DeveloperQueryVariables
    | VueCompositionApi.Ref<DeveloperQueryVariables>
    | ReactiveFunction<DeveloperQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        DeveloperQuery,
        DeveloperQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DeveloperQuery,
          DeveloperQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DeveloperQuery,
          DeveloperQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    DeveloperQuery,
    DeveloperQueryVariables
  >(DeveloperDocument, variables, options);
}
export type DeveloperQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DeveloperQuery, DeveloperQueryVariables>;
export const DevelopersDocument = gql`
  query developers(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
  ) {
    developers(
      ids: $ids
      start: $start
      limit: $limit
      sort: $sort
      search: $search
    ) {
      totalCount
      nodes {
        id
        title
        url
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useDevelopersQuery__
 *
 * To run a query within a Vue component, call `useDevelopersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDevelopersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDevelopersQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 * });
 */
export function useDevelopersQuery(
  variables:
    | DevelopersQueryVariables
    | VueCompositionApi.Ref<DevelopersQueryVariables>
    | ReactiveFunction<DevelopersQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        DevelopersQuery,
        DevelopersQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DevelopersQuery,
          DevelopersQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DevelopersQuery,
          DevelopersQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    DevelopersQuery,
    DevelopersQueryVariables
  >(DevelopersDocument, variables, options);
}
export function useDevelopersLazyQuery(
  variables:
    | DevelopersQueryVariables
    | VueCompositionApi.Ref<DevelopersQueryVariables>
    | ReactiveFunction<DevelopersQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        DevelopersQuery,
        DevelopersQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DevelopersQuery,
          DevelopersQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DevelopersQuery,
          DevelopersQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    DevelopersQuery,
    DevelopersQueryVariables
  >(DevelopersDocument, variables, options);
}
export type DevelopersQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DevelopersQuery, DevelopersQueryVariables>;
export const PropertiesDocument = gql`
  query properties(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: PropertyFilter
  ) {
    properties(
      ids: $ids
      start: $start
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      totalCount
      nodes {
        id
        internalID
        deal
        type
        subType
        commercialUsage
        fromDeveloper
        inComplex
        complex {
          id
          title
        }
        complexHouse {
          id
          title
        }
        inVillage
        village {
          id
          title
        }
        isHot
        title
        description
        address
        lat
        lon
        cadastrNumber
        seoText
        youtubeLink
        tourLink
        documents {
          id
          url
          title
        }
        images {
          id
          url
          title
        }
        refreshDate
        price
        pricePerMeter
        pricePerAr
        isReady
        readinessYear
        readinessQuarter
        inCity
        cityDistance
        region
        subRegion
        rooms
        area
        landArea
        livingArea
        kitchenArea
        toiletType
        rehabType
        floor
        floors
        ceilingHeight
        comissionPercent
        comissionAmount
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __usePropertiesQuery__
 *
 * To run a query within a Vue component, call `usePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePropertiesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function usePropertiesQuery(
  variables:
    | PropertiesQueryVariables
    | VueCompositionApi.Ref<PropertiesQueryVariables>
    | ReactiveFunction<PropertiesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        PropertiesQuery,
        PropertiesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertiesQuery,
          PropertiesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertiesQuery,
          PropertiesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    PropertiesQuery,
    PropertiesQueryVariables
  >(PropertiesDocument, variables, options);
}
export function usePropertiesLazyQuery(
  variables:
    | PropertiesQueryVariables
    | VueCompositionApi.Ref<PropertiesQueryVariables>
    | ReactiveFunction<PropertiesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        PropertiesQuery,
        PropertiesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertiesQuery,
          PropertiesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertiesQuery,
          PropertiesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    PropertiesQuery,
    PropertiesQueryVariables
  >(PropertiesDocument, variables, options);
}
export type PropertiesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<PropertiesQuery, PropertiesQueryVariables>;
export const PropertyDocument = gql`
  query property($id: ID!) {
    property(id: $id) {
      id
      internalID
      deal
      type
      subType
      commercialUsage
      fromDeveloper
      inComplex
      complex {
        id
        title
        images {
          id
          url
        }
      }
      complexHouse {
        id
        title
      }
      inVillage
      village {
        id
        title
        images {
          id
          url
        }
      }
      isHot
      title
      description
      address
      lat
      lon
      cadastrNumber
      seoText
      youtubeLink
      tourLink
      documents {
        id
        url
        title
      }
      images {
        id
        url
        title
      }
      refreshDate
      price
      pricePerMeter
      pricePerAr
      isReady
      readinessYear
      readinessQuarter
      inCity
      cityDistance
      region
      subRegion
      rooms
      area
      landArea
      livingArea
      kitchenArea
      toiletType
      rehabType
      floor
      floors
      ceilingHeight
      comissionPercent
      comissionAmount
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePropertyQuery__
 *
 * To run a query within a Vue component, call `usePropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePropertyQuery({
 *   id: // value for 'id'
 * });
 */
export function usePropertyQuery(
  variables:
    | PropertyQueryVariables
    | VueCompositionApi.Ref<PropertyQueryVariables>
    | ReactiveFunction<PropertyQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<PropertyQuery, PropertyQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertyQuery,
          PropertyQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertyQuery,
          PropertyQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<PropertyQuery, PropertyQueryVariables>(
    PropertyDocument,
    variables,
    options,
  );
}
export function usePropertyLazyQuery(
  variables?:
    | PropertyQueryVariables
    | VueCompositionApi.Ref<PropertyQueryVariables>
    | ReactiveFunction<PropertyQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<PropertyQuery, PropertyQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertyQuery,
          PropertyQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertyQuery,
          PropertyQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    PropertyQuery,
    PropertyQueryVariables
  >(PropertyDocument, variables, options);
}
export type PropertyQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<PropertyQuery, PropertyQueryVariables>;
export const VillageDocument = gql`
  query village($id: ID!) {
    village(id: $id) {
      id
      title
      description
      address
      lat
      lon
      cadastrNumber
      seoText
      youtubeLink
      tourLink
      inCity
      cityDistance
      region
      subRegion
      developer {
        id
        title
      }
      isReady
      readinessQuarter
      readinessYear
      images {
        id
        url
        title
      }
      documents {
        id
        url
        title
        fileName
      }
      projectDeclarations {
        id
        url
        title
        fileName
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useVillageQuery__
 *
 * To run a query within a Vue component, call `useVillageQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVillageQuery({
 *   id: // value for 'id'
 * });
 */
export function useVillageQuery(
  variables:
    | VillageQueryVariables
    | VueCompositionApi.Ref<VillageQueryVariables>
    | ReactiveFunction<VillageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<VillageQuery, VillageQueryVariables>(
    VillageDocument,
    variables,
    options,
  );
}
export function useVillageLazyQuery(
  variables?:
    | VillageQueryVariables
    | VueCompositionApi.Ref<VillageQueryVariables>
    | ReactiveFunction<VillageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<VillageQuery, VillageQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<VillageQuery, VillageQueryVariables>(
    VillageDocument,
    variables,
    options,
  );
}
export type VillageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<VillageQuery, VillageQueryVariables>;
export const VillagesDocument = gql`
  query villages(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
  ) {
    villages(
      ids: $ids
      start: $start
      limit: $limit
      sort: $sort
      search: $search
    ) {
      totalCount
      nodes {
        id
        title
        description
        address
        lat
        lon
        cadastrNumber
        inCity
        cityDistance
        developer {
          id
          title
        }
        isReady
        readinessQuarter
        readinessYear
        images {
          id
          url
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useVillagesQuery__
 *
 * To run a query within a Vue component, call `useVillagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillagesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVillagesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 * });
 */
export function useVillagesQuery(
  variables:
    | VillagesQueryVariables
    | VueCompositionApi.Ref<VillagesQueryVariables>
    | ReactiveFunction<VillagesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<VillagesQuery, VillagesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VillagesQuery,
          VillagesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VillagesQuery,
          VillagesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<VillagesQuery, VillagesQueryVariables>(
    VillagesDocument,
    variables,
    options,
  );
}
export function useVillagesLazyQuery(
  variables:
    | VillagesQueryVariables
    | VueCompositionApi.Ref<VillagesQueryVariables>
    | ReactiveFunction<VillagesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<VillagesQuery, VillagesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VillagesQuery,
          VillagesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VillagesQuery,
          VillagesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    VillagesQuery,
    VillagesQueryVariables
  >(VillagesDocument, variables, options);
}
export type VillagesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<VillagesQuery, VillagesQueryVariables>;
export const EmployeeDocument = gql`
  query employee($id: ID!) {
    employee(id: $id) {
      id
      name
      surname
      avatar {
        url
      }
      publicImage {
        url
      }
      description
      shortDescription
    }
  }
`;

/**
 * __useEmployeeQuery__
 *
 * To run a query within a Vue component, call `useEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useEmployeeQuery({
 *   id: // value for 'id'
 * });
 */
export function useEmployeeQuery(
  variables:
    | EmployeeQueryVariables
    | VueCompositionApi.Ref<EmployeeQueryVariables>
    | ReactiveFunction<EmployeeQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<EmployeeQuery, EmployeeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          EmployeeQuery,
          EmployeeQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          EmployeeQuery,
          EmployeeQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<EmployeeQuery, EmployeeQueryVariables>(
    EmployeeDocument,
    variables,
    options,
  );
}
export function useEmployeeLazyQuery(
  variables?:
    | EmployeeQueryVariables
    | VueCompositionApi.Ref<EmployeeQueryVariables>
    | ReactiveFunction<EmployeeQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<EmployeeQuery, EmployeeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          EmployeeQuery,
          EmployeeQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          EmployeeQuery,
          EmployeeQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    EmployeeQuery,
    EmployeeQueryVariables
  >(EmployeeDocument, variables, options);
}
export type EmployeeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<EmployeeQuery, EmployeeQueryVariables>;
export const EmployeesDocument = gql`
  query employees {
    employees {
      nodes {
        id
        name
        surname
        avatar {
          url
        }
        publicImage {
          url
        }
        shortDescription
      }
    }
  }
`;

/**
 * __useEmployeesQuery__
 *
 * To run a query within a Vue component, call `useEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useEmployeesQuery();
 */
export function useEmployeesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        EmployeesQuery,
        EmployeesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          EmployeesQuery,
          EmployeesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          EmployeesQuery,
          EmployeesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<EmployeesQuery, EmployeesQueryVariables>(
    EmployeesDocument,
    {},
    options,
  );
}
export function useEmployeesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        EmployeesQuery,
        EmployeesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          EmployeesQuery,
          EmployeesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          EmployeesQuery,
          EmployeesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    EmployeesQuery,
    EmployeesQueryVariables
  >(EmployeesDocument, {}, options);
}
export type EmployeesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<EmployeesQuery, EmployeesQueryVariables>;
