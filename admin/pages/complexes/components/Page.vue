<script setup lang="ts">
import ComplexDrawer from "~/widgets/complexDrawer/components/ComplexDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import ComplexesTable from "~/widgets/complexesTable";

const {
  keyword,
  isComplexDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  complexesTable,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Жилые комплексы" />

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
        title="Создать задачу"
        @click="isComplexDrawerVisible = true"
      />
    </div>

    <ComplexesTable ref="complexesTable" :filter="filter" :keyword="keyword" />

    <ComplexDrawer
      v-if="isComplexDrawerVisible"
      @close="isComplexDrawerVisible = false"
      @save="$refs.complexesTable?.refetch"
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
