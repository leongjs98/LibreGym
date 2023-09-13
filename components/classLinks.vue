<template>
  <div class="w-full gap-4 flex flex-wrap justify-end">
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
