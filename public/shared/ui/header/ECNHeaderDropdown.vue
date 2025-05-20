<template>
  <div class="relative">
    <div
      class="flex items-center space-x-1 text-gray-900 hover:text-blue-600 cursor-pointer"
      @click="isOpen = true"
    >
      <span class="font-medium text-base">{{ title }}</span>

      <i-common-header-chevron-down />
    </div>

    <div
      v-if="isOpen"
      class="absolute left-0 bottom-0 w-[320px] z-10"
      @click="isOpen = false"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const isOpen = ref(false);
</script>
