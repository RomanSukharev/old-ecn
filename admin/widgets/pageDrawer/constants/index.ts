import { PublicationStatusEnum } from "~/shared/api/generated";

export const pageStatus = [
  {
    id: PublicationStatusEnum.DRAFT,
    title: "Черновик",
  },
  {
    id: PublicationStatusEnum.PUBLISHED,
    title: "Опубликована",
  },
  {
    id: PublicationStatusEnum.UNPUBLISHED,
    title: "Не опубликована",
  },
];
