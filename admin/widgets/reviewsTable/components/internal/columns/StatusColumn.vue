<script setup lang="ts">
import { ReviewStatusEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getStatusText(status: ReviewStatusEnum): string {
  switch (status) {
    case ReviewStatusEnum.NEW:
      return "Новый";
    case ReviewStatusEnum.APPROVED:
      return "Подтверждён";
    case ReviewStatusEnum.DECLINED:
      return "Отклонён";
    default:
      return "-";
  }
}
</script>

<template>
  {{ getStatusText(data?.status) }}
</template>
