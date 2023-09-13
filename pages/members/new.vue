<template>
  <div
    class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <MemberLinks />
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Member Information
        </h2>
        <p class="text-sm text-gray-500">
          Personal details and ranks.
        </p>
      </div>
      <form @submit.prevent="submitForm">

        <inputText v-model="fullName" name="fullname" label="Full name*" />
        <inputRadio v-model="sex" name="fullname" label="Sex*" :options="['female', 'male']" />
        <inputText v-model="email" name="email" label="Email address" />
        <inputText v-model="phoneNumber" name="phoneNumber" type="tel" label="Phone Number*" />
        <inputDate label="Birth Date" :is-required="true" @date-changed="(e) => updateDate(e)" name="birthday"
          :default-date="birthday" />
        <InputDropdown v-model="belt" label="Belt*" name="belt"
          :options="[{ name: 'White', value: 'white' }, { name: 'Blue', value: 'blue' }, { name: 'Purple', value: 'purple' }, { name: 'Brown', value: 'brown' }, { name: 'Black', value: 'black' }]" />
        <InputDropdown v-model="stripe" label="Stripe*" name="stripe"
          :options="[{ name: '0', value: 0 }, { name: '1', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 }]" />
        <InputDropdown v-model="status" label="Status*" name="status"
          :options="[{ name: 'Trial', value: 'trial' }, { name: 'Enquiry', value: 'enquiry' }, { name: 'Member', value: 'member' }]" />
        <inputDate label="Joined Date" :is-required="true" @date-changed="(e) => updateDate(e)" name="joinedDate"
          :default-date="joinedDate" />
        <!-- <inputDate label="Contract End Date" :is-required="false" @date-changed="(e) => updateDate(e)" -->
        <!--   name="contractEndDate" :default-date="contractEndDate" /> -->
        <InputTextarea v-model="homeAddress" name="homeAddress" label="Home Address*" />
        <InputTextarea v-model="medicalIssues" name="medicalIssues" label="Medical Issues" />
        <InputTextarea v-model="notes" name="notes" label="Notes" />

        <div class="flex gap-3 justify-end p-4">
          <button
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            type="reset">Reset</button>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const fullName = ref('')
const email = ref('')
const sex = ref('')
const belt = ref('')
const stripe = ref('')
const phoneNumber = ref('')
const status = ref('')
const homeAddress = ref('')
const notes = ref('')
const medicalIssues = ref('')

const currentDateStr = new Date().toISOString()
const birthday = ref(new Date(currentDateStr))
const joinedDate = ref(new Date(currentDateStr))
const contractEndDate: Ref<Date> | Ref<null> = ref(null)

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

async function submitForm() {

  const emptyField = isStrEmptyOrWhitespace(fullName.value) || isStrEmptyOrWhitespace(sex.value) || isStrEmptyOrWhitespace(phoneNumber.value) || !birthday.value || isStrEmptyOrWhitespace(belt.value) || isStrEmptyOrWhitespace(stripe.value) || isStrEmptyOrWhitespace(status.value) || !joinedDate.value || isStrEmptyOrWhitespace(homeAddress.value)

  if (emptyField) {
    triggerToast({
      type: 'error',
      title: 'Empty required field(s)',
      msg: 'Please fill in the required fields (marked with *)',
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  } else {
    const { data, error } = await useFetch('/api/members', {
      method: "post",
      body: {
        fullName: fullName.value,
        email: email.value,
        sex: sex.value,
        belt: belt.value,
        stripe: stripe.value,
        birthday: birthday.value,
        joinedDate: joinedDate.value,
        contractEndDate: contractEndDate.value,
        phoneNumber: phoneNumber.value,
        status: status.value,
        homeAddress: homeAddress.value,
        notes: notes.value,
        medicalIssues: medicalIssues.value,
      }
    })

    if (data.value) {
      triggerToast({
        type: 'success',
        title: 'Created member',
        msg: `${data.value?.fullName} has been created`,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
    } else if (error.value) {
      triggerToast({
        type: 'error',
        title: error.value?.name,
        msg: error.value?.message,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
    }
  }
}

function updateDate(e: { name: string, date: Date }) {
  if (e.name.toLowerCase() == "birthday") {
    birthday.value = e.date
  }
  else if (e.name.toLowerCase() == "joineddate") {
    joinedDate.value = e.date
  }
  else if (e.name.toLowerCase() == "contractenddate") {
    contractEndDate.value = e.date
  }
}

</script>
