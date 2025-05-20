<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between min-h-8 shrink-0">
    <h1 class="font-bold text-2xl">{{ title }}</h1>

    <div class="flex space-x-1 shrink-0">
      <slot />
    </div>
  </div>
</template>

<style></style>
