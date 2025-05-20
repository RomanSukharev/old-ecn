<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useSaveVacancyMutation,
  useDeleteVacancyMutation,
  useVacancyQuery,
  VacancyScheduleEnum,
  PublicationStatusEnum,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    vacancyId?: string;
  }>(),
  {
    vacancyId: undefined,
  },
);

const vacancySchedule = [
  {
    id: VacancyScheduleEnum.FULL_TIME,
    title: "Полный день",
  },
  {
    id: VacancyScheduleEnum.PART_TIME,
    title: "Частичная занятость",
  },
];

const vacancyStatus = [
  {
    id: PublicationStatusEnum.DRAFT,
    title: "Черновик",
  },
  {
    id: PublicationStatusEnum.PUBLISHED,
    title: "Активна",
  },
  {
    id: PublicationStatusEnum.UNPUBLISHED,
    title: "Не активна",
  },
];

const vacancy = reactive<{
  id?: string;
  title: string;
  description: string;
  schedule: VacancyScheduleEnum;
  status: PublicationStatusEnum;
  experience?: string;
  salary?: string;
}>({
  id: undefined,
  title: "",
  description: "",
  schedule: VacancyScheduleEnum.FULL_TIME,
  status: PublicationStatusEnum.DRAFT,
  experience: undefined,
  salary: undefined,
});

const internalSchedule = ref<{ id: VacancyScheduleEnum; title: string }>();
const internalStatus = ref<{ id: PublicationStatusEnum; title: string }>();

watch(internalSchedule, (value) => {
  vacancy.schedule = value?.id ?? VacancyScheduleEnum.FULL_TIME;
});
watch(internalStatus, (value) => {
  vacancy.status = value?.id ?? PublicationStatusEnum.DRAFT;
});

if (props.vacancyId) {
  const { onResult } = useVacancyQuery({
    id: props.vacancyId,
  });

  onResult((result) => {
    vacancy.id = result.data.vacancy.id;
    vacancy.title = result.data.vacancy.title;
    vacancy.description = result.data.vacancy.description;
    vacancy.experience = result.data.vacancy.experience || undefined;
    vacancy.salary = result.data.vacancy.salary || undefined;
    vacancy.schedule = result.data.vacancy.schedule;
    vacancy.status = result.data.vacancy.publicationStatus;

    nextTick(() => {
      if (vacancy.schedule) {
        internalSchedule.value = {
          id: vacancy.schedule,
          title:
            vacancySchedule.find((i) => i.id === vacancy.schedule)?.title ??
            "-",
        };
      }

      if (vacancy.status) {
        internalStatus.value = {
          id: vacancy.status,
          title:
            vacancyStatus.find((i) => i.id === vacancy.status)?.title ?? "-",
        };
      }
    });
  });
}

const drawerTitle = computed(() =>
  props.vacancyId ? "Редактирование вакансии" : "Создание вакансии",
);

const saveButtonTitle = computed(() =>
  props.vacancyId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.vacancyId) {
    try {
      const { mutate } = useSaveVacancyMutation();
      await mutate({
        input: {
          id: props.vacancyId,
          title: vacancy.title,
          description: vacancy.description,
          schedule: vacancy.schedule,
          publicationStatus: vacancy.status,
          experience: vacancy.experience || undefined,
          salary: vacancy.salary || undefined,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить вакансию.");
    }
  } else {
    try {
      const { mutate } = useSaveVacancyMutation();
      await mutate({
        input: {
          title: vacancy.title,
          description: vacancy.description,
          schedule: vacancy.schedule,
          publicationStatus: vacancy.status,
          experience: vacancy.experience || undefined,
          salary: vacancy.salary || undefined,
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать вакансию.");
    }
  }
}

async function onDeleteVacancy(): Promise<void> {
  if (confirm("Удалить вакансию?")) {
    if (props.vacancyId) {
      try {
        const { mutate } = useDeleteVacancyMutation();
        await mutate({
          id: props.vacancyId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить вакансию.");
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
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="vacancy.title"
          class="mb-4"
          inline
          required
          label="Название вакансии"
          placeholder="Укажите название вакансии"
        />

        <ECNFormTextarea
          v-model="vacancy.description"
          class="mb-4"
          inline
          required
          label="Описание вакансии"
          placeholder="Укажите описание вакансии"
        />

        <ECNFormInput
          v-model="vacancy.experience"
          class="mb-4"
          inline
          label="Опыт работы"
          placeholder="Укажите опыт работы"
        />

        <ECNFormInput
          v-model="vacancy.salary"
          class="mb-4"
          inline
          label="Заработная плата"
          placeholder="Укажите заработную плату"
        />

        <ECNFormSelect
          v-model="internalSchedule"
          class="mb-4"
          :items="vacancySchedule"
          inline
          required
          label="Рабочий график"
          placeholder="Выберите значение"
        />

        <ECNFormSelect
          v-model="internalStatus"
          :items="vacancyStatus"
          inline
          required
          label="Статус вакансии"
          placeholder="Выберите значение"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="vacancyId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteVacancy"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>
