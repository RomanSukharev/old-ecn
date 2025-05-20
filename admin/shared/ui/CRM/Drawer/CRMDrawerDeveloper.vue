<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import {
  useSaveDeveloperMutation,
  useDeleteDeveloperMutation,
  useDeveloperQuery,
  type DeveloperInput,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    id?: string;
  }>(),
  {
    id: undefined,
  },
);

const developer = reactive<DeveloperInput>({
  title: "",
});

if (props.id) {
  const { onResult } = useDeveloperQuery({
    id: props.id,
  });

  onResult((result) => {
    developer.id = result.data.developer.id;
    developer.title = result.data.developer.title;
    developer.url = result.data.developer.url;
  });
}

const drawerTitle = computed(() =>
  props.id ? "Редактирование застройщика" : "Создание застройщика",
);

const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

async function onSave(): Promise<void> {
  if (props.id) {
    try {
      const { mutate } = useSaveDeveloperMutation();
      await mutate({
        input: developer,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить застройщика.");
    }
  } else {
    try {
      const { mutate } = useSaveDeveloperMutation();
      await mutate({
        input: developer,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать застройщика.");
    }
  }
}

async function onDeleteDeveloper(): Promise<void> {
  if (confirm("Удалить застройщика?")) {
    if (props.id) {
      try {
        const { mutate } = useDeleteDeveloperMutation();
        await mutate({
          id: props.id,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить застройщика.");
      }
    }
  }
}
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="developer.title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название застройщика"
        />

        <ECNFormInput
          v-model="developer.url"
          inline
          label="Адрес сайта"
          placeholder="Укажите адрес сайта"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="id"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteDeveloper"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
