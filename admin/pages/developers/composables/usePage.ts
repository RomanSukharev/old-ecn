export function usePage() {
  const keyword = ref<string>();

  const isDeveloperDrawerVisible = ref(false);

  const developersTable = ref();

  watch(keyword, () => {
    developersTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isDeveloperDrawerVisible,
    developersTable,
  };
}
