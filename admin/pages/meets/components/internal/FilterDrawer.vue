<script lang="ts" setup>
import {
  type MeetFilter,
  type MeetTypeEnum,
  type MeetStatusEnum,
  useEmployeesQuery,
  usePropertiesQuery,
  useContactsQuery,
} from "@/shared/api/generated";
import { meetTypes } from "~/widgets/meetDrawer/constants";

const emit = defineEmits<{
  close: [];
  apply: [MeetFilter];
  reset: [];
}>();

const props = defineProps<MeetFilter>();

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      ...employee,
      title: `${employee.name} ${employee.surname}`,
    })) ?? []
  );
});

const { result: propertiesRaw } = usePropertiesQuery();
const properties = computed(() => propertiesRaw.value?.properties.nodes ?? []);

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...contact,
      title: `${contact.name} ${contact.surname}`,
    })) ?? []
  );
});

const contact = ref<string | undefined>(props.contact || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const employee = ref<string | undefined>(props.employee || undefined);
const property = ref<string | undefined>(props.property || undefined);
const status = ref<MeetStatusEnum[] | undefined>(props.status || undefined);
const type = ref<MeetTypeEnum | undefined>(props.type || undefined);

function onApply(): void {
  emit("apply", {
    contact: contact.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    employee: employee.value || undefined,
    property: property.value || undefined,
    status: status.value || undefined,
    type: type.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  contact.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  employee.value = undefined;
  property.value = undefined;
  status.value = undefined;
  type.value = undefined;
  emit("reset");
}
</script>

<template>
  <ECNDrawer
    title="Фильтр"
    subtitle="Примените нужные элементы фильтрации"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col">
      <div class="p-10 grow overflow-auto">
        <ECNFormRadioButton
          v-model="type"
          :items="meetTypes"
          class="mb-4"
          inline
          label="Тип встречи"
        />

        <ECNFormRadioButton
          v-model="type"
          :items="meetTypes"
          class="mb-4"
          inline
          label="Тип сделки"
        />

        <ECNDivider class="my-10" />

        <ECNFormSelect
          v-model="employee"
          :items="employees"
          class="mb-4"
          inline
          label="Агент"
          placeholder="Укажите имя агента"
          new-select
        />

        <ECNFormSelect
          v-model="contact"
          :items="contacts"
          class="mb-4"
          inline
          label="Покупатель"
          placeholder="Укажите имя контакта"
          new-select
        />

        <ECNFormPhoneInput
          v-model="sellerPhone"
          inline
          label="Телефон"
          placeholder="+7 (___) ___-__-__"
        />

        <ECNDivider class="my-10" />

        <ECNFormSelect
          v-model="employee"
          :items="employees"
          class="mb-4"
          inline
          label="Агент"
          placeholder="Укажите имя агента"
          new-select
        />

        <ECNFormSelect
          v-model="contact"
          :items="contacts"
          class="mb-4"
          inline
          label="Продавец"
          placeholder="Укажите имя контакта"
          new-select
        />

        <ECNDivider class="my-10" />

        <ECNFormSelect
          v-model="property"
          :items="properties"
          class="mb-4"
          inline
          label="Объект"
          placeholder="Укажите название объекта"
          new-select
        />

        <ECNFormInput
          v-model="address"
          class="mb-4"
          inline
          label="Адрес"
          placeholder="Укажите адрес"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        class="border-transparent text-blue-500 mr-auto"
        outline
        @click="onReset"
        >Очистить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onApply">Применить</ECNButton>
    </template>
  </ECNDrawer>
</template>
