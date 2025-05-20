<script lang="ts" setup>
import {
  type DealFilter,
  type DealTypeEnum,
  type DealStageEnum,
  type PropertyTypeEnum,
  useContactsQuery,
  useEmployeesQuery,
  useDealsQuery,
} from "@/shared/api/generated";
import { dealTypes, dealPropertyTypes } from "~/widgets/dealDrawer/constants";

const emit = defineEmits<{
  close: [];
  apply: [DealFilter];
  reset: [];
}>();

const props = defineProps<DealFilter>();

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...contact,
      title: `${contact.surname} ${contact.name} ${contact.patronymic}`,
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

const { result: dealsRaw } = useDealsQuery();
const deals = computed(() => {
  return (
    dealsRaw.value?.deals.nodes.map((deal) => ({
      id: deal.id,
      title: `${deal.internalNumber}`,
    })) ?? []
  );
});
const clearPhone = (value: string): string => {
  if (!value) return "";

  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 11 && cleaned[0] === "7") {
    cleaned = "8" + cleaned.slice(1);
  } else if (cleaned.length < 11) {
    cleaned = "8" + cleaned;
  }

  return cleaned.slice(0, 11);
};

const Type = ref<DealTypeEnum | undefined>(props.Type || undefined);
const contact = ref<string | undefined>(props.contact || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const employee = ref<string | undefined>(props.employee || undefined);
const finishedAtMax = ref<string | undefined>(props.finishedAtMax || undefined);
const finishedAtMin = ref<string | undefined>(props.finishedAtMin || undefined);
const deal = ref<string | undefined>(props.deal || undefined);
const isDeleted = ref<boolean | undefined>(props.isDeleted || undefined);
const phone = ref<string | undefined>(props.phone || undefined);
const propertyType = ref<PropertyTypeEnum | undefined>(
  props.propertyType || undefined,
);
const stage = ref<DealStageEnum | undefined>(props.stage || undefined);

function onApply(): void {
  emit("apply", {
    Type: Type.value || undefined,
    contact: contact.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    employee: employee.value || undefined,
    finishedAtMax: finishedAtMax.value || undefined,
    finishedAtMin: finishedAtMin.value || undefined,
    deal: deal.value || undefined,
    isDeleted: isDeleted.value || undefined,
    phone: phone.value ? clearPhone(phone.value) : undefined,
    propertyType: propertyType.value || undefined,
    stage: stage.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  Type.value = undefined;
  contact.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  employee.value = undefined;
  finishedAtMax.value = undefined;
  finishedAtMin.value = undefined;
  deal.value = undefined;
  isDeleted.value = undefined;
  phone.value = undefined;
  propertyType.value = undefined;
  stage.value = undefined;
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
        <!-- Не отправлятся запрос -->
        <ECNFormSelect
          v-model="deal"
          :items="deals"
          inline
          class="mb-4"
          label="Сделка"
          placeholder="Укажите номер сделки"
          new-select
        />

        <ECNFormSelect
          v-model="Type"
          :items="dealTypes"
          inline
          class="mb-4"
          label="Тип сделки"
          placeholder="Не выбрано"
          new-select
        />

        <ECNFormDateRange
          v-model:min-date="createdAtMin"
          v-model:max-date="createdAtMax"
          inline
          class="mb-4"
          label="Дата создания"
          placeholder-from="дд мм гггг"
          placeholder-to="дд мм гггг"
        />

        <ECNFormDateRange
          v-model:min-date="finishedAtMin"
          v-model:max-date="finishedAtMax"
          inline
          class="mb-4"
          label="Дата завершения"
          placeholder-from="дд мм гггг"
          placeholder-to="дд мм гггг"
        />

        <ECNFormToggle v-model="isDeleted" class="mb-4" label="Из лида" />

        <ECNDivider class="my-10" />

        <ECNFormSelect
          v-model="propertyType"
          :items="dealPropertyTypes"
          inline
          class="mb-4"
          label="Тип недвижимости"
          placeholder="Не выбрано"
          new-select
        />

        <ECNFormSelect
          v-model="employee"
          :items="employees"
          inline
          class="mb-4"
          label="Агент"
          placeholder="Не выбран"
          new-select
        />

        <ECNFormSelect
          v-model="contact"
          :items="contacts"
          inline
          class="mb-4"
          label="Контакт"
          placeholder="Не выбрано"
          new-select
        />

        <ECNFormPhoneInput
          v-model="phone"
          inline
          class="mb-4"
          label="Телефон"
          placeholder="+7 (___) ___-__-__"
        />

        <ECNDivider class="my-10" />

        <ECNFormToggle
          v-model="isDeleted"
          class="mb-4"
          placeholder="Дополнительно"
          label="Архив"
        />

        <ECNFormToggle
          v-model="isDeleted"
          class="mb-4"
          label="Несостоявшиеся"
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
