<template>
  <div
    class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <MemberLinks />
    <div class="w-full p-0 space-y-4">
      <!-- <h2 class="text-xl">Payment History</h2> -->
      <div class="flex justify-between items-center">
        <NuxtLink :to="year - 1 >= new Date(member.joinedDate).getFullYear() ? `/members/${id}/payment/${year - 1}` : ''"
          class="border px-2 py-1.5 border-black"
          :class="year - 1 >= new Date(member.joinedDate).getFullYear() ? '' : 'text-gray-400 border-gray-700'">Prev
        </NuxtLink>
        <p class="text-lg">{{ year }}</p>
        <NuxtLink :to="`/members/${id}/payment/${year + 1}`" class="border px-2 py-1.5 border-black">Next</NuxtLink>
      </div>
      <p class="text-gray-500">double click/tap the checkboxes to switch state</p>
      <p class="text-black">{{ member.fullName }} joined on
        <span class="text-lg font-bold">
          {{ formatDate(member.joinedDate) }}
        </span>
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <AttendanceCalendar @toast="(e) => runTriggerToast(e)" v-for="m in 12"
          :member-joined-date="new Date(member.joinedDate)" :year="year" :month="m - 1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

let year = parseInt(useRoute().params.year)
const id = useRoute().params.id

const { data: member } = await useFetch(`/api/members/${id}`)

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

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
