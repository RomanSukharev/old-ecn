<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  RolePermissionsEnum,
  useSaveRoleMutation,
  useDeleteRoleMutation,
  useRoleQuery,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    roleId?: string;
  }>(),
  {
    roleId: undefined,
  },
);

const role = reactive<{
  id?: string;
  title: string;
  permissions: RolePermissionsEnum[];
}>({
  id: undefined,
  title: "",
  permissions: [],
});

if (props.roleId) {
  const { onResult } = useRoleQuery({
    id: props.roleId,
  });

  onResult((result) => {
    const roleRaw = result.data.role;

    role.id = roleRaw.id;
    role.title = roleRaw.title;
    role.permissions = [...roleRaw.permissions];
  });
}

const drawerTitle = computed(() =>
  props.roleId ? "Редактирование роли" : "Создание роли",
);

const saveButtonTitle = computed(() =>
  props.roleId ? "Сохранить" : "Создать",
);

const RolePermissionsGroups: RolePermissionsEnum[][] = [
  [
    RolePermissionsEnum.STAFF_SAVE_EMPLOYEE,
    RolePermissionsEnum.STAFF_SAVE_POSITION,
    RolePermissionsEnum.STAFF_SAVE_DEPARTMENT,
    RolePermissionsEnum.STAFF_SAVE_ROLE,
  ],
  [
    RolePermissionsEnum.STAFF_DELETE_EMPLOYEE,
    RolePermissionsEnum.STAFF_DELETE_POSITION,
    RolePermissionsEnum.STAFF_DELETE_DEPARTMENT,
    RolePermissionsEnum.STAFF_DELETE_ROLE,
  ],
  [
    RolePermissionsEnum.CONTENT_SAVE_ARTICLE,
    RolePermissionsEnum.CONTENT_SAVE_ARTICLE_GROUP,
    RolePermissionsEnum.CONTENT_SAVE_PAGE,
    RolePermissionsEnum.CONTENT_SAVE_REVIEW,
    RolePermissionsEnum.CONTENT_SAVE_STORY,
    RolePermissionsEnum.CONTENT_SAVE_VACANCY,
  ],
  [
    RolePermissionsEnum.CONTENT_DELETE_ARTICLE,
    RolePermissionsEnum.CONTENT_DELETE_ARTICLE_GROUP,
    RolePermissionsEnum.CONTENT_DELETE_PAGE,
    RolePermissionsEnum.CONTENT_DELETE_REVIEW,
    RolePermissionsEnum.CONTENT_DELETE_STORY,
    RolePermissionsEnum.CONTENT_DELETE_VACANCY,
  ],
  [RolePermissionsEnum.SYSTEM_VIEW_LOG],
];

const dict: Record<RolePermissionsEnum, string> = {
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

function getPermissionLabel(permission: RolePermissionsEnum): string {
  return dict[permission];
}

function getPermission(permission: RolePermissionsEnum): ComputedRef<boolean> {
  return computed(() => !!role.permissions.find((p) => p === permission));
}

function setPermission(permission: RolePermissionsEnum, value: boolean): void {
  const idx = role.permissions.findIndex((p) => p === permission);
  if (value) {
    if (idx === -1) {
      role.permissions.push(permission);
    }
  } else {
    if (idx !== -1) {
      role.permissions.splice(idx, 1);
    }
  }
}

async function onSave(): Promise<void> {
  if (props.roleId) {
    try {
      const { mutate } = useSaveRoleMutation();
      await mutate({
        input: {
          id: props.roleId,
          title: role.title,
          permissions: role.permissions,
        },
      });
    } catch (err) {
      alert("Не удалось обновить роль.");
    }
  } else {
    try {
      const { mutate } = useSaveRoleMutation();
      await mutate({
        input: {
          title: role.title,
          permissions: role.permissions,
        },
      });
    } catch (err) {
      alert("Не удалось создать роль.");
    }
  }
  emit("save");
  emit("close");
}

async function onDeleteRole(): Promise<void> {
  if (confirm("Удалить роль?")) {
    if (props.roleId) {
      try {
        const { mutate } = useDeleteRoleMutation();
        await mutate({
          id: props.roleId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить роль.");
      }
    }
  }
}
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="role.title"
          inline
          required
          label="Название роли"
          placeholder="Укажите название роли"
        />

        <ECNDivider />
      </div>

      <div class="px-10 pb-10 grow overflow-auto">
        <ECNFormCheckboxGroup label="Полномочия" required>
          <template v-for="(group, i) in RolePermissionsGroups" :key="i">
            <ECNFormCheckbox
              v-for="permission in group"
              :key="permission"
              :label="getPermissionLabel(permission)"
              :value="getPermission(permission)"
              @update:model-value="setPermission(permission, $event)"
            ></ECNFormCheckbox>

            <ECNDivider v-if="RolePermissionsGroups.length != i - 1" dense />
          </template>
        </ECNFormCheckboxGroup>
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="roleId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteRole"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
