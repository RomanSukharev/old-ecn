<script setup lang="ts">
import DeveloperDrawer from "~/widgets/devepolerDrawer/components/DeveloperDrawer.vue";
import { usePage } from "../composables/usePage";
import DevelopersTable from "~/widgets/developersTable";

const { keyword, isDeveloperDrawerVisible, developersTable } = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Застройщики" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Создать застройщика"
        @click="isDeveloperDrawerVisible = true"
      />
    </div>

    <DevelopersTable ref="developersTable" :keyword="keyword" />

    <DeveloperDrawer
      v-if="isDeveloperDrawerVisible"
      @close="isDeveloperDrawerVisible = false"
      @save="$refs.developersTable?.refetch"
    />
  </div>
</template>
