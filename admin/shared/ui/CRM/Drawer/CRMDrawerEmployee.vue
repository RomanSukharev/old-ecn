<script lang="ts" setup>
import {
  ImagePreset,
  useSaveEmployeeMutation,
  useDeleteEmployeeMutation,
  useDepartmentsQuery,
  useEmployeeQuery,
  usePositionsQuery,
  useRolesQuery,
} from "@/shared/api/generated";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    employeeId?: string;
  }>(),
  {
    employeeId: undefined,
  },
);

const drawerTitle = computed(() =>
  props.employeeId ? "Редактирование сотрудника" : "Создание сотрудника",
);

const saveButtonTitle = computed(() =>
  props.employeeId ? "Сохранить" : "Создать",
);

const activeTab = ref("general");
const uploadModal = ref<boolean>(false);
const uploadInput = ref<HTMLInputElement | null>(null);
const uploadPublicImageModal = ref<boolean>(false);
const uploadPublicImageInput = ref<HTMLInputElement | null>(null);
const pic = ref<string>("");
const avatarFile = ref<File | null>(null);
const publicImagePic = ref<string>("");
const publicImageFile = ref<File | null>(null);

const employee = reactive<{
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  birthday?: string;
  email: string;
  phone: string;
  password?: string;
  position?: { id: string; title: string };
  department?: {
    id: string;
    title: string;
    groups: { id: string; title: string }[];
  };
  group?: { id: string; title: string };
  role?: { id: string; title: string };
  internalInfo?: string;
  shortDescription?: string;
  description?: string;
  avatar?: { id: string; url: string };
  publicImage?: { id: string; url: string };
  isPublished?: boolean;
}>({
  id: "",
  name: "",
  surname: "",
  patronymic: undefined,
  birthday: undefined,
  email: "",
  phone: "",
  password: undefined,
  position: undefined,
  department: undefined,
  group: undefined,
  role: undefined,
  internalInfo: undefined,
  shortDescription: undefined,
  description: undefined,
  avatar: undefined,
  publicImage: undefined,
  isPublished: false,
});

const selectedDepartmentGroups = computed(
  () => employee.department?.groups || [],
);

const confirmPassword = ref<string>("");

const { result: positionsRaw } = usePositionsQuery();
const { result: departmentsRaw } = useDepartmentsQuery();
const { result: rolesRaw } = useRolesQuery();

const positions = computed(() => positionsRaw.value?.positions.nodes ?? []);
const departments = computed(
  () => departmentsRaw.value?.departments.nodes ?? [],
);
const roles = computed(() => rolesRaw.value?.roles.nodes ?? []);

if (props.employeeId) {
  const { onResult } = useEmployeeQuery({
    id: props.employeeId,
  });

  onResult((result) => {
    const employeeRaw = result.data.employee;

    employee.name = employeeRaw.name;
    employee.surname = employeeRaw.surname;
    employee.patronymic = employeeRaw.patronymic ?? undefined;
    employee.birthday = employeeRaw.birthday?.substring(0, 10);
    employee.email = employeeRaw.email;
    employee.phone = employeeRaw.phone;
    employee.position = employeeRaw.position;
    employee.department = employeeRaw.department;
    employee.group = employeeRaw.group;
    employee.role = employeeRaw.role;
    employee.internalInfo = employeeRaw.internalInfo ?? undefined;
    employee.shortDescription = employeeRaw.shortDescription ?? undefined;
    employee.description = employeeRaw.description ?? undefined;
    employee.avatar = employeeRaw.avatar ?? undefined;
    employee.publicImage = employeeRaw.publicImage ?? undefined;
    employee.isPublished = employeeRaw.isPublished;
  });
}

async function onSave(): Promise<void> {
  if (props.employeeId) {
    try {
      const { mutate } = useSaveEmployeeMutation();
      await mutate({
        input: {
          id: props.employeeId,
          name: employee.name,
          surname: employee.surname,
          patronymic: employee.patronymic || undefined,
          birthday: employee.birthday
            ? new Date(employee.birthday).toISOString()
            : "",
          email: employee.email,
          phone: employee.phone,
          password: employee.password || undefined,
          positionID: employee.position?.id || "",
          departmentID: employee.department?.id,
          groupID: employee.group?.id,
          roleID: employee.role?.id || "",
          internalInfo: employee.internalInfo || undefined,
          shortDescription: employee.shortDescription || undefined,
          description: employee.description || undefined,
          avatar: {
            file: avatarFile.value,
            preset: ImagePreset.STAFF_EMPLOYEE_AVATAR,
          },
          publicImage: {
            file: publicImageFile.value,
            preset: ImagePreset.STAFF_EMPLOYEE_PUBLIC_IMAGE,
          },
          isPublished: employee.isPublished,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить сотрудника.");
    }
  } else {
    try {
      const { mutate } = useSaveEmployeeMutation();
      await mutate({
        input: {
          name: employee.name,
          surname: employee.surname,
          patronymic: employee.patronymic || undefined,
          birthday: employee.birthday
            ? new Date(employee.birthday).toISOString()
            : "",
          email: employee.email,
          phone: employee.phone,
          password: employee.password || "",
          positionID: employee.position?.id || "",
          departmentID: employee.department?.id,
          groupID: employee.group?.id,
          roleID: employee.role?.id || "",
          internalInfo: employee.internalInfo || undefined,
          shortDescription: employee.shortDescription || undefined,
          description: employee.description || undefined,
          avatar: {
            file: avatarFile.value,
            preset: ImagePreset.STAFF_EMPLOYEE_AVATAR,
          },
          publicImage: {
            file: publicImageFile.value,
            preset: ImagePreset.STAFF_EMPLOYEE_PUBLIC_IMAGE,
          },
          isPublished: employee.isPublished,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать сотрудника.");
    }
  }
}

async function onDelete(): Promise<void> {
  if (props.employeeId && confirm("Удалить сотрудника?")) {
    try {
      const { mutate } = useDeleteEmployeeMutation();
      await mutate({
        id: props.employeeId,
      });
      emit("delete");
      emit("close");
    } catch (err) {
      alert("Не удалось удалить сотрудника.");
    }
  }
}

function selectFile(e: Event): void {
  // Reset last selection and results
  pic.value = "";
  avatarFile.value = null;

  // Get selected files
  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  // Convert to dataURL and pass to the cropper component
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Update the picture source of the `img` prop
    pic.value = String(reader.result);

    // Show the modal
    uploadModal.value = true;

    // Clear selected files of input element
    if (!uploadInput.value) return;
    uploadInput.value.value = "";
  };
}

async function getResult(): Promise<void> {
  if (!cropper) return;
  const file = await cropper.getFile();

  avatarFile.value = file;

  uploadModal.value = false;
}

function selectPublicImageFile(e: Event): void {
  // Reset last selection and results
  publicImagePic.value = "";
  publicImageFile.value = null;

  // Get selected files
  const { files } = e.target as HTMLInputElement;
  if (!files || !files.length) return;

  // Convert to dataURL and pass to the cropper component
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Update the picture source of the `img` prop
    publicImagePic.value = String(reader.result);

    // Show the modal
    uploadPublicImageModal.value = true;

    // Clear selected files of input element
    if (!uploadPublicImageInput.value) return;
    uploadPublicImageInput.value.value = "";
  };
}

async function getPublicImageResult(): Promise<void> {
  if (!cropper) return;
  const file = await cropper.getFile();

  publicImageFile.value = file;

  uploadPublicImageModal.value = false;
}

watch(employee, () => {
  if (!employee.department?.groups?.length) {
    employee.group = undefined;
  }
});
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <ECNDrawerTabs v-model="activeTab">
      <ECNDrawerTabsItem name="general" title="Основная информация">
        <div class="pb-10">
          <ECNFormInput
            v-model="employee.surname"
            class="mb-4"
            inline
            required
            label="Фамилия"
            placeholder="Укажите фамилию"
          />

          <ECNFormInput
            v-model="employee.name"
            class="mb-4"
            inline
            required
            label="Имя"
            placeholder="Укажите имя"
          />

          <ECNFormInput
            v-model="employee.patronymic"
            class="mb-4"
            inline
            label="Отчество"
            placeholder="Укажите отчество"
          />

          <ECNFormDate
            v-model="employee.birthday"
            class="mb-4"
            inline
            required
            label="Дата рождения"
            placeholder="ДД ММ ГГГГ"
          />

          <ECNDivider />

          <ECNFormInput
            v-model="employee.email"
            class="mb-4"
            inline
            required
            label="E-mail"
            placeholder="Укажите e-mail"
          />

          <ECNFormInput
            v-model="employee.phone"
            class="mb-4"
            inline
            required
            label="Основной телефон"
            placeholder="Укажите основной номер телефона"
          />

          <ECNDivider />

          <ECNFormInput
            v-model="employee.password"
            class="mb-4"
            inline
            type="password"
            required
            label="Пароль"
            placeholder="Укажите пароль"
          />

          <ECNFormInput
            v-model="confirmPassword"
            class="mb-4"
            inline
            type="password"
            required
            label="Повторите пароль"
            placeholder="Повторите пароль"
          />

          <ECNDivider />

          <ECNFormSelect
            v-model="employee.position"
            :items="positions"
            class="mb-4"
            inline
            required
            label="Должность"
            placeholder="Не выбрано"
          />

          <ECNFormSelect
            v-model="employee.department"
            :items="departments"
            class="mb-4"
            inline
            label="Отдел"
            placeholder="Не выбрано"
          />

          <ECNFormSelect
            v-model="employee.group"
            :items="selectedDepartmentGroups"
            class="mb-4"
            inline
            label="Группа"
            placeholder="Не выбрано"
          />

          <ECNFormSelect
            v-model="employee.role"
            :items="roles"
            class="mb-4"
            inline
            required
            label="Роль"
            placeholder="Не выбрано"
          />

          <ECNDivider />

          <ECNFormTextarea
            v-model="employee.internalInfo"
            inline
            label="Общая информация"
            placeholder="Введите текст"
          />

          <ECNDivider />

          <div class="flex items-center space-x-2">
            <img
              v-if="employee?.avatar"
              :src="employee.avatar.url"
              class="rounded-full bg-gray-400 w-9 h-9 aspect-square"
            />

            <ECNAvatar v-else />

            <ECNButton
              outline
              class="border-gray-200 w-fit"
              @click="uploadInput?.click()"
            >
              <i-plus-blue class="-ml-1" />

              <span>{{
                employee?.avatar ? "Заменить фото" : "Добавить фото"
              }}</span>

              <input
                ref="uploadInput"
                class="hidden"
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                @change="selectFile"
              />
            </ECNButton>
          </div>
        </div>
      </ECNDrawerTabsItem>

      <ECNDrawerTabsItem name="public" title="Публичная страница">
        <div class="pb-10">
          <ECNFormTextarea
            v-model="employee.shortDescription"
            class="mb-4"
            inline
            label="Краткое описание"
            placeholder="Введите текст"
          />

          <ECNFormTextarea
            v-model="employee.description"
            class="mb-4"
            inline
            label="Полное описание"
            placeholder="Введите текст"
          />

          <div class="flex items-center space-x-2">
            <img
              v-if="employee?.publicImage"
              :src="employee.publicImage.url"
              class="rounded-full bg-gray-400 w-9 h-9 aspect-square"
            />

            <ECNAvatar v-else />

            <ECNButton
              outline
              class="border-gray-200 w-fit"
              @click="uploadPublicImageInput?.click()"
            >
              <i-plus-blue class="-ml-1" />

              <span>{{
                employee?.publicImage
                  ? "Заменить публичное фото"
                  : "Добавить публичное фото"
              }}</span>

              <input
                ref="uploadPublicImageInput"
                class="hidden"
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                @change="selectPublicImageFile"
              />
            </ECNButton>
          </div>

          <ECNDivider />
          <!--
          <ECNFormCheckboxGroup label="Специализации">
            <ECNFormCheckbox label="Вторичная недвижимость" />
            <ECNFormCheckbox label="Загородная недвижимость" />
          </ECNFormCheckboxGroup>

          <ECNDivider /> -->

          <ECNFormToggle
            v-model="employee.isPublished"
            label="Показывать на сайте"
          />
        </div>
      </ECNDrawerTabsItem>
    </ECNDrawerTabs>

    <template #actions>
      <ECNButton
        v-if="employeeId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDelete"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>

    <div
      v-if="uploadModal"
      class="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-20 flex flex-col items-center justify-center"
    >
      <div class="max-w-96 max-h-screen flex flex-col">
        <div class="h-10 bg-white text-center flex items-center px-3 shrink-0">
          Загрузка изображения
        </div>

        <VuePictureCropper
          class="grow"
          :box-style="{
            width: '100%',
            height: '100%',
            margin: 'auto',
          }"
          :img="pic"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 1 / 1,
          }"
        />

        <div
          class="bg-white text-center flex items-center px-3 py-2 space-x-1 shrink-0"
        >
          <ECNButton @click="getResult">Загрузить</ECNButton>

          <ECNButton @click="uploadModal = false">Отменить</ECNButton>
        </div>
      </div>
    </div>

    <div
      v-if="uploadPublicImageModal"
      class="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-20 flex flex-col items-center justify-center"
    >
      <div class="max-w-96 max-h-screen flex flex-col">
        <div class="h-10 bg-white text-center flex items-center px-3 shrink-0">
          Загрузка изображения
        </div>

        <VuePictureCropper
          class="grow"
          :box-style="{
            width: '100%',
            height: '100%',
            margin: 'auto',
          }"
          :img="publicImagePic"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 9 / 16,
          }"
        />

        <div
          class="bg-white text-center flex items-center px-3 py-2 space-x-1 shrink-0"
        >
          <ECNButton @click="getPublicImageResult">Загрузить</ECNButton>

          <ECNButton @click="uploadPublicImageModal = false"
            >Отменить</ECNButton
          >
        </div>
      </div>
    </div>
  </ECNDrawer>
</template>
