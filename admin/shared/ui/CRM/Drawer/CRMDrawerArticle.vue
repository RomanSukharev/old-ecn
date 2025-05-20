<script lang="ts" setup>
import {
  useSaveArticleMutation,
  useDeleteArticleMutation,
  useArticleQuery,
  useArticleGroupsQuery,
  PublicationStatusEnum,
  type ContentBlock,
  ContentBlockType,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    articleId?: string;
  }>(),
  {
    articleId: undefined,
  },
);

const articleStatus = [
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

const article = reactive<{
  id?: string;
  title: string;
  group?: { id: string; title: string };
  status: PublicationStatusEnum;
  contentBlocks: ContentBlock[];
}>({
  id: undefined,
  title: "",
  group: undefined,
  status: PublicationStatusEnum.DRAFT,
  contentBlocks: [],
});

const { result: articleGroupsRaw } = useArticleGroupsQuery();
const articleGroups = computed(
  () => articleGroupsRaw.value?.articleGroups.nodes ?? [],
);

const internalStatus = ref<{ id: PublicationStatusEnum; title: string }>({
  id: PublicationStatusEnum.DRAFT,
  title: "Черновик",
});
watch(internalStatus, (value) => {
  article.status = value?.id ?? PublicationStatusEnum.DRAFT;
});

if (props.articleId) {
  const { onResult } = useArticleQuery({
    id: props.articleId,
  });

  onResult((result) => {
    article.id = result.data.article.id;
    article.title = result.data.article.title;
    article.contentBlocks = result.data.article.contentBlocks;
    if (result.data.article.group) {
      article.group = result.data.article.group;
    }

    nextTick(() => {
      if (article.status) {
        internalStatus.value = {
          id: article.status,
          title:
            articleStatus.find((i) => i.id === article.status)?.title ?? "-",
        };
      }
    });
  });
}

const drawerTitle = computed(() =>
  props.articleId ? "Редактирование статьи" : "Создание статьи",
);

const saveButtonTitle = computed(() =>
  props.articleId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.articleId) {
    try {
      const { mutate } = useSaveArticleMutation();
      await mutate({
        input: {
          id: props.articleId,
          title: article.title,
          groupID: article.group?.id || "",
          status: article.status,
          contentBlocks: article.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить статью.");
    }
  } else {
    try {
      const { mutate } = useSaveArticleMutation();
      await mutate({
        input: {
          title: article.title,
          groupID: article.group?.id || "",
          status: article.status,
          contentBlocks: article.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать статью.");
    }
  }
}

async function onDeleteArticle(): Promise<void> {
  if (confirm("Удалить статью?")) {
    if (props.articleId) {
      try {
        const { mutate } = useDeleteArticleMutation();
        await mutate({
          id: props.articleId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить статью.");
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
          v-model="article.title"
          class="mb-4"
          inline
          required
          label="Название статьи"
          placeholder="Укажите название статьи"
        />

        <ECNFormSelect
          v-model="article.group"
          class="mb-4"
          :items="articleGroups"
          inline
          required
          label="Группа"
          placeholder="Выберите значение"
        />

        <ECNFormSelect
          v-model="internalStatus"
          class="mb-4"
          :items="articleStatus"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
        />

        <ECNContentBlockEditor
          v-model="article.contentBlocks"
          required
          inline
          label="Контент"
          placeholder="Добавьте и настройте блоки контента"
          :available-blocks="[ContentBlockType.TEXT, ContentBlockType.IMAGES]"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="articleId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteArticle"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
