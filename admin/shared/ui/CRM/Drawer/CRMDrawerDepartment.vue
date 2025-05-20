<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useSaveDepartmentMutation,
  useDeleteDepartmentMutation,
  useDepartmentQuery,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    departmentId?: string;
  }>(),
  {
    departmentId: undefined,
  },
);

const department = reactive<{
  id?: string;
  title: string;
  groups: { id?: string; title: string }[];
}>({
  id: undefined,
  title: "",
  groups: [],
});

if (props.departmentId) {
  const { onResult } = useDepartmentQuery({
    id: props.departmentId,
  });

  onResult((result) => {
    department.id = result.data.department.id;
    department.title = result.data.department.title;
    department.groups = [
      ...result.data.department.groups.map((g) => ({ ...g })),
    ];
  });
}

const drawerTitle = computed(() =>
  props.departmentId ? "Редактирование отдела" : "Создание отдела",
);

const saveButtonTitle = computed(() =>
  props.departmentId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.departmentId) {
    try {
      const { mutate } = useSaveDepartmentMutation();
      await mutate({
        input: {
          id: props.departmentId,
          title: department.title,
          groups: department.groups,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить отдел.");
    }
  } else {
    try {
      const { mutate } = useSaveDepartmentMutation();
      await mutate({
        input: {
          title: department.title,
          groups: department.groups,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать отдел.");
    }
  }
}

async function onDeleteDepartment(): Promise<void> {
  if (confirm("Удалить отдел и все вложенные группы?")) {
    if (props.departmentId) {
      try {
        const { mutate } = useDeleteDepartmentMutation();
        await mutate({
          id: props.departmentId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить отдел.");
      }
    }
  }
}

function onAddGroup(): void {
  department.groups.push({ title: "" });
}

function onDeleteGroup(i: number): void {
  department.groups.splice(i, 1);
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
          v-model="department.title"
          inline
          required
          label="Название отдела"
          placeholder="Укажите название отдела"
        />

        <ECNDivider />
      </div>

      <div class="px-10 pb-10 grow overflow-auto">
        <template v-for="(group, i) in department.groups" :key="i">
          <div class="w-full flex items-center space-x-2 mb-10">
            <ECNFormInput
              v-model="department.groups[i].title"
              class="grow"
              inline
              required
              label="Название группы"
              placeholder="Укажите название группы"
            />

            <div class="p-3 cursor-pointer" @click="onDeleteGroup(i)">
              <i-delete />
            </div>
          </div>
        </template>

        <ECNButton outline class="border-gray-200 w-fit" @click="onAddGroup">
          <i-plus-blue class="-ml-1" />

          <span>Добавить группу</span>
        </ECNButton>
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="departmentId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteDepartment"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
