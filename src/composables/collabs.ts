import { groupedProfilesQuery } from '@/uitls/supaQueries';
import type { GroupedCollabs } from '@/types/GroupedCollabs';
import type { Projects, TasksWithProjectsType } from '@/uitls/supaQueries';

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({});
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) return [];

    return data;
  };

  const getGroupedCollabs = async (items: Projects | TasksWithProjectsType) => {
    const filteredItems = items.filter((item) => item.collaborators.length);

    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators));

    const results = await Promise.all(promises);

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index];
    });
  };

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  };
};
