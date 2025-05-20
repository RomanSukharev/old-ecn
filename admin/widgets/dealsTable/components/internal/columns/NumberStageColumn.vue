<script setup lang="ts">
import { DealStageEnum } from "~/shared/api/generated";
import { getStatusColor } from "~/shared/helpers/getStatusColor";

defineProps<{
  data: TAny;
}>();

function getDealStage(stage: DealStageEnum): string {
  switch (stage) {
    case DealStageEnum.DEPOSIT_PAID:
      return "Задаток";
    case DealStageEnum.MFC_REGISTRATION:
      return "На регистрации в МФЦ";
    case DealStageEnum.REGISTERED:
      return "Зарегестрировано (оплата комиссии)";
    case DealStageEnum.SCHEDULED_FOR_DEAL:
      return "Записаны на сделку";
    default:
      return "Не указан";
  }
}
</script>

<template>
  <div>
    <NuxtLink :to="`/sales/deals/${data?.id}`" target="_blank">
      <div class="space-y-1">
        <div class="text-blue-600 hover:text-blue-800">
          {{ "Сделка " + data?.internalNumber }}
        </div>
      </div>
    </NuxtLink>

    <div class="flex space-x-1 items-center">
      <span
        class="w-1.5 h-1.5 rounded-full"
        :class="getStatusColor(data?.stage)"
      ></span>

      <span class="text-gray-400 text-2xs">{{
        getDealStage(data?.stage)
      }}</span>
    </div>
  </div>
</template>
