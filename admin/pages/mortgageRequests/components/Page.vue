<script setup lang="ts">
import { usePage } from "../composables/usePage";
import MortgageRequestsTable from "~/widgets/mortgageRequestsTable";
import MortgageRequestDrawer from "~/widgets/mortgageRequestDrawer/components/MortgageRequestDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import StatusChips from "./internal/StatusChips.vue";
const {
  keyword,
  filter,
  mortgageRequestsTable,
  isFilterDrawerVisible,
  isMortgageRequestDrawerVisible,
  onApplyFilter,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Ипотека" />

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
        title="Создать ипотечную заявку"
        @click="isMortgageRequestDrawerVisible = true"
      />
    </div>

    <StatusChips v-model="filter.status" class="mb-5" />

    <MortgageRequestsTable
      ref="mortgageRequestsTable"
      :filter="filter"
      :keyword="keyword"
    />

    <MortgageRequestDrawer
      v-if="isMortgageRequestDrawerVisible"
      @close="isMortgageRequestDrawerVisible = false"
      @save="$refs.mortgageRequestsTable?.refetch"
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
