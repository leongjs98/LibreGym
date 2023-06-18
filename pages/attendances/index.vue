<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <div class="container max-w-3xl mx-auto">
    <div class="flex flex-col w-full" style="cursor: auto;">
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Class attendance rate</div>
          <p class="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white" style="cursor: auto;">56%</p>
        </div>
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Average attendees per class</div>
          <p class="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white" style="cursor: auto;">5</p>
        </div>
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Classes popularity</div>
          <div class="container flex justify-center items-center">
            <ChartPie :data="classTypesJoined" title="Overall class type joined"/>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const classTypesJoined = ref({
    'Gi BJJ': { color: '#41B883', value: 40 },
    'No Gi BJJ': { color: '#E46651', value: 20 },
    'Strength and Conditioning': { color: '#00D8FF', value: 80 },
  })
</script>

<style scoped>
</style>
