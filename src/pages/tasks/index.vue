<script setup lang="ts">
import { tasksWithProjects, type TasksWithProjectsType } from '@/uitls/supaQueries';
import { columns } from '@/uitls/tableColumns/tasksColumns';

usePageStore().pageData.title = 'My Tasks';

const tasks = ref<TasksWithProjectsType | null>(null);
const getTasks = async () => {
  const { data, error } = await tasksWithProjects;

  if (error) console.log(error);

  tasks.value = data;
};

await getTasks();
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
