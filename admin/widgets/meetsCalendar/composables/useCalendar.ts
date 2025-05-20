import {
  useMeetsQuery,
  type MeetFilter,
  type Meet,
} from "~/shared/api/generated";

export function useCalendar(
  filter: MeetFilter | undefined,
  search: Ref<string | undefined>,
) {
  const items = computed(() => {
    return result.value?.meets.nodes || [];
  });

  const selectedItems = ref<Meet[]>([]);

  const isMeetDrawerVisible = ref(false);
  const editMeetId = ref<string>();

  const variables = computed<{ filter?: MeetFilter; search?: string }>(() => ({
    filter,
    search: toValue(search),
  }));

  const { result, loading, refetch } = useMeetsQuery(variables, {
    debounce: 300,
  });

  async function onEditItem(id: string) {
    editMeetId.value = id;
    isMeetDrawerVisible.value = true;
  }

  return {
    loading,
    items,
    selectedItems,
    isMeetDrawerVisible,
    editMeetId,
    refetch,
    onEditItem,
  };
}
