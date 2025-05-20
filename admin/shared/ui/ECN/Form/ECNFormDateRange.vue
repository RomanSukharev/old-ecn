<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholderFrom?: string;
    placeholderTo?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    placeholderFrom: undefined,
    placeholderTo: undefined,
    error: undefined,
    inline: true,
    required: false,
  },
);

const minDate = defineModel<string | null>("minDate");
const maxDate = defineModel<string | null>("maxDate");

const onMinDateInput = (date: Date | null): void => {
  if (date && maxDate.value && new Date(date) > new Date(maxDate.value)) {
    minDate.value = maxDate.value;
  } else {
    minDate.value = date ? date.toISOString() : null;
  }
};

const onMaxDateInput = (date: Date | null): void => {
  if (date && minDate.value && new Date(date) < new Date(minDate.value)) {
    maxDate.value = minDate.value;
  } else {
    maxDate.value = date ? date.toISOString() : null;
  }
};
</script>

<template>
  <div
    :class="{
      'flex items-center space-x-2 ': inline,
      'w-full flex': !inline,
    }"
  >
    <!-- Метка -->
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

    <!-- Поля для выбора дат -->
    <div class="flex items-center space-x-2">
      <!-- Дата от -->
      <div
        class="relative text-base font-base items-center text-gray-400"
        :class="{ 'border-red-500': error, 'border-gray-300': !error }"
      >
        <PrimeDatePicker
          v-model="minDate"
          show-icon
          fluid
          icon-display="input"
          :placeholder="placeholderFrom"
          date-format="dd.mm.yy"
          class="w-full"
          @input="onMinDateInput"
        />
      </div>

      <div>-</div>

      <!-- Дата до -->
      <div
        class="rounded-md flex items-center font-base text-gray-400"
        :class="{ 'border-red-500': error, 'border-gray-300': !error }"
      >
        <PrimeDatePicker
          v-model="maxDate"
          show-icon
          fluid
          icon-display="input"
          :placeholder="placeholderTo"
          date-format="dd.mm.yy"
          class="w-full"
          @input="onMaxDateInput"
        />
      </div>
    </div>

    <div v-if="error" class="text-red-500 text-xs">{{ error }}</div>
  </div>
</template>
