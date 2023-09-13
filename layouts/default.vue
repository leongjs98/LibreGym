<template>
  <div>
    <div class="sticky top-0 w-full bg-slate-100 drop-shadow-md">
      <header
        class="max-w-screen-xl flex mx-auto flex-row justify-between items-center bg-slate-100 z-50 p-4 sm:px-8 xl:px-0">
        <h1 class="text-xl lg:text-2xl font-bold">Logo</h1>
        <div class="flex gap-2 sm:gap-4">
          <input type="checkbox" id="menu-toggle" class="peer hidden">
          <nav
            class="z-40 w-full absolute sm:static left-0 top-full origin-top scale-y-0 peer-checked:scale-y-100 sm:scale-y-100 transition-all duration-250 ease-in-out">
            <ul class="flex items-end sm:justify-end gap-4 bg-slate-100 flex-col sm:flex-row px-4 pb-5 sm:p-0 text-lg">
              <li class="opacity-0 transition-all duration-100 ease-in-out delay-0 sm:opacity-100">
                <NuxtLink to="/" class="hover:text-indigo-600 text-gray-700">Home</NuxtLink>
              </li>
              <li class="opacity-0 transition-all duration-100 ease-in-out delay-0 sm:opacity-100">
                <NuxtLink to="/analytics" class="hover:text-indigo-600 text-gray-700">Analytics</NuxtLink>
              </li>
              <li class="opacity-0 transition-all duration-100 ease-in-out delay-0 sm:opacity-100">
                <NuxtLink to="/classes" class="hover:text-indigo-600 text-gray-700">Classes</NuxtLink>
              </li>
              <li class="opacity-0 transition-all duration-100 ease-in-out delay-0 sm:opacity-100">
                <NuxtLink to="/members" class="hover:text-indigo-600 text-gray-700">Members</NuxtLink>
              </li>
              <!-- <li class="opacity-0 transition-all duration-100 ease-in-out delay-0 sm:opacity-100"> -->
              <!-- </li> -->
              <!-- <li> -->
              <!--   <NuxtLink to="/settings" class="hover:text-indigo-600 text-gray-700"> -->
              <!--     <Icon name="material-symbols:settings-outline" size="24px" /> -->
              <!--     Settings -->
              <!--   </NuxtLink> -->
              <!-- </li> -->
              <!-- <li> -->
              <!-- <NuxtLink to="/profile" class="flex items-center gap-1 hover:text-indigo-600 text-gray-700"> -->
              <!--   <Icon name="ic:baseline-person-outline" size="24px" /> -->
              <!--   Profile -->
              <!-- </NuxtLink> -->
              <!-- </li> -->
            </ul>
          </nav>
          <label for="menu-toggle" class="sm:hidden hover:cursor-pointer">
            <Icon name="icon-park:hamburger-button" color="black" size="24px" />
          </label>
          <label tabindex='0' for="notification-toggle" class="hover:cursor-pointer">
            <Icon name="material-symbols:notifications-rounded" size="24px" />
          </label>
        </div>
        <div
          class="flex w-full left-0 h-0 xl:left-auto max-w-screen-xl mx-auto justify-end absolute top-full sm:top-[150%] sm:px-8 xl:px-0">
          <input type="checkbox" name="notification-toggle" id="notification-toggle" class="peer hidden">
          <div
            class="relative z-50 origin-top scale-y-0 peer-checked:scale-y-100 transition-transform ease-in-out w-full max-w-lg rounded-full drop-shadow-2xl">
            <div class="bg-slate-100 flex flex-col items-center gap-6 p-8 shadow shadow-gray-300">
              <!-- <div for="notification-toggle" class="notification-content opacity-0 w-full flex justify-center"> -->
              <!--   <button @click="openNotification = false" type="button" class="flex justify-center items-center p-0.5"> -->
              <!--     <Icon name="clarity:collapse-line" size="24px" /> -->
              <!--   </button> -->
              <!-- </div> -->
              <!-- <p class="">There's no new notification...</p> -->
              <div class="notification-content opacity-0 flex justify-end gap-4 text-lg w-full">
                <label for="refresh-notification" class="hover:cursor-pointer">
                  Check for Notifications
                </label>
                <button @click="" type="button" class="" id="refresh-notification">
                  <Icon name="streamline:interface-arrows-synchronize-arrows-loading-load-sync-synchronize-arrow-reload"
                    size="18px" />
                </button>
              </div>
              <ul class="notification-content opacity-0 w-full flex flex-col justify-end divide-y divide-slate-500">
                <li class="w-full flex flex-col py-4">
                  <div class="w-full flex justify-between">
                    <header class="text-xl">Attendance streak!</header>
                    <button type="button" class="">
                      <IconCloseThick size="20px" />
                    </button>
                  </div>
                  <p class="">
                    XXX has attended X classes in the past month. Y classes per week.
                  </p>
                </li>
                <li class="w-full flex flex-col py-4">
                  <div class="w-full flex justify-between">
                    <header class="text-xl">Birthday reminder</header>
                    <button type="button" class="">
                      <IconCloseThick size="20px" />
                    </button>
                  </div>
                  <p class="">
                    It's Z birthday on dd-mmm-yyyy. Wish them a happy birthday!
                  </p>
                </li>
                <li class="w-full flex flex-col py-4">
                  <div class="w-full flex justify-between">
                    <header class="text-xl">Birthday reminder</header>
                    <button type="button" class="">
                      <IconCloseThick size="20px" />
                    </button>
                  </div>
                  <p class="">
                    It's Z birthday on dd-mmm-yyyy. Wish them a happy birthday!
                  </p>
                </li>
                <li class="w-full flex flex-col py-4">
                  <div class="w-full flex justify-between">
                    <header class="text-xl">Due Payment</header>
                    <button type="button" class="">
                      <IconCloseThick size="20px" />
                    </button>
                  </div>
                  <p class="">
                    XXX membership was due on dd-mmm-yyyy (12 days ago)
                  </p>
                </li>
                <li class="w-full flex flex-col py-4">
                  <div class="w-full flex justify-between">
                    <header class="text-xl">Inactive Member</header>
                    <button type="button" class="">
                      <IconCloseThick size="20px" />
                    </button>
                  </div>
                  <p class="">
                    XXX was last seen 49 days ago. contact them!
                  </p>
                </li>
              </ul>
              <div class="notification-content opacity-0 w-full flex justify-end">
                <label for="more-notification" class="hover:cursor-pointer">
                  more
                </label>
                <!-- <button type="button" id="more-notification" class=""> -->
                <!--   <IconMore2Line size="24px" /> -->
                <!-- </button> -->
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const openNotification = ref(false)
</script>

<style scoped>
.router-link-active {
  border-bottom-width: 2px;
  border-color: rgb(79, 20, 229);
  width: fit-content;
}

.peer:checked~nav li,
.peer:checked~div .notification-content,
.peer:checked~div ul {
  opacity: 1;
  transition: opacity 150ms ease-in-out 200ms;
}
</style>
