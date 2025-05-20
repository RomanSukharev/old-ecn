<template>
  <label class="w-fit relative flex items-center cursor-pointer select-none">
    <input
      v-model="value"
      :disabled="disabled"
      type="checkbox"
      class="sr-only peer"
    />

    <span
      class="w-10 h-5 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:top-[2px] after:left-[2px] after:h-4 after:w-4 peer peer-checked:after:left-auto relative peer-checked:after:right-[2px] after:content-[''] after:absolute after:bg-white after:rounded-full"
    />

    <span class="ml-2 text-base font-medium leading-tight text-gray-900">{{
      label
    }}</span>
  </label>
</template>

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

const value = defineModel<boolean | null>();
</script>
