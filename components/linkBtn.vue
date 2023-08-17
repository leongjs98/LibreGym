<template>
  <NuxtLink :to="link" class="flex items-center w-fit px-4 py-2 border-2 border-gray-500 rounded">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  link: { type: String, required: true }
})
</script>
