<script lang="ts" setup>
import { useArticleQuery } from "@/shared/api/generated";

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const { result: data, refetch: refresh } = useArticleQuery({
  id,
});

const article = computed(() => data.value?.article);

const showArticleDrawer = ref(false);
const editArticleId = ref<string>();

async function onArticleSave(): Promise<void> {
  await refresh();
}

async function onArticleDelete(): Promise<void> {
  router.push("/content/articles");
}

function onEditArticle(articleId: string): void {
  editArticleId.value = articleId;
  showArticleDrawer.value = true;
}
</script>

<template>
  <div class="flex flex-col grow overflow-hidden">
    <div class="px-6 py-7 flex flex-col grow overflow-hidden">
      <ECNPageTitle
        class="mb-4"
        :title="article?.title || 'Неизвестная страница'"
      >
        <ECNButton small outline @click="onEditArticle(id)">
          <i-edit class="-ml-1" />

          <span>Редактировать</span>
        </ECNButton>
      </ECNPageTitle>

      <div class="overflow-auto">
        <ECNContentBlockViewer :content-blocks="article?.contentBlocks" />
      </div>

      <CRMDrawerArticle
        v-if="showArticleDrawer"
        :article-id="editArticleId"
        @close="
          showArticleDrawer = false;
          editArticleId = undefined;
        "
        @save="onArticleSave"
        @delete="onArticleDelete"
      />
    </div>
  </div>
</template>
