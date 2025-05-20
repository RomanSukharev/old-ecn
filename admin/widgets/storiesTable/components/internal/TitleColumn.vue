<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    class="text-blue-600 font-medium"
    :to="`/content/stories/${data?.id}`"
    >{{ data?.title }}</NuxtLink
  >
</template>
