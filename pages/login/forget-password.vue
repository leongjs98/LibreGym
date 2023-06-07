<template>
  <div class="container max-w-lg mx-auto h-screen flex flex-col justify-center">
    <div class="text-2xl text-center mx-3">
      Sign in to LibreGym to manage <br> <span class="font-semibold">Your Gym Name</span>
    </div>
    <form action="#" class="border mx-3 rounded-lg my-8">
      <div class="bg-gray-100 px-4 py-8">
        <div class="flex flex-col mb-5 gap-3">
          <label for="username" class="text-lg">Email Address</label>
          <input type="text" id="username" class="p-1 rounded">
        </div>
        <div class="flex flex-col gap-3">
          <label for="password" class="text-lg">Password</label>
          <input type="password" id="password" class="p-1 rounded">
        </div>
      </div>
      <div class="flex justify-center items-center bg-gray-200 px-4 py-8">
        <button type="submit" class="px-8 py-2 rounded text-white bg-green-700 font-bold text-xl">Sign In</button>
      </div>
    </form>
    <div class="text-center mx-3">
      FORGET PASSWORD
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
