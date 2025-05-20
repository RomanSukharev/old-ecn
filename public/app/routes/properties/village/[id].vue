<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <div class="max-w-[900px]">
      <!-- Property header -->
      <div class="rounded-xl border border-gray-100 p-5 mt-7">
        <div class="flex justify-between">
          <div class="">
            <div class="text-3xl font-bold">{{ property?.title }}</div>
          </div>

          <div class="flex space-x-1">
            <div class="p-2 cursor-pointer">
              <i-common-heart />
            </div>
          </div>
        </div>

        <div class="flex items-baseline space-x-2 mt-2">
          <div class="text-sm">
            {{
              property?.price
                ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.price)} ₽`
                : "-"
            }}
          </div>

          <div v-if="property?.pricePerAr" class="text-xs text-gray-500">
            {{
              property?.pricePerAr
                ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.pricePerAr)} ₽/сот`
                : "-"
            }}
          </div>
        </div>

        <div class="flex justify-between mt-3">
          <div class="flex text-gray-400 text-sm items-center">
            <i-common-map-marker />

            <div>{{ property?.address }}</div>
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
              v-for="image in property?.images"
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
          <div class="mb-1 text-gray-500 text-xs">площадь</div>

          <div class="text-sm">
            {{
              new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 1,
              }).format(property?.area || 0)
            }}
          </div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">
            {{ property?.floors ? `из ${property.floors}` : "этаж" }}
          </div>

          <div class="text-sm">
            {{ property?.floor || "-" }}
          </div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">площадь участка</div>

          <div class="text-sm">
            {{
              new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 1,
              }).format(property?.landArea || 0)
            }}
          </div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">высота потолков</div>

          <div class="text-sm">
            {{
              new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 1,
              }).format(property?.ceilingHeight || 0)
            }}
          </div>
        </div>

        <div
          class="grow rounded-xl border border-gray-100 px-4 py-3 text-center"
        >
          <div class="mb-1 text-gray-500 text-xs">срок сдачи</div>

          <div v-if="property?.isReady" class="text-sm">
            сдан{{
              property.readinessYear ? ` в ${property.readinessYear} г.` : ""
            }}
          </div>

          <div v-else class="text-sm">
            {{
              property?.readinessQuarter
                ? `${property.readinessQuarter} квартал`
                : ""
            }}
            {{ property?.readinessYear ? `${property.readinessYear} г.` : "" }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-9">Об объекте</div>

        <div v-html="property?.description || '-'"></div>
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

      <!-- Map -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-1">Инфраструктура</div>

        <div class="text-gray-400 mb-9 text-sm">{{ property?.address }}</div>

        <yandex-map
          class="overflow-hidden rounded-xl"
          height="450px"
          width="100%"
          :settings="{
            location: {
              center: [property?.lat || 0, property?.lon || 0],
              zoom: 14,
            },
          }"
        >
          <yandex-map-default-scheme-layer />

          <yandex-map-default-features-layer />

          <yandex-map-marker
            :settings="{
              coordinates: [property?.lat || 0, property?.lon || 0],
            }"
          >
            <div class="map-marker" />
          </yandex-map-marker>
        </yandex-map>
      </div>

      <!-- Blog -->
      <div v-if="property?.inVillage" class="mt-20">
        <div class="text-2xl font-bold mb-4">
          КП {{ property.village?.title }}
        </div>

        <Swiper slides-per-view="auto" :space-between="20">
          <SwiperSlide
            v-for="image in property?.village?.images"
            :key="image.id"
            class="!w-fit"
          >
            <img
              :src="image.url"
              class="rounded-xl object-cover aspect-4/3 h-[150px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Related -->
      <div class="mt-20">
        <div class="text-2xl font-bold mb-9">Похожие объекты</div>

        <div class="text-gray-400">Не найдено</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePropertyQuery } from "~/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from "vue-yandex-maps";

const route = useRoute();
const id = route.params.id as string;

const { result } = usePropertyQuery({
  id,
});
const property = computed(() => result.value?.property);

const mainImageUrl = ref<string>();
watch(property, (value) => {
  if (value?.images?.length) {
    mainImageUrl.value = value.images[0].url;
  }
});

const breadcrumbs = computed(() => [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/properties",
    title: "База объектов",
  },
  {
    url: "/properties/village",
    title: "Коттеджные поселки",
  },
  {
    url: `/properties/village/${property.value?.id}`,
    title: property.value?.title || "",
  },
]);
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
