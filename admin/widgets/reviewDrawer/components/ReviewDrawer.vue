<script setup lang="ts">
import {
  ReviewStatusEnum,
  useDeleteReviewMutation,
  useReviewQuery,
  useSaveReviewMutation,
  useEmployeesQuery,
} from "~/shared/api/generated";
import { useReviewDrawer } from "../composables/useReviewDrawer";
import { reviewStatus } from "../constants";
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

  authorName,
  authorPhone,
  employeeID,
  status,
  text,
  loading,

  setErrors,
  setTouched,
} = useReviewDrawer(props);

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(() => {
  return (
    employeesRaw.value?.employees.nodes.map((employee) => ({
      ...employee,
      title: `${employee.name} ${employee.surname}`,
    })) ?? []
  );
});

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useReviewQuery({ id: props.id });

  onResult((res) => {
    const review = res.data.review;

    authorName.value = review.authorName;
    authorPhone.value = review.authorPhone;
    employeeID.value = review.employee?.id;
    status.value = review.status;
    text.value = review.text;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить отзыв",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  status.value = ReviewStatusEnum.NEW;
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveReviewMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Отзыв успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить отзыв",
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
    message: "Удалить выбранный отзыв?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteReviewMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Отзыв удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить отзыв",
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
        <ECNFormSelect
          v-model="employeeID"
          class="mb-4"
          :items="employees"
          inline
          required
          label="Сотрудник"
          placeholder="Выберите значение"
          :error="errors.employeeID"
          new-select
        />

        <ECNFormInput
          v-model="authorName"
          class="mb-4"
          inline
          required
          label="Имя автора"
          placeholder="Укажите имя автора отзыва"
          :error="errors.authorName"
        />

        <ECNFormInput
          v-model="authorPhone"
          class="mb-4"
          inline
          required
          label="Телефон автора"
          placeholder="Укажите телефон автора отзыва"
          :error="errors.authorPhone"
        />

        <ECNFormTextarea
          v-model="text"
          class="mb-4"
          inline
          required
          label="Текст отзыва"
          placeholder="Укажите текст отзыва"
          :error="errors.text"
        />

        <ECNFormSelect
          v-model="status"
          :items="reviewStatus"
          inline
          required
          label="Статус отзыва"
          placeholder="Выберите значение"
          :error="errors.status"
          new-select
        />
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
