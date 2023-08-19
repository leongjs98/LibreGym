<template>
  <div
    class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <!-- <transition name="toast"> -->
    <!--   <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" /> -->
    <!-- </transition> -->
    <MemberLinks />
    <div class="w-full p-4 sm:p-0 space-y-4">
      <!-- <h2 class="text-xl">Payment History</h2> -->
      <div class="flex justify-between items-center">
        <button type="button" @click="year--" class="border px-2 py-1.5 border-black">Prev</button>
        <p class="text-lg">{{ year }}</p>
        <button type="button" @click="year++" class="border px-2 py-1.5 border-black">Next</button>
      </div>
      <p class="text-gray-500">double click the checkboxes to switch state</p>
      <p class="text-black">{{ member.fullName }} joined on {{ formatDate(member.joinedDate) }}</p>
      <InputCalendar />
    </div>
  </div>
</template>

<script setup lang="ts">

const year = ref(new Date().getFullYear())
const id = useRoute().params.id

const { data: member } = await useFetch(`/api/members/${id}`)

</script>
