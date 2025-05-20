export function usePagesPage() {
  const keyword = ref<string>();

  const isPageDrawerVisible = ref(false);

  const pagesTable = ref();

  watch(keyword, () => {
    pagesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isPageDrawerVisible,
    pagesTable,
  };
}
