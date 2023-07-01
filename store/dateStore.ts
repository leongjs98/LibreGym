import { defineStore } from 'pinia'

export const useDateStore = defineStore('dateStore', () => {

  const dates: Ref<{ birthday: string; joinedDate: string; contractEndDate: string; classStartDate: string}> = ref({
    birthday: "2023-06-18T00:00:00.000Z",
    joinedDate: "2023-06-19T00:00:00.000Z",
    contractEndDate: "2023-06-20T00:00:00.000Z",
    classStartDate: "2023-06-21T00:00:00.000Z",
  })

  function setDate(propName: string, year: number, month: number, day: number) {
    const yyyy = year
    const mm = month < 10 ? `0${month}` : month
    const dd = day < 10 ? `0${day}` : day

    const computedDate = `${yyyy}-${mm}-${dd}`
    // TODO: test propName and value validity
    dates.value[propName] = computedDate + "T00:00:00.000Z"
  }

  return { dates, setDate }
});
