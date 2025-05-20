<script lang="ts" setup>
import {
  type ContactFilter,
  type CounterPartyTypeEnum,
  useEmployeesQuery,
} from "@/shared/api/generated";
import { clearPhone } from "~/shared/helpers/clearPhone";

const emit = defineEmits<{
  close: [];
  apply: [ContactFilter];
  reset: [];
}>();

const props = defineProps<ContactFilter>();

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      id: employee.id,
      title: `${employee.name} ${employee.surname}`,
    })) ?? []
  );
});

const company = ref<string | undefined>(props.company || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const email = ref<string | undefined>(props.email || undefined);
const employee = ref<string | undefined>(props.employee || undefined);
const phone = ref<string | undefined>(props.phone || undefined);
const type = ref<CounterPartyTypeEnum | undefined>(props.type || undefined);

function onApply(): void {
  emit("apply", {
    company: company.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    email: email.value || undefined,
    employee: employee.value || undefined,
    phone: phone.value ? clearPhone(phone.value) : undefined,
    type: type.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  company.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  email.value = undefined;
  employee.value = undefined;
  phone.value = undefined;
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
        <ECNFormPhoneInput
          v-model="phone"
          inline
          class="mb-4"
          required
          label="Телефон"
        />

        <ECNFormInput
          v-model="email"
          inline
          class="mb-4"
          label="E-mail"
          placeholder="Укажите E-mail"
          new-select
        />

        <ECNFormInput
          v-model="company"
          inline
          class="mb-4"
          label="Компания"
          placeholder="Укажите компанию"
        />

        <ECNFormSelect
          v-model="employee"
          :items="employees"
          inline
          class="mb-4"
          label="Агент"
          placeholder="Укажите агента"
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
