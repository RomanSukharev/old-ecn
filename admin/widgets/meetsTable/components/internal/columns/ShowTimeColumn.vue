<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div
    v-if="data?.dateTime"
    class="text-blue-600 hover:text-blue-800 font-medium"
  >
    {{ data?.createdAt ? $dayjs(data?.dateTime).format("DD.MM.YYYY") : "-" }}
  </div>

  <div>
    {{ data?.createdAt ? $dayjs(data?.dateTime).format("HH:mm") : "-" }}
  </div>
</template>
