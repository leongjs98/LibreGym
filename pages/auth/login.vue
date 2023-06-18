<template>
  <div class="h-screen bg-gray-100 flex justify-center">
    <div class="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
      <form action="">
        <div>
          <label for="email" class="block text-gray-800 font-bold">Email:</label>
          <input type="text" name="email" id="email" placeholder="@email" class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />

          <label for="password" class="block text-gray-800 font-bold">Password</label>
          <input type="password" id="password" class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600">

          <a href="#" class="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600">Forget Password</a>
        </div>

        <button class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
      </form>
    </div>
  </div>
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
      Please contact your administrator if you forgot your password.
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
