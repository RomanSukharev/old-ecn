<template>
  <div
    class="flex px-5 py-3 justify-between items-center shrink-0 max-w-desktop rounded-2.5xl shadow-lg"
  >
    <NuxtLink to="/" class="mr-13 w-auto"
      ><i-common-header-logo class="w-[92px]"
    /></NuxtLink>

    <div class="flex items-center space-x-8 grow">
      <HeadlessPopover class="relative">
        <HeadlessPopoverButton
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-600 cursor-pointer"
          ><span class="font-medium text-base">Купить</span>

          <i-common-header-chevron-down
        /></HeadlessPopoverButton>

        <HeadlessPopoverPanel
          v-slot="{ close }"
          class="absolute rounded-b-xl bg-gray-100 w-[325px] flex flex-col space-y-px divide-gray-100 z-10"
        >
          <NuxtLink
            to="/properties/new"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-new.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Новостройки</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/used"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-used.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Вторичная недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/suburban"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-suburban.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Загородная недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/commercial"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-commercial.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Коммерческая недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/village"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-village.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Коттеджные поселки</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>
        </HeadlessPopoverPanel>
      </HeadlessPopover>

      <HeadlessPopover class="relative">
        <HeadlessPopoverButton
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-600 cursor-pointer"
          ><span class="font-medium text-base">Снять</span>

          <i-common-header-chevron-down
        /></HeadlessPopoverButton>

        <HeadlessPopoverPanel
          v-slot="{ close }"
          class="absolute rounded-b-xl bg-gray-100 w-[325px] flex flex-col space-y-px divide-gray-100 z-10"
        >
          <NuxtLink
            to="/properties/new"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-new.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Новостройки</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/used"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-used.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Вторичная недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/suburban"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-suburban.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Загородная недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/commercial"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-commercial.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Коммерческая недвижимость</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/properties/village"
            class="p-4 flex items-center space-x-5 bg-white"
            @click="close"
          >
            <img src="/img/type-village.png" class="w-10 h-10" />

            <div class="">
              <div class="font-medium">Коттеджные поселки</div>

              <div class="text-sm text-gray-400">1546 объявлений</div>
            </div>
          </NuxtLink>
        </HeadlessPopoverPanel>
      </HeadlessPopover>

      <NuxtLink
        class="font-medium text-gray-900 text-base hover:text-blue-600"
        to="/mortgage"
        >Ипотека</NuxtLink
      >

      <NuxtLink
        class="font-medium text-gray-900 text-base hover:text-blue-600"
        to="/vacancies"
        >Вакансии</NuxtLink
      >

      <NuxtLink
        class="font-medium text-gray-900 text-base hover:text-blue-600"
        to="/about"
        >О компании</NuxtLink
      >

      <NuxtLink
        class="font-medium text-gray-900 text-base hover:text-blue-600"
        to="/stories"
        >Новости</NuxtLink
      >
    </div>

    <div class="mr-5 text-blue-600 font-medium">+7(3452) 606-694</div>

    <NuxtLink
      to="/favorites"
      class="cursor-pointer p-3 rounded-md text-blue-600 hover:bg-gray-100"
    >
      <i-common-header-fav class="text-xl" />
    </NuxtLink>
    <!-- <div class="cursor-pointer p-3 rounded-md text-blue-600 hover:bg-gray-100">
      <i-common-header-user class="text-xl" />
    </div> -->
  </div>
</template>

<script lang="ts" setup></script>
