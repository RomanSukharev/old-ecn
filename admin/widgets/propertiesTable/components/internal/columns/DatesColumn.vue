<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="">
    <div class="text-gray-500">Создан:</div>

    <div class="">
      {{ $dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm:ss") }}
    </div>
  </div>

  <div class="">
    <div class="text-gray-500">Обновлён:</div>

    <div class="">
      {{ $dayjs(data?.updatedAt).format("DD.MM.YYYY HH:mm:ss") }}
    </div>
  </div>
</template>
