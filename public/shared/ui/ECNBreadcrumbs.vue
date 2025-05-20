<template>
  <div class="flex space-x-1 items-start pt-3">
    <template v-for="(item, i) in items" :key="i">
      <NuxtLink :to="item.url" class="font-semibold text-xs text-blue-600">{{
        item.title
      }}</NuxtLink>

      <i-common-breadcrumbs-chevron />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  items: {
    url: RouteLocationRaw;
    title: string;
  }[];
}>();
</script>
