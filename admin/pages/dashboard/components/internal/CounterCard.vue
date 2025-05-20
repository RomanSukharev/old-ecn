<script setup lang="ts">
interface IProps {
  to: string;
  loading: boolean;
  value: number;
  title: string;
}

defineProps<IProps>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="border border-gray-200 rounded-xl p-3 flex space-x-4 hover:bg-gray-50"
  >
    <div class="bg-gray-200 w-12 h-12 rounded-full" />

    <div class="flex flex-col space-y-1">
      <div class="leading-tight">{{ loading ? "..." : value }}</div>

      <div class="text-gray-400">{{ title }}</div>
    </div>
  </NuxtLink>
</template>
