<script setup lang="ts">
import { ContactDrawer } from "~/widgets/contactDrawer";
import FilterDrawer from "~/pages/contacts/components/internal/FilterDrawer.vue";
import { usePage } from "../composables/usePage";
import ContactsTable from "~/widgets/contactsTable";
import ContractorTypeTabs from "./internal/ContractorTypeTabs.vue";

const {
  keyword,
  isContactDrawerVisible,
  isFilterDrawerVisible,
  filter,
  onApplyFilter,
  contactsTable,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Контакты" />

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
        title="Добавить контакт"
        @click="isContactDrawerVisible = true"
      />
    </div>

    <ECNSearchInput
      v-model="keyword"
      class="mb-5"
      placeholder="Укажите ключевое слово"
    />

    <ContactsTable ref="contactsTable" :filter="filter" :keyword="keyword" />

    <ContactDrawer
      v-if="isContactDrawerVisible"
      @close="isContactDrawerVisible = false"
      @save="$refs.contactsTable?.refetch"
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
