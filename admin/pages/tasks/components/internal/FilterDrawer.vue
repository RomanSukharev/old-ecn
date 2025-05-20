<script lang="ts" setup>
import {
  type TaskFilter,
  usePropertiesQuery,
  useContactsQuery,
  useLeadsQuery,
  useDealsQuery,
  useEmployeesQuery,
} from "@/shared/api/generated";
import { clearPhone } from "~/shared/helpers/clearPhone";

const emit = defineEmits<{
  close: [];
  apply: [TaskFilter];
  reset: [];
}>();

const props = defineProps<TaskFilter>();

const { result: propertiesRaw } = usePropertiesQuery();
const properties = computed(() => propertiesRaw.value?.properties.nodes ?? []);

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...contact,
      title: `${contact.name} ${contact.surname} ${contact.patronymic}`,
    })) ?? []
  );
});

const { result: leadsRaw } = useLeadsQuery();
const leads = computed(() => {
  return (
    leadsRaw.value?.leads.nodes.map((lead) => ({
      ...lead,
      title: `${lead.name} ${lead.surname} ${lead.patronymic}`,
    })) ?? []
  );
});

const { result: dealsRaw } = useDealsQuery();
const deals = computed(() => {
  return (
    dealsRaw.value?.deals.nodes.map((deal) => ({
      ...deal,
      title: `Сделка ${deal.internalNumber}`,
    })) ?? []
  );
});

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      ...employee,
      title: `${employee.name} ${employee.surname} ${employee.patronymic}`,
    })) ?? []
  );
});

const contact = ref<string | undefined>(props.contact || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const employee = ref<string | undefined>(props.employee || undefined);
const phone = ref<string | undefined>(props.phone || undefined);
const property = ref<string | undefined>(props.property || undefined);

function onApply(): void {
  emit("apply", {
    contact: contact.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    employee: employee.value || undefined,
    phone: phone.value ? clearPhone(phone.value) : undefined,
    property: employee.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  contact.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  employee.value = undefined;
  phone.value = undefined;
  property.value = undefined;
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
        <ECNFormSelect
          v-model="contact"
          :items="contacts"
          inline
          class="mb-4"
          label="Контакт"
          placeholder="Укажите имя контакта"
          new-select
        />

        <ECNFormPhoneInput
          v-model="phone"
          inline
          class="mb-4"
          label="Телефон"
        />

        <ECNFormSelect
          v-model="property"
          :items="properties"
          inline
          class="mb-4"
          label="Объект"
          placeholder="Укажите название объекта"
          new-select
        />

        <ECNDivider class="my-10" />

        <ECNFormToggle v-model="isHot" class="mb-4" label="Срочно" />

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="employee"
            :items="employees"
            inline
            label="Исполнитель"
            placeholder="Укажите исполнителя"
            new-select
          />

          <ECNFormSelect
            v-model="employee"
            :items="employees"
            inline
            label="Проверяющий"
            placeholder="Укажите проверяющего"
            new-select
          />

          <ECNFormSelect
            v-model="employee"
            :items="leads"
            inline
            label="Лид"
            placeholder="Укажите лид"
            new-select
          />

          <ECNFormSelect
            v-model="dealID"
            :items="deals"
            inline
            label="Сделка"
            placeholder="Укажите сделку"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormDateRange
            v-model:min-date="startDate"
            v-model:max-date="endDate"
            inline
            class="mb-4"
            label="Дата"
            placeholder-from="дд мм гггг"
            placeholder-to="дд мм гггг"
          />

          <ECNFormSelect
            v-model="tag"
            inline
            label="Метка"
            placeholder="Укажите метку"
            new-select
          />
        </div>
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
