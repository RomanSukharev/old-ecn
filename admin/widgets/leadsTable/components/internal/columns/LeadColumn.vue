<script setup lang="ts">
import { LeadStatusEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getStatusText(status: LeadStatusEnum): string {
  switch (status) {
    case LeadStatusEnum.NEW:
      return "Новый";
    case LeadStatusEnum.IN_PROGRESS:
      return "В работе";
    case LeadStatusEnum.THINKING:
      return "Думает";
    case LeadStatusEnum.REFUSED:
      return "Отказ";
    case LeadStatusEnum.SUCCESS:
      return "Успех";
    default:
      return "-";
  }
}

function getStatusColor(status: LeadStatusEnum): string {
  switch (status) {
    case LeadStatusEnum.NEW:
      return "bg-gray-500";
    case LeadStatusEnum.IN_PROGRESS:
      return "bg-blue-300";
    case LeadStatusEnum.THINKING:
      return "bg-yellow-500";
    case LeadStatusEnum.REFUSED:
      return "bg-red-500";
    case LeadStatusEnum.SUCCESS:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}
</script>

<template>
  <div class="space-y-1">
    <NuxtLink
      :to="`/sales/leads/${data?.id}`"
      class="text-blue-600 hover:text-blue-800"
      target="_blank"
    >
      {{ data?.surname }}
      {{ data?.name }}
      {{ data?.patronymic }}
    </NuxtLink>

    <div class="flex space-x-1 items-center">
      <span
        class="w-1.5 h-1.5 rounded-full"
        :class="getStatusColor(data?.status)"
      ></span>

      <span class="text-gray-400 text-2xs">{{
        getStatusText(data?.status)
      }}</span>
    </div>
  </div>
</template>
