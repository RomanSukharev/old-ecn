<script setup lang="ts">
import { PublicationStatusEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getStatusText(status: PublicationStatusEnum): string {
  switch (status) {
    case PublicationStatusEnum.PUBLISHED:
      return "Активна";
    case PublicationStatusEnum.DRAFT:
      return "Черновик";
    case PublicationStatusEnum.UNPUBLISHED:
      return "Неактивна";
    default:
      return "-";
  }
}
</script>

<template>
  <div>{{ getStatusText(data?.publicationStatus) }}</div>
</template>
