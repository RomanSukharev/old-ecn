<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/estate/properties/${data?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.property?.id" class="text-blue-600 hover:text-blue-800">
        {{ data?.property?.title }}
      </div>
    </div>
  </NuxtLink>
</template>
