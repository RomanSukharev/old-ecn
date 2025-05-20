<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <!-- Tabs -->
    <div class="flex space-x-1 items-center mt-7">
      <NuxtLink
        v-for="item in propertyTypes"
        :key="item.id"
        :to="`/properties/${item.id.toLocaleLowerCase()}`"
        class="rounded bg-gray-50 p-2 text-xs text-gray-400"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { propertyTypes } from "~/shared/constants";

const breadcrumbs = [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/properties",
    title: "Каталог недвижимости",
  },
];
</script>
