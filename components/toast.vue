<template>
  <div class="absolute h-screen top-24 right-8" role="alert">
    <div class="sticky top-8 right-8 z-50 cursor-pointer p-4 max-w-4xl flex rounded-lg border"
      :class="`'border-${color}-300 bg-${color}-100`">
      <span class="flex-shrink-0" :class="`text-${color}-500`">
        <icon v-if="props.type == 'success'" name="material-symbols:check-circle" />
        <icon v-if="props.type == 'error'" name="akar-icons:circle-x-fill" />
        <icon v-if="props.type == 'info'" name="mdi:information-variant-circle" />
        <icon v-if="props.type == 'warning'" name="bi:exclamation-circle-fill" />
      </span>
      <div class="ml-3 flex flex-col items-start space-y-2 text-sm">
        <h3 class="font-semibold" :class="`text-${color}-800`">{{ props.title }}</h3>
        <p class="font-medium antialiased" :class="`text-${color}-600`">{{ props.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    require: true,
    validator(val: string) {
      return ['success', 'error', 'info', 'warning'].includes(val)
    }
  },
  title: { type: String, default: "Alert!" },
  message: { type: String, default: "This is the default toast message" },
})

const color = ref('yellow')

switch (props.type) {
  case 'success':
    color.value = 'green'
    break;
  case 'error':
    color.value = 'red'
    break;
  case 'info':
    color.value = 'blue'
    break;
  // case 'warning':
  //   color.value = 'yellow'
  //   break;
  default:
    break;
}
</script>
