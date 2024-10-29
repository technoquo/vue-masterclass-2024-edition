
<script setup lang="ts">
import { profileQuery } from '@/uitls/supaQueries';
import type { Tables } from 'database/types';


//const { profile } = storeToRefs(useAuthStore());
const { username } = useRoute('/users/[username]').params
console.log(username);
// username from the database
const profile = ref<Tables<'profiles'> | null>(null)
const getTasks = async () => {
    const { data, error, status } = await profileQuery({
        column: 'username',
        value:  username as string
    })
    if (error) useErrorStore().setError({ error, customCode: status })


    profile.value = data
}

await getTasks()
</script>
<template>
    <div
    class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center"
  >
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || 'https://github.com/radix-vue.png'" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p class="mt-2 text-gray-500">{{ profile?.username }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>

