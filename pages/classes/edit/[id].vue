<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="success" :title="successAlert.title" :message="successAlert.message" :color="successAlert.color" />
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Class Information
        </h2>
        <!-- <p class="text-sm text-gray-500"> -->
        <!--   Details of {{ getClass?.id }} -->
        <!-- </p> -->
      </div>
      <form @submit.prevent="submitForm">
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Class name*
            </p>
            <div class="space-y-2">
              <select
                v-model="oldClassName"
                class="flex-1 p-2 appearance-none border border-gray-300 w-full h-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                :disabled="createNewClass"
                :class="!createNewClass ? 'outline-none ring-2 ring-gray-600 border-transparent' : ''"
              >
                <option selected disabled value="">Select existing class</option>
                <option
                  v-for="c in getClasses"
                  :key="c.id"
                  :value="c.name"
                >
                  {{ c.name }}
                </option>
              </select>
              <div class="flex gap-2">
                <div class="inline-flex items-center space-x-1.5">
                  <input
                    v-model="createNewClass"
                    id="new-name"
                    type="checkbox"
                    class="w-4 h-4 cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75" />
                  <label for="new-name" class="cursor-pointer truncate font-medium text-gray-500">New</label>
                </div>
                <input
                  v-model="newClassName"
                  type="text"
                  class="w-full h-10 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Class name"
                  :disabled="!createNewClass"
                  :class="createNewClass ? 'outline-none ring-2 ring-gray-600 border-transparent' : ''"
                />
              </div>
            </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Instructor
            </p>
            <input
              v-model="instructor"
              type="text"
              class="w-full h-10 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Instructor name"
            />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
              Frequency*
            </p>
            <div class="flex gap-5 items-start">
              <ul class="items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input v-model="frequency" :value="ClassFrequency.Weekly" id="weekly-class" type="radio" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" required>
                    <label for="weekly-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Weekly</label>
                  </div>
                </li>
                <li class="w-28 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input :value="ClassFrequency.OneTime" alue="ClassFrequency.OneTime" id="one-time-class" type="radio" v-model="frequency" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" required>
                    <label for="one-time-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One-time</label>
                  </div>
                </li>
                <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input :value="ClassFrequency.Custom" alue="ClassFrequency.Custom" id="custom-freq-class" type="radio" v-model="frequency" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" required>
                    <label for="custom-freq-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
                  </div>
                </li>
              </ul>
              <div class="flex gap-5 items-center">
                <span>Every</span>
                <div>
                  <select :disabled="frequency!==ClassFrequency.Custom" name="intervalDays" v-model="intervalDays" class="w-14 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
                    <option v-for="d in 32" :value="d-1" :key="d-1">{{ d-1 }}</option>
                  </select>
                </div>
                <span>day(s)</span>
              </div>
            </div>
        </div>
        <!-- <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"> -->
        <!--   <div></div> -->
        <!--   <div class="flex gap-5 items-center"> -->
        <!--     <span>Every</span> -->
        <!--     <div> -->
        <!--       <select :disabled="frequency!==ClassFrequency.Custom" name="intervalDays" v-model="intervalDays" class="w-14 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"> -->
        <!--         <option v-for="d in 32" :value="d-1" :key="d-1">{{ d-1 }}</option> -->
        <!--       </select> -->
        <!--     </div> -->
        <!--     <span>day(s)</span> -->
        <!--   </div> -->
        <!-- </div> -->
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Start date (YYYY/MM/DD)*
          </p>
          <inputDate name="classStartDate" :default-year="startDateYear" :default-month="startDateMonth" :default-day="startDateDay" />
        </div>
      <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
        <p class="text-gray-600">
          Time*
        </p>
        <div class="flex flex-col items-start sm:flex-row sm:items-center gap-6">
          <div class="flex items-center gap-6">
            <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">From</h4>
            <inputTime 
              name="startTime"
              :default-hours="startTimeHours"
              :default-minutes="startTimeMinutes"
              :default-am-pm="startTimeAmPm"
            />
          </div>
          <div class="flex items-center gap-6">
            <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">To</h4>
            <inputTime 
              name="endTime"
              :default-hours="endTimeHours"
              :default-minutes="endTimeMinutes"
              :default-am-pm="endTimeAmPm"
            />
          </div>
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Description
          </p>
          <textarea v-model="description" name="description" id="" cols="30" rows="3" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
      </div>
      <div class="flex justify-end p-4">
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDateStore } from '~/store/dateStore';
  import { useTimeStore } from '~/store/timeStore';
  import { useAlertStore } from '@/store/alertStore';

  const dateStore = useDateStore()
  const timeStore = useTimeStore()
  const alertStore = useAlertStore()

  const successAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'green'
  })

  const errorAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'red'
  })

  enum ClassFrequency {
    Weekly,
    OneTime,
    Custom
  }

  const sessionId = useRoute().params.id

  const { data: getClasses, error: getClassesError } = await useFetch('/api/classes/')
  const { data: getSession, error: getSessionError } = await useFetch(`/api/sessions/${sessionId}`)
  console.log(getSession)

  if (getSessionError.value) {
    errorAlert.value.title = getSessionError.value?.name
    errorAlert.value.message = getSessionError.value?.message
    alertStore.setAlert("error", true)
  }

  const createNewClass = ref(false)
  const oldClassName = ref(getSession.value?.name)
  const newClassName = ref("")
  const instructor = ref(getSession.value?.instructor)
  const frequency: Ref<ClassFrequency> = ref(ClassFrequency.Custom)
  const intervalDays = ref(getSession.value?.intervalDays)
  const description = ref(getSession.value?.description)

  const fillStartDate = new Date(getSession.value?.startDate)
  const startDateYear = fillStartDate.getFullYear()
  const startDateMonth = fillStartDate.getMonth() + 1
  const startDateDay = fillStartDate.getDate()

  const fillStartTime = new Date(getSession.value?.startTime)
  const startTimeMinutes = fillStartTime.getMinutes()
  let startTimeHours = fillStartTime.getHours()
  let startTimeAmPm = "am"
  if (startTimeHours > 12) {
    startTimeHours -= 12
    startTimeAmPm = "pm"
  } else if (startTimeHours == 12) {
    startTimeAmPm = "pm"
  } else if (startTimeHours == 0) {
    startTimeHours = 12
  }

  const fillEndTime = new Date(getSession.value?.endTime)
  const endTimeMinutes = fillEndTime.getMinutes()
  let endTimeHours = fillEndTime.getHours()
  let endTimeAmPm = "am"
  if (endTimeHours > 12) {
    endTimeHours -= 12
    endTimeAmPm = "pm"
  } else if (endTimeHours == 12) {
    endTimeAmPm = "pm"
  } else if (endTimeHours == 0) {
    endTimeHours = 12
  }

  watch(frequency, () => {
    const isWeeklyClass = frequency.value === ClassFrequency.Weekly
    const isOneTimeClass = frequency.value === ClassFrequency.OneTime
    const isCustomClass = frequency.value === ClassFrequency.Custom

    if (isWeeklyClass) {
      intervalDays.value = 7
    } else if (isOneTimeClass) {
      intervalDays.value = 0
    } else if (isCustomClass) {
      intervalDays.value = 1
    }
  })
 
  async function submitForm() {
    const startDate = dateStore.dates["classStartDate"]

    let name = oldClassName.value

    if (createNewClass.value) {
      name = newClassName.value
    }

    const { data: updateClass, error: updateError } = await useFetch(`/api/classes/${sessionId}`, {
      method: "put",
      body: {
        name,
        description,
        instructor,
        startDate,
        startTime: timeStore.times["startTime"],
        endTime: timeStore.times["endTime"],
        intervalDays,
      }
    })

    if (updateClass.value) {
      successAlert.value.title = 'Updated class'
      successAlert.value.message = `${updateClass.value?.name} has been updated.`
      alertStore.setAlert("success", true)
    } else if (updateError.value) {
      errorAlert.value.title = updateError.value?.name
      errorAlert.value.message = updateError.value?.message
      alertStore.setAlert("error", true)
    }
  }
</script>
