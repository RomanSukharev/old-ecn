<script setup lang="ts">
import {
  usePropertiesQuery,
  useDealsQuery,
  useEmployeesQuery,
  useDeleteContactMutation,
  useContactQuery,
  useSaveContactMutation,
  type DocumentInput,
} from "~/shared/api/generated";
import { useContactDrawer } from "../composables/useContactDrawer";
import { contactSources, contactTypes } from "../constants";
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

const { result: dealsRaw } = useDealsQuery();
const deals = computed(() => {
  return (
    dealsRaw.value?.deals.nodes.map((deal) => ({
      ...deal,
      title: "Сделка " + `${deal.internalNumber}`,
    })) ?? []
  );
});

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

  address,
  // internalInfo,
  dealIDs,
  agentIDs,
  propertyIDs,
  surname,
  name,
  patronymic,
  birthday,
  phone,
  email,
  contracts,
  documents,
  additionalPhones,
  formatIssuerCode,
  formatPassportNumber,
  company,
  type,
  source,
  note,
  passportIssueDate,
  passportIssuedBy,
  passportIssuerCode,
  passportNumber,
  loading,

  setErrors,
  setTouched,
} = useContactDrawer(props);

function filterDocuments(docs: Array<DocumentInput & { file?: File }>) {
  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    ...(doc.file ? { file: doc.file } : {}),
  }));
}

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useContactQuery({ id: props.id });

  onResult((res) => {
    const contact = res.data.contact;

    additionalPhones.value = contact.additionalPhones || [];
    birthday.value = contact.birthday!;
    company.value = contact.company;
    email.value = contact.email!;
    name.value = contact.name!;
    surname.value = contact.surname!;
    propertyIDs.value = contact.properties?.map((a) => a.id) || [];
    // agentIDs.value = contact.agents?.map((a) => a.id);
    agentIDs.value = contact.agents ? contact.agents.map((a) => a.id) : null;
    dealIDs.value = contact.deals?.map((a) => a.id);
    address.value = contact.address;
    patronymic.value = contact.patronymic!;
    passportIssueDate.value = contact.passportIssueDate;
    passportIssuedBy.value = contact.passportIssuedBy;
    passportIssuerCode.value = contact.passportIssuerCode;
    passportNumber.value = contact.passportNumber;
    contracts.value = contact.contracts!;
    documents.value = contact.documents!;
    note.value = contact.note;
    phone.value = contact.phone!;
    source.value = contact.source;
    type.value = contact.type;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить контакт",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  contracts.value = [];
  documents.value = [];
  additionalPhones.value = [];
  propertyIDs.value = [];
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveContactMutation();

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
      detail: "Контакт успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить контакт",
      severity: "error",
      life: 5000,
    });
  });

  const formattedValues = {
    ...values,
    propertyIDs: Array.isArray(values.propertyIDs)
      ? values.propertyIDs
      : values.propertyIDs
        ? [values.propertyIDs]
        : [],
    contracts: filterDocuments(values.contracts ?? []),
    documents: filterDocuments(values.documents ?? []),
  };

  mutate({
    input: {
      id: props.id,
      ...formattedValues,
    },
  });
});

function onDeleteHandler(id: string) {
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
        emit("delete");
        emit("close");
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
          <ECNFormSelect
            v-model="type"
            :items="contactTypes"
            inline
            required
            label="Тип контакта"
            placeholder="Не выбран"
            :error="errors.type"
            new-select
          />

          <ECNFormSelect
            v-model="source"
            :items="contactSources"
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
            placeholder="+7 (___) ___-__-__"
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

          <ECNFormMultiSelect
            v-if="type === 'SALER'"
            v-model="propertyIDs"
            :items="properties"
            inline
            label="Объект"
            placeholder="Укажите объект"
            :error="errors.propertyIDs"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormInput
            v-model="passportNumber"
            class="w-max"
            inline
            label="Серия и номер паспорта"
            placeholder="____/ ______"
            :error="errors.passportNumber"
            @input="passportNumber = formatPassportNumber($event.target.value)"
          />

          <ECNFormInput
            v-model="passportIssuedBy"
            label="Кем выдан"
            placeholder="Укажите орган, выдавший документ"
            :error="errors.passportIssuedBy"
            inline
          />

          <ECNFormDate
            v-model="passportIssueDate"
            class="w-max"
            inline
            label="Дата выдачи"
            placeholder="дд мм гггг"
            :error="errors.passportIssueDate"
          />

          <ECNFormInput
            v-model="passportIssuerCode"
            class="w-max"
            label="Код подразделения"
            placeholder="_ _ _-_ _ _"
            :error="errors.passportIssuerCode"
            inline
            @input="formatIssuerCode"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormTextarea
            v-model="note"
            class="mb-4"
            inline
            label="Служебная информация"
            placeholder="Введите текст"
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
            item-label="title"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormMultiSelect
            v-model="dealIDs"
            :items="deals"
            inline
            label="Сделка"
            placeholder="Укажите сделку"
            :error="errors.dealIDs"
            new-select
          />
        </div>

        <!-- <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="dealIDs"
            :items="deals"
            inline
            label="Лид"
            placeholder="Укажите лид"
            :error="errors.dealIDs"
            new-select
          />
        </div> -->

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormDocuments
            v-model="contracts"
            class="mb-4"
            label="Добавить договор"
          />

          <ECNFormDocuments
            v-model="documents"
            class="mb-4"
            label="Добавить документ"
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
