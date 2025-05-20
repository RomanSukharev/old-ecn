<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  {{ data?.url }}
</template>
