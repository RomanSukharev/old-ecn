<script setup lang="ts">
import { MortgageRequestStatusEnum } from "~/shared/api/generated";
defineProps<{
  data: TAny;
}>();

function getStatusText(status: MortgageRequestStatusEnum): string {
  switch (status) {
    case MortgageRequestStatusEnum.APPROVED:
      return "Одобрено";
    case MortgageRequestStatusEnum.OBJECT_APPROVAL:
      return "Согласование объекта";
    case MortgageRequestStatusEnum.REFUSAL:
      return "Отказ";
    case MortgageRequestStatusEnum.SENT:
      return "Продан";
    default:
      return "-";
  }
}

function getStatusColor(status: MortgageRequestStatusEnum): string {
  switch (status) {
    case MortgageRequestStatusEnum.APPROVED:
      return "bg-blue-500";
    case MortgageRequestStatusEnum.OBJECT_APPROVAL:
      return "bg-orange-300";
    case MortgageRequestStatusEnum.REFUSAL:
      return "bg-slate-950";
    case MortgageRequestStatusEnum.SENT:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}
</script>

<template>
  <NuxtLink :to="`/sales/mortgage-requests/${data?.id}`" target="_blank">
    <div class="space-y-1">
      <div class="text-blue-600 hover:text-blue-800">
        {{
          data?.internalNumber ? `${data.internalNumber}`.padStart(6, "0") : "-"
        }}
      </div>
    </div>
  </NuxtLink>

  <div class="flex space-x-1 items-center whitespace-nowrap pr-2">
    <div
      class="w-1.5 h-1.5 rounded-full"
      :class="getStatusColor(data?.status)"
    ></div>

    <div class="text-gray-400 text-2xs">
      {{ getStatusText(data?.status) }}
    </div>
  </div>
</template>
