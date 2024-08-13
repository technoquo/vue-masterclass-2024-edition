import { supabase } from '@/lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';

export const tasksWithProjects = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `);

export type TasksWithProjectsType = QueryData<typeof tasksWithProjects>;

export const projectsQuery = supabase.from('projects').select();
export type Projects = QueryData<typeof projectsQuery>;
