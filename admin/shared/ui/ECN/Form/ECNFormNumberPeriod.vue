<script lang="ts" setup>
defineEmits<{
  enter: [];
}>();

withDefaults(
  defineProps<{
    label?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    error: undefined,
    inline: true,
    required: false,
  },
);

const days = defineModel<number | null>("days");
const hours = defineModel<number | null>("hours");

function onInputDays(e: Event): void {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  days.value = isNaN(val) || val < 0 ? null : val;
}

function onInputHours(e: Event): void {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  hours.value = isNaN(val) || val < 0 || val > 23 ? null : val;
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
      <div class="flex space-x-2 items-center">
        <!-- Input for Days -->
        <div
          class="flex items-center rounded-md border border-gray-300 py-2 text-gray-600 font-medium text-base"
          :class="{
            'border-gray-300': !error,
            'border-red-500': error,
          }"
        >
          <input
            :value="days"
            type="number"
            class="outline-none ring-0 w-16 placeholder-gray-400 text-center"
            @input="onInputDays"
          />
        </div>

        <span class="text-gray-400 text-base">дней</span>

        <!-- Input for Hours -->
        <div
          class="flex items-center rounded-md border border-gray-300 py-2 text-gray-600 font-medium text-base"
          :class="{
            'border-gray-300': !error,
            'border-red-500': error,
          }"
        >
          <input
            :value="hours"
            type="number"
            class="outline-none ring-0 w-16 placeholder-gray-400 text-center"
            @input="onInputHours"
          />
        </div>

        <span class="text-gray-400 text-base">часов</span>
      </div>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>
