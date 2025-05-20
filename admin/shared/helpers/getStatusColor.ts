import { DealStageEnum } from "../api/generated";

export function getStatusColor(status: DealStageEnum): string {
  switch (status) {
    case DealStageEnum.DEPOSIT_PAID:
      return "bg-sky-300";
    case DealStageEnum.SCHEDULED_FOR_DEAL:
      return "bg-sky-600";
    case DealStageEnum.MFC_REGISTRATION:
      return "bg-amber-300";
    case DealStageEnum.REGISTERED:
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
}
