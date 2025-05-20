<template>
  <div class="max-w-desktop grow mx-auto flex flex-col gap-20 pb-20">
    <div class="flex flex-col gap-7">
      <ECNBreadcrumbs :items="breadcrumbs" />

      <div class="flex flex-row items-center gradient rounded-xl w-full">
        <img src="/img/vacancies/main.png" alt="" class="flex" />

        <div class="flex flex-col gap-9">
          <div class="flex flex-col gap-1">
            <span class="text-[#1F2B31] text-[44px] leading-[42px] font-bold"
              >Одобрение ипотеки в 90% случаях</span
            >
          </div>

          <button
            class="py-4 px-8 bg-[#0F62FE] text-white rounded-xl max-w-[222px]"
          >
            Заполнить анкету
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5">
      <div
        class="flex flex-col py-7 px-10 gap-6 border border-[#EEF1F7] rounded-xl max-w-[426px]"
      >
        <img src="../percent.png" alt="" class="w-[72px] h-[72px]" />

        <div class="flex flex-col gap-[10px]">
          <span class="text-2xl leading-5 font-bold">Низкая ставка</span>

          <span class="text-[#8993A3] text-base leading-5 font-medium"
            >через Единый центр недвижимости банковские ставки ниже</span
          >
        </div>
      </div>

      <div
        class="flex flex-col py-7 px-10 gap-6 border border-[#EEF1F7] rounded-xl max-w-[426px]"
      >
        <img src="../clock.png" alt="" class="w-[72px] h-[72px]" />

        <div class="flex flex-col gap-[10px]">
          <span class="text-2xl leading-5 font-bold">Быстрое одобрение</span>

          <span class="text-[#8993A3] text-base leading-5 font-medium"
            >одобрение от банка бесплатно и в срок от 7 минут</span
          >
        </div>
      </div>

      <div
        class="flex flex-col py-7 px-10 gap-6 border border-[#EEF1F7] rounded-xl max-w-[426px]"
      >
        <img src="../bank.png" alt="" class="w-[72px] h-[72px]" />

        <div class="flex flex-col gap-[10px]">
          <span class="text-2xl leading-5 font-bold">Большой выбор банков</span>

          <span class="text-[#8993A3] text-base leading-5 font-medium"
            >одобрение 1 заявки 15 банками</span
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-9">
      <h1 class="text-[44px] leading-[42px] font-bold text-[#1F2B31]">
        Ипотечные программы
      </h1>

      <div class="flex flex-wrap gap-5">
        <div
          v-for="_ in 5"
          :key="_"
          class="w-[426px] rounded-xl p-5 gap-[29px] border border-[#EEF1F7] flex flex-col"
        >
          <div class="flex flex-row justify-between">
            <span class="text-xl leading-6 font-medium text-[#1F2B31]"
              >Вторичное жилье</span
            >

            <img src="../info-empty.svg" alt="" />
          </div>

          <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-[2px]">
              <span class="text-xs text-[#8993A3]">Взнос</span>

              <span class="text-base leading-5 font-semibold text-[#1F2B31]"
                >от 20%</span
              >
            </div>

            <div class="flex flex-col gap-[2px] items-end">
              <span class="text-xs text-[#8993A3]">Ставка</span>

              <span class="text-base leading-5 font-semibold text-[#1F2B31]"
                >от 16%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-[#EFF3FA] max-h-[668px] flex grow flex-col p-[60px] gap-9 rounded-xl"
    >
      <div class="flex flex-col gap-2">
        <h1 class="text-[44px] leading-[42px] font-bold text-[#1F2B31]">
          Калькулятор ипотеки
        </h1>

        <span class="text-[#8993A3] text-base leading-5 font-medium"
          >Рассчитайте ипотеку для покупки своей просторной и уютной
          квартиры</span
        >
      </div>

      <div class="flex flex-row gap-7">
        <div class="flex flex-col gap-4 max-w-[306px]">
          <div class="flex flex-col gap-[2px]">
            <span class="text-[#8993A3] text-xs font-medium">Программа</span>

            <div
              class="flex flex-row py-3 px-4 cursor-pointer rounded-[6px] overflow-hidden bg-white border border-[#DCE1E8]"
            >
              <input
                type="text"
                class="outline-none flex grow text-base leading-5 font-medium text-[#1F2B31]"
                readonly
                value="Не выбрано"
              />

              <img src="../nav-arrow-down.svg" alt="" />
            </div>
          </div>

          <div class="flex flex-col gap-[2px]">
            <span class="text-[#8993A3] text-xs font-medium">Стоимость, ₽</span>

            <div class="flex flex-row items-center gap-2">
              <div
                class="flex flex-row h-[46px] items-center gap-2 py-3 px-4 cursor-pointer rounded-[6px] overflow-hidden bg-white border border-[#DCE1E8]"
              >
                <span class="text-[#8993A3] text-base leading-5 font-medium"
                  >От</span
                >

                <input
                  type="text"
                  class="outline-none text-base leading-5 font-medium text-[#1F2B31] w-[145px]"
                />
              </div>

              <span>-</span>

              <div
                class="flex flex-row h-[46px] items-center gap-2 py-3 px-4 cursor-pointer rounded-[6px] overflow-hidden bg-white border border-[#DCE1E8]"
              >
                <span class="text-[#8993A3] text-base leading-5 font-medium"
                  >До</span
                >

                <input
                  type="text"
                  class="outline-none text-base leading-5 font-medium text-[#1F2B31] w-[145px]"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-[2px]">
            <span class="text-[#8993A3] text-xs font-medium"
              >Первоначальный взнос (в рублях)</span
            >

            <div
              class="flex flex-row py-3 px-4 cursor-pointer rounded-[6px] overflow-hidden bg-white border border-[#DCE1E8]"
            >
              <input
                type="text"
                class="outline-none flex grow text-base leading-5 font-medium text-[#8993A3]"
                readonly
                value="0"
              />
            </div>
          </div>

          <div class="flex flex-col gap-[2px]">
            <span class="text-[#8993A3] text-xs font-medium"
              >Срок кредита (в годах)</span
            >

            <div
              class="flex flex-row py-3 px-4 cursor-pointer rounded-[6px] overflow-hidden bg-white border border-[#DCE1E8]"
            >
              <input
                type="text"
                class="outline-none text-base leading-5 font-medium text-[#8993A3]"
                readonly
                value="0"
              />
            </div>
          </div>

          <span
            class="text-[#0F62FE] py-3 px-6 border border-[#0F62FE] rounded-[6px] cursor-pointer text-center text-base leading-5 font-medium"
            >Отсавить заявку</span
          >
        </div>

        <div class="flex w-[1px] bg-[#DCE1E8]"></div>

        <div class="flex grow flex-col gap-7">
          <div
            class="flex flex-row gap-10 text-[#1F2B31] text-base leading-5 font-medium"
          >
            <span class="flex grow">Банк</span>

            <span>Ставка</span>

            <span>Сумма</span>

            <span class="ml-10"> Срок</span>

            <span>Ежемесячный платеж</span>
          </div>

          <div
            v-for="_ in 3"
            :key="_"
            class="flex flex-col gap-7 text-[#1F2B31] text-base leading-5 font-medium"
          >
            <div class="flex grow h-[1px] bg-[#DCE1E8]"></div>

            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-3">
                <img
                  src="../sber.png"
                  class="w-[44px] h-[44px] rounded-full overflow-hidden"
                />

                <div class="flex flex-col gap-1">
                  <span>Семейная ипотека до 6%</span>

                  <span class="text-[#8993A3]">Сбербанк</span>
                </div>
              </div>

              <div class="flex flex-row gap-10">
                <span class="mr-5">5%</span>

                <span>до 10 млн ₽</span>

                <span>30 лет</span>

                <div class="flex flex-col gap-1 mr-5 items-center">
                  <span>от 39 640 ₽/мес</span>

                  <span
                    class="bg-[#8993A3] py-[2px] px-[6px] rounded-[2px] text-white cursor-pointer"
                    >Получить онлайн</span
                  >
                </div>
              </div>
            </div>
          </div>

          <span
            class="text-[#0F62FE] text-base leading-5 font-medium text-center py-2 px-6 cursor-pointer"
            >Показать еще</span
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-9 text-[#1F2B31]">
      <h1 class="text-[44px] leading-[42px] font-bold">
        Новый дом в 6 шагах от вас
      </h1>

      <div class="flex flex-row gap-6 overflow-x-auto">
        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">01</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Выбор недвижимости</span
          >
        </div>

        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">02</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Расчет условий</span
          >
        </div>

        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">03</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Подача заявки</span
          >
        </div>

        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">04</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Согласование обьекта</span
          >
        </div>

        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">05</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Подача документов</span
          >
        </div>

        <div class="flex flex-col py-5 pl-5 rounded-xl border border-[#EEF1F7]">
          <span class="text-xl leading-5 font-medium">06</span>

          <img src="../img.png" alt="" class="h-[237px]" />

          <span class="text-xl leading-5 font-bold max-w-[200px]"
            >Проведение сделки</span
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <h1 class="text-[44px] leading-[42px] font-bold">
        Часто зававаемые вопросы
      </h1>

      <div class="flex flex-col gap-9 pt-3 pb-6 border-b border-[#EEF1F7]">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between items-center gap-4">
            <span class="text-2xl leading-5 font-bold"
              >Что такое ипотека ?</span
            >

            <img src="../nav-arrow-down.svg" alt="" class="rotate-180" />
          </div>

          <div class="flex flex-col gap-2">
            <span>text</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-9 pt-3 pb-6 border-b border-[#EEF1F7]">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between items-center gap-4">
            <span class="text-2xl leading-5 font-bold"
              >Что такое ипотека ?</span
            >

            <img src="../nav-arrow-down.svg" alt="" />
          </div>

          <!-- <div class="flex flex-col gap-2">
            <span>text</span>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-9 pt-3 pb-6 border-b border-[#EEF1F7]">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between items-center gap-4">
            <span class="text-2xl leading-5 font-bold"
              >Что такое ипотека ?</span
            >

            <img src="../nav-arrow-down.svg" alt="" />
          </div>

          <!-- <div class="flex flex-col gap-2">
            <span>text</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const breadcrumbs = [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/mortgage",
    title: "Ипотека",
  },
];
</script>

<style scoped></style>
/* background: #000000; */
