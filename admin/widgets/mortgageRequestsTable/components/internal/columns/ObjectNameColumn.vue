<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/estate/properties/${data?.property?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.propertyID" class="text-blue-600 hover:text-blue-800">
        {{ data?.propertyID }}
      </div>
    </div>
  </NuxtLink>
</template>
