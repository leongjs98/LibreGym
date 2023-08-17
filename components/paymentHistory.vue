<template>
  <div class="p-4 sm:p-0 w-96 space-y-8">
    <h2 class="text-xl">Payment History</h2>
    <div class="flex justify-between items-center">
      <button class="border px-2 py-1.5 border-black">Prev</button>
      <p class="text-lg">2023</p>
      <button class="border px-2 py-1.5 border-black">Next</button>
    </div>
    <p class="text-sm text-gray-500">double click boxes to switch state</p>
    <p class="text-black">XXX joined on 13 March 2023</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="space-y-5">
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-red-400"></button>
          <span>Due</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-green-400"></button>
          <div class="flex space-x-3">
            <span>Paid</span>
            <select name="" id="" class="bg-gray-100 px-2">
              <option v-for="d in 31" :value="d">{{d}}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-gray-400"></button>
          <span>N/A</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-red-400"></button>
          <span>Due</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-green-400"></button>
          <div class="flex space-x-3">
            <span>Paid</span>
            <select name="" id="" class="bg-gray-100 px-2">
              <option v-for="d in 31" :value="d">{{d}}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-gray-400"></button>
          <span>N/A</span>
        </div>
      </div>
      <div class="space-y-5">
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-red-400"></button>
          <span>Due</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-green-400"></button>
          <div class="flex space-x-3">
            <span>Paid</span>
            <select name="" id="" class="bg-gray-100 px-2">
              <option v-for="d in 31" :value="d">{{d}}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-gray-400"></button>
          <span>N/A</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-red-400"></button>
          <span>Due</span>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-green-400"></button>
          <div class="flex space-x-3">
            <span>Paid</span>
            <select name="" id="" class="bg-gray-100 px-2">
              <option v-for="d in 31" :value="d">{{d}}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <label for="" class="">Jan</label>
          <button class="w-4 h-4 border-4 border-gray-400"></button>
          <span>N/A</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
