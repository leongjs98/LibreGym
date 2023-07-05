<template>
  <div
    v-if="showAlert"
    class="sticky top-20 border-l-4 p-4"
    :class="classes"
    role="alert"
  >
    <div class="flex">
      <div class="mr-4">
        <p class="font-bold">
          {{ title }}
        </p>
        <p>{{ message }}</p>
      </div>
      <button
        class="flex justify-start"
        @click="showAlert = false"
      >
        <Icon
          name="mdi:close-thick"
          size="24"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    alertType: { type: String, required: true },
    message: { type: String, required: true }
  })

  const title = ref('')
  const showAlert = ref(true)
  const classes = ref('')

  switch (props.alertType) {
  case 'error':
    title.value = 'Failed'
    classes.value = 'bg-red-200 border-red-600 text-red-600'
    break;
  case 'success':
    title.value = 'Succeed'
    classes.value = 'bg-green-200 border-green-600 text-green-600'
    break;
  default:
    title.value = ''
}
</script>
