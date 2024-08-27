<script setup lang="ts">
import { projectsQuery, type Projects } from '@/uitls/supaQueries';
import { columns } from '@/uitls/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Projects';

const projects = ref<Projects | null>(null);
const getProjects = async () => {
  const { data, error, status } = await projectsQuery;

  if (error) useErrorStore().setError({ error, customCode: status });

  projects.value = data;

  // console.log('projects: ', projects.value);
};

await getProjects();
</script>
<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
