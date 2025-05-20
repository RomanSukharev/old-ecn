<script setup lang="ts">
import { TaskStatusEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getStatusText(status: TaskStatusEnum): string {
  switch (status) {
    case TaskStatusEnum.NEW:
      return "Новый";
    case TaskStatusEnum.IN_PROGRESS:
      return "В работе";
    case TaskStatusEnum.CLOSED:
      return "Закрыта";
    case TaskStatusEnum.OVERDUE:
      return "Просрочена";
    case TaskStatusEnum.COMPLETED:
      return "Завершена";
    default:
      return "не указан";
  }
}

function getStatusColor(status: TaskStatusEnum): string {
  switch (status) {
    case TaskStatusEnum.NEW:
      return "bg-gray-500";
    case TaskStatusEnum.IN_PROGRESS:
      return "bg-blue-300";
    case TaskStatusEnum.CLOSED:
      return "bg-yellow-500";
    case TaskStatusEnum.OVERDUE:
      return "bg-red-500";
    case TaskStatusEnum.COMPLETED:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}
</script>

<template>
  <div class="flex flex-col relative">
    <div
      v-if="data?.isHot"
      class="flex items-center space-x-1 absolute top-0 right-0"
    >
      <i-label class="h-3.5" />
    </div>

    <div
      class="text-blue-600 space-y-1 mt-2.5 mr-3 cursor-pointer hover:text-blue-800"
      @click="$emit('edit', data?.id)"
    >
      {{ data?.title }}
    </div>

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
