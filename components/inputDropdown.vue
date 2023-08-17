<template>
  <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
    <p class="text-gray-600">
      {{ label }}
    </p>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target?.value)" :name="name"
      class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
      <option v-for="o in options" :value="o.value">{{ o.name }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  label: string
  modelValue: string | number | undefined
  options: Array<{ name: string, value: string | number }>
}

defineProps<Props>()

defineEmits(['update:modelValue'])
</script>
