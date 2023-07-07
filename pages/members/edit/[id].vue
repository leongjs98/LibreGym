<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="success" :title="successAlert.title" :message="successAlert.message" :color="successAlert.color" />
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
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
                  Full name
              </p>
              <input v-model="fullName" type="text" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Full name"/>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                  Sex
              </p>
              <ul class="items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input v-model="sex" :value="'female'" id="one-time-class" type="radio" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="one-time-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                  </div>
                </li>
                <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input v-model="sex" :value="'male'" id="repeat-class" type="radio" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="repeat-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                  </div>
                </li>
              </ul>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                  Email Address
              </p>
              <p>
                <input v-model="email" type="email" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Email address"/>
              </p>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                  Phone Number
              </p>
              <p>
                <input v-model="phoneNumber" type="text" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Contact number"/>
              </p>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
              Birth Date (YYYY/MM/DD)
            </p>
            <inputDate
              name="birthday"
              :defaultYear="birthdayYear"
              :defaultMonth="birthdayMonth"
              :defaultDay="birthdayDay"
            />
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Status
            </p>
            <select v-model="belt" name="belt" class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option :value="'white'">White</option>
              <option :value="'blue'">Blue</option>
              <option :value="'purple'">Purple</option>
              <option :value="'brown'">Brown</option>
              <option :value="'black'">Black</option>
            </select>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Status
            </p>
            <select v-model="stripe" name="stripe" class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
            </select>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Status
            </p>
            <select v-model="status" name="status" class="w-28 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option :value="'trial'">Trial</option>
              <option :value="'enquiry'">Enquiry</option>
              <option :value="'getMember'">Member</option>
            </select>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Joined Date (YYYY/MM/DD)
            </p>
            <inputDate
              name="joinedDate"
              :defaultYear="joinedDateYear"
              :defaultMonth="joinedDateMonth"
              :defaultDay="joinedDateDay"
            />
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">
                Contract End Date (YYYY/MM/DD)
            </p>
            <inputDate
              name="contractEndDate"
              :defaultYear="contractEndDateYear"
              :defaultMonth="contractEndDateMonth"
              :defaultDay="contractEndDateDay"
            />
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                Medical Issues
              </p>
              <textarea v-model="medicalIssues" name="medicalIssues" cols="30" rows="3" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                Home Address
              </p>
              <textarea v-model="homeAddress" name="homeAddress" id="" cols="30" rows="3" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">
                Notes
              </p>
              <textarea v-model="notes" name="notes" id="" cols="30" rows="3" class="w-full flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"></textarea>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
              <p class="text-gray-600">
                Signed Waiver
              </p>
              <div class="space-y-2">
                <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                  <div class="space-x-2 truncate">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current inline text-gray-500" width="24" height="24" viewBox="0 0 24 24"><path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"/></svg>
                    <span>
                      signed_waiver_jane_doe.pdf
                    </span>
                  </div>
                  <a href="#" class="text-purple-700 hover:underline">Download</a>
                </div>
              </div>
          </div>
          <div class="flex justify-end p-4">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
          </div>
      </form>
    </div>
</div>
</template>

<script setup lang="ts">
  import { useDateStore } from "@/store/dateStore"
  import { useAlertStore } from "@/store/alertStore"
  import { storeToRefs } from "pinia";

  const dateStore = useDateStore()
  const alertStore = useAlertStore()

  const id = useRoute().params.id

  const successAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'green'
  })

  const errorAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'red'
  })

  const { data: getMember, error: getError } = await useFetch(`/api/members/${id}`)

  if (getError.value) {
    errorAlert.value.title = getError.value.name
    errorAlert.value.message = 'Failed to retrieve data' + getError.value.message 
    alertStore.setAlert("error", true)
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

  const fillBirthday = new Date(getMember.value?.birthday)
  const birthdayYear = fillBirthday.getFullYear()
  const birthdayMonth = fillBirthday.getMonth() + 1
  const birthdayDay = fillBirthday.getDate()
  
  const fillJoinedDate = new Date(getMember.value?.joinedDate)
  const joinedDateYear = fillJoinedDate.getFullYear()
  const joinedDateMonth = fillJoinedDate.getMonth() + 1
  const joinedDateDay = fillJoinedDate.getDate()
  
  const fillContractEndDate = new Date(getMember.value?.contractEndDate)
  const contractEndDateYear = fillContractEndDate.getFullYear()
  const contractEndDateMonth = fillContractEndDate.getMonth() + 1
  const contractEndDateDay = fillContractEndDate.getDate()
  
  const { dates } = storeToRefs(dateStore)
  const birthday = dates.value["birthday"]
  const joinedDate = dates.value["joinedDate"]
  const contractEndDate = dates.value["contractEndDate"]

  async function submitForm() {
    const { data: updateMember, error: updateError } = await useFetch(`/api/members/${id}`, {
      method: "put",
      body: {
        fullName,
        email,
        sex,
        belt,
        stripe,
        birthday,
        joinedDate,
        contractEndDate,
        phoneNumber,
        status,
        homeAddress,
        notes,
        medicalIssues,
      }
    })

    if (updateMember.value) {
      successAlert.value.title = 'Updated member'
      successAlert.value.message = `${updateMember.value?.fullName} has been updated.`
      alertStore.setAlert("success", true)
    } else if (updateError.value) {
      errorAlert.value.title = updateError.value?.name
      errorAlert.value.message = updateError.value?.message
      alertStore.setAlert("error", true)
    }
  }
</script>
