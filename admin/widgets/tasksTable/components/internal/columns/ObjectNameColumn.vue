<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/estate/properties/${data?.property?.id}`" target="_blank">
    <div class="space-y-1">
      <div
        v-if="data?.property?.title"
        class="text-blue-600 hover:text-blue-800"
      >
        {{ data?.property?.title }}
      </div>

      <div v-else>-</div>
    </div>
  </NuxtLink>
</template>
