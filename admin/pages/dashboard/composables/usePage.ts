import { useDashboardQuery } from "@/shared/api/generated";

export function usePage() {
  const { result, loading } = useDashboardQuery();

  const properties = computed(() => result.value?.properties.totalCount ?? 0);
  const complexes = computed(() => result.value?.complexes.totalCount ?? 0);
  const villages = computed(() => result.value?.villages.totalCount ?? 0);
  const developers = computed(() => result.value?.developers.totalCount ?? 0);
  const employees = computed(() => result.value?.employees.totalCount ?? 0);
  const roles = computed(() => result.value?.roles.totalCount ?? 0);

  return {
    loading: readonly(loading),
    properties: readonly(properties),
    complexes: readonly(complexes),
    villages: readonly(villages),
    developers: readonly(developers),
    employees: readonly(employees),
    roles: readonly(roles),
  };
}
