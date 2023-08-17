<template>
  <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
    <p class="text-gray-600">
      {{ label }}
    </p>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target?.value)" :name="name" :type="type"
      class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      :placeholder="label" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  name: string
  type?: string
  modelValue: string | undefined
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})

defineEmits(['update:modelValue'])
</script>
