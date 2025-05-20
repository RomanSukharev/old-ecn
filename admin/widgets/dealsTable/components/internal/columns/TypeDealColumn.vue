<script setup lang="ts">
import { DealTypeEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getContactType(deal: DealTypeEnum): string {
  switch (deal) {
    case DealTypeEnum.PURCHASE:
      return "Покупка";
    case DealTypeEnum.SALE:
      return "Продажа";
    default:
      return "Не указан";
  }
}
</script>

<template>
  <div class="space-y-1">
    {{ getContactType(data?.type) }}
  </div>
</template>
