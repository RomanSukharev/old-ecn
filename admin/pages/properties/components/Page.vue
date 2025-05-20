<script setup lang="ts">
import PropertyDrawer from "~/widgets/propertyDrawer/components/PropertyDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import PropertiesTable from "~/widgets/propertiesTable";
import ContractorTypeTabs from "./internal/ContractorTypeTabs.vue";

const {
  keyword,
  isPropertyDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  propertiesTable,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Объекты" />

    <div class="flex mb-4 space-x-1">
      <ContractorTypeTabs v-model="filter.type" class="grow" />

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
        title="Добавить объект"
        @click="isPropertyDrawerVisible = true"
      />
    </div>

    <ECNSearchInput
      v-model="keyword"
      class="mb-5"
      placeholder="Укажите ключевое слово"
    />

    <PropertiesTable
      ref="propertiesTable"
      :filter="filter"
      :keyword="keyword"
    />

    <PropertyDrawer
      v-if="isPropertyDrawerVisible"
      @close="isPropertyDrawerVisible = false"
      @save="$refs.propertiesTable?.refetch"
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
