<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="">
    <div class="text-2xs text-gray-400">Создан</div>

    <div class="">{{ $dayjs(data.createdAt).format("DD.MM.YYYY") }}</div>

    <div class="text-2xs text-gray-400">Изменён</div>

    <div class="">{{ $dayjs(data.updatedAt).format("DD.MM.YYYY") }}</div>
  </div>
</template>
