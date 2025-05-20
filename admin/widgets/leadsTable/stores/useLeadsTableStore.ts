import type { Lead } from "~/shared/api/generated";

export const useLeadsTableStore = defineStore("leadsTableStore", () => {
  const selectedItems = ref<Lead[]>([]);

  return {
    selectedItems,
  };
});
