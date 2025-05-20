import {
  VacancyScheduleEnum,
  PublicationStatusEnum,
} from "~/shared/api/generated";

export const vacancySchedule = [
  {
    id: VacancyScheduleEnum.FULL_TIME,
    title: "Полный день",
  },
  {
    id: VacancyScheduleEnum.PART_TIME,
    title: "Частичная занятость",
  },
];

export const vacancyStatus = [
  {
    id: PublicationStatusEnum.DRAFT,
    title: "Черновик",
  },
  {
    id: PublicationStatusEnum.PUBLISHED,
    title: "Активна",
  },
  {
    id: PublicationStatusEnum.UNPUBLISHED,
    title: "Не активна",
  },
];
