<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.address" class="space-y-1">
    {{ data?.address }}
  </div>

  <div v-else>-</div>
</template>
