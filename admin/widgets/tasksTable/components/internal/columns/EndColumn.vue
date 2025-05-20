<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.endDate">
    {{ $dayjs(data?.endDate).format("DD.MM.YYYY  HH:mm") }}
  </div>

  <div v-else>-</div>
</template>
