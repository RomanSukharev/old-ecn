<script setup lang="ts">
import {
  useVacancyQuery,
  useSaveVacancyMutation,
  useDeleteVacancyMutation,
} from "~/shared/api/generated";
import { useVacancyDrawer } from "../composables/useVacancyDrawer";
import { vacancySchedule, vacancyStatus } from "../constants";
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
  handleSubmit,
  errors,

  title,
  description,
  experience,
  salary,
  schedule,
  publicationStatus,
  loading,

  setErrors,
  setTouched,
} = useVacancyDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useVacancyQuery({ id: props.id });

  onResult((res) => {
    const vacancy = res.data.vacancy;

    title.value = vacancy.title;
    description.value = vacancy.description;
    experience.value = vacancy.experience;
    salary.value = vacancy.salary;
    schedule.value = vacancy.schedule;
    publicationStatus.value = vacancy.publicationStatus;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить вакансию",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveVacancyMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Вакансия успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить вакансию",
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
    message: "Удалить выбранную вакансию?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteVacancyMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Вакансия удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить вакансию",
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
        <ECNFormInput
          v-model="title"
          class="mb-4"
          inline
          required
          label="Название вакансии"
          placeholder="Укажите название вакансии"
          :error="errors.title"
        />

        <ECNFormTextarea
          v-model="description"
          class="mb-4"
          inline
          required
          label="Описание вакансии"
          placeholder="Укажите описание вакансии"
          :error="errors.description"
        />

        <ECNFormInput
          v-model="experience"
          class="mb-4"
          inline
          label="Опыт работы"
          placeholder="Укажите опыт работы"
          :error="errors.experience"
        />

        <ECNFormInput
          v-model="salary"
          class="mb-4"
          inline
          label="Заработная плата"
          placeholder="Укажите заработную плату"
          :error="errors.salary"
        />

        <ECNFormSelect
          v-model="schedule"
          class="mb-4"
          :items="vacancySchedule"
          inline
          required
          label="Рабочий график"
          placeholder="Выберите значение"
          :error="errors.schedule"
        />

        <ECNFormSelect
          v-model="publicationStatus"
          :items="vacancyStatus"
          inline
          required
          label="Статус вакансии"
          placeholder="Выберите значение"
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
