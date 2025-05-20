import type { PropertyFilter, Property } from "@/shared/api/generated";
import {
  // PropertyTypeEnum,
  // PublicationStatusEnum,
  useBulkApprovePropertiesMutation,
  useBulkArchivePropertiesMutation,
  useBulkDeclinePropertiesMutation,
  useBulkDeletePropertiesMutation,
  useBulkRefreshPropertiesMutation,
  useDeletePropertyMutation,
  usePropertiesQuery,
} from "@/shared/api/generated";

import {
  IDColumn,
  TypePropertyColumn,
  NamePropertyColumn,
  ApartmentComplexColumn,
  AddressColumn,
  PhotoColumn,
  BuildDateColumn,
  DistanceToCityColumn,
  PriceColumn,
  DatesColumn,
} from "../components/internal/columns";

export function useTable(
  filter: PropertyFilter | undefined,
  search: Ref<string | undefined>,
) {
  const confirm = useConfirm();
  const toast = useToast();

  const columns = computed(() => [
    { key: "id", header: "ID", renderer: IDColumn },
    {
      key: "typeProperty",
      header: "Тип недвижимости",
      renderer: TypePropertyColumn,
    },
    {
      key: "nameProperty",
      header: "Название объекта",
      renderer: NamePropertyColumn,
    },
    {
      key: "apartmentComplex",
      header: "ЖК",
      renderer: ApartmentComplexColumn,
    },
    { key: "address", header: "Адрес", renderer: AddressColumn },
    { key: "photo", header: "Фото", renderer: PhotoColumn },
    { key: "buildDate", header: "Год постройки", renderer: BuildDateColumn },
    {
      key: "locality",
      header: "Расстояние до города",
      renderer: DistanceToCityColumn,
    },
    { key: "dates", header: "Стоимость", renderer: PriceColumn },
    { key: "dates", header: "Даты", renderer: DatesColumn },
  ]);

  const selectedItems = ref<Property[]>([]);

  const variables = computed(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = usePropertiesQuery(variables, {
    debounce: 300,
  });

  const items = computed(() => result.value?.properties.nodes || []);

  const isPropertyDrawerVisible = ref(false);
  const editLeadId = ref<string>();

  async function onEditItem(id: string) {
    editLeadId.value = id;
    isPropertyDrawerVisible.value = true;
  }

  async function onDeleteItem(id: string) {
    confirm.require({
      message: "Удалить выбранный объект?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useDeletePropertyMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объект удалён",
            severity: "info",
            life: 5000,
          });
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить объект",
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
      message: "Удалить выбранные объекты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Удалить",
      acceptProps: {
        severity: "danger",
      },

      accept: () => {
        const { mutate, onDone, onError } = useBulkDeletePropertiesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объекты удалены",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось удалить объекты",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  async function onMassRefresh(ids: string[]) {
    confirm.require({
      message: "Актуализировать выбранные объекты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Актуализировать",
      acceptProps: {
        severity: "info",
      },

      accept: async () => {
        const { mutate, onDone, onError } = useBulkRefreshPropertiesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объекты актуализированы",
            severity: "info",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось актуализировать объекты",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  async function onMassApprove(ids: string[]) {
    confirm.require({
      message: "Опубликовать выбранные объекты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Опубликовать",
      acceptProps: {
        severity: "success",
      },

      accept: async () => {
        const { mutate, onDone, onError } = useBulkApprovePropertiesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объекты опубликованы",
            severity: "success",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось опубликовать объекты",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  async function onMassDecline(ids: string[]) {
    confirm.require({
      message: "Отклонить выбранные объекты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Отклонить",
      acceptProps: {
        severity: "success",
      },

      accept: async () => {
        const { mutate, onDone, onError } = useBulkDeclinePropertiesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объекты отклонены",
            severity: "success",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось отклонить объекты",
            severity: "error",
            life: 5000,
          });
        });

        mutate({ ids });
      },
    });
  }

  async function onMassArchive(ids: string[]) {
    confirm.require({
      message: "Архивировать выбранные объекты?",
      header: "Внимание",
      rejectLabel: "Отменить",
      acceptLabel: "Архивировать",
      acceptProps: {
        severity: "success",
      },

      accept: async () => {
        const { mutate, onDone, onError } = useBulkArchivePropertiesMutation();

        onDone(() => {
          toast.add({
            summary: "Операция завершена",
            detail: "Объекты архивированы",
            severity: "success",
            life: 5000,
          });

          selectedItems.value = [];
          refetch();
        });

        onError(() => {
          toast.add({
            summary: "Ошибка",
            detail: "Не удалось архивировать объекты",
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
    isPropertyDrawerVisible,
    onEditItem,
    onDeleteItem,
    onBulkDeleteItems,
    onMassRefresh,
    onMassApprove,
    onMassDecline,
    onMassArchive,
    editLeadId,
  };
}
