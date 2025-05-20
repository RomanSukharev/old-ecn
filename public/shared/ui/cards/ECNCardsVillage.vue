<template>
  <NuxtLink
    :to="`/villages/${village.id}`"
    class="select-none relative block rounded-xl border border-gray-200 overflow-hidden"
  >
    <img
      v-if="village.images?.length"
      :src="village.images[0].url"
      class="object-fill aspect-3/2 w-full"
    />

    <div v-else class="bg-gray-50 aspect-3/2"></div>

    <div class="p-4">
      <div class="text-xl">{{ village.title }}</div>

      <div class="text-2xs text-gray-500 mb-1">
        {{ village.address }}
      </div>

      <div v-if="village.isReady" class="text-base whitespace-nowrap">
        КП сдан{{
          village.readinessYear ? ` в ${village.readinessYear} г.` : ""
        }}
      </div>

      <div v-else class="text-base whitespace-nowrap">
        <span v-if="village.readinessQuarter"
          >{{ village.readinessQuarter }} квартал</span
        >

        <span v-if="village.readinessYear">
          &nbsp;{{ village.readinessYear }} года</span
        >
      </div>

      <div
        v-if="village.developer"
        class="text-xs text-gray-500 whitespace-nowrap mt-1"
      >
        Застройщик {{ village.developer.title }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Village } from "~/shared/api/generated";

defineProps<{
  village: Village;
}>();
</script>
