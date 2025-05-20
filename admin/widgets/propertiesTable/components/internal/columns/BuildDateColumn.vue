<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.readinessYear">{{ data?.readinessYear }}</div>

  <div v-else>-</div>
</template>
