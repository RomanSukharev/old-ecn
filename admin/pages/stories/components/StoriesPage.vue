<script setup lang="ts">
import StoryDrawer from "~/widgets/storyDrawer";
import StoriesTable from "~/widgets/storiesTable";
import { usePage } from "../composables/usePage";

const { keyword, isStoryDrawerVisible, storiesTable } = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Новости" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Добавить новость"
        @click="isStoryDrawerVisible = true"
      />
    </div>

    <StoriesTable ref="storiesTable" :keyword="keyword" />

    <StoryDrawer
      v-if="isStoryDrawerVisible"
      @close="isStoryDrawerVisible = false"
      @save="$refs.storiesTable?.refetch"
    />
  </div>
</template>
