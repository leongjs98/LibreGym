<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
      <MemberLinks />
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

        <!-- <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"> -->
        <!--   <p class="text-gray-600">Payment History</p> -->
        <!--   <PaymentHistory /> -->
        <!-- </div> -->
        <!-- <inputDate label="Contract End Date" :is-required="false" @date-changed="(e) => updateDate(e)" -->
        <!--   name="contractEndDate" :default-date="contractEndDate" /> -->

        <InputTextarea v-model="homeAddress" name="homeAddress" label="Home Address*" />
        <InputTextarea v-model="medicalIssues" name="medicalIssues" label="Medical Issues" />
        <InputTextarea v-model="notes" name="notes" label="Notes" />

        <!-- <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4"> -->
        <!--   <p class="text-gray-600"> -->
        <!--     Signed Waiver -->
        <!--   </p> -->
        <!--   <div class="space-y-2"> -->
        <!--     <div class="border-2 flex items-center p-2 rounded justify-between space-x-2"> -->
        <!--       <div class="space-x-2 truncate"> -->
        <!--         <svg xmlns="http://www.w3.org/2000/svg" class="fill-current inline text-gray-500" width="24" height="24" -->
        <!--           viewBox="0 0 24 24"> -->
        <!--           <path -->
        <!--             d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" /> -->
        <!--         </svg> -->
        <!--         <span> -->
        <!--           signed_waiver_jane_doe.pdf -->
        <!--         </span> -->
        <!--       </div> -->
        <!--       <a href="#" class="text-purple-700 hover:underline">Download</a> -->
        <!--     </div> -->
        <!--   </div> -->
        <!-- </div> -->

        <div class="flex justify-end p-4">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface APIBody {
  fullName: string;
  email: string;
  sex: string;
  belt: string;
  stripe: string;
  phoneNumber: string;
  status: string;
  homeAddress: string;
  notes: string;
  medicalIssues: string;
  birthday: string;
  joinedDate: string;
  contractEndDate: string;
}

const id = useRoute().params.id

const { data: getMember, error: getError } = await useFetch<APIBody>(`/api/members/${id}`)

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

if (getError.value) {
  triggerToast({
    type: 'error',
    title: 'Something went wrong with the db',
    msg: getError.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

const fullName = ref(getMember.value?.fullName)
const email = ref(getMember.value?.email)
const sex = ref(getMember.value?.sex)
const belt = ref(getMember.value?.belt)
const stripe = ref(getMember.value?.stripe)
const phoneNumber = ref(getMember.value?.phoneNumber)
const status = ref(getMember.value?.status)
const homeAddress = ref(getMember.value?.homeAddress)
const notes = ref(getMember.value?.notes)
const medicalIssues = ref(getMember.value?.medicalIssues)

const birthday = ref(new Date(getMember.value?.birthday))
const joinedDate = ref(new Date(getMember.value?.joinedDate))
const contractEndDate = ref(new Date(getMember.value?.contractEndDate))

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
    const { data: updateMember, error: updateError } = await useFetch(`/api/members/${id}`, {
      method: "put",
      body: {
        fullName: fullName.value,
        email: email.value,
        sex: sex.value,
        belt: belt.value,
        stripe: stripe.value,
        birthday,
        joinedDate,
        contractEndDate,
        phoneNumber: phoneNumber.value,
        status: status.value,
        homeAddress: homeAddress.value,
        notes: notes.value,
        medicalIssues: medicalIssues.value,
      }
    })

    if (updateMember.value) {
      triggerToast({
        type: 'success',
        title: 'Updated member',
        msg: `${updateMember.value?.fullName} has been updated.`,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
    } else if (updateError.value) {
      triggerToast({
        type: 'error',
        title: updateError.value?.name,
        msg: updateError.value?.message,
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
