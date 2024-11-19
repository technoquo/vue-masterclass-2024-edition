/* eslint-disable @typescript-eslint/no-unused-vars */
import { projectQuery, projectsQuery, updateProjectQuery } from '@/uitls/supaQueries';
import { useMemoize } from '@vueuse/core';
import type { Project, Projects } from '@/uitls/supaQueries';

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null);
  const project = ref<Project | null>(null);

  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug));

  interface ValidateCacheParams {
    ref: typeof projects | typeof project;
    query: typeof projectsQuery | typeof projectQuery;
    key: string;
    loaderFn: typeof loadProjects | typeof loadProject;
  }
  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query;

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          console.log('Cached and fresh data matched!');
          return;
        } else {
          loaderFn.delete(key);
          if (!error && data) ref.value = data;
        }
      });
    }
  };
  const getProjects = async () => {
    projects.value = null;

    const { data, error, status } = await loadProjects('projects');

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) projects.value = data;

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    });

    // console.log('projects: ', projects.value);
  };

  const getProject = async (slug: string) => {
    project.value = null;

    const { data, error, status } = await loadProject(slug);

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) project.value = data;

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    });
  };

  const updateProject = async () => {
    if (!project.value) return;

    const { tasks, id, ...projectProperites } = project.value;

    await updateProjectQuery(projectProperites, project.value.id);
  };

  return {
    projects,
    getProjects,
    getProject,
    project,
    updateProject,
  };
});
