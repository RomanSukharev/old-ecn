<script lang="ts" setup>
import {
  useSavePageMutation,
  useDeletePageMutation,
  usePageQuery,
  PublicationStatusEnum,
  type ContentBlock,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    pageId?: string;
  }>(),
  {
    pageId: undefined,
  },
);

const pageStatus = [
  {
    id: PublicationStatusEnum.DRAFT,
    title: "Черновик",
  },
  {
    id: PublicationStatusEnum.PUBLISHED,
    title: "Опубликована",
  },
  {
    id: PublicationStatusEnum.UNPUBLISHED,
    title: "Не опубликована",
  },
];

const page = reactive<{
  id?: string;
  title: string;
  url: string;
  description: string;
  status: PublicationStatusEnum;
  contentBlocks: ContentBlock[];
}>({
  id: undefined,
  title: "",
  url: "",
  description: "",
  status: PublicationStatusEnum.DRAFT,
  contentBlocks: [],
});

const internalStatus = ref<{ id: PublicationStatusEnum; title: string }>({
  id: PublicationStatusEnum.DRAFT,
  title: "Черновик",
});
watch(internalStatus, (value) => {
  page.status = value?.id ?? PublicationStatusEnum.DRAFT;
});

if (props.pageId) {
  const { onResult } = usePageQuery({
    id: props.pageId,
  });

  onResult((result) => {
    page.id = result.data.page.id;
    page.title = result.data.page.title;
    page.url = result.data.page.url;
    page.description = result.data.page.description;

    nextTick(() => {
      if (page.status) {
        internalStatus.value = {
          id: page.status,
          title: pageStatus.find((i) => i.id === page.status)?.title ?? "-",
        };
      }
    });
  });
}

const drawerTitle = computed(() =>
  props.pageId ? "Редактирование страницы" : "Создание страницы",
);

const saveButtonTitle = computed(() =>
  props.pageId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.pageId) {
    try {
      const { mutate } = useSavePageMutation();
      await mutate({
        input: {
          id: props.pageId,
          title: page.title,
          url: page.url,
          description: page.description,
          status: page.status,
          contentBlocks: page.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить страницу.");
    }
  } else {
    try {
      const { mutate } = useSavePageMutation();
      await mutate({
        input: {
          title: page.title,
          url: page.url,
          description: page.description,
          status: page.status,
          contentBlocks: page.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать страницу.");
    }
  }
}

async function onDeletePage(): Promise<void> {
  if (confirm("Удалить страницу?")) {
    if (props.pageId) {
      try {
        const { mutate } = useDeletePageMutation();
        await mutate({
          id: props.pageId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить страницу.");
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
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="page.title"
          inline
          required
          label="Название страницы"
          placeholder="Укажите название страницы"
        />
      </div>

      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="page.url"
          inline
          required
          label="URL страницы"
          placeholder="Укажите URL страницы"
        />
      </div>

      <div class="px-10 pt-10 shrink-0">
        <ECNFormSelect
          v-model="internalStatus"
          :items="pageStatus"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
        />
      </div>

      <div class="px-10 pt-10 shrink-0">
        <ECNFormTextarea
          v-model="page.description"
          inline
          label="SEO-описание страницы"
          placeholder="Укажите SEO-описание страницы"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="pageId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeletePage"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
