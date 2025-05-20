<script setup lang="ts">
import PageDrawer from "~/widgets/pageDrawer/components/PageDrawer.vue";
import PagesTable from "~/widgets/pagesTable";
import { usePagesPage } from "../composables/usePagesPage";

const { keyword, isPageDrawerVisible, pagesTable } = usePagesPage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Страницы и контент" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Добавить страницу"
        @click="isPageDrawerVisible = true"
      />
    </div>

    <PagesTable ref="pagesTable" :keyword="keyword" />

    <PageDrawer
      v-if="isPageDrawerVisible"
      @close="isPageDrawerVisible = false"
      @save="$refs.pagesTable?.refetch"
    />
  </div>
</template>
