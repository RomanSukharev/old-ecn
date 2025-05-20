<script setup lang="ts">
import VillageDrawer from "~/widgets/villageDrawer/components/VillageDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import VillagesTable from "~/widgets/villagesTable";

const {
  keyword,
  isVillageDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  villagesTable,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Коттеджные посёлки" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        outline
        small
        title="Фильтр"
        right-icon="i-filter"
        @click="isFilterDrawerVisible = true"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Создать КП"
        @click="isVillageDrawerVisible = true"
      />
    </div>

    <VillagesTable ref="villagesTable" :filter="filter" :keyword="keyword" />

    <VillageDrawer
      v-if="isVillageDrawerVisible"
      @close="isVillageDrawerVisible = false"
      @save="$refs.villagesTable?.refetch"
    />

    <FilterDrawer
      v-if="isFilterDrawerVisible"
      v-bind="filter"
      :keyword="keyword"
      @close="isFilterDrawerVisible = false"
      @apply="onApplyFilter"
    />
  </div>
</template>
