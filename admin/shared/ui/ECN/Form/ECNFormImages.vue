<script lang="ts" setup>
const emit = defineEmits<{
  "update:modelValue": [
    {
      id?: string;
      file?: File;
      title?: string;
      url?: string;
      previewUrl?: string;
    }[],
  ];
}>();

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
    modelValue: {
      id?: string;
      file?: File;
      title?: string;
      url?: string;
      previewUrl?: string;
    }[];
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    inline: true,
    required: false,
  },
);

const model = computed(() => props.modelValue);

const uploadInput = ref<HTMLInputElement>();

async function readFile(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      model.value.push({
        file,
        title: file.name,
        url: String(fr.result),
      });
      resolve();
    };
    fr.onerror = () => {
      reject();
    };
    fr.readAsDataURL(file);
  });
}

async function onSelectFile(e: Event): Promise<void> {
  // Get selected files
  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  for (const file of files) {
    await readFile(file);
  }

  if (!uploadInput.value) return;
  uploadInput.value.value = "";

  emit("update:modelValue", model.value);
}

function deleteFile(i: number): void {
  model.value.splice(i, 1);
  emit("update:modelValue", model.value);
}

function onSort(): void {
  emit("update:modelValue", model.value);
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
        'w-30 shrink-0 mt-3 border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div
      class="rounded-md border border-gray-300 border-dashed px-3 py-4 text-gray-600 flex flex-col space-y-2 font-medium text-base"
      :class="{ grow: inline }"
    >
      <Draggable :list="model" class="grid grid-cols-3 gap-2" @end="onSort">
        <div
          v-for="(image, i) in model"
          :key="image.id"
          class="relative rounded border border-gray-200"
        >
          <img
            :src="image.previewUrl || image.url"
            class="aspect-square object-fill"
          />

          <div
            class="absolute right-2 top-2 cursor-pointer"
            @click="deleteFile(i)"
          >
            <i-table-delete />
          </div>
        </div>
      </Draggable>

      <div class="w-full flex justify-center">
        <input
          ref="uploadInput"
          type="file"
          multiple
          class="hidden"
          @change="onSelectFile"
        />

        <ECNButton small outline @click="uploadInput?.click()"
          ><i-plus-blue class="mr-1" />Загрузить</ECNButton
        >
      </div>
    </div>
  </div>
</template>
