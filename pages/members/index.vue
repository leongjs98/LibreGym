<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert v-if="error" alert-type="error" :message="error"/>
    <div>
      <div class="w-full flex justify-end">
        <NuxtLink href="/members/create" class="flex items-center w-fit px-4 py-2 mb-8 border-2 border-gray-500 rounded">
          <Icon name="material-symbols:add-rounded" size="24"/>
          New member
        </NuxtLink>
      </div>

      <table class="table-auto rounded border border-gray-500">
        <thead class="border border-gray-500">
          <tr>
            <th class="px-3 py-2 text-lg font-light text-left w-72">Members</th>
            <th class="py-2 text-lg font-light text-left w-80">Contacts</th>
            <th class="py-2 text-lg font-light w-28">Status</th>
            <th class="py-2 text-lg font-light w-36">Waiver</th>
            <th class="py-2 text-lg font-light"></th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="member,i in data" :id="member.id" :key="member.id"
            class="hover:bg-gray-100"
          >
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
              <div v-if="member.status =='member'" class="mx-auto px-3 py-1.5 w-fit">
                 {{ member.status }}
              </div>
              <div v-else-if="member.status =='trial'" class="mx-auto px-3 py-1.5 w-fit">
                 {{ member.status }}
              </div>
              <div v-else-if="member.status =='enquiry'" class="rounded mx-auto px-3 py-1.5 w-fit text-yellow-900 bg-yellow-200">
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
              <label :for="'option-'+i" class="hover:cursor-pointer">
                <Icon name="mingcute:more-2-line" size="24"/>
              </label>
            </td>
            <input type="checkbox" name="" class="hidden peer" :id="'option-'+i">
            <div class="hidden peer-checked:block absolute p-2 ml-2 rounded border border-gray-500 bg-gray-100">
              <!-- <button class="flex items-center gap-1"> -->
              <!--   <Icon name="ic:round-more-horiz" size="18"/> -->
              <!--   more -->
              <!-- </button> -->
              <NuxtLink :to="`/members/edit/${member.id}`" class="flex items-center gap-1">
                <Icon name="material-symbols:edit" size="18"/>
                Edit
              </NuxtLink>
              <label :for="'delete-'+i" class="flex items-center gap-1">
                <Icon name="material-symbols:delete-forever-sharp" size="18"/>
                Delete
              </label>
              <input type="checkbox" class="hidden peer" :id="'delete-'+i">
              <div class="hidden peer-checked:block fixed top-1/2 left-1/2 w-72 h-64 -ml-36 -mt-32 rounded-lg bg-white p-8 shadow-2xl">
                <h2 class="text-lg font-bold">
                  Are you sure you want to delete {{ member.fullName }} permanently?
                </h2>

                <p class="mt-2 text-sm text-gray-500">
                  Doing that will delete the user permanently, are you 100% sure it's OK?
                </p>

                <div class="mt-4 flex gap-2">
                  <button
                    @click="deleteMember(member.id)"
                    type="button"
                    class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                  >
                    Yes, I'm sure
                  </button>

                  <label
                    :for="'delete-'+i"
                    class="cursor-pointer rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                  >
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
</template>

<script setup lang="ts">
  const { data, error, refresh } = await useFetch('/api/members')
  // TODO: Interactive search member function (use for loop to access data.value[i])

  async function deleteMember(memberId: String) {
    const { data: deletedMember } = await useFetch(`/api/members/${memberId}`, {
      method: "delete"
    })

    refresh()
    console.log(`Deleted member ${deletedMember.value.fullName}`)
  }
</script>

<style scoped>

</style>
