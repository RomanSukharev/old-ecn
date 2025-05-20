<script setup lang="ts">
import { VacancyScheduleEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getScheduleText(schedule: VacancyScheduleEnum): string {
  switch (schedule) {
    case VacancyScheduleEnum.FULL_TIME:
      return "Полная занятость";
    case VacancyScheduleEnum.PART_TIME:
      return "Частичная занятость";
    default:
      return "-";
  }
}
</script>

<template>
  <div>{{ getScheduleText(data?.schedule) }}</div>
</template>
