<script lang="ts" setup>
import { useUploadImageMutation } from "@/shared/api/generated";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const data = defineModel<TAny>({ required: true });

const { mutate } = useUploadImageMutation();

const uploadModal = ref<boolean>(false);
const uploadInput = ref<HTMLInputElement | null>(null);
const pic = ref<string>("");

function selectFile(e: Event): void {
  // Reset last selection and results
  pic.value = "";

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
  const f = await cropper.getFile();
  const result = await mutate({
    input: {
      file: f,
    },
  });
  if (result?.data?.uploadImage) {
    if (!data.value?.images) {
      data.value.images = [];
    }
    data.value.images.push({
      id: result?.data?.uploadImage.id,
      url: result?.data?.uploadImage.url,
      previewUrl: result?.data?.uploadImage.previewUrl,
    });
  }
  uploadModal.value = false;
}
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2 p-2">
      <Draggable :list="data" class="grid grid-cols-3 gap-2">
        <div
          v-for="(image, i) in data.images"
          :key="image.id"
          class="relative rounded border border-gray-200"
        >
          <img
            :src="image.previewUrl || image.url"
            class="aspect-square object-contain"
          />

          <div
            class="absolute right-2 top-2 cursor-pointer"
            @click="data.images?.splice(i, 1)"
          >
            <i-table-delete />
          </div>
        </div>

        <div
          class="relative rounded border border-gray-200 cursor-pointer hover:bg-gray-50"
          @click="uploadInput?.click()"
        >
          <div class="aspect-square flex flex-col items-center justify-center">
            <i-plus-blue />

            <span class="text-center text-xs text-blue-600"
              >Добавить изображение</span
            >

            <input
              ref="uploadInput"
              class="hidden"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              @change="selectFile"
            />
          </div>
        </div>
      </Draggable>
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
