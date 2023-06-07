<template>
  <div>
  <header>
    <nav>
      <div class="">
        <div class="flex justify-between h-16 px-10 shadow items-center">
          <div class="flex w-full justify-between items-center space-x-8">
            <h1 class="text-xl lg:text-2xl font-bold cursor-pointer">Gym Name</h1>
            <div class="hidden md:flex justify-around space-x-4">
              <NuxtLink href="/" class="hover:text-indigo-600 text-gray-700">Home</NuxtLink>
              <NuxtLink href="/attendance" class="hover:text-indigo-600 text-gray-700">Attendance</NuxtLink>
              <NuxtLink href="/class" class="hover:text-indigo-600 text-gray-700">Class</NuxtLink>
              <NuxtLink href="/member" class="hover:text-indigo-600 text-gray-700">Member</NuxtLink>
              <!-- <NuxtLink href="/settings" class="hover:text-indigo-600 text-gray-700"> -->
              <!--   <Icon name="material-symbols:settings-outline" size="24px" /> -->
              <!-- Settings -->
              <!-- </NuxtLink> -->
              <!-- <NuxtLink href="/profile" class="flex items-center gap-1 hover:text-indigo-600 text-gray-700"> -->
              <!--   <Icon name="ic:baseline-person-outline" size="24px" /> -->
              <!-- Profile -->
              <!-- </NuxtLink> -->
            </div>
          </div>
          <div class="md:hidden flex space-x-4 items-center">
            <!-- <Icon name="icon-park:hamburger-button" color="black"/> -->
            <!-- <Icon name="uil:github" color="black" /> -->
            <button @click="showMobileMenu = !showMobileMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          <!--   <a href="#" class="text-gray-800 text-sm">LOGIN</a> -->
          <!--   <a href="#" class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</a> -->
          </div>
        </div>
      </div>
      <div v-show="showMobileMenu" class="fixed bg-gray-50 shadow w-full flex flex-col p-10 space-y-4">
        <NuxtLink href="/attendance" class="hover:text-indigo-600 text-gray-700">Attendance</NuxtLink>
        <NuxtLink href="/class" class="hover:text-indigo-600 text-gray-700">Class</NuxtLink>
        <NuxtLink href="/member" class="hover:text-indigo-600 text-gray-700">Member</NuxtLink>
      </div>
    </nav>
  </header>
  <!-- <div class="relative"> -->
  <!-- <label for="menu-toggle" class="block px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer"> -->
  <!--   Menu -->
  <!-- </label> -->
  <!-- <input type="checkbox" id="menu-toggle" class="hidden"> -->
  <!-- <div class="menu-content hidden absolute bg-white shadow-md mt-2 py-2 w-48 right-0"> -->
  <!--   <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</a> -->
  <!--   <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">About</a> -->
  <!--   <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Services</a> -->
  <!--   <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Contact</a> -->
  <!-- </div> -->
  <!-- </div> -->
    <slot />
  </div>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false)
</script>

<style>
.router-link-active {
  border-bottom-width: 2px;
  border-color: rgb(79, 20, 229);
  width: fit-content;
}
</style>
