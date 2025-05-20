<template>
  <div class="max-w-desktop grow mx-auto pb-[60px]">
    <ECNBreadcrumbs :items="breadcrumbs" />

    <div class="my-7 hidden">Фильтры</div>

    <div class="flex flex-col space-y-20 mt-7">
      <template v-for="category in storyCategories" :key="category.id">
        <div v-if="stories[category.id]">
          <h2 class="font-bold text-[44px] mb-9">{{ category.title }}</h2>

          <div class="grid grid-cols-3 gap-5">
            <ECNCardsStory
              v-for="(story, i) in stories[category.id]"
              :key="story.id"
              :data="story"
              :layout="i === 0 ? getStoryLayout(category.id) : undefined"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  StoryCategoryEnum,
  useStoriesQuery,
  type Story,
} from "~/shared/api/generated";

const { result } = useStoriesQuery();
const stories = computed<Record<StoryCategoryEnum, Story[]>>(
  () =>
    result.value?.stories.nodes.reduce((acc: TAny, story) => {
      if (!acc[story.category]) {
        acc[story.category] = [];
      }
      acc[story.category].push(story);
      return acc;
    }, {}) || {},
);

const storyCategories = [
  {
    id: StoryCategoryEnum.NEWS,
    title: "Новости",
  },
  {
    id: StoryCategoryEnum.ESTATE,
    title: "Недвижимость",
  },
  {
    id: StoryCategoryEnum.COMPANY,
    title: "Жизнь компании",
  },
];

const breadcrumbs = [
  {
    url: "/",
    title: "Главная",
  },
  {
    url: "/stories",
    title: "Новости",
  },
];

function getStoryLayout(
  category: StoryCategoryEnum,
): "wide" | "horizontal" | "vertical" | undefined {
  switch (category) {
    case StoryCategoryEnum.NEWS:
      return "wide";
    case StoryCategoryEnum.ESTATE:
      return "horizontal";
    case StoryCategoryEnum.COMPANY:
      return "vertical";
    default:
      return undefined;
  }
}
</script>
