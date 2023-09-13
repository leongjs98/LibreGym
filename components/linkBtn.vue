<template>
  <NuxtLink :to="link" class="flex items-center w-fit px-4 py-2 border-2 border-gray-500 rounded hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[0.125rem_0.125rem_0_0_#000] focus:-translate-y-0.5 focus:-translate-x-0.5 focus:shadow-[0.125rem_0.125rem_0_0_#000]">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  link: { type: String, required: true }
})
</script>
