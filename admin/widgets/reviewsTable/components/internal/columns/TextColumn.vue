<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.text }}</div>
</template>
