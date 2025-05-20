<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <div class="max-w-[900px]">
      <!-- Complex header -->
      <div class="rounded-xl border border-gray-100 p-5 mt-7">
        <div class="flex justify-between">
          <div class="">
            <div class="text-3xl font-bold">ЖК "{{ complex?.title }}"</div>
          </div>

          <div class="flex space-x-1">
            <div class="p-2 cursor-pointer">
              <i-common-heart />
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-3">
          <div class="flex text-gray-400 text-sm items-center">
            <i-common-map-marker />

            <div>{{ complex?.address }}</div>
          </div>

          <div class="flex items-center space-x-4">
            <div
              class="border border-blue-600 text-blue-600 text-xs rounded-md py-2 pl-3 pr-4 flex space-x-1 items-center"
            >
              <i-common-map-icon />

              <div>На карте</div>
            </div>

            <div class="text-blue-600 text-xs">Генплан</div>
          </div>
        </div>
      </div>

      <!-- Images -->
      <div class="mt-6 flex space-x-5 items-start overflow-hidden">
        <div class="shrink-0 w-[150px] relative">
          <Swiper
            class="h-full"
            slides-per-view="auto"
            :space-between="20"
            direction="vertical"
          >
            <SwiperSlide
              v-for="image in complex?.images"
              :key="image.id"
              class="!h-fit"
            >
              <div
                class="rounded-xl border border-gray-100 overflow-hidden cursor-pointer"
                @click="mainImageUrl = image.url"
              >
                <img :src="image.url" class="object-cover aspect-4/3" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="rounded-xl overflow-hidden aspect-4/3 bg-gray-50 grow">
          <img
            v-if="mainImageUrl"
            :src="mainImageUrl"
            class="object-cover w-full h-full"
          />
        </div>
      </div>

      <!-- Main properties -->
      <div class="flex space-x-5 items-stretch mt-7">
        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">застройщик</div>

          <div class="text-sm">{{ complex?.developer?.title || "-" }}</div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">до города (км)</div>

          <div class="text-sm">
            {{
              complex?.inCity ? "в черте города" : complex?.cityDistance || "-"
            }}
          </div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">срок сдачи</div>

          <div v-if="complex?.isReady" class="text-sm">
            сдан{{
              complex.readinessYear ? ` в ${complex.readinessYear} г.` : ""
            }}
          </div>

          <div v-else class="text-sm">
            {{
              complex?.readinessQuarter
                ? `${complex.readinessQuarter} квартал`
                : ""
            }}
            {{ complex?.readinessYear ? `${complex.readinessYear} г.` : "" }}
          </div>
        </div>
      </div>

      <!-- Mortgage CTA -->
      <div
        class="mt-20 rounded-xl p-10 flex items-center justify-between mortgage-cta"
      >
        <div class="">
          <div class="text-2xl font-bold mb-1">
            Анкета для получения ипотеки
          </div>

          <div class="text-xs">
            Заполните анкету и наш специалист свяжется с вами в максимально
            короткий срок
          </div>
        </div>

        <div class="rounded-md py-3 px-6 text-blue-600 border border-blue-600">
          Заполнить анкету
        </div>
      </div>

      <!-- Properties within complex -->
      <div class="mt-20">
        <div class="text-2xl mb-9 font-bold">Варианты планировок</div>

        <div class="shadow-md rounded-xl p-6 mb-5">
          <div class="flex space-x-5">
            <div class="">
              <div class="text-xs text-gray-500 mb-1">Комнатность</div>

              <div class="flex space-x-1 text-xs">
                <div
                  class="min-w-8 h-8 rounded flex items-center justify-center px-2 text-gray-500 bg-gray-50 cursor-pointer"
                  :class="{
                    '!bg-gray-200':
                      filter.subType == PropertySubTypeEnum.STUDIO,
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

        <div v-if="!properties?.length" class="text-center my-10 text-gray-400">
          По запросу не найдено объектов
        </div>

        <div v-else class="grid grid-cols-3 gap-2">
          <NuxtLink
            v-for="property in properties"
            :key="property.id"
            :to="`/estate/properties/${property.id}`"
            class="rounded-xl border border-gray-200 overflow-hidden"
          >
            <div class="border-b border-gray-200">
              <img
                v-if="property.images?.length"
                :src="property.images[0].url"
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

              <div
                v-if="property?.pricePerMeter"
                class="text-2xs text-gray-500"
              >
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
                  {{
                    rehabTypes.find((i) => i.id === property?.rehabType)?.title
                  }}
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Map -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-1">Инфраструктура</div>

        <div class="text-gray-400 mb-9 text-sm">{{ complex?.address }}</div>

        <yandex-map
          class="overflow-hidden rounded-xl"
          height="450px"
          width="100%"
          :settings="{
            location: {
              center: [complex?.lat || 0, complex?.lon || 0],
              zoom: 14,
            },
          }"
        >
          <yandex-map-default-scheme-layer />

          <yandex-map-default-features-layer />

          <yandex-map-marker
            :settings="{ coordinates: [complex?.lat || 0, complex?.lon || 0] }"
          >
            <div class="map-marker" />
          </yandex-map-marker>
        </yandex-map>
      </div>

      <!-- Blog -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-1">Ход строительства</div>

        <div class="text-gray-400 mb-9 text-sm">
          Обновлено {{ $dayjs(complex?.updatedAt).format("DD.MM.YYYY HH:mm") }}
        </div>
      </div>

      <!-- Docs -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-9">Документация</div>

        <div
          v-if="complex?.documents?.length"
          class="flex flex-col space-y-4 items-start"
        >
          <a
            v-for="document in complex?.documents"
            :key="document.id"
            :href="document.url"
            target="_blank"
            class="text-sm text-blue-600"
            >{{ document.title }}</a
          >
        </div>

        <div v-else class="text-gray-400">Нет данных</div>
      </div>

      <!-- Reviews -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-9">Отзывы</div>

        <div class="text-gray-400">Нет отзывов</div>
      </div>

      <!-- Related -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-9">Похожие ЖК</div>

        <div class="text-gray-400">Не найдено</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PropertySubTypeEnum,
  useComplexQuery,
  usePropertiesQuery,
  type PropertyFilter,
} from "~/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from "vue-yandex-maps";
import { rehabTypes } from "~/shared/constants";

const route = useRoute();
const id = route.params.id as string;

const filter = reactive<PropertyFilter>({
  complexID: id,
  minRooms: undefined,
  maxRooms: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minArea: undefined,
  maxArea: undefined,
});

const { result } = useComplexQuery({
  id,
});
const complex = computed(() => result.value?.complex);

const mainImageUrl = ref<string>();
watch(complex, (value) => {
  if (value?.images?.length) {
    mainImageUrl.value = value.images[0].url;
  }
});

const { result: propertiesData } = usePropertiesQuery(
  () => ({
    filter: filter,
  }),
  { debounce: 500 },
);

const properties = computed(() => propertiesData.value?.properties.nodes);

const breadcrumbs = computed(() => [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/complexes",
    title: "Новостройки",
  },
  {
    url: `/complexes/${complex.value?.id}`,
    title: complex.value?.title || "",
  },
]);

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

<style lang="scss" scoped>
.mortgage-cta {
  background: radial-gradient(
      762.83% 141.42% at 0% 0%,
      #ffe3e6 0%,
      #efdaff 61.52%,
      #d0e0ff 100%
    ),
    radial-gradient(
      762.83% 141.42% at 0% 0%,
      #d6d5ff 0%,
      #d5fff0 55.73%,
      #d5e5ff 100%
    ),
    #fff;
}

.map-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid red;
}
</style>
