<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.details" class="space-y-1">{{ data?.details }}</div>

  <div v-else>-</div>
</template>
