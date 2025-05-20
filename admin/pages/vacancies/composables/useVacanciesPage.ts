export function useVacanciesPage() {
  const keyword = ref<string>();

  const isVacancyDrawerVisible = ref(false);
  const vacanciesTable = ref();

  watch(keyword, () => {
    vacanciesTable.value.selectedItems = undefined;
  });

  return {
    keyword,
    isVacancyDrawerVisible,
    vacanciesTable,
  };
}
