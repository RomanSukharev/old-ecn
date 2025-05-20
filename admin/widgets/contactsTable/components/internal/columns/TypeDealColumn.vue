<script setup lang="ts">
import { CounterPartyTypeEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getContactType(deal: CounterPartyTypeEnum): string {
  switch (deal) {
    case CounterPartyTypeEnum.SALER:
      return "Продажа";
    case CounterPartyTypeEnum.BUYER:
      return "Покупка";
    case CounterPartyTypeEnum.BOTH:
      return "Продажа и покупка";
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
