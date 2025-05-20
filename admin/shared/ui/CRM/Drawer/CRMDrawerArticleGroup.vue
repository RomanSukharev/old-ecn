<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useSaveArticleGroupMutation,
  useDeleteArticleGroupMutation,
  useArticleGroupQuery,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    groupId?: string;
  }>(),
  {
    groupId: undefined,
  },
);

const group = reactive<{
  id?: string;
  title: string;
}>({
  id: undefined,
  title: "",
});

if (props.groupId) {
  const { onResult } = useArticleGroupQuery({
    id: props.groupId,
  });

  onResult((result) => {
    group.id = result.data.articleGroup.id;
    group.title = result.data.articleGroup.title;
  });
}

const drawerTitle = computed(() =>
  props.groupId ? "Редактирование группы" : "Создание группы",
);

const saveButtonTitle = computed(() =>
  props.groupId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.groupId) {
    try {
      const { mutate } = useSaveArticleGroupMutation();
      await mutate({
        input: {
          id: props.groupId,
          title: group.title,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить группу.");
    }
  } else {
    try {
      const { mutate } = useSaveArticleGroupMutation();
      await mutate({
        input: {
          title: group.title,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать группу.");
    }
  }
}

async function onDeleteGroup(): Promise<void> {
  if (confirm("Удалить группу и все вложенные статьи?")) {
    if (props.groupId) {
      try {
        const { mutate } = useDeleteArticleGroupMutation();
        await mutate({
          id: props.groupId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить группу.");
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
          v-model="group.title"
          inline
          required
          label="Название группы"
          placeholder="Укажите название группы"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="groupId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteGroup"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
