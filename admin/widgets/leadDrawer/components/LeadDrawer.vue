<script setup lang="ts">
import {
  // usePropertiesQuery,
  useEmployeesQuery,
  LeadStatusEnum,
  useDeleteLeadMutation,
  useLeadQuery,
  useSaveLeadMutation,
} from "~/shared/api/generated";
import { useDrawer } from "../composables/useLeadDrawer";
import { leadSources, leadStatuses, leadTypes } from "../constants";
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

// const { result: propertiesRaw } = usePropertiesQuery();
// const properties = computed(() => propertiesRaw.value?.properties.nodes ?? []);

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      ...employee,
      title: `${employee.name} ${employee.surname}`,
    })) ?? []
  );
});

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,
  surname,
  name,
  patronymic,
  birthday,
  phone,
  additionalPhones,
  email,
  company,
  address,
  type,
  agentIDs,
  source,
  request,
  status,
  comment,
  loading,
  setErrors,
  setTouched,
} = useDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useLeadQuery({ id: props.id });

  onResult((res) => {
    const lead = res.data.lead;

    address.value = lead.address;
    agentIDs.value = lead.agents?.map((a) => a.id);
    birthday.value = lead.birthday;
    comment.value = lead.comment;
    company.value = lead.company;
    email.value = lead.email;
    name.value = lead.name;
    surname.value = lead.surname;
    patronymic.value = lead.patronymic;
    phone.value = lead.phone;
    additionalPhones.value = lead.additionalPhones || [];
    request.value = lead.request;
    source.value = lead.source;
    status.value = lead.status;
    type.value = lead.type;

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
} else {
  additionalPhones.value = [];
  status.value = LeadStatusEnum.NEW;
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveLeadMutation();

  if (values.phone) {
    values.phone = clearPhone(values.phone);
  }

  if (values.additionalPhones) {
    values.additionalPhones = values.additionalPhones
      .map((num) => {
        const cleanedPhone = clearPhone(num);
        return cleanedPhone;
      })
      .filter((num) => num !== "");
  }

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Лид успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить лид",
      severity: "error",
      life: 5000,
    });
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить лид",
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
    message: "Удалить выбранный лид?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },
    accept: () => {
      const { mutate, onDone, onError } = useDeleteLeadMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Лид удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить лид",
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
            v-model="surname"
            inline
            required
            label="Фамилия"
            placeholder="Укажите фамилию"
            :error="errors.surname"
          />

          <ECNFormInput
            v-model="name"
            inline
            required
            label="Имя"
            placeholder="Укажите имя"
            :error="errors.name"
          />

          <ECNFormInput
            v-model="patronymic"
            inline
            label="Отчество"
            placeholder="Укажите отчество"
            :error="errors.patronymic"
          />

          <ECNFormDate
            v-model="birthday"
            inline
            label="Дата рождения"
            placeholder="дд мм гггг"
            :error="errors.birthday"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormPhoneInput
            v-model="phone"
            inline
            required
            label="Телефон"
            :error="errors.phone"
          />

          <ECNFormAdditionalPhones
            v-model:additional-phones="additionalPhones"
            inline
            label="Телефон"
            placeholder="+7 (___) ___-____"
            class="w-full"
            :error="errors.additionalPhones"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormInput
            v-model="email"
            inline
            required
            label="E-mail"
            placeholder="Укажите E-mail"
            :error="errors.email"
          />

          <ECNFormInput
            v-model="company"
            inline
            label="Компания"
            placeholder="Укажите компанию"
            :error="errors.company"
          />

          <ECNFormInput
            v-model="address"
            inline
            label="Адрес"
            placeholder="Укажите адрес"
            :error="errors.address"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormMultiSelect
            v-model="agentIDs"
            :items="employees"
            inline
            label="Агент"
            placeholder="Укажите агента"
            :error="errors.agentIDs"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="type"
            :items="leadTypes"
            inline
            required
            label="Тип лида"
            placeholder="Не выбран"
            :error="errors.type"
            new-select
          />

          <ECNFormSelect
            v-model="source"
            :items="leadSources"
            inline
            required
            label="Источник"
            placeholder="Не выбран"
            :error="errors.source"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormTextarea
            v-model="request"
            inline
            label="Заявка"
            placeholder="Введите текст"
            :error="errors.request"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="status"
            :items="leadStatuses"
            inline
            required
            label="Статус"
            placeholder="Не выбран"
            :error="errors.status"
            new-select
          />

          <ECNFormTextarea
            v-if="status === LeadStatusEnum.REFUSED"
            v-model="comment"
            inline
            label="Причина"
            placeholder="Укажите текст"
            :error="errors.comment"
          />
        </div>
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="props.id"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteHandler(props.id)"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSaveHandler">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
