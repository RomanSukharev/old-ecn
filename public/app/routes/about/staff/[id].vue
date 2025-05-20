<template>
  <div class="max-w-desktop grow mx-auto">
    <div class="max-w-[940px] pb-[60px]">
      <ECNBreadcrumbs :items="breadcrumbs" />

      <div v-if="employee" class="flex flex-col mt-7 space-y-20">
        <div class="flex space-x-10">
          <img
            v-if="employee.publicImage?.url || employee.avatar?.url"
            :src="employee.publicImage?.url || employee.avatar?.url"
            class="h-[280px] w-[280px] rounded-xl object-cover object-top shrink-0"
          />

          <div v-else class="h-[280px] w-[280px] rounded-xl bg-gray-50"></div>

          <div class="">
            <h1 class="font-bold text-[44px] leading-none shrink-0 mb-5">
              {{ employee.name }} {{ employee.surname }}
            </h1>

            <div class="text-base grow mb-7">
              {{ employee.description }}
            </div>

            <div
              class="border border-blue-600 cursor-pointer rounded-md px-6 py-3 text-blue-600 leading-tight w-fit"
            >
              Оставить отзыв
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="text-2xl leading-none font-bold mb-9">
            Сферы деятельности
          </h2>

          <div class="grid grid-cols-3 gap-4">
            <div class="flex space-x-2.5 items-center">
              <i-about-type-1 filled :font-controlled="false" class="w-7 h-7" />

              <div class="text-gray-400">Вторичная недвижимость</div>
            </div>

            <div class="flex space-x-2.5 items-center">
              <i-about-type-2 filled :font-controlled="false" class="w-7 h-7" />

              <div class="text-gray-400">Котеджные поселки</div>
            </div>

            <div class="flex space-x-2.5 items-center">
              <i-about-type-3 filled :font-controlled="false" class="w-7 h-7" />

              <div class="text-gray-400">Новостройки</div>
            </div>

            <div class="flex space-x-2.5 items-center">
              <i-about-type-4 filled :font-controlled="false" class="w-7 h-7" />

              <div class="text-gray-400">Загородная недвижимость</div>
            </div>

            <div class="flex space-x-2.5 items-center">
              <i-about-type-5 filled :font-controlled="false" class="w-7 h-7" />

              <div class="text-gray-400">Коммерческая недвижимость</div>
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="text-2xl leading-none font-bold mb-9">Обо мне</h2>

          <div class="flex space-x-2 items-stretch">
            <div
              class="rounded-xl border border-gray-200 px-[14px] py-3 space-y-0.5"
            >
              <div class="">Образование</div>

              <div class="text-gray-400 text-xs">
                Тюменский Индустриальный Университет
              </div>
            </div>

            <div
              class="rounded-xl border border-gray-200 px-[14px] py-3 space-y-0.5"
            >
              <div class="">Семейное положение</div>

              <div class="text-gray-400 text-xs">Не указано</div>
            </div>

            <div
              class="rounded-xl border border-gray-200 px-[14px] py-3 space-y-0.5"
            >
              <div class="">Стаж</div>

              <div class="text-gray-400 text-xs">7 лет</div>
            </div>

            <div
              class="rounded-xl border border-gray-200 px-[14px] py-3 space-y-0.5"
            >
              <div class="">Домашние животные</div>

              <div class="text-gray-400 text-xs">2 кота и собака</div>
            </div>

            <div
              class="rounded-xl border border-gray-200 px-[14px] py-3 space-y-0.5"
            >
              <div class="">Хобби</div>

              <div class="text-gray-400 text-xs">Рисование</div>
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="text-2xl leading-none font-bold mb-9">Объекты</h2>

          <div class="text-gray-300">Раздел в разработке</div>
        </div>

        <div class="">
          <div class="flex items-center justify-between mb-9">
            <h2 class="text-2xl leading-none font-bold">Отзывы</h2>

            <NuxtLink
              :to="`/about/staff/${id}/reviews`"
              class="text-blue-600 text-xl leading-tight"
              >Посмотреть все</NuxtLink
            >
          </div>

          <div class="text-gray-300">Раздел в разработке</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEmployeeQuery } from "~/shared/api/generated";

const route = useRoute();
const id = route.params.id as string;

const { result } = useEmployeeQuery({
  id,
});

const employee = computed(() => result.value?.employee);

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
  {
    url: `/about/staff/${id}`,
    title: "Страница сотрудника",
  },
]);
</script>
