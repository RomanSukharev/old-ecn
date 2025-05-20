import { PublicationStatusEnum, QuarterEnum } from "~/shared/api/generated";

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
