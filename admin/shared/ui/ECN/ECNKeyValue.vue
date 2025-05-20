<script lang="ts" setup>
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex space-x-5">
    <div class="w-30 text-gray-400 font-medium leading-snug">
      {{ label }}
    </div>

    <div class="text-gray-900 font-medium leading-snug">
      {{ value }}
    </div>
  </div>
</template>
