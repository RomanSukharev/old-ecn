<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <div class="flex justify-between mt-7 mb-2">
      <div class="text-3xl font-bold">ЖК</div>
    </div>

    <ECNFormToggle v-model="showMap" label="С картой" />

    <div class="flex space-x-5 mt-9 items-start">
      <div
        class="grid gap-5 grow"
        :class="[showMap ? 'basis-1/2 grid-cols-2' : 'grid-cols-3']"
      >
        <ECNCardsComplex
          v-for="complex in complexes"
          :key="complex.id"
          :complex="complex"
        />
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
import { useComplexesQuery } from "~/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from "vue-yandex-maps";

const { result } = useComplexesQuery();
const complexes = computed(() => result.value?.complexes.nodes);

const showMap = ref(false);

const breadcrumbs = [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/complexes",
    title: "Новостройки",
  },
];
</script>
