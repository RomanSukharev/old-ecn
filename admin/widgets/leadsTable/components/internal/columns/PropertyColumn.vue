<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.sellerAgent || "-" }}</div>
</template>
