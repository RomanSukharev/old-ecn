<template>
  <div class="max-w-desktop grow mx-auto pb-10 flex flex-col gap-20">
    <div class="flex flex-col gap-7">
      <ECNBreadcrumbs :items="breadcrumbs" />

      <div class="flex flex-row items-center gradient rounded-xl w-full">
        <img src="./main.png" alt="" class="flex" />

        <span class="text-[#1F2B31] text-[44px] leading-[42px] font-bold"
          >Работа в ЕЦН</span
        >
      </div>
    </div>

    <!-- header -->

    <div class="py-20 flex flex-row">
      <div class="flex grow flex-col gap-5">
        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[157px] ml-10"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs w-[75px]"
            >Более 80 сотрудников</span
          >
        </div>

        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[157px] ml-[120px]"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs max-w-[75px]"
            >100+ сделок за год</span
          >
        </div>

        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[177px] ml-[60px]"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs max-w-[95px]"
            >4 года на рынке недвижимости</span
          >
        </div>
      </div>

      <div class="flex flex-col gap-6 max-w-[600px]">
        <h2 class="text-[44px] leading-[42px] font-bold">Кратко о нас</h2>

        <span class="text-[#1f2b31] font-medium text-base leading-5"
          >Как уже неоднократно упомянуто, действия представителей оппозиции
          призывают нас к новым свершениям, которые, в свою очередь, должны быть
          подвергнуты целой серии независимых исследований. Лишь сделанные на
          базе интернет-аналитики выводы, которые представляют собой яркий
          пример континентально-европейского типа политической культуры, будут
          преданы социально-демократической анафеме.</span
        >
      </div>

      <div class="flex grow flex-col gap-5">
        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[157px] ml-[145px]"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs w-[75px]"
            >Более 80 сотрудников</span
          >
        </div>

        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[157px] ml-20"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs max-w-[75px]"
            >100+ сделок за год</span
          >
        </div>

        <div
          class="py-3 px-4 gap-4 flex flex-row items-center border border-[#EEF1F7] rounded-xl max-w-[177px] ml-[135px]"
        >
          <div class="w-8 h-8 bg-[#14E271] rounded-full"></div>

          <span class="text-[#1f2b31] font-medium text-xs max-w-[95px]"
            >4 года на рынке недвижимости</span
          >
        </div>
      </div>
    </div>

    <img src="./video.png" alt="" class="rounded-xl" />

    <div class="flex flex-col mt-7 space-y-20">
      <div class="flex flex-col gap-9">
        <h2 class="text-[44px] leading-[42px] font-bold">Команда</h2>

        <div class="flex flex-col gap-6">
          <div class="flex flex-row gap-2">
            <button class="bg-[#f8fbff] py-4 px-6 rounded text-[#8993A3]">
              Руководители
            </button>

            <button class="bg-[#eff3fa] py-4 px-6 rounded text-[#0F62FE]">
              Агенты
            </button>
          </div>

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
      </div>

      <div class="flex flex-col gap-9">
        <h2 class="text-[44px] leading-[42px] font-bold">История ЕЦН</h2>

        <div class="flex flex-col gap-5">
          <div
            class="flex flex-row justify-between py-7 pl-10 pr-7 border border-[#eef1f7] rounded-[20px]"
          >
            <div class="flex flex-col gap-[14px] max-w-[800px]">
              <span class="text-[#14E271] text-2xl leading-5 font-bold"
                >2020</span
              >

              <span class="text-base leading-5 font-medium text-[#1F2B31]"
                >Внезапно, активно развивающиеся страны третьего мира призывают
                нас к новым свершениям, которые, в свою очередь, должны быть
                разоблачены. Для современного мира сложившаяся структура
                организации позволяет оценить значение соответствующих условий
                активизации.
              </span>
            </div>

            <img src="./photo.png" alt="" class="rounded-xl w-[138px]" />
          </div>
        </div>
      </div>

      <div
        class="max-w-desktop mx-auto flex items-center space-x-20 mt-20 mb-20"
      >
        <img src="/img/elena.png" class="w-[400px]" />

        <div class="flex flex-col items-start">
          <div class="text-5xl font-bold mb-6">Елена Павлова</div>

          <div class="mb-8">
            Господа, реализация намеченных плановых заданий играет определяющее
            значение для инновационных методов управления процессами.
            Однозначно, тщательные исследования конкурентов превращены в
            посмешище, хотя само их существование приносит несомненную пользу
            обществу. Господа, граница обучения кадров играет важную роль в
            формировании кластеризации усилий.
          </div>

          <div
            class="rounded-lg border border-blue-600 text-blue-600 py-3 px-6"
          >
            Telegram
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-7 overflow-hidden">
        <div class="flex justify-start">
          <div class="running-text flex flex-row gap-7">
            <div
              v-for="_ in 20"
              :key="_"
              class="flex flex-row gap-4 p-6 border border-[#eef1f7] rounded-xl w-[380px]"
            >
              <img
                src="./photo.png"
                alt=""
                class="w-[48px] h-[48px] rounded-full"
              />

              <div class="flex flex-col gap-2">
                <span class="text-2xl font-medium leading-6 text-[#1F2B31]"
                  >СТРАНА Девелопмент</span
                >

                <span class="text-base leading-5 text-[#8993A3]"
                  >ООО «СЗ СТРАНА ЗАПАД»</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-start">
          <div class="left flex flex-row gap-7">
            <div
              v-for="_ in 20"
              :key="_"
              class="flex flex-row gap-4 p-6 border border-[#eef1f7] rounded-xl w-[380px]"
            >
              <img
                src="./photo.png"
                alt=""
                class="w-[48px] h-[48px] rounded-full"
              />

              <div class="flex flex-col gap-2">
                <span class="text-2xl font-medium leading-6 text-[#1F2B31]"
                  >СТРАНА Девелопмент</span
                >

                <span class="text-base leading-5 text-[#8993A3]"
                  >ООО «СЗ СТРАНА ЗАПАД»</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-5">
        <div class="flex relative w-[320px] h-[600px] rounded-[20px] border">
          <img src="./stories.png" alt="" />

          <div
            class="flex flex-row items-center gap-3 absolute bottom-4 left-4"
          >
            <img
              src="./photo.png"
              alt=""
              class="w-[40px] h-[40px] object-cover rounded-full"
            />

            <span class="text-xl font-bold leading-5 text-[#ffffff]"
              >Елeна Павлова</span
            >
          </div>
        </div>

        <div
          class="flex flex-col relative justify-center w-[980px] h-[600px] rounded-[20px] border gradient pl-20 gap-9"
        >
          <div class="flex flex-col gap-2">
            <h1 class="text-[44px] leading-[42px] texxt-[#1F2B31] font-bold">
              Отзывы
            </h1>

            <span class="text-[#8993A3] fomt-medium text-base leading-5"
              >Спасибо, что доверяете нам!</span
            >
          </div>

          <Swiper
            class="shrink-0 overflow-hidden w-full mt-7"
            slides-per-view="auto"
            :space-between="20"
          >
            <SwiperSlide v-for="_ in 5" :key="_" class="!w-fit"
              ><div
                class="p-10 gap-4 flex flex-col min-w-[392px] bg-[#EEF1F7] rounded-xl"
              >
                <div class="flex flex-col gap-1">
                  <span class="text-xl font-bold leading-5 text-[#1F2B31]"
                    >Адександра</span
                  >

                  <span
                    class="text-[10px] leading-[12px] fomt-medium text-[#8993A3]"
                    >12.12.2022</span
                  >
                </div>

                <span class="text-base leading-5 text-[#1F2B31] max-w-[312px]"
                  >Хочу выразить огромную благодарность специалисту Ивановой
                  Надежде за проделанную работу в организации покупки квартиры,
                  грамотное проведение сделки.</span
                >

                <div class="flex flex-row gap-2">
                  <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />

                  <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />

                  <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />
                </div></div
            ></SwiperSlide>
          </Swiper>

          <!-- <div class="flex flex-row overflow-x-auto scroll gap-5">
            <div
              v-for="_ in 5"
              :key="_"
              class="p-10 gap-4 flex flex-col min-w-[392px] bg-[#EEF1F7] rounded-xl"
            >
              <div class="flex flex-col gap-1">
                <span class="text-xl font-bold leading-5 text-[#1F2B31]"
                  >Адександра</span
                >

                <span
                  class="text-[10px] leading-[12px] fomt-medium text-[#8993A3]"
                  >12.12.2022</span
                >
              </div>

              <span class="text-base leading-5 text-[#1F2B31] max-w-[312px]"
                >Хочу выразить огромную благодарность специалисту Ивановой
                Надежде за проделанную работу в организации покупки квартиры,
                грамотное проведение сделки.</span
              >

              <div class="flex flex-row gap-2">
                <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />

                <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />

                <img src="./photo.png" alt="" class="rounded-xl w-[98px]" />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEmployeesQuery } from "~/shared/api/generated";

const { result } = useEmployeesQuery();

console.log(result.value);

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
]);
</script>

<style lang="css" scoped>
.gradient {
  background: linear-gradient(
    104deg,
    #f0dbff -3.9%,
    #dddfff 66.94%,
    #fff 97.19%
  );
}

.running-text {
  animation: running-text 30s linear infinite;
}

@keyframes running-text {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.left {
  animation: running 30s linear infinite;
}

@keyframes running {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-60%);
  }
}
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
