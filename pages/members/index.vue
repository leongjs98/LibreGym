<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert v-if="error" alertType="error" :message="error"/>
    <div>
      <div class="w-full flex justify-end">
        <NuxtLink href="/members/create" class="flex items-center w-fit px-4 py-2 mb-8 border-2 border-gray-500 rounded">
          <Icon name="material-symbols:add-rounded" size="24"/>
          New member
        </NuxtLink>
      </div>

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
              <button class="flex items-center gap-1">
                <Icon name="material-symbols:delete-forever-sharp" size="18"/>
                Delete
              </button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { data, error } = await useFetch('/api/members')
  // TODO: Interactive search member function (use for loop to access data.value[i])
</script>

<style scoped>

</style>
