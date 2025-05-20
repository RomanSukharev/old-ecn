<script setup lang="ts">
import { usePage } from "../composables/usePage";
import MeetsTable from "~/widgets/meetsTable";
import ViewSelector from "./internal/ViewSelector.vue";
import MeetDrawer from "~/widgets/meetDrawer/components/MeetDrawer.vue";
import MeetsCalendar from "~/widgets/meetsCalendar";
import FilterDrawer from "./internal/FilterDrawer.vue";
import StatusChips from "./internal/StatusChips.vue";
// import { ViewModeEnum } from "../types";
import { viewTabs } from "~/widgets/meetDrawer/constants";

const {
  keyword,
  filter,
  meetsTable,
  meetsCalendar,
  isMeetDrawerVisible,
  isFilterDrawerVisible,
  onApplyFilter,
  // viewMode,
} = usePage();

const activeTab = ref(viewTabs[0].id);
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Встречи / показы" />

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
        title="Создать встречу/показ"
        @click="isMeetDrawerVisible = true"
      />
    </div>

    <StatusChips v-model="filter.type" class="mb-4" />

    <ViewSelector v-model="activeTab" class="mb-4" />

    <MeetsTable
      v-if="activeTab === 'list'"
      ref="meetsTable"
      :filter="filter"
      :keyword="keyword"
    />

    <MeetsCalendar
      v-if="activeTab === 'calendar'"
      ref="meetsCalendar"
      :filter="filter"
      :keyword="keyword"
    />

    <MeetDrawer
      v-if="isMeetDrawerVisible"
      @close="isMeetDrawerVisible = false"
      @save="
        activeTab === 'list'
          ? $refs.meetsTable?.refetch()
          : $refs.meetsCalendar?.refetch()
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
