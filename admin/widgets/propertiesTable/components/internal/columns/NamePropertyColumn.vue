<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>
    <NuxtLink
      v-if="data?.title"
      :to="`/estate/properties/${data?.id}`"
      class="text-blue-600 hover:text-blue-800"
    >
      {{ data?.title }}
    </NuxtLink>

    <div v-else>-</div>
  </div>
</template>
