<script setup lang="ts">
import {
  usePropertiesQuery,
  useEmployeesQuery,
  useContactsQuery,
  useDeleteMeetMutation,
  useMeetQuery,
  useSaveMeetMutation,
} from "~/shared/api/generated";
import { useMeetDrawer } from "../composables/useMeetDrawer";
import { meetTypes, contactTypes } from "../constants";
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

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,

  accountantID,
  address,
  buyerAgency,
  buyerAgentID,
  buyerContactID,
  buyerPhone,
  cancelReason,
  cancelReasonCustom,
  comment,
  dateTime,
  isOnline,
  lawerID,
  mortgageBrokerID,
  propertyID,
  sellerAgentID,
  sellerContactID,
  sellerPhone,
  status,
  type,
  useDealDeposit,
  useMortgage,

  setErrors,
  setTouched,
  loading,
} = useMeetDrawer(props);

const activeTab = ref("oneAgent");

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useMeetQuery({ id: props.id });

  onResult((res) => {
    const meet = res.data.meet;

    accountantID.value = meet.accountant?.id;
    address.value = meet.address || undefined;
    buyerAgency.value = meet.buyerAgency || undefined;
    buyerAgentID.value = meet.buyerAgent?.id;
    buyerContactID.value = meet.buyerContact?.id;
    buyerPhone.value = meet.buyerPhone;
    cancelReason.value = meet.cancelReason || undefined;
    cancelReasonCustom.value = meet.cancelReasonCustom || undefined;
    comment.value = meet.comment;
    dateTime.value = meet.dateTime ? new Date(meet.dateTime) : undefined;
    isOnline.value = meet.isOnline || undefined;
    lawerID.value = meet.lawer?.id;
    mortgageBrokerID.value = meet.mortgageBroker?.id;
    propertyID.value = meet.property?.id;
    sellerAgentID.value = meet.sellerAgent?.id;
    sellerContactID.value = meet.sellerContact?.id;
    sellerPhone.value = meet.sellerPhone;
    status.value = meet.status;
    type.value = meet.type || undefined;
    useDealDeposit.value = meet.useDealDeposit || undefined;
    useMortgage.value = meet.useMortgage || undefined;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить встречи",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveMeetMutation();

  if (values.sellerPhone) {
    values.sellerPhone = clearPhone(values.sellerPhone);
  }

  if (values.buyerPhone) {
    values.buyerPhone = clearPhone(values.buyerPhone);
  }

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Встреча успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить встречу",
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
    message: "Удалить выбранную встречу?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteMeetMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Встреча удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить встречу",
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
          <ECNFormRadioButton
            v-model="type"
            :items="meetTypes"
            inline
            label="Тип сделки"
            :error="errors.type"
          />

          <ECNFormDateTime
            v-model="dateTime"
            inline
            label="Время"
            placeholder-date="дд мм гггг"
            placeholder-time="чч мм"
            :error="errors.dateTime"
          />

          <ECNFormSelect
            v-model="propertyID"
            :items="properties"
            inline
            label="Объект"
            placeholder="Укажите объект"
            :error="errors.type"
            new-select
          />

          <ECNFormTextarea
            v-model="comment"
            class="mb-4"
            inline
            label="Информация"
            placeholder="Укажите информацию"
          />

          <ECNFormToggle v-model="isOnline" class="mb-4" label="Онлайн-показ" />
        </div>

        <ECNDivider />

        <div class="-m-10">
          <ECNDrawerTabs v-model="activeTab">
            <ECNDrawerTabsItem name="oneAgent" title="1 агент">
              <div>
                <ECNFormSelect
                  v-model="sellerAgentID"
                  :items="employees"
                  class="mb-4"
                  inline
                  label="Агент"
                  placeholder="Укажите агента"
                  :error="errors.sellerAgentID"
                  new-select
                  item-label="title"
                />

                <ECNFormSelect
                  v-model="sellerContactID"
                  :items="contacts"
                  class="mb-4"
                  inline
                  label="Продавец"
                  placeholder="Укажите продавца"
                  :error="errors.sellerContactID"
                  new-select
                  item-label="title"
                />

                <ECNFormPhoneInput
                  v-model="sellerPhone"
                  inline
                  label="Телефон"
                  :error="errors.sellerPhone"
                />

                <ECNDivider />

                <ECNFormSelect
                  v-model="buyerContactID"
                  :items="contacts"
                  class="mb-4"
                  inline
                  label="Покупатель"
                  placeholder="Укажите продавца"
                  :error="errors.sellerContactID"
                  new-select
                  item-label="title"
                />

                <ECNFormPhoneInput
                  v-model="buyerPhone"
                  inline
                  label="Телефон"
                  :error="errors.sellerPhone"
                />
              </div>
            </ECNDrawerTabsItem>

            <ECNDrawerTabsItem name="twoAgent" title="2 агента">
              <div>
                <ECNFormSelect
                  v-model="sellerAgentID"
                  :items="employees"
                  class="mb-4"
                  inline
                  label="Агент"
                  placeholder="Укажите агента"
                  :error="errors.sellerAgentID"
                  new-select
                  item-label="title"
                />

                <ECNFormSelect
                  v-model="sellerContactID"
                  :items="contacts"
                  class="mb-4"
                  inline
                  label="Продавец"
                  placeholder="Укажите продавца"
                  :error="errors.sellerContactID"
                  new-select
                  item-label="title"
                />

                <ECNFormPhoneInput
                  v-model="sellerPhone"
                  inline
                  label="Телефон"
                  :error="errors.sellerPhone"
                />

                <ECNDivider />

                <ECNFormSelect
                  v-model="buyerAgentID"
                  :items="employees"
                  class="mb-4"
                  inline
                  label="Агент"
                  placeholder="Укажите агента"
                  :error="errors.buyerAgentID"
                  new-select
                  item-label="title"
                />

                <ECNFormSelect
                  v-model="buyerContactID"
                  :items="contacts"
                  class="mb-4"
                  inline
                  label="Покупатель"
                  placeholder="Укажите покупателя"
                  :error="errors.buyerContactID"
                  new-select
                  item-label="title"
                />

                <ECNFormPhoneInput
                  v-model="buyerPhone"
                  inline
                  label="Телефон"
                  :error="errors.sellerPhone"
                />
              </div>
            </ECNDrawerTabsItem>

            <ECNDrawerTabsItem name="anotherAgency" title="Другое агентство">
              <div>
                <ECNFormSelect
                  v-model="sellerAgentID"
                  :items="employees"
                  class="mb-4"
                  inline
                  label="Агент"
                  placeholder="Укажите агента"
                  :error="errors.sellerAgentID"
                  new-select
                  item-label="title"
                />

                <ECNFormRadioButton
                  v-model="type"
                  :items="contactTypes"
                  class="mb-4"
                  inline
                  label="Тип контакта"
                  :error="errors.type"
                />

                <ECNFormSelect
                  v-model="sellerContactID"
                  :items="contacts"
                  class="mb-4"
                  inline
                  label="Продавец"
                  placeholder="Укажите продавца"
                  :error="errors.sellerContactID"
                  new-select
                  item-label="title"
                />

                <ECNFormPhoneInput
                  v-model="sellerPhone"
                  inline
                  label="Телефон"
                  :error="errors.sellerPhone"
                />

                <ECNDivider />

                <ECNFormInput
                  v-model="buyerAgency"
                  inline
                  label="Представитель покупателя"
                  placeholder="Укажите исполнителя"
                  :error="errors.buyerAgency"
                />
              </div>
            </ECNDrawerTabsItem>
          </ECNDrawerTabs>
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
