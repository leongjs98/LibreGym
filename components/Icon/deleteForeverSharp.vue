<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM5 21V6H4V4h5V3h6v1h5v2h-1v15H5Z"></path></svg>
</template>

<script setup lang="ts">
  defineProps({
    size: { type: String, default: "24px" },
  })
</script>
