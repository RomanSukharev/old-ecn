<template>
  <div class="max-w-desktop grow mx-auto pb-10">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <Swiper
      class="shrink-0 overflow-hidden w-full mt-7"
      slides-per-view="auto"
      :space-between="20"
    >
      <SwiperSlide v-for="(item, i) in employees" :key="i" class="!w-fit">
        <NuxtLink
          :to="`/about/staff/${item.id}`"
          class="select-none h-[574px] w-[286px] relative group flex flex-col space-y-5"
        >
          <img
            :src="item.publicImage?.url || item.avatar?.url"
            class="rounded-xl object-cover grow min-h-0 transition-all"
          />

          <div class="hidden group-hover:block shrink-0">
            <div class="flex items-center justify-between">
              <div class="text-2xl font-bold">
                {{ item.name }} {{ item.surname }}
              </div>

              <div class="text-blue-600 leading-tight">8 отзывов</div>
            </div>

            <div
              v-if="item.shortDescription"
              class="text-gray-400 leading-tight mt-[14px]"
            >
              {{ item.shortDescription }}
            </div>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { useEmployeesQuery } from "~/shared/api/generated";

const { result } = useEmployeesQuery();

const employees = computed(() => result.value?.employees.nodes || []);

const breadcrumbs = ref([
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/about",
    title: "О компании",
  },
  {
    url: "/about/staff",
    title: "Сотрудники",
  },
]);
</script>
