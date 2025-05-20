<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    inline: true,
    required: false,
    error: undefined,
    disabled: false,
  },
);

const value = defineModel<string | null>();
</script>

<template>
  <div
    :class="{
      'flex items-start space-x-2': inline,
      'w-full flex flex-col space-y-2': !inline,
    }"
  >
    <div
      class="relative text-xs font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 mt-3 border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="w-full space-y-0.5">
      <PrimeTextarea
        v-model="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed':
            disabled,
          'border-gray-300 text-gray-600': !disabled,
        }"
        rows="4"
        fluid
      />

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>
