<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    inline: true,
    required: false,
  },
);
</script>

<template>
  <div :class="{ 'flex items-start space-x-2': inline }">
    <div
      class="relative text-xs leading-snug font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 leading-loose border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="flex flex-col gap-3" :class="{ grow: inline }">
      <slot />
    </div>
  </div>
</template>
