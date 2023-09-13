<template>
  <div
    class="max-w-lg sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="w-full">
      <div class="w-full flex flex-col-reverse md:flex-row gap-6 justify-between items-end">
        <div v-if="!noMember" class="w-full flex md:flex-row flex-wrap gap-3 items-center">
          <p class="w-full min-w-fit text-xl border-b">
            Member:
            <b>{{ members?.length }}</b>
          </p>
          <div class="w-full min-w-fit flex items-center">
            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aperiam accusantium officiis impedit atque, assumenda asperiores. Aspernatur sunt reiciendis facere. Natus ex ea exercitationem mollitia ipsum accusamus at qui dignissimos. -->
            <label for="search" class="sr-only">Search</label>
            <div class="w-full">
              <input v-model="searchQuery" type="text" id="search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Search">
            </div>
          </div>
        </div>
        <memberLinks />
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
                <div class="text-left flex gap-1 items-center">
                  <span class="rounded px-1.5 py-0.5 w-14 text-center"
                    :class="{ 'text-black bg-white border border-black': member.belt == 'white', 'bg-blue-100 text-blue-900': member.belt == 'blue', 'bg-purple-200 text-purple-900': member.belt == 'purple', 'bg-amber-100 text-amber-900': member.belt == 'brown', 'text-white bg-black': member.belt == 'black' }">
                    {{ member.belt }}
                  </span>
                  <span v-if="member.sex == 'female'">(F)</span>
                  <span v-if="member.sex == 'male'">(M)</span>
                </div>
              </td>
              <td class="py-2 font-normal">
                <div class="text-left">{{ member.email }}</div>
                <div class="text-left">{{ member.phoneNumber }}</div>
              </td>
              <td class="py-2 font-normal">
                <div class="rounded mx-auto px-3 py-1.5 w-fit"
                  :class="{ 'text-yellow-950 bg-yellow-100': member.status == 'enquiry' }">
                  {{ member.status }}
                </div>
              </td>
              <td class="h-max py-2 font-normal hidden md:table-cell">
                <div v-if="member.signedWaiver" class="mx-auto px-3 py-1.5 w-fit">
                  Signed waiver
                </div>
                <div v-else class="rounded mx-auto px-3 py-1.5 text-red-900 bg-red-100 w-fit">
                  Not Signed
                </div>
              </td>
              <td class="">
                <label tabindex="0" :for="'option-' + i" class="hover:cursor-pointer">
                  <IconMore2Line />
                </label>
              </td>
              <input type="checkbox" class="hidden peer" :id="'option-' + i" />
              <div class="hidden peer-checked:block absolute p-2 rounded border border-gray-500 bg-gray-100">
                <NuxtLink :to="`/members/${member.id}/edit`" class="flex items-center gap-1">
                  <IconEdit size="18px" />
                  Edit
                </NuxtLink>
                <NuxtLink :to="`/members/${member.id}/attendance#analytics`" class="flex items-center gap-1">
                  <Icon name="ic:sharp-class" size="18px" />
                  Attendance
                </NuxtLink>
                <!-- <NuxtLink :to="`/members/${member.id}/payment/${new Date().getFullYear()}`" class="flex items-center gap-1"> -->
                <!--   Payment -->
                <!-- </NuxtLink> -->
                <NuxtLink :to="`/members/${member.id}/attendance#`" class="flex items-center gap-1">
                  <Icon name="ic:round-attach-money" size="20px" />
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
