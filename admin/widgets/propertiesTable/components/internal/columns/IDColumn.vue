<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.id">{{ data?.id }}</div>

  <div v-else>-</div>
</template>
