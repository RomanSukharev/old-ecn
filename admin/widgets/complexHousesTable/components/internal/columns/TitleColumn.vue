<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/estate/complexHouses/${data?.id}`" class="text-blue-600">{{
    data?.title
  }}</NuxtLink>
</template>
