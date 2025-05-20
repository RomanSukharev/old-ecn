import {
  useBulkDeleteContactsMutation,
  useContactsQuery,
  type ContactFilter,
  type Contact,
  useDeleteContactMutation,
} from "~/shared/api/generated";
import {
  AgentColumn,
  ContactsColumn,
  ContactColumn,
  InternalNumberColumn,
  AddressColumn,
  CompanyColumn,
  TypeDealColumn,
} from "../components/internal/columns";

export function useTable(
  filter: ContactFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "internalNumber", header: "Номер", renderer: InternalNumberColumn },
    { key: "contact", header: "Контакт", renderer: ContactColumn },
    { key: "contacts", header: "Контакты", renderer: ContactsColumn },
    { key: "address", header: "Адрес", renderer: AddressColumn },
    { key: "company", header: "Компания", renderer: CompanyColumn },
    { key: "agent", header: "Сотрудник", renderer: AgentColumn },
    { key: "deal", header: "Тип сделки", renderer: TypeDealColumn },
  ]);

  const selectedItems = ref<Contact[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useContactsQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.contacts.nodes || []);

  const isContactDrawerVisible = ref(false);
  const editContactId = ref<string>();

  async function onEditItem(id: string) {
    editContactId.value = id;
    isContactDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный контакт?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },
      accept: () => {
        const { mutate, onDone, onError } = useDeleteContactMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Контакт удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить контакт",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ id });
      },
    });
  }
  async function onBulkDeleteItems(ids: string[]) {
    confirm.require({
      message: "Удалить выбранные контакты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },
      accept: () => {
        const { mutate, onDone, onError } = useBulkDeleteContactsMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Контакты удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить контакты",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    columns: readonly(columns),
    selectedItems,
    refetch,
    isContactDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    editContactId,
  };
}
