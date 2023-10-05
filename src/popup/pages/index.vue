<script setup lang="ts">
import IconPlus from '~icons/mdi/plus'
import { useNow, useDateFormat } from '@vueuse/core';
import { watchEffect } from 'vue';

const progress = ref(0)

const watcherDisposer = watchEffect(() => {
  setInterval(() => {
    progress.value = ((Number(useDateFormat(useNow(), 'mm').value)) / 60)
    console.log(progress.value)
  }, 1000);
})

onUnmounted(() => {
  watcherDisposer && watcherDisposer()
})

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
    <div class="grid grid-cols-5 border-t border-slate-500">
      <div class="col-span-1">
        <h3 class="text-center">5 PM</h3>
      </div>
      <div class="col-span-4 h-12"> current Block</div>
    </div>
    <div class="grid grid-cols-5 border-t-2 border-slate-500">
      <div class="col-span-1">
        <h3 class="text-center">6 PM</h3>
      </div>
      <div class="col-span-4 h-12"> current Block</div>
    </div>
    <div class="grid grid-cols-5 border-t-2 border-slate-500">
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
    <div class="countdownBar absolute right-0 top-0 w-5/6 h-0.5 bg-white" :style="{ top: `${progress * 48}px` }">
    </div>

  </div>
</template>

<style scoped>
.countdownBar {
  transform: translateY(--countdown-progress);
}

.countdownBar::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background-color: white;
}
</style>
