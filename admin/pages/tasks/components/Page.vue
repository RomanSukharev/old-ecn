<script setup lang="ts">
import { usePage } from "../composables/usePage";
import TasksTable from "~/widgets/tasksTable";
import TaskDrawer from "~/widgets/taskDrawer/components/TaskDrawer.vue";
import FilterDrawer from "./internal/FilterDrawer.vue";
import StatusChips from "./internal/StatusChips.vue";

const {
  keyword,
  filter,
  tasksTable,
  isTaskDrawerVisible,
  isFilterDrawerVisible,
  onApplyFilter,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Задачи" />

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
        @click="isTaskDrawerVisible = true"
      />
    </div>

    <StatusChips v-model="filter.status" class="mb-5" />

    <TasksTable ref="tasksTable" :filter="filter" :keyword="keyword" />

    <TaskDrawer
      v-if="isTaskDrawerVisible"
      @close="isTaskDrawerVisible = false"
      @save="$refs.tasksTable?.refetch"
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
