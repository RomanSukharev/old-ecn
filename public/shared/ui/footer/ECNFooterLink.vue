<template>
  <NuxtLink :to="to" class="text-xs text-blue-600 hover:text-blue-700 w-fit">{{
    label
  }}</NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
  label: string;
}>();
</script>
