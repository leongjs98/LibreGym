import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alertStore', () => {

  const alerts: Ref<{ success: boolean; error: boolean }> = ref({
    success: false,
    error: false,
    info: false,
  })

  function setAlert(propName: string, state: boolean) {
    alerts.value[propName] = state
  }

  return { alerts, setAlert }
});
