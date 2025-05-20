<script setup lang="ts">
import { LeadSourceEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getLeadSource(source: LeadSourceEnum): string {
  switch (source) {
    case LeadSourceEnum.SOURCE:
      return "Источник";
    default:
      return "Не указан";
  }
}
</script>

<template>
  <div>{{ getLeadSource(data?.source) }}</div>
</template>
