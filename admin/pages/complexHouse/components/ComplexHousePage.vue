<script lang="ts" setup>
import {
  PublicationStatusEnum,
  useComplexHouseQuery,
  usePropertiesQuery,
  type PropertyFilter,
} from "@/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from "vue-yandex-maps";
import { rehabTypes } from "~/shared/constants";

const config = useRuntimeConfig();

const route = useRoute();
const id = route.params.id as string;

const filter = reactive<PropertyFilter>({
  complexHouseID: id,
  minRooms: undefined,
  maxRooms: undefined,
  isStudio: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minArea: undefined,
  maxArea: undefined,
});

const showComplexHouseDrawer = ref(false);
const showPropertyFilterDrawer = ref(false);

const { result: data, refetch: refresh } = useComplexHouseQuery({
  id,
});

const complexHouse = computed(() => data.value?.complexHouse);

const { result: propertiesData } = usePropertiesQuery(
  () => ({
    filter: filter,
  }),
  { debounce: 500 },
);

const properties = computed(() => propertiesData.value?.properties.nodes);

async function onComplexHouseSave(): Promise<void> {
  await refresh();
}

async function onComplexHouseDelete(): Promise<void> {
  await refresh();
}

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
  if (!filter.isStudio) {
    filter.isStudio = true;
  } else {
    filter.isStudio = undefined;
  }
  filter.minRooms = undefined;
  filter.maxRooms = undefined;
}

function toggleRoom(r: number): void {
  filter.isStudio = undefined;
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
  filter.isStudio = undefined;
  filter.minPrice = undefined;
  filter.maxPrice = undefined;
  filter.minArea = undefined;
  filter.maxArea = undefined;
}

function onApplyFilter(filterResult: PropertyFilter): void {
  filter.deal = filterResult?.deal;
  filter.isHot = filterResult?.isHot;

  filter.minPrice = filterResult?.minPrice;
  filter.maxPrice = filterResult?.maxPrice;
  filter.minArea = filterResult?.minArea;
  filter.maxArea = filterResult?.maxArea;
  filter.minLandArea = filterResult?.minLandArea;
  filter.maxLandArea = filterResult?.maxLandArea;
  filter.minPricePerMeter = filterResult?.minPricePerMeter;
  filter.maxPricePerMeter = filterResult?.maxPricePerMeter;
  filter.minPricePerAr = filterResult?.minPricePerAr;
  filter.maxPricePerAr = filterResult?.maxPricePerAr;

  filter.isDeleted = filterResult?.isDeleted;
  filter.withPhotos = filterResult?.withPhotos;
}
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-auto">
    <div
      class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-8"
    >
      <NuxtLink to="/">Недвижимость</NuxtLink>

      <i-breadcrumbs-chevron />

      <NuxtLink to="/estate/complexHouses">Новостройки</NuxtLink>

      <i-breadcrumbs-chevron />
    </div>

    <div class="max-w-[800px]">
      <div
        class="flex border-b border-gray-200 items-baseline space-x-4 pb-3 mb-5"
      >
        <div class="text-2xl font-bold">{{ complexHouse?.title }}</div>

        <div class="grow text-gray-500 text-xs">ID: {{ complexHouse?.id }}</div>

        <div class="space-x-2">
          <a
            v-if="
              config.public.WEBSITE_URL &&
              complexHouse?.publicationStatus ===
                PublicationStatusEnum.PUBLISHED
            "
            :href="`${config.public.WEBSITE_URL}/complexHouses/${id}`"
            target="_blank"
            class="text-blue-600 text-sm font-medium"
            >Перейти на сайт</a
          >

          <a
            href="#"
            class="text-red-600 text-sm font-medium"
            @click="showComplexHouseDrawer = true"
            >Редактировать</a
          >
        </div>
      </div>

      <div class="text-2xs mb-1">
        <span class="text-gray-500">Создано</span>
        {{ $dayjs(complexHouse?.createdAt).format("DD.MM.YYYY") }}
      </div>

      <div class="text-2xs mb-5">
        <span class="text-gray-500">Изменено</span>
        {{ $dayjs(complexHouse?.updatedAt).format("DD.MM.YYYY") }}
      </div>

      <div v-if="complexHouse?.address" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Адрес</div>

        <div>{{ complexHouse?.address }}</div>
      </div>

      <div
        v-if="complexHouse?.lat && complexHouse?.lon"
        class="text-xs flex space-x-5 mb-4"
      >
        <div class="text-gray-500 w-30 shrink-0">Координаты</div>

        <div>
          {{ complexHouse?.lat?.toFixed(6) }},
          {{ complexHouse?.lon?.toFixed(6) }}
        </div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">На карте</div>

        <yandex-map
          height="250px"
          width="100%"
          :settings="{
            location: {
              center: [complexHouse?.lat || 0, complexHouse?.lon || 0],
              zoom: 9,
            },
          }"
        >
          <yandex-map-default-scheme-layer />

          <yandex-map-default-features-layer />

          <yandex-map-marker
            :settings="{
              coordinates: [complexHouse?.lat || 0, complexHouse?.lon || 0],
            }"
          >
            <div class="map-marker" />
          </yandex-map-marker>
        </yandex-map>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Кадастровый номер</div>

        <div>{{ complexHouse?.cadastrNumber || "-" }}</div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Фотографии</div>

        <div v-if="complexHouse?.images?.length" class="flex flex-wrap gap-2">
          <div
            v-for="image in complexHouse?.images"
            :key="image.id"
            class="relative rounded border border-gray-200"
          >
            <img :src="image.url" class="aspect-video object-cover h-28" />
          </div>
        </div>

        <div v-else>-</div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Документы</div>

        <div v-if="complexHouse?.documents?.length" class="flex flex-col gap-2">
          <a
            v-for="document in complexHouse?.documents"
            :key="document.id"
            :href="document.url"
            class="text-blue-600 font-medium"
          >
            {{ document.title }}
          </a>
        </div>

        <div v-else>-</div>
      </div>

      <ECNDivider dense />

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Срок сдачи</div>

        <div>
          {{
            complexHouse?.readinessQuarter
              ? `${complexHouse?.readinessQuarter} квартал `
              : ""
          }}
          {{
            complexHouse?.readinessYear
              ? `${complexHouse?.readinessYear} г.`
              : ""
          }}
        </div>
      </div>

      <ECNDivider dense />

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Описание</div>

        <div
          v-html="complexHouse?.description?.replace(/\n/g, '<br />') || '-'"
        ></div>
      </div>
    </div>

    <div class="text-base mb-4 pt-4 font-bold">
      Объекты в {{ complexHouse?.title }}
    </div>

    <div class="shadow-md rounded-xl p-6 mb-5 max-w-[800px]">
      <div class="flex space-x-5">
        <div class="">
          <div class="text-xs text-gray-500 mb-1">Комнатность</div>

          <div class="flex space-x-1 text-xs">
            <div
              class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
              :class="{ '!bg-gray-200': filter.isStudio }"
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
              class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
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
              class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
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
              class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
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
              class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-xs"
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

      <ECNDivider class="my-4" />

      <div class="flex space-x-5 items-center">
        <ECNButton outline small @click="showPropertyFilterDrawer = true"
          >Расширенный фильтр <i-filter class="ml-1"
        /></ECNButton>

        <div
          class="flex text-xs text-blue-600 cursor-pointer"
          @click="resetFilter"
        >
          Очистить <i-clear class="ml-1" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <NuxtLink
        v-for="property in properties"
        :key="property.id"
        :to="`/estate/properties/${property.id}`"
        class="rounded-xl border border-gray-200 overflow-hidden"
      >
        <div class="border-b border-gray-200">
          <img
            v-if="property.images?.length"
            :src="property.images[0]?.url"
            class="object-cover h-[220px] w-full"
          />

          <div v-else class="h-[220px] bg-gray-50"></div>
        </div>

        <div class="p-4">
          <div class="mb-2">{{ property.title }}</div>

          <div v-if="property.price" class="text-lg">
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

          <div class="flex space-x-2 items-center text-xs my-2">
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
    </div>

    <CRMDrawerComplexHouse
      v-if="showComplexHouseDrawer"
      :id="id"
      @close="showComplexHouseDrawer = false"
      @save="onComplexHouseSave"
      @delete="onComplexHouseDelete"
    />

    <CRMDrawerPropertyFilter
      v-if="showPropertyFilterDrawer"
      v-bind="filter"
      @close="showPropertyFilterDrawer = false"
      @apply="onApplyFilter"
    />
  </div>
</template>

<style lang="scss">
.map-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid red;
}
</style>
