<script setup lang="ts">
interface IProps {
  selectedItems: TAny[];
}

defineEmits<{
  close: [];
  delete: [ids: string[]];
}>();

defineProps<IProps>();
</script>

<template>
  <div
    v-if="selectedItems?.length"
    class="shrink-0 w-full px-5 py-2 h-12 bg-gray-300 flex items-center justify-between text-xs leading-snug font-medium space-x-4 rounded-md"
  >
    <div class="">Выбрано записей: {{ selectedItems.length }}</div>

    <div class="grow flex items-center justify-center space-x-4">
      <div
        class="text-center cursor-pointer text-red-500"
        @click="$emit('delete', selectedItems)"
      >
        Удалить
      </div>
    </div>

    <div class="cursor-pointer text-blue-600" @click="$emit('close')">
      Отмена
    </div>
  </div>
</template>
