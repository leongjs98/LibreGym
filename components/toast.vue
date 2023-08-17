<template>
  <div class="absolute h-screen top-24 left-8" role="alert">
    <div class="sticky top-8 left-8 z-50 cursor-pointer p-4 max-w-4xl flex rounded-lg border"
      :class="`'border-${color}-300 bg-${color}-100`">
      <span class="flex-shrink-0" :class="`text-${color}-500`">
        <icon v-if="type == 'success'" name="material-symbols:check-circle" />
        <icon v-if="type == 'error'" name="akar-icons:circle-x-fill" />
        <icon v-if="type == 'info'" name="mdi:information-variant-circle" />
        <icon v-if="type == 'warning'" name="bi:exclamation-circle-fill" />
      </span>
      <div class="ml-3 flex flex-col items-start space-y-2 text-sm">
        <h3 class="font-semibold" :class="`text-${color}-800`">{{ title }}</h3>
        <p class="font-medium antialiased" :class="`text-${color}-600`">{{ message }}</p>
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

if (props.type == 'success')
  color.value = 'green'
else if (props.type == 'error')
  color.value = 'red'
else if (props.type == 'info')
  color.value = 'blue'

</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
