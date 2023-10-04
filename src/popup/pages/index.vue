<script setup lang="ts">
import IconPlus from '~icons/mdi/plus'

chrome.identity.launchWebAuthFlow(
  {
    interactive: true,
    url:
      `https://github.com/login/oauth/authorize` +
      `?client_id=55e294602d71eb006dc505540cf0614d6b3c7f35` +
      `&redirect_uri=https://ekgmcbpgglflmgcfajnglpbcbdccnnje.chromiumapp.org/github_cb` +
      `&scope=user.email`,
  },
  (a) => {
    console.log(a)
  }
)
</script>

<template>
  <div class="bg-slate-800 relative">
    <div class="grid grid-cols-5 border-t-2 border-slate-300">
      <div class="col-span-1">
        <h3 class="text-center">5 PM</h3>
      </div>
      <div class="col-span-4 h-12"> current Block</div>
    </div>
    <div class="grid grid-cols-5 border-t-2 border-slate-300">
      <div class="col-span-1">
        <h3 class="text-center">6 PM</h3>
      </div>
      <div class="col-span-4 h-12"> current Block</div>
    </div>
    <div class="grid grid-cols-5 border-t-2 border-slate-300">
      <div class="col-span-1">
        <h3 class="text-center">7 PM</h3>
      </div>
      <div class="col-span-4 h-12"> current Block</div>
    </div>
    <div class="absolute bottom-3 right-3">
      <button class="grid place-items-center bg-slate-500 bg-opacity-50 w-8 h-8 rounded-full ease-out hover:scale-110">
        <IconPlus />
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
