<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
    error?: string;
    items?: readonly TAny[];
    keyProperty?: string;
    displayProperty?: string;
    maxSelectedLabels?: number;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    inline: true,
    error: undefined,
    items: () => [],
    keyProperty: "id",
    displayProperty: "title",
    maxSelectedLabels: 3,
    disabled: false,
  },
);

const value = defineModel<TAny[]>();
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
        'w-30 shrink-0 mt-3 leading-snug border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="w-full space-y-0.5 overflow-hidden">
      <PrimeMultiSelect
        v-model="value"
        class="w-full"
        :options="items"
        :option-label="displayProperty"
        :option-value="keyProperty"
        :placeholder="placeholder"
        :max-selected-labels="maxSelectedLabels"
        :disabled="disabled"
        filter
      />

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>
