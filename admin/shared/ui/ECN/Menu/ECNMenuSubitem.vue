<script lang="ts" setup>
defineEmits<{
  click: [];
}>();

defineProps<{
  title: string;
  to?: string;
}>();
</script>

<template>
  <div>
    <NuxtLink
      :to="to"
      active-class="text-gray-400"
      class="block pl-7 pr-4 py-2.5 font-medium text-2xs leading-tight cursor-pointer select-none hover:bg-gray-200"
      @click="$emit('click')"
    >
      {{ title }}
    </NuxtLink>
  </div>
</template>

<style></style>
