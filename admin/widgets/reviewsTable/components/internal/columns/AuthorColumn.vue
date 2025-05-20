<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.authorName }}</div>

  <div>{{ data?.authorPhone }}</div>
</template>
