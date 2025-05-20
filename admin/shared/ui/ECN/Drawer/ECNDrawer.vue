<script lang="ts" setup>
defineEmits<{
  close: [];
}>();

defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div
    class="absolute left-0 top-0 flex w-full h-screen max-h-screen max-w-full overflow-hidden z-50 bg-black bg-opacity-25 justify-end"
  >
    <div class="w-drawer flex flex-col bg-white shrink-0">
      <div class="flex justify-end p-1 shrink-0">
        <div class="p-4 cursor-pointer" @click="$emit('close')">
          <i-close />
        </div>
      </div>

      <div v-if="title" class="text-2xl font-bold px-10">
        {{ title }}
      </div>

      <div v-if="subtitle" class="text-base font-medium text-gray-400 px-10">
        {{ subtitle }}
      </div>

      <div class="grow overflow-hidden">
        <slot />
      </div>

      <div class="shrink-0 px-10 py-5 flex items-center justify-end space-x-2">
        <slot name="actions">
          <ECNButton outline @click="$emit('close')">Отмена</ECNButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style></style>
