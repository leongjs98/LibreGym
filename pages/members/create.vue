<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
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
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Full name*
          </p>
          <input v-model="fullName" type="text"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            placeholder="Full name" />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Sex*
          </p>
          <ul
            class="items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input v-model="sex" :value="'female'" id="female" type="radio" name="list-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for="female"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
              </div>
            </li>
            <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input v-model="sex" :value="'male'" id="male" type="radio" name="list-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for="male"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
              </div>
            </li>
          </ul>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Email Address
          </p>
          <p>
            <input v-model="email" type="email"
              class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Email address" />
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Phone Number*
          </p>
          <p>
            <input v-model="phoneNumber" type="text"
              class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Contact number" />
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Birth Date (YYYY/MM/DD)*
          </p>
          <inputDate @date-changed="(e) => updateDate(e)" name="birthday" :default-date="birthday" />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Belt*
          </p>
          <select v-model="belt" name="belt"
            class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
            <option :value="'white'">White</option>
            <option :value="'blue'">Blue</option>
            <option :value="'purple'">Purple</option>
            <option :value="'brown'">Brown</option>
            <option :value="'black'">Black</option>
          </select>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Stripe*
          </p>
          <select v-model="stripe" name="stripe"
            class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
            <option :value="0">0</option>
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Status*
          </p>
          <select v-model="status" name="status"
            class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
            <option :value="'trial'">Trial</option>
            <option :value="'enquiry'">Enquiry</option>
            <option :value="'member'">Member</option>
          </select>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Joined Date (YYYY/MM/DD)*
          </p>
          <inputDate @date-changed="(e) => updateDate(e)" name="joinedDate" :default-date="joinedDate" />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Contract End Date (YYYY/MM/DD)
          </p>
          <inputDate @date-changed="(e) => updateDate(e)" name="contractEndDate" :default-date="contractEndDate" />
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Medical Issues
          </p>
          <textarea v-model="medicalIssues" name="medicalIssues" cols="30" rows="3"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Home Address*
          </p>
          <textarea v-model="homeAddress" name="homeAddress" id="" cols="30" rows="3"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Notes
          </p>
          <textarea v-model="notes" name="notes" id="" cols="30" rows="3"
            class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
        </div>
        <div class="flex justify-end p-4">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
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
const contractEndDate = ref(new Date(currentDateStr))

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

async function submitForm() {
  // if (!fullName || !sex || !belt || !stripe || !phoneNumber || !status || !homeAddress)
  const { data, error } = await useFetch('/api/members', {
    method: "post",
    body: {
      fullName: fullName.value,
      email: email.value,
      sex: sex.value,
      belt: belt.value,
      stripe: parseInt(stripe.value),
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
