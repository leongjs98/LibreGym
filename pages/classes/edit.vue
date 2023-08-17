<template>
  <div class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <ClassLinks/>
    <div class="bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Edit class
        </h2>
        <p class="text-sm text-gray-500">
          Go to <NuxtLink to="/classes/create" class="font-bold hover:text-black">new class</NuxtLink> to create new class.
        </p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Class to edit
          </p>
          <div class="space-y-2">
            <select v-model="selectedClass"
              class="flex-1 p-2 appearance-none border border-gray-300 w-full h-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option selected disabled value="">Select class</option>
              <option v-for="c in getClasses" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
        </div>
        <inputText v-model="name" name="className" label="Class name*" />
        <inputText v-model="instructor" name="instructor" label="Instructor (optional)" />
        <inputText v-model="description" name="description" label="Description (optional)" />

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

const selectedClass = ref("")
const name = ref("")
const instructor = ref("")
const description = ref("")

interface APIBody {
  name: string;
  instructor: string;
  description: string;
}

const { data: getClasses, error: getClassesError, refresh: refreshGetClasses } = await useFetch('/api/classes')

if (getClassesError.value) {
  triggerToast({
    type: 'error',
    title: getClassesError.value?.name,
    msg: getClassesError.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

watch(selectedClass, async () => {
  const { data: classInfo } = await useFetch(`/api/classes/${selectedClass.value}`)

  if (classInfo.value) {
    name.value = classInfo.value.name

    if (classInfo.value.instructor)
      instructor.value = classInfo.value.instructor

    if (classInfo.value.description)
      description.value = classInfo.value.description
  }
})

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
    const { data, error } = await useFetch<APIBody>(`/api/classes/${selectedClass.value}`, {
      method: "put",
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
        msg: `${data.value?.name} has been updated.`,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
      refreshGetClasses()
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
