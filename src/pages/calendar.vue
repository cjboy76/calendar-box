<script setup lang="ts">
import IconPlus from '~icons/mdi/plus'
import { useNow, useDateFormat } from '@vueuse/core';
import { watchEffect } from 'vue';

const progress = ref(0)

chrome.runtime.sendMessage({message: 'get_events'}, (response) => {
    console.log("lity response", response)
  })

const watcherDisposer = watchEffect(() => {
    setInterval(() => {
        progress.value = ((Number(useDateFormat(useNow(), 'mm').value)) / 60)
    }, 1000);
})

const currentHour = Number(useDateFormat(useNow(), 'HH').value)

const timeFormatter = (number:number) => {
    if(number < 24) return number
    return number - 24
}

onUnmounted(() => {
    watcherDisposer && watcherDisposer()
})
</script>

<template>
    <div class="bg-slate-800 relative py-1">
        <div v-for="num of 5" :key="num" class="grid grid-cols-5 border-t border-slate-500">
            <div class="col-span-1">
                <h3 class="text-center">{{ timeFormatter(num + currentHour - 1) }} {{ (num + currentHour) > 24 ? 'AM' : 'PM' }}</h3>
            </div>
            <div class="col-span-4 h-12"> current Block</div>
        </div>
        <div class="absolute bottom-3 right-3">
            <button
                class="grid place-items-center bg-slate-500 bg-opacity-50 w-8 h-8 rounded-full ease-out hover:scale-110">
                <IconPlus />
            </button>
        </div>
        <div class="countdownBar absolute right-1  top-0 w-4/5 h-0.5 bg-white" :style="{ top: `${progress * 48}px` }">
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
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background-color: white;
}
</style>
