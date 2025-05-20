<script setup lang="ts">
import { PublicationStatusEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getStatusText(status: PublicationStatusEnum): string {
  switch (status) {
    case PublicationStatusEnum.DRAFT:
      return "Черновик";
    case PublicationStatusEnum.PUBLISHED:
      return "Опубликована";
    case PublicationStatusEnum.UNPUBLISHED:
      return "Не опубликована";
    default:
      return "-";
  }
}
</script>

<template>
  <div>{{ getStatusText(data?.status) }}</div>
</template>
