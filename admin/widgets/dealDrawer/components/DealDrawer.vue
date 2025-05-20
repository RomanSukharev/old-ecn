<script setup lang="ts">
import {
  DealStageEnum,
  usePropertiesQuery,
  useEmployeesQuery,
  useMortgageRequestsQuery,
  useContactsQuery,
  useDeleteDealMutation,
  useDealQuery,
  useSaveDealMutation,
  type DocumentInput,
} from "~/shared/api/generated";
import { useDealDrawer } from "../composables/useDealDrawer";
import { dealStages, dealTypes } from "../constants";
import type { IProps } from "../types";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = defineProps<IProps>();

const toast = useToast();
const confirm = useConfirm();

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,

  address,
  buyerPhone,
  sellerPhone,
  commissionAmount,
  dealDate,
  depositDate,
  internalComment,
  stage,
  type,
  // propertyType,
  buyerAgentID,
  buyerContactID,
  buyerDocuments,
  sellerAgentID,
  sellerContactID,
  sellerDocuments,
  mortgageBrokerID,
  mortgageRequestID,
  mortgageDocuments,
  propertyID,
  accountantDocuments,
  lawerDocuments,
  accountantID,
  lawerID,
  clearPhone,

  setErrors,
  setTouched,
  loading,
} = useDealDrawer(props);

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

const { result: mortgageRequestsRaw } = useMortgageRequestsQuery();
const mortgageRequests = computed(() => {
  return (
    mortgageRequestsRaw.value?.mortgageRequests.nodes.map(
      (mortgageRequest) => ({
        ...mortgageRequest,
        title: "Заявка " + `${mortgageRequest.internalNumber}`.padStart(5, "0"),
      }),
    ) ?? []
  );
});

const { result: contactsRaw } = useContactsQuery();
const contacts = computed(() => {
  return (
    contactsRaw.value?.contacts.nodes.map((contact) => ({
      ...contact,
      title: `${contact.surname} ${contact.name} ${contact.patronymic}`,
    })) ?? []
  );
});

function filterDocuments(docs: Array<DocumentInput & { file?: File }>) {
  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    ...(doc.file ? { file: doc.file } : {}),
  }));
}

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useDealQuery({ id: props.id });

  onResult((res) => {
    const deal = res.data.deal;

    address.value = deal.address;
    buyerPhone.value = deal.buyerPhone;
    sellerPhone.value = deal.sellerPhone!;
    commissionAmount.value = deal.commissionAmount!;
    dealDate.value = deal.dealDate;
    depositDate.value = deal.depositDate;
    internalComment.value = deal.internalComment || undefined;
    stage.value = deal.stage;
    type.value = deal.type;
    // propertyType.value = deal.propertyType;
    buyerAgentID.value = deal.buyerAgent?.id;
    buyerContactID.value = deal.buyerContact?.id;
    buyerDocuments.value = deal.buyerDocuments!;
    sellerAgentID.value = deal.sellerAgent?.id;
    sellerContactID.value = deal.sellerContact?.id;
    sellerDocuments.value = deal.sellerDocuments!;
    mortgageBrokerID.value = deal.mortgageBroker?.id;
    mortgageDocuments.value = deal.mortgageDocuments!;
    propertyID.value = deal.property?.id;
    accountantDocuments.value = deal.accountantDocuments!;
    lawerDocuments.value = deal.lawerDocuments!;
    accountantID.value = deal.accountant?.id;
    lawerID.value = deal.lawer?.id;
    mortgageRequestID.value = deal.mortgageRequest?.id;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить сделку",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  sellerDocuments.value = [];
  mortgageDocuments.value = [];
  accountantDocuments.value = [];
  lawerDocuments.value = [];
  buyerDocuments.value = [];
  stage.value = DealStageEnum.DEPOSIT_PREPARATION;
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveDealMutation();

  if (values.buyerPhone) {
    values.buyerPhone = clearPhone(values.buyerPhone);
  }

  if (values.sellerPhone) {
    values.sellerPhone = clearPhone(values.sellerPhone);
  }

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
    sellerDocuments: filterDocuments(values.sellerDocuments ?? []),
    mortgageDocuments: filterDocuments(values.mortgageDocuments ?? []),
    accountantDocuments: filterDocuments(values.accountantDocuments ?? []),
    lawerDocuments: filterDocuments(values.lawerDocuments ?? []),
    buyerDocuments: filterDocuments(values.buyerDocuments ?? []),
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
      const { mutate, onDone, onError } = useDeleteDealMutation();

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
            v-model="stage"
            :items="dealStages"
            inline
            required
            label="Этап"
            placeholder="Не выбран"
            :error="errors.stage"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="type"
            :items="dealTypes"
            inline
            required
            label="Тип сделки"
            placeholder="Не выбран"
            :error="errors.type"
            new-select
          />

          <!-- <ECNFormSelect
            v-model="propertyType"
            :items="dealPropertyTypes"
            inline
            required
            label="Тип недвижимости"
            placeholder="Не выбран"
            :error="errors.type"
            new-select
          /> -->
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="sellerAgentID"
            inline
            :items="employees"
            label="Агент"
            placeholder="Не выбран"
            :error="errors.sellerAgentID"
            new-select
            item-label="title"
          />

          <ECNFormSelect
            v-model="sellerContactID"
            inline
            :items="contacts"
            label="Продавец"
            placeholder="Не выбран"
            :error="errors.sellerContactID"
            new-select
            item-label="title"
          />

          <ECNFormPhoneInput
            v-model="sellerPhone"
            inline
            required
            label="Телефон продавца"
            placeholder="+7 (___) ___-__-__"
            :error="errors.sellerPhone"
          />

          <ECNFormDocuments
            v-model="sellerDocuments"
            class="mb-4"
            label="Добавить документ"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="buyerContactID"
            inline
            :items="contacts"
            label="Покупатель"
            placeholder="Не выбран"
            :error="errors.buyerContactID"
            new-select
            item-label="title"
          />

          <ECNFormPhoneInput
            v-model="buyerPhone"
            inline
            label="Телефон покупателя"
            placeholder="+7 (___) ___-__-__"
            :error="errors.buyerPhone"
          />

          <ECNFormDocuments
            v-model="buyerDocuments"
            class="mb-4"
            label="Добавить документ"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="propertyID"
            inline
            :items="properties"
            label="Объект"
            placeholder="Не выбран"
            :error="errors.propertyID"
            new-select
          />

          <ECNFormInput
            v-model="address"
            inline
            label="Адрес"
            placeholder="Не выбран"
            :error="errors.address"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="sellerAgentID"
            :items="employees"
            inline
            label="Агент"
            placeholder="Не выбран"
            :error="errors.buyerAgentID"
            new-select
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="mortgageBrokerID"
            inline
            :items="employees"
            required
            label="Ипотечный брокер"
            placeholder="Не выбран"
            :error="errors.mortgageBrokerID"
            new-select
            item-label="title"
          />

          <ECNFormSelect
            v-model="mortgageRequestID"
            inline
            :items="mortgageRequests"
            required
            label="Ипотечная заявка"
            placeholder="Не выбран"
            :error="errors.mortgageRequestID"
            new-select
          />

          <ECNFormDocuments
            v-model="mortgageDocuments"
            class="mb-4"
            label="Добавить документ"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="lawerID"
            inline
            :items="employees"
            required
            label="Юрист"
            placeholder="Не выбран"
            :error="errors.lawerID"
            new-select
            item-label="title"
          />

          <ECNFormDocuments
            v-model="lawerDocuments"
            class="mb-4"
            label="Добавить документ"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormSelect
            v-model="accountantID"
            inline
            :items="employees"
            required
            label="Бухгалтер"
            placeholder="Не выбран"
            :error="errors.accountantID"
            new-select
            item-label="title"
          />
          <!-- Тоже через autocomplete  -->
          <ECNFormDocuments
            v-model="accountantDocuments"
            class="mb-4"
            label="Добавить документ"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-4">
          <ECNFormDate
            v-model="depositDate"
            inline
            class="w-max"
            label="Дата задатка"
            placeholder="дд мм гггг"
            :error="errors.depositDate"
          />

          <ECNFormDate
            v-model="dealDate"
            inline
            class="w-max"
            label="Дата сделки"
            placeholder="дд мм гггг"
            :error="errors.dealDate"
          />

          <ECNFormTextarea
            v-model="internalComment"
            inline
            label="Служебная информация"
            placeholder="Введите текст"
            :error="errors.internalComment"
          />
        </div>

        <ECNDivider class="my-10" />

        <div class="space-y-2 flex relative">
          <ECNFormNumber
            v-model.number="commissionAmount"
            class="mb-4 w-min"
            inline
            label="Размер комиссии в рублях"
            placeholder="0"
          />

          <div class="ml-2 font-medium text-gray-400">₽</div>
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
