export function useReviewsPage() {
  const keyword = ref<string>();

  const isReviewDrawerVisible = ref(false);

  const reviewsTable = ref();

  watch(keyword, () => {
    reviewsTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isReviewDrawerVisible,
    reviewsTable,
  };
}
