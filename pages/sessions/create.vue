<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="max-w-4xl w-full space-x-4 flex justify-end">
      <NuxtLink to="/classes/" class="flex items-center w-fit px-4 py-2 mb-6 border-2 border-gray-500 rounded">
        View classes
      </NuxtLink>
      <NuxtLink to="/classes/create" class="flex items-center w-fit px-4 py-2 mb-6 border-2 border-gray-500 rounded">
        <IconAddRounded />
        New class
      </NuxtLink>
    </div>
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h1 class="text-2xl ">
          New Session
        </h1>
        <p class="text-sm text-gray-500">
          Go to <NuxtLink to="/classes/create" class="font-bold hover:text-black">new class</NuxtLink> to add more class
          name
        </p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Class name*
          </p>
          <div class="space-y-2">
            <select v-model="className"
              class="flex-1 p-2 appearance-none border border-gray-300 w-full h-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option selected disabled value="">Select class</option>
              <option v-for="c in classes" :key="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Class mode*
          </p>
          <div class="flex gap-5 items-start">
            <ul
              class="flex items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input v-model="classMode" :value="ClassMode.Weekly" id="weekly-class" type="radio" name="list-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    required>
                  <label for="weekly-class"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Weekly</label>
                </div>
              </li>
              <!-- <li class="w-28 border-b border-gray-200 dark:border-gray-600"> -->
              <!--   <div class="flex items-center pl-3"> -->
              <!--     <input :value="ClassMode.OneTime" disabled id="one-time-class" type="radio" v-model="classMode" -->
              <!--       name="list-radio" -->
              <!--       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" -->
              <!--       required> -->
              <!--     <label for="one-time-class" -->
              <!--       class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One-time</label> -->
              <!--   </div> -->
              <!-- </li> -->
            </ul>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Day of Week*
          </p>
          <div class="space-y-2">
            <select v-model="dayOfWeek"
              class="flex-1 p-2 appearance-none border border-gray-300 w-full h-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option selected disabled value="-1">Select day of week</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <div class="flex justify-between items items-center">
            <h2 class="text-gray-600">
              Time*
            </h2>
            <p v-show="!validTime" class="text-sm text-red-700 sm:mr-4">Time entered is invalid</p>
          </div>
          <div class="flex flex-col items-start sm:flex-row sm:items-center gap-6">
            <div class="flex items-center gap-6">
              <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">From</h4>
              <inputTime @time-changed="(e) => runUpdateTime(e)" name="startTime" :default-time="startTime" />
            </div>
            <div class="flex items-center gap-6">
              <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">to</h4>
              <inputTime @time-changed="(e) => runUpdateTime(e)" name="endTime" :default-time="endTime" />
            </div>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Description
          </p>
          <textarea v-model="description" name="description" id="" cols="30" rows="3"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
        </div>
        <div class="flex justify-end p-4">
          <button type="submit"
            class="text-white bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            :disabled="!validTime">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

enum ClassMode {
  Weekly,
  OneTime,
}

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const className = ref("")
const classMode: Ref<ClassMode> = ref(ClassMode.Weekly)
let oneTime = false
const dayOfWeek = ref(-1)
const validTime = ref(true)
const startTime = ref(new Date('2023-07-05T08:30:00.000Z'))
const endTime = ref(new Date('2023-07-05T10:00:00.000Z'))
const description = ref("")

const { data: classes } = await useFetch('/api/classes')

async function submitForm() {
  const validDOW = dayOfWeek.value <= 6 && dayOfWeek.value >= 0
  const validName = className.value.length !== 0

  if (validDOW && validName) {

    if (classMode.value == ClassMode.Weekly) {
      oneTime = false
    } else if (classMode.value == ClassMode.OneTime) {
      oneTime = true
    }

    if (typeof (dayOfWeek.value) == "string") {
      dayOfWeek.value = parseInt(dayOfWeek.value)
    }

    const { data, error } = await useFetch('/api/sessions', {
      method: "post",
      body: {
        className: className.value,
        oneTime,
        dayOfWeek: dayOfWeek.value,
        startTime: startTime.value,
        endTime: endTime.value,
        description: description.value,
      }
    })

    if (data.value) {
      triggerToast({
        type: 'success',
        title: 'Created class and session',
        msg: `A session of ${className.value} has been created.`,
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

function runUpdateTime(event: { name: string, time: Date }) {
  updateTime({ event, startTime, endTime, validTime })
}

</script>
