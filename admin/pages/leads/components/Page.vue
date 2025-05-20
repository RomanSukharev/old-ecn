<script setup lang="ts">
import LeadDrawer from "~/widgets/leadDrawer";
import FilterDrawer from "~/pages/leads/components/internal/FilterDrawer.vue";
import LeadsTable from "~/widgets/leadsTable";
import ContractorTypeTabs from "./internal/ContractorTypeTabs.vue";
import StatusChips from "./internal/StatusChips.vue";
import { usePage } from "../composables/usePage";

const {
  filter,
  keyword,
  isLeadDrawerVisible,
  isFilterDrawerVisible,
  leadsTable,
  onApplyFilter,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Лиды" />

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
        title="Добавить лид"
        @click="isLeadDrawerVisible = true"
      />
    </div>

    <ECNSearchInput
      v-model="keyword"
      class="mb-4"
      placeholder="Укажите ключевое слово"
    />

    <StatusChips v-model="filter.status" class="mb-5" />

    <LeadsTable ref="leadsTable" :filter="filter" :keyword="keyword" />

    <LeadDrawer
      v-if="isLeadDrawerVisible"
      @close="isLeadDrawerVisible = false"
      @save="$refs.leadsTable?.refetch"
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
