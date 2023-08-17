<template>
  <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
    <p class="text-gray-600">
      {{ label }}
    </p>
    <ul
      class="items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li v-for="o in options" class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input @change="$emit('update:modelValue', o)" :value="o" :id="o" :checked="o == modelValue" type="radio"
            name="list-sex"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label :for="o" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ o }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  name: string
  options: string[]
  modelValue: string | undefined
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>
