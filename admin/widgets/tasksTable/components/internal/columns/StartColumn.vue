<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.startDate">
    {{ $dayjs(data?.startDate).format("DD.MM.YYYY HH:mm") }}
  </div>

  <div v-else>-</div>
</template>
