<script setup lang="ts">
import { useDeveloperDrawer } from "../composables/useDeveloperDrawer";
import {
  useSaveDeveloperMutation,
  useDeleteDeveloperMutation,
  useDeveloperQuery,
} from "@/shared/api/generated";
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

  // logo,
  title,
  url,
  setErrors,
  setTouched,
  loading,
} = useDeveloperDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useDeveloperQuery({ id: props.id });

  onResult((res) => {
    const developer = res.data.developer;

    // logo.value = developer.logo!;
    title.value = developer.title;
    url.value = developer.url;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить застройщика",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  // logo.value = [];
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveDeveloperMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Застройщик успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить застройщика",
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
    message: "Удалить выбранного застройщика?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteDeveloperMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Застройщик удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить застройщика",
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
          label="Название"
          placeholder="Укажите название застройщика"
          :error="errors.title"
        />

        <ECNFormInput
          v-model="url"
          inline
          label="Адрес сайта"
          placeholder="Укажите адрес сайта"
          :error="errors.url"
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
