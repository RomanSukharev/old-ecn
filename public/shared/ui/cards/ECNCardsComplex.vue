<template>
  <NuxtLink
    :to="`/complexes/${complex.id}`"
    class="rounded-xl border border-gray-200 overflow-hidden relative"
  >
    <img
      v-if="complex.images?.length"
      :src="complex.images[0].url"
      class="object-cover aspect-3/4 w-full"
    />

    <div v-else class="bg-gray-50 aspect-3/4"></div>

    <div class="absolute bottom-0 left-0 right-0 bg-white p-4">
      <div class="text-xl">{{ complex.title }}</div>

      <div v-if="complex.isReady" class="text-base whitespace-nowrap">
        Сдан{{ complex.readinessYear ? ` в ${complex.readinessYear} г.` : "" }}
      </div>

      <div v-else class="text-base whitespace-nowrap">
        <span v-if="complex.readinessQuarter"
          >{{ complex.readinessQuarter }} квартал</span
        >

        <span v-if="complex.readinessYear">
          &nbsp;{{ complex.readinessYear }} года</span
        >
      </div>

      <div class="text-xs text-gray-500 whitespace-nowrap mt-1">
        Застройщик {{ complex.developer?.title || "не указан" }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Complex } from "~/shared/api/generated";

defineProps<{
  complex: Complex;
}>();
</script>
