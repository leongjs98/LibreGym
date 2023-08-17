<template>
  <div class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <ClassLinks/>
    <div class="bg-white w-full rounded-lg shadow-xl">
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
        <inputText v-model="name" name="className" label="Class name*" />
        <inputText v-model="instructor" name="instructor" label="Instructor (optional)" />
        <inputText v-model="description" name="description" label="Description (optional)" />
        <div class="flex justify-end p-4">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
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

interface APIBody {
  name: string;
  instructor: string;
  description: string;
}

async function submitForm() {
  const emptyField = isStrEmptyOrWhitespace(name.value)

  if (emptyField) {
    triggerToast({
      type: 'error',
      title: 'Empty required field(s)',
      msg: 'Please fill in the required fields (marked with *)',
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  } else {
    const { data, error } = await useFetch<APIBody>('/api/classes', {
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
}
</script>
