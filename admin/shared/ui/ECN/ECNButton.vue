<script lang="ts" setup>
withDefaults(
  defineProps<{
    outline?: boolean;
    small?: boolean;
    disabled?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    title?: string;
    rounded?: boolean;
  }>(),
  {
    outline: false,
    small: false,
    disabled: false,
    leftIcon: undefined,
    rightIcon: undefined,
    title: undefined,
    rounded: false,
  },
);
</script>

<template>
  <div
    class="flex items-center w-fit space-x-1 cursor-pointer rounded-md border border-blue-600 whitespace-nowrap select-none"
    :class="{
      'bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-500':
        !outline,
      'text-blue-600 hover:bg-blue-50': outline,
      'text-xs leading-snug py-1.5 px-4': small,
      'text-base leading-tight py-3 px-6': !small,
      '!rounded-full !py-1 !px-1': rounded,
    }"
  >
    <NuxtIcon v-if="leftIcon" :icon="leftIcon" class="text-base !mb-0" />

    <span v-if="title">{{ title }}</span>

    <slot v-else />

    <NuxtIcon v-if="rightIcon" :icon="rightIcon" class="text-base" />
  </div>
</template>
