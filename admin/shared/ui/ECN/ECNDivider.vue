<script setup lang="ts">
defineProps<{
  dense?: boolean;
}>();
</script>

<template>
  <div class="border-b border-gray-200" :class="[dense ? 'my-3' : 'my-10']" />
</template>
