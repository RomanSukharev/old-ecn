<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    inline: true,
    required: false,
  },
);

const value = defineModel<string | null>({
  get(v) {
    return typeof v === "string" ? new Date(v) : v;
  },
});
</script>

<template>
  <div :class="{ 'flex items-start space-x-2': inline }">
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

    <PrimeDatePicker
      v-model="value"
      show-icon
      fluid
      icon-display="input"
      date-format="dd.mm.yy"
      :placeholder="placeholder"
      class="w-full"
    />
  </div>
</template>
