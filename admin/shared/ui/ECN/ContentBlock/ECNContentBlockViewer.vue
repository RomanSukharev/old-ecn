<script lang="ts" setup>
import { ContentBlockType, type ContentBlock } from "@/shared/api/generated";

defineProps<{
  contentBlocks?: ContentBlock[];
}>();
</script>

<template>
  <template v-for="(block, i) in contentBlocks" :key="i">
    <template v-if="block.type === ContentBlockType.TEXT">
      <h2
        v-if="block.data?.title"
        class="font-bold text-xl mt-8 mb-4 max-w-screen-lg"
      >
        {{ block.data.title }}
      </h2>

      <div
        v-if="block.data?.content"
        class="max-w-screen-lg"
        v-html="block.data.content.replace(/\n/g, '<br>')"
      ></div>
    </template>

    <template v-else-if="block.type === ContentBlockType.IMAGES">
      <div
        class="grid gap-5 max-w-screen-lg my-8"
        :class="{
          'grid-cols-1': block.data?.images?.length === 1,
          'grid-cols-2': block.data?.images?.length === 2,
          'grid-cols-3': block.data?.images?.length > 2,
        }"
      >
        <img
          v-for="image in block.data?.images"
          :key="image.id"
          :src="image.url"
          class="rounded-xl object-cover"
          :class="{
            'h-[533px]': block.data?.images?.length === 1,
            'h-[403px]': block.data?.images?.length === 2,
            'h-[258px]': block.data?.images?.length > 2,
          }"
        />
      </div>
    </template>
  </template>
</template>
