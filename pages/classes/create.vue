<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          New class
        </h2>
      </div>
        <form @submit.prevent="submitForm">
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                  Class name*
              </p>
              <input v-model="className" type="text" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Class name"/>
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
            <inputDate name="classStartDate"/>
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
                :input-hours="4"
                :input-minutes="20"
                input-am-pm="am"
              />
            </div>
            <div class="flex items-center gap-6">
              <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">To</h4>
              <inputTime 
                name="endTime"
                :input-hours="6"
                :input-minutes="9"
                input-am-pm="pm"
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

  const dateStore = useDateStore()
  const timeStore = useTimeStore()

  enum ClassFrequency {
    Weekly,
    OneTime,
    Custom
  }

  const className = ref("")
  const frequency: Ref<ClassFrequency> = ref(ClassFrequency.Custom)
  const intervalDays = ref(1)
  const description = ref("")

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
    const dayOfWeek = new Date(startDate).getDay()

    const { data, error } = await useFetch('/api/classes', {
      method: "post",
      body: {
        name: className,
        description,
        startDate,
        dayOfWeek, 
        startTime: timeStore.times["startTime"],
        endTime: timeStore.times["endTime"],
        intervalDays,
      }
    })

    console.log(data, error)
  }
</script>
