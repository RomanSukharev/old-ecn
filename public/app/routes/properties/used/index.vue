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

    <div class="shadow-md rounded-xl p-6 mb-5 mt-5">
      <div class="flex space-x-5">
        <div class="">
          <div class="text-xs text-gray-500 mb-1">Комнатность</div>

          <div class="flex space-x-1 text-xs">
            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{
                '!bg-gray-200': filter.subType == PropertySubTypeEnum.STUDIO,
              }"
              @click="toggleStudio"
            >
              Студия
            </div>

            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.minRooms === 1 }"
              @click="toggleRoom(1)"
            >
              1
            </div>

            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.minRooms === 2 }"
              @click="toggleRoom(2)"
            >
              2
            </div>

            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.minRooms === 3 }"
              @click="toggleRoom(3)"
            >
              3
            </div>

            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.minRooms === 4 }"
              @click="toggleRoom(4)"
            >
              4
            </div>

            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.minRooms === 5 }"
              @click="toggleRoom(5)"
            >
              5
            </div>
          </div>
        </div>

        <div class="">
          <div class="text-xs text-gray-500 mb-1">Стоимость</div>

          <div class="flex space-x-1 items-center">
            <div
              class="rounded-md border border-gray-200 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
            >
              <input
                :value="filter.minPrice"
                type="number"
                class="grow outline-none ring-0 placeholder-gray-400 w-full"
                placeholder="0"
                @input="onMinPriceInput"
              />
            </div>

            <div class="">-</div>

            <div
              class="rounded-md border border-gray-200 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
            >
              <input
                :value="filter.maxPrice"
                type="number"
                class="grow outline-none ring-0 placeholder-gray-400 w-full"
                placeholder="0"
                @input="onMaxPriceInput"
              />
            </div>
          </div>
        </div>

        <div class="">
          <div class="text-xs text-gray-500 mb-1">Площадь</div>

          <div class="flex space-x-1 items-center">
            <div
              class="rounded-md border border-gray-200 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
            >
              <input
                :value="filter.minArea"
                type="number"
                class="grow outline-none ring-0 placeholder-gray-400 w-full"
                placeholder="0"
                @input="onMinAreaInput"
              />
            </div>

            <div class="">-</div>

            <div
              class="rounded-md border border-gray-200 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
            >
              <input
                :value="filter.maxArea"
                type="number"
                class="grow outline-none ring-0 placeholder-gray-400 w-full"
                placeholder="0"
                @input="onMaxAreaInput"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-100 my-4"></div>

      <div class="flex space-x-5 items-center">
        <div
          class="flex items-center w-fit space-x-1 cursor-pointer rounded-md border border-blue-600 text-blue-600 whitespace-nowrap select-none text-xs leading-snug py-2 px-4"
        >
          Расширенный фильтр <i-common-filter class="ml-1" />
        </div>

        <div
          class="flex text-xs text-blue-600 cursor-pointer"
          @click="resetFilter"
        >
          Очистить <i-common-clear class="ml-1" />
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-7 mb-2">
      <div class="text-3xl font-bold">Вторичная недвижимость</div>
    </div>

    <ECNFormToggle v-model="showMap" label="С картой" />

    <div class="flex space-x-5 mt-9 items-start">
      <div
        v-if="properties?.length"
        class="grid gap-5 grow"
        :class="[showMap ? 'basis-1/2 grid-cols-2' : 'grid-cols-3']"
      >
        <ECNCardsPropertyUsed
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
  PropertySubTypeEnum,
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

const propType = "used";

const filter = reactive<PropertyFilter>({
  type: PropertyTypeEnum.USED,
});

const { result } = usePropertiesQuery(() => ({
  filter,
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

function onMinPriceInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    filter.minPrice = undefined;
  } else {
    filter.minPrice = val;
  }
}

function onMaxPriceInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    filter.maxPrice = undefined;
  } else {
    filter.maxPrice = val;
  }
}

function onMinAreaInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    filter.minArea = undefined;
  } else {
    filter.minArea = val;
  }
}

function onMaxAreaInput(e: Event): void {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (isNaN(val)) {
    filter.maxArea = undefined;
  } else {
    filter.maxArea = val;
  }
}

function toggleStudio(): void {
  if (!filter.subType) {
    filter.subType = PropertySubTypeEnum.STUDIO;
  } else {
    filter.subType = undefined;
  }
  filter.minRooms = undefined;
  filter.maxRooms = undefined;
}

function toggleRoom(r: number): void {
  filter.subType = undefined;
  if (filter.minRooms != r) {
    filter.minRooms = r;
    filter.maxRooms = r;
  } else {
    filter.minRooms = undefined;
    filter.maxRooms = undefined;
  }
}

function resetFilter(): void {
  filter.minRooms = undefined;
  filter.maxRooms = undefined;
  filter.subType = undefined;
  filter.minPrice = undefined;
  filter.maxPrice = undefined;
  filter.minArea = undefined;
  filter.maxArea = undefined;
}
</script>
