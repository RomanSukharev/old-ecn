<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";
import { useElementSize } from "@vueuse/core";
import {
  useActivateEmployeesMutation,
  useDeactivateEmployeesMutation,
  useDeleteEmployeeMutation,
  useDeleteEmployeesMutation,
  useDepartmentsQuery,
  useEmployeesQuery,
  usePublishEmployeesMutation,
  useUnpublishEmployeesMutation,
  type EmployeesFilterInput,
} from "@/shared/api/generated";

const filters = reactive<EmployeesFilterInput>({
  position: undefined,
  department: undefined,
  group: undefined,
  role: undefined,
});

const {
  result: departmentsRaw,
  loading: departmentsLoading,
  refetch: refresh,
} = useDepartmentsQuery();

const { result: employeesRaw, refetch: employeesRefresh } = useEmployeesQuery({
  filter: filters,
});

const departments = computed(
  () => departmentsRaw.value?.departments.nodes ?? [],
);
const departmentGroups = computed(
  () =>
    departmentsRaw.value?.departments.nodes.find((d) => d.id == activeTab.value)
      ?.groups || [],
);

const headers: Header[] = [
  {
    text: "Номер",
    value: "internalNumber",
    sortable: true,
    fixed: true,
    width: 80,
  },
  { text: "Сотрудник", value: "surname", fixed: true, width: 120 },
  { text: "Контакты", value: "email", width: 220 },
  { text: "Фото", value: "avatar", width: 52 },
  { text: "Дата рождения", value: "birthday", width: 140 },
  { text: "Должность", value: "position", width: 160 },
  { text: "Отдел", value: "department", width: 160 },
  { text: "Группа", value: "group", width: 160 },
  { text: "Роль", value: "role", width: 160 },
  { text: "", value: "actions", width: 36 },
];

const items = computed(() => employeesRaw.value?.employees.nodes ?? []);

const tableWrapper = ref<TAny>();

const { height } = useElementSize(tableWrapper);

const computedHeight = computed(() => height.value - 2);

const activeTab = ref("all");
const activeGroup = ref<string>("all");
const searchString = ref("");
const itemsSelected = ref<Item[]>([]);

const showDepartmentDrawer = ref(false);
const editDepartmentId = ref<string>();
const showEmployeeDrawer = ref(false);
const editEmployeeId = ref<string>();
const showFiltersDrawer = ref(false);

function onCreateDepartment(): void {
  showDepartmentDrawer.value = true;
}

function onCreateEmployee(): void {
  showEmployeeDrawer.value = true;
}

function onShowFilter(): void {
  showFiltersDrawer.value = true;
}

function onEditDepartment(id: string): void {
  editDepartmentId.value = id;
  showDepartmentDrawer.value = true;
}

function onEditEmployee(id: string): void {
  editEmployeeId.value = id;
  showEmployeeDrawer.value = true;
}

async function onDeleteEmployee(id: string): Promise<void> {
  if (confirm("Удалить сотрудника?")) {
    try {
      const { mutate } = useDeleteEmployeeMutation();
      await mutate({
        id,
      });
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудника.");
    }
  }
}

async function onDepartmentSave(): Promise<void> {
  await refresh();
}

async function onDepartmentDelete(): Promise<void> {
  activeTab.value = "all";
  await refresh();
}

async function onEmployeeSave(): Promise<void> {
  await employeesRefresh();
}

async function onEmployeeDelete(): Promise<void> {
  await employeesRefresh();
}

async function onApplyFilter(data: TAny): Promise<void> {
  filters.position = data?.position;
  filters.role = data?.role;
  await employeesRefresh();
}

async function onMassDelete(): Promise<void> {
  if (confirm("Удалить выбранных сотрудников?")) {
    try {
      const { mutate } = useDeleteEmployeesMutation();
      await mutate({
        ids: itemsSelected.value.map((i) => i.id),
      });
      itemsSelected.value = [];
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудников.");
    }
  }
}

async function onMassActivate(): Promise<void> {
  if (confirm("Активировать выбранных сотрудников?")) {
    try {
      const { mutate } = useActivateEmployeesMutation();
      await mutate({
        ids: itemsSelected.value.map((i) => i.id),
      });
      itemsSelected.value = [];
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудников.");
    }
  }
}

async function onMassDeactivate(): Promise<void> {
  if (confirm("Деактивировать выбранных сотрудников?")) {
    try {
      const { mutate } = useDeactivateEmployeesMutation();
      await mutate({
        ids: itemsSelected.value.map((i) => i.id),
      });
      itemsSelected.value = [];
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудников.");
    }
  }
}

async function onMassPublish(): Promise<void> {
  if (confirm("Опубликовать выбранных сотрудников?")) {
    try {
      const { mutate } = usePublishEmployeesMutation();
      await mutate({
        ids: itemsSelected.value.map((i) => i.id),
      });
      itemsSelected.value = [];
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудников.");
    }
  }
}

async function onMassUnpublish(): Promise<void> {
  if (confirm("Снять с публикации выбранных сотрудников?")) {
    try {
      const { mutate } = useUnpublishEmployeesMutation();
      await mutate({
        ids: itemsSelected.value.map((i) => i.id),
      });
      itemsSelected.value = [];
      await employeesRefresh();
    } catch (err) {
      alert("Не удалось удалить сотрудников.");
    }
  }
}

watch(activeTab, async (value) => {
  activeGroup.value = "all";
  if (value !== "all") {
    filters.department = value;
  } else {
    filters.department = undefined;
  }
  await employeesRefresh();
});

watch(activeGroup, async (value) => {
  if (value !== "all") {
    filters.group = value;
  } else {
    filters.group = undefined;
  }
  await employeesRefresh();
});
</script>

<template>
  <div class="flex flex-col grow overflow-hidden">
    <div class="px-6 py-7 flex flex-col grow overflow-hidden">
      <ECNPageTitle class="mb-4" title="Сотрудники">
        <ECNButton
          outline
          small
          title="Фильтр"
          right-icon="i-filter"
          @click="onShowFilter"
        />

        <ECNButton
          outline
          small
          title="Создать отдел"
          left-icon="i-plus"
          @click="onCreateDepartment"
        />

        <ECNButton
          small
          title="Создать сотрудника"
          left-icon="i-plus"
          @click="onCreateEmployee"
        />
      </ECNPageTitle>

      <div class="mb-4 flex space-x-2 items-center justify-between">
        <div
          v-if="departmentsLoading"
          class="text-gray-400 text-xs flex items-center h-8"
        >
          Загрузка отделов...
        </div>

        <template v-else>
          <ECNTabs v-model="activeTab" variant="pills">
            <ECNTabsItem name="all" title="Все сотрудники" />

            <ECNTabsItem
              v-for="(department, i) in departments"
              :key="i"
              :name="department.id"
              :title="department.title"
            />
          </ECNTabs>
        </template>

        <div
          v-if="activeTab !== 'all'"
          class="p-2 cursor-pointer rounded hover:bg-gray-100"
          @click="onEditDepartment(activeTab)"
        >
          <i-edit />
        </div>
      </div>

      <div
        v-if="departmentGroups?.length"
        class="-mt-1 mb-4 flex space-x-2 items-center justify-between"
      >
        <ECNTabs v-model="activeGroup" variant="underline">
          <ECNTabsItem name="all" title="Все сотрудники" />

          <ECNTabsItem
            v-for="(group, i) in departmentGroups"
            :key="i"
            :name="group.id"
            :title="group.title"
          />
        </ECNTabs>
      </div>

      <ECNSearchInput
        v-model="searchString"
        class="mb-5"
        placeholder="Укажите ключевое слово"
      />

      <div ref="tableWrapper" class="grow relative overflow-hidden">
        <EasyDataTable
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items"
          fixed-checkbox
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

          <template #item-surname="{ id, name, surname, patronymic }">
            <NuxtLink
              :to="`/staff/employees/${id}`"
              class="text-xs font-medium text-blue-600 mb-1.5"
            >
              {{ surname }} {{ name ? `${name[0]}.` : ""
              }}{{ patronymic ? `${patronymic[0]}.` : "" }}
            </NuxtLink>

            <div class="text-2xs font-medium text-blue-600">Визитка</div>
          </template>

          <template #item-email="{ email, phones }">
            <div class="font-medium">{{ phones?.[0] }}</div>

            <div class="font-medium">{{ email }}</div>
          </template>

          <template #item-avatar="{ avatar }">
            <img
              v-if="avatar"
              :src="avatar.url"
              class="rounded-full bg-gray-400 w-9 h-9 aspect-square"
            />

            <ECNAvatar v-else />
          </template>

          <template #item-position="{ position }">
            {{ position?.title || "-" }}
          </template>

          <template #item-department="{ department }">
            {{ department?.title || "-" }}
          </template>

          <template #item-group="{ group }">
            {{ group?.title || "-" }}
          </template>

          <template #item-role="{ role }">
            {{ role?.title || "-" }}
          </template>

          <template #item-birthday="{ birthday }">
            {{ birthday ? $dayjs(birthday).format("DD.MM.YYYY") : "-" }}
          </template>

          <template #item-actions="{ id }">
            <div class="p-1 cursor-pointer" @click="onEditEmployee(id)">
              <i-table-edit />
            </div>

            <div class="p-1 cursor-pointer" @click="onDeleteEmployee(id)">
              <i-table-delete />
            </div>
          </template>
        </EasyDataTable>
      </div>

      <CRMDrawerDepartment
        v-if="showDepartmentDrawer"
        :department-id="editDepartmentId"
        @close="
          showDepartmentDrawer = false;
          editDepartmentId = undefined;
        "
        @save="onDepartmentSave"
        @delete="onDepartmentDelete"
      />

      <CRMDrawerEmployee
        v-if="showEmployeeDrawer"
        :employee-id="editEmployeeId"
        @close="
          showEmployeeDrawer = false;
          editEmployeeId = undefined;
        "
        @save="onEmployeeSave"
        @delete="onEmployeeDelete"
      />

      <CRMDrawerEmployeeFilters
        v-if="showFiltersDrawer"
        :position="filters.position"
        :role="filters.role"
        @close="showFiltersDrawer = false"
        @apply="onApplyFilter"
      />
    </div>

    <div
      v-if="itemsSelected?.length"
      class="shrink-0 w-full px-5 py-2 h-12 bg-gray-300 flex items-center justify-between text-xs leading-snug font-medium space-x-4"
    >
      <div class="">Выбрано {{ itemsSelected.length }} сотрудник(ов)</div>

      <div class="grow flex items-center justify-center space-x-4">
        <div
          class="text-center cursor-pointer text-red-500"
          @click="onMassDelete"
        >
          Удалить
        </div>

        <div
          class="text-center cursor-pointer text-blue-600"
          @click="onMassActivate"
        >
          Активировать
        </div>

        <div
          class="text-center cursor-pointer text-blue-600"
          @click="onMassDeactivate"
        >
          Деактивировать
        </div>

        <div
          class="text-center cursor-pointer text-blue-600"
          @click="onMassPublish"
        >
          Опубликовать
        </div>

        <div
          class="text-center cursor-pointer text-blue-600"
          @click="onMassUnpublish"
        >
          Снять с публикации
        </div>

        <div class="text-center cursor-pointer text-blue-600">
          Назначить отдел
        </div>

        <div class="text-center cursor-pointer text-blue-600">
          Назначить роль
        </div>
      </div>

      <div class="cursor-pointer text-blue-600" @click="itemsSelected = []">
        Отмена
      </div>
    </div>
  </div>
</template>
