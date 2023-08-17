<template>
  <div class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <ClassLinks />
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Session Info
        </h2>
      </div>
      <form @submit.prevent="submitForm">
        <InputDropdown v-model="className" label="Class name*" name="className"
          :options="getClasses.map(({ name }) => ({ name, value: name }))" />
        <InputRadio v-model="classMode" label="Class mode*" name="classMode" :options="['weekly']" />
        <InputDropdown v-model="dayOfWeek" label="Day of Week*" name="dayOfWeek" :options="[
          { name: 'Sunday', value: 0 }, { name: 'Monday', value: 1 }, { name: 'Tuesday', value: 2 }, { name: 'Wednesday', value: 3 }, { name: 'Thursday', value: 4 }, { name: 'Friday', value: 5 }, { name: 'Saturday', value: 6 }
        ]" />
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
              <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">To</h4>
              <inputTime @time-changed="(e) => runUpdateTime(e)" name="endTime" :default-time="endTime" />
            </div>
          </div>
        </div>
        <InputTextarea v-model="description" label="Description" name="description" />

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

// enum ClassMode {
//   Weekly,
//   OneTime,
// }

const sessionId = useRoute().params.id
const { data: getSessions } = await useFetch(`/api/sessions/${sessionId}`)
const { data: getClasses } = await useFetch(`/api/classes`)

const className = ref(getSessions.value?.name)
const oneTime = ref(getSessions.value?.oneTime)
const classMode = ref(getSessions.value?.oneTime ? 'onetime' : 'weekly')
const dayOfWeek = ref(getSessions.value?.dayOfWeek)
const validTime = ref(true)
const startTime = ref(new Date(getSessions.value?.startTime))
const endTime = ref(new Date(getSessions.value?.endTime))
const description = ref(getSessions.value?.description)

async function submitForm() {
  const emptyField = isStrEmptyOrWhitespace(className.value) || !classMode.value || !dayOfWeek.value || dayOfWeek.value <= 0 || !startTime.value || !endTime.value

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
    if ((dayOfWeek.value == 0 || dayOfWeek.value) && className.value) {
      const validDOW = dayOfWeek.value <= 6 && dayOfWeek.value >= 0
      const validName = className.value.length !== 0

      if (validDOW && validName) {

        if (classMode.value.toLowerCase() == 'weekly') {
          oneTime.value = false
        } else if (classMode.value.toLowerCase() == 'onetime') {
          oneTime.value = true
        }

        if (typeof (dayOfWeek.value) == "string") {
          dayOfWeek.value = parseInt(dayOfWeek.value)
        }

        const { data, error } = await useFetch(`/api/sessions/${sessionId}`, {
          method: "put",
          body: {
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
            title: 'Updated session',
            msg: `This session of ${className.value} has been updated.`,
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
  }
}

function runUpdateTime(event: { name: string, time: Date }) {
  updateTime({ event, startTime, endTime, validTime })
}

</script>

