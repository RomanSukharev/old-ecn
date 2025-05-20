<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.complex">{{ data?.complex.title }}</div>
</template>
