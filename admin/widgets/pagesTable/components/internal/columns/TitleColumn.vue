<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.title }}</div>
</template>
