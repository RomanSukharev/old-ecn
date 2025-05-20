<script lang="ts" setup>
defineEmits<{
  enter: [];
}>();

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
    disabled?: boolean; // Новое свойство
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    error: undefined,
    inline: true,
    required: false,
    disabled: false, // Значение по умолчанию
  },
);

const value = defineModel<number | null>();

function onInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    value.value = null;
  } else {
    value.value = val;
  }
}
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

    <div class="flex flex-col space-y-0.5" :class="{ grow: inline }">
      <div
        class="rounded-md border px-3 py-2 flex space-x-2 font-medium text-base"
        :class="{
          grow: inline,
          'border-gray-300 text-gray-600': !disabled,
          'border-red-500': error,
          'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed':
            disabled,
        }"
      >
        <input
          :value="value"
          type="number"
          :placeholder="placeholder"
          class="grow outline-none ring-0 placeholder-gray-400"
          :disabled="disabled"
          @input="onInput"
        />
      </div>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>
