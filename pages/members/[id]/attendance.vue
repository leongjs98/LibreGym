<template>
  <div class="py-16 max-w-4xl px-5 mx-auto justify-center items-center h-full flex flex-col gap-16">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <MemberLinks />
    <div class="w-full p-0 space-y-4">
      <!-- <h2 class="text-xl">Payment History</h2> -->
      <div class="flex justify-between items-center">
        <!-- <NuxtLink :to="year - 1 >= new Date(member.joinedDate).getFullYear() ? `/members/${id}/payment/${year - 1}` : ''" -->
        <!--   class="border px-2 py-1.5 border-black" -->
        <!--   :class="year - 1 >= new Date(member.joinedDate).getFullYear() ? '' : 'text-gray-400 border-gray-700'">Prev -->
        <!-- </NuxtLink> -->
        <button @click="year - 1 >= new Date(member.joinedDate).getFullYear() ? year-- : year"
          class="border px-2 py-1.5 border-black">Prev</button>
        <p class="text-lg">{{ year }}</p>
        <button @click="year++" class="border px-2 py-1.5 border-black">Next</button>
        <!-- <NuxtLink :to="`/members/${id}/payment/${year + 1}`" class="border px-2 py-1.5 border-black">Next</NuxtLink> -->
      </div>
      <p class="text-black">{{ member.fullName }} joined on
        <span class="text-lg font-bold">
          {{ formatDate(member.joinedDate) }}
        </span>
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <!-- make sure it renders in correct order -->
        <AttendanceCalendar @toast="(e) => runTriggerToast(e)" v-for="m in 12" :key="`${m}-${year}`" :month="m - 1"
          :year="year" :member-joined-date="new Date(member.joinedDate)" />
      </div>
    </div>
    <div class="bg-white divide-y-2 w-full rounded-lg shadow-xl" id="analytics">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Attendance: {{ getMember?.fullName }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ getMember?.id }}
        </p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Total sessions:</div>
        <p class="text-xl font-bold text-right">{{ getAttendance?.totalSessionAttended }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Avg sessions per week</div>
        <p class="text-xl font-bold text-right">{{ getAttendance?.avgAttendancePerWeek }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">First attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(getAttendance?.firstSessDate) }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Last attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(getAttendance?.lastSessDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const id = useRoute().params.id

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const { data: getMember, error: getMemberErr } = await useFetch(`/api/members/${id}`)

if (getMemberErr.value) {
  triggerToast({
    type: 'error',
    title: "Can't get the member's info",
    msg: getMemberErr.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

const { data: getAttendance, error: getAttendanceErr } = await useFetch(`/api/members/attendance/${id}`)

if (!getMemberErr.value) {
  if (getAttendanceErr.value) {
    triggerToast({
      type: 'error',
      title: 'Something went wrong with the db',
      msg: getAttendanceErr.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }
}


const year = ref(new Date().getFullYear())

const { data: member } = await useFetch(`/api/members/${id}`)

function runTriggerToast(e: { type: string, title: string, msg: string }) {
  triggerToast({
    type: e.type,
    title: e.title,
    msg: e.msg,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}
</script>
