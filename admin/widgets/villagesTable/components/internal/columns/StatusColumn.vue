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
      return "Опубликован";
    case PublicationStatusEnum.UNPUBLISHED:
      return "Не опубликован";
    default:
      return "-";
  }
}
</script>

<template>
  {{ getStatusText(data?.publicationStatus) }}
</template>
