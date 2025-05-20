<script setup lang="ts">
import ReviewDrawer from "~/widgets/reviewDrawer/components/ReviewDrawer.vue";
import ReviewsTable from "~/widgets/reviewsTable";
import { useReviewsPage } from "../composables/useReviewsPage";

const { keyword, isReviewDrawerVisible, reviewsTable } = useReviewsPage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Отзывы на сотрудников" />

    <div class="flex space-x-1 items-center mb-5">
      <ECNSearchInput
        v-model="keyword"
        class="grow mr-4"
        placeholder="Укажите ключевое слово"
      />

      <ECNButton
        small
        left-icon="i-plus"
        title="Добавить отзыв"
        @click="isReviewDrawerVisible = true"
      />
    </div>

    <ReviewsTable ref="reviewsTable" :keyword="keyword" />

    <ReviewDrawer
      v-if="isReviewDrawerVisible"
      @close="isReviewDrawerVisible = false"
      @save="$refs.reviewsTable?.refetch"
    />
  </div>
</template>
