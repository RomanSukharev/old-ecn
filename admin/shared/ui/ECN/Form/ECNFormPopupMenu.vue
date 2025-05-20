<script lang="ts" setup>
withDefaults(
  defineProps<{
    outline?: boolean;
    small?: boolean;
    disabled?: boolean;
  }>(),
  {
    outline: false,
    small: false,
    disabled: false,
  },
);
</script>

<template>
  <div
    :class="[
      'flex items-center w-fit space-x-1 cursor-pointer border-none border-blue-600 whitespace-nowrap select-none',
      outline ? 'text-blue-600' : ' text-white',
      small
        ? 'text-xs leading-snug py-1.5 px-4'
        : 'text-base leading-tight py-3 px-6',
      disabled && 'cursor-not-allowed opacity-50',
    ]"
    :disabled="disabled"
  >
    <slot />Изменить статус
  </div>
</template>
