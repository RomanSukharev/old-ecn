<template>
  <div class="pb-5">
    <ECNHomeBanner />

    <div
      class="flex flex-row items-center justify-between max-w-desktop mx-auto mt-20"
    >
      <div class="flex flex-col gap-2 items-center grow max-w-[660px]">
        <span
          class="text-[#0F62FE] font-bold text-[52px] leading-[96px] opacity-50"
          >100+</span
        >

        <div class="flex flex-col gap-[14px] items-center">
          <span class="text-[#0F62FE] font-bold text-[112px] leading-[96px]"
            >300+</span
          >

          <span class="text-[#1f2b31]">Обьектов недвижимости в базе</span>
        </div>

        <div
          class="text-[#0F62FE] font-bold text-[52px] leading-[96px] opacity-50"
        >
          30+
        </div>
      </div>

      <div
        class="relative flex flex-row items-center gradient w-[552px] h-[220px] rounded-xl px-10 mr-10"
      >
        <div class="flex flex-col gap-1">
          <span class="text-[#1f2b31] font-bold text-2xl leading-5"
            >ЕЦН лучшие!</span
          >

          <span class="text-[#8993A3] font-medium text-[12px] leading-4"
            >Наши заслуги говорят за нас</span
          >
        </div>

        <img
          src="/img/vacancies/winn.png"
          alt=""
          class="absolute right-[-12%] top-[-9%]"
        />
      </div>
    </div>

    <div class="max-w-desktop mx-auto mt-20">
      <div class="text-3xl font-bold">Новостройки</div>

      <div class="text-gray-500 text-sm">
        Приобретение своей квартиры в новом доме<br />продлевает радость на всю
        жизнь
      </div>

      <div class="grid grid-cols-3 gap-x-5 gap-y-9 my-9">
        <ECNCardsComplex
          v-for="complex in complexes"
          :key="complex.id"
          :complex="complex"
        />
      </div>

      <NuxtLink
        to="/complexes"
        class="rounded-md border border-blue-600 text-blue-600 flex items-center justify-center py-3 px-6 hover:text-white hover:bg-blue-600"
      >
        Все новостройки
      </NuxtLink>

      <div
        class="mt-20 rounded-xl h-[450px] px-[60px] flex items-center justify-between better-gradient"
      >
        <div class="basis-1/2"></div>

        <div class="basis-1/2 text-[44px] font-bold">
          Стремимся быть лучше каждый день
        </div>
      </div>

      <Swiper
        class="shrink-0 overflow-hidden w-full mt-20"
        slides-per-view="auto"
        :space-between="20"
      >
        <SwiperSlide class="!w-fit !h-auto rounded-xl overflow-hidden">
          <div class="py-10 px-9 bg-green-200 h-full w-[430px]">
            <div class="text-[44px] font-bold mb-3 leading-none">
              Коттеджные поселки
            </div>

            <div class="font-medium">
              Ничего не может быть лучше, чем свежий воздух, пение птиц и свой
              собственный дом
            </div>
          </div>

          <img
            class="absolute bottom-0 left-0 right-0"
            src="/img/villages-wrap.png"
          />
        </SwiperSlide>

        <SwiperSlide
          v-for="village in villages"
          :key="village.id"
          class="!w-fit"
        >
          <ECNCardsVillage
            :to="`/villages/${village.id}`"
            class="select-none w-[430px]"
            :village="village"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="max-w-desktop mx-auto mt-20">
      <div class="text-4xl font-bold mb-2">Агенты</div>

      <div class="text-gray-500 text-sm">
        С помощью этих людей мы делаем вас счастливее
      </div>

      <Swiper
        class="shrink-0 overflow-hidden w-full mt-9"
        slides-per-view="auto"
        :space-between="20"
      >
        <SwiperSlide
          v-for="employee in employees"
          :key="employee.id"
          class="!w-fit overflow-hidden"
        >
          <NuxtLink
            :to="`/about/staff/${employee.id}`"
            class="flex flex-col gap-5 overflow-hidden w-[286px] h-[572px] group"
          >
            <img
              v-if="employee.publicImage"
              :src="employee.publicImage.url"
              alt=""
              class="object-cover w-full rounded-xl group-hover:h-[432px]"
            />

            <div
              v-else
              class="object-cover w-full bg-gray-50 rounded-xl group-hover:h-[432px]"
            ></div>

            <div class="flex flex-row justify-between">
              <span class="text-[#1f2b31] font-bold text-2xl leading-5"
                >{{ employee.name }} {{ employee.surname }}</span
              >

              <span class="text-[#0F62FE] font-medium text-base leading-5"
                >нет отзывов</span
              >
            </div>

            <span class="text-[#8993A3] font-medium text-base leading-5">
              {{ employee.shortDescription || employee.description }}
            </span>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="max-w-desktop mx-auto flex items-center space-x-20 mt-20 mb-20">
      <img src="/img/elena.png" class="w-[400px]" />

      <div class="flex flex-col items-start">
        <div class="text-5xl font-bold mb-6">Елена Павлова</div>

        <div class="mb-8">
          Господа, реализация намеченных плановых заданий играет определяющее
          значение для инновационных методов управления процессами. Однозначно,
          тщательные исследования конкурентов превращены в посмешище, хотя само
          их существование приносит несомненную пользу обществу. Господа,
          граница обучения кадров играет важную роль в формировании
          кластеризации усилий.
        </div>

        <div class="rounded-lg border border-blue-600 text-blue-600 py-3 px-6">
          Telegram
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeQuery } from "~/shared/api/generated";

const { result } = useHomeQuery();

const complexes = computed(() => result.value?.complexes.nodes || []);
const villages = computed(() => result.value?.villages.nodes || []);
const employees = computed(() => result.value?.employees.nodes || []);
</script>

<style scoped>
.gradient {
  background: linear-gradient(
    104deg,
    #f0dbff -3.9%,
    #dddfff 66.94%,
    #fff 97.19%
  );
}

.better-gradient {
  background: radial-gradient(
      762.83% 141.42% at 0% 0%,
      #ffe3e6 0%,
      #efdaff 61.52%,
      #d0e0ff 100%
    ),
    #f5f8ff;
}
</style>
