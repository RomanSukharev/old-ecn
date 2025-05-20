<script lang="ts" setup>
import type {
  LeadStatusEnum,
  LeadFilter,
  LeadTypeEnum,
} from "@/shared/api/generated";
import { leadStatuses, leadTypes } from "~/widgets/leadDrawer/constants";
import { clearPhone } from "~/shared/helpers/clearPhone";

const emit = defineEmits<{
  close: [];
  apply: [LeadFilter];
  reset: [];
}>();

const props = defineProps<LeadFilter>();

const company = ref<string | undefined>(props.company || undefined);
const createdAtMax = ref<string | undefined>(props.createdAtMax || undefined);
const createdAtMin = ref<string | undefined>(props.createdAtMin || undefined);
const email = ref<string | undefined>(props.email || undefined);
const phone = ref<string | undefined>(props.phone || undefined);
const status = ref<LeadStatusEnum | undefined>(props.status || undefined);
const type = ref<LeadTypeEnum | undefined>(props.type || undefined);

function onApply(): void {
  emit("apply", {
    company: company.value || undefined,
    createdAtMax: createdAtMax.value || undefined,
    createdAtMin: createdAtMin.value || undefined,
    email: email.value || undefined,
    phone: phone.value ? clearPhone(phone.value) : undefined,
    status: status.value || undefined,
    type: type.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  company.value = undefined;
  createdAtMax.value = undefined;
  createdAtMin.value = undefined;
  email.value = undefined;
  phone.value = undefined;
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
        <ECNFormPhoneInput
          v-model="phone"
          inline
          class="mb-4"
          required
          label="Телефон"
        />

        <ECNFormInput
          v-model="company"
          inline
          class="mb-4"
          label="Компания"
          placeholder="Укажите компанию"
        />

        <ECNFormInput
          v-model="email"
          inline
          class="mb-4"
          label="E-mail"
          placeholder="Укажите E-mail"
          new-select
        />

        <ECNFormSelect
          v-model="type"
          :items="leadTypes"
          inline
          required
          class="mb-4"
          label="Тип контакта"
          placeholder="Не выбран"
          new-select
        />

        <ECNFormSelect
          v-model="status"
          :items="leadStatuses"
          inline
          required
          class="mb-4"
          label="Статус"
          placeholder="Не выбран"
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
