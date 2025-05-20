<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="space-y-1">
    {{ data?.company }}
  </div>
</template>
