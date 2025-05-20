<script lang="ts" setup>
import {
  PropertyStatusEnum,
  usePropertyPageQuery,
} from "@/shared/api/generated";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from "vue-yandex-maps";
import { rehabTypes, toiletTypes } from "~/shared/constants";
import { PropertyDrawer } from "~/widgets/propertyDrawer";

const config = useRuntimeConfig();

const route = useRoute();
const id = route.params.id as string;

const showPropertyDrawer = ref(false);

const { result: data, refetch: refresh } = usePropertyPageQuery({
  id,
});

const property = computed(() => data.value?.property);

async function onPropertySave(): Promise<void> {
  await refresh();
}

async function onPropertyDelete(): Promise<void> {
  await refresh();
}
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-auto">
    <div
      class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-8"
    >
      <NuxtLink to="/">Недвижимость</NuxtLink>

      <i-breadcrumbs-chevron />

      <NuxtLink to="/estate/properties">База объектов</NuxtLink>

      <i-breadcrumbs-chevron />
    </div>

    <div class="max-w-[800px]">
      <div class="border-b border-gray-200 pb-3 mb-5">
        <div class="flex items-baseline space-x-4">
          <div class="text-2xl font-bold">{{ property?.title }}</div>

          <div class="grow text-gray-500 text-xs">ID: {{ property?.id }}</div>

          <div class="space-x-2">
            <a
              v-if="
                config.public.WEBSITE_URL &&
                property?.status === PropertyStatusEnum.PUBLISHED
              "
              :href="`${config.public.WEBSITE_URL}/properties/${id}`"
              target="_blank"
              class="text-blue-600 text-sm font-medium"
              >Перейти на сайт</a
            >

            <a
              href="#"
              class="text-red-600 text-sm font-medium"
              @click="showPropertyDrawer = true"
              >Редактировать</a
            >
          </div>
        </div>

        <div class="flex items-baseline space-x-2">
          <div class="text-sm">
            {{
              property?.price
                ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.price)} ₽`
                : "-"
            }}
          </div>

          <div v-if="property?.pricePerMeter" class="text-xs text-gray-500">
            {{
              property?.pricePerMeter
                ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.pricePerMeter)} ₽/м²`
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
      </div>

      <div class="text-2xs mb-1">
        <span class="text-gray-500">Создано</span>
        {{ $dayjs(property?.createdAt).format("DD.MM.YYYY") }}
      </div>

      <div class="text-2xs mb-5">
        <span class="text-gray-500">Изменено</span>
        {{ $dayjs(property?.updatedAt).format("DD.MM.YYYY") }}
      </div>

      <div v-if="property?.address" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Адрес</div>

        <div>{{ property?.address }}</div>
      </div>

      <div
        v-if="property?.lat && property?.lon"
        class="text-xs flex space-x-5 mb-4"
      >
        <div class="text-gray-500 w-30 shrink-0">Координаты</div>

        <div>
          {{ property?.lat?.toFixed(6) }}, {{ property?.lon?.toFixed(6) }}
        </div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">На карте</div>

        <yandex-map
          height="250px"
          width="100%"
          :settings="{
            location: {
              center: [property?.lat || 0, property?.lon || 0],
              zoom: 9,
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

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Кадастровый номер</div>

        <div>{{ property?.cadastrNumber || "-" }}</div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Фотографии</div>

        <div v-if="property?.images?.length" class="flex flex-wrap gap-2">
          <div
            v-for="image in property?.images"
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

        <div v-if="property?.documents?.length" class="flex flex-col gap-2">
          <a
            v-for="document in property?.documents"
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
            property?.readinessQuarter
              ? `${property?.readinessQuarter} квартал `
              : ""
          }}
          {{ property?.readinessYear ? `${property?.readinessYear} г.` : "" }}
        </div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Расстояние до города</div>

        <div v-if="property?.inCity">В черте города</div>

        <div v-else>
          {{ property?.cityDistance ? `${property?.cityDistance} км` : "-" }}
        </div>
      </div>

      <ECNDivider dense />

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Описание</div>

        <div
          v-html="property?.description?.replace(/\n/g, '<br />') || '-'"
        ></div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Описание (для SEO)</div>

        <div v-html="property?.seoText?.replace(/\n/g, '<br />') || '-'"></div>
      </div>

      <ECNDivider dense />

      <div v-if="property?.rooms" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Количество комнат</div>

        <div>
          {{ property?.rooms ?? "-" }}
        </div>
      </div>

      <div v-if="property?.area" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Общая площадь, м²</div>

        <div>
          {{ property?.area ?? "-" }}
        </div>
      </div>

      <div v-if="property?.livingArea" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Жилая площадь, м²</div>

        <div>
          {{ property?.livingArea ?? "-" }}
        </div>
      </div>

      <div v-if="property?.landArea" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Площадь участка, сот</div>

        <div>
          {{ property?.landArea ?? "-" }}
        </div>
      </div>

      <div v-if="property?.kitchenArea" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Площадь кухни, м²</div>

        <div>
          {{ property?.kitchenArea ?? "-" }}
        </div>
      </div>

      <div v-if="property?.toiletType" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Тип санузла</div>

        <div>
          {{
            toiletTypes.find((i) => i.id === property?.toiletType)?.title || "-"
          }}
        </div>
      </div>

      <div v-if="property?.floor" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Этаж</div>

        <div>
          {{ property?.floor ?? "-" }}
        </div>
      </div>

      <div v-if="property?.floors" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Количество этажей</div>

        <div>
          {{ property?.floors ?? "-" }}
        </div>
      </div>

      <div v-if="property?.rehabType" class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Ремонт</div>

        <div>
          {{
            rehabTypes.find((i) => i.id === property?.rehabType)?.title || "-"
          }}
        </div>
      </div>

      <ECNDivider dense />

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Служебная информация</div>

        <div
          v-html="property?.internalInfo?.replace(/\n/g, '<br />') || '-'"
        ></div>
      </div>

      <ECNDivider dense />

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">
          Размер комиссии в процентах
        </div>

        <div>
          {{ property?.comissionPercent ?? "-" }}
        </div>
      </div>

      <div class="text-xs flex space-x-5 mb-4">
        <div class="text-gray-500 w-30 shrink-0">Размер комиссии в рублях</div>

        <div>
          {{
            property?.comissionAmount
              ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(property?.comissionAmount)} ₽`
              : "-"
          }}
        </div>
      </div>
    </div>

    <PropertyDrawer
      v-if="showPropertyDrawer"
      :id="id"
      @close="showPropertyDrawer = false"
      @save="onPropertySave"
      @delete="onPropertyDelete"
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
