<template>
  <div class="items-center justify-center flex mb-20">
    <div class="flex flex-col gap-20 max-w-desktop">
      <div class="flex flex-col gap-7">
        <ECNBreadcrumbs :items="breadcrumbs" />

        <div class="flex flex-row items-center gradient rounded-xl w-full">
          <img src="/img/vacancies/main.png" alt="" class="flex" />

          <div class="flex flex-col gap-9">
            <div class="flex flex-col gap-1">
              <span class="text-[#1F2B31] text-[44px] leading-[42px] font-bold"
                >Работа в ЕЦН</span
              >

              <span class="text-xl font-medium text-[#8993A3]"
                >Присоединяйся к нашей команде</span
              >
            </div>

            <button
              class="py-4 px-8 bg-[#0F62FE] text-white rounded-xl max-w-[222px]"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-row items-center justify-between">
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

      <div class="grid grid-cols-3 grid-rows-3 gap-5">
        <img src="/img/vacancies/grid.png" alt="" class="object-cover" />

        <img src="/img/vacancies/grid2.png" alt="" class="object-cover" />

        <img
          src="/img/vacancies/test.png"
          alt=""
          class="row-span-2 object-cover h-full rounded-xl"
        />

        <img
          src="/img/vacancies/grid4.png"
          alt=""
          class="row-span-2 object-cover h-full rounded-xl"
        />

        <img src="/img/vacancies/grid5.png" alt="" class="object-cover" />

        <img src="/img/vacancies/grid.png" alt="" class="object-cover" />

        <img src="/img/vacancies/grid2.png" alt="" class="object-cover" />
      </div>

      <div class="flex flex-col gap-9">
        <span class="text-[#1f2b31] font-bold text-[44px] leading-10"
          >С нами комфортно</span
        >

        <div class="flex flex-row gap-5">
          <div
            class="flex flex-col gap-6 py-7 px-10 rounded-xl border border-[#eef1f7]"
          >
            <img
              src="/img/vacancies/coffie.png"
              alt=""
              class="w-[72px] h-[72px]"
            />

            <div class="flex flex-col gap-[10px]">
              <span class="text-[#1f2b31] font-bold text-2xl leading-5"
                >Ламповый коллектив</span
              >

              <span class="text-[#8993A3] font-medium text-base leading-5"
                >опытные наставники и быстрая адаптация</span
              >
            </div>
          </div>

          <div
            class="flex flex-col grow gap-6 py-7 px-10 rounded-xl border border-[#eef1f7]"
          >
            <img
              src="/img/vacancies/money.png"
              alt=""
              class="w-[72px] h-[72px]"
            />

            <div class="flex flex-col gap-[10px]">
              <span class="text-[#1f2b31] font-bold text-2xl leading-5"
                >Хорошая зарплата</span
              >

              <span class="text-[#8993A3] font-medium text-base leading-5"
                >самые большие комиссионные со сделки</span
              >
            </div>
          </div>

          <div
            class="flex flex-col grow gap-6 py-7 px-10 rounded-xl border border-[#eef1f7]"
          >
            <img src="/img/vacancies/up.png" alt="" class="w-[72px] h-[72px]" />

            <div class="flex flex-col gap-[10px]">
              <span class="text-[#1f2b31] font-bold text-2xl leading-5"
                >Карьерный рост</span
              >

              <span class="text-[#8993A3] font-medium text-base leading-5"
                >лестница от новичка до руководителя</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-9">
        <span class="text-[#1f2b31] font-bold text-[44px] leading-10"
          >Истории успеха</span
        >

        <img
          src="/img/vacancies/video.png"
          alt=""
          class="object-cover h-[520px] rounded-xl"
        />
      </div>

      <div class="flex flex-col gap-9">
        <div class="flex flex-col gap-2">
          <span class="text-[#1f2b31] font-bold text-[44px] leading-10"
            >Агенты</span
          >

          <span class="text-[#8993A3] font-medium text-base leading-5"
            >С помощью этих людей мы делаем вас счаслтивее</span
          >
        </div>

        <Swiper
          class="shrink-0 overflow-hidden w-full"
          slides-per-view="auto"
          :space-between="20"
        >
          <SwiperSlide
            v-for="employee in employees"
            :key="employee.id"
            class="!w-fit overflow-hidden"
          >
            <div
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
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <!--  -->

      <div class="flex flex-col space-y-5">
        <div
          v-for="vacancy in vacancies"
          :key="vacancy.id"
          class="flex flex-row gap-[60px] py-7 px-9 rounded-xl border border-[#eef1f7] group"
        >
          <div class="w-[200px] flex gap-2 flex-col">
            <span class="text-[#1f2b31] font-bold text-xl leading-5">{{
              vacancy.title
            }}</span>

            <div class="flex flex-row items-center gap-[6px] text-[#8993A3]">
              <span v-if="vacancy.experience" class="font-medium text-xs">{{
                vacancy.experience
              }}</span>

              <span
                v-if="vacancy.experience && vacancy.schedule"
                class="rounded-full w-1 h-1 bg-[#8993A3]"
              ></span>

              <span v-if="vacancy.schedule" class="font-medium text-xs">{{
                getScheduleText(vacancy.schedule)
              }}</span>
            </div>
          </div>

          <div class="flex flex-row justify-between grow items-center">
            <span
              class="text-[#1f2b31] font-medium text-base leading-5 max-w-[600px]"
              >{{ vacancy.description }}</span
            >

            <span
              class="text-[#1f2b31] font-bold text-base leading-4 cursor-pointer group-hover:hidden"
              >{{ vacancy.salary }}</span
            >

            <div
              class="py-3 px-6 bg-[#0F62FE] text-white rounded-xl hidden group-hover:block cursor-pointer"
            >
              Оставить заявку
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVacanciesQuery, VacancyScheduleEnum } from "~/shared/api/generated";

const { result } = useVacanciesQuery();

const vacancies = computed(() => result.value?.vacancies.nodes || []);
const employees = computed(() => result.value?.employees.nodes || []);

function getScheduleText(schedule: VacancyScheduleEnum): string {
  switch (schedule) {
    case VacancyScheduleEnum.FULL_TIME:
      return "Полная занятость";
    case VacancyScheduleEnum.PART_TIME:
      return "Частичная занятость";
  }
}

const breadcrumbs = [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/vacancies",
    title: "Работа в ЕЦН",
  },
];
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
</style>
