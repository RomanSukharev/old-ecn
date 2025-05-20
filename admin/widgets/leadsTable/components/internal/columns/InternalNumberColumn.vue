<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <span>{{
    data?.internalNumber ? `${data.internalNumber}`.padStart(6, "0") : "-"
  }}</span>
</template>
