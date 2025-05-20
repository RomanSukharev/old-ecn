<script setup lang="ts">
import { StoryCategoryEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getCategoryText(category: StoryCategoryEnum): string {
  switch (category) {
    case StoryCategoryEnum.COMPANY:
      return "Жизнь компании";
    case StoryCategoryEnum.ESTATE:
      return "Недвижимость";
    case StoryCategoryEnum.NEWS:
      return "Новости";
    default:
      return "-";
  }
}
</script>

<template>
  {{ getCategoryText(data?.category) }}
</template>
