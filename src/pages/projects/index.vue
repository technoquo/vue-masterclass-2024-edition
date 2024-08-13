<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { projectsQuery, type Projects } from '@/uitls/supaQueries';
import { columns } from '@/uitls/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Projects';

const projects = ref<Projects | null>(null);
const getProjects = async () => {
  const { data, error } = await projectsQuery;

  if (error) console.log(error);

  projects.value = data;

  // console.log('projects: ', projects.value);
};

await getProjects();
</script>
<template>
  <DataTable v-if="projects" :columns="columns" :data="projects">
    <template #cell-name="{ cell }">
      <RouterLink :to="`/projects/${cell.row.original.slug}`">
        {{ cell.getValue() }}
      </RouterLink>
    </template>
  </DataTable>
</template>
