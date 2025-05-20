<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.address">{{ data?.address }}</div>

  <div v-else>-</div>
</template>
