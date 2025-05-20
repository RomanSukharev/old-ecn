<script lang="ts" setup>
import { ImagePreset } from "@/shared/api/generated";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

defineEmits<{
  enter: [];
}>();

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
    preset?: ImagePreset;
    aspectRatio?: number;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    error: undefined,
    inline: true,
    required: false,
    preset: undefined,
    aspectRatio: undefined,
  },
);

const model = defineModel<File | null>({ required: true });

const aspectRatios = {
  [ImagePreset.STAFF_EMPLOYEE_AVATAR]: 1 / 1,
  [ImagePreset.STAFF_EMPLOYEE_PUBLIC_IMAGE]: 9 / 16,
  [ImagePreset.CONTENT_KB_ARTICLE_COVER]: 16 / 9,
  [ImagePreset.CONTENT_SITE_STORY_COVER]: 16 / 9,
  [ImagePreset.CONTENT_SITE_STORY_PHOTO]: 16 / 9,
  [ImagePreset.ESTATE_PROPERTY_PHOTO]: 16 / 9,
  [ImagePreset.ESTATE_COMPLEX_PHOTO]: 16 / 9,
};

const uploadModal = ref<boolean>(false);
const uploadInput = ref<HTMLInputElement | null>(null);
const pic = ref<string>("");

function selectFile(e: Event): void {
  // Reset last selection and results
  pic.value = "";
  model.value = null;

  // Get selected files
  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  // Convert to dataURL and pass to the cropper component
  const f = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onload = () => {
    // Update the picture source of the `img` prop
    pic.value = String(reader.result);

    // Show the modal
    uploadModal.value = true;

    // Clear selected files of input element
    if (!uploadInput.value) return;
    uploadInput.value.value = "";
  };
}

async function getResult(): Promise<void> {
  if (!cropper) return;
  model.value = await cropper.getFile();
  uploadModal.value = false;
}
</script>

<template>
  <div
    :class="{
      'flex items-start space-x-2': inline,
      'w-full flex flex-col space-y-2': !inline,
    }"
  >
    <div
      class="relative text-xs font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 mt-3 leading-snug border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="flex flex-col space-y-0.5" :class="{ grow: inline }">
      <div
        class="text-blue-600 text-center flex space-x-1"
        @click="uploadInput?.click()"
      >
        <i-plus-blue />

        <span>Добавить изображение</span>

        <input
          ref="uploadInput"
          class="hidden"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          @change="selectFile"
        />
      </div>
    </div>

    <div
      v-if="uploadModal"
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
          :img="pic"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: aspectRatio || (preset && aspectRatios[preset]),
          }"
        />

        <div
          class="bg-white text-center flex items-center px-3 py-2 space-x-1 shrink-0"
        >
          <ECNButton @click="getResult">Выбрать</ECNButton>

          <ECNButton @click="uploadModal = false">Отменить</ECNButton>
        </div>
      </div>
    </div>
  </div>
</template>
