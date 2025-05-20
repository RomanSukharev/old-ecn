<script lang="ts" setup>
import {
  useSaveStoryMutation,
  useDeleteStoryMutation,
  useStoryQuery,
  StoryCategoryEnum,
  type ContentBlock,
  ContentBlockType,
  ImagePreset,
} from "@/shared/api/generated";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    storyId?: string;
  }>(),
  {
    storyId: undefined,
  },
);

const uploadCoverModal = ref<boolean>(false);
const uploadCoverInput = ref<HTMLInputElement | null>(null);
const coverPic = ref<string>("");
const coverFile = ref<File | null>(null);

const storyCategory = [
  {
    id: StoryCategoryEnum.COMPANY,
    title: "Жизнь компании",
  },
  {
    id: StoryCategoryEnum.ESTATE,
    title: "Недвижимость",
  },
  {
    id: StoryCategoryEnum.NEWS,
    title: "Новости",
  },
];

const story = reactive<{
  id?: string;
  title: string;
  teaser?: string;
  cover?: { id: string; url: string };
  category: StoryCategoryEnum;
  contentBlocks: ContentBlock[];
}>({
  id: undefined,
  title: "",
  teaser: undefined,
  cover: undefined,
  category: StoryCategoryEnum.NEWS,
  contentBlocks: [],
});

const internalCategory = ref<{ id: StoryCategoryEnum; title: string }>({
  id: StoryCategoryEnum.NEWS,
  title: "Новости",
});
watch(internalCategory, (value) => {
  story.category = value?.id ?? StoryCategoryEnum.NEWS;
});

if (props.storyId) {
  const { onResult } = useStoryQuery({
    id: props.storyId,
  });

  onResult((result) => {
    story.id = result.data.story.id;
    story.title = result.data.story.title;
    story.teaser = result.data.story.teaser;
    story.cover = result.data.story.cover;
    story.contentBlocks = result.data.story.contentBlocks;

    nextTick(() => {
      if (story.category) {
        internalCategory.value = {
          id: story.category,
          title:
            storyCategory.find((i) => i.id === story.category)?.title ?? "-",
        };
      }
    });
  });
}

const drawerTitle = computed(() =>
  props.storyId ? "Редактирование новости" : "Создание новости",
);

const saveButtonTitle = computed(() =>
  props.storyId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.storyId) {
    try {
      const { mutate } = useSaveStoryMutation();
      await mutate({
        input: {
          id: props.storyId,
          title: story.title,
          teaser: story.teaser || undefined,
          category: story.category,
          cover: {
            file: coverFile.value,
            preset: ImagePreset.CONTENT_SITE_STORY_COVER,
          },
          contentBlocks: story.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить новость.");
    }
  } else {
    try {
      const { mutate } = useSaveStoryMutation();
      await mutate({
        input: {
          title: story.title,
          teaser: story.teaser || undefined,
          category: story.category,
          cover: {
            file: coverFile.value,
            preset: ImagePreset.CONTENT_SITE_STORY_COVER,
          },
          contentBlocks: story.contentBlocks,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать новость.");
    }
  }
}

async function onDeleteStory(): Promise<void> {
  if (confirm("Удалить новость?")) {
    if (props.storyId) {
      try {
        const { mutate } = useDeleteStoryMutation();
        await mutate({
          id: props.storyId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить новость.");
      }
    }
  }
}

function selectCoverFile(e: Event): void {
  // Reset last selection and results
  coverPic.value = "";
  coverFile.value = null;

  // Get selected files
  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  // Convert to dataURL and pass to the cropper component
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Update the picture source of the `img` prop
    coverPic.value = String(reader.result);

    // Show the modal
    uploadCoverModal.value = true;

    // Clear selected files of input element
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
          v-model="story.title"
          class="mb-4"
          inline
          required
          label="Название новости"
          placeholder="Укажите название новости"
        />

        <ECNFormSelect
          v-model="internalCategory"
          class="mb-4"
          :items="storyCategory"
          inline
          required
          label="Категория"
          placeholder="Выберите значение"
        />

        <ECNFormTextarea
          v-model="story.teaser"
          inline
          label="Тизер новости"
          placeholder="Укажите краткий текст новости"
        />
      </div>

      <div class="px-10 pt-10 shrink-0 flex items-center space-x-2">
        <img
          v-if="story?.cover"
          :src="story.cover.url"
          class="rounded bg-gray-400 h-11 aspect-video object-cover"
        />

        <div v-else class="rounded bg-gray-400 h-11 aspect-video"></div>

        <ECNButton
          outline
          class="border-gray-200 w-fit"
          @click="uploadCoverInput?.click()"
        >
          <i-plus-blue class="-ml-1" />

          <span>{{
            story?.cover ? "Заменить обложку" : "Добавить обложку"
          }}</span>

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
          v-model="story.contentBlocks"
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
        v-if="storyId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteStory"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
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
