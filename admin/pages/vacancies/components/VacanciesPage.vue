<script setup lang="ts">
import VacancyDrawer from "~/widgets/vacancyDrawer/components/VacancyDrawer.vue";
import VacanciesTable from "~/widgets/vacanciesTable";
import { useVacanciesPage } from "../composables/useVacanciesPage";

const { keyword, isVacancyDrawerVisible, vacanciesTable } = useVacanciesPage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Вакансии" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Добавить вакансию"
        @click="isVacancyDrawerVisible = true"
      />
    </div>

    <VacanciesTable ref="vacanciesTable" :keyword="keyword" />

    <VacancyDrawer
      v-if="isVacancyDrawerVisible"
      @close="isVacancyDrawerVisible = false"
      @save="$refs.vacanciesTable?.refetch"
    />
  </div>
</template>
