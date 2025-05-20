<script setup lang="ts">
import {
  type DocumentInput,
  MortgageRequestStatusEnum,
  useEmployeesQuery,
  useContactsQuery,
  useDealsQuery,
  useDeleteMortgageRequestMutation,
  useMortgageRequestQuery,
  useSaveMortgageRequestMutation,
} from "~/shared/api/generated";
import { useMortgageRequestDrawer } from "../composables/useMortgageRequestDrawer";
import { mortgageRequestTypes, propertyTypes } from "../constants";
import type { IProps } from "../types";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = defineProps<IProps>();

const toast = useToast();
const confirm = useConfirm();

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

const { result: dealsRaw } = useDealsQuery();
const deals = computed(() => {
  return (
    dealsRaw.value?.deals.nodes.map((deal) => ({
      ...deal,
      title: `Сделка ${deal.internalNumber}`,
    })) ?? []
  );
});

const isReadOnly = computed(() => Boolean(props.id));
const isBankFieldVisible = computed(
  () => status.value === MortgageRequestStatusEnum.APPROVED,
);

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,
  agentID,
  amount,
  bankIDs,
  comment,
  contactID,
  contracts,
  dealID,
  documents,
  firstDeposit,
  mortgageBrokerID,
  propertyID,
  percentage,
  period,
  responseDate,
  sendDate,
  status,
  validTillDate,
  setErrors,
  setTouched,
  loading,
} = useMortgageRequestDrawer(props);

function filterDocuments(docs: Array<DocumentInput & { file?: File }>) {
  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    ...(doc.file ? { file: doc.file } : {}),
  }));
}

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useMortgageRequestQuery({ id: props.id });

  onResult((res) => {
    const mortgageReguest = res.data.mortgageRequest;

    agentID.value = mortgageReguest.agent?.id;
    amount.value = mortgageReguest.amount;
    bankIDs.value = mortgageReguest.bankIDs;
    propertyID.value = mortgageReguest.property?.id;
    comment.value = mortgageReguest.comment;
    contactID.value = mortgageReguest.contact?.id;
    contracts.value = mortgageReguest.contracts;
    dealID.value = mortgageReguest.deal?.id;
    documents.value = mortgageReguest.documents;
    firstDeposit.value = mortgageReguest.firstDeposit;
    mortgageBrokerID.value = mortgageReguest.mortgageBroker?.id;
    percentage.value = mortgageReguest.percentage;
    period.value = mortgageReguest.period;
    responseDate.value = mortgageReguest.responseDate || undefined;
    sendDate.value = mortgageReguest.sendDate || undefined;
    status.value = mortgageReguest.status;
    validTillDate.value = mortgageReguest.validTillDate || undefined;

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
  documents.value = [];
  contracts.value = [];
  bankIDs.value = [];
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveMortgageRequestMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Сделка успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить сделку",
      severity: "error",
      life: 5000,
    });
  });

  const formattedValues = {
    ...values,
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
    message: "Удалить выбранную сделку?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteMortgageRequestMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Сделка удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить сделку",
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
            v-model="status"
            :items="mortgageRequestTypes"
            inline
            required
            label="Статус"
            placeholder="Укажите статус"
            :error="errors.status"
            new-select
          />

          <ECNFormSelect
            v-model="contactID"
            :items="contacts"
            inline
            required
            label="Укажите контакт"
            placeholder="Укажите контакт"
            :error="errors.contactID"
            new-select
            :disabled="isReadOnly"
          />

          <ECNFormMultiSelect
            v-if="isBankFieldVisible"
            v-model="bankIDs"
            inline
            required
            label="Банки для заявки"
            placeholder="Укажите банки"
            :error="errors.bankIDs"
            new-select
            :disabled="isReadOnly"
          />

          <ECNFormSelect
            v-model="mortgageBrokerID"
            :items="employees"
            inline
            required
            label="Ипотечный брокер"
            placeholder="Укажите ипотечного брокера"
            :error="errors.mortgageBrokerID"
            new-select
            item-label="title"
            :disabled="isReadOnly"
          />

          <ECNFormSelect
            v-model="agentID"
            :items="employees"
            inline
            required
            label="Агент"
            placeholder="Укажите агента"
            :error="errors.agentID"
            new-select
            item-label="title"
            :disabled="isReadOnly"
          />

          <ECNFormSelect
            v-model="dealID"
            inline
            :items="deals"
            label="Сделка"
            placeholder="Укажите сделку"
            :error="errors.dealID"
            new-select
            :disabled="isReadOnly"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="propertyID"
            inline
            :items="propertyTypes"
            label="Тип объекта"
            placeholder="Укажите тип объекта"
            :error="errors.propertyID"
            new-select
            :disabled="isReadOnly"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-2 flex relative">
          <ECNFormNumber
            v-model.number="amount"
            class="mb-4 w-min"
            inline
            label="Сумма"
            placeholder="0"
            :disabled="isReadOnly"
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
            :disabled="isReadOnly"
          />

          <div class="ml-2 font-medium text-gray-400">₽</div>
        </div>

        <div class="space-y-4">
          <ECNFormNumber
            v-model="period"
            inline
            label="Срок"
            placeholder="Укажите срок"
            :error="errors.period"
            :disabled="isReadOnly"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormTextarea
            v-model="comment"
            inline
            label="Коммантарий"
            placeholder="Оставьте коммантарий"
            :disabled="isReadOnly"
          />

          <div class="space-y-4">
            <ECNFormDocuments
              v-model="contracts"
              class="mb-4"
              label="Добавить договор"
              :disabled="isReadOnly"
            />
          </div>

          <div class="space-y-4">
            <ECNFormDocuments
              v-model="documents"
              class="mb-4"
              label="Добавить документ"
            />
          </div>
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
