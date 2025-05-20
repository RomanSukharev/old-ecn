<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <!-- Tabs -->
    <div class="flex space-x-1 items-center mt-7">
      <NuxtLink
        v-for="item in propertyTypes"
        :key="item.id"
        :to="`/properties/${item.id.toLocaleLowerCase()}`"
        class="rounded p-2 text-xs text-gray-400"
        :class="[
          propType.toLocaleLowerCase() === item.id.toLocaleLowerCase()
            ? 'bg-gray-100'
            : 'bg-gray-50',
        ]"
      >
        {{ item.title }}
      </NuxtLink>
    </div>

    <div class="flex justify-between mt-7 mb-2">
      <div class="text-3xl font-bold">Коммерческая недвижимость</div>
    </div>

    <ECNFormToggle v-model="showMap" label="С картой" />

    <div class="flex space-x-5 mt-9 items-start">
      <div
        v-if="properties?.length"
        class="grid gap-5 grow"
        :class="[showMap ? 'basis-1/2 grid-cols-2' : 'grid-cols-3']"
      >
        <ECNCardsPropertyCommercial
          v-for="property in properties"
          :key="property.id"
          :property="property"
        />
      </div>

      <div v-else class="text-center text-gray-500 grow">
        По вашему запросу ничего не найдено.
      </div>

      <div
        v-if="showMap"
        class="rounded-xl overflow-hidden basis-1/2 sticky top-5"
      >
        <yandex-map
          height="90vh"
          width="100%"
          :settings="{
            location: {
              center: [65.541231, 57.152986],
              zoom: 12,
            },
          }"
        >
          <yandex-map-default-scheme-layer />

          <yandex-map-default-features-layer />
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PropertyTypeEnum,
  usePropertiesQuery,
  type PropertyFilter,
} from "~/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from "vue-yandex-maps";
import { propertyTypes } from "~/shared/constants";

const propType = "commercial";

const filters = reactive<PropertyFilter>({
  type: PropertyTypeEnum.COMMERCIAL,
});

const { result } = usePropertiesQuery(() => ({
  filter: filters,
}));
const properties = computed(() => result.value?.properties.nodes);

const showMap = ref(false);

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
