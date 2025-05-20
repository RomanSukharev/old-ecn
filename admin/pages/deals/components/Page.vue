<script setup lang="ts">
import { DealDrawer } from "~/widgets/dealDrawer";
import FilterDrawer from "~/pages/deals/components/internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import ViewSelector from "./internal/ViewSelector.vue";
import DealsTable from "~/widgets/dealsTable";
import DealsKanban from "~/widgets/dealsKanban/components/Kanban.vue";
import { viewModes } from "~/widgets/dealDrawer/constants";

import ContractorTypeTabs from "./internal/ContractorTypeTabs.vue";

const {
  keyword,
  isDealDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  dealsTable,
  dealsKanban,
} = usePage();

const activeTab = ref(viewModes[0].id);
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Сделки" />

    <div class="flex mb-4 space-x-1">
      <ContractorTypeTabs v-model="filter.stage" class="grow" />

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
        title="Добавить сделку"
        @click="isDealDrawerVisible = true"
      />
    </div>

    <ViewSelector v-model="activeTab" class="mb-4" />

    <ECNSearchInput
      v-model="keyword"
      class="mb-5"
      placeholder="Укажите ключевое слово"
    />

    <DealsKanban
      v-if="activeTab === 'kanban'"
      ref="dealsKanban"
      :filter="filter"
      :keyword="keyword"
    />

    <DealsTable
      v-if="activeTab === 'list'"
      ref="dealsTable"
      :filter="filter"
      :keyword="keyword"
    />

    <DealDrawer
      v-if="isDealDrawerVisible"
      @close="isDealDrawerVisible = false"
      @save="
        activeTab === 'list'
          ? $refs.dealsTable?.refetch()
          : $refs.dealsKanban?.refetch()
      "
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
