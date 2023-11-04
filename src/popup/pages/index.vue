<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function initAuth() {
  chrome.runtime.sendMessage({ message: 'get_access_token' }, (response) => {
    if (response.status === 'success') {
      router.push('/calendar')
    }
  })
}
</script>

<template>
  <div class="grid place-items-center p-4">
    <button
      class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
      @click="initAuth"
    >
      <div
        class="absolute inset-0 w-3 bg-slate-400 transition-all duration-[250ms] ease-out group-hover:w-full"
      ></div>
      <span class="relative text-black group-hover:text-white">
        Login With Google
      </span>
    </button>
  </div>
</template>
