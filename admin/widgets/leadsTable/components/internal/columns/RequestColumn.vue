<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="max-w-32">{{ data?.request || "-" }}</div>
</template>
