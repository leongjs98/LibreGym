<template>
  <div
    v-show="alerts[name]"
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
        @click="alertStore.setAlert(name, false)"
        class="flex justify-start"
      >
        <IconCloseThick />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAlertStore } from "@/store/alertStore"
  const alertStore = useAlertStore()

  const props = defineProps({
    name: { type: String, required: true },
    title: { type: String, default: "Attention!" },
    color: { type: String, default: "blue" },
    message: { type: String, required: true }
  })

  // const showAlert = ref(false)
  const { alerts } = storeToRefs(alertStore)
  const classes = ref('')

  const color = props.color.toLowerCase()
  classes.value = `bg-${color}-200 border-${color}-600 text-${color}-600`

</script>
