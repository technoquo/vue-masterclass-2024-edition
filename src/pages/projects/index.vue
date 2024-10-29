<script setup lang="ts">

import { columns } from '@/uitls/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Projects';

const projectsLoader = useProjectsStore();
const { projects } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;



await getProjects();
</script>
<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
