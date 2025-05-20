<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholderDate?: string;
    placeholderTime?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    placeholderDate: undefined,
    placeholderTime: undefined,
    error: undefined,
    inline: true,
    required: false,
  },
);

const date = defineModel<string | null>({
  get(v) {
    return typeof v === "string" ? new Date(v) : v;
  },
});
</script>

<template>
  <div
    :class="{
      'flex items-center space-x-2': inline,
      'w-full flex flex-col': !inline,
    }"
  >
    <div
      class="relative text-xs font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="flex items-center space-x-2">
      <PrimeDatePicker
        v-model="date"
        show-icon
        show-time
        fluid
        icon-display="input"
        :placeholder="placeholderDate"
        date-format="dd.mm.yy"
        class="w-full"
      />
    </div>

    <div v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</div>
  </div>
</template>
