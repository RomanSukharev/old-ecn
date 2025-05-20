<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.address || "-" }}</div>
</template>
