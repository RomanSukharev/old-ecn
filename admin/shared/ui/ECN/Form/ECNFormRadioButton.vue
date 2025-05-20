<script lang="ts" setup>
import { meetTypes } from "~/widgets/meetDrawer/constants";

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
const value = defineModel<string | null>();
</script>

<template>
  <div
    :class="{
      'flex space-x-2': inline,
      'w-full flex flex-col': !inline,
    }"
  >
    <!-- Метка -->
    <div
      class="relative text-xs pt-1 font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <!-- Поля для выбора типа встречи -->
    <div class="">
      <div
        v-for="type in meetTypes"
        :key="type.id"
        class="flex items-center mb-2"
      >
        <PrimeRadioButton
          v-model="value"
          :input-id="type.id"
          name="meetType"
          :value="type.id"
        />

        <label :for="type.id" class="ml-2">{{ type.title }}</label>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</div>
  </div>
</template>
