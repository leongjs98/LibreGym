<template>
  <div class="p-10">
    <button class="flex items-center w-fit px-4 py-2 mb-8 border-2 border-gray-500 rounded">
      <Icon name="material-symbols:add-rounded" size="24"/>
      New member
    </button>

    <table class="table-auto rounded border border-gray-500">
      <thead class="border border-gray-500">
        <tr class="">
          <th class="px-3 py-2 text-lg font-light text-left w-72">Members</th>
          <th class="py-2 text-lg font-light text-left w-80">Contacts</th>
          <th class="py-2 text-lg font-light w-28">Status</th>
          <th class="py-2 text-lg font-light w-36">Waiver</th>
          <th class="py-2 text-lg font-light"></th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="member,i in members" :id="member._id"
          class="hover:bg-gray-100"
        >
          <th class="px-3 py-2 font-normal">
            <div class="text-left">{{ member.fullName }}</div>
            <div class="text-left">
              {{ member.belt }} 
              <span v-if="member.sex == 'female'" class="">(F)</span>
              <span v-if="member.sex == 'male'" class="">(M)</span>
            </div>
          </th>
          <th class="py-2 font-normal">
            <div class="text-left">{{ member.email }}</div>
            <div class="text-left">{{ member.phoneNumber }}</div>
          </th>
          <th class="py-2 font-normal">
            <div v-if="member.status =='member'" class="mx-auto px-3 py-1.5 w-fit">
               {{ member.status }}
            </div>
            <div v-else-if="member.status =='trial'" class="mx-auto px-3 py-1.5 w-fit">
               {{ member.status }}
            </div>
            <div v-else-if="member.status =='enquiry'" class="mx-auto px-3 py-1.5 w-fit text-yellow-900 bg-yellow-200">
               {{ member.status }}
            </div>
          </th>
          <th class="py-2 font-normal">
            <div v-if="member.signedWaiver" class="mx-auto px-3 py-1.5 w-fit">
               Signed
            </div>
            <div v-else class="mx-auto px-3 py-1.5 text-red-900 bg-red-100 w-fit">
              Not Signed
            </div>
          </th>
          <th class="">
            <button class="">
              <Icon name="mingcute:more-2-line" size="24"/>
            </button>
          </th>
          <template v-if="i==0">
            <div class="absolute p-2 ml-2 rounded border border-gray-500 bg-gray-100">
              <button class="flex items-center gap-1">
                <Icon name="ic:round-more-horiz" size="18"/>
                more
              </button>
              <button class="flex items-center gap-1">
                <Icon name="material-symbols:edit" size="18"/>
                Edit
              </button>
              <button class="flex items-center gap-1">
                <Icon name="material-symbols:delete-forever-sharp" size="18"/>
                Delete
              </button>
            </div>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import members from '@/data/members/data.json'
</script>

<style scoped>

</style>
