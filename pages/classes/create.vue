<template>
  <div class="py-16 px-5 mx-auto justify-center items-center flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="max-w-4xl w-full space-x-4 flex justify-end">
      <NuxtLink to="/classes/" class="flex items-center w-fit px-4 py-2 mb-6 border-2 border-gray-500 rounded">
        View classes
      </NuxtLink>
      <NuxtLink to="/sessions/create" class="flex items-center w-fit px-4 py-2 mb-6 border-2 border-gray-500 rounded">
        <IconAddRounded />
        New session
      </NuxtLink>
    </div>
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          New class
        </h2>
        <p class="text-sm text-gray-500">
          Go to <NuxtLink to="/sessions/create" class="font-bold hover:text-black">new session</NuxtLink> to add new time
          schedules.
        </p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Class name*
          </p>
          <div class="flex gap-2">
            <input v-model="name" type="text"
              class="w-full h-10 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Class name" />
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Instructor (optional)
          </p>
          <input v-model="instructor" type="text"
            class="w-full h-10 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            placeholder="Instructor name" />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Description (optional)
          </p>
          <textarea v-model="description" name="description" cols="30" rows="3"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
        </div>
        <div class="flex justify-end p-4">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const name = ref("")
const instructor = ref("")
const description = ref("")

async function submitForm() {
  const { data, error } = await useFetch('/api/classes', {
    method: "post",
    body: {
      name,
      instructor,
      description,
    }
  })

  if (data.value) {
    triggerToast({
      type: 'success',
      title: 'Created member',
      msg: `${data.value?.name} has been created`,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  } else if (error.value) {
    triggerToast({
      type: 'error',
      title: error.value?.name,
      msg: error.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }
}
</script>
