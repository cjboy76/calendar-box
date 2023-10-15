<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="grid place-items-center p-4">
    <RouterLink to="/calendar">
      <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
        <div class="absolute inset-0 w-3 bg-slate-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span class="relative text-black group-hover:text-white">Login With Google</span>
      </button>
    </RouterLink>
  </div>
</template>
