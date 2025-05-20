import {
  useVacanciesQuery,
  useDeleteVacancyMutation,
  type Vacancy,
} from "~/shared/api/generated";

import {
  TitleColumn,
  DescriptionColumn,
  ExperienceColumn,
  SalaryColumn,
  ScheduleColumn,
  StatusColumn,
  CreatedAtColumn,
} from "../components/internal/columns";

export function useTable(search: Ref<string | undefined>) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "title", header: "Название", renderer: TitleColumn },
    { key: "description", header: "Описание", renderer: DescriptionColumn },
    { key: "experience", header: "Опыт работы", renderer: ExperienceColumn },
    { key: "salary", header: "Заработная плата", renderer: SalaryColumn },
    { key: "schedule", header: "График", renderer: ScheduleColumn },
    { key: "status", header: "Статус", renderer: StatusColumn },
    { key: "createdAt", header: "Дата и время", renderer: CreatedAtColumn },
  ]);

  const selectedItems = ref<Vacancy[]>([]);

  const variables = computed(() => ({
    search: toValue(search),
  }));

  const { result, loading, refetch } = useVacanciesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.vacancies.nodes || []);

  const isVacancyDrawerVisible = ref(false);
  const editVacancyId = ref<string>();

  async function onEditItem(id: string) {
    editVacancyId.value = id;
    isVacancyDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранную вакансию?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeleteVacancyMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "вакансия удалена",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить вакансию",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ id });
      },
    });
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    columns: readonly(columns),
    selectedItems,
    refetch,
    isVacancyDrawerVisible,
    onEditItem,
    onDeleteItem,
    editVacancyId,
  };
}
