<script setup lang="ts">
import {
  useDeletePageMutation,
  usePageQuery,
  useSavePageMutation,
} from "~/shared/api/generated";
import { usePageDrawer } from "../composables/usePageDrawer";
import { pageStatus } from "../constants";
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

  title,
  description,
  url,
  status,

  loading,
  setErrors,
  setTouched,
} = usePageDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = usePageQuery({ id: props.id });

  onResult((res) => {
    const page = res.data.page;

    title.value = page.title;
    description.value = page.description;
    url.value = page.url;
    status.value = page.status;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить страницу",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSavePageMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Страница успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить страницу",
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
    message: "Удалить выбранную страницу?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeletePageMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Страница удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить страницу",
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
          label="Название страницы"
          placeholder="Укажите название страницы"
          :error="errors.title"
        />

        <ECNFormInput
          v-model="url"
          class="mb-4"
          inline
          required
          label="URL страницы"
          placeholder="Укажите URL страницы"
        />

        <ECNFormSelect
          v-model="status"
          class="mb-4"
          :items="pageStatus"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
          :error="errors.status"
          new-select
        />

        <ECNFormTextarea
          v-model="description"
          class="mb-4"
          inline
          label="SEO-описание страницы"
          placeholder="Укажите SEO-описание страницы"
          :error="errors.description"
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
