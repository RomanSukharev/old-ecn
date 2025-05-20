<script lang="ts" setup>
import { ContentBlockType, type ContentBlock } from "@/shared/api/generated";

const props = withDefaults(
  defineProps<{
    label?: string;
    availableBlocks?: ContentBlockType[];
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: "",
    availableBlocks: undefined,
    placeholder: "",
    inline: false,
    required: false,
  },
);

const blocks = defineModel<ContentBlock[]>({ required: true });

const blockComponent = {
  [ContentBlockType.ACCORDION]: resolveComponent("ECNContentBlockAccordion"),
  [ContentBlockType.CITE]: resolveComponent("ECNContentBlockCite"),
  // [ContentBlockType.Files]: resolveComponent("ECNContentBlockFiles"),
  [ContentBlockType.IMAGES]: resolveComponent("ECNContentBlockImages"),
  [ContentBlockType.TEXT]: resolveComponent("ECNContentBlockText"),
  [ContentBlockType.YOUTUBE]: resolveComponent("ECNContentBlockYoutube"),
  [ContentBlockType.SPECIAL]: resolveComponent("ECNContentBlockSpecial"),
};

const availableBlocksInternal = computed(
  () =>
    props.availableBlocks || [
      ContentBlockType.TEXT,
      ContentBlockType.IMAGES,
      ContentBlockType.CITE,
      ContentBlockType.ACCORDION,
      // ContentBlockType.Files,
      ContentBlockType.YOUTUBE,
      ContentBlockType.SPECIAL,
    ],
);

const blockTypeLabel = {
  [ContentBlockType.ACCORDION]: "Аккордеон",
  [ContentBlockType.CITE]: "Цитата",
  // [ContentBlockType.Files]: "Файлы",
  [ContentBlockType.IMAGES]: "Изображения",
  [ContentBlockType.TEXT]: "Текст",
  [ContentBlockType.YOUTUBE]: "YouTube-видео",
  [ContentBlockType.SPECIAL]: "Special",
};

function onAddBlock(block: ContentBlockType): void {
  blocks.value = [
    ...blocks.value,
    {
      type: block,
      isVisible: true,
      data: {},
    },
  ];
}

function onHideBlock(block: ContentBlock): void {
  block.isVisible = false;
}

function onShowBlock(block: ContentBlock): void {
  block.isVisible = true;
}

function onDeleteBlock(block: ContentBlock): void {
  if (confirm("Удалить выбранный блок?")) {
    const blockIdx = blocks.value.indexOf(block);
    if (blockIdx != -1) {
      blocks.value.splice(blockIdx, 1);
    }
  }
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

    <div class="flex flex-col space-y-2" :class="{ 'grow mt-1': inline }">
      <Draggable :list="blocks" class="flex flex-col space-y-2">
        <div
          v-for="(block, i) in blocks"
          :key="i"
          class="rounded border border-gray-300"
        >
          <div
            class="flex items-center space-x-1 py-1 px-4 border-b border-gray-300 text-sm"
          >
            <span class="grow">{{ blockTypeLabel[block.type] }}</span>

            <div
              v-if="block.isVisible"
              class="p-1 cursor-pointer"
              @click="onHideBlock(block)"
            >
              <i-eye />
            </div>

            <div v-else class="p-1 cursor-pointer" @click="onShowBlock(block)">
              <i-eye-slash />
            </div>

            <div class="p-1 cursor-pointer" @click="onDeleteBlock(block)">
              <i-table-delete />
            </div>
          </div>

          <component :is="blockComponent[block.type]" v-model="block.data" />
        </div>
      </Draggable>

      <div class="flex space-x-1 items-center justify-end text-xs">
        <span class="text-gray-400 font-medium">Добавить: </span>

        <div
          v-for="block in availableBlocksInternal"
          :key="block.id"
          class="p-2 cursor-pointer rounded bg-gray-100 hover:bg-gray-200"
          :title="blockTypeLabel[block]"
          @click="onAddBlock(block)"
        >
          {{ blockTypeLabel[block].substring(0, 1) }}
        </div>
      </div>
    </div>
  </div>
</template>
