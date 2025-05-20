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
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    error: undefined,
    inline: true,
    required: false,
  },
);

const minValue = defineModel<number | null>("min");
const maxValue = defineModel<number | null>("max");

function onMinInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    minValue.value = null;
  } else {
    minValue.value = val;
  }
}

function onMaxInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    maxValue.value = null;
  } else {
    maxValue.value = val;
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
      <div class="flex items-center space-x-2">
        <div
          class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 items-center font-medium text-base"
          :class="{
            grow: inline,
            'border-gray-300': !error,
            'border-red-500': error,
          }"
        >
          <input
            :value="minValue"
            type="number"
            :placeholder="placeholder"
            class="w-full grow outline-none ring-0 placeholder-gray-400"
            @input="onMinInput"
          />
        </div>

        <div>-</div>

        <div
          class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 items-center font-medium text-base"
          :class="{
            grow: inline,
            'border-gray-300': !error,
            'border-red-500': error,
          }"
        >
          <input
            :value="maxValue"
            type="number"
            :placeholder="placeholder"
            class="w-full grow outline-none ring-0 placeholder-gray-400"
            @input="onMaxInput"
          />
        </div>
      </div>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>
