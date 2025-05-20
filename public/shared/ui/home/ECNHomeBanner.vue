<template>
  <div
    class="ECN--HomeBanner relative h-120 rounded-xl flex flex-col items-center justify-center max-w-desktop grow mx-auto px-16"
  >
    <h1 class="text-[52px] font-bold">Единый центр недвижимости</h1>

    <div class="ECN--HomeBanner-Search flex flex-col space-y-2 w-full">
      <div class="flex space-x-2">
        <div
          class="cursor-pointer p-2 rounded bg-gray-100 hover:bg-gray-200 font-medium text-gray-400 text-xs"
        >
          Покупка
        </div>

        <div
          class="cursor-pointer p-2 rounded bg-gray-100 hover:bg-gray-200 font-medium text-gray-400 text-xs"
        >
          Аренда
        </div>
      </div>

      <div class="bg-white rounded-xl p-6"></div>

      <div class="flex justify-end space-x-2">
        <div
          class="rounded-md px-6 py-3 text-base font-medium bg-white text-blue-600 cursor-pointer"
        >
          На карте
        </div>

        <div
          class="rounded-md px-6 py-3 text-base font-medium bg-blue-600 text-white cursor-pointer"
        >
          Показать 567 объявлений
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.ECN--HomeBanner {
  background: radial-gradient(
    762.83% 141.42% at 0% 0%,
    #ffe3e6 0%,
    #efdaff 61.52%,
    #d0e0ff 100%
  );
}
</style>
