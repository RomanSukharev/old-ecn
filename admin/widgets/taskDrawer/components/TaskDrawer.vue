<script setup lang="ts">
import {
  usePropertiesQuery,
  useLeadsQuery,
  useContactsQuery,
  useDealsQuery,
  useEmployeesQuery,
  useDeleteTaskMutation,
  useTaskQuery,
  useSaveTaskMutation,
} from "~/shared/api/generated";
import { useTaskDrawer } from "../composables/useTaskDrawer";
import type { IProps } from "../types";
import { clearPhone } from "~/shared/helpers/clearPhone";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = defineProps<IProps>();

const toast = useToast();
const confirm = useConfirm();

const { result: propertiesRaw } = usePropertiesQuery();
const properties = computed(() => propertiesRaw.value?.properties.nodes ?? []);

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      ...employee,
      title: `${employee.name} ${employee.surname}`,
    })) ?? []
  );
});

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...contact,
      title: `${contact.name} ${contact.surname}`,
    })) ?? []
  );
});

const { result: leadsRaw } = useLeadsQuery();
const leads = computed(() => {
  return (
    leadsRaw.value?.leads.nodes.map((lead) => ({
      ...lead,
      title: `${lead.name} ${lead.surname}`,
    })) ?? []
  );
});

const { result: dealsRaw } = useDealsQuery();
const deals = computed(() => {
  return (
    dealsRaw.value?.deals.nodes.map((deal) => ({
      ...deal,
      title: "Сделка " + `${deal.internalNumber}`,
    })) ?? []
  );
});

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,
  title,
  assigneeID,
  contactID,
  contactPhone,
  dealID,
  details,
  durationDays,
  durationHours,
  isHot,
  leadID,
  propertyID,
  reporterID,
  startDate,
  tag,
  setErrors,
  setTouched,
  loading,
} = useTaskDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useTaskQuery({ id: props.id });

  onResult((res) => {
    const task = res.data.task;

    title.value = task.title;
    assigneeID.value = task.assignee?.id;
    contactID.value = task.contact?.id;
    contactPhone.value = task.contactPhone || undefined;
    dealID.value = task.deal?.id;
    details.value = task.details;
    durationDays.value = task.durationDays || undefined;
    durationHours.value = task.durationHours || undefined;
    isHot.value = task.isHot;
    leadID.value = task.lead?.id;
    propertyID.value = task.property?.id;
    reporterID.value = task.reporter?.id;
    startDate.value = task.startDate;
    tag.value = task.tag;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить лид",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveTaskMutation();

  if (values.contactPhone) {
    values.contactPhone = clearPhone(values.contactPhone);
  }

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Задача успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить задачу",
      severity: "error",
      life: 5000,
    });
  });

  mutate({
    input: {
      id: props.id,
      ...values,
    },
  });
});

function onDeleteHandler(id: string) {
  confirm.require({
    message: "Удалить выбранную задачу?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteTaskMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Задача удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить задачу",
          severity: "error",
          life: 5000,
        });
      });

      mutate({ id });
    },
  });
}
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <div class="space-y-4">
          <ECNFormInput
            v-model="title"
            inline
            label="Задача"
            placeholder="Укажите название"
            :error="errors.title"
          />

          <ECNFormToggle v-model="isHot" class="mb-4 ml-32" label="срочная" />

          <ECNDivider class="my-10 pt-8" />

          <ECNFormSelect
            v-model="assigneeID"
            inline
            :items="employees"
            class="pt-8"
            label="Исполнитель"
            placeholder="Укажите исполнителя"
            :error="errors.assigneeID"
            new-select
            item-label="title"
          />

          <ECNFormSelect
            v-model="reporterID"
            inline
            :items="employees"
            label="Проверяющий"
            placeholder="Укажите проверяющего"
            :error="errors.reporterID"
            new-select
            item-label="title"
          />

          <ECNFormSelect
            v-model="propertyID"
            inline
            :items="properties"
            required
            label="Объект"
            placeholder="Укажите объект"
            :error="errors.propertyID"
            new-select
          />

          <ECNFormSelect
            v-model="contactID"
            inline
            :items="contacts"
            label="Контакт"
            placeholder="Укажите контакт"
            :error="errors.contactID"
            new-select
            item-label="title"
          />

          <ECNFormPhoneInput
            v-model="contactPhone"
            inline
            class="mb-4"
            label="Телефон"
            :error="errors.contactPhone"
          />

          <ECNFormSelect
            v-model="leadID"
            inline
            :items="leads"
            label="Лид"
            placeholder="Укажите лид"
            :error="errors.leadID"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="dealID"
            inline
            :items="deals"
            label="Сделка"
            placeholder="Укажите сделку"
            :error="errors.dealID"
            new-select
          />

          <ECNFormDateTime
            v-model="startDate"
            inline
            label="Начало"
            placeholder-date="дд мм гггг"
            placeholder-time="чч мм"
            :error="errors.startDate"
          />

          <ECNFormNumberPeriod
            v-model:days="durationDays"
            v-model:hours="durationHours"
            class="mb-4"
            inline
            label="Срок"
          />

          <ECNFormTextarea
            v-model="details"
            inline
            label="Информация"
            placeholder="Опишите задачу"
            :error="errors.details"
          />

          <ECNFormInput
            v-model="tag"
            inline
            label="Метка"
            placeholder="Укажите метку"
            :error="errors.tag"
          />

          <ECNDivider class="my-10 pt-8" />

          <ECNFormToggle v-model="isHot" class="mb-4" label="Выполнено" />
        </div>
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="id"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteHandler"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSaveHandler">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
