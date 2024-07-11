/* eslint-env node */
import { fakerEN_US as faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.VITE_SUPERBASE_URL, process.env.SERVICE_ROLE_KEY);

const seedProjects = async () => {
  try {
    const name = faker.lorem.words(3);

    // Insert data into 'projects' table

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name: name,
          slug: name.toLocaleLowerCase().replace(/ /g, '-'),
          status: faker.helpers.arrayElement(['in-progress', 'completed']),
          collaborators: faker.helpers.arrayElements([1, 2, 3]),
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
    }
  } catch (error) {
    console.error('Error in seedProjects:', error.message);
  }
};

// Call seedProjects function
await seedProjects();
