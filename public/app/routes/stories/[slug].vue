<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <div v-if="story" class="flex flex-col mt-7">
      <div class="flex justify-between space-x-64 mb-9">
        <h1 class="font-bold text-[44px] leading-none grow">
          {{ story.title }}
        </h1>

        <div class="text-base text-gray-400 shrink-0">
          {{ $dayjs(story.createdAt).format("DD.MM.YYYY HH:mm") }}
        </div>
      </div>

      <img
        v-if="story.cover?.url"
        :src="story.cover.url"
        class="h-[453px] rounded-xl mb-[60px]"
      />

      <div class="flex mb-[60px]">
        <div class="w-[447px] shrink-0">
          <div class="flex space-x-3 items-center">
            <i-story-logo filled :font-controlled="false" class="w-12 h-12" />

            <div class="text-xl leading-none font-bold">
              Единый центр<br />недвижимости
            </div>
          </div>
        </div>

        <div class="grow flex flex-col space-y-3">
          <a
            v-for="(block, i) in headings"
            :key="i"
            :href="`#${block.data.title}`"
            class="text-blue-600"
            >{{ block.data.title }}</a
          >
        </div>
      </div>

      <template v-for="(block, i) in story.contentBlocks" :key="i">
        <template v-if="block.type === ContentBlockType.TEXT">
          <div class="flex mb-[60px]">
            <div class="w-[447px] shrink-0"></div>

            <div class="grow max-w-[800px]">
              <h2
                v-if="block.data?.title"
                :id="block.data.title"
                class="text-2xl font-bold leading-none mb-6"
              >
                {{ block.data.title }}
              </h2>

              <div
                v-if="block.data?.content"
                class=""
                v-html="block.data.content.replace(/\n/g, '<br>')"
              ></div>
            </div>
          </div>
        </template>

        <template v-else-if="block.type === ContentBlockType.IMAGES">
          <div
            class="grid gap-5 mb-[60px]"
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

      <!-- <div v-if="story.related?.length">
        <div class="font-bold text-[44px] mb-9">Может быть интересно</div>
        <div class="grid grid-cols-3 gap-5">
          <ECNCardsStory
            v-for="(relatedStory, i) in story.related"
            :key="relatedStory.id"
            :data="relatedStory"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ContentBlockType, useStoryQuery } from "@/shared/api/generated";

const route = useRoute();
const id = route.params.slug as string;

const { result } = useStoryQuery({
  id,
});

const story = computed(() => result.value?.story);

const headings = computed(() =>
  story.value?.contentBlocks.filter(
    (block) => block.type === ContentBlockType.TEXT && !!block.data?.title,
  ),
);

const breadcrumbs = ref([
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/stories",
    title: "Новости",
  },
  {
    url: `/stories/${id}`,
    title: "Страница новости",
  },
]);
</script>
