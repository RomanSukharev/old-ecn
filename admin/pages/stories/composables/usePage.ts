export function usePage() {
  const keyword = ref<string>();

  const isStoryDrawerVisible = ref(false);

  const storiesTable = ref();

  watch(keyword, () => {
    storiesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isStoryDrawerVisible,
    storiesTable,
  };
}
