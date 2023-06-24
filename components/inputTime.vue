<template>
  <div class="p-3 w-36 bg-white rounded-lg shadow-xl">
    <div class="flex">
      <select
        name="hours"
        class="bg-transparent text-xl appearance-none outline-none"
      >
        <option
          v-for="n in 12"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
      </select>
      <span class="text-xl mr-3">:</span>
      <select
        name="minutes"
        class="bg-transparent text-xl appearance-none outline-none mr-4"
      >
        <option
          v-for="n in 10"
          :key="n"
          :value="n-1"
        >
          0{{ n-1 }}
        </option>
        <option
          v-for="n in 50"
          :key="n"
          :value="n+9"
        >
          {{ n+9 }}
        </option>
      </select>
      <select
        name="ampm"
        class="bg-transparent text-xl appearance-none outline-none"
      >
        <option value="pm">
          PM
        </option>
        <option value="am">
          AM
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
