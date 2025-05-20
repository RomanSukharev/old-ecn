<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.developer">{{ data?.developer.title }}</div>
</template>
