<template>
  <div>
  <header>
    <nav>
      <div class="">
        <div class="flex justify-between h-16 px-10 shadow items-center">
          <div class="flex w-full justify-between items-center space-x-8">
            <h1 class="text-xl lg:text-2xl font-bold cursor-pointer">Gym Name</h1>
            <ul class="hidden md:flex justify-around space-x-4">
              <li><NuxtLink to="/" class="hover:text-indigo-600 text-gray-700">Home</NuxtLink></li>
              <li><NuxtLink to="/analytics" class="hover:text-indigo-600 text-gray-700">Analytics</NuxtLink></li>
              <li><NuxtLink to="/classes" class="hover:text-indigo-600 text-gray-700">Classes</NuxtLink></li>
              <li><NuxtLink to="/members" class="hover:text-indigo-600 text-gray-700">Members</NuxtLink></li>
              <!-- <NuxtLink to="/settings" class="hover:text-indigo-600 text-gray-700"> -->
              <!--   <Icon name="material-symbols:settings-outline" size="24px" /> -->
              <!-- Settings -->
              <!-- </NuxtLink> -->
              <!-- <NuxtLink to="/profile" class="flex items-center gap-1 hover:text-indigo-600 text-gray-700"> -->
              <!--   <Icon name="ic:baseline-person-outline" size="24px" /> -->
              <!-- Profile -->
              <!-- </NuxtLink> -->
            </ul>
          </div>
          <div class="md:hidden flex space-x-4 items-center">
            <!-- <Icon name="icon-park:hamburger-button" color="black"/> -->
            <!-- <Icon name="uil:github" color="black" /> -->
            <label for="mobile-menu" class="hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          <!--   <a href="#" class="text-gray-800 text-sm">LOGIN</a> -->
          <!--   <a href="#" class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</a> -->
          </div>
        </div>
      </div>
      <input type="checkbox" id="mobile-menu" class="hidden peer">
      <ul class="hidden peer-checked:flex fixed bg-gray-50 shadow w-full flex-col p-10 space-y-4">
        <li><NuxtLink to="/" class="hover:text-indigo-600 text-gray-700">Home</NuxtLink></li>
        <li><NuxtLink to="/analytics" class="hover:text-indigo-600 text-gray-700">Analytics</NuxtLink></li>
        <li><NuxtLink to="/classes" class="hover:text-indigo-600 text-gray-700">Classes</NuxtLink></li>
        <li><NuxtLink to="/members" class="hover:text-indigo-600 text-gray-700">Members</NuxtLink></li>
      </ul>
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
</script>

<style>
.router-link-active {
  border-bottom-width: 2px;
  border-color: rgb(79, 20, 229);
  width: fit-content;
}
</style>
