<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";
import { useElementSize } from "@vueuse/core";
import { useDeleteRoleMutation, useRolesQuery } from "@/shared/api/generated";

const searchString = ref("");
const itemsSelected = ref<Item[]>([]);

const { result: data, refetch: refresh } = useRolesQuery({
  search: searchString.value || undefined,
});

const headers: Header[] = [
  { text: "Название", value: "title", sortable: true, width: 240 },
  { text: "Полномочия", value: "permissions" },
  { text: "", value: "actions", width: 36 },
];

const items = computed(() => data.value?.roles.nodes || []);

const showRoleDrawer = ref(false);
const editRoleId = ref<string>();

function onCreateRole(): void {
  showRoleDrawer.value = true;
}

function onEditRole(id: string): void {
  editRoleId.value = id;
  showRoleDrawer.value = true;
}

async function onDeleteRole(id: string): Promise<void> {
  if (confirm("Удалить роль?")) {
    try {
      const { mutate } = useDeleteRoleMutation();
      await mutate({
        id,
      });
      await refresh();
    } catch (err) {
      alert("Не удалось удалить роль.");
    }
  }
}

async function onRoleSave(): Promise<void> {
  await refresh();
}

async function onRoleDelete(): Promise<void> {
  await refresh();
}

function translatePermissions(permissions: string[]): string {
  const dict: Record<string, string> = {
    STAFF_SAVE_EMPLOYEE: "Создание/Редактирование сотрудников",
    STAFF_SAVE_POSITION: "Создание/Редактирование должностей",
    STAFF_SAVE_DEPARTMENT: "Создание/Редактирование отделов и групп",
    STAFF_SAVE_ROLE: "Создание/Редактирование ролей и полномочий",

    STAFF_DELETE_EMPLOYEE: "Удаление пользователей",
    STAFF_DELETE_POSITION: "Удаление должностей",
    STAFF_DELETE_DEPARTMENT: "Удаление отделов и групп",
    STAFF_DELETE_ROLE: "Удаление ролей",

    CONTENT_SAVE_ARTICLE: "Создание/Редактирование статей базы знаний",
    CONTENT_SAVE_ARTICLE_GROUP: "Создание/Редактирование разделов базы знаний",
    CONTENT_SAVE_PAGE: "Создание/Редактирование страниц сайта",
    CONTENT_SAVE_REVIEW: "Создание/Редактирование отзывов на сотрудников",
    CONTENT_SAVE_STORY: "Создание/Редактирование новостей",
    CONTENT_SAVE_VACANCY: "Создание/Редактирование вакансий",

    CONTENT_DELETE_ARTICLE: "Удаление статей базы знаний",
    CONTENT_DELETE_ARTICLE_GROUP: "Удаление разделов базы знаний",
    CONTENT_DELETE_PAGE: "Удаление страниц сайта",
    CONTENT_DELETE_REVIEW: "Удаление отзывов на сотрудников",
    CONTENT_DELETE_STORY: "Удаление новостей",
    CONTENT_DELETE_VACANCY: "Удаление вакансий",

    SYSTEM_VIEW_LOG: "Просмотр системного журнала",
  };
  return permissions.length ? permissions.map((p) => dict[p]).join(", ") : "-";
}

const tableWrapper = ref<TAny>();

const { height } = useElementSize(tableWrapper);

const computedHeight = computed(() => height.value - 2);
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Роли и полномочия">
      <ECNButton outline small @click="onCreateRole">
        <i-plus-blue class="-ml-1" />

        <span>Создать роль</span>
      </ECNButton>
    </ECNPageTitle>

    <ECNSearchInput
      v-model="searchString"
      class="mb-5"
      placeholder="Укажите ключевое слово"
    />

    <div ref="tableWrapper" class="grow relative overflow-hidden">
      <EasyDataTable
        v-model:items-selected="itemsSelected"
        class="max-h-full"
        :headers="headers"
        :items="items"
        border-cell
        hide-footer
        table-class-name="ECN--Table"
        header-class-name="font-medium"
        header-item-class-name="select-none"
        theme-color="#0F62FE"
        :table-min-height="64"
        :table-height="computedHeight"
      >
        <template #empty-message>
          <div class="text-gray-400">Ничего не найдено.</div>
        </template>

        <template #item-permissions="{ permissions }">
          <div class="">{{ translatePermissions(permissions || []) }}</div>
        </template>

        <template #item-actions="{ id }">
          <div class="p-1 cursor-pointer" @click="onEditRole(id)">
            <i-table-edit />
          </div>

          <div class="p-1 cursor-pointer" @click="onDeleteRole(id)">
            <i-table-delete />
          </div>
        </template>
      </EasyDataTable>
    </div>

    <CRMDrawerRole
      v-if="showRoleDrawer"
      :role-id="editRoleId"
      @close="
        showRoleDrawer = false;
        editRoleId = undefined;
      "
      @save="onRoleSave"
      @delete="onRoleDelete"
    />
  </div>
</template>
