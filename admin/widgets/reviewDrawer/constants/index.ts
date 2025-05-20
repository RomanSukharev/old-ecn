import { ReviewStatusEnum } from "~/shared/api/generated";

export const reviewStatus = [
  {
    id: ReviewStatusEnum.NEW,
    title: "Новый",
  },
  {
    id: ReviewStatusEnum.APPROVED,
    title: "Подтверждён",
  },
  {
    id: ReviewStatusEnum.DECLINED,
    title: "Отклонён",
  },
];
