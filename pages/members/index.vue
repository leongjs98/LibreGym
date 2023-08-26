<template>
  <div
    class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="w-full">
      <div class="w-full flex flex-col-reverse md:flex-row gap-3 justify-between items-end">
        <div v-if="!noMember" class="w-full flex space-x-3 items-center">
          <p class="text-xl border-b">
            Member:
            <b>{{ members?.length }}</b>
          </p>
          <div class="flex items-center">
            <label for="search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input v-model="searchQuery" type="text" id="search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search">
            </div>
          </div>
        </div>
        <memberLinks/>
      </div>

      <div v-if="noMember" class="w-full space-y-8">
        There's no members created yet. Go create <NuxtLink to="/members/create" class="underline">new members</NuxtLink>
      </div>

      <div v-else class="overflow-x-auto mt-8">
        <table class="table-auto w-full rounded">
          <thead class="hidden border border-gray-500">
            <tr>
              <th class="px-3 py-2 text-lg font-light text-left w-72">Members</th>
              <th class="py-2 text-lg font-light text-left w-80">Contacts</th>
              <th class="py-2 text-lg font-light w-28">Status</th>
              <th class="py-2 text-lg font-light w-36">Waiver</th>
              <th class="py-2 text-lg font-light"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="member, i in filteredMembers" :id="member.id" :key="member.id"
              class="hover:bg-gray-100 overflow-x-auto">
              <td class="px-3 py-2 font-normal">
                <div class="text-left">{{ member.fullName }}</div>
                <div class="text-left">
                  {{ member.belt }}
                  <span v-if="member.sex == 'female'" class="">(F)</span>
                  <span v-if="member.sex == 'male'" class="">(M)</span>
                </div>
              </td>
              <td class="py-2 font-normal">
                <div class="text-left">{{ member.email }}</div>
                <div class="text-left">{{ member.phoneNumber }}</div>
              </td>
              <td class="py-2 font-normal">
                <div v-if="member.status == 'member'" class="mx-auto px-3 py-1.5 w-fit">
                  {{ member.status }}
                </div>
                <div v-else-if="member.status == 'trial'" class="mx-auto px-3 py-1.5 w-fit">
                  {{ member.status }}
                </div>
                <div v-else-if="member.status == 'enquiry'"
                  class="rounded mx-auto px-3 py-1.5 w-fit text-yellow-900 bg-yellow-200">
                  {{ member.status }}
                </div>
              </td>
              <td class="py-2 font-normal">
                <div v-if="member.signedWaiver" class="mx-auto px-3 py-1.5 w-fit">
                  Signed
                </div>
                <div v-else class="rounded mx-auto px-3 py-1.5 text-red-900 bg-red-100 w-fit">
                  Not Signed
                </div>
              </td>
              <td class="">
                <label :for="'option-' + i" class="hover:cursor-pointer">
                  <IconMore2Line />
                </label>
              </td>
              <input type="checkbox" class="hidden peer" :id="'option-' + i" />
              <div class="hidden peer-checked:block absolute p-2 rounded border border-gray-500 bg-gray-100">
                <NuxtLink :to="`/members/${member.id}/attendance`" class="flex items-center gap-1">
                  <IconRoundMoreHoriz size="18px" />
                  Attendance
                </NuxtLink>
                <NuxtLink :to="`/members/${member.id}/edit`" class="flex items-center gap-1">
                  <IconEdit size="18px" />
                  Edit
                </NuxtLink>
                <NuxtLink :to="`/members/${member.id}/payment/${new Date().getFullYear()}`" class="flex items-center gap-1">
                  Payment
                </NuxtLink>
                <label :for="'delete-' + i" class="flex items-center gap-1 cursor-pointer">
                  <IconDeleteForeverSharp size="18px" />
                  Delete
                </label>
                <input type="checkbox" class="hidden peer" :id="'delete-' + i">
                <div
                  class="hidden peer-checked:block fixed top-1/2 left-1/2 w-72 h-64 -ml-36 -mt-32 rounded-lg bg-white p-8 shadow-2xl">
                  <h2 class="text-lg font-bold">
                    Are you sure you want to delete {{ member.fullName }} permanently?
                  </h2>

                  <p class="mt-2 text-sm text-gray-500">
                    Doing this will delete the user permanently, are you 100% sure it's OK?
                  </p>

                  <div class="mt-4 flex gap-2">
                    <button @click="deleteMember(member.id)" type="button"
                      class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                      Yes, I'm sure
                    </button>

                    <label :for="'delete-' + i"
                      class="cursor-pointer rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                      No, go back
                    </label>
                  </div>
                </div>

              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const noMember = ref(false)
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const { data: members, error: getError, refresh } = await useFetch('/api/members')

if (members.value && Array.isArray(members.value) && members.value.length === 0)
  noMember.value = true

const filteredMembers = computed(() => {
  const returnMembers = []
  if (members.value) {
    for (let i = 0; i < members.value.length; i++) {
      const matchedFullName = (members.value[i].fullName.toLowerCase()).includes(searchQuery.value.toLowerCase())
      const matchedBirthday = (members.value[i].birthday.toLowerCase()).includes(searchQuery.value.toLowerCase())
      const matchedSex = members.value[i].sex.toLowerCase() == (searchQuery.value.toLowerCase())
      const matchedBelt = (members.value[i].belt.toLowerCase()).includes(searchQuery.value.toLowerCase())
      const matchedStatus = (members.value[i].status.toLowerCase()).includes(searchQuery.value.toLowerCase())
      // TODO: matchedSignedWaiver
      if (matchedFullName || matchedBirthday || matchedSex || matchedBelt || matchedStatus) {
        returnMembers.push(members.value[i])
      }
    }
    return returnMembers
  }
  return []
})

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

async function deleteMember(memberId: String) {
  const { data: deletedMember, error: deleteError } = await useFetch(`/api/members/${memberId}`, {
    method: "delete"
  })

  if (deletedMember.value) {
    triggerToast({
      type: 'info',
      title: 'Deleted member',
      msg: `${deletedMember.value?.fullName} has been deleted`,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  } else if (deleteError.value) {
    triggerToast({
      type: 'error',
      title: deleteError.value?.name,
      msg: deleteError.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }
  refresh()
}
</script>
