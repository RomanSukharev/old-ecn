<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.description" class="space-y-1">
    {{ data?.description }}
  </div>

  <div v-else>-</div>
</template>
