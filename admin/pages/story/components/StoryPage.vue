<script lang="ts" setup>
import { useStoryQuery } from "@/shared/api/generated";
import StoryDrawer from "~/widgets/storyDrawer/components/StoryDrawer.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const { result: data, refetch: refresh } = useStoryQuery({
  id,
});

const story = computed(() => data.value?.story);
const showStoryDrawer = ref(false);
const editStoryId = ref<string>();

async function onStorySave(): Promise<void> {
  await refresh();
}

async function onStoryDelete(): Promise<void> {
  router.push("/content/story");
}

function onEditStory(storyId: string): void {
  editStoryId.value = storyId;
  showStoryDrawer.value = true;
}
</script>

<template>
  <div class="flex flex-col grow overflow-hidden">
    <div class="px-6 py-7 flex flex-col grow overflow-hidden">
      <ECNPageTitle
        class="mb-4 max-w-screen-lg"
        :title="story?.title || 'Неизвестная страница'"
      >
        <ECNButton small outline @click="onEditStory(id)">
          <i-edit class="-ml-1" />

          <span>Редактировать</span>
        </ECNButton>
      </ECNPageTitle>

      <div class="overflow-auto">
        <img
          v-if="story?.cover?.url"
          :src="story.cover.url"
          class="rounded-xl h-[453px] object-cover mb-10 max-w-screen-lg"
        />

        <ECNContentBlockViewer :content-blocks="story?.contentBlocks" />
      </div>

      <StoryDrawer
        v-if="showStoryDrawer"
        :story-id="editStoryId"
        @close="
          showStoryDrawer = false;
          editStoryId = undefined;
        "
        @save="onStorySave"
        @delete="onStoryDelete"
      />
    </div>
  </div>
</template>
