<script lang="ts" setup>
import {
  type MortgageRequestStatusEnum,
  type MortgageRequestFilter,
  usePropertiesQuery,
  useContactsQuery,
  useEmployeesQuery,
} from "@/shared/api/generated";
// import { dealTypes, dealPropertyTypes } from "~/widgets/dealDrawer/constants";

const emit = defineEmits<{
  close: [];
  apply: [MortgageRequestFilter];
  reset: [];
}>();

const props = defineProps<MortgageRequestFilter>();

const { result: propertiesRaw } = usePropertiesQuery();
const properties = computed(() => propertiesRaw.value?.properties.nodes ?? []);

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...employee,
      title: `${contact.name} ${contact.surname}`,
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

const contact = ref<string | undefined>(props.contact || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const deal = ref<string | undefined>(props.deal || undefined);
const employee = ref<string | undefined>(props.employee || undefined);
const property = ref<string | undefined>(props.property || undefined);
const status = ref<MortgageRequestStatusEnum | undefined>(
  props.status || undefined,
);

function onApply(): void {
  emit("apply", {
    contact: contact.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    deal: deal.value || undefined,
    employee: employee.value || undefined,
    property: property.value || undefined,
    status: status.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  contact.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  deal.value = undefined;
  employee.value = undefined;
  property.value = undefined;
  status.value = undefined;
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

        <ECNFormSelect
          v-model="property"
          :items="properties"
          inline
          class="mb-4"
          label="Объект"
          placeholder="Укажите объект"
          new-select
        />

        <ECNFormSelect
          v-model="bankIDs"
          inline
          class="mb-4"
          label="Банк"
          placeholder="Укажите банк"
          new-select
        />

        <ECNDivider class="my-10" />

        <ECNFormSelect
          v-model="employee"
          :items="employees"
          inline
          class="mb-4"
          label="Агент"
          placeholder="Укажите имя агента"
          new-select
        />

        <ECNFormSelect
          v-model="lawer"
          :items="employees"
          inline
          class="mb-4"
          label="Ипотечный брокер"
          placeholder="Укажите имя агента"
          new-select
        />

        <ECNDivider class="my-10" />

        <div class="space-y-2 flex relative">
          <ECNFormNumber
            v-model.number="amount"
            class="mb-4 w-min"
            inline
            label="Сумма"
            placeholder="0"
          />

          <div class="ml-2 font-medium text-gray-400">₽</div>
        </div>

        <div class="space-y-2 flex relative">
          <ECNFormNumber
            v-model.number="firstDeposit"
            class="mb-4 w-min"
            inline
            label="Первоначальный взнос"
            placeholder="0"
          />

          <div class="ml-2 font-medium text-gray-400">₽</div>
        </div>

        <div class="space-y-2 flex relative">
          <ECNFormNumber
            v-model.number="percentage"
            class="mb-4 w-min"
            inline
            label="Ставка"
            placeholder="0"
          />

          <div class="ml-2 font-medium text-gray-400">%</div>
        </div>

        <div class="space-y-4">
          <ECNFormNumber
            v-model.number="period"
            inline
            label="Срок"
            placeholder="Укажите срок"
          />
        </div>

        <ECNDivider class="my-10" />

        <ECNFormDate
          v-model="createdAtMin"
          inline
          class="mb-4 w-fit"
          label="Дата отправки"
          placeholder="дд мм гггг"
        />

        <ECNFormDate
          v-model="createdAtMax"
          inline
          class="mb-4 w-fit"
          label="Дата ответа"
          placeholder="дд мм гггг"
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
