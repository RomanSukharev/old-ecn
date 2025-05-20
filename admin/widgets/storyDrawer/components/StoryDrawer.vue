<script setup lang="ts">
import {
  useDeleteStoryMutation,
  useStoryQuery,
  useSaveStoryMutation,
  ContentBlockType,
} from "~/shared/api/generated";
import { useStoryDrawer } from "../composables/useStoryDrawer";
import { storyCategory } from "../constants";
import type { IProps } from "../types";
import { cropper } from "vue-picture-cropper";

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
  loading,

  title,
  teaser,
  category,
  cover,
  contentBlocks,

  setErrors,
  setTouched,
} = useStoryDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useStoryQuery({ id: props.id });

  onResult((res) => {
    const story = res.data.story;

    title.value = story.title;
    teaser.value = story.teaser;
    category.value = story.category;
    cover.value = story.cover;
    contentBlocks.value = story.contentBlocks;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить новость",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveStoryMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Новость успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить новость",
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
    message: "Удалить выбранную новость?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteStoryMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Новость удалена",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить новость",
          severity: "error",
          life: 5000,
        });
      });

      mutate({ id });
    },
  });
}

const uploadCoverModal = ref<boolean>(false);
const uploadCoverInput = ref<HTMLInputElement | null>(null);
const coverPic = ref<string>("");
const coverFile = ref<File | null>(null);

function selectCoverFile(e: Event): void {
  coverPic.value = "";
  coverFile.value = null;

  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    coverPic.value = String(reader.result);

    uploadCoverModal.value = true;

    if (!uploadCoverInput.value) return;
    uploadCoverInput.value.value = "";
  };
}

async function getCoverResult(): Promise<void> {
  if (!cropper) return;
  const file = await cropper.getFile();

  coverFile.value = file;

  uploadCoverModal.value = false;
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
          label="Название новости"
          placeholder="Укажите название новости"
          :error="errors.title"
        />

        <ECNFormSelect
          v-model="category"
          class="mb-4"
          :items="storyCategory"
          inline
          required
          label="Категория"
          placeholder="Выберите значение"
          new-select
          :error="errors.category"
        />

        <ECNFormTextarea
          v-model="teaser"
          inline
          label="Тизер новости"
          placeholder="Укажите краткий текст новости"
          :error="errors.teaser"
        />
      </div>

      <div class="px-10 pt-10 shrink-0 flex items-center space-x-2">
        <img
          v-if="cover"
          :src="cover?.url"
          class="rounded bg-gray-400 h-11 aspect-video object-cover"
        />

        <div v-else class="rounded bg-gray-400 h-11 aspect-video"></div>

        <ECNButton
          outline
          class="border-gray-200 w-fit"
          @click="uploadCoverInput?.click()"
        >
          <i-plus-blue class="-ml-1" />

          <span>{{ cover ? "Заменить обложку" : "Добавить обложку" }}</span>

          <input
            ref="uploadCoverInput"
            class="hidden"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="selectCoverFile"
          />
        </ECNButton>
      </div>

      <div class="px-10 pt-10 shrink-0">
        <ECNContentBlockEditor
          v-model="contentBlocks"
          required
          inline
          label="Контент"
          placeholder="Добавьте и настройте блоки контента"
          :available-blocks="[ContentBlockType.TEXT, ContentBlockType.IMAGES]"
          :error="errors.contentBlocks"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteHandler"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSaveHandler">{{ saveButtonTitle }}</ECNButton>
    </template>

    <div
      v-if="uploadCoverModal"
      class="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-20 flex flex-col items-center justify-center"
    >
      <div class="max-w-96 max-h-screen flex flex-col">
        <div class="h-10 bg-white text-center flex items-center px-3 shrink-0">
          Загрузка изображения
        </div>

        <VuePictureCropper
          class="grow"
          :box-style="{
            width: '100%',
            height: '100%',
            margin: 'auto',
          }"
          :img="coverPic"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
          }"
        />

        <div
          class="bg-white text-center flex items-center px-3 py-2 space-x-1 shrink-0"
        >
          <ECNButton @click="getCoverResult">Загрузить</ECNButton>

          <ECNButton @click="uploadCoverModal = false">Отменить</ECNButton>
        </div>
      </div>
    </div>
  </ECNDrawer>
</template>
