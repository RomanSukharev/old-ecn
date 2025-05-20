<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useArticleGroupsQuery,
  useArticlesQuery,
} from "@/shared/api/generated";

const filters = reactive<{
  groupID?: string;
}>({
  groupID: undefined,
});

const {
  result: groupsRaw,
  loading: groupsLoading,
  refetch: refresh,
} = useArticleGroupsQuery();

const {
  result: articlesRaw,
  loading: articlesLoading,
  refetch: articlesRefresh,
} = useArticlesQuery({
  filter: filters,
});

const articleGroups = computed(
  () => groupsRaw.value?.articleGroups.nodes ?? [],
);

const articles = computed(() => articlesRaw.value?.articles.nodes ?? []);

const activeTab = ref("all");

const showGroupDrawer = ref(false);
const editGroupId = ref<string>();

const showArticleDrawer = ref(false);
const editArticleId = ref<string>();

function onCreateGroup(): void {
  showGroupDrawer.value = true;
}

function onEditGroup(id: string): void {
  editGroupId.value = id;
  showGroupDrawer.value = true;
}

async function onGroupSave(): Promise<void> {
  await refresh();
}

async function onGroupDelete(): Promise<void> {
  activeTab.value = "all";
  await refresh();
}

function onCreateArticle(): void {
  showArticleDrawer.value = true;
}

async function onArticleSave(): Promise<void> {
  await articlesRefresh();
}

async function onArticleDelete(): Promise<void> {
  await articlesRefresh();
}

watch(activeTab, async (value) => {
  if (value !== "all") {
    filters.groupID = value;
  } else {
    filters.groupID = undefined;
  }
  await articlesRefresh();
});
</script>

<template>
  <div class="flex flex-col grow overflow-hidden">
    <div class="px-6 py-7 flex flex-col grow overflow-hidden">
      <ECNPageTitle class="mb-4" title="База знаний">
        <ECNButton outline small @click="onCreateGroup">
          <i-plus-blue class="-ml-1" />

          <span>Создать группу</span>
        </ECNButton>

        <ECNButton small @click="onCreateArticle">
          <i-plus-white class="-ml-1" />

          <span>Создать статью</span>
        </ECNButton>
      </ECNPageTitle>

      <div class="flex space-x-2 items-center justify-between">
        <div
          v-if="groupsLoading"
          class="text-gray-400 text-xs flex items-center h-8"
        >
          Загрузка разделов...
        </div>

        <template v-else>
          <ECNTabs v-model="activeTab" variant="pills">
            <ECNTabsItem name="all" title="Все страницы" />

            <ECNTabsItem
              v-for="(group, i) in articleGroups"
              :key="i"
              :name="group.id"
              :title="group.title"
            />
          </ECNTabs>
        </template>

        <div
          v-if="activeTab !== 'all'"
          class="p-2 cursor-pointer rounded hover:bg-gray-100"
          @click="onEditGroup(activeTab)"
        >
          <i-edit />
        </div>
      </div>

      <ECNDivider />

      <div
        v-if="articles.length"
        class="grid grid-cols-3 gap-4 overflow-auto pb-4"
      >
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="`/content/articles/${article.id}`"
          class="border border-gray-300 rounded text-gray-400 font-medium p-8 hover:bg-gray-50 text-xl shadow-md flex items-center"
        >
          {{ article.title }}
        </NuxtLink>
      </div>

      <div v-else-if="articlesLoading" class="text-gray-400">Загрузка...</div>

      <div v-else class="text-gray-400">В данном разделе ещё нет статей.</div>

      <CRMDrawerArticleGroup
        v-if="showGroupDrawer"
        :group-id="editGroupId"
        @close="
          showGroupDrawer = false;
          editGroupId = undefined;
        "
        @save="onGroupSave"
        @delete="onGroupDelete"
      />

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
