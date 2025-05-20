<template>
  <NuxtLink
    :to="`/properties/suburban/${property.id}`"
    class="rounded-xl border border-gray-200 overflow-hidden relative flex space-x-4"
  >
    <img
      v-if="property.images?.length"
      :src="property.images[0].url"
      class="object-cover aspect-video h-[150px]"
    />

    <div v-else class="bg-gray-50 aspect-video h-[150px]"></div>

    <div class="bg-white p-4">
      <div class="text-xl">{{ property.title }}</div>

      <div class="text-2xs text-gray-400">{{ property.address }}</div>

      <div class="flex space-x-4 items-center">
        <div v-if="property.price" class="text-lg font-bold">
          {{
            `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.price)} ₽`
          }}
        </div>

        <div v-if="property?.pricePerMeter" class="text-2xs text-gray-500">
          {{
            `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.pricePerMeter)} ₽/м²`
          }}
        </div>

        <div v-if="property?.pricePerAr" class="text-2xs text-gray-500">
          {{
            `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.pricePerAr)} ₽/сот`
          }}
        </div>
      </div>

      <div class="flex space-x-2 items-center text-xs mt-2 mb-4 text-gray-500">
        <div v-if="property.rooms">{{ property.rooms }}-комн.</div>

        <div class="w-1 h-1 rounded-full bg-gray-400"></div>

        <div v-if="property.floor">
          {{ property.floor }}
          этаж{{ property.floors && ` из ${property.floors}` }}
        </div>

        <div class="w-1 h-1 rounded-full bg-gray-400"></div>

        <div v-if="property.readinessYear">
          {{ property.readinessYear }} год
        </div>
      </div>

      <div class="flex space-x-2 items-center">
        <div
          v-if="property.rehabType"
          class="rounded-lg bg-gray-200 text-gray-500 text-2xs px-2 py-0.5"
        >
          {{ rehabTypes.find((i) => i.id === property?.rehabType)?.title }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Property } from "~/shared/api/generated";
import { rehabTypes } from "~/shared/constants";

defineProps<{
  property: Property;
}>();
</script>
