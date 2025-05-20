<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    required: false,
    disabled: false,
  },
);

const value = defineModel<boolean>();
</script>

<template>
  <label class="flex gap-2 items-center justify-start cursor-pointer">
    <input
      v-model="value"
      :disabled="disabled"
      type="checkbox"
      class="w-5 h-5 rounded bg-gray-100 border-gray-300"
    />

    <span class="block text-base font-medium text-gray-900">{{ label }}</span>
  </label>
</template>
