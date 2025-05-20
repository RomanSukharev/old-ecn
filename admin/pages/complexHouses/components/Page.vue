<script setup lang="ts">
import ComplexHouseDrawer from "~/widgets/complexHouseDrawer/components/ComplexHouseDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import ComplexHousesTable from "~/widgets/complexHousesTable";

const {
  keyword,
  isComplexHousesDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  complexHousesTable,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Новостройки" />

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
        title="Создать новостройку"
        @click="isComplexHousesDrawerVisible = true"
      />
    </div>

    <ComplexHousesTable
      ref="complexHousesTable"
      :filter="filter"
      :keyword="keyword"
    />

    <ComplexHouseDrawer
      v-if="isComplexHousesDrawerVisible"
      @close="isComplexHousesDrawerVisible = false"
      @save="$refs.complexHousesTable?.refetch"
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
