// Этот файл был сгенерирован автоматически. Не редактируйте вручную!

/* eslint-disable */

import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import type * as VueCompositionApi from "vue";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Article = {
  contentBlocks: Array<ContentBlock>;
  cover?: Maybe<Image>;
  createdAt: Scalars["Time"]["output"];
  group?: Maybe<ArticleGroup>;
  id: Scalars["ID"]["output"];
  status: PublicationStatusEnum;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Time"]["output"];
};

export type ArticleConnection = {
  edges: Array<ArticleEdge>;
  nodes: Array<Article>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ArticleEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Article;
};

export type ArticleGroup = {
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Time"]["output"];
};

export type ArticleGroupConnection = {
  edges: Array<ArticleGroupEdge>;
  nodes: Array<ArticleGroup>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ArticleGroupEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: ArticleGroup;
};

export type ArticleGroupInput = {
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  title: Scalars["String"]["input"];
};

export type ArticleInput = {
  contentBlocks: Array<ContentBlockInput>;
  cover?: InputMaybe<ImageInput>;
  groupID: Scalars["ID"]["input"];
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  status: PublicationStatusEnum;
  title: Scalars["String"]["input"];
};

export type ArticlesFilterInput = {
  groupID?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<PublicationStatusEnum>;
};

export type Bank = {
  id: Scalars["ID"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
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
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  publicationStatus?: Maybe<PublicationStatusEnum>;
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

export type ComplexFilter = {
  developerID?: InputMaybe<Scalars["ID"]["input"]>;
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  withPhotos?: InputMaybe<Scalars["Boolean"]["input"]>;
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
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  publicationStatus?: Maybe<PublicationStatusEnum>;
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
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  withPhotos?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ComplexHouseInput = {
  address: Scalars["String"]["input"];
  cadastrNumber?: InputMaybe<Scalars["String"]["input"]>;
  complexID?: InputMaybe<Scalars["ID"]["input"]>;
  description: Scalars["String"]["input"];
  documents?: InputMaybe<Array<DocumentInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  images?: InputMaybe<Array<ImageInput>>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  lon?: InputMaybe<Scalars["Float"]["input"]>;
  projectDeclarations?: InputMaybe<Array<DocumentInput>>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  readinessQuarter?: InputMaybe<QuarterEnum>;
  readinessYear?: InputMaybe<Scalars["Int"]["input"]>;
  seoText?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  tourLink?: InputMaybe<Scalars["String"]["input"]>;
  youtubeLink?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComplexInput = {
  address: Scalars["String"]["input"];
  cadastrNumber?: InputMaybe<Scalars["String"]["input"]>;
  cityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  description: Scalars["String"]["input"];
  developerID?: InputMaybe<Scalars["ID"]["input"]>;
  documents?: InputMaybe<Array<DocumentInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  images?: InputMaybe<Array<ImageInput>>;
  inCity?: InputMaybe<Scalars["Boolean"]["input"]>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  lon?: InputMaybe<Scalars["Float"]["input"]>;
  projectDeclarations?: InputMaybe<Array<DocumentInput>>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  readinessQuarter?: InputMaybe<QuarterEnum>;
  readinessYear?: InputMaybe<Scalars["Int"]["input"]>;
  region?: InputMaybe<Scalars["String"]["input"]>;
  seoText?: InputMaybe<Scalars["String"]["input"]>;
  subRegion?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  tourLink?: InputMaybe<Scalars["String"]["input"]>;
  youtubeLink?: InputMaybe<Scalars["String"]["input"]>;
};

export type Contact = {
  additionalPhones?: Maybe<Array<Scalars["String"]["output"]>>;
  address?: Maybe<Scalars["String"]["output"]>;
  agents?: Maybe<Array<Employee>>;
  birthday?: Maybe<Scalars["Time"]["output"]>;
  company?: Maybe<Scalars["String"]["output"]>;
  contracts?: Maybe<Array<Document>>;
  createdAt: Scalars["Time"]["output"];
  deals?: Maybe<Array<Deal>>;
  documents?: Maybe<Array<Document>>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isDeleted: Scalars["Boolean"]["output"];
  lead?: Maybe<Lead>;
  name?: Maybe<Scalars["String"]["output"]>;
  note?: Maybe<Scalars["String"]["output"]>;
  passportIssueDate?: Maybe<Scalars["Time"]["output"]>;
  passportIssuedBy?: Maybe<Scalars["String"]["output"]>;
  passportIssuerCode?: Maybe<Scalars["String"]["output"]>;
  passportNumber?: Maybe<Scalars["String"]["output"]>;
  patronymic?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  properties?: Maybe<Array<Property>>;
  source?: Maybe<ContactSourceEnum>;
  surname?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<CounterPartyTypeEnum>;
  updatedAt: Scalars["Time"]["output"];
};

export type ContactConnection = {
  edges: Array<ContactEdge>;
  nodes: Array<Contact>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ContactEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Contact;
};

export type ContactFilter = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  employee?: InputMaybe<Scalars["ID"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<CounterPartyTypeEnum>;
};

export type ContactInput = {
  additionalPhones?: InputMaybe<Array<Scalars["String"]["input"]>>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  agentIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  birthday?: InputMaybe<Scalars["Time"]["input"]>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  contracts?: InputMaybe<Array<DocumentInput>>;
  dealIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  documents?: InputMaybe<Array<DocumentInput>>;
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  leadID?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  note?: InputMaybe<Scalars["String"]["input"]>;
  passportIssueDate?: InputMaybe<Scalars["Time"]["input"]>;
  passportIssuedBy?: InputMaybe<Scalars["String"]["input"]>;
  passportIssuerCode?: InputMaybe<Scalars["String"]["input"]>;
  passportNumber?: InputMaybe<Scalars["String"]["input"]>;
  patronymic?: InputMaybe<Scalars["String"]["input"]>;
  phone: Scalars["String"]["input"];
  propertyIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  source?: InputMaybe<ContactSourceEnum>;
  surname: Scalars["String"]["input"];
  type?: InputMaybe<CounterPartyTypeEnum>;
};

export enum ContactSourceEnum {
  SOURCE = "SOURCE",
}

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
  DOCUMENTS = "DocumentS",
  IMAGES = "IMAGES",
  SPECIAL = "SPECIAL",
  TEXT = "TEXT",
  YOUTUBE = "YOUTUBE",
}

export enum CounterPartyTypeEnum {
  BOTH = "BOTH",
  BUYER = "BUYER",
  SALER = "SALER",
}

export type Deal = {
  accountant?: Maybe<Employee>;
  accountantDocuments?: Maybe<Array<Document>>;
  address?: Maybe<Scalars["String"]["output"]>;
  buyerAgent?: Maybe<Employee>;
  buyerContact?: Maybe<Contact>;
  buyerDocuments?: Maybe<Array<Document>>;
  buyerPhone?: Maybe<Scalars["String"]["output"]>;
  commissionAmount?: Maybe<Scalars["Float"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  dealDate?: Maybe<Scalars["Time"]["output"]>;
  depositDate?: Maybe<Scalars["Time"]["output"]>;
  finishedAt?: Maybe<Scalars["Time"]["output"]>;
  id: Scalars["ID"]["output"];
  internalComment?: Maybe<Scalars["String"]["output"]>;
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  lawer?: Maybe<Employee>;
  lawerDocuments?: Maybe<Array<Document>>;
  mortgageBroker?: Maybe<Employee>;
  mortgageDocuments?: Maybe<Array<Document>>;
  mortgageRequest?: Maybe<MortgageRequest>;
  property?: Maybe<Property>;
  sellerAgent?: Maybe<Employee>;
  sellerContact?: Maybe<Contact>;
  sellerDocuments?: Maybe<Array<Document>>;
  sellerPhone?: Maybe<Scalars["String"]["output"]>;
  stage?: Maybe<DealStageEnum>;
  type?: Maybe<DealTypeEnum>;
  updatedAt: Scalars["Time"]["output"];
};

export type DealConnection = {
  edges: Array<DealEdge>;
  nodes: Array<Deal>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type DealEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Deal;
};

export enum DealEnum {
  RENT = "RENT",
  SELL = "SELL",
}

export type DealFilter = {
  Type?: InputMaybe<DealTypeEnum>;
  contact?: InputMaybe<Scalars["ID"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  deal?: InputMaybe<Scalars["ID"]["input"]>;
  employee?: InputMaybe<Scalars["ID"]["input"]>;
  finishedAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  finishedAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  propertyType?: InputMaybe<PropertyTypeEnum>;
  stage?: InputMaybe<DealStageEnum>;
};

export type DealInput = {
  accountantDocuments?: InputMaybe<Array<DocumentInput>>;
  accountantID?: InputMaybe<Scalars["ID"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  buyerAgentID?: InputMaybe<Scalars["ID"]["input"]>;
  buyerContactID?: InputMaybe<Scalars["ID"]["input"]>;
  buyerDocuments?: InputMaybe<Array<DocumentInput>>;
  buyerPhone?: InputMaybe<Scalars["String"]["input"]>;
  commissionAmount?: InputMaybe<Scalars["Float"]["input"]>;
  dealDate?: InputMaybe<Scalars["Time"]["input"]>;
  depositDate?: InputMaybe<Scalars["Time"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internalComment?: InputMaybe<Scalars["String"]["input"]>;
  lawerDocuments?: InputMaybe<Array<DocumentInput>>;
  lawerID?: InputMaybe<Scalars["ID"]["input"]>;
  mortgageBrokerID?: InputMaybe<Scalars["ID"]["input"]>;
  mortgageDocuments?: InputMaybe<Array<DocumentInput>>;
  mortgageRequestID?: InputMaybe<Scalars["ID"]["input"]>;
  propertyID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerAgentID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerContactID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerDocuments?: InputMaybe<Array<DocumentInput>>;
  sellerPhone?: InputMaybe<Scalars["String"]["input"]>;
  stage?: InputMaybe<DealStageEnum>;
  type?: InputMaybe<DealTypeEnum>;
};

export enum DealStageEnum {
  DEPOSIT_PAID = "DEPOSIT_PAID",
  DEPOSIT_PREPARATION = "DEPOSIT_PREPARATION",
  MFC_REGISTRATION = "MFC_REGISTRATION",
  REGISTERED = "REGISTERED",
  SCHEDULED_FOR_DEAL = "SCHEDULED_FOR_DEAL",
}

export enum DealTypeEnum {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
}

/** Отдел */
export type Department = {
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Группы внутри отдела */
  groups: Array<DepartmentGroup>;
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Название отдела */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

export type DepartmentConnection = {
  edges: Array<DepartmentEdge>;
  nodes: Array<Department>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type DepartmentEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Department;
};

/** Группа внутри отдела */
export type DepartmentGroup = {
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Название группы */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

/** Входные параметры для группы */
export type DepartmentGroupInput = {
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Название группы */
  title: Scalars["String"]["input"];
};

/** Входные параметры для отдела */
export type DepartmentInput = {
  /**
   * Группы внутри отдела
   * Группы без идентификатора будут созданы
   * Непереданные группы, имевшиеся ранее в отделе, будут удалены
   */
  groups: Array<DepartmentGroupInput>;
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Название отдела */
  title: Scalars["String"]["input"];
};

export type Developer = {
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
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

export type DeveloperFilterInput = {
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DeveloperInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  logo?: InputMaybe<ImageInput>;
  title: Scalars["String"]["input"];
  url?: InputMaybe<Scalars["String"]["input"]>;
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
  department?: Maybe<Department>;
  description?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  group?: Maybe<DepartmentGroup>;
  id: Scalars["ID"]["output"];
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted: Scalars["Boolean"]["output"];
  isPublished: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  patronymic?: Maybe<Scalars["String"]["output"]>;
  phone: Scalars["String"]["output"];
  position?: Maybe<Position>;
  publicImage?: Maybe<Image>;
  role?: Maybe<Role>;
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

export type EmployeeInput = {
  avatar?: InputMaybe<ImageInput>;
  birthday?: InputMaybe<Scalars["Time"]["input"]>;
  departmentID?: InputMaybe<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  groupID?: InputMaybe<Scalars["ID"]["input"]>;
  /**
   * Уникальный идентифкатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  patronymic?: InputMaybe<Scalars["String"]["input"]>;
  phone: Scalars["String"]["input"];
  positionID?: InputMaybe<Scalars["ID"]["input"]>;
  publicImage?: InputMaybe<ImageInput>;
  roleID?: InputMaybe<Scalars["ID"]["input"]>;
  shortDescription?: InputMaybe<Scalars["String"]["input"]>;
  surname: Scalars["String"]["input"];
};

export type EmployeesFilterInput = {
  department?: InputMaybe<Scalars["ID"]["input"]>;
  group?: InputMaybe<Scalars["ID"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  position?: InputMaybe<Scalars["ID"]["input"]>;
  role?: InputMaybe<Scalars["ID"]["input"]>;
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

export type Lead = {
  additionalPhones?: Maybe<Array<Scalars["String"]["output"]>>;
  address?: Maybe<Scalars["String"]["output"]>;
  agents?: Maybe<Array<Employee>>;
  birthday?: Maybe<Scalars["Time"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  company?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isDeleted: Scalars["Boolean"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  patronymic?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  request?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<LeadSourceEnum>;
  status?: Maybe<LeadStatusEnum>;
  surname?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<LeadTypeEnum>;
  updatedAt: Scalars["Time"]["output"];
};

export type LeadConnection = {
  edges: Array<LeadEdge>;
  nodes: Array<Lead>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type LeadEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Lead;
};

export type LeadFilter = {
  company?: InputMaybe<Scalars["String"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LeadStatusEnum>;
  type?: InputMaybe<LeadTypeEnum>;
};

export type LeadInput = {
  additionalPhones?: InputMaybe<Array<Scalars["String"]["input"]>>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  agentIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  birthday?: InputMaybe<Scalars["Time"]["input"]>;
  comment?: InputMaybe<Scalars["String"]["input"]>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  patronymic?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  request?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<LeadSourceEnum>;
  status?: InputMaybe<LeadStatusEnum>;
  surname?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<LeadTypeEnum>;
};

export enum LeadSourceEnum {
  SOURCE = "SOURCE",
}

export enum LeadStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  NEW = "NEW",
  REFUSED = "REFUSED",
  SUCCESS = "SUCCESS",
  THINKING = "THINKING",
}

export enum LeadTypeEnum {
  BOTH = "BOTH",
  BUYER = "BUYER",
  SALER = "SALER",
}

export type Log = {
  author?: Maybe<Employee>;
  createdAt: Scalars["Time"]["output"];
  eid?: Maybe<Scalars["ID"]["output"]>;
  id: Scalars["ID"]["output"];
  level: LogLevelEnum;
  status: StatusCodeEnum;
  type: LogTypeEnum;
};

export type LogConnection = {
  edges: Array<LogEdge>;
  nodes: Array<Log>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type LogEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Log;
};

export enum LogLevelEnum {
  DEBUG = "DEBUG",
  ERROR = "ERROR",
  FATAL = "FATAL",
  INFO = "INFO",
  WARNING = "WARNING",
}

export enum LogTypeEnum {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
  ESTATE_COMPLEXES_DELETE = "ESTATE_COMPLEXES_DELETE",
  ESTATE_COMPLEX_CREATE = "ESTATE_COMPLEX_CREATE",
  ESTATE_COMPLEX_DELETE = "ESTATE_COMPLEX_DELETE",
  ESTATE_COMPLEX_HOUSES_DELETE = "ESTATE_COMPLEX_HOUSES_DELETE",
  ESTATE_COMPLEX_HOUSE_CREATE = "ESTATE_COMPLEX_HOUSE_CREATE",
  ESTATE_COMPLEX_HOUSE_DELETE = "ESTATE_COMPLEX_HOUSE_DELETE",
  ESTATE_COMPLEX_HOUSE_UPDATE = "ESTATE_COMPLEX_HOUSE_UPDATE",
  ESTATE_COMPLEX_UPDATE = "ESTATE_COMPLEX_UPDATE",
  ESTATE_DEVELOPERS_DELETE = "ESTATE_DEVELOPERS_DELETE",
  ESTATE_DEVELOPER_CREATE = "ESTATE_DEVELOPER_CREATE",
  ESTATE_DEVELOPER_DELETE = "ESTATE_DEVELOPER_DELETE",
  ESTATE_DEVELOPER_UPDATE = "ESTATE_DEVELOPER_UPDATE",
  ESTATE_PROPERTIES_CHANGE_STATUS = "ESTATE_PROPERTIES_CHANGE_STATUS",
  ESTATE_PROPERTIES_DELETE = "ESTATE_PROPERTIES_DELETE",
  ESTATE_PROPERTIES_REFRESH = "ESTATE_PROPERTIES_REFRESH",
  ESTATE_PROPERTY_CHANGE_STATUS = "ESTATE_PROPERTY_CHANGE_STATUS",
  ESTATE_PROPERTY_CREATE = "ESTATE_PROPERTY_CREATE",
  ESTATE_PROPERTY_DELETE = "ESTATE_PROPERTY_DELETE",
  ESTATE_PROPERTY_REFRESH = "ESTATE_PROPERTY_REFRESH",
  ESTATE_PROPERTY_UPDATE = "ESTATE_PROPERTY_UPDATE",
  ESTATE_PROPERTY_UPDATE_PRICE_HISTORY = "ESTATE_PROPERTY_UPDATE_PRICE_HISTORY",
  ESTATE_VILLAGES_DELETE = "ESTATE_VILLAGES_DELETE",
  ESTATE_VILLAGE_CREATE = "ESTATE_VILLAGE_CREATE",
  ESTATE_VILLAGE_DELETE = "ESTATE_VILLAGE_DELETE",
  ESTATE_VILLAGE_UPDATE = "ESTATE_VILLAGE_UPDATE",
  SALES_CONTACTS_DELETE = "SALES_CONTACTS_DELETE",
  SALES_CONTACT_CREATE = "SALES_CONTACT_CREATE",
  SALES_CONTACT_DELETE = "SALES_CONTACT_DELETE",
  SALES_CONTACT_UPDATE = "SALES_CONTACT_UPDATE",
  SALES_DEALS_CHANGE_STAGE = "SALES_DEALS_CHANGE_STAGE",
  SALES_DEALS_DELETE = "SALES_DEALS_DELETE",
  SALES_DEAL_CHANGE_STAGE = "SALES_DEAL_CHANGE_STAGE",
  SALES_DEAL_CREATE = "SALES_DEAL_CREATE",
  SALES_DEAL_DELETE = "SALES_DEAL_DELETE",
  SALES_DEAL_UPDATE = "SALES_DEAL_UPDATE",
  SALES_LEADS_CHANGE_STATUS = "SALES_LEADS_CHANGE_STATUS",
  SALES_LEADS_DELETE = "SALES_LEADS_DELETE",
  SALES_LEAD_CHANGE_STATUS = "SALES_LEAD_CHANGE_STATUS",
  SALES_LEAD_CREATE = "SALES_LEAD_CREATE",
  SALES_LEAD_DELETE = "SALES_LEAD_DELETE",
  SALES_LEAD_UPDATE = "SALES_LEAD_UPDATE",
  SALES_MEETS_CHANGE_STATUS = "SALES_MEETS_CHANGE_STATUS",
  SALES_MEETS_DELETE = "SALES_MEETS_DELETE",
  SALES_MEET_CHANGE_STATUS = "SALES_MEET_CHANGE_STATUS",
  SALES_MEET_CREATE = "SALES_MEET_CREATE",
  SALES_MEET_DELETE = "SALES_MEET_DELETE",
  SALES_MEET_UPDATE = "SALES_MEET_UPDATE",
  SALES_MORTGAGE_REQUESTS_CHANGE_STATUS = "SALES_MORTGAGE_REQUESTS_CHANGE_STATUS",
  SALES_MORTGAGE_REQUESTS_DELETE = "SALES_MORTGAGE_REQUESTS_DELETE",
  SALES_MORTGAGE_REQUEST_CHANGE_STATUS = "SALES_MORTGAGE_REQUEST_CHANGE_STATUS",
  SALES_MORTGAGE_REQUEST_CREATE = "SALES_MORTGAGE_REQUEST_CREATE",
  SALES_MORTGAGE_REQUEST_DELETE = "SALES_MORTGAGE_REQUEST_DELETE",
  SALES_MORTGAGE_REQUEST_UPDATE = "SALES_MORTGAGE_REQUEST_UPDATE",
  SALES_TASKS_COMPLETE = "SALES_TASKS_COMPLETE",
  SALES_TASKS_DELETE = "SALES_TASKS_DELETE",
  SALES_TASK_COMPLETE = "SALES_TASK_COMPLETE",
  SALES_TASK_CREATE = "SALES_TASK_CREATE",
  SALES_TASK_DELETE = "SALES_TASK_DELETE",
  SALES_TASK_UPDATE = "SALES_TASK_UPDATE",
  STAFF_DEPARTMENTS_DELETE = "STAFF_DEPARTMENTS_DELETE",
  STAFF_DEPARTMENT_CREATE = "STAFF_DEPARTMENT_CREATE",
  STAFF_DEPARTMENT_DELETE = "STAFF_DEPARTMENT_DELETE",
  STAFF_DEPARTMENT_UPDATE = "STAFF_DEPARTMENT_UPDATE",
  STAFF_EMPLOYEES_ACTIVATE = "STAFF_EMPLOYEES_ACTIVATE",
  STAFF_EMPLOYEES_ASSIGN_DEPARTMENT = "STAFF_EMPLOYEES_ASSIGN_DEPARTMENT",
  STAFF_EMPLOYEES_ASSIGN_ROLE = "STAFF_EMPLOYEES_ASSIGN_ROLE",
  STAFF_EMPLOYEES_DEACTIVATE = "STAFF_EMPLOYEES_DEACTIVATE",
  STAFF_EMPLOYEES_DELETE = "STAFF_EMPLOYEES_DELETE",
  STAFF_EMPLOYEES_PUBLISH = "STAFF_EMPLOYEES_PUBLISH",
  STAFF_EMPLOYEES_UNPUBLISH = "STAFF_EMPLOYEES_UNPUBLISH",
  STAFF_EMPLOYEE_CREATE = "STAFF_EMPLOYEE_CREATE",
  STAFF_EMPLOYEE_DELETE = "STAFF_EMPLOYEE_DELETE",
  STAFF_EMPLOYEE_UPDATE = "STAFF_EMPLOYEE_UPDATE",
  STAFF_POSITIONS_DELETE = "STAFF_POSITIONS_DELETE",
  STAFF_POSITION_CREATE = "STAFF_POSITION_CREATE",
  STAFF_POSITION_DELETE = "STAFF_POSITION_DELETE",
  STAFF_POSITION_UPDATE = "STAFF_POSITION_UPDATE",
  STAFF_ROLES_DELETE = "STAFF_ROLES_DELETE",
  STAFF_ROLE_CREATE = "STAFF_ROLE_CREATE",
  STAFF_ROLE_DELETE = "STAFF_ROLE_DELETE",
  STAFF_ROLE_UPDATE = "STAFF_ROLE_UPDATE",
}

/** Результат аутентификации */
export type LoginOutput = {
  /** Сведения о текущем пользователе */
  me: Me;
  /** JWT-токен пользователя */
  token: Scalars["String"]["output"];
};

export type LogsFilterInput = {
  author?: InputMaybe<Scalars["ID"]["input"]>;
  level?: InputMaybe<LogLevelEnum>;
  type?: InputMaybe<LogTypeEnum>;
};

/** Сведения о текущем пользователе */
export type Me = {
  /** Основное изображение профиля пользователя */
  avatar?: Maybe<Image>;
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Имя пользователя */
  name?: Maybe<Scalars["String"]["output"]>;
  /** Фамилия пользователя */
  surname?: Maybe<Scalars["String"]["output"]>;
};

export type Meet = {
  accountant?: Maybe<Employee>;
  address?: Maybe<Scalars["String"]["output"]>;
  buyerAgency?: Maybe<Scalars["String"]["output"]>;
  buyerAgent?: Maybe<Employee>;
  buyerContact?: Maybe<Contact>;
  buyerPhone?: Maybe<Scalars["String"]["output"]>;
  cancelReason?: Maybe<MeetCancelReasonEnum>;
  cancelReasonCustom?: Maybe<Scalars["String"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  contactType?: Maybe<CounterPartyTypeEnum>;
  createdAt: Scalars["Time"]["output"];
  dateTime?: Maybe<Scalars["Time"]["output"]>;
  dealType?: Maybe<DealTypeEnum>;
  id: Scalars["ID"]["output"];
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isOnline?: Maybe<Scalars["Boolean"]["output"]>;
  lawer?: Maybe<Employee>;
  mortgageBroker?: Maybe<Employee>;
  property?: Maybe<Property>;
  sellerAgent?: Maybe<Employee>;
  sellerContact?: Maybe<Contact>;
  sellerPhone?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<MeetStatusEnum>;
  type?: Maybe<MeetTypeEnum>;
  updatedAt: Scalars["Time"]["output"];
  useDealDeposit?: Maybe<Scalars["Boolean"]["output"]>;
  useMortgage?: Maybe<Scalars["Boolean"]["output"]>;
};

export enum MeetCancelReasonEnum {
  CHANGED_MIND = "CHANGED_MIND",
  OWN_OPINION = "OWN_OPINION",
  REFUSAL = "REFUSAL",
}

export type MeetConnection = {
  edges: Array<MeetEdge>;
  nodes: Array<Meet>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type MeetEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Meet;
};

export type MeetFilter = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  buyerAgent?: InputMaybe<Scalars["ID"]["input"]>;
  buyerContact?: InputMaybe<Scalars["ID"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  dealType?: InputMaybe<DealTypeEnum>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  property?: InputMaybe<Scalars["ID"]["input"]>;
  sellerAgent?: InputMaybe<Scalars["ID"]["input"]>;
  sellerContact?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Array<MeetStatusEnum>>;
  type?: InputMaybe<MeetTypeEnum>;
};

export type MeetInput = {
  accountantID?: InputMaybe<Scalars["ID"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  buyerAgency?: InputMaybe<Scalars["String"]["input"]>;
  buyerAgentID?: InputMaybe<Scalars["ID"]["input"]>;
  buyerContactID?: InputMaybe<Scalars["ID"]["input"]>;
  buyerPhone?: InputMaybe<Scalars["String"]["input"]>;
  cancelReason?: InputMaybe<MeetCancelReasonEnum>;
  cancelReasonCustom?: InputMaybe<Scalars["String"]["input"]>;
  comment?: InputMaybe<Scalars["String"]["input"]>;
  contactType?: InputMaybe<CounterPartyTypeEnum>;
  dateTime?: InputMaybe<Scalars["Time"]["input"]>;
  dealType?: InputMaybe<DealTypeEnum>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  isOnline?: InputMaybe<Scalars["Boolean"]["input"]>;
  lawerID?: InputMaybe<Scalars["ID"]["input"]>;
  mortgageBrokerID?: InputMaybe<Scalars["ID"]["input"]>;
  propertyID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerAgentID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerContactID?: InputMaybe<Scalars["ID"]["input"]>;
  sellerPhone?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<MeetStatusEnum>;
  type?: InputMaybe<MeetTypeEnum>;
  useDealDeposit?: InputMaybe<Scalars["Boolean"]["input"]>;
  useMortgage?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum MeetStatusEnum {
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
  GOING_ON_SALE = "GOING_ON_SALE",
}

export enum MeetTypeEnum {
  RENT = "RENT",
  SALE = "SALE",
}

export type MortgageRequest = {
  agent?: Maybe<Employee>;
  amount?: Maybe<Scalars["Float"]["output"]>;
  banks?: Maybe<Array<Bank>>;
  comment?: Maybe<Scalars["String"]["output"]>;
  contact?: Maybe<Contact>;
  contracts?: Maybe<Array<Document>>;
  createdAt: Scalars["Time"]["output"];
  deal?: Maybe<Deal>;
  documents?: Maybe<Array<Document>>;
  firstDeposit?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  mortgageBroker?: Maybe<Employee>;
  percentage?: Maybe<Scalars["Float"]["output"]>;
  period?: Maybe<Scalars["Int"]["output"]>;
  property?: Maybe<Property>;
  responseDate?: Maybe<Scalars["Time"]["output"]>;
  sendDate?: Maybe<Scalars["Time"]["output"]>;
  status?: Maybe<MortgageRequestStatusEnum>;
  updatedAt: Scalars["Time"]["output"];
  validTillDate?: Maybe<Scalars["Time"]["output"]>;
};

export type MortgageRequestConnection = {
  edges: Array<MortgageRequestEdge>;
  nodes: Array<MortgageRequest>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type MortgageRequestEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: MortgageRequest;
};

export type MortgageRequestFilter = {
  agent?: InputMaybe<Scalars["ID"]["input"]>;
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  contact?: InputMaybe<Scalars["ID"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  deal?: InputMaybe<Scalars["ID"]["input"]>;
  firstDeposit?: InputMaybe<Scalars["Float"]["input"]>;
  mortgageBroker?: InputMaybe<Scalars["ID"]["input"]>;
  percentage?: InputMaybe<Scalars["Float"]["input"]>;
  period?: InputMaybe<Scalars["Int"]["input"]>;
  property?: InputMaybe<Scalars["ID"]["input"]>;
  responseDate?: InputMaybe<Scalars["Time"]["input"]>;
  sendDate?: InputMaybe<Scalars["Time"]["input"]>;
  status?: InputMaybe<MortgageRequestStatusEnum>;
};

export type MortgageRequestInput = {
  agentID?: InputMaybe<Scalars["ID"]["input"]>;
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  bankIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  comment?: InputMaybe<Scalars["String"]["input"]>;
  contactID?: InputMaybe<Scalars["ID"]["input"]>;
  contracts?: InputMaybe<Array<DocumentInput>>;
  dealID?: InputMaybe<Scalars["ID"]["input"]>;
  documents?: InputMaybe<Array<DocumentInput>>;
  firstDeposit?: InputMaybe<Scalars["Float"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  mortgageBrokerID?: InputMaybe<Scalars["ID"]["input"]>;
  percentage?: InputMaybe<Scalars["Float"]["input"]>;
  period?: InputMaybe<Scalars["Int"]["input"]>;
  propertyID?: InputMaybe<Scalars["ID"]["input"]>;
  responseDate?: InputMaybe<Scalars["Time"]["input"]>;
  sendDate?: InputMaybe<Scalars["Time"]["input"]>;
  status?: InputMaybe<MortgageRequestStatusEnum>;
  validTillDate?: InputMaybe<Scalars["Time"]["input"]>;
};

export enum MortgageRequestStatusEnum {
  APPROVED = "APPROVED",
  BANK_EXPECTATION = "BANK_EXPECTATION",
  OBJECT_APPROVAL = "OBJECT_APPROVAL",
  REFUSAL = "REFUSAL",
  SENT = "SENT",
}

export type Mutation = {
  activateEmployees: Scalars["Boolean"]["output"];
  approveProperty: Scalars["Boolean"]["output"];
  approveVacancyRequest: Scalars["Boolean"]["output"];
  archiveProperty: Scalars["Boolean"]["output"];
  assignDepartmentToEmployees: Scalars["Boolean"]["output"];
  assignRoleToEmployees: Scalars["Boolean"]["output"];
  bulkApproveProperties: Scalars["Boolean"]["output"];
  /** Массовое подтверждение отзывов */
  bulkApproveReviews: Scalars["Boolean"]["output"];
  bulkArchiveProperties: Scalars["Boolean"]["output"];
  bulkChangeDealsStage: Scalars["Boolean"]["output"];
  bulkChangeLeadsStatus: Scalars["Boolean"]["output"];
  bulkChangeMeetsStatus: Scalars["Boolean"]["output"];
  bulkChangeMortgageRequestsStatus: Scalars["Boolean"]["output"];
  bulkCompleteTasks: Scalars["Boolean"]["output"];
  bulkDeclineProperties: Scalars["Boolean"]["output"];
  /** Массовое отклонение отзывов */
  bulkDeclineReviews: Scalars["Boolean"]["output"];
  /** Массовое удаление новостройки по идентификаторам */
  bulkDeleteComplexHouses: Scalars["Boolean"]["output"];
  /** Массовое удаление ЖК по идентификаторам */
  bulkDeleteComplexes: Scalars["Boolean"]["output"];
  bulkDeleteContacts: Scalars["Boolean"]["output"];
  bulkDeleteDeals: Scalars["Boolean"]["output"];
  /** Массовое удаление застройщиков по идентификаторам */
  bulkDeleteDevelopers: Scalars["Boolean"]["output"];
  bulkDeleteLeads: Scalars["Boolean"]["output"];
  bulkDeleteMeets: Scalars["Boolean"]["output"];
  bulkDeleteMortgageRequests: Scalars["Boolean"]["output"];
  /** Массовое удаление объектов по идентификаторам */
  bulkDeleteProperties: Scalars["Boolean"]["output"];
  /** Массовое удаление отзывов */
  bulkDeleteReviews: Scalars["Boolean"]["output"];
  bulkDeleteTasks: Scalars["Boolean"]["output"];
  /** Массовое удаление КП по идентификаторам */
  bulkDeleteVillages: Scalars["Boolean"]["output"];
  bulkRefreshProperties: Scalars["Boolean"]["output"];
  changeDealStage: Scalars["Boolean"]["output"];
  changeLeadStatus: Scalars["Boolean"]["output"];
  changeMeetStatus: Scalars["Boolean"]["output"];
  changeMortgageRequestStatus: Scalars["Boolean"]["output"];
  completeTask: Scalars["Boolean"]["output"];
  deactivateEmployees: Scalars["Boolean"]["output"];
  declineProperty: Scalars["Boolean"]["output"];
  declineVacancyRequest: Scalars["Boolean"]["output"];
  deleteArticle: Scalars["Boolean"]["output"];
  deleteArticleGroup: Scalars["Boolean"]["output"];
  /** Удаление ЖК по идентификатору */
  deleteComplex: Scalars["Boolean"]["output"];
  /** Удаление новостройки по идентификатору */
  deleteComplexHouse: Scalars["Boolean"]["output"];
  deleteContact: Scalars["Boolean"]["output"];
  deleteDeal: Scalars["Boolean"]["output"];
  /** Удаление отдела */
  deleteDepartment: Scalars["Boolean"]["output"];
  /** Удаление застройщика по идентификатору */
  deleteDeveloper: Scalars["Boolean"]["output"];
  deleteDocument: Scalars["Boolean"]["output"];
  deleteEmployee: Scalars["Boolean"]["output"];
  deleteEmployees: Scalars["Boolean"]["output"];
  deleteImage: Scalars["Boolean"]["output"];
  deleteLead: Scalars["Boolean"]["output"];
  deleteMeet: Scalars["Boolean"]["output"];
  deleteMortgageRequest: Scalars["Boolean"]["output"];
  /** Удаление страницы */
  deletePage: Scalars["Boolean"]["output"];
  /** Удаление должности */
  deletePosition: Scalars["Boolean"]["output"];
  deleteProperty: Scalars["Boolean"]["output"];
  /** Удаление отзыва */
  deleteReview: Scalars["Boolean"]["output"];
  /** Удаление роли */
  deleteRole: Scalars["Boolean"]["output"];
  /** Удаление новости */
  deleteStory: Scalars["Boolean"]["output"];
  deleteTask: Scalars["Boolean"]["output"];
  /** Удаление вакансии */
  deleteVacancy: Scalars["Boolean"]["output"];
  /** Удаление КП по идентификатору */
  deleteVillage: Scalars["Boolean"]["output"];
  /** Аутентификация по e-mail и паролю */
  login: LoginOutput;
  /** Выход из системы и завершение сессии пользователя */
  logout: Scalars["Boolean"]["output"];
  publishEmployees: Scalars["Boolean"]["output"];
  refreshProperty: Scalars["Boolean"]["output"];
  saveArticle: Scalars["Boolean"]["output"];
  saveArticleGroup: Scalars["Boolean"]["output"];
  /** Создание/Редактирование ЖК */
  saveComplex: Scalars["Boolean"]["output"];
  /** Создание/Редактирование новостройки */
  saveComplexHouse: Scalars["Boolean"]["output"];
  saveContact: Scalars["Boolean"]["output"];
  saveDeal: Scalars["Boolean"]["output"];
  /** Сохранение отдела */
  saveDepartment: Scalars["Boolean"]["output"];
  /** Создание/Редактирование застройщика */
  saveDeveloper: Scalars["Boolean"]["output"];
  saveEmployee: Scalars["Boolean"]["output"];
  saveLead: Scalars["Boolean"]["output"];
  saveMeet: Scalars["Boolean"]["output"];
  saveMortgageRequest: Scalars["Boolean"]["output"];
  /** Сохранение страницы */
  savePage: Scalars["Boolean"]["output"];
  /** Сохранение должности */
  savePosition: Scalars["Boolean"]["output"];
  saveProperty: Scalars["Boolean"]["output"];
  /** Сохранение отзыва */
  saveReview: Scalars["Boolean"]["output"];
  /** Сохранение роли */
  saveRole: Scalars["Boolean"]["output"];
  /** Сохранение новости */
  saveStory: Scalars["Boolean"]["output"];
  saveTask: Scalars["Boolean"]["output"];
  /** Сохранение вакансии */
  saveVacancy: Scalars["Boolean"]["output"];
  /** Создание/Редактирование КП */
  saveVillage: Scalars["Boolean"]["output"];
  unpublishEmployees: Scalars["Boolean"]["output"];
  uploadDocument: Document;
  uploadImage: Image;
};

export type MutationActivateEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationApprovePropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationApproveVacancyRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationArchivePropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationAssignDepartmentToEmployeesArgs = {
  department: Scalars["ID"]["input"];
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationAssignRoleToEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  role: Scalars["ID"]["input"];
};

export type MutationBulkApprovePropertiesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkApproveReviewsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkArchivePropertiesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkChangeDealsStageArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  stage: DealStageEnum;
};

export type MutationBulkChangeLeadsStatusArgs = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  ids: Array<Scalars["ID"]["input"]>;
  status: LeadStatusEnum;
};

export type MutationBulkChangeMeetsStatusArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  status: MeetStatusEnum;
};

export type MutationBulkChangeMortgageRequestsStatusArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  status: MortgageRequestStatusEnum;
};

export type MutationBulkCompleteTasksArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeclinePropertiesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeclineReviewsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteComplexHousesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteComplexesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteContactsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteDealsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteDevelopersArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteLeadsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteMeetsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteMortgageRequestsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeletePropertiesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteReviewsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteTasksArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkDeleteVillagesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationBulkRefreshPropertiesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationChangeDealStageArgs = {
  id: Scalars["ID"]["input"];
  stage: DealStageEnum;
};

export type MutationChangeLeadStatusArgs = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  status: LeadStatusEnum;
};

export type MutationChangeMeetStatusArgs = {
  id: Scalars["ID"]["input"];
  status: MeetStatusEnum;
};

export type MutationChangeMortgageRequestStatusArgs = {
  id: Scalars["ID"]["input"];
  status: MortgageRequestStatusEnum;
};

export type MutationCompleteTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeactivateEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationDeclinePropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeclineVacancyRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteArticleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteArticleGroupArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteComplexArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteComplexHouseArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteContactArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteDealArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteDepartmentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteDeveloperArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteEmployeeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationDeleteImageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteLeadArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteMeetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteMortgageRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeletePageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeletePositionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeletePropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteReviewArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteStoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVacancyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVillageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationPublishEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationRefreshPropertyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationSaveArticleArgs = {
  input: ArticleInput;
};

export type MutationSaveArticleGroupArgs = {
  input: ArticleGroupInput;
};

export type MutationSaveComplexArgs = {
  input: ComplexInput;
};

export type MutationSaveComplexHouseArgs = {
  input: ComplexHouseInput;
};

export type MutationSaveContactArgs = {
  input: ContactInput;
};

export type MutationSaveDealArgs = {
  input: DealInput;
};

export type MutationSaveDepartmentArgs = {
  input: DepartmentInput;
};

export type MutationSaveDeveloperArgs = {
  input: DeveloperInput;
};

export type MutationSaveEmployeeArgs = {
  input: EmployeeInput;
};

export type MutationSaveLeadArgs = {
  input: LeadInput;
};

export type MutationSaveMeetArgs = {
  input: MeetInput;
};

export type MutationSaveMortgageRequestArgs = {
  input: MortgageRequestInput;
};

export type MutationSavePageArgs = {
  input: PageInput;
};

export type MutationSavePositionArgs = {
  input: PositionInput;
};

export type MutationSavePropertyArgs = {
  input: PropertyInput;
};

export type MutationSaveReviewArgs = {
  input: ReviewInput;
};

export type MutationSaveRoleArgs = {
  input: RoleInput;
};

export type MutationSaveStoryArgs = {
  input: StoryInput;
};

export type MutationSaveTaskArgs = {
  input: TaskInput;
};

export type MutationSaveVacancyArgs = {
  input: VacancyInput;
};

export type MutationSaveVillageArgs = {
  input: VillageInput;
};

export type MutationUnpublishEmployeesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
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

export type PageFilterInput = {
  status?: InputMaybe<PublicationStatusEnum>;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars["Cursor"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["Cursor"]["output"]>;
};

export type PageInput = {
  contentBlocks: Array<ContentBlockInput>;
  description: Scalars["String"]["input"];
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  status: PublicationStatusEnum;
  title: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type PaginationInput = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Должность */
export type Position = {
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Название должности */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

/** Результат списочного метода */
export type PositionConnection = {
  /** Конечные точки */
  edges: Array<PositionEdge>;
  /** Объекты */
  nodes: Array<Position>;
  /** Информация для постраничной навигации */
  pageInfo: PageInfo;
  /** Общее количество записей */
  totalCount: Scalars["Int"]["output"];
};

/** Конечная точка */
export type PositionEdge = {
  /** Курсор (идентификатор объекта) */
  cursor: Scalars["Cursor"]["output"];
  /** Объект */
  node: Position;
};

/** Входные параметры для должности */
export type PositionInput = {
  /**
   * Уникальный идентифкатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Название должности */
  title: Scalars["String"]["input"];
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
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isEditable?: Maybe<Scalars["Boolean"]["output"]>;
  isHot?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  kitchenArea?: Maybe<Scalars["Float"]["output"]>;
  landArea?: Maybe<Scalars["Float"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  livingArea?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  priceHistory?: Maybe<Array<Scalars["Float"]["output"]>>;
  pricePerAr?: Maybe<Scalars["Float"]["output"]>;
  pricePerMeter?: Maybe<Scalars["Float"]["output"]>;
  readinessQuarter?: Maybe<QuarterEnum>;
  readinessYear?: Maybe<Scalars["Int"]["output"]>;
  refreshDate?: Maybe<Scalars["Time"]["output"]>;
  region?: Maybe<Scalars["String"]["output"]>;
  rehabType?: Maybe<RehabTypeEnum>;
  rooms?: Maybe<Scalars["Int"]["output"]>;
  seoText?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<PropertySourceEnum>;
  status?: Maybe<PropertyStatusEnum>;
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
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  isHot?: InputMaybe<Scalars["Boolean"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  isStudio?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxArea?: InputMaybe<Scalars["Float"]["input"]>;
  maxCityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  maxCreatedAt?: InputMaybe<Scalars["Time"]["input"]>;
  maxLandArea?: InputMaybe<Scalars["Float"]["input"]>;
  maxPrice?: InputMaybe<Scalars["Float"]["input"]>;
  maxPricePerAr?: InputMaybe<Scalars["Float"]["input"]>;
  maxPricePerMeter?: InputMaybe<Scalars["Float"]["input"]>;
  maxRooms?: InputMaybe<Scalars["Float"]["input"]>;
  minArea?: InputMaybe<Scalars["Float"]["input"]>;
  minCityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  minCreatedAt?: InputMaybe<Scalars["Time"]["input"]>;
  minLandArea?: InputMaybe<Scalars["Float"]["input"]>;
  minPrice?: InputMaybe<Scalars["Float"]["input"]>;
  minPricePerAr?: InputMaybe<Scalars["Float"]["input"]>;
  minPricePerMeter?: InputMaybe<Scalars["Float"]["input"]>;
  minRooms?: InputMaybe<Scalars["Float"]["input"]>;
  statuses?: InputMaybe<Array<PropertyStatusEnum>>;
  subType?: InputMaybe<PropertySubTypeEnum>;
  type?: InputMaybe<PropertyTypeEnum>;
  villageID?: InputMaybe<Scalars["String"]["input"]>;
  withPhotos?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type PropertyInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  area?: InputMaybe<Scalars["Float"]["input"]>;
  cadastrNumber?: InputMaybe<Scalars["String"]["input"]>;
  ceilingHeight?: InputMaybe<Scalars["Float"]["input"]>;
  cityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  comissionAmount?: InputMaybe<Scalars["Float"]["input"]>;
  comissionPercent?: InputMaybe<Scalars["Float"]["input"]>;
  commercialUsage?: InputMaybe<Array<CommercialUsageEnum>>;
  complexHouseID?: InputMaybe<Scalars["ID"]["input"]>;
  complexID?: InputMaybe<Scalars["ID"]["input"]>;
  deal?: InputMaybe<DealEnum>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  documents?: InputMaybe<Array<InputMaybe<DocumentInput>>>;
  floor?: InputMaybe<Scalars["Int"]["input"]>;
  floors?: InputMaybe<Scalars["Int"]["input"]>;
  fromDeveloper?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  inCity?: InputMaybe<Scalars["Boolean"]["input"]>;
  inComplex?: InputMaybe<Scalars["Boolean"]["input"]>;
  inVillage?: InputMaybe<Scalars["Boolean"]["input"]>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  isHot?: InputMaybe<Scalars["Boolean"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  kitchenArea?: InputMaybe<Scalars["Float"]["input"]>;
  landArea?: InputMaybe<Scalars["Float"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  livingArea?: InputMaybe<Scalars["Float"]["input"]>;
  lon?: InputMaybe<Scalars["Float"]["input"]>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  readinessQuarter?: InputMaybe<QuarterEnum>;
  readinessYear?: InputMaybe<Scalars["Int"]["input"]>;
  region?: InputMaybe<Scalars["String"]["input"]>;
  rehabType?: InputMaybe<RehabTypeEnum>;
  rooms?: InputMaybe<Scalars["Int"]["input"]>;
  seoText?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<PropertySourceEnum>;
  status?: InputMaybe<PropertyStatusEnum>;
  subRegion?: InputMaybe<Scalars["String"]["input"]>;
  subType?: InputMaybe<PropertySubTypeEnum>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  toiletType?: InputMaybe<ToiletTypeEnum>;
  tourLink?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<PropertyTypeEnum>;
  villageID?: InputMaybe<Scalars["ID"]["input"]>;
  youtubeLink?: InputMaybe<Scalars["String"]["input"]>;
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
  article: Article;
  articleGroup: ArticleGroup;
  articleGroups: ArticleGroupConnection;
  articles: ArticleConnection;
  /** Запрос ЖК по идентификатору */
  complex: Complex;
  /** Запрос ЖК по идентификатору */
  complexHouse: ComplexHouse;
  /** Запрос списка ЖК */
  complexHouses: ComplexHouseConnection;
  /** Запрос списка ЖК */
  complexes: ComplexConnection;
  contact: Contact;
  contacts: ContactConnection;
  deal: Deal;
  deals: DealConnection;
  /** Получение отдела по идентификатору */
  department: Department;
  /** Получение списка отделов */
  departments: DepartmentConnection;
  /** Запрос застройщика по идентификатору */
  developer: Developer;
  /** Запрос списка застройщиков */
  developers: DeveloperConnection;
  employee: Employee;
  employees: EmployeeConnection;
  generatePdf: Scalars["String"]["output"];
  lead: Lead;
  leads: LeadConnection;
  logs: LogConnection;
  /** Получение информации о текущем пользователе */
  me: Me;
  meet: Meet;
  meets: MeetConnection;
  mortgageRequest: MortgageRequest;
  mortgageRequests: MortgageRequestConnection;
  /** Получение страницы по идентификатору */
  page: Page;
  /** Получение списка страниц */
  pages: PageConnection;
  /** Получение должности по идентификатору */
  position: Position;
  /** Получение списка должностей */
  positions: PositionConnection;
  properties: PropertyConnection;
  property: Property;
  /** Получение отзыва по идентификатору */
  review: Review;
  /** Получение списка отзывов */
  reviews: ReviewConnection;
  /** Получение роли по идентификатору */
  role: Role;
  /** Получение списка ролей */
  roles: RoleConnection;
  /** Получение списка новостей */
  stories: StoryConnection;
  /** Получение новости по идентификатору */
  story: Story;
  task: Task;
  tasks: TaskConnection;
  /** Получение списка вакансий */
  vacancies: VacancyConnection;
  /** Получение вакансии по идентификатору */
  vacancy: Vacancy;
  /** Получение отклика по идентификатору */
  vacancyRequest: VacancyRequest;
  /** Получение списка откликов */
  vacancyRequests: VacancyRequestConnection;
  /** Запрос КП по идентификатору */
  village: Village;
  /** Запрос списка КП */
  villages: VillageConnection;
};

export type QueryArticleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryArticleGroupArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryArticleGroupsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticlesFilterInput>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
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
  filter?: InputMaybe<ComplexFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryContactArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryContactsArgs = {
  filter?: InputMaybe<ContactFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDealArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDealsArgs = {
  filter?: InputMaybe<DealFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDepartmentArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDepartmentsArgs = {
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
  filter?: InputMaybe<DeveloperFilterInput>;
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
  filter?: InputMaybe<EmployeesFilterInput>;
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

export type QueryLeadArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryLeadsArgs = {
  filter?: InputMaybe<LeadFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLogsArgs = {
  filter?: InputMaybe<LogsFilterInput>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryMeetArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryMeetsArgs = {
  filter?: InputMaybe<MeetFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryMortgageRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryMortgageRequestsArgs = {
  filter?: InputMaybe<MortgageRequestFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPageArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPagesArgs = {
  filter?: InputMaybe<PageFilterInput>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPositionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPositionsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
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

export type QueryRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRolesArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStoriesArgs = {
  filter?: InputMaybe<StoryFilterInput>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStoryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTasksArgs = {
  filter?: InputMaybe<TaskFilter>;
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
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

export type QueryVacancyRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryVacancyRequestsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryVillageArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryVillagesArgs = {
  filter?: InputMaybe<VillageFilter>;
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

export type ReadinessInput = {
  quarter?: InputMaybe<Scalars["Int"]["input"]>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
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
  /** Статус публикации */
  publicationStatus: PublicationStatusEnum;
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

/** Входные параметры для обновления вакансии */
export type ReviewInput = {
  /** Имя автора */
  authorName: Scalars["String"]["input"];
  /** Номер телефона автора */
  authorPhone: Scalars["String"]["input"];
  /** Идентификатор сотрудника */
  employeeID: Scalars["ID"]["input"];
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Статус отзыва */
  status: ReviewStatusEnum;
  /** Текст отзыва */
  text: Scalars["String"]["input"];
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
  employeeID?: InputMaybe<Scalars["ID"]["input"]>;
  /** Набор статусов для фильтрации */
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  /** Набор статусов для фильтрации */
  status?: InputMaybe<ReviewStatusEnum>;
};

/** Роль */
export type Role = {
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Уникальный идентифкатор */
  id: Scalars["ID"]["output"];
  /** Набор доступных полномочий в виде массива строк */
  permissions: Array<RolePermissionsEnum>;
  /** Название роли */
  title: Scalars["String"]["output"];
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
};

/** Результат списочного метода */
export type RoleConnection = {
  /** Конечные точки */
  edges: Array<RoleEdge>;
  /** Объекты */
  nodes: Array<Role>;
  /** Информация для постраничной навигации */
  pageInfo: PageInfo;
  /** Общее количество записей */
  totalCount: Scalars["Int"]["output"];
};

/** Конечная точка */
export type RoleEdge = {
  /** Курсор (идентификатор объекта) */
  cursor: Scalars["Cursor"]["output"];
  /** Объект */
  node: Role;
};

/** Входные параметры для роли */
export type RoleInput = {
  /**
   * Уникальный идентифкатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Набор полномочий */
  permissions: Array<RolePermissionsEnum>;
  /** Название роли */
  title: Scalars["String"]["input"];
};

/** Список доступных разрешений */
export enum RolePermissionsEnum {
  CONTENT_DELETE_ARTICLE = "CONTENT_DELETE_ARTICLE",
  CONTENT_DELETE_ARTICLE_GROUP = "CONTENT_DELETE_ARTICLE_GROUP",
  CONTENT_DELETE_PAGE = "CONTENT_DELETE_PAGE",
  CONTENT_DELETE_REVIEW = "CONTENT_DELETE_REVIEW",
  CONTENT_DELETE_STORY = "CONTENT_DELETE_STORY",
  CONTENT_DELETE_VACANCY = "CONTENT_DELETE_VACANCY",
  CONTENT_SAVE_ARTICLE = "CONTENT_SAVE_ARTICLE",
  CONTENT_SAVE_ARTICLE_GROUP = "CONTENT_SAVE_ARTICLE_GROUP",
  CONTENT_SAVE_PAGE = "CONTENT_SAVE_PAGE",
  CONTENT_SAVE_REVIEW = "CONTENT_SAVE_REVIEW",
  CONTENT_SAVE_STORY = "CONTENT_SAVE_STORY",
  CONTENT_SAVE_VACANCY = "CONTENT_SAVE_VACANCY",
  STAFF_DELETE_DEPARTMENT = "STAFF_DELETE_DEPARTMENT",
  STAFF_DELETE_EMPLOYEE = "STAFF_DELETE_EMPLOYEE",
  STAFF_DELETE_POSITION = "STAFF_DELETE_POSITION",
  STAFF_DELETE_ROLE = "STAFF_DELETE_ROLE",
  STAFF_SAVE_DEPARTMENT = "STAFF_SAVE_DEPARTMENT",
  STAFF_SAVE_EMPLOYEE = "STAFF_SAVE_EMPLOYEE",
  STAFF_SAVE_POSITION = "STAFF_SAVE_POSITION",
  STAFF_SAVE_ROLE = "STAFF_SAVE_ROLE",
  SYSTEM_VIEW_LOG = "SYSTEM_VIEW_LOG",
}

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

export enum StatusCodeEnum {
  STATUS_010100 = "STATUS_010100",
  STATUS_010101 = "STATUS_010101",
  STATUS_010102 = "STATUS_010102",
  STATUS_010103 = "STATUS_010103",
  STATUS_010200 = "STATUS_010200",
  STATUS_010300 = "STATUS_010300",
  STATUS_010301 = "STATUS_010301",
  STATUS_010302 = "STATUS_010302",
  STATUS_010400 = "STATUS_010400",
  STATUS_010401 = "STATUS_010401",
  STATUS_010402 = "STATUS_010402",
  STATUS_010500 = "STATUS_010500",
  STATUS_010501 = "STATUS_010501",
  STATUS_010502 = "STATUS_010502",
  STATUS_010600 = "STATUS_010600",
  STATUS_010601 = "STATUS_010601",
  STATUS_010602 = "STATUS_010602",
  STATUS_010700 = "STATUS_010700",
  STATUS_010701 = "STATUS_010701",
  STATUS_010702 = "STATUS_010702",
  STATUS_010800 = "STATUS_010800",
  STATUS_010801 = "STATUS_010801",
  STATUS_010802 = "STATUS_010802",
  STATUS_010900 = "STATUS_010900",
  STATUS_010901 = "STATUS_010901",
  STATUS_010902 = "STATUS_010902",
  STATUS_010903 = "STATUS_010903",
  STATUS_011000 = "STATUS_011000",
  STATUS_011001 = "STATUS_011001",
  STATUS_011002 = "STATUS_011002",
  STATUS_011003 = "STATUS_011003",
  STATUS_011004 = "STATUS_011004",
  STATUS_011100 = "STATUS_011100",
  STATUS_011101 = "STATUS_011101",
  STATUS_011102 = "STATUS_011102",
  STATUS_011200 = "STATUS_011200",
  STATUS_011201 = "STATUS_011201",
  STATUS_011202 = "STATUS_011202",
  STATUS_011300 = "STATUS_011300",
  STATUS_011301 = "STATUS_011301",
  STATUS_011302 = "STATUS_011302",
  STATUS_011400 = "STATUS_011400",
  STATUS_011401 = "STATUS_011401",
  STATUS_011402 = "STATUS_011402",
  STATUS_011500 = "STATUS_011500",
  STATUS_011501 = "STATUS_011501",
  STATUS_011502 = "STATUS_011502",
  STATUS_011600 = "STATUS_011600",
  STATUS_011601 = "STATUS_011601",
  STATUS_011602 = "STATUS_011602",
  STATUS_011700 = "STATUS_011700",
  STATUS_011701 = "STATUS_011701",
  STATUS_011702 = "STATUS_011702",
  STATUS_011800 = "STATUS_011800",
  STATUS_011801 = "STATUS_011801",
  STATUS_011802 = "STATUS_011802",
  STATUS_011900 = "STATUS_011900",
  STATUS_011901 = "STATUS_011901",
  STATUS_011902 = "STATUS_011902",
  STATUS_011903 = "STATUS_011903",
  STATUS_012000 = "STATUS_012000",
  STATUS_012001 = "STATUS_012001",
  STATUS_012002 = "STATUS_012002",
  STATUS_012003 = "STATUS_012003",
  STATUS_012004 = "STATUS_012004",
  STATUS_012005 = "STATUS_012005",
  STATUS_012006 = "STATUS_012006",
  STATUS_012007 = "STATUS_012007",
  STATUS_012008 = "STATUS_012008",
  STATUS_012100 = "STATUS_012100",
  STATUS_012101 = "STATUS_012101",
  STATUS_012102 = "STATUS_012102",
  STATUS_012103 = "STATUS_012103",
  STATUS_012200 = "STATUS_012200",
  STATUS_012201 = "STATUS_012201",
  STATUS_012202 = "STATUS_012202",
  STATUS_012203 = "STATUS_012203",
  STATUS_020100 = "STATUS_020100",
  STATUS_020101 = "STATUS_020101",
  STATUS_020102 = "STATUS_020102",
  STATUS_020200 = "STATUS_020200",
  STATUS_020201 = "STATUS_020201",
  STATUS_020202 = "STATUS_020202",
  STATUS_020300 = "STATUS_020300",
  STATUS_020301 = "STATUS_020301",
  STATUS_020302 = "STATUS_020302",
  STATUS_020400 = "STATUS_020400",
  STATUS_020401 = "STATUS_020401",
  STATUS_020402 = "STATUS_020402",
  STATUS_020500 = "STATUS_020500",
  STATUS_020501 = "STATUS_020501",
  STATUS_020502 = "STATUS_020502",
  STATUS_020600 = "STATUS_020600",
  STATUS_020601 = "STATUS_020601",
  STATUS_020602 = "STATUS_020602",
  STATUS_020700 = "STATUS_020700",
  STATUS_020701 = "STATUS_020701",
  STATUS_020702 = "STATUS_020702",
  STATUS_020800 = "STATUS_020800",
  STATUS_020801 = "STATUS_020801",
  STATUS_020802 = "STATUS_020802",
  STATUS_020900 = "STATUS_020900",
  STATUS_020901 = "STATUS_020901",
  STATUS_020902 = "STATUS_020902",
  STATUS_021000 = "STATUS_021000",
  STATUS_021001 = "STATUS_021001",
  STATUS_021002 = "STATUS_021002",
  STATUS_021100 = "STATUS_021100",
  STATUS_021101 = "STATUS_021101",
  STATUS_021102 = "STATUS_021102",
  STATUS_021200 = "STATUS_021200",
  STATUS_021201 = "STATUS_021201",
  STATUS_021202 = "STATUS_021202",
  STATUS_021300 = "STATUS_021300",
  STATUS_021301 = "STATUS_021301",
  STATUS_021302 = "STATUS_021302",
  STATUS_021400 = "STATUS_021400",
  STATUS_021401 = "STATUS_021401",
  STATUS_021402 = "STATUS_021402",
  STATUS_021500 = "STATUS_021500",
  STATUS_021501 = "STATUS_021501",
  STATUS_021502 = "STATUS_021502",
  STATUS_021600 = "STATUS_021600",
  STATUS_021601 = "STATUS_021601",
  STATUS_021602 = "STATUS_021602",
  STATUS_021700 = "STATUS_021700",
  STATUS_021701 = "STATUS_021701",
  STATUS_021702 = "STATUS_021702",
  STATUS_021800 = "STATUS_021800",
  STATUS_021801 = "STATUS_021801",
  STATUS_021802 = "STATUS_021802",
  STATUS_021900 = "STATUS_021900",
  STATUS_021901 = "STATUS_021901",
  STATUS_021902 = "STATUS_021902",
  STATUS_022000 = "STATUS_022000",
  STATUS_022001 = "STATUS_022001",
  STATUS_022002 = "STATUS_022002",
  STATUS_022100 = "STATUS_022100",
  STATUS_022200 = "STATUS_022200",
  STATUS_022201 = "STATUS_022201",
  STATUS_022202 = "STATUS_022202",
  STATUS_022300 = "STATUS_022300",
  STATUS_022301 = "STATUS_022301",
  STATUS_022302 = "STATUS_022302",
  STATUS_022400 = "STATUS_022400",
  STATUS_022401 = "STATUS_022401",
  STATUS_022402 = "STATUS_022402",
  STATUS_022500 = "STATUS_022500",
  STATUS_022501 = "STATUS_022501",
  STATUS_022502 = "STATUS_022502",
  STATUS_030100 = "STATUS_030100",
  STATUS_030101 = "STATUS_030101",
  STATUS_030102 = "STATUS_030102",
  STATUS_030200 = "STATUS_030200",
  STATUS_030201 = "STATUS_030201",
  STATUS_030202 = "STATUS_030202",
  STATUS_030300 = "STATUS_030300",
  STATUS_030301 = "STATUS_030301",
  STATUS_030302 = "STATUS_030302",
  STATUS_030400 = "STATUS_030400",
  STATUS_030401 = "STATUS_030401",
  STATUS_030402 = "STATUS_030402",
  STATUS_030500 = "STATUS_030500",
  STATUS_030501 = "STATUS_030501",
  STATUS_030502 = "STATUS_030502",
  STATUS_030600 = "STATUS_030600",
  STATUS_030601 = "STATUS_030601",
  STATUS_030602 = "STATUS_030602",
  STATUS_030700 = "STATUS_030700",
  STATUS_030701 = "STATUS_030701",
  STATUS_030702 = "STATUS_030702",
  STATUS_030800 = "STATUS_030800",
  STATUS_030801 = "STATUS_030801",
  STATUS_030802 = "STATUS_030802",
  STATUS_030900 = "STATUS_030900",
  STATUS_030901 = "STATUS_030901",
  STATUS_030902 = "STATUS_030902",
  STATUS_031000 = "STATUS_031000",
  STATUS_031001 = "STATUS_031001",
  STATUS_031002 = "STATUS_031002",
  STATUS_031100 = "STATUS_031100",
  STATUS_031101 = "STATUS_031101",
  STATUS_031102 = "STATUS_031102",
  STATUS_031200 = "STATUS_031200",
  STATUS_031201 = "STATUS_031201",
  STATUS_031202 = "STATUS_031202",
  STATUS_031300 = "STATUS_031300",
  STATUS_031301 = "STATUS_031301",
  STATUS_031302 = "STATUS_031302",
  STATUS_031400 = "STATUS_031400",
  STATUS_031401 = "STATUS_031401",
  STATUS_031402 = "STATUS_031402",
  STATUS_031500 = "STATUS_031500",
  STATUS_031501 = "STATUS_031501",
  STATUS_031502 = "STATUS_031502",
  STATUS_031600 = "STATUS_031600",
  STATUS_031601 = "STATUS_031601",
  STATUS_031602 = "STATUS_031602",
  STATUS_031700 = "STATUS_031700",
  STATUS_031701 = "STATUS_031701",
  STATUS_031702 = "STATUS_031702",
  STATUS_031800 = "STATUS_031800",
  STATUS_031801 = "STATUS_031801",
  STATUS_031802 = "STATUS_031802",
  STATUS_031900 = "STATUS_031900",
  STATUS_031901 = "STATUS_031901",
  STATUS_031902 = "STATUS_031902",
  STATUS_032000 = "STATUS_032000",
  STATUS_032001 = "STATUS_032001",
  STATUS_032002 = "STATUS_032002",
  STATUS_032100 = "STATUS_032100",
  STATUS_032101 = "STATUS_032101",
  STATUS_032102 = "STATUS_032102",
  STATUS_032200 = "STATUS_032200",
  STATUS_032201 = "STATUS_032201",
  STATUS_032202 = "STATUS_032202",
  STATUS_032300 = "STATUS_032300",
  STATUS_032301 = "STATUS_032301",
  STATUS_032302 = "STATUS_032302",
  STATUS_032400 = "STATUS_032400",
  STATUS_032401 = "STATUS_032401",
  STATUS_032402 = "STATUS_032402",
  STATUS_032500 = "STATUS_032500",
  STATUS_032501 = "STATUS_032501",
  STATUS_032502 = "STATUS_032502",
  STATUS_032600 = "STATUS_032600",
  STATUS_032601 = "STATUS_032601",
  STATUS_032602 = "STATUS_032602",
  STATUS_032700 = "STATUS_032700",
  STATUS_032701 = "STATUS_032701",
  STATUS_032702 = "STATUS_032702",
  STATUS_032800 = "STATUS_032800",
  STATUS_032801 = "STATUS_032801",
  STATUS_032802 = "STATUS_032802",
  STATUS_032900 = "STATUS_032900",
  STATUS_032901 = "STATUS_032901",
  STATUS_032902 = "STATUS_032902",
  STATUS_033000 = "STATUS_033000",
  STATUS_033001 = "STATUS_033001",
  STATUS_033002 = "STATUS_033002",
  STATUS_033100 = "STATUS_033100",
  STATUS_033101 = "STATUS_033101",
  STATUS_033102 = "STATUS_033102",
  STATUS_033200 = "STATUS_033200",
  STATUS_033201 = "STATUS_033201",
  STATUS_033202 = "STATUS_033202",
  STATUS_033300 = "STATUS_033300",
  STATUS_033301 = "STATUS_033301",
  STATUS_033302 = "STATUS_033302",
  STATUS_033400 = "STATUS_033400",
  STATUS_033401 = "STATUS_033401",
  STATUS_033402 = "STATUS_033402",
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
  status: PublicationStatusEnum;
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

export type StoryFilterInput = {
  category?: InputMaybe<StoryCategoryEnum>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
};

/** Входные параметры для новости */
export type StoryInput = {
  /** Категория */
  category: StoryCategoryEnum;
  /** Текст */
  contentBlocks: Array<ContentBlockInput>;
  /** Основное изображение (обложка) */
  cover?: InputMaybe<ImageInput>;
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Тизер */
  teaser?: InputMaybe<Scalars["String"]["input"]>;
  /** Название */
  title: Scalars["String"]["input"];
};

export type Task = {
  assignee?: Maybe<Employee>;
  contact?: Maybe<Contact>;
  contactPhone?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  deal?: Maybe<Deal>;
  details?: Maybe<Scalars["String"]["output"]>;
  durationDays?: Maybe<Scalars["Int"]["output"]>;
  durationHours?: Maybe<Scalars["Int"]["output"]>;
  endDate?: Maybe<Scalars["Time"]["output"]>;
  id: Scalars["ID"]["output"];
  internalNumber?: Maybe<Scalars["Int"]["output"]>;
  isCompleted?: Maybe<Scalars["Boolean"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isHot?: Maybe<Scalars["Boolean"]["output"]>;
  label?: Maybe<TaskLabelEnum>;
  lead?: Maybe<Lead>;
  property?: Maybe<Property>;
  reporter?: Maybe<Employee>;
  startDate?: Maybe<Scalars["Time"]["output"]>;
  status?: Maybe<TaskStatusEnum>;
  tag?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Time"]["output"];
};

export type TaskConnection = {
  edges: Array<TaskEdge>;
  nodes: Array<Task>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type TaskEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: Task;
};

export type TaskFilter = {
  assignee?: InputMaybe<Scalars["ID"]["input"]>;
  contact?: InputMaybe<Scalars["ID"]["input"]>;
  createdAtMax?: InputMaybe<Scalars["Time"]["input"]>;
  createdAtMin?: InputMaybe<Scalars["Time"]["input"]>;
  deal?: InputMaybe<Scalars["ID"]["input"]>;
  isHot?: InputMaybe<Scalars["Boolean"]["input"]>;
  label?: InputMaybe<TaskLabelEnum>;
  lead?: InputMaybe<Scalars["ID"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  property?: InputMaybe<Scalars["ID"]["input"]>;
  reporter?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<TaskStatusEnum>;
};

export type TaskInput = {
  assigneeID?: InputMaybe<Scalars["ID"]["input"]>;
  contactID?: InputMaybe<Scalars["ID"]["input"]>;
  contactPhone?: InputMaybe<Scalars["String"]["input"]>;
  dealID?: InputMaybe<Scalars["ID"]["input"]>;
  details?: InputMaybe<Scalars["String"]["input"]>;
  durationDays?: InputMaybe<Scalars["Int"]["input"]>;
  durationHours?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  isHot?: InputMaybe<Scalars["Boolean"]["input"]>;
  label?: InputMaybe<TaskLabelEnum>;
  leadID?: InputMaybe<Scalars["ID"]["input"]>;
  propertyID?: InputMaybe<Scalars["ID"]["input"]>;
  reporterID?: InputMaybe<Scalars["ID"]["input"]>;
  startDate?: InputMaybe<Scalars["Time"]["input"]>;
  status?: InputMaybe<TaskStatusEnum>;
  tag?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export enum TaskLabelEnum {
  IMPORTANT = "IMPORTANT",
  NO_MATTER = "NO_MATTER",
}

export enum TaskStatusEnum {
  CLOSED = "CLOSED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NEW = "NEW",
  OVERDUE = "OVERDUE",
}

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

/** Входные параметры для вакансии */
export type VacancyInput = {
  /** Описание вакансии */
  description: Scalars["String"]["input"];
  /** Стаж */
  experience?: InputMaybe<Scalars["String"]["input"]>;
  /**
   * Уникальный идентификатор
   * При отсутствии будет создан автоматически
   */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Статус вакансии */
  publicationStatus: PublicationStatusEnum;
  /** Зарабтная плата */
  salary?: InputMaybe<Scalars["String"]["input"]>;
  /** График работы */
  schedule: VacancyScheduleEnum;
  /** Название вакансии */
  title: Scalars["String"]["input"];
};

/** Отклик на вакансию */
export type VacancyRequest = {
  /** Вложения */
  attachments?: Maybe<Array<Document>>;
  /** Дата и время создания */
  createdAt: Scalars["Time"]["output"];
  /** Уникальный идентификатор */
  id: Scalars["ID"]["output"];
  /** Внутренний комментарий */
  internalComment?: Maybe<Scalars["String"]["output"]>;
  /** Сопроводительное письмо */
  letter: Scalars["String"]["output"];
  /** Имя соискателя */
  name: Scalars["String"]["output"];
  /** Статус отклика */
  status: VacancyRequestStatusEnum;
  /** Дата и время обновления */
  updatedAt: Scalars["Time"]["output"];
  /** Связанная вакансия */
  vacancy: Vacancy;
};

export type VacancyRequestConnection = {
  edges: Array<VacancyRequestEdge>;
  nodes: Array<VacancyRequest>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type VacancyRequestEdge = {
  cursor: Scalars["Cursor"]["output"];
  node: VacancyRequest;
};

/** Статус отклика на вакансию */
export enum VacancyRequestStatusEnum {
  /** Принят в работу */
  APPROVED = "APPROVED",
  /** Отклонён */
  DECLINED = "DECLINED",
  /** Новый */
  NEW = "NEW",
}

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
  internalInfo?: Maybe<Scalars["String"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isReady?: Maybe<Scalars["Boolean"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
  projectDeclarations?: Maybe<Array<Document>>;
  publicationStatus?: Maybe<PublicationStatusEnum>;
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

export type VillageFilter = {
  developerID?: InputMaybe<Scalars["ID"]["input"]>;
  isDeleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  withPhotos?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type VillageInput = {
  address: Scalars["String"]["input"];
  cadastrNumber?: InputMaybe<Scalars["String"]["input"]>;
  cityDistance?: InputMaybe<Scalars["Int"]["input"]>;
  description: Scalars["String"]["input"];
  developerID?: InputMaybe<Scalars["ID"]["input"]>;
  documents?: InputMaybe<Array<DocumentInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  images?: InputMaybe<Array<ImageInput>>;
  inCity?: InputMaybe<Scalars["Boolean"]["input"]>;
  internalInfo?: InputMaybe<Scalars["String"]["input"]>;
  isReady?: InputMaybe<Scalars["Boolean"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  lon?: InputMaybe<Scalars["Float"]["input"]>;
  projectDeclarations?: InputMaybe<Array<DocumentInput>>;
  publicationStatus?: InputMaybe<PublicationStatusEnum>;
  readinessQuarter?: InputMaybe<QuarterEnum>;
  readinessYear?: InputMaybe<Scalars["Int"]["input"]>;
  region?: InputMaybe<Scalars["String"]["input"]>;
  seoText?: InputMaybe<Scalars["String"]["input"]>;
  subRegion?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  tourLink?: InputMaybe<Scalars["String"]["input"]>;
  youtubeLink?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComplexPageQuery_complex_Complex_developer_Developer = {
  id: string;
  title: string;
};

export type ComplexPageQuery_complex_Complex_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type ComplexPageQuery_complex_Complex_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type ComplexPageQuery_complex_Complex_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type ComplexPageQuery_complex_Complex = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: ComplexPageQuery_complex_Complex_developer_Developer | null;
  images?: Array<ComplexPageQuery_complex_Complex_images_Image> | null;
  documents?: Array<ComplexPageQuery_complex_Complex_documents_Document> | null;
  projectDeclarations?: Array<ComplexPageQuery_complex_Complex_projectDeclarations_Document> | null;
};

export type ComplexPageQuery_Query = {
  complex: ComplexPageQuery_complex_Complex;
};

export type ComplexPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ComplexPageQuery = ComplexPageQuery_Query;

export type ComplexHousePageQuery_complexHouse_ComplexHouse_complex_Complex = {
  id: string;
  title: string;
};

export type ComplexHousePageQuery_complexHouse_ComplexHouse_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type ComplexHousePageQuery_complexHouse_ComplexHouse_documents_Document =
  { id: string; url: string; title?: string | null; fileName: string };

export type ComplexHousePageQuery_complexHouse_ComplexHouse_projectDeclarations_Document =
  { id: string; url: string; title?: string | null; fileName: string };

export type ComplexHousePageQuery_complexHouse_ComplexHouse = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  complex?: ComplexHousePageQuery_complexHouse_ComplexHouse_complex_Complex | null;
  images?: Array<ComplexHousePageQuery_complexHouse_ComplexHouse_images_Image> | null;
  documents?: Array<ComplexHousePageQuery_complexHouse_ComplexHouse_documents_Document> | null;
  projectDeclarations?: Array<ComplexHousePageQuery_complexHouse_ComplexHouse_projectDeclarations_Document> | null;
};

export type ComplexHousePageQuery_Query = {
  complexHouse: ComplexHousePageQuery_complexHouse_ComplexHouse;
};

export type ComplexHousePageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ComplexHousePageQuery = ComplexHousePageQuery_Query;

export type ContactPageQuery_contact_Contact_agents_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type ContactPageQuery_contact_Contact_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type ContactPageQuery_contact_Contact_contracts_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type ContactPageQuery_contact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  note?: string | null;
  email?: string | null;
  company?: string | null;
  passportIssueDate?: any | null;
  passportNumber?: string | null;
  passportIssuedBy?: string | null;
  passportIssuerCode?: string | null;
  additionalPhones?: Array<string> | null;
  internalNumber?: number | null;
  birthday?: any | null;
  source?: ContactSourceEnum | null;
  type?: CounterPartyTypeEnum | null;
  address?: string | null;
  createdAt: any;
  updatedAt: any;
  agents?: Array<ContactPageQuery_contact_Contact_agents_Employee> | null;
  documents?: Array<ContactPageQuery_contact_Contact_documents_Document> | null;
  contracts?: Array<ContactPageQuery_contact_Contact_contracts_Document> | null;
};

export type ContactPageQuery_Query = {
  contact: ContactPageQuery_contact_Contact;
};

export type ContactPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ContactPageQuery = ContactPageQuery_Query;

export type DashboardQuery_employees_EmployeeConnection = {
  totalCount: number;
};

export type DashboardQuery_roles_RoleConnection = { totalCount: number };

export type DashboardQuery_properties_PropertyConnection = {
  totalCount: number;
};

export type DashboardQuery_complexes_ComplexConnection = { totalCount: number };

export type DashboardQuery_villages_VillageConnection = { totalCount: number };

export type DashboardQuery_developers_DeveloperConnection = {
  totalCount: number;
};

export type DashboardQuery_Query = {
  employees: DashboardQuery_employees_EmployeeConnection;
  roles: DashboardQuery_roles_RoleConnection;
  properties: DashboardQuery_properties_PropertyConnection;
  complexes: DashboardQuery_complexes_ComplexConnection;
  villages: DashboardQuery_villages_VillageConnection;
  developers: DashboardQuery_developers_DeveloperConnection;
};

export type DashboardQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardQuery = DashboardQuery_Query;

export type ChangeLeadStatusMutation_Mutation = { changeLeadStatus: boolean };

export type ChangeLeadStatusMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  status: LeadStatusEnum;
}>;

export type ChangeLeadStatusMutation = ChangeLeadStatusMutation_Mutation;

export type LeadPageQuery_lead_Lead_agents_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type LeadPageQuery_lead_Lead = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  additionalPhones?: Array<string> | null;
  internalNumber?: number | null;
  birthday?: any | null;
  source?: LeadSourceEnum | null;
  request?: string | null;
  status?: LeadStatusEnum | null;
  type?: LeadTypeEnum | null;
  address?: string | null;
  createdAt: any;
  updatedAt: any;
  agents?: Array<LeadPageQuery_lead_Lead_agents_Employee> | null;
};

export type LeadPageQuery_Query = { lead: LeadPageQuery_lead_Lead };

export type LeadPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type LeadPageQuery = LeadPageQuery_Query;

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_agent_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_mortgageBroker_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_property_Property =
  { id: string; title?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_banks_Bank =
  { id: string; title?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_contact_Contact =
  {
    id: string;
    name?: string | null;
    surname?: string | null;
    patronymic?: string | null;
  };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_contracts_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_deal_Deal =
  { id: string; internalNumber?: number | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest_documents_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestPageQuery_mortgageRequest_MortgageRequest = {
  id: string;
  internalNumber?: number | null;
  status?: MortgageRequestStatusEnum | null;
  percentage?: number | null;
  period?: number | null;
  responseDate?: any | null;
  sendDate?: any | null;
  amount?: number | null;
  firstDeposit?: number | null;
  validTillDate?: any | null;
  comment?: string | null;
  createdAt: any;
  updatedAt: any;
  agent?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest_agent_Employee | null;
  mortgageBroker?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest_mortgageBroker_Employee | null;
  property?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest_property_Property | null;
  banks?: Array<MortgageRequestPageQuery_mortgageRequest_MortgageRequest_banks_Bank> | null;
  contact?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest_contact_Contact | null;
  contracts?: Array<MortgageRequestPageQuery_mortgageRequest_MortgageRequest_contracts_Document> | null;
  deal?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest_deal_Deal | null;
  documents?: Array<MortgageRequestPageQuery_mortgageRequest_MortgageRequest_documents_Document> | null;
};

export type MortgageRequestPageQuery_Query = {
  mortgageRequest: MortgageRequestPageQuery_mortgageRequest_MortgageRequest;
};

export type MortgageRequestPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type MortgageRequestPageQuery = MortgageRequestPageQuery_Query;

export type PropertyPageQuery_property_Property_complex_Complex = {
  id: string;
  title: string;
};

export type PropertyPageQuery_property_Property_complexHouse_ComplexHouse = {
  id: string;
  title: string;
};

export type PropertyPageQuery_property_Property_village_Village = {
  id: string;
  title: string;
};

export type PropertyPageQuery_property_Property_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type PropertyPageQuery_property_Property_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type PropertyPageQuery_property_Property = {
  id: string;
  internalID?: number | null;
  deal?: DealEnum | null;
  type?: PropertyTypeEnum | null;
  subType?: PropertySubTypeEnum | null;
  commercialUsage?: Array<CommercialUsageEnum | null> | null;
  fromDeveloper?: boolean | null;
  inComplex?: boolean | null;
  inVillage?: boolean | null;
  isHot?: boolean | null;
  title?: string | null;
  description?: string | null;
  address?: string | null;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  isDeleted?: boolean | null;
  refreshDate?: any | null;
  status?: PropertyStatusEnum | null;
  price?: number | null;
  pricePerMeter?: number | null;
  pricePerAr?: number | null;
  isReady?: boolean | null;
  readinessYear?: number | null;
  readinessQuarter?: QuarterEnum | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  source?: PropertySourceEnum | null;
  rooms?: number | null;
  area?: number | null;
  landArea?: number | null;
  livingArea?: number | null;
  kitchenArea?: number | null;
  toiletType?: ToiletTypeEnum | null;
  rehabType?: RehabTypeEnum | null;
  floor?: number | null;
  floors?: number | null;
  ceilingHeight?: number | null;
  internalInfo?: string | null;
  comissionPercent?: number | null;
  comissionAmount?: number | null;
  createdAt: any;
  updatedAt: any;
  complex?: PropertyPageQuery_property_Property_complex_Complex | null;
  complexHouse?: PropertyPageQuery_property_Property_complexHouse_ComplexHouse | null;
  village?: PropertyPageQuery_property_Property_village_Village | null;
  documents?: Array<PropertyPageQuery_property_Property_documents_Document | null> | null;
  images?: Array<PropertyPageQuery_property_Property_images_Image | null> | null;
};

export type PropertyPageQuery_Query = {
  property: PropertyPageQuery_property_Property;
};

export type PropertyPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type PropertyPageQuery = PropertyPageQuery_Query;

export type StoryPageQuery_story_Story_contentBlocks_ContentBlock = {
  type: ContentBlockType;
  data: any;
  isVisible: boolean;
};

export type StoryPageQuery_story_Story_cover_Image = {
  id: string;
  url: string;
};

export type StoryPageQuery_story_Story = {
  id: string;
  category: StoryCategoryEnum;
  title: string;
  teaser?: string | null;
  createdAt: any;
  updatedAt: any;
  contentBlocks: Array<StoryPageQuery_story_Story_contentBlocks_ContentBlock>;
  cover?: StoryPageQuery_story_Story_cover_Image | null;
};

export type StoryPageQuery_Query = { story: StoryPageQuery_story_Story };

export type StoryPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type StoryPageQuery = StoryPageQuery_Query;

export type VillagePageQuery_village_Village_developer_Developer = {
  id: string;
  title: string;
};

export type VillagePageQuery_village_Village_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type VillagePageQuery_village_Village_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type VillagePageQuery_village_Village_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type VillagePageQuery_village_Village = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: VillagePageQuery_village_Village_developer_Developer | null;
  images?: Array<VillagePageQuery_village_Village_images_Image> | null;
  documents?: Array<VillagePageQuery_village_Village_documents_Document> | null;
  projectDeclarations?: Array<VillagePageQuery_village_Village_projectDeclarations_Document> | null;
};

export type VillagePageQuery_Query = {
  village: VillagePageQuery_village_Village;
};

export type VillagePageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type VillagePageQuery = VillagePageQuery_Query;

export type LoginMutation_login_LoginOutput_me_Me_avatar_Image = {
  url: string;
};

export type LoginMutation_login_LoginOutput_me_Me = {
  id: string;
  name?: string | null;
  surname?: string | null;
  avatar?: LoginMutation_login_LoginOutput_me_Me_avatar_Image | null;
};

export type LoginMutation_login_LoginOutput = {
  token: string;
  me: LoginMutation_login_LoginOutput_me_Me;
};

export type LoginMutation_Mutation = { login: LoginMutation_login_LoginOutput };

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = LoginMutation_Mutation;

export type LogoutMutation_Mutation = { logout: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = LogoutMutation_Mutation;

export type DeleteArticleMutation_Mutation = { deleteArticle: boolean };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteArticleMutation = DeleteArticleMutation_Mutation;

export type DeleteArticleGroupMutation_Mutation = {
  deleteArticleGroup: boolean;
};

export type DeleteArticleGroupMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteArticleGroupMutation = DeleteArticleGroupMutation_Mutation;

export type SaveArticleMutation_Mutation = { saveArticle: boolean };

export type SaveArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;

export type SaveArticleMutation = SaveArticleMutation_Mutation;

export type SaveArticleGroupMutation_Mutation = { saveArticleGroup: boolean };

export type SaveArticleGroupMutationVariables = Exact<{
  input: ArticleGroupInput;
}>;

export type SaveArticleGroupMutation = SaveArticleGroupMutation_Mutation;

export type ApprovePropertyMutation_Mutation = { approveProperty: boolean };

export type ApprovePropertyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ApprovePropertyMutation = ApprovePropertyMutation_Mutation;

export type ArchivePropertyMutation_Mutation = { archiveProperty: boolean };

export type ArchivePropertyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ArchivePropertyMutation = ArchivePropertyMutation_Mutation;

export type BulkApprovePropertiesMutation_Mutation = {
  bulkApproveProperties: boolean;
};

export type BulkApprovePropertiesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkApprovePropertiesMutation =
  BulkApprovePropertiesMutation_Mutation;

export type BulkArchivePropertiesMutation_Mutation = {
  bulkArchiveProperties: boolean;
};

export type BulkArchivePropertiesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkArchivePropertiesMutation =
  BulkArchivePropertiesMutation_Mutation;

export type BulkDeclinePropertiesMutation_Mutation = {
  bulkDeclineProperties: boolean;
};

export type BulkDeclinePropertiesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeclinePropertiesMutation =
  BulkDeclinePropertiesMutation_Mutation;

export type BulkDeleteComplexHousesMutation_Mutation = {
  bulkDeleteComplexHouses: boolean;
};

export type BulkDeleteComplexHousesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteComplexHousesMutation =
  BulkDeleteComplexHousesMutation_Mutation;

export type BulkDeleteComplexesMutation_Mutation = {
  bulkDeleteComplexes: boolean;
};

export type BulkDeleteComplexesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteComplexesMutation = BulkDeleteComplexesMutation_Mutation;

export type BulkDeleteDevelopersMutation_Mutation = {
  bulkDeleteDevelopers: boolean;
};

export type BulkDeleteDevelopersMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteDevelopersMutation =
  BulkDeleteDevelopersMutation_Mutation;

export type BulkDeletePropertiesMutation_Mutation = {
  bulkDeleteProperties: boolean;
};

export type BulkDeletePropertiesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeletePropertiesMutation =
  BulkDeletePropertiesMutation_Mutation;

export type BulkDeleteVillagesMutation_Mutation = {
  bulkDeleteVillages: boolean;
};

export type BulkDeleteVillagesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteVillagesMutation = BulkDeleteVillagesMutation_Mutation;

export type BulkRefreshPropertiesMutation_Mutation = {
  bulkRefreshProperties: boolean;
};

export type BulkRefreshPropertiesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkRefreshPropertiesMutation =
  BulkRefreshPropertiesMutation_Mutation;

export type DeclinePropertyMutation_Mutation = { declineProperty: boolean };

export type DeclinePropertyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeclinePropertyMutation = DeclinePropertyMutation_Mutation;

export type DeleteComplexMutation_Mutation = { deleteComplex: boolean };

export type DeleteComplexMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteComplexMutation = DeleteComplexMutation_Mutation;

export type DeleteComplexHouseMutation_Mutation = {
  deleteComplexHouse: boolean;
};

export type DeleteComplexHouseMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteComplexHouseMutation = DeleteComplexHouseMutation_Mutation;

export type DeleteDeveloperMutation_Mutation = { deleteDeveloper: boolean };

export type DeleteDeveloperMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteDeveloperMutation = DeleteDeveloperMutation_Mutation;

export type DeletePropertyMutation_Mutation = { deleteProperty: boolean };

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeletePropertyMutation = DeletePropertyMutation_Mutation;

export type DeleteVillageMutation_Mutation = { deleteVillage: boolean };

export type DeleteVillageMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteVillageMutation = DeleteVillageMutation_Mutation;

export type RefreshPropertyMutation_Mutation = { refreshProperty: boolean };

export type RefreshPropertyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type RefreshPropertyMutation = RefreshPropertyMutation_Mutation;

export type SaveComplexMutation_Mutation = { saveComplex: boolean };

export type SaveComplexMutationVariables = Exact<{
  input: ComplexInput;
}>;

export type SaveComplexMutation = SaveComplexMutation_Mutation;

export type SaveComplexHouseMutation_Mutation = { saveComplexHouse: boolean };

export type SaveComplexHouseMutationVariables = Exact<{
  input: ComplexHouseInput;
}>;

export type SaveComplexHouseMutation = SaveComplexHouseMutation_Mutation;

export type SaveDeveloperMutation_Mutation = { saveDeveloper: boolean };

export type SaveDeveloperMutationVariables = Exact<{
  input: DeveloperInput;
}>;

export type SaveDeveloperMutation = SaveDeveloperMutation_Mutation;

export type SavePropertyMutation_Mutation = { saveProperty: boolean };

export type SavePropertyMutationVariables = Exact<{
  input: PropertyInput;
}>;

export type SavePropertyMutation = SavePropertyMutation_Mutation;

export type SaveVillageMutation_Mutation = { saveVillage: boolean };

export type SaveVillageMutationVariables = Exact<{
  input: VillageInput;
}>;

export type SaveVillageMutation = SaveVillageMutation_Mutation;

export type UploadImageMutation_uploadImage_Image = {
  id: string;
  url: string;
  path: string;
  title?: string | null;
  fileName: string;
  fileType: string;
  previewUrl?: string | null;
  previewPath?: string | null;
  blurHash?: string | null;
  preset: ImagePreset;
};

export type UploadImageMutation_Mutation = {
  uploadImage: UploadImageMutation_uploadImage_Image;
};

export type UploadImageMutationVariables = Exact<{
  input: ImageInput;
}>;

export type UploadImageMutation = UploadImageMutation_Mutation;

export type ActivateEmployeesMutation_Mutation = { activateEmployees: boolean };

export type ActivateEmployeesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type ActivateEmployeesMutation = ActivateEmployeesMutation_Mutation;

export type AssignDepartmentToEmployeesMutation_Mutation = {
  assignDepartmentToEmployees: boolean;
};

export type AssignDepartmentToEmployeesMutationVariables = Exact<{
  department: Scalars["ID"]["input"];
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type AssignDepartmentToEmployeesMutation =
  AssignDepartmentToEmployeesMutation_Mutation;

export type AssignRoleToEmployeesMutation_Mutation = {
  assignRoleToEmployees: boolean;
};

export type AssignRoleToEmployeesMutationVariables = Exact<{
  role: Scalars["ID"]["input"];
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type AssignRoleToEmployeesMutation =
  AssignRoleToEmployeesMutation_Mutation;

export type DeactivateEmployeesMutation_Mutation = {
  deactivateEmployees: boolean;
};

export type DeactivateEmployeesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type DeactivateEmployeesMutation = DeactivateEmployeesMutation_Mutation;

export type DeleteDepartmentMutation_Mutation = { deleteDepartment: boolean };

export type DeleteDepartmentMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteDepartmentMutation = DeleteDepartmentMutation_Mutation;

export type DeleteEmployeeMutation_Mutation = { deleteEmployee: boolean };

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteEmployeeMutation = DeleteEmployeeMutation_Mutation;

export type DeleteEmployeesMutation_Mutation = { deleteEmployees: boolean };

export type DeleteEmployeesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type DeleteEmployeesMutation = DeleteEmployeesMutation_Mutation;

export type DeleteRoleMutation_Mutation = { deleteRole: boolean };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteRoleMutation = DeleteRoleMutation_Mutation;

export type PublishEmployeesMutation_Mutation = { publishEmployees: boolean };

export type PublishEmployeesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type PublishEmployeesMutation = PublishEmployeesMutation_Mutation;

export type SaveDepartmentMutation_Mutation = { saveDepartment: boolean };

export type SaveDepartmentMutationVariables = Exact<{
  input: DepartmentInput;
}>;

export type SaveDepartmentMutation = SaveDepartmentMutation_Mutation;

export type SaveEmployeeMutation_Mutation = { saveEmployee: boolean };

export type SaveEmployeeMutationVariables = Exact<{
  input: EmployeeInput;
}>;

export type SaveEmployeeMutation = SaveEmployeeMutation_Mutation;

export type SaveRoleMutation_Mutation = { saveRole: boolean };

export type SaveRoleMutationVariables = Exact<{
  input: RoleInput;
}>;

export type SaveRoleMutation = SaveRoleMutation_Mutation;

export type UnpublishEmployeesMutation_Mutation = {
  unpublishEmployees: boolean;
};

export type UnpublishEmployeesMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type UnpublishEmployeesMutation = UnpublishEmployeesMutation_Mutation;

export type MeQuery_me_Me_avatar_Image = { url: string };

export type MeQuery_me_Me = {
  id: string;
  name?: string | null;
  surname?: string | null;
  avatar?: MeQuery_me_Me_avatar_Image | null;
};

export type MeQuery_Query = { me: MeQuery_me_Me };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = MeQuery_Query;

export type ArticleQuery_article_Article_group_ArticleGroup = {
  id: string;
  title: string;
};

export type ArticleQuery_article_Article_contentBlocks_ContentBlock = {
  type: ContentBlockType;
  data: any;
  isVisible: boolean;
};

export type ArticleQuery_article_Article_cover_Image = {
  id: string;
  url: string;
};

export type ArticleQuery_article_Article = {
  id: string;
  title: string;
  status: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
  group?: ArticleQuery_article_Article_group_ArticleGroup | null;
  contentBlocks: Array<ArticleQuery_article_Article_contentBlocks_ContentBlock>;
  cover?: ArticleQuery_article_Article_cover_Image | null;
};

export type ArticleQuery_Query = { article: ArticleQuery_article_Article };

export type ArticleQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ArticleQuery = ArticleQuery_Query;

export type ArticleGroupQuery_articleGroup_ArticleGroup = {
  id: string;
  title: string;
  createdAt: any;
  updatedAt: any;
};

export type ArticleGroupQuery_Query = {
  articleGroup: ArticleGroupQuery_articleGroup_ArticleGroup;
};

export type ArticleGroupQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ArticleGroupQuery = ArticleGroupQuery_Query;

export type ArticleGroupsQuery_articleGroups_ArticleGroupConnection_nodes_ArticleGroup =
  { id: string; title: string; createdAt: any; updatedAt: any };

export type ArticleGroupsQuery_articleGroups_ArticleGroupConnection = {
  totalCount: number;
  nodes: Array<ArticleGroupsQuery_articleGroups_ArticleGroupConnection_nodes_ArticleGroup>;
};

export type ArticleGroupsQuery_Query = {
  articleGroups: ArticleGroupsQuery_articleGroups_ArticleGroupConnection;
};

export type ArticleGroupsQueryVariables = Exact<{
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type ArticleGroupsQuery = ArticleGroupsQuery_Query;

export type ArticlesQuery_articles_ArticleConnection_nodes_Article_cover_Image =
  { url: string };

export type ArticlesQuery_articles_ArticleConnection_nodes_Article = {
  id: string;
  title: string;
  status: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
  cover?: ArticlesQuery_articles_ArticleConnection_nodes_Article_cover_Image | null;
};

export type ArticlesQuery_articles_ArticleConnection = {
  totalCount: number;
  nodes: Array<ArticlesQuery_articles_ArticleConnection_nodes_Article>;
};

export type ArticlesQuery_Query = {
  articles: ArticlesQuery_articles_ArticleConnection;
};

export type ArticlesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  filter?: InputMaybe<ArticlesFilterInput>;
}>;

export type ArticlesQuery = ArticlesQuery_Query;

export type ComplexQuery_complex_Complex_developer_Developer = {
  id: string;
  title: string;
};

export type ComplexQuery_complex_Complex_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type ComplexQuery_complex_Complex_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type ComplexQuery_complex_Complex_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type ComplexQuery_complex_Complex = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: ComplexQuery_complex_Complex_developer_Developer | null;
  images?: Array<ComplexQuery_complex_Complex_images_Image> | null;
  documents?: Array<ComplexQuery_complex_Complex_documents_Document> | null;
  projectDeclarations?: Array<ComplexQuery_complex_Complex_projectDeclarations_Document> | null;
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
  title?: string | null;
};

export type ComplexHouseQuery_complexHouse_ComplexHouse_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type ComplexHouseQuery_complexHouse_ComplexHouse_projectDeclarations_Document =
  { id: string; url: string; title?: string | null; fileName: string };

export type ComplexHouseQuery_complexHouse_ComplexHouse = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  complex?: ComplexHouseQuery_complexHouse_ComplexHouse_complex_Complex | null;
  images?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_images_Image> | null;
  documents?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_documents_Document> | null;
  projectDeclarations?: Array<ComplexHouseQuery_complexHouse_ComplexHouse_projectDeclarations_Document> | null;
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
  { id: string; url: string; title?: string | null };

export type ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse =
  {
    id: string;
    title: string;
    description: string;
    address: string;
    lat?: number | null;
    lon?: number | null;
    cadastrNumber?: string | null;
    isReady?: boolean | null;
    readinessQuarter?: QuarterEnum | null;
    readinessYear?: number | null;
    publicationStatus?: PublicationStatusEnum | null;
    internalInfo?: string | null;
    isDeleted?: boolean | null;
    createdAt: any;
    updatedAt: any;
    complex?: ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_complex_Complex | null;
    images?: Array<ComplexHousesQuery_complexHouses_ComplexHouseConnection_nodes_ComplexHouse_images_Image> | null;
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
  { id: string; url: string; title?: string | null };

export type ComplexesQuery_complexes_ComplexConnection_nodes_Complex = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: ComplexesQuery_complexes_ComplexConnection_nodes_Complex_developer_Developer | null;
  images?: Array<ComplexesQuery_complexes_ComplexConnection_nodes_Complex_images_Image> | null;
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
  filter?: InputMaybe<ComplexFilter>;
}>;

export type ComplexesQuery = ComplexesQuery_Query;

export type DeveloperQuery_developer_Developer = {
  id: string;
  title: string;
  url?: string | null;
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
  url?: string | null;
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
  { id: string; url: string; title?: string | null };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property_images_Image =
  { id: string; url: string; title?: string | null };

export type PropertiesQuery_properties_PropertyConnection_nodes_Property = {
  id: string;
  internalID?: number | null;
  deal?: DealEnum | null;
  type?: PropertyTypeEnum | null;
  subType?: PropertySubTypeEnum | null;
  commercialUsage?: Array<CommercialUsageEnum | null> | null;
  fromDeveloper?: boolean | null;
  inComplex?: boolean | null;
  inVillage?: boolean | null;
  isHot?: boolean | null;
  title?: string | null;
  description?: string | null;
  address?: string | null;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  isDeleted?: boolean | null;
  refreshDate?: any | null;
  status?: PropertyStatusEnum | null;
  price?: number | null;
  pricePerMeter?: number | null;
  pricePerAr?: number | null;
  isReady?: boolean | null;
  readinessYear?: number | null;
  readinessQuarter?: QuarterEnum | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  source?: PropertySourceEnum | null;
  rooms?: number | null;
  area?: number | null;
  landArea?: number | null;
  livingArea?: number | null;
  kitchenArea?: number | null;
  toiletType?: ToiletTypeEnum | null;
  rehabType?: RehabTypeEnum | null;
  floor?: number | null;
  floors?: number | null;
  ceilingHeight?: number | null;
  internalInfo?: string | null;
  comissionPercent?: number | null;
  comissionAmount?: number | null;
  createdAt: any;
  updatedAt: any;
  complex?: PropertiesQuery_properties_PropertyConnection_nodes_Property_complex_Complex | null;
  complexHouse?: PropertiesQuery_properties_PropertyConnection_nodes_Property_complexHouse_ComplexHouse | null;
  village?: PropertiesQuery_properties_PropertyConnection_nodes_Property_village_Village | null;
  documents?: Array<PropertiesQuery_properties_PropertyConnection_nodes_Property_documents_Document | null> | null;
  images?: Array<PropertiesQuery_properties_PropertyConnection_nodes_Property_images_Image | null> | null;
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

export type PropertyQuery_property_Property_complex_Complex = {
  id: string;
  title: string;
};

export type PropertyQuery_property_Property_complexHouse_ComplexHouse = {
  id: string;
  title: string;
};

export type PropertyQuery_property_Property_village_Village = {
  id: string;
  title: string;
};

export type PropertyQuery_property_Property_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type PropertyQuery_property_Property_images_Image = {
  id: string;
  url: string;
  title?: string | null;
};

export type PropertyQuery_property_Property = {
  id: string;
  internalID?: number | null;
  deal?: DealEnum | null;
  type?: PropertyTypeEnum | null;
  subType?: PropertySubTypeEnum | null;
  commercialUsage?: Array<CommercialUsageEnum | null> | null;
  fromDeveloper?: boolean | null;
  inComplex?: boolean | null;
  inVillage?: boolean | null;
  isHot?: boolean | null;
  title?: string | null;
  description?: string | null;
  address?: string | null;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  isDeleted?: boolean | null;
  refreshDate?: any | null;
  status?: PropertyStatusEnum | null;
  price?: number | null;
  pricePerMeter?: number | null;
  pricePerAr?: number | null;
  isReady?: boolean | null;
  readinessYear?: number | null;
  readinessQuarter?: QuarterEnum | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  source?: PropertySourceEnum | null;
  rooms?: number | null;
  area?: number | null;
  landArea?: number | null;
  livingArea?: number | null;
  kitchenArea?: number | null;
  toiletType?: ToiletTypeEnum | null;
  rehabType?: RehabTypeEnum | null;
  floor?: number | null;
  floors?: number | null;
  ceilingHeight?: number | null;
  internalInfo?: string | null;
  comissionPercent?: number | null;
  comissionAmount?: number | null;
  createdAt: any;
  updatedAt: any;
  complex?: PropertyQuery_property_Property_complex_Complex | null;
  complexHouse?: PropertyQuery_property_Property_complexHouse_ComplexHouse | null;
  village?: PropertyQuery_property_Property_village_Village | null;
  documents?: Array<PropertyQuery_property_Property_documents_Document | null> | null;
  images?: Array<PropertyQuery_property_Property_images_Image | null> | null;
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
  title?: string | null;
};

export type VillageQuery_village_Village_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
  fileName: string;
};

export type VillageQuery_village_Village_projectDeclarations_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type VillageQuery_village_Village = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  seoText?: string | null;
  youtubeLink?: string | null;
  tourLink?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  region?: string | null;
  subRegion?: string | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: VillageQuery_village_Village_developer_Developer | null;
  images?: Array<VillageQuery_village_Village_images_Image> | null;
  documents?: Array<VillageQuery_village_Village_documents_Document> | null;
  projectDeclarations?: Array<VillageQuery_village_Village_projectDeclarations_Document> | null;
};

export type VillageQuery_Query = { village: VillageQuery_village_Village };

export type VillageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type VillageQuery = VillageQuery_Query;

export type VillagesQuery_villages_VillageConnection_nodes_Village_developer_Developer =
  { id: string; title: string };

export type VillagesQuery_villages_VillageConnection_nodes_Village_images_Image =
  { id: string; url: string; title?: string | null };

export type VillagesQuery_villages_VillageConnection_nodes_Village = {
  id: string;
  title: string;
  description: string;
  address: string;
  lat?: number | null;
  lon?: number | null;
  cadastrNumber?: string | null;
  inCity?: boolean | null;
  cityDistance?: number | null;
  isReady?: boolean | null;
  readinessQuarter?: QuarterEnum | null;
  readinessYear?: number | null;
  publicationStatus?: PublicationStatusEnum | null;
  internalInfo?: string | null;
  isDeleted?: boolean | null;
  createdAt: any;
  updatedAt: any;
  developer?: VillagesQuery_villages_VillageConnection_nodes_Village_developer_Developer | null;
  images?: Array<VillagesQuery_villages_VillageConnection_nodes_Village_images_Image> | null;
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
  filter?: InputMaybe<VillageFilter>;
}>;

export type VillagesQuery = VillagesQuery_Query;

export type DepartmentQuery_department_Department_groups_DepartmentGroup = {
  id: string;
  title: string;
};

export type DepartmentQuery_department_Department = {
  id: string;
  title: string;
  groups: Array<DepartmentQuery_department_Department_groups_DepartmentGroup>;
};

export type DepartmentQuery_Query = {
  department: DepartmentQuery_department_Department;
};

export type DepartmentQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DepartmentQuery = DepartmentQuery_Query;

export type DepartmentsQuery_departments_DepartmentConnection_nodes_Department_groups_DepartmentGroup =
  { id: string; title: string };

export type DepartmentsQuery_departments_DepartmentConnection_nodes_Department =
  {
    id: string;
    title: string;
    groups: Array<DepartmentsQuery_departments_DepartmentConnection_nodes_Department_groups_DepartmentGroup>;
  };

export type DepartmentsQuery_departments_DepartmentConnection = {
  totalCount: number;
  nodes: Array<DepartmentsQuery_departments_DepartmentConnection_nodes_Department>;
};

export type DepartmentsQuery_Query = {
  departments: DepartmentsQuery_departments_DepartmentConnection;
};

export type DepartmentsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type DepartmentsQuery = DepartmentsQuery_Query;

export type EmployeeQuery_employee_Employee_position_Position = {
  id: string;
  title: string;
};

export type EmployeeQuery_employee_Employee_department_Department_groups_DepartmentGroup =
  { id: string; title: string };

export type EmployeeQuery_employee_Employee_department_Department = {
  id: string;
  title: string;
  groups: Array<EmployeeQuery_employee_Employee_department_Department_groups_DepartmentGroup>;
};

export type EmployeeQuery_employee_Employee_group_DepartmentGroup = {
  id: string;
  title: string;
};

export type EmployeeQuery_employee_Employee_role_Role = {
  id: string;
  title: string;
  permissions: Array<RolePermissionsEnum>;
};

export type EmployeeQuery_employee_Employee_avatar_Image = {
  id: string;
  url: string;
  path: string;
  title?: string | null;
  fileName: string;
  fileType: string;
  previewUrl?: string | null;
  previewPath?: string | null;
  blurHash?: string | null;
  preset: ImagePreset;
};

export type EmployeeQuery_employee_Employee_publicImage_Image = {
  id: string;
  url: string;
  path: string;
  title?: string | null;
  fileName: string;
  fileType: string;
  previewUrl?: string | null;
  previewPath?: string | null;
  blurHash?: string | null;
  preset: ImagePreset;
};

export type EmployeeQuery_employee_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  birthday?: any | null;
  email: string;
  phone: string;
  internalInfo?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  isPublished: boolean;
  createdAt: any;
  updatedAt: any;
  position?: EmployeeQuery_employee_Employee_position_Position | null;
  department?: EmployeeQuery_employee_Employee_department_Department | null;
  group?: EmployeeQuery_employee_Employee_group_DepartmentGroup | null;
  role?: EmployeeQuery_employee_Employee_role_Role | null;
  avatar?: EmployeeQuery_employee_Employee_avatar_Image | null;
  publicImage?: EmployeeQuery_employee_Employee_publicImage_Image | null;
};

export type EmployeeQuery_Query = { employee: EmployeeQuery_employee_Employee };

export type EmployeeQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type EmployeeQuery = EmployeeQuery_Query;

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_position_Position =
  { id: string; title: string };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_department_Department =
  { id: string; title: string };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_group_DepartmentGroup =
  { id: string; title: string };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_role_Role =
  { id: string; title: string; permissions: Array<RolePermissionsEnum> };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image =
  {
    id: string;
    url: string;
    path: string;
    title?: string | null;
    fileName: string;
    fileType: string;
    previewUrl?: string | null;
    previewPath?: string | null;
    blurHash?: string | null;
    preset: ImagePreset;
  };

export type EmployeesQuery_employees_EmployeeConnection_nodes_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  birthday?: any | null;
  email: string;
  phone: string;
  internalInfo?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  isPublished: boolean;
  createdAt: any;
  updatedAt: any;
  position?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_position_Position | null;
  department?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_department_Department | null;
  group?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_group_DepartmentGroup | null;
  role?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_role_Role | null;
  avatar?: EmployeesQuery_employees_EmployeeConnection_nodes_Employee_avatar_Image | null;
};

export type EmployeesQuery_employees_EmployeeConnection = {
  totalCount: number;
  nodes: Array<EmployeesQuery_employees_EmployeeConnection_nodes_Employee>;
};

export type EmployeesQuery_Query = {
  employees: EmployeesQuery_employees_EmployeeConnection;
};

export type EmployeesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  filter?: InputMaybe<EmployeesFilterInput>;
}>;

export type EmployeesQuery = EmployeesQuery_Query;

export type LogsQuery_logs_LogConnection_nodes_Log_author_Employee = {
  id: string;
  name: string;
  surname: string;
};

export type LogsQuery_logs_LogConnection_nodes_Log = {
  id: string;
  eid?: string | null;
  type: LogTypeEnum;
  level: LogLevelEnum;
  createdAt: any;
  author?: LogsQuery_logs_LogConnection_nodes_Log_author_Employee | null;
};

export type LogsQuery_logs_LogConnection = {
  totalCount: number;
  nodes: Array<LogsQuery_logs_LogConnection_nodes_Log>;
};

export type LogsQuery_Query = { logs: LogsQuery_logs_LogConnection };

export type LogsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<LogsFilterInput>;
}>;

export type LogsQuery = LogsQuery_Query;

export type PositionsQuery_positions_PositionConnection_nodes_Position = {
  id: string;
  title: string;
};

export type PositionsQuery_positions_PositionConnection = {
  totalCount: number;
  nodes: Array<PositionsQuery_positions_PositionConnection_nodes_Position>;
};

export type PositionsQuery_Query = {
  positions: PositionsQuery_positions_PositionConnection;
};

export type PositionsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type PositionsQuery = PositionsQuery_Query;

export type RoleQuery_role_Role = {
  id: string;
  title: string;
  permissions: Array<RolePermissionsEnum>;
};

export type RoleQuery_Query = { role: RoleQuery_role_Role };

export type RoleQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type RoleQuery = RoleQuery_Query;

export type RolesQuery_roles_RoleConnection_nodes_Role = {
  id: string;
  title: string;
  permissions: Array<RolePermissionsEnum>;
};

export type RolesQuery_roles_RoleConnection = {
  totalCount: number;
  nodes: Array<RolesQuery_roles_RoleConnection_nodes_Role>;
};

export type RolesQuery_Query = { roles: RolesQuery_roles_RoleConnection };

export type RolesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type RolesQuery = RolesQuery_Query;

export type ContactQuery_contact_Contact_deals_Deal = {
  id: string;
  internalNumber?: number | null;
};

export type ContactQuery_contact_Contact_properties_Property = {
  id: string;
  title?: string | null;
};

export type ContactQuery_contact_Contact_agents_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type ContactQuery_contact_Contact_documents_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type ContactQuery_contact_Contact_contracts_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type ContactQuery_contact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  note?: string | null;
  email?: string | null;
  company?: string | null;
  passportIssueDate?: any | null;
  passportNumber?: string | null;
  passportIssuedBy?: string | null;
  passportIssuerCode?: string | null;
  additionalPhones?: Array<string> | null;
  internalNumber?: number | null;
  birthday?: any | null;
  source?: ContactSourceEnum | null;
  type?: CounterPartyTypeEnum | null;
  address?: string | null;
  createdAt: any;
  updatedAt: any;
  deals?: Array<ContactQuery_contact_Contact_deals_Deal> | null;
  properties?: Array<ContactQuery_contact_Contact_properties_Property> | null;
  agents?: Array<ContactQuery_contact_Contact_agents_Employee> | null;
  documents?: Array<ContactQuery_contact_Contact_documents_Document> | null;
  contracts?: Array<ContactQuery_contact_Contact_contracts_Document> | null;
};

export type ContactQuery_Query = { contact: ContactQuery_contact_Contact };

export type ContactQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ContactQuery = ContactQuery_Query;

export type DeleteContactMutation_Mutation = { deleteContact: boolean };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteContactMutation = DeleteContactMutation_Mutation;

export type SaveContactMutation_Mutation = { saveContact: boolean };

export type SaveContactMutationVariables = Exact<{
  input: ContactInput;
}>;

export type SaveContactMutation = SaveContactMutation_Mutation;

export type BulkDeleteContactsMutation_Mutation = {
  bulkDeleteContacts: boolean;
};

export type BulkDeleteContactsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteContactsMutation = BulkDeleteContactsMutation_Mutation;

export type ContactsQuery_contacts_ContactConnection_nodes_Contact_properties_Property =
  { id: string; title?: string | null };

export type ContactsQuery_contacts_ContactConnection_nodes_Contact_agents_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type ContactsQuery_contacts_ContactConnection_nodes_Contact_documents_Document =
  { id: string; title?: string | null };

export type ContactsQuery_contacts_ContactConnection_nodes_Contact_contracts_Document =
  { id: string; title?: string | null };

export type ContactsQuery_contacts_ContactConnection_nodes_Contact = {
  id: string;
  internalNumber?: number | null;
  name?: string | null;
  surname?: string | null;
  address?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  additionalPhones?: Array<string> | null;
  email?: string | null;
  source?: ContactSourceEnum | null;
  type?: CounterPartyTypeEnum | null;
  company?: string | null;
  passportNumber?: string | null;
  passportIssuedBy?: string | null;
  passportIssuerCode?: string | null;
  note?: string | null;
  createdAt: any;
  updatedAt: any;
  properties?: Array<ContactsQuery_contacts_ContactConnection_nodes_Contact_properties_Property> | null;
  agents?: Array<ContactsQuery_contacts_ContactConnection_nodes_Contact_agents_Employee> | null;
  documents?: Array<ContactsQuery_contacts_ContactConnection_nodes_Contact_documents_Document> | null;
  contracts?: Array<ContactsQuery_contacts_ContactConnection_nodes_Contact_contracts_Document> | null;
};

export type ContactsQuery_contacts_ContactConnection = {
  totalCount: number;
  nodes: Array<ContactsQuery_contacts_ContactConnection_nodes_Contact>;
};

export type ContactsQuery_Query = {
  contacts: ContactsQuery_contacts_ContactConnection;
};

export type ContactsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<ContactFilter>;
}>;

export type ContactsQuery = ContactsQuery_Query;

export type DealQuery_deal_Deal_accountant_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_buyerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_buyerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_sellerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_sellerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_mortgageBroker_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_property_Property = {
  id: string;
  title?: string | null;
};

export type DealQuery_deal_Deal_lawer_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type DealQuery_deal_Deal_sellerDocuments_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type DealQuery_deal_Deal_mortgageDocuments_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type DealQuery_deal_Deal_mortgageRequest_MortgageRequest = {
  id: string;
};

export type DealQuery_deal_Deal_accountantDocuments_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type DealQuery_deal_Deal_lawerDocuments_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type DealQuery_deal_Deal_buyerDocuments_Document = {
  id: string;
  url: string;
  title?: string | null;
};

export type DealQuery_deal_Deal = {
  address?: string | null;
  depositDate?: any | null;
  finishedAt?: any | null;
  id: string;
  internalComment?: string | null;
  internalNumber?: number | null;
  isDeleted?: boolean | null;
  sellerPhone?: string | null;
  stage?: DealStageEnum | null;
  type?: DealTypeEnum | null;
  updatedAt: any;
  buyerPhone?: string | null;
  commissionAmount?: number | null;
  createdAt: any;
  dealDate?: any | null;
  accountant?: DealQuery_deal_Deal_accountant_Employee | null;
  buyerAgent?: DealQuery_deal_Deal_buyerAgent_Employee | null;
  buyerContact?: DealQuery_deal_Deal_buyerContact_Contact | null;
  sellerAgent?: DealQuery_deal_Deal_sellerAgent_Employee | null;
  sellerContact?: DealQuery_deal_Deal_sellerContact_Contact | null;
  mortgageBroker?: DealQuery_deal_Deal_mortgageBroker_Employee | null;
  property?: DealQuery_deal_Deal_property_Property | null;
  lawer?: DealQuery_deal_Deal_lawer_Employee | null;
  sellerDocuments?: Array<DealQuery_deal_Deal_sellerDocuments_Document> | null;
  mortgageDocuments?: Array<DealQuery_deal_Deal_mortgageDocuments_Document> | null;
  mortgageRequest?: DealQuery_deal_Deal_mortgageRequest_MortgageRequest | null;
  accountantDocuments?: Array<DealQuery_deal_Deal_accountantDocuments_Document> | null;
  lawerDocuments?: Array<DealQuery_deal_Deal_lawerDocuments_Document> | null;
  buyerDocuments?: Array<DealQuery_deal_Deal_buyerDocuments_Document> | null;
};

export type DealQuery_Query = { deal: DealQuery_deal_Deal };

export type DealQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DealQuery = DealQuery_Query;

export type DeleteDealMutation_Mutation = { deleteDeal: boolean };

export type DeleteDealMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteDealMutation = DeleteDealMutation_Mutation;

export type SaveDealMutation_Mutation = { saveDeal: boolean };

export type SaveDealMutationVariables = Exact<{
  input: DealInput;
}>;

export type SaveDealMutation = SaveDealMutation_Mutation;

export type BulkDeleteDealsMutation_Mutation = { bulkDeleteDeals: boolean };

export type BulkDeleteDealsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteDealsMutation = BulkDeleteDealsMutation_Mutation;

export type DealsQuery_deals_DealConnection_nodes_Deal_sellerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type DealsQuery_deals_DealConnection_nodes_Deal_buyerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type DealsQuery_deals_DealConnection_nodes_Deal_property_Property = {
  id: string;
  title?: string | null;
};

export type DealsQuery_deals_DealConnection_nodes_Deal_sellerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
};

export type DealsQuery_deals_DealConnection_nodes_Deal_buyerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
};

export type DealsQuery_deals_DealConnection_nodes_Deal = {
  id: string;
  internalNumber?: number | null;
  type?: DealTypeEnum | null;
  stage?: DealStageEnum | null;
  depositDate?: any | null;
  internalComment?: string | null;
  isDeleted?: boolean | null;
  sellerPhone?: string | null;
  address?: string | null;
  buyerPhone?: string | null;
  commissionAmount?: number | null;
  dealDate?: any | null;
  finishedAt?: any | null;
  createdAt: any;
  updatedAt: any;
  sellerContact?: DealsQuery_deals_DealConnection_nodes_Deal_sellerContact_Contact | null;
  buyerContact?: DealsQuery_deals_DealConnection_nodes_Deal_buyerContact_Contact | null;
  property?: DealsQuery_deals_DealConnection_nodes_Deal_property_Property | null;
  sellerAgent?: DealsQuery_deals_DealConnection_nodes_Deal_sellerAgent_Employee | null;
  buyerAgent?: DealsQuery_deals_DealConnection_nodes_Deal_buyerAgent_Employee | null;
};

export type DealsQuery_deals_DealConnection = {
  totalCount: number;
  nodes: Array<DealsQuery_deals_DealConnection_nodes_Deal>;
};

export type DealsQuery_Query = { deals: DealsQuery_deals_DealConnection };

export type DealsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<DealFilter>;
}>;

export type DealsQuery = DealsQuery_Query;

export type DeleteLeadMutation_Mutation = { deleteLead: boolean };

export type DeleteLeadMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteLeadMutation = DeleteLeadMutation_Mutation;

export type LeadQuery_lead_Lead_agents_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type LeadQuery_lead_Lead = {
  id: string;
  internalNumber?: number | null;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  additionalPhones?: Array<string> | null;
  email?: string | null;
  request?: string | null;
  source?: LeadSourceEnum | null;
  status?: LeadStatusEnum | null;
  type?: LeadTypeEnum | null;
  address?: string | null;
  company?: string | null;
  birthday?: any | null;
  comment?: string | null;
  createdAt: any;
  updatedAt: any;
  agents?: Array<LeadQuery_lead_Lead_agents_Employee> | null;
};

export type LeadQuery_Query = { lead: LeadQuery_lead_Lead };

export type LeadQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type LeadQuery = LeadQuery_Query;

export type SaveLeadMutation_Mutation = { saveLead: boolean };

export type SaveLeadMutationVariables = Exact<{
  input: LeadInput;
}>;

export type SaveLeadMutation = SaveLeadMutation_Mutation;

export type BulkDeleteLeadsMutation_Mutation = { bulkDeleteLeads: boolean };

export type BulkDeleteLeadsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteLeadsMutation = BulkDeleteLeadsMutation_Mutation;

export type LeadsQuery_leads_LeadConnection_nodes_Lead_agents_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type LeadsQuery_leads_LeadConnection_nodes_Lead = {
  id: string;
  internalNumber?: number | null;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  additionalPhones?: Array<string> | null;
  email?: string | null;
  request?: string | null;
  source?: LeadSourceEnum | null;
  status?: LeadStatusEnum | null;
  type?: LeadTypeEnum | null;
  address?: string | null;
  company?: string | null;
  createdAt: any;
  updatedAt: any;
  agents?: Array<LeadsQuery_leads_LeadConnection_nodes_Lead_agents_Employee> | null;
};

export type LeadsQuery_leads_LeadConnection = {
  totalCount: number;
  nodes: Array<LeadsQuery_leads_LeadConnection_nodes_Lead>;
};

export type LeadsQuery_Query = { leads: LeadsQuery_leads_LeadConnection };

export type LeadsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<LeadFilter>;
}>;

export type LeadsQuery = LeadsQuery_Query;

export type DeleteMeetMutation_Mutation = { deleteMeet: boolean };

export type DeleteMeetMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteMeetMutation = DeleteMeetMutation_Mutation;

export type MeetQuery_meet_Meet_accountant_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_lawer_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_mortgageBroker_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_property_Property = {
  id: string;
  title?: string | null;
};

export type MeetQuery_meet_Meet_sellerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_sellerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_buyerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet_buyerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type MeetQuery_meet_Meet = {
  id: string;
  dateTime?: any | null;
  internalNumber?: number | null;
  isDeleted?: boolean | null;
  isOnline?: boolean | null;
  address?: string | null;
  sellerPhone?: string | null;
  status?: MeetStatusEnum | null;
  type?: MeetTypeEnum | null;
  updatedAt: any;
  useDealDeposit?: boolean | null;
  useMortgage?: boolean | null;
  buyerAgency?: string | null;
  buyerPhone?: string | null;
  cancelReason?: MeetCancelReasonEnum | null;
  cancelReasonCustom?: string | null;
  comment?: string | null;
  createdAt: any;
  accountant?: MeetQuery_meet_Meet_accountant_Employee | null;
  lawer?: MeetQuery_meet_Meet_lawer_Employee | null;
  mortgageBroker?: MeetQuery_meet_Meet_mortgageBroker_Employee | null;
  property?: MeetQuery_meet_Meet_property_Property | null;
  sellerAgent?: MeetQuery_meet_Meet_sellerAgent_Employee | null;
  sellerContact?: MeetQuery_meet_Meet_sellerContact_Contact | null;
  buyerAgent?: MeetQuery_meet_Meet_buyerAgent_Employee | null;
  buyerContact?: MeetQuery_meet_Meet_buyerContact_Contact | null;
};

export type MeetQuery_Query = { meet: MeetQuery_meet_Meet };

export type MeetQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type MeetQuery = MeetQuery_Query;

export type SaveMeetMutation_Mutation = { saveMeet: boolean };

export type SaveMeetMutationVariables = Exact<{
  input: MeetInput;
}>;

export type SaveMeetMutation = SaveMeetMutation_Mutation;

export type BulkDeleteMeetsMutation_Mutation = { bulkDeleteMeets: boolean };

export type BulkDeleteMeetsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteMeetsMutation = BulkDeleteMeetsMutation_Mutation;

export type MeetsQuery_meets_MeetConnection_nodes_Meet_accountant_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  phone: string;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_lawer_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  phone: string;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_mortgageBroker_Employee =
  {
    id: string;
    name: string;
    surname: string;
    patronymic?: string | null;
    phone: string;
  };

export type MeetsQuery_meets_MeetConnection_nodes_Meet_property_Property = {
  id: string;
  title?: string | null;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_sellerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  phone: string;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_sellerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_buyerAgent_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  phone: string;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet_buyerContact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
  phone?: string | null;
};

export type MeetsQuery_meets_MeetConnection_nodes_Meet = {
  id: string;
  dateTime?: any | null;
  internalNumber?: number | null;
  isDeleted?: boolean | null;
  isOnline?: boolean | null;
  address?: string | null;
  sellerPhone?: string | null;
  status?: MeetStatusEnum | null;
  type?: MeetTypeEnum | null;
  updatedAt: any;
  useDealDeposit?: boolean | null;
  useMortgage?: boolean | null;
  buyerAgency?: string | null;
  buyerPhone?: string | null;
  cancelReason?: MeetCancelReasonEnum | null;
  cancelReasonCustom?: string | null;
  comment?: string | null;
  createdAt: any;
  accountant?: MeetsQuery_meets_MeetConnection_nodes_Meet_accountant_Employee | null;
  lawer?: MeetsQuery_meets_MeetConnection_nodes_Meet_lawer_Employee | null;
  mortgageBroker?: MeetsQuery_meets_MeetConnection_nodes_Meet_mortgageBroker_Employee | null;
  property?: MeetsQuery_meets_MeetConnection_nodes_Meet_property_Property | null;
  sellerAgent?: MeetsQuery_meets_MeetConnection_nodes_Meet_sellerAgent_Employee | null;
  sellerContact?: MeetsQuery_meets_MeetConnection_nodes_Meet_sellerContact_Contact | null;
  buyerAgent?: MeetsQuery_meets_MeetConnection_nodes_Meet_buyerAgent_Employee | null;
  buyerContact?: MeetsQuery_meets_MeetConnection_nodes_Meet_buyerContact_Contact | null;
};

export type MeetsQuery_meets_MeetConnection = {
  totalCount: number;
  nodes: Array<MeetsQuery_meets_MeetConnection_nodes_Meet>;
};

export type MeetsQuery_Query = { meets: MeetsQuery_meets_MeetConnection };

export type MeetsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<MeetFilter>;
}>;

export type MeetsQuery = MeetsQuery_Query;

export type DeleteMortgageRequestMutation_Mutation = {
  deleteMortgageRequest: boolean;
};

export type DeleteMortgageRequestMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteMortgageRequestMutation =
  DeleteMortgageRequestMutation_Mutation;

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_agent_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_mortgageBroker_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_property_Property =
  { id: string; title?: string | null };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_banks_Bank = {
  id: string;
  title?: string | null;
};

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_contact_Contact =
  {
    id: string;
    name?: string | null;
    surname?: string | null;
    patronymic?: string | null;
  };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_contracts_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_deal_Deal = {
  id: string;
  internalNumber?: number | null;
};

export type MortgageRequestQuery_mortgageRequest_MortgageRequest_documents_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestQuery_mortgageRequest_MortgageRequest = {
  id: string;
  internalNumber?: number | null;
  status?: MortgageRequestStatusEnum | null;
  percentage?: number | null;
  period?: number | null;
  responseDate?: any | null;
  sendDate?: any | null;
  amount?: number | null;
  firstDeposit?: number | null;
  validTillDate?: any | null;
  comment?: string | null;
  createdAt: any;
  updatedAt: any;
  agent?: MortgageRequestQuery_mortgageRequest_MortgageRequest_agent_Employee | null;
  mortgageBroker?: MortgageRequestQuery_mortgageRequest_MortgageRequest_mortgageBroker_Employee | null;
  property?: MortgageRequestQuery_mortgageRequest_MortgageRequest_property_Property | null;
  banks?: Array<MortgageRequestQuery_mortgageRequest_MortgageRequest_banks_Bank> | null;
  contact?: MortgageRequestQuery_mortgageRequest_MortgageRequest_contact_Contact | null;
  contracts?: Array<MortgageRequestQuery_mortgageRequest_MortgageRequest_contracts_Document> | null;
  deal?: MortgageRequestQuery_mortgageRequest_MortgageRequest_deal_Deal | null;
  documents?: Array<MortgageRequestQuery_mortgageRequest_MortgageRequest_documents_Document> | null;
};

export type MortgageRequestQuery_Query = {
  mortgageRequest: MortgageRequestQuery_mortgageRequest_MortgageRequest;
};

export type MortgageRequestQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type MortgageRequestQuery = MortgageRequestQuery_Query;

export type SaveMortgageRequestMutation_Mutation = {
  saveMortgageRequest: boolean;
};

export type SaveMortgageRequestMutationVariables = Exact<{
  input: MortgageRequestInput;
}>;

export type SaveMortgageRequestMutation = SaveMortgageRequestMutation_Mutation;

export type BulkDeleteMortgageRequestsMutation_Mutation = {
  bulkDeleteMortgageRequests: boolean;
};

export type BulkDeleteMortgageRequestsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteMortgageRequestsMutation =
  BulkDeleteMortgageRequestsMutation_Mutation;

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_agent_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_mortgageBroker_Employee =
  { id: string; name: string; surname: string; patronymic?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_property_Property =
  { id: string; title?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_banks_Bank =
  { id: string; title?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_contact_Contact =
  {
    id: string;
    name?: string | null;
    surname?: string | null;
    patronymic?: string | null;
    phone?: string | null;
  };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_contracts_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_deal_Deal =
  { id: string; internalNumber?: number | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_documents_Document =
  { id: string; url: string; title?: string | null };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest =
  {
    id: string;
    internalNumber?: number | null;
    status?: MortgageRequestStatusEnum | null;
    percentage?: number | null;
    period?: number | null;
    responseDate?: any | null;
    sendDate?: any | null;
    amount?: number | null;
    firstDeposit?: number | null;
    validTillDate?: any | null;
    comment?: string | null;
    createdAt: any;
    updatedAt: any;
    agent?: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_agent_Employee | null;
    mortgageBroker?: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_mortgageBroker_Employee | null;
    property?: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_property_Property | null;
    banks?: Array<MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_banks_Bank> | null;
    contact?: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_contact_Contact | null;
    contracts?: Array<MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_contracts_Document> | null;
    deal?: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_deal_Deal | null;
    documents?: Array<MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest_documents_Document> | null;
  };

export type MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection = {
  totalCount: number;
  nodes: Array<MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection_nodes_MortgageRequest>;
};

export type MortgageRequestsQuery_Query = {
  mortgageRequests: MortgageRequestsQuery_mortgageRequests_MortgageRequestConnection;
};

export type MortgageRequestsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<MortgageRequestFilter>;
}>;

export type MortgageRequestsQuery = MortgageRequestsQuery_Query;

export type DeletePageMutation_Mutation = { deletePage: boolean };

export type DeletePageMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeletePageMutation = DeletePageMutation_Mutation;

export type PageQuery_page_Page_contentBlocks_ContentBlock = {
  type: ContentBlockType;
  data: any;
  isVisible: boolean;
};

export type PageQuery_page_Page = {
  id: string;
  url: string;
  title: string;
  description: string;
  status: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
  contentBlocks: Array<PageQuery_page_Page_contentBlocks_ContentBlock>;
};

export type PageQuery_Query = { page: PageQuery_page_Page };

export type PageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type PageQuery = PageQuery_Query;

export type SavePageMutation_Mutation = { savePage: boolean };

export type SavePageMutationVariables = Exact<{
  input: PageInput;
}>;

export type SavePageMutation = SavePageMutation_Mutation;

export type PagesQuery_pages_PageConnection_nodes_Page_contentBlocks_ContentBlock =
  { type: ContentBlockType; data: any; isVisible: boolean };

export type PagesQuery_pages_PageConnection_nodes_Page = {
  id: string;
  url: string;
  title: string;
  description: string;
  status: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
  contentBlocks: Array<PagesQuery_pages_PageConnection_nodes_Page_contentBlocks_ContentBlock>;
};

export type PagesQuery_pages_PageConnection = {
  totalCount: number;
  nodes: Array<PagesQuery_pages_PageConnection_nodes_Page>;
};

export type PagesQuery_Query = { pages: PagesQuery_pages_PageConnection };

export type PagesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type PagesQuery = PagesQuery_Query;

export type DeleteReviewMutation_Mutation = { deleteReview: boolean };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteReviewMutation = DeleteReviewMutation_Mutation;

export type ReviewQuery_review_Review_employee_Employee = {
  id: string;
  name: string;
  surname: string;
};

export type ReviewQuery_review_Review = {
  id: string;
  text: string;
  authorName: string;
  authorPhone: string;
  status: ReviewStatusEnum;
  createdAt: any;
  updatedAt: any;
  employee?: ReviewQuery_review_Review_employee_Employee | null;
};

export type ReviewQuery_Query = { review: ReviewQuery_review_Review };

export type ReviewQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ReviewQuery = ReviewQuery_Query;

export type SaveReviewMutation_Mutation = { saveReview: boolean };

export type SaveReviewMutationVariables = Exact<{
  input: ReviewInput;
}>;

export type SaveReviewMutation = SaveReviewMutation_Mutation;

export type BulkApproveReviewsMutation_Mutation = {
  bulkApproveReviews: boolean;
};

export type BulkApproveReviewsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkApproveReviewsMutation = BulkApproveReviewsMutation_Mutation;

export type BulkDeclineReviewsMutation_Mutation = {
  bulkDeclineReviews: boolean;
};

export type BulkDeclineReviewsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeclineReviewsMutation = BulkDeclineReviewsMutation_Mutation;

export type BulkDeleteReviewsMutation_Mutation = { bulkDeleteReviews: boolean };

export type BulkDeleteReviewsMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteReviewsMutation = BulkDeleteReviewsMutation_Mutation;

export type ReviewsQuery_reviews_ReviewConnection_nodes_Review_employee_Employee =
  { id: string; name: string; surname: string };

export type ReviewsQuery_reviews_ReviewConnection_nodes_Review = {
  id: string;
  text: string;
  authorName: string;
  authorPhone: string;
  status: ReviewStatusEnum;
  createdAt: any;
  updatedAt: any;
  employee?: ReviewsQuery_reviews_ReviewConnection_nodes_Review_employee_Employee | null;
};

export type ReviewsQuery_reviews_ReviewConnection = {
  totalCount: number;
  nodes: Array<ReviewsQuery_reviews_ReviewConnection_nodes_Review>;
};

export type ReviewsQuery_Query = {
  reviews: ReviewsQuery_reviews_ReviewConnection;
};

export type ReviewsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
  filter?: InputMaybe<ReviewsFilterInput>;
}>;

export type ReviewsQuery = ReviewsQuery_Query;

export type StoriesQuery_stories_StoryConnection_nodes_Story_contentBlocks_ContentBlock =
  { type: ContentBlockType; data: any; isVisible: boolean };

export type StoriesQuery_stories_StoryConnection_nodes_Story_cover_Image = {
  id: string;
  url: string;
};

export type StoriesQuery_stories_StoryConnection_nodes_Story = {
  id: string;
  category: StoryCategoryEnum;
  title: string;
  teaser?: string | null;
  createdAt: any;
  updatedAt: any;
  contentBlocks: Array<StoriesQuery_stories_StoryConnection_nodes_Story_contentBlocks_ContentBlock>;
  cover?: StoriesQuery_stories_StoryConnection_nodes_Story_cover_Image | null;
};

export type StoriesQuery_stories_StoryConnection = {
  totalCount: number;
  nodes: Array<StoriesQuery_stories_StoryConnection_nodes_Story>;
};

export type StoriesQuery_Query = {
  stories: StoriesQuery_stories_StoryConnection;
};

export type StoriesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type StoriesQuery = StoriesQuery_Query;

export type DeleteStoryMutation_Mutation = { deleteStory: boolean };

export type DeleteStoryMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteStoryMutation = DeleteStoryMutation_Mutation;

export type SaveStoryMutation_Mutation = { saveStory: boolean };

export type SaveStoryMutationVariables = Exact<{
  input: StoryInput;
}>;

export type SaveStoryMutation = SaveStoryMutation_Mutation;

export type StoryQuery_story_Story_contentBlocks_ContentBlock = {
  type: ContentBlockType;
  data: any;
  isVisible: boolean;
};

export type StoryQuery_story_Story_cover_Image = { id: string; url: string };

export type StoryQuery_story_Story = {
  id: string;
  category: StoryCategoryEnum;
  title: string;
  teaser?: string | null;
  createdAt: any;
  updatedAt: any;
  contentBlocks: Array<StoryQuery_story_Story_contentBlocks_ContentBlock>;
  cover?: StoryQuery_story_Story_cover_Image | null;
};

export type StoryQuery_Query = { story: StoryQuery_story_Story };

export type StoryQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type StoryQuery = StoryQuery_Query;

export type DeleteTaskMutation_Mutation = { deleteTask: boolean };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteTaskMutation = DeleteTaskMutation_Mutation;

export type SaveTaskMutation_Mutation = { saveTask: boolean };

export type SaveTaskMutationVariables = Exact<{
  input: TaskInput;
}>;

export type SaveTaskMutation = SaveTaskMutation_Mutation;

export type TaskQuery_task_Task_assignee_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type TaskQuery_task_Task_lead_Lead = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type TaskQuery_task_Task_property_Property = {
  id: string;
  title?: string | null;
};

export type TaskQuery_task_Task_reporter_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type TaskQuery_task_Task_contact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type TaskQuery_task_Task_deal_Deal = {
  id: string;
  internalNumber?: number | null;
};

export type TaskQuery_task_Task = {
  id: string;
  internalNumber?: number | null;
  isCompleted?: boolean | null;
  isDeleted?: boolean | null;
  isHot?: boolean | null;
  startDate?: any | null;
  tag?: string | null;
  title?: string | null;
  updatedAt: any;
  contactPhone?: string | null;
  createdAt: any;
  details?: string | null;
  durationDays?: number | null;
  durationHours?: number | null;
  endDate?: any | null;
  assignee?: TaskQuery_task_Task_assignee_Employee | null;
  lead?: TaskQuery_task_Task_lead_Lead | null;
  property?: TaskQuery_task_Task_property_Property | null;
  reporter?: TaskQuery_task_Task_reporter_Employee | null;
  contact?: TaskQuery_task_Task_contact_Contact | null;
  deal?: TaskQuery_task_Task_deal_Deal | null;
};

export type TaskQuery_Query = { task: TaskQuery_task_Task };

export type TaskQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type TaskQuery = TaskQuery_Query;

export type BulkDeleteTasksMutation_Mutation = { bulkDeleteTasks: boolean };

export type BulkDeleteTasksMutationVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type BulkDeleteTasksMutation = BulkDeleteTasksMutation_Mutation;

export type TasksQuery_tasks_TaskConnection_nodes_Task_assignee_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task_lead_Lead = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task_property_Property = {
  id: string;
  title?: string | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task_reporter_Employee = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task_contact_Contact = {
  id: string;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task_deal_Deal = {
  id: string;
  internalNumber?: number | null;
};

export type TasksQuery_tasks_TaskConnection_nodes_Task = {
  id: string;
  internalNumber?: number | null;
  isCompleted?: boolean | null;
  isDeleted?: boolean | null;
  isHot?: boolean | null;
  startDate?: any | null;
  tag?: string | null;
  title?: string | null;
  updatedAt: any;
  contactPhone?: string | null;
  createdAt: any;
  details?: string | null;
  durationDays?: number | null;
  durationHours?: number | null;
  endDate?: any | null;
  assignee?: TasksQuery_tasks_TaskConnection_nodes_Task_assignee_Employee | null;
  lead?: TasksQuery_tasks_TaskConnection_nodes_Task_lead_Lead | null;
  property?: TasksQuery_tasks_TaskConnection_nodes_Task_property_Property | null;
  reporter?: TasksQuery_tasks_TaskConnection_nodes_Task_reporter_Employee | null;
  contact?: TasksQuery_tasks_TaskConnection_nodes_Task_contact_Contact | null;
  deal?: TasksQuery_tasks_TaskConnection_nodes_Task_deal_Deal | null;
};

export type TasksQuery_tasks_TaskConnection = {
  totalCount: number;
  nodes: Array<TasksQuery_tasks_TaskConnection_nodes_Task>;
};

export type TasksQuery_Query = { tasks: TasksQuery_tasks_TaskConnection };

export type TasksQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Sort>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<TaskFilter>;
}>;

export type TasksQuery = TasksQuery_Query;

export type DeleteVacancyMutation_Mutation = { deleteVacancy: boolean };

export type DeleteVacancyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteVacancyMutation = DeleteVacancyMutation_Mutation;

export type VacanciesQuery_vacancies_VacancyConnection_nodes_Vacancy = {
  id: string;
  title: string;
  description: string;
  experience?: string | null;
  salary?: string | null;
  schedule: VacancyScheduleEnum;
  publicationStatus: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
};

export type VacanciesQuery_vacancies_VacancyConnection = {
  totalCount: number;
  nodes: Array<VacanciesQuery_vacancies_VacancyConnection_nodes_Vacancy>;
};

export type VacanciesQuery_Query = {
  vacancies: VacanciesQuery_vacancies_VacancyConnection;
};

export type VacanciesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Sort>;
}>;

export type VacanciesQuery = VacanciesQuery_Query;

export type SaveVacancyMutation_Mutation = { saveVacancy: boolean };

export type SaveVacancyMutationVariables = Exact<{
  input: VacancyInput;
}>;

export type SaveVacancyMutation = SaveVacancyMutation_Mutation;

export type VacancyQuery_vacancy_Vacancy = {
  id: string;
  title: string;
  description: string;
  experience?: string | null;
  salary?: string | null;
  schedule: VacancyScheduleEnum;
  publicationStatus: PublicationStatusEnum;
  createdAt: any;
  updatedAt: any;
};

export type VacancyQuery_Query = { vacancy: VacancyQuery_vacancy_Vacancy };

export type VacancyQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type VacancyQuery = VacancyQuery_Query;

export const ComplexPageDocument = gql`
  query complexPage($id: ID!) {
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
      publicationStatus
      internalInfo
      isDeleted
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useComplexPageQuery__
 *
 * To run a query within a Vue component, call `useComplexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useComplexPageQuery(
  variables:
    | ComplexPageQueryVariables
    | VueCompositionApi.Ref<ComplexPageQueryVariables>
    | ReactiveFunction<ComplexPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexPageQuery,
        ComplexPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexPageQuery,
          ComplexPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexPageQuery,
          ComplexPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ComplexPageQuery,
    ComplexPageQueryVariables
  >(ComplexPageDocument, variables, options);
}
export function useComplexPageLazyQuery(
  variables?:
    | ComplexPageQueryVariables
    | VueCompositionApi.Ref<ComplexPageQueryVariables>
    | ReactiveFunction<ComplexPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexPageQuery,
        ComplexPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexPageQuery,
          ComplexPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexPageQuery,
          ComplexPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ComplexPageQuery,
    ComplexPageQueryVariables
  >(ComplexPageDocument, variables, options);
}
export type ComplexPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ComplexPageQuery,
    ComplexPageQueryVariables
  >;
export const ComplexHousePageDocument = gql`
  query complexHousePage($id: ID!) {
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
      publicationStatus
      internalInfo
      isDeleted
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useComplexHousePageQuery__
 *
 * To run a query within a Vue component, call `useComplexHousePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplexHousePageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useComplexHousePageQuery({
 *   id: // value for 'id'
 * });
 */
export function useComplexHousePageQuery(
  variables:
    | ComplexHousePageQueryVariables
    | VueCompositionApi.Ref<ComplexHousePageQueryVariables>
    | ReactiveFunction<ComplexHousePageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHousePageQuery,
        ComplexHousePageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHousePageQuery,
          ComplexHousePageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHousePageQuery,
          ComplexHousePageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ComplexHousePageQuery,
    ComplexHousePageQueryVariables
  >(ComplexHousePageDocument, variables, options);
}
export function useComplexHousePageLazyQuery(
  variables?:
    | ComplexHousePageQueryVariables
    | VueCompositionApi.Ref<ComplexHousePageQueryVariables>
    | ReactiveFunction<ComplexHousePageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ComplexHousePageQuery,
        ComplexHousePageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ComplexHousePageQuery,
          ComplexHousePageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ComplexHousePageQuery,
          ComplexHousePageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ComplexHousePageQuery,
    ComplexHousePageQueryVariables
  >(ComplexHousePageDocument, variables, options);
}
export type ComplexHousePageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ComplexHousePageQuery,
    ComplexHousePageQueryVariables
  >;
export const ContactPageDocument = gql`
  query contactPage($id: ID!) {
    contact(id: $id) {
      id
      name
      surname
      patronymic
      phone
      note
      email
      company
      passportIssueDate
      passportNumber
      passportIssuedBy
      passportIssuerCode
      additionalPhones
      internalNumber
      birthday
      source
      type
      address
      agents {
        id
        name
        surname
        patronymic
      }
      documents {
        id
        url
        title
      }
      contracts {
        id
        url
        title
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useContactPageQuery__
 *
 * To run a query within a Vue component, call `useContactPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useContactPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useContactPageQuery(
  variables:
    | ContactPageQueryVariables
    | VueCompositionApi.Ref<ContactPageQueryVariables>
    | ReactiveFunction<ContactPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ContactPageQuery,
        ContactPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ContactPageQuery,
          ContactPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ContactPageQuery,
          ContactPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ContactPageQuery,
    ContactPageQueryVariables
  >(ContactPageDocument, variables, options);
}
export function useContactPageLazyQuery(
  variables?:
    | ContactPageQueryVariables
    | VueCompositionApi.Ref<ContactPageQueryVariables>
    | ReactiveFunction<ContactPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ContactPageQuery,
        ContactPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ContactPageQuery,
          ContactPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ContactPageQuery,
          ContactPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ContactPageQuery,
    ContactPageQueryVariables
  >(ContactPageDocument, variables, options);
}
export type ContactPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ContactPageQuery,
    ContactPageQueryVariables
  >;
export const DashboardDocument = gql`
  query dashboard {
    employees {
      totalCount
    }
    roles {
      totalCount
    }
    properties {
      totalCount
    }
    complexes {
      totalCount
    }
    villages {
      totalCount
    }
    developers {
      totalCount
    }
  }
`;

/**
 * __useDashboardQuery__
 *
 * To run a query within a Vue component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDashboardQuery();
 */
export function useDashboardQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        DashboardQuery,
        DashboardQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DashboardQuery,
          DashboardQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DashboardQuery,
          DashboardQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<DashboardQuery, DashboardQueryVariables>(
    DashboardDocument,
    {},
    options,
  );
}
export function useDashboardLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        DashboardQuery,
        DashboardQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DashboardQuery,
          DashboardQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DashboardQuery,
          DashboardQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    DashboardQuery,
    DashboardQueryVariables
  >(DashboardDocument, {}, options);
}
export type DashboardQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DashboardQuery, DashboardQueryVariables>;
export const ChangeLeadStatusDocument = gql`
  mutation ChangeLeadStatus($id: ID!, $status: LeadStatusEnum!) {
    changeLeadStatus(id: $id, status: $status)
  }
`;

/**
 * __useChangeLeadStatusMutation__
 *
 * To run a mutation, you first call `useChangeLeadStatusMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangeLeadStatusMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangeLeadStatusMutation({
 *   variables: {
 *     id: // value for 'id'
 *     status: // value for 'status'
 *   },
 * });
 */
export function useChangeLeadStatusMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ChangeLeadStatusMutation,
        ChangeLeadStatusMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ChangeLeadStatusMutation,
          ChangeLeadStatusMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ChangeLeadStatusMutation,
    ChangeLeadStatusMutationVariables
  >(ChangeLeadStatusDocument, options);
}
export type ChangeLeadStatusMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    ChangeLeadStatusMutation,
    ChangeLeadStatusMutationVariables
  >;
export const LeadPageDocument = gql`
  query leadPage($id: ID!) {
    lead(id: $id) {
      id
      name
      surname
      patronymic
      phone
      email
      company
      additionalPhones
      internalNumber
      birthday
      source
      request
      status
      type
      address
      agents {
        id
        name
        surname
        patronymic
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useLeadPageQuery__
 *
 * To run a query within a Vue component, call `useLeadPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeadPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLeadPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useLeadPageQuery(
  variables:
    | LeadPageQueryVariables
    | VueCompositionApi.Ref<LeadPageQueryVariables>
    | ReactiveFunction<LeadPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<LeadPageQuery, LeadPageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          LeadPageQuery,
          LeadPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          LeadPageQuery,
          LeadPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<LeadPageQuery, LeadPageQueryVariables>(
    LeadPageDocument,
    variables,
    options,
  );
}
export function useLeadPageLazyQuery(
  variables?:
    | LeadPageQueryVariables
    | VueCompositionApi.Ref<LeadPageQueryVariables>
    | ReactiveFunction<LeadPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<LeadPageQuery, LeadPageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          LeadPageQuery,
          LeadPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          LeadPageQuery,
          LeadPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    LeadPageQuery,
    LeadPageQueryVariables
  >(LeadPageDocument, variables, options);
}
export type LeadPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<LeadPageQuery, LeadPageQueryVariables>;
export const MortgageRequestPageDocument = gql`
  query mortgageRequestPage($id: ID!) {
    mortgageRequest(id: $id) {
      id
      internalNumber
      status
      agent {
        id
        name
        surname
        patronymic
      }
      mortgageBroker {
        id
        name
        surname
        patronymic
      }
      percentage
      period
      property {
        id
        title
      }
      responseDate
      sendDate
      amount
      firstDeposit
      banks {
        id
        title
      }
      validTillDate
      comment
      contact {
        id
        name
        surname
        patronymic
      }
      contracts {
        id
        url
        title
      }
      deal {
        id
        internalNumber
      }
      documents {
        id
        url
        title
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMortgageRequestPageQuery__
 *
 * To run a query within a Vue component, call `useMortgageRequestPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMortgageRequestPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMortgageRequestPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useMortgageRequestPageQuery(
  variables:
    | MortgageRequestPageQueryVariables
    | VueCompositionApi.Ref<MortgageRequestPageQueryVariables>
    | ReactiveFunction<MortgageRequestPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestPageQuery,
        MortgageRequestPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestPageQuery,
          MortgageRequestPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestPageQuery,
          MortgageRequestPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    MortgageRequestPageQuery,
    MortgageRequestPageQueryVariables
  >(MortgageRequestPageDocument, variables, options);
}
export function useMortgageRequestPageLazyQuery(
  variables?:
    | MortgageRequestPageQueryVariables
    | VueCompositionApi.Ref<MortgageRequestPageQueryVariables>
    | ReactiveFunction<MortgageRequestPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestPageQuery,
        MortgageRequestPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestPageQuery,
          MortgageRequestPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestPageQuery,
          MortgageRequestPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    MortgageRequestPageQuery,
    MortgageRequestPageQueryVariables
  >(MortgageRequestPageDocument, variables, options);
}
export type MortgageRequestPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    MortgageRequestPageQuery,
    MortgageRequestPageQueryVariables
  >;
export const PropertyPageDocument = gql`
  query propertyPage($id: ID!) {
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
      isDeleted
      refreshDate
      status
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
      source
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
      internalInfo
      comissionPercent
      comissionAmount
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePropertyPageQuery__
 *
 * To run a query within a Vue component, call `usePropertyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePropertyPageQuery({
 *   id: // value for 'id'
 * });
 */
export function usePropertyPageQuery(
  variables:
    | PropertyPageQueryVariables
    | VueCompositionApi.Ref<PropertyPageQueryVariables>
    | ReactiveFunction<PropertyPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        PropertyPageQuery,
        PropertyPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertyPageQuery,
          PropertyPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertyPageQuery,
          PropertyPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    PropertyPageQuery,
    PropertyPageQueryVariables
  >(PropertyPageDocument, variables, options);
}
export function usePropertyPageLazyQuery(
  variables?:
    | PropertyPageQueryVariables
    | VueCompositionApi.Ref<PropertyPageQueryVariables>
    | ReactiveFunction<PropertyPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        PropertyPageQuery,
        PropertyPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PropertyPageQuery,
          PropertyPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PropertyPageQuery,
          PropertyPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    PropertyPageQuery,
    PropertyPageQueryVariables
  >(PropertyPageDocument, variables, options);
}
export type PropertyPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    PropertyPageQuery,
    PropertyPageQueryVariables
  >;
export const StoryPageDocument = gql`
  query storyPage($id: ID!) {
    story(id: $id) {
      id
      category
      title
      teaser
      contentBlocks {
        type
        data
        isVisible
      }
      cover {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useStoryPageQuery__
 *
 * To run a query within a Vue component, call `useStoryPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useStoryPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useStoryPageQuery(
  variables:
    | StoryPageQueryVariables
    | VueCompositionApi.Ref<StoryPageQueryVariables>
    | ReactiveFunction<StoryPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        StoryPageQuery,
        StoryPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          StoryPageQuery,
          StoryPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          StoryPageQuery,
          StoryPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<StoryPageQuery, StoryPageQueryVariables>(
    StoryPageDocument,
    variables,
    options,
  );
}
export function useStoryPageLazyQuery(
  variables?:
    | StoryPageQueryVariables
    | VueCompositionApi.Ref<StoryPageQueryVariables>
    | ReactiveFunction<StoryPageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        StoryPageQuery,
        StoryPageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          StoryPageQuery,
          StoryPageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          StoryPageQuery,
          StoryPageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    StoryPageQuery,
    StoryPageQueryVariables
  >(StoryPageDocument, variables, options);
}
export type StoryPageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<StoryPageQuery, StoryPageQueryVariables>;
export const VillagePageDocument = gql`
  query villagePage($id: ID!) {
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
      publicationStatus
      internalInfo
      isDeleted
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useVillagePageQuery__
 *
 * To run a query within a Vue component, call `useVillagePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillagePageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVillagePageQuery({
 *   id: // value for 'id'
 * });
 */
export function useVillagePageQuery(
  variables:
    | VillagePageQueryVariables
    | VueCompositionApi.Ref<VillagePageQueryVariables>
    | ReactiveFunction<VillagePageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        VillagePageQuery,
        VillagePageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VillagePageQuery,
          VillagePageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VillagePageQuery,
          VillagePageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    VillagePageQuery,
    VillagePageQueryVariables
  >(VillagePageDocument, variables, options);
}
export function useVillagePageLazyQuery(
  variables?:
    | VillagePageQueryVariables
    | VueCompositionApi.Ref<VillagePageQueryVariables>
    | ReactiveFunction<VillagePageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        VillagePageQuery,
        VillagePageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          VillagePageQuery,
          VillagePageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          VillagePageQuery,
          VillagePageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    VillagePageQuery,
    VillagePageQueryVariables
  >(VillagePageDocument, variables, options);
}
export type VillagePageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    VillagePageQuery,
    VillagePageQueryVariables
  >;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      me {
        id
        name
        surname
        avatar {
          url
        }
      }
    }
  }
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LoginMutation,
        LoginMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LoginMutation,
          LoginMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LogoutMutation,
        LogoutMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LogoutMutation,
          LogoutMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    LogoutMutation,
    LogoutMutationVariables
  >;
export const DeleteArticleDocument = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteArticleMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteArticleMutation,
        DeleteArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteArticleMutation,
          DeleteArticleMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(DeleteArticleDocument, options);
}
export type DeleteArticleMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >;
export const DeleteArticleGroupDocument = gql`
  mutation deleteArticleGroup($id: ID!) {
    deleteArticleGroup(id: $id)
  }
`;

/**
 * __useDeleteArticleGroupMutation__
 *
 * To run a mutation, you first call `useDeleteArticleGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteArticleGroupMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleGroupMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteArticleGroupMutation,
        DeleteArticleGroupMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteArticleGroupMutation,
          DeleteArticleGroupMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteArticleGroupMutation,
    DeleteArticleGroupMutationVariables
  >(DeleteArticleGroupDocument, options);
}
export type DeleteArticleGroupMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteArticleGroupMutation,
    DeleteArticleGroupMutationVariables
  >;
export const SaveArticleDocument = gql`
  mutation saveArticle($input: ArticleInput!) {
    saveArticle(input: $input)
  }
`;

/**
 * __useSaveArticleMutation__
 *
 * To run a mutation, you first call `useSaveArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveArticleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveArticleMutation,
        SaveArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveArticleMutation,
          SaveArticleMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveArticleMutation,
    SaveArticleMutationVariables
  >(SaveArticleDocument, options);
}
export type SaveArticleMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveArticleMutation,
    SaveArticleMutationVariables
  >;
export const SaveArticleGroupDocument = gql`
  mutation saveArticleGroup($input: ArticleGroupInput!) {
    saveArticleGroup(input: $input)
  }
`;

/**
 * __useSaveArticleGroupMutation__
 *
 * To run a mutation, you first call `useSaveArticleGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveArticleGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveArticleGroupMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveArticleGroupMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveArticleGroupMutation,
        SaveArticleGroupMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveArticleGroupMutation,
          SaveArticleGroupMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveArticleGroupMutation,
    SaveArticleGroupMutationVariables
  >(SaveArticleGroupDocument, options);
}
export type SaveArticleGroupMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveArticleGroupMutation,
    SaveArticleGroupMutationVariables
  >;
export const ApprovePropertyDocument = gql`
  mutation approveProperty($id: ID!) {
    approveProperty(id: $id)
  }
`;

/**
 * __useApprovePropertyMutation__
 *
 * To run a mutation, you first call `useApprovePropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useApprovePropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useApprovePropertyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useApprovePropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ApprovePropertyMutation,
        ApprovePropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ApprovePropertyMutation,
          ApprovePropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ApprovePropertyMutation,
    ApprovePropertyMutationVariables
  >(ApprovePropertyDocument, options);
}
export type ApprovePropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    ApprovePropertyMutation,
    ApprovePropertyMutationVariables
  >;
export const ArchivePropertyDocument = gql`
  mutation archiveProperty($id: ID!) {
    archiveProperty(id: $id)
  }
`;

/**
 * __useArchivePropertyMutation__
 *
 * To run a mutation, you first call `useArchivePropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useArchivePropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useArchivePropertyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useArchivePropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ArchivePropertyMutation,
        ArchivePropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ArchivePropertyMutation,
          ArchivePropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ArchivePropertyMutation,
    ArchivePropertyMutationVariables
  >(ArchivePropertyDocument, options);
}
export type ArchivePropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    ArchivePropertyMutation,
    ArchivePropertyMutationVariables
  >;
export const BulkApprovePropertiesDocument = gql`
  mutation bulkApproveProperties($ids: [ID!]!) {
    bulkApproveProperties(ids: $ids)
  }
`;

/**
 * __useBulkApprovePropertiesMutation__
 *
 * To run a mutation, you first call `useBulkApprovePropertiesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkApprovePropertiesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkApprovePropertiesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkApprovePropertiesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkApprovePropertiesMutation,
        BulkApprovePropertiesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkApprovePropertiesMutation,
          BulkApprovePropertiesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkApprovePropertiesMutation,
    BulkApprovePropertiesMutationVariables
  >(BulkApprovePropertiesDocument, options);
}
export type BulkApprovePropertiesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkApprovePropertiesMutation,
    BulkApprovePropertiesMutationVariables
  >;
export const BulkArchivePropertiesDocument = gql`
  mutation bulkArchiveProperties($ids: [ID!]!) {
    bulkArchiveProperties(ids: $ids)
  }
`;

/**
 * __useBulkArchivePropertiesMutation__
 *
 * To run a mutation, you first call `useBulkArchivePropertiesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkArchivePropertiesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkArchivePropertiesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkArchivePropertiesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkArchivePropertiesMutation,
        BulkArchivePropertiesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkArchivePropertiesMutation,
          BulkArchivePropertiesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkArchivePropertiesMutation,
    BulkArchivePropertiesMutationVariables
  >(BulkArchivePropertiesDocument, options);
}
export type BulkArchivePropertiesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkArchivePropertiesMutation,
    BulkArchivePropertiesMutationVariables
  >;
export const BulkDeclinePropertiesDocument = gql`
  mutation bulkDeclineProperties($ids: [ID!]!) {
    bulkDeclineProperties(ids: $ids)
  }
`;

/**
 * __useBulkDeclinePropertiesMutation__
 *
 * To run a mutation, you first call `useBulkDeclinePropertiesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeclinePropertiesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeclinePropertiesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeclinePropertiesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeclinePropertiesMutation,
        BulkDeclinePropertiesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeclinePropertiesMutation,
          BulkDeclinePropertiesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeclinePropertiesMutation,
    BulkDeclinePropertiesMutationVariables
  >(BulkDeclinePropertiesDocument, options);
}
export type BulkDeclinePropertiesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeclinePropertiesMutation,
    BulkDeclinePropertiesMutationVariables
  >;
export const BulkDeleteComplexHousesDocument = gql`
  mutation bulkDeleteComplexHouses($ids: [ID!]!) {
    bulkDeleteComplexHouses(ids: $ids)
  }
`;

/**
 * __useBulkDeleteComplexHousesMutation__
 *
 * To run a mutation, you first call `useBulkDeleteComplexHousesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteComplexHousesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteComplexHousesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteComplexHousesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteComplexHousesMutation,
        BulkDeleteComplexHousesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteComplexHousesMutation,
          BulkDeleteComplexHousesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteComplexHousesMutation,
    BulkDeleteComplexHousesMutationVariables
  >(BulkDeleteComplexHousesDocument, options);
}
export type BulkDeleteComplexHousesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteComplexHousesMutation,
    BulkDeleteComplexHousesMutationVariables
  >;
export const BulkDeleteComplexesDocument = gql`
  mutation bulkDeleteComplexes($ids: [ID!]!) {
    bulkDeleteComplexes(ids: $ids)
  }
`;

/**
 * __useBulkDeleteComplexesMutation__
 *
 * To run a mutation, you first call `useBulkDeleteComplexesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteComplexesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteComplexesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteComplexesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteComplexesMutation,
        BulkDeleteComplexesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteComplexesMutation,
          BulkDeleteComplexesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteComplexesMutation,
    BulkDeleteComplexesMutationVariables
  >(BulkDeleteComplexesDocument, options);
}
export type BulkDeleteComplexesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteComplexesMutation,
    BulkDeleteComplexesMutationVariables
  >;
export const BulkDeleteDevelopersDocument = gql`
  mutation bulkDeleteDevelopers($ids: [ID!]!) {
    bulkDeleteDevelopers(ids: $ids)
  }
`;

/**
 * __useBulkDeleteDevelopersMutation__
 *
 * To run a mutation, you first call `useBulkDeleteDevelopersMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteDevelopersMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteDevelopersMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteDevelopersMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteDevelopersMutation,
        BulkDeleteDevelopersMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteDevelopersMutation,
          BulkDeleteDevelopersMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteDevelopersMutation,
    BulkDeleteDevelopersMutationVariables
  >(BulkDeleteDevelopersDocument, options);
}
export type BulkDeleteDevelopersMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteDevelopersMutation,
    BulkDeleteDevelopersMutationVariables
  >;
export const BulkDeletePropertiesDocument = gql`
  mutation bulkDeleteProperties($ids: [ID!]!) {
    bulkDeleteProperties(ids: $ids)
  }
`;

/**
 * __useBulkDeletePropertiesMutation__
 *
 * To run a mutation, you first call `useBulkDeletePropertiesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeletePropertiesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeletePropertiesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeletePropertiesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeletePropertiesMutation,
        BulkDeletePropertiesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeletePropertiesMutation,
          BulkDeletePropertiesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeletePropertiesMutation,
    BulkDeletePropertiesMutationVariables
  >(BulkDeletePropertiesDocument, options);
}
export type BulkDeletePropertiesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeletePropertiesMutation,
    BulkDeletePropertiesMutationVariables
  >;
export const BulkDeleteVillagesDocument = gql`
  mutation bulkDeleteVillages($ids: [ID!]!) {
    bulkDeleteVillages(ids: $ids)
  }
`;

/**
 * __useBulkDeleteVillagesMutation__
 *
 * To run a mutation, you first call `useBulkDeleteVillagesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteVillagesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteVillagesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteVillagesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteVillagesMutation,
        BulkDeleteVillagesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteVillagesMutation,
          BulkDeleteVillagesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteVillagesMutation,
    BulkDeleteVillagesMutationVariables
  >(BulkDeleteVillagesDocument, options);
}
export type BulkDeleteVillagesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteVillagesMutation,
    BulkDeleteVillagesMutationVariables
  >;
export const BulkRefreshPropertiesDocument = gql`
  mutation bulkRefreshProperties($ids: [ID!]!) {
    bulkRefreshProperties(ids: $ids)
  }
`;

/**
 * __useBulkRefreshPropertiesMutation__
 *
 * To run a mutation, you first call `useBulkRefreshPropertiesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkRefreshPropertiesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkRefreshPropertiesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkRefreshPropertiesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkRefreshPropertiesMutation,
        BulkRefreshPropertiesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkRefreshPropertiesMutation,
          BulkRefreshPropertiesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkRefreshPropertiesMutation,
    BulkRefreshPropertiesMutationVariables
  >(BulkRefreshPropertiesDocument, options);
}
export type BulkRefreshPropertiesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkRefreshPropertiesMutation,
    BulkRefreshPropertiesMutationVariables
  >;
export const DeclinePropertyDocument = gql`
  mutation declineProperty($id: ID!) {
    declineProperty(id: $id)
  }
`;

/**
 * __useDeclinePropertyMutation__
 *
 * To run a mutation, you first call `useDeclinePropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeclinePropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeclinePropertyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeclinePropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeclinePropertyMutation,
        DeclinePropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeclinePropertyMutation,
          DeclinePropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeclinePropertyMutation,
    DeclinePropertyMutationVariables
  >(DeclinePropertyDocument, options);
}
export type DeclinePropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeclinePropertyMutation,
    DeclinePropertyMutationVariables
  >;
export const DeleteComplexDocument = gql`
  mutation deleteComplex($id: ID!) {
    deleteComplex(id: $id)
  }
`;

/**
 * __useDeleteComplexMutation__
 *
 * To run a mutation, you first call `useDeleteComplexMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComplexMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteComplexMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComplexMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteComplexMutation,
        DeleteComplexMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteComplexMutation,
          DeleteComplexMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteComplexMutation,
    DeleteComplexMutationVariables
  >(DeleteComplexDocument, options);
}
export type DeleteComplexMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteComplexMutation,
    DeleteComplexMutationVariables
  >;
export const DeleteComplexHouseDocument = gql`
  mutation deleteComplexHouse($id: ID!) {
    deleteComplexHouse(id: $id)
  }
`;

/**
 * __useDeleteComplexHouseMutation__
 *
 * To run a mutation, you first call `useDeleteComplexHouseMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComplexHouseMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteComplexHouseMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComplexHouseMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteComplexHouseMutation,
        DeleteComplexHouseMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteComplexHouseMutation,
          DeleteComplexHouseMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteComplexHouseMutation,
    DeleteComplexHouseMutationVariables
  >(DeleteComplexHouseDocument, options);
}
export type DeleteComplexHouseMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteComplexHouseMutation,
    DeleteComplexHouseMutationVariables
  >;
export const DeleteDeveloperDocument = gql`
  mutation deleteDeveloper($id: ID!) {
    deleteDeveloper(id: $id)
  }
`;

/**
 * __useDeleteDeveloperMutation__
 *
 * To run a mutation, you first call `useDeleteDeveloperMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeveloperMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteDeveloperMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeveloperMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteDeveloperMutation,
        DeleteDeveloperMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteDeveloperMutation,
          DeleteDeveloperMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteDeveloperMutation,
    DeleteDeveloperMutationVariables
  >(DeleteDeveloperDocument, options);
}
export type DeleteDeveloperMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteDeveloperMutation,
    DeleteDeveloperMutationVariables
  >;
export const DeletePropertyDocument = gql`
  mutation deleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

/**
 * __useDeletePropertyMutation__
 *
 * To run a mutation, you first call `useDeletePropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePropertyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeletePropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeletePropertyMutation,
        DeletePropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeletePropertyMutation,
          DeletePropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeletePropertyMutation,
    DeletePropertyMutationVariables
  >(DeletePropertyDocument, options);
}
export type DeletePropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeletePropertyMutation,
    DeletePropertyMutationVariables
  >;
export const DeleteVillageDocument = gql`
  mutation deleteVillage($id: ID!) {
    deleteVillage(id: $id)
  }
`;

/**
 * __useDeleteVillageMutation__
 *
 * To run a mutation, you first call `useDeleteVillageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVillageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteVillageMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVillageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteVillageMutation,
        DeleteVillageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteVillageMutation,
          DeleteVillageMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteVillageMutation,
    DeleteVillageMutationVariables
  >(DeleteVillageDocument, options);
}
export type DeleteVillageMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteVillageMutation,
    DeleteVillageMutationVariables
  >;
export const RefreshPropertyDocument = gql`
  mutation refreshProperty($id: ID!) {
    refreshProperty(id: $id)
  }
`;

/**
 * __useRefreshPropertyMutation__
 *
 * To run a mutation, you first call `useRefreshPropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshPropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshPropertyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRefreshPropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        RefreshPropertyMutation,
        RefreshPropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          RefreshPropertyMutation,
          RefreshPropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    RefreshPropertyMutation,
    RefreshPropertyMutationVariables
  >(RefreshPropertyDocument, options);
}
export type RefreshPropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    RefreshPropertyMutation,
    RefreshPropertyMutationVariables
  >;
export const SaveComplexDocument = gql`
  mutation saveComplex($input: ComplexInput!) {
    saveComplex(input: $input)
  }
`;

/**
 * __useSaveComplexMutation__
 *
 * To run a mutation, you first call `useSaveComplexMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveComplexMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveComplexMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveComplexMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveComplexMutation,
        SaveComplexMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveComplexMutation,
          SaveComplexMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveComplexMutation,
    SaveComplexMutationVariables
  >(SaveComplexDocument, options);
}
export type SaveComplexMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveComplexMutation,
    SaveComplexMutationVariables
  >;
export const SaveComplexHouseDocument = gql`
  mutation saveComplexHouse($input: ComplexHouseInput!) {
    saveComplexHouse(input: $input)
  }
`;

/**
 * __useSaveComplexHouseMutation__
 *
 * To run a mutation, you first call `useSaveComplexHouseMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveComplexHouseMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveComplexHouseMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveComplexHouseMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveComplexHouseMutation,
        SaveComplexHouseMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveComplexHouseMutation,
          SaveComplexHouseMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveComplexHouseMutation,
    SaveComplexHouseMutationVariables
  >(SaveComplexHouseDocument, options);
}
export type SaveComplexHouseMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveComplexHouseMutation,
    SaveComplexHouseMutationVariables
  >;
export const SaveDeveloperDocument = gql`
  mutation saveDeveloper($input: DeveloperInput!) {
    saveDeveloper(input: $input)
  }
`;

/**
 * __useSaveDeveloperMutation__
 *
 * To run a mutation, you first call `useSaveDeveloperMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveDeveloperMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveDeveloperMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveDeveloperMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveDeveloperMutation,
        SaveDeveloperMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveDeveloperMutation,
          SaveDeveloperMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveDeveloperMutation,
    SaveDeveloperMutationVariables
  >(SaveDeveloperDocument, options);
}
export type SaveDeveloperMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveDeveloperMutation,
    SaveDeveloperMutationVariables
  >;
export const SavePropertyDocument = gql`
  mutation saveProperty($input: PropertyInput!) {
    saveProperty(input: $input)
  }
`;

/**
 * __useSavePropertyMutation__
 *
 * To run a mutation, you first call `useSavePropertyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSavePropertyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSavePropertyMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSavePropertyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SavePropertyMutation,
        SavePropertyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SavePropertyMutation,
          SavePropertyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SavePropertyMutation,
    SavePropertyMutationVariables
  >(SavePropertyDocument, options);
}
export type SavePropertyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SavePropertyMutation,
    SavePropertyMutationVariables
  >;
export const SaveVillageDocument = gql`
  mutation saveVillage($input: VillageInput!) {
    saveVillage(input: $input)
  }
`;

/**
 * __useSaveVillageMutation__
 *
 * To run a mutation, you first call `useSaveVillageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveVillageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveVillageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveVillageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveVillageMutation,
        SaveVillageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveVillageMutation,
          SaveVillageMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveVillageMutation,
    SaveVillageMutationVariables
  >(SaveVillageDocument, options);
}
export type SaveVillageMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveVillageMutation,
    SaveVillageMutationVariables
  >;
export const UploadImageDocument = gql`
  mutation uploadImage($input: ImageInput!) {
    uploadImage(input: $input) {
      id
      url
      path
      title
      fileName
      fileType
      previewUrl
      previewPath
      blurHash
      preset
    }
  }
`;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadImageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UploadImageMutation,
        UploadImageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UploadImageMutation,
          UploadImageMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    UploadImageMutation,
    UploadImageMutationVariables
  >(UploadImageDocument, options);
}
export type UploadImageMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UploadImageMutation,
    UploadImageMutationVariables
  >;
export const ActivateEmployeesDocument = gql`
  mutation activateEmployees($ids: [ID!]!) {
    activateEmployees(ids: $ids)
  }
`;

/**
 * __useActivateEmployeesMutation__
 *
 * To run a mutation, you first call `useActivateEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useActivateEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useActivateEmployeesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useActivateEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ActivateEmployeesMutation,
        ActivateEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ActivateEmployeesMutation,
          ActivateEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ActivateEmployeesMutation,
    ActivateEmployeesMutationVariables
  >(ActivateEmployeesDocument, options);
}
export type ActivateEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    ActivateEmployeesMutation,
    ActivateEmployeesMutationVariables
  >;
export const AssignDepartmentToEmployeesDocument = gql`
  mutation assignDepartmentToEmployees($department: ID!, $ids: [ID!]!) {
    assignDepartmentToEmployees(department: $department, ids: $ids)
  }
`;

/**
 * __useAssignDepartmentToEmployeesMutation__
 *
 * To run a mutation, you first call `useAssignDepartmentToEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAssignDepartmentToEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAssignDepartmentToEmployeesMutation({
 *   variables: {
 *     department: // value for 'department'
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useAssignDepartmentToEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AssignDepartmentToEmployeesMutation,
        AssignDepartmentToEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AssignDepartmentToEmployeesMutation,
          AssignDepartmentToEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    AssignDepartmentToEmployeesMutation,
    AssignDepartmentToEmployeesMutationVariables
  >(AssignDepartmentToEmployeesDocument, options);
}
export type AssignDepartmentToEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AssignDepartmentToEmployeesMutation,
    AssignDepartmentToEmployeesMutationVariables
  >;
export const AssignRoleToEmployeesDocument = gql`
  mutation assignRoleToEmployees($role: ID!, $ids: [ID!]!) {
    assignRoleToEmployees(role: $role, ids: $ids)
  }
`;

/**
 * __useAssignRoleToEmployeesMutation__
 *
 * To run a mutation, you first call `useAssignRoleToEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAssignRoleToEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAssignRoleToEmployeesMutation({
 *   variables: {
 *     role: // value for 'role'
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useAssignRoleToEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AssignRoleToEmployeesMutation,
        AssignRoleToEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AssignRoleToEmployeesMutation,
          AssignRoleToEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    AssignRoleToEmployeesMutation,
    AssignRoleToEmployeesMutationVariables
  >(AssignRoleToEmployeesDocument, options);
}
export type AssignRoleToEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AssignRoleToEmployeesMutation,
    AssignRoleToEmployeesMutationVariables
  >;
export const DeactivateEmployeesDocument = gql`
  mutation deactivateEmployees($ids: [ID!]!) {
    deactivateEmployees(ids: $ids)
  }
`;

/**
 * __useDeactivateEmployeesMutation__
 *
 * To run a mutation, you first call `useDeactivateEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeactivateEmployeesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useDeactivateEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeactivateEmployeesMutation,
        DeactivateEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeactivateEmployeesMutation,
          DeactivateEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeactivateEmployeesMutation,
    DeactivateEmployeesMutationVariables
  >(DeactivateEmployeesDocument, options);
}
export type DeactivateEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeactivateEmployeesMutation,
    DeactivateEmployeesMutationVariables
  >;
export const DeleteDepartmentDocument = gql`
  mutation deleteDepartment($id: ID!) {
    deleteDepartment(id: $id)
  }
`;

/**
 * __useDeleteDepartmentMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteDepartmentMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDepartmentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteDepartmentMutation,
        DeleteDepartmentMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteDepartmentMutation,
          DeleteDepartmentMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteDepartmentMutation,
    DeleteDepartmentMutationVariables
  >(DeleteDepartmentDocument, options);
}
export type DeleteDepartmentMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteDepartmentMutation,
    DeleteDepartmentMutationVariables
  >;
export const DeleteEmployeeDocument = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteEmployeeMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteEmployeeMutation,
        DeleteEmployeeMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteEmployeeMutation,
          DeleteEmployeeMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteEmployeeMutation,
    DeleteEmployeeMutationVariables
  >(DeleteEmployeeDocument, options);
}
export type DeleteEmployeeMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteEmployeeMutation,
    DeleteEmployeeMutationVariables
  >;
export const DeleteEmployeesDocument = gql`
  mutation deleteEmployees($ids: [ID!]!) {
    deleteEmployees(ids: $ids)
  }
`;

/**
 * __useDeleteEmployeesMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteEmployeesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteEmployeesMutation,
        DeleteEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteEmployeesMutation,
          DeleteEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteEmployeesMutation,
    DeleteEmployeesMutationVariables
  >(DeleteEmployeesDocument, options);
}
export type DeleteEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteEmployeesMutation,
    DeleteEmployeesMutationVariables
  >;
export const DeleteRoleDocument = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteRoleMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteRoleMutation,
        DeleteRoleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteRoleMutation,
          DeleteRoleMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >(DeleteRoleDocument, options);
}
export type DeleteRoleMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >;
export const PublishEmployeesDocument = gql`
  mutation publishEmployees($ids: [ID!]!) {
    publishEmployees(ids: $ids)
  }
`;

/**
 * __usePublishEmployeesMutation__
 *
 * To run a mutation, you first call `usePublishEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishEmployeesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function usePublishEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishEmployeesMutation,
        PublishEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishEmployeesMutation,
          PublishEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    PublishEmployeesMutation,
    PublishEmployeesMutationVariables
  >(PublishEmployeesDocument, options);
}
export type PublishEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishEmployeesMutation,
    PublishEmployeesMutationVariables
  >;
export const SaveDepartmentDocument = gql`
  mutation saveDepartment($input: DepartmentInput!) {
    saveDepartment(input: $input)
  }
`;

/**
 * __useSaveDepartmentMutation__
 *
 * To run a mutation, you first call `useSaveDepartmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveDepartmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveDepartmentMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveDepartmentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveDepartmentMutation,
        SaveDepartmentMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveDepartmentMutation,
          SaveDepartmentMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveDepartmentMutation,
    SaveDepartmentMutationVariables
  >(SaveDepartmentDocument, options);
}
export type SaveDepartmentMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveDepartmentMutation,
    SaveDepartmentMutationVariables
  >;
export const SaveEmployeeDocument = gql`
  mutation saveEmployee($input: EmployeeInput!) {
    saveEmployee(input: $input)
  }
`;

/**
 * __useSaveEmployeeMutation__
 *
 * To run a mutation, you first call `useSaveEmployeeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveEmployeeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveEmployeeMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveEmployeeMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveEmployeeMutation,
        SaveEmployeeMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveEmployeeMutation,
          SaveEmployeeMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveEmployeeMutation,
    SaveEmployeeMutationVariables
  >(SaveEmployeeDocument, options);
}
export type SaveEmployeeMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveEmployeeMutation,
    SaveEmployeeMutationVariables
  >;
export const SaveRoleDocument = gql`
  mutation saveRole($input: RoleInput!) {
    saveRole(input: $input)
  }
`;

/**
 * __useSaveRoleMutation__
 *
 * To run a mutation, you first call `useSaveRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveRoleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveRoleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveRoleMutation,
        SaveRoleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveRoleMutation,
          SaveRoleMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveRoleMutation,
    SaveRoleMutationVariables
  >(SaveRoleDocument, options);
}
export type SaveRoleMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveRoleMutation,
    SaveRoleMutationVariables
  >;
export const UnpublishEmployeesDocument = gql`
  mutation unpublishEmployees($ids: [ID!]!) {
    unpublishEmployees(ids: $ids)
  }
`;

/**
 * __useUnpublishEmployeesMutation__
 *
 * To run a mutation, you first call `useUnpublishEmployeesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishEmployeesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUnpublishEmployeesMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useUnpublishEmployeesMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UnpublishEmployeesMutation,
        UnpublishEmployeesMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UnpublishEmployeesMutation,
          UnpublishEmployeesMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    UnpublishEmployeesMutation,
    UnpublishEmployeesMutationVariables
  >(UnpublishEmployeesDocument, options);
}
export type UnpublishEmployeesMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UnpublishEmployeesMutation,
    UnpublishEmployeesMutationVariables
  >;
export const MeDocument = gql`
  query me {
    me {
      id
      name
      surname
      avatar {
        url
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options,
  );
}
export function useMeLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options,
  );
}
export type MeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
export const ArticleDocument = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      group {
        id
        title
      }
      title
      contentBlocks {
        type
        data
        isVisible
      }
      status
      cover {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useArticleQuery__
 *
 * To run a query within a Vue component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useArticleQuery({
 *   id: // value for 'id'
 * });
 */
export function useArticleQuery(
  variables:
    | ArticleQueryVariables
    | VueCompositionApi.Ref<ArticleQueryVariables>
    | ReactiveFunction<ArticleQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<ArticleQuery, ArticleQueryVariables>(
    ArticleDocument,
    variables,
    options,
  );
}
export function useArticleLazyQuery(
  variables?:
    | ArticleQueryVariables
    | VueCompositionApi.Ref<ArticleQueryVariables>
    | ReactiveFunction<ArticleQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ArticleQuery, ArticleQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<ArticleQuery, ArticleQueryVariables>(
    ArticleDocument,
    variables,
    options,
  );
}
export type ArticleQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ArticleQuery, ArticleQueryVariables>;
export const ArticleGroupDocument = gql`
  query articleGroup($id: ID!) {
    articleGroup(id: $id) {
      id
      title
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useArticleGroupQuery__
 *
 * To run a query within a Vue component, call `useArticleGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleGroupQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useArticleGroupQuery({
 *   id: // value for 'id'
 * });
 */
export function useArticleGroupQuery(
  variables:
    | ArticleGroupQueryVariables
    | VueCompositionApi.Ref<ArticleGroupQueryVariables>
    | ReactiveFunction<ArticleGroupQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ArticleGroupQuery,
        ArticleGroupQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupQuery,
          ArticleGroupQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupQuery,
          ArticleGroupQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ArticleGroupQuery,
    ArticleGroupQueryVariables
  >(ArticleGroupDocument, variables, options);
}
export function useArticleGroupLazyQuery(
  variables?:
    | ArticleGroupQueryVariables
    | VueCompositionApi.Ref<ArticleGroupQueryVariables>
    | ReactiveFunction<ArticleGroupQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        ArticleGroupQuery,
        ArticleGroupQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupQuery,
          ArticleGroupQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupQuery,
          ArticleGroupQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ArticleGroupQuery,
    ArticleGroupQueryVariables
  >(ArticleGroupDocument, variables, options);
}
export type ArticleGroupQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ArticleGroupQuery,
    ArticleGroupQueryVariables
  >;
export const ArticleGroupsDocument = gql`
  query articleGroups($start: Int, $limit: Int, $search: String, $sort: Sort) {
    articleGroups(start: $start, limit: $limit, search: $search, sort: $sort) {
      totalCount
      nodes {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useArticleGroupsQuery__
 *
 * To run a query within a Vue component, call `useArticleGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleGroupsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useArticleGroupsQuery({
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function useArticleGroupsQuery(
  variables:
    | ArticleGroupsQueryVariables
    | VueCompositionApi.Ref<ArticleGroupsQueryVariables>
    | ReactiveFunction<ArticleGroupsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ArticleGroupsQuery,
        ArticleGroupsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupsQuery,
          ArticleGroupsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupsQuery,
          ArticleGroupsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    ArticleGroupsQuery,
    ArticleGroupsQueryVariables
  >(ArticleGroupsDocument, variables, options);
}
export function useArticleGroupsLazyQuery(
  variables:
    | ArticleGroupsQueryVariables
    | VueCompositionApi.Ref<ArticleGroupsQueryVariables>
    | ReactiveFunction<ArticleGroupsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        ArticleGroupsQuery,
        ArticleGroupsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupsQuery,
          ArticleGroupsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticleGroupsQuery,
          ArticleGroupsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ArticleGroupsQuery,
    ArticleGroupsQueryVariables
  >(ArticleGroupsDocument, variables, options);
}
export type ArticleGroupsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    ArticleGroupsQuery,
    ArticleGroupsQueryVariables
  >;
export const ArticlesDocument = gql`
  query articles(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
    $filter: ArticlesFilterInput
  ) {
    articles(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
      filter: $filter
    ) {
      totalCount
      nodes {
        id
        title
        status
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
 * __useArticlesQuery__
 *
 * To run a query within a Vue component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useArticlesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 *   filter: // value for 'filter'
 * });
 */
export function useArticlesQuery(
  variables:
    | ArticlesQueryVariables
    | VueCompositionApi.Ref<ArticlesQueryVariables>
    | ReactiveFunction<ArticlesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ArticlesQuery, ArticlesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticlesQuery,
          ArticlesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticlesQuery,
          ArticlesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<ArticlesQuery, ArticlesQueryVariables>(
    ArticlesDocument,
    variables,
    options,
  );
}
export function useArticlesLazyQuery(
  variables:
    | ArticlesQueryVariables
    | VueCompositionApi.Ref<ArticlesQueryVariables>
    | ReactiveFunction<ArticlesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ArticlesQuery, ArticlesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ArticlesQuery,
          ArticlesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ArticlesQuery,
          ArticlesQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ArticlesQuery,
    ArticlesQueryVariables
  >(ArticlesDocument, variables, options);
}
export type ArticlesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ArticlesQuery, ArticlesQueryVariables>;
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
      publicationStatus
      internalInfo
      isDeleted
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
      publicationStatus
      internalInfo
      isDeleted
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
        publicationStatus
        internalInfo
        isDeleted
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
    $filter: ComplexFilter
  ) {
    complexes(
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
        publicationStatus
        internalInfo
        isDeleted
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
 *   filter: // value for 'filter'
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
        isDeleted
        refreshDate
        status
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
        source
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
        internalInfo
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
      isDeleted
      refreshDate
      status
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
      source
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
      internalInfo
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
      }
      publicationStatus
      internalInfo
      isDeleted
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
    $filter: VillageFilter
  ) {
    villages(
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
        publicationStatus
        internalInfo
        isDeleted
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
 *   filter: // value for 'filter'
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
export const DepartmentDocument = gql`
  query department($id: ID!) {
    department(id: $id) {
      id
      title
      groups {
        id
        title
      }
    }
  }
`;

/**
 * __useDepartmentQuery__
 *
 * To run a query within a Vue component, call `useDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDepartmentQuery({
 *   id: // value for 'id'
 * });
 */
export function useDepartmentQuery(
  variables:
    | DepartmentQueryVariables
    | VueCompositionApi.Ref<DepartmentQueryVariables>
    | ReactiveFunction<DepartmentQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        DepartmentQuery,
        DepartmentQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DepartmentQuery,
          DepartmentQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DepartmentQuery,
          DepartmentQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    DepartmentQuery,
    DepartmentQueryVariables
  >(DepartmentDocument, variables, options);
}
export function useDepartmentLazyQuery(
  variables?:
    | DepartmentQueryVariables
    | VueCompositionApi.Ref<DepartmentQueryVariables>
    | ReactiveFunction<DepartmentQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        DepartmentQuery,
        DepartmentQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DepartmentQuery,
          DepartmentQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DepartmentQuery,
          DepartmentQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    DepartmentQuery,
    DepartmentQueryVariables
  >(DepartmentDocument, variables, options);
}
export type DepartmentQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DepartmentQuery, DepartmentQueryVariables>;
export const DepartmentsDocument = gql`
  query departments(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    departments(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        title
        groups {
          id
          title
        }
      }
    }
  }
`;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a Vue component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDepartmentsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function useDepartmentsQuery(
  variables:
    | DepartmentsQueryVariables
    | VueCompositionApi.Ref<DepartmentsQueryVariables>
    | ReactiveFunction<DepartmentsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        DepartmentsQuery,
        DepartmentsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DepartmentsQuery,
          DepartmentsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DepartmentsQuery,
          DepartmentsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    DepartmentsQuery,
    DepartmentsQueryVariables
  >(DepartmentsDocument, variables, options);
}
export function useDepartmentsLazyQuery(
  variables:
    | DepartmentsQueryVariables
    | VueCompositionApi.Ref<DepartmentsQueryVariables>
    | ReactiveFunction<DepartmentsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        DepartmentsQuery,
        DepartmentsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          DepartmentsQuery,
          DepartmentsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          DepartmentsQuery,
          DepartmentsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    DepartmentsQuery,
    DepartmentsQueryVariables
  >(DepartmentsDocument, variables, options);
}
export type DepartmentsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    DepartmentsQuery,
    DepartmentsQueryVariables
  >;
export const EmployeeDocument = gql`
  query employee($id: ID!) {
    employee(id: $id) {
      id
      name
      surname
      patronymic
      birthday
      email
      phone
      position {
        id
        title
      }
      department {
        id
        title
        groups {
          id
          title
        }
      }
      group {
        id
        title
      }
      role {
        id
        title
        permissions
      }
      internalInfo
      shortDescription
      description
      isPublished
      avatar {
        id
        url
        path
        title
        fileName
        fileType
        previewUrl
        previewPath
        blurHash
        preset
      }
      publicImage {
        id
        url
        path
        title
        fileName
        fileType
        previewUrl
        previewPath
        blurHash
        preset
      }
      createdAt
      updatedAt
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
  query employees(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
    $filter: EmployeesFilterInput
  ) {
    employees(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
      filter: $filter
    ) {
      totalCount
      nodes {
        id
        name
        surname
        patronymic
        birthday
        email
        phone
        position {
          id
          title
        }
        department {
          id
          title
        }
        group {
          id
          title
        }
        role {
          id
          title
          permissions
        }
        internalInfo
        shortDescription
        description
        isPublished
        avatar {
          id
          url
          path
          title
          fileName
          fileType
          previewUrl
          previewPath
          blurHash
          preset
        }
        createdAt
        updatedAt
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
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useEmployeesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 *   filter: // value for 'filter'
 * });
 */
export function useEmployeesQuery(
  variables:
    | EmployeesQueryVariables
    | VueCompositionApi.Ref<EmployeesQueryVariables>
    | ReactiveFunction<EmployeesQueryVariables> = {},
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
    variables,
    options,
  );
}
export function useEmployeesLazyQuery(
  variables:
    | EmployeesQueryVariables
    | VueCompositionApi.Ref<EmployeesQueryVariables>
    | ReactiveFunction<EmployeesQueryVariables> = {},
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
  >(EmployeesDocument, variables, options);
}
export type EmployeesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<EmployeesQuery, EmployeesQueryVariables>;
export const LogsDocument = gql`
  query logs(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: LogsFilterInput
  ) {
    logs(
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
        eid
        author {
          id
          name
          surname
        }
        type
        level
        createdAt
      }
    }
  }
`;

/**
 * __useLogsQuery__
 *
 * To run a query within a Vue component, call `useLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLogsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useLogsQuery(
  variables:
    | LogsQueryVariables
    | VueCompositionApi.Ref<LogsQueryVariables>
    | ReactiveFunction<LogsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<LogsQuery, LogsQueryVariables>(
    LogsDocument,
    variables,
    options,
  );
}
export function useLogsLazyQuery(
  variables:
    | LogsQueryVariables
    | VueCompositionApi.Ref<LogsQueryVariables>
    | ReactiveFunction<LogsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LogsQuery, LogsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<LogsQuery, LogsQueryVariables>(
    LogsDocument,
    variables,
    options,
  );
}
export type LogsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<LogsQuery, LogsQueryVariables>;
export const PositionsDocument = gql`
  query positions(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    positions(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;

/**
 * __usePositionsQuery__
 *
 * To run a query within a Vue component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePositionsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function usePositionsQuery(
  variables:
    | PositionsQueryVariables
    | VueCompositionApi.Ref<PositionsQueryVariables>
    | ReactiveFunction<PositionsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        PositionsQuery,
        PositionsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PositionsQuery,
          PositionsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PositionsQuery,
          PositionsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<PositionsQuery, PositionsQueryVariables>(
    PositionsDocument,
    variables,
    options,
  );
}
export function usePositionsLazyQuery(
  variables:
    | PositionsQueryVariables
    | VueCompositionApi.Ref<PositionsQueryVariables>
    | ReactiveFunction<PositionsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        PositionsQuery,
        PositionsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          PositionsQuery,
          PositionsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          PositionsQuery,
          PositionsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    PositionsQuery,
    PositionsQueryVariables
  >(PositionsDocument, variables, options);
}
export type PositionsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<PositionsQuery, PositionsQueryVariables>;
export const RoleDocument = gql`
  query role($id: ID!) {
    role(id: $id) {
      id
      title
      permissions
    }
  }
`;

/**
 * __useRoleQuery__
 *
 * To run a query within a Vue component, call `useRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRoleQuery({
 *   id: // value for 'id'
 * });
 */
export function useRoleQuery(
  variables:
    | RoleQueryVariables
    | VueCompositionApi.Ref<RoleQueryVariables>
    | ReactiveFunction<RoleQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<RoleQuery, RoleQueryVariables>(
    RoleDocument,
    variables,
    options,
  );
}
export function useRoleLazyQuery(
  variables?:
    | RoleQueryVariables
    | VueCompositionApi.Ref<RoleQueryVariables>
    | ReactiveFunction<RoleQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<RoleQuery, RoleQueryVariables>(
    RoleDocument,
    variables,
    options,
  );
}
export type RoleQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<RoleQuery, RoleQueryVariables>;
export const RolesDocument = gql`
  query roles(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    roles(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        title
        permissions
      }
    }
  }
`;

/**
 * __useRolesQuery__
 *
 * To run a query within a Vue component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRolesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function useRolesQuery(
  variables:
    | RolesQueryVariables
    | VueCompositionApi.Ref<RolesQueryVariables>
    | ReactiveFunction<RolesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    variables,
    options,
  );
}
export function useRolesLazyQuery(
  variables:
    | RolesQueryVariables
    | VueCompositionApi.Ref<RolesQueryVariables>
    | ReactiveFunction<RolesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    variables,
    options,
  );
}
export type RolesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<RolesQuery, RolesQueryVariables>;
export const ContactDocument = gql`
  query contact($id: ID!) {
    contact(id: $id) {
      id
      name
      surname
      patronymic
      phone
      note
      email
      company
      passportIssueDate
      passportNumber
      passportIssuedBy
      passportIssuerCode
      additionalPhones
      internalNumber
      birthday
      source
      type
      address
      deals {
        id
        internalNumber
      }
      properties {
        id
        title
      }
      agents {
        id
        name
        surname
        patronymic
      }
      documents {
        id
        url
        title
      }
      contracts {
        id
        url
        title
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useContactQuery__
 *
 * To run a query within a Vue component, call `useContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useContactQuery({
 *   id: // value for 'id'
 * });
 */
export function useContactQuery(
  variables:
    | ContactQueryVariables
    | VueCompositionApi.Ref<ContactQueryVariables>
    | ReactiveFunction<ContactQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<ContactQuery, ContactQueryVariables>(
    ContactDocument,
    variables,
    options,
  );
}
export function useContactLazyQuery(
  variables?:
    | ContactQueryVariables
    | VueCompositionApi.Ref<ContactQueryVariables>
    | ReactiveFunction<ContactQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ContactQuery, ContactQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<ContactQuery, ContactQueryVariables>(
    ContactDocument,
    variables,
    options,
  );
}
export type ContactQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ContactQuery, ContactQueryVariables>;
export const DeleteContactDocument = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteContactMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteContactMutation,
        DeleteContactMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteContactMutation,
          DeleteContactMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteContactMutation,
    DeleteContactMutationVariables
  >(DeleteContactDocument, options);
}
export type DeleteContactMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteContactMutation,
    DeleteContactMutationVariables
  >;
export const SaveContactDocument = gql`
  mutation saveContact($input: ContactInput!) {
    saveContact(input: $input)
  }
`;

/**
 * __useSaveContactMutation__
 *
 * To run a mutation, you first call `useSaveContactMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveContactMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveContactMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveContactMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveContactMutation,
        SaveContactMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveContactMutation,
          SaveContactMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveContactMutation,
    SaveContactMutationVariables
  >(SaveContactDocument, options);
}
export type SaveContactMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveContactMutation,
    SaveContactMutationVariables
  >;
export const BulkDeleteContactsDocument = gql`
  mutation bulkDeleteContacts($ids: [ID!]!) {
    bulkDeleteContacts(ids: $ids)
  }
`;

/**
 * __useBulkDeleteContactsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteContactsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteContactsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteContactsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteContactsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteContactsMutation,
        BulkDeleteContactsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteContactsMutation,
          BulkDeleteContactsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteContactsMutation,
    BulkDeleteContactsMutationVariables
  >(BulkDeleteContactsDocument, options);
}
export type BulkDeleteContactsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteContactsMutation,
    BulkDeleteContactsMutationVariables
  >;
export const ContactsDocument = gql`
  query contacts(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: ContactFilter
  ) {
    contacts(
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
        internalNumber
        name
        surname
        address
        properties {
          id
          title
        }
        agents {
          id
          name
          surname
          patronymic
        }
        patronymic
        phone
        additionalPhones
        additionalPhones
        documents {
          id
          title
        }
        contracts {
          id
          title
        }
        email
        source
        type
        agents {
          id
          name
          surname
          patronymic
        }
        company
        passportNumber
        passportIssuedBy
        passportIssuerCode
        note
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useContactsQuery__
 *
 * To run a query within a Vue component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useContactsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useContactsQuery(
  variables:
    | ContactsQueryVariables
    | VueCompositionApi.Ref<ContactsQueryVariables>
    | ReactiveFunction<ContactsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ContactsQuery, ContactsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ContactsQuery,
          ContactsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ContactsQuery,
          ContactsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<ContactsQuery, ContactsQueryVariables>(
    ContactsDocument,
    variables,
    options,
  );
}
export function useContactsLazyQuery(
  variables:
    | ContactsQueryVariables
    | VueCompositionApi.Ref<ContactsQueryVariables>
    | ReactiveFunction<ContactsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ContactsQuery, ContactsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          ContactsQuery,
          ContactsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          ContactsQuery,
          ContactsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    ContactsQuery,
    ContactsQueryVariables
  >(ContactsDocument, variables, options);
}
export type ContactsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ContactsQuery, ContactsQueryVariables>;
export const DealDocument = gql`
  query deal($id: ID!) {
    deal(id: $id) {
      address
      depositDate
      finishedAt
      id
      internalComment
      internalNumber
      accountant {
        id
        name
        surname
        patronymic
      }
      buyerAgent {
        id
        name
        surname
        patronymic
      }
      buyerContact {
        id
        name
        surname
        patronymic
      }
      sellerAgent {
        id
        name
        surname
        patronymic
      }
      sellerContact {
        id
        name
        surname
        patronymic
      }
      mortgageBroker {
        id
        name
        surname
        patronymic
      }
      property {
        id
        title
      }
      lawer {
        id
        name
        surname
        patronymic
      }
      isDeleted
      sellerPhone
      sellerDocuments {
        id
        url
        title
      }
      mortgageDocuments {
        id
        url
        title
      }
      mortgageRequest {
        id
      }
      accountantDocuments {
        id
        url
        title
      }
      lawerDocuments {
        id
        url
        title
      }
      buyerDocuments {
        id
        url
        title
      }
      stage
      type
      updatedAt
      buyerPhone
      commissionAmount
      createdAt
      dealDate
    }
  }
`;

/**
 * __useDealQuery__
 *
 * To run a query within a Vue component, call `useDealQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDealQuery({
 *   id: // value for 'id'
 * });
 */
export function useDealQuery(
  variables:
    | DealQueryVariables
    | VueCompositionApi.Ref<DealQueryVariables>
    | ReactiveFunction<DealQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<DealQuery, DealQueryVariables>(
    DealDocument,
    variables,
    options,
  );
}
export function useDealLazyQuery(
  variables?:
    | DealQueryVariables
    | VueCompositionApi.Ref<DealQueryVariables>
    | ReactiveFunction<DealQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<DealQuery, DealQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<DealQuery, DealQueryVariables>(
    DealDocument,
    variables,
    options,
  );
}
export type DealQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DealQuery, DealQueryVariables>;
export const DeleteDealDocument = gql`
  mutation deleteDeal($id: ID!) {
    deleteDeal(id: $id)
  }
`;

/**
 * __useDeleteDealMutation__
 *
 * To run a mutation, you first call `useDeleteDealMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDealMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteDealMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDealMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteDealMutation,
        DeleteDealMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteDealMutation,
          DeleteDealMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteDealMutation,
    DeleteDealMutationVariables
  >(DeleteDealDocument, options);
}
export type DeleteDealMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteDealMutation,
    DeleteDealMutationVariables
  >;
export const SaveDealDocument = gql`
  mutation saveDeal($input: DealInput!) {
    saveDeal(input: $input)
  }
`;

/**
 * __useSaveDealMutation__
 *
 * To run a mutation, you first call `useSaveDealMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveDealMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveDealMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveDealMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveDealMutation,
        SaveDealMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveDealMutation,
          SaveDealMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveDealMutation,
    SaveDealMutationVariables
  >(SaveDealDocument, options);
}
export type SaveDealMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveDealMutation,
    SaveDealMutationVariables
  >;
export const BulkDeleteDealsDocument = gql`
  mutation bulkDeleteDeals($ids: [ID!]!) {
    bulkDeleteDeals(ids: $ids)
  }
`;

/**
 * __useBulkDeleteDealsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteDealsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteDealsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteDealsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteDealsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteDealsMutation,
        BulkDeleteDealsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteDealsMutation,
          BulkDeleteDealsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteDealsMutation,
    BulkDeleteDealsMutationVariables
  >(BulkDeleteDealsDocument, options);
}
export type BulkDeleteDealsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteDealsMutation,
    BulkDeleteDealsMutationVariables
  >;
export const DealsDocument = gql`
  query deals(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: DealFilter
  ) {
    deals(
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
        internalNumber
        type
        stage
        depositDate
        internalComment
        isDeleted
        sellerPhone
        sellerContact {
          id
          name
          surname
          patronymic
        }
        buyerContact {
          id
          name
          surname
          patronymic
        }
        property {
          id
          title
        }
        sellerAgent {
          id
          name
          surname
        }
        buyerAgent {
          id
          name
          surname
        }
        address
        buyerPhone
        commissionAmount
        dealDate
        finishedAt
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useDealsQuery__
 *
 * To run a query within a Vue component, call `useDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDealsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useDealsQuery(
  variables:
    | DealsQueryVariables
    | VueCompositionApi.Ref<DealsQueryVariables>
    | ReactiveFunction<DealsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<DealsQuery, DealsQueryVariables>(
    DealsDocument,
    variables,
    options,
  );
}
export function useDealsLazyQuery(
  variables:
    | DealsQueryVariables
    | VueCompositionApi.Ref<DealsQueryVariables>
    | ReactiveFunction<DealsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<DealsQuery, DealsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<DealsQuery, DealsQueryVariables>(
    DealsDocument,
    variables,
    options,
  );
}
export type DealsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<DealsQuery, DealsQueryVariables>;
export const DeleteLeadDocument = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id)
  }
`;

/**
 * __useDeleteLeadMutation__
 *
 * To run a mutation, you first call `useDeleteLeadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLeadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteLeadMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLeadMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteLeadMutation,
        DeleteLeadMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteLeadMutation,
          DeleteLeadMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteLeadMutation,
    DeleteLeadMutationVariables
  >(DeleteLeadDocument, options);
}
export type DeleteLeadMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteLeadMutation,
    DeleteLeadMutationVariables
  >;
export const LeadDocument = gql`
  query lead($id: ID!) {
    lead(id: $id) {
      id
      internalNumber
      name
      surname
      patronymic
      phone
      additionalPhones
      email
      request
      source
      status
      type
      address
      agents {
        id
        name
        surname
        patronymic
      }
      company
      birthday
      comment
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useLeadQuery__
 *
 * To run a query within a Vue component, call `useLeadQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeadQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLeadQuery({
 *   id: // value for 'id'
 * });
 */
export function useLeadQuery(
  variables:
    | LeadQueryVariables
    | VueCompositionApi.Ref<LeadQueryVariables>
    | ReactiveFunction<LeadQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<LeadQuery, LeadQueryVariables>(
    LeadDocument,
    variables,
    options,
  );
}
export function useLeadLazyQuery(
  variables?:
    | LeadQueryVariables
    | VueCompositionApi.Ref<LeadQueryVariables>
    | ReactiveFunction<LeadQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LeadQuery, LeadQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<LeadQuery, LeadQueryVariables>(
    LeadDocument,
    variables,
    options,
  );
}
export type LeadQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<LeadQuery, LeadQueryVariables>;
export const SaveLeadDocument = gql`
  mutation saveLead($input: LeadInput!) {
    saveLead(input: $input)
  }
`;

/**
 * __useSaveLeadMutation__
 *
 * To run a mutation, you first call `useSaveLeadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveLeadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveLeadMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveLeadMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveLeadMutation,
        SaveLeadMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveLeadMutation,
          SaveLeadMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveLeadMutation,
    SaveLeadMutationVariables
  >(SaveLeadDocument, options);
}
export type SaveLeadMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveLeadMutation,
    SaveLeadMutationVariables
  >;
export const BulkDeleteLeadsDocument = gql`
  mutation bulkDeleteLeads($ids: [ID!]!) {
    bulkDeleteLeads(ids: $ids)
  }
`;

/**
 * __useBulkDeleteLeadsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteLeadsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteLeadsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteLeadsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteLeadsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteLeadsMutation,
        BulkDeleteLeadsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteLeadsMutation,
          BulkDeleteLeadsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteLeadsMutation,
    BulkDeleteLeadsMutationVariables
  >(BulkDeleteLeadsDocument, options);
}
export type BulkDeleteLeadsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteLeadsMutation,
    BulkDeleteLeadsMutationVariables
  >;
export const LeadsDocument = gql`
  query leads(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: LeadFilter
  ) {
    leads(
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
        internalNumber
        name
        surname
        patronymic
        phone
        additionalPhones
        email
        request
        source
        status
        type
        address
        agents {
          id
          name
          surname
          patronymic
        }
        company
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useLeadsQuery__
 *
 * To run a query within a Vue component, call `useLeadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeadsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLeadsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useLeadsQuery(
  variables:
    | LeadsQueryVariables
    | VueCompositionApi.Ref<LeadsQueryVariables>
    | ReactiveFunction<LeadsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<LeadsQuery, LeadsQueryVariables>(
    LeadsDocument,
    variables,
    options,
  );
}
export function useLeadsLazyQuery(
  variables:
    | LeadsQueryVariables
    | VueCompositionApi.Ref<LeadsQueryVariables>
    | ReactiveFunction<LeadsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<LeadsQuery, LeadsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<LeadsQuery, LeadsQueryVariables>(
    LeadsDocument,
    variables,
    options,
  );
}
export type LeadsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<LeadsQuery, LeadsQueryVariables>;
export const DeleteMeetDocument = gql`
  mutation deleteMeet($id: ID!) {
    deleteMeet(id: $id)
  }
`;

/**
 * __useDeleteMeetMutation__
 *
 * To run a mutation, you first call `useDeleteMeetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteMeetMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteMeetMutation,
        DeleteMeetMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteMeetMutation,
          DeleteMeetMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteMeetMutation,
    DeleteMeetMutationVariables
  >(DeleteMeetDocument, options);
}
export type DeleteMeetMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteMeetMutation,
    DeleteMeetMutationVariables
  >;
export const MeetDocument = gql`
  query meet($id: ID!) {
    meet(id: $id) {
      id
      accountant {
        id
        name
        surname
        patronymic
      }
      dateTime
      internalNumber
      isDeleted
      isOnline
      lawer {
        id
        name
        surname
        patronymic
      }
      mortgageBroker {
        id
        name
        surname
        patronymic
      }
      property {
        id
        title
      }
      sellerAgent {
        id
        name
        surname
        patronymic
      }
      sellerContact {
        id
        name
        surname
        patronymic
      }
      address
      sellerPhone
      status
      type
      updatedAt
      useDealDeposit
      useMortgage
      buyerAgency
      buyerAgent {
        id
        name
        surname
        patronymic
      }
      buyerContact {
        id
        name
        surname
        patronymic
      }
      buyerPhone
      cancelReason
      cancelReasonCustom
      comment
      createdAt
    }
  }
`;

/**
 * __useMeetQuery__
 *
 * To run a query within a Vue component, call `useMeetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeetQuery({
 *   id: // value for 'id'
 * });
 */
export function useMeetQuery(
  variables:
    | MeetQueryVariables
    | VueCompositionApi.Ref<MeetQueryVariables>
    | ReactiveFunction<MeetQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<MeetQuery, MeetQueryVariables>(
    MeetDocument,
    variables,
    options,
  );
}
export function useMeetLazyQuery(
  variables?:
    | MeetQueryVariables
    | VueCompositionApi.Ref<MeetQueryVariables>
    | ReactiveFunction<MeetQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeetQuery, MeetQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<MeetQuery, MeetQueryVariables>(
    MeetDocument,
    variables,
    options,
  );
}
export type MeetQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeetQuery, MeetQueryVariables>;
export const SaveMeetDocument = gql`
  mutation saveMeet($input: MeetInput!) {
    saveMeet(input: $input)
  }
`;

/**
 * __useSaveMeetMutation__
 *
 * To run a mutation, you first call `useSaveMeetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveMeetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveMeetMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveMeetMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveMeetMutation,
        SaveMeetMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveMeetMutation,
          SaveMeetMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveMeetMutation,
    SaveMeetMutationVariables
  >(SaveMeetDocument, options);
}
export type SaveMeetMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveMeetMutation,
    SaveMeetMutationVariables
  >;
export const BulkDeleteMeetsDocument = gql`
  mutation bulkDeleteMeets($ids: [ID!]!) {
    bulkDeleteMeets(ids: $ids)
  }
`;

/**
 * __useBulkDeleteMeetsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteMeetsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteMeetsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteMeetsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteMeetsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteMeetsMutation,
        BulkDeleteMeetsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteMeetsMutation,
          BulkDeleteMeetsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteMeetsMutation,
    BulkDeleteMeetsMutationVariables
  >(BulkDeleteMeetsDocument, options);
}
export type BulkDeleteMeetsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteMeetsMutation,
    BulkDeleteMeetsMutationVariables
  >;
export const MeetsDocument = gql`
  query meets(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: MeetFilter
  ) {
    meets(
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
        accountant {
          id
          name
          surname
          patronymic
          phone
        }
        dateTime
        internalNumber
        isDeleted
        isOnline
        lawer {
          id
          name
          surname
          patronymic
          phone
        }
        mortgageBroker {
          id
          name
          surname
          patronymic
          phone
        }
        property {
          id
          title
        }
        sellerAgent {
          id
          name
          surname
          patronymic
          phone
        }
        sellerContact {
          id
          name
          surname
          patronymic
          phone
        }
        address
        sellerPhone
        status
        type
        updatedAt
        useDealDeposit
        useMortgage
        buyerAgency
        buyerAgent {
          id
          name
          surname
          patronymic
          phone
        }
        buyerContact {
          id
          name
          surname
          patronymic
          phone
        }
        buyerPhone
        cancelReason
        cancelReasonCustom
        comment
        createdAt
      }
    }
  }
`;

/**
 * __useMeetsQuery__
 *
 * To run a query within a Vue component, call `useMeetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeetsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useMeetsQuery(
  variables:
    | MeetsQueryVariables
    | VueCompositionApi.Ref<MeetsQueryVariables>
    | ReactiveFunction<MeetsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<MeetsQuery, MeetsQueryVariables>(
    MeetsDocument,
    variables,
    options,
  );
}
export function useMeetsLazyQuery(
  variables:
    | MeetsQueryVariables
    | VueCompositionApi.Ref<MeetsQueryVariables>
    | ReactiveFunction<MeetsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeetsQuery, MeetsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<MeetsQuery, MeetsQueryVariables>(
    MeetsDocument,
    variables,
    options,
  );
}
export type MeetsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeetsQuery, MeetsQueryVariables>;
export const DeleteMortgageRequestDocument = gql`
  mutation deleteMortgageRequest($id: ID!) {
    deleteMortgageRequest(id: $id)
  }
`;

/**
 * __useDeleteMortgageRequestMutation__
 *
 * To run a mutation, you first call `useDeleteMortgageRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMortgageRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteMortgageRequestMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMortgageRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteMortgageRequestMutation,
        DeleteMortgageRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteMortgageRequestMutation,
          DeleteMortgageRequestMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteMortgageRequestMutation,
    DeleteMortgageRequestMutationVariables
  >(DeleteMortgageRequestDocument, options);
}
export type DeleteMortgageRequestMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteMortgageRequestMutation,
    DeleteMortgageRequestMutationVariables
  >;
export const MortgageRequestDocument = gql`
  query mortgageRequest($id: ID!) {
    mortgageRequest(id: $id) {
      id
      internalNumber
      status
      agent {
        id
        name
        surname
        patronymic
      }
      mortgageBroker {
        id
        name
        surname
        patronymic
      }
      percentage
      period
      property {
        id
        title
      }
      responseDate
      sendDate
      amount
      firstDeposit
      validTillDate
      banks {
        id
        title
      }
      comment
      contact {
        id
        name
        surname
        patronymic
      }
      contracts {
        id
        url
        title
      }
      deal {
        id
        internalNumber
      }
      documents {
        id
        url
        title
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMortgageRequestQuery__
 *
 * To run a query within a Vue component, call `useMortgageRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useMortgageRequestQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMortgageRequestQuery({
 *   id: // value for 'id'
 * });
 */
export function useMortgageRequestQuery(
  variables:
    | MortgageRequestQueryVariables
    | VueCompositionApi.Ref<MortgageRequestQueryVariables>
    | ReactiveFunction<MortgageRequestQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestQuery,
        MortgageRequestQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestQuery,
          MortgageRequestQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestQuery,
          MortgageRequestQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    MortgageRequestQuery,
    MortgageRequestQueryVariables
  >(MortgageRequestDocument, variables, options);
}
export function useMortgageRequestLazyQuery(
  variables?:
    | MortgageRequestQueryVariables
    | VueCompositionApi.Ref<MortgageRequestQueryVariables>
    | ReactiveFunction<MortgageRequestQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestQuery,
        MortgageRequestQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestQuery,
          MortgageRequestQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestQuery,
          MortgageRequestQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    MortgageRequestQuery,
    MortgageRequestQueryVariables
  >(MortgageRequestDocument, variables, options);
}
export type MortgageRequestQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    MortgageRequestQuery,
    MortgageRequestQueryVariables
  >;
export const SaveMortgageRequestDocument = gql`
  mutation saveMortgageRequest($input: MortgageRequestInput!) {
    saveMortgageRequest(input: $input)
  }
`;

/**
 * __useSaveMortgageRequestMutation__
 *
 * To run a mutation, you first call `useSaveMortgageRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveMortgageRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveMortgageRequestMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveMortgageRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveMortgageRequestMutation,
        SaveMortgageRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveMortgageRequestMutation,
          SaveMortgageRequestMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveMortgageRequestMutation,
    SaveMortgageRequestMutationVariables
  >(SaveMortgageRequestDocument, options);
}
export type SaveMortgageRequestMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveMortgageRequestMutation,
    SaveMortgageRequestMutationVariables
  >;
export const BulkDeleteMortgageRequestsDocument = gql`
  mutation bulkDeleteMortgageRequests($ids: [ID!]!) {
    bulkDeleteMortgageRequests(ids: $ids)
  }
`;

/**
 * __useBulkDeleteMortgageRequestsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteMortgageRequestsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteMortgageRequestsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteMortgageRequestsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteMortgageRequestsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteMortgageRequestsMutation,
        BulkDeleteMortgageRequestsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteMortgageRequestsMutation,
          BulkDeleteMortgageRequestsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteMortgageRequestsMutation,
    BulkDeleteMortgageRequestsMutationVariables
  >(BulkDeleteMortgageRequestsDocument, options);
}
export type BulkDeleteMortgageRequestsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteMortgageRequestsMutation,
    BulkDeleteMortgageRequestsMutationVariables
  >;
export const MortgageRequestsDocument = gql`
  query mortgageRequests(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: MortgageRequestFilter
  ) {
    mortgageRequests(
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
        internalNumber
        status
        agent {
          id
          name
          surname
          patronymic
        }
        mortgageBroker {
          id
          name
          surname
          patronymic
        }
        percentage
        period
        property {
          id
          title
        }
        responseDate
        sendDate
        amount
        firstDeposit
        validTillDate
        banks {
          id
          title
        }
        comment
        contact {
          id
          name
          surname
          patronymic
          phone
        }
        contracts {
          id
          url
          title
        }
        deal {
          id
          internalNumber
        }
        documents {
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
 * __useMortgageRequestsQuery__
 *
 * To run a query within a Vue component, call `useMortgageRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMortgageRequestsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMortgageRequestsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useMortgageRequestsQuery(
  variables:
    | MortgageRequestsQueryVariables
    | VueCompositionApi.Ref<MortgageRequestsQueryVariables>
    | ReactiveFunction<MortgageRequestsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestsQuery,
        MortgageRequestsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestsQuery,
          MortgageRequestsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestsQuery,
          MortgageRequestsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    MortgageRequestsQuery,
    MortgageRequestsQueryVariables
  >(MortgageRequestsDocument, variables, options);
}
export function useMortgageRequestsLazyQuery(
  variables:
    | MortgageRequestsQueryVariables
    | VueCompositionApi.Ref<MortgageRequestsQueryVariables>
    | ReactiveFunction<MortgageRequestsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<
        MortgageRequestsQuery,
        MortgageRequestsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestsQuery,
          MortgageRequestsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MortgageRequestsQuery,
          MortgageRequestsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    MortgageRequestsQuery,
    MortgageRequestsQueryVariables
  >(MortgageRequestsDocument, variables, options);
}
export type MortgageRequestsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    MortgageRequestsQuery,
    MortgageRequestsQueryVariables
  >;
export const DeletePageDocument = gql`
  mutation deletePage($id: ID!) {
    deletePage(id: $id)
  }
`;

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePageMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeletePageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeletePageMutation,
        DeletePageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeletePageMutation,
          DeletePageMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeletePageMutation,
    DeletePageMutationVariables
  >(DeletePageDocument, options);
}
export type DeletePageMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeletePageMutation,
    DeletePageMutationVariables
  >;
export const PageDocument = gql`
  query page($id: ID!) {
    page(id: $id) {
      id
      url
      title
      description
      contentBlocks {
        type
        data
        isVisible
      }
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePageQuery__
 *
 * To run a query within a Vue component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePageQuery({
 *   id: // value for 'id'
 * });
 */
export function usePageQuery(
  variables:
    | PageQueryVariables
    | VueCompositionApi.Ref<PageQueryVariables>
    | ReactiveFunction<PageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<PageQuery, PageQueryVariables>(
    PageDocument,
    variables,
    options,
  );
}
export function usePageLazyQuery(
  variables?:
    | PageQueryVariables
    | VueCompositionApi.Ref<PageQueryVariables>
    | ReactiveFunction<PageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<PageQuery, PageQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<PageQuery, PageQueryVariables>(
    PageDocument,
    variables,
    options,
  );
}
export type PageQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<PageQuery, PageQueryVariables>;
export const SavePageDocument = gql`
  mutation savePage($input: PageInput!) {
    savePage(input: $input)
  }
`;

/**
 * __useSavePageMutation__
 *
 * To run a mutation, you first call `useSavePageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSavePageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSavePageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSavePageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SavePageMutation,
        SavePageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SavePageMutation,
          SavePageMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SavePageMutation,
    SavePageMutationVariables
  >(SavePageDocument, options);
}
export type SavePageMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SavePageMutation,
    SavePageMutationVariables
  >;
export const PagesDocument = gql`
  query pages(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    pages(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        url
        title
        description
        contentBlocks {
          type
          data
          isVisible
        }
        status
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __usePagesQuery__
 *
 * To run a query within a Vue component, call `usePagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePagesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function usePagesQuery(
  variables:
    | PagesQueryVariables
    | VueCompositionApi.Ref<PagesQueryVariables>
    | ReactiveFunction<PagesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<PagesQuery, PagesQueryVariables>(
    PagesDocument,
    variables,
    options,
  );
}
export function usePagesLazyQuery(
  variables:
    | PagesQueryVariables
    | VueCompositionApi.Ref<PagesQueryVariables>
    | ReactiveFunction<PagesQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<PagesQuery, PagesQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<PagesQuery, PagesQueryVariables>(
    PagesDocument,
    variables,
    options,
  );
}
export type PagesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<PagesQuery, PagesQueryVariables>;
export const DeleteReviewDocument = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteReviewMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteReviewMutation,
        DeleteReviewMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteReviewMutation,
          DeleteReviewMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DeleteReviewDocument, options);
}
export type DeleteReviewMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >;
export const ReviewDocument = gql`
  query review($id: ID!) {
    review(id: $id) {
      id
      employee {
        id
        name
        surname
      }
      text
      authorName
      authorPhone
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useReviewQuery__
 *
 * To run a query within a Vue component, call `useReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useReviewQuery({
 *   id: // value for 'id'
 * });
 */
export function useReviewQuery(
  variables:
    | ReviewQueryVariables
    | VueCompositionApi.Ref<ReviewQueryVariables>
    | ReactiveFunction<ReviewQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<ReviewQuery, ReviewQueryVariables>(
    ReviewDocument,
    variables,
    options,
  );
}
export function useReviewLazyQuery(
  variables?:
    | ReviewQueryVariables
    | VueCompositionApi.Ref<ReviewQueryVariables>
    | ReactiveFunction<ReviewQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ReviewQuery, ReviewQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<ReviewQuery, ReviewQueryVariables>(
    ReviewDocument,
    variables,
    options,
  );
}
export type ReviewQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ReviewQuery, ReviewQueryVariables>;
export const SaveReviewDocument = gql`
  mutation saveReview($input: ReviewInput!) {
    saveReview(input: $input)
  }
`;

/**
 * __useSaveReviewMutation__
 *
 * To run a mutation, you first call `useSaveReviewMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveReviewMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveReviewMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveReviewMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveReviewMutation,
        SaveReviewMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveReviewMutation,
          SaveReviewMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveReviewMutation,
    SaveReviewMutationVariables
  >(SaveReviewDocument, options);
}
export type SaveReviewMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveReviewMutation,
    SaveReviewMutationVariables
  >;
export const BulkApproveReviewsDocument = gql`
  mutation bulkApproveReviews($ids: [ID!]!) {
    bulkApproveReviews(ids: $ids)
  }
`;

/**
 * __useBulkApproveReviewsMutation__
 *
 * To run a mutation, you first call `useBulkApproveReviewsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkApproveReviewsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkApproveReviewsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkApproveReviewsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkApproveReviewsMutation,
        BulkApproveReviewsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkApproveReviewsMutation,
          BulkApproveReviewsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkApproveReviewsMutation,
    BulkApproveReviewsMutationVariables
  >(BulkApproveReviewsDocument, options);
}
export type BulkApproveReviewsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkApproveReviewsMutation,
    BulkApproveReviewsMutationVariables
  >;
export const BulkDeclineReviewsDocument = gql`
  mutation bulkDeclineReviews($ids: [ID!]!) {
    bulkDeclineReviews(ids: $ids)
  }
`;

/**
 * __useBulkDeclineReviewsMutation__
 *
 * To run a mutation, you first call `useBulkDeclineReviewsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeclineReviewsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeclineReviewsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeclineReviewsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeclineReviewsMutation,
        BulkDeclineReviewsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeclineReviewsMutation,
          BulkDeclineReviewsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeclineReviewsMutation,
    BulkDeclineReviewsMutationVariables
  >(BulkDeclineReviewsDocument, options);
}
export type BulkDeclineReviewsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeclineReviewsMutation,
    BulkDeclineReviewsMutationVariables
  >;
export const BulkDeleteReviewsDocument = gql`
  mutation bulkDeleteReviews($ids: [ID!]!) {
    bulkDeleteReviews(ids: $ids)
  }
`;

/**
 * __useBulkDeleteReviewsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteReviewsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteReviewsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteReviewsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteReviewsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteReviewsMutation,
        BulkDeleteReviewsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteReviewsMutation,
          BulkDeleteReviewsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteReviewsMutation,
    BulkDeleteReviewsMutationVariables
  >(BulkDeleteReviewsDocument, options);
}
export type BulkDeleteReviewsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteReviewsMutation,
    BulkDeleteReviewsMutationVariables
  >;
export const ReviewsDocument = gql`
  query reviews(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
    $filter: ReviewsFilterInput
  ) {
    reviews(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
      filter: $filter
    ) {
      totalCount
      nodes {
        id
        employee {
          id
          name
          surname
        }
        text
        authorName
        authorPhone
        status
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a Vue component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useReviewsQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 *   filter: // value for 'filter'
 * });
 */
export function useReviewsQuery(
  variables:
    | ReviewsQueryVariables
    | VueCompositionApi.Ref<ReviewsQueryVariables>
    | ReactiveFunction<ReviewsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    variables,
    options,
  );
}
export function useReviewsLazyQuery(
  variables:
    | ReviewsQueryVariables
    | VueCompositionApi.Ref<ReviewsQueryVariables>
    | ReactiveFunction<ReviewsQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ReviewsQuery, ReviewsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    variables,
    options,
  );
}
export type ReviewsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<ReviewsQuery, ReviewsQueryVariables>;
export const StoriesDocument = gql`
  query stories(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    stories(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        category
        title
        teaser
        contentBlocks {
          type
          data
          isVisible
        }
        cover {
          id
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
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useStoriesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function useStoriesQuery(
  variables:
    | StoriesQueryVariables
    | VueCompositionApi.Ref<StoriesQueryVariables>
    | ReactiveFunction<StoriesQueryVariables> = {},
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
    variables,
    options,
  );
}
export function useStoriesLazyQuery(
  variables:
    | StoriesQueryVariables
    | VueCompositionApi.Ref<StoriesQueryVariables>
    | ReactiveFunction<StoriesQueryVariables> = {},
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
    variables,
    options,
  );
}
export type StoriesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<StoriesQuery, StoriesQueryVariables>;
export const DeleteStoryDocument = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id)
  }
`;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteStoryMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStoryMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteStoryMutation,
        DeleteStoryMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteStoryMutation,
          DeleteStoryMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteStoryMutation,
    DeleteStoryMutationVariables
  >(DeleteStoryDocument, options);
}
export type DeleteStoryMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteStoryMutation,
    DeleteStoryMutationVariables
  >;
export const SaveStoryDocument = gql`
  mutation saveStory($input: StoryInput!) {
    saveStory(input: $input)
  }
`;

/**
 * __useSaveStoryMutation__
 *
 * To run a mutation, you first call `useSaveStoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveStoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveStoryMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveStoryMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveStoryMutation,
        SaveStoryMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveStoryMutation,
          SaveStoryMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveStoryMutation,
    SaveStoryMutationVariables
  >(SaveStoryDocument, options);
}
export type SaveStoryMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveStoryMutation,
    SaveStoryMutationVariables
  >;
export const StoryDocument = gql`
  query story($id: ID!) {
    story(id: $id) {
      id
      category
      title
      teaser
      contentBlocks {
        type
        data
        isVisible
      }
      cover {
        id
        url
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
export const DeleteTaskDocument = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteTaskMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteTaskMutation,
        DeleteTaskMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteTaskMutation,
          DeleteTaskMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >(DeleteTaskDocument, options);
}
export type DeleteTaskMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >;
export const SaveTaskDocument = gql`
  mutation saveTask($input: TaskInput!) {
    saveTask(input: $input)
  }
`;

/**
 * __useSaveTaskMutation__
 *
 * To run a mutation, you first call `useSaveTaskMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveTaskMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveTaskMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveTaskMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveTaskMutation,
        SaveTaskMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveTaskMutation,
          SaveTaskMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveTaskMutation,
    SaveTaskMutationVariables
  >(SaveTaskDocument, options);
}
export type SaveTaskMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveTaskMutation,
    SaveTaskMutationVariables
  >;
export const TaskDocument = gql`
  query task($id: ID!) {
    task(id: $id) {
      id
      assignee {
        id
        name
        surname
        patronymic
      }
      internalNumber
      isCompleted
      isDeleted
      isHot
      lead {
        id
        name
        surname
        patronymic
      }
      property {
        id
        title
      }
      reporter {
        id
        name
        surname
        patronymic
      }
      startDate
      tag
      title
      contact {
        id
        name
        surname
        patronymic
      }
      updatedAt
      contactPhone
      createdAt
      deal {
        id
        internalNumber
      }
      details
      durationDays
      durationHours
      endDate
    }
  }
`;

/**
 * __useTaskQuery__
 *
 * To run a query within a Vue component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskQuery({
 *   id: // value for 'id'
 * });
 */
export function useTaskQuery(
  variables:
    | TaskQueryVariables
    | VueCompositionApi.Ref<TaskQueryVariables>
    | ReactiveFunction<TaskQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    variables,
    options,
  );
}
export function useTaskLazyQuery(
  variables?:
    | TaskQueryVariables
    | VueCompositionApi.Ref<TaskQueryVariables>
    | ReactiveFunction<TaskQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TaskQuery, TaskQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    variables,
    options,
  );
}
export type TaskQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<TaskQuery, TaskQueryVariables>;
export const BulkDeleteTasksDocument = gql`
  mutation bulkDeleteTasks($ids: [ID!]!) {
    bulkDeleteTasks(ids: $ids)
  }
`;

/**
 * __useBulkDeleteTasksMutation__
 *
 * To run a mutation, you first call `useBulkDeleteTasksMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteTasksMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBulkDeleteTasksMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteTasksMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        BulkDeleteTasksMutation,
        BulkDeleteTasksMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          BulkDeleteTasksMutation,
          BulkDeleteTasksMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    BulkDeleteTasksMutation,
    BulkDeleteTasksMutationVariables
  >(BulkDeleteTasksDocument, options);
}
export type BulkDeleteTasksMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    BulkDeleteTasksMutation,
    BulkDeleteTasksMutationVariables
  >;
export const TasksDocument = gql`
  query tasks(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $sort: Sort
    $search: String
    $filter: TaskFilter
  ) {
    tasks(
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
        assignee {
          id
          name
          surname
          patronymic
        }
        internalNumber
        isCompleted
        isDeleted
        isHot
        lead {
          id
          name
          surname
          patronymic
        }
        property {
          id
          title
        }
        reporter {
          id
          name
          surname
          patronymic
        }
        startDate
        tag
        title
        contact {
          id
          name
          surname
          patronymic
        }
        updatedAt
        contactPhone
        createdAt
        deal {
          id
          internalNumber
        }
        details
        durationDays
        durationHours
        endDate
      }
    }
  }
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a Vue component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTasksQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   sort: // value for 'sort'
 *   search: // value for 'search'
 *   filter: // value for 'filter'
 * });
 */
export function useTasksQuery(
  variables:
    | TasksQueryVariables
    | VueCompositionApi.Ref<TasksQueryVariables>
    | ReactiveFunction<TasksQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    variables,
    options,
  );
}
export function useTasksLazyQuery(
  variables:
    | TasksQueryVariables
    | VueCompositionApi.Ref<TasksQueryVariables>
    | ReactiveFunction<TasksQueryVariables> = {},
  options:
    | VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    variables,
    options,
  );
}
export type TasksQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<TasksQuery, TasksQueryVariables>;
export const DeleteVacancyDocument = gql`
  mutation deleteVacancy($id: ID!) {
    deleteVacancy(id: $id)
  }
`;

/**
 * __useDeleteVacancyMutation__
 *
 * To run a mutation, you first call `useDeleteVacancyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVacancyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteVacancyMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVacancyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteVacancyMutation,
        DeleteVacancyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteVacancyMutation,
          DeleteVacancyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteVacancyMutation,
    DeleteVacancyMutationVariables
  >(DeleteVacancyDocument, options);
}
export type DeleteVacancyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    DeleteVacancyMutation,
    DeleteVacancyMutationVariables
  >;
export const VacanciesDocument = gql`
  query vacancies(
    $ids: [ID!]
    $start: Int
    $limit: Int
    $search: String
    $sort: Sort
  ) {
    vacancies(
      ids: $ids
      start: $start
      limit: $limit
      search: $search
      sort: $sort
    ) {
      totalCount
      nodes {
        id
        title
        description
        experience
        salary
        schedule
        publicationStatus
        createdAt
        updatedAt
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
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVacanciesQuery({
 *   ids: // value for 'ids'
 *   start: // value for 'start'
 *   limit: // value for 'limit'
 *   search: // value for 'search'
 *   sort: // value for 'sort'
 * });
 */
export function useVacanciesQuery(
  variables:
    | VacanciesQueryVariables
    | VueCompositionApi.Ref<VacanciesQueryVariables>
    | ReactiveFunction<VacanciesQueryVariables> = {},
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
    variables,
    options,
  );
}
export function useVacanciesLazyQuery(
  variables:
    | VacanciesQueryVariables
    | VueCompositionApi.Ref<VacanciesQueryVariables>
    | ReactiveFunction<VacanciesQueryVariables> = {},
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
  >(VacanciesDocument, variables, options);
}
export type VacanciesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<VacanciesQuery, VacanciesQueryVariables>;
export const SaveVacancyDocument = gql`
  mutation saveVacancy($input: VacancyInput!) {
    saveVacancy(input: $input)
  }
`;

/**
 * __useSaveVacancyMutation__
 *
 * To run a mutation, you first call `useSaveVacancyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveVacancyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveVacancyMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSaveVacancyMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveVacancyMutation,
        SaveVacancyMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveVacancyMutation,
          SaveVacancyMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SaveVacancyMutation,
    SaveVacancyMutationVariables
  >(SaveVacancyDocument, options);
}
export type SaveVacancyMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    SaveVacancyMutation,
    SaveVacancyMutationVariables
  >;
export const VacancyDocument = gql`
  query vacancy($id: ID!) {
    vacancy(id: $id) {
      id
      title
      description
      experience
      salary
      schedule
      publicationStatus
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useVacancyQuery__
 *
 * To run a query within a Vue component, call `useVacancyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVacancyQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useVacancyQuery({
 *   id: // value for 'id'
 * });
 */
export function useVacancyQuery(
  variables:
    | VacancyQueryVariables
    | VueCompositionApi.Ref<VacancyQueryVariables>
    | ReactiveFunction<VacancyQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<VacancyQuery, VacancyQueryVariables>(
    VacancyDocument,
    variables,
    options,
  );
}
export function useVacancyLazyQuery(
  variables?:
    | VacancyQueryVariables
    | VueCompositionApi.Ref<VacancyQueryVariables>
    | ReactiveFunction<VacancyQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<VacancyQuery, VacancyQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<VacancyQuery, VacancyQueryVariables>(
    VacancyDocument,
    variables,
    options,
  );
}
export type VacancyQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<VacancyQuery, VacancyQueryVariables>;
