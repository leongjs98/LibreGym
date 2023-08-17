<template>
  <div class="w-full space-x-4 flex justify-end">
    <LinkBtn to="/classes/edit">
      Edit classes
    </LinkBtn>
    <LinkBtn to="/classes/">
      View sessions
    </LinkBtn>
    <LinkBtn link="/classes/new">
      <IconAddRounded />
      New class
    </LinkBtn>
    <LinkBtn link="/sessions/new">
      <IconAddRounded />
      New session
    </LinkBtn>
  </div>
</template>

<script setup lang="ts">

</script>
