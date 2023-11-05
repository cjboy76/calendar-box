<script setup lang="ts">
import IconPlus from '~icons/mdi/plus'
import { useNow, useDateFormat } from '@vueuse/core'
import { watchEffect } from 'vue'
import { type Calendar } from '@/common'
import { useRouter } from 'vue-router'

type EventBlock = {
  startPercentage: number
  summary: string
  creator: string
  htmlLink: string
  hangoutLink?: string
}

const router = useRouter()

const progress = ref(0)
const currentHour = Number(useDateFormat(useNow(), 'HH').value)
let eventBlocks = reactive<EventBlock[][]>([])
eventBlocks = Array.from({ length: 5 }, () => [])

const getEvents = async () => {
  const { status, data } = await new Promise<
    | { status: 'failed'; data: undefined }
    | { status: 'success'; data: Calendar }
  >((resolve) => {
    chrome.runtime.sendMessage({ message: 'get_events' }, (response) => {
      resolve(response)
    })
  })
  if (status !== 'success') {
    router.push('/popup/')
    return
  }
  if (!data.items) return []

  return data.items.map((item) => {
    return {
      ...item,
      timeDiff: getTimeDiff(item.start.dateTime, item.end.dateTime),
    }
  })
}

const loading = ref(true)

const generateEventBlocks = async () => {
  const events = await getEvents()
  loading.value = false
  if (!events) return

  events.forEach((event) => {
    const eventMinute = useDateFormat(event.start.dateTime, 'mm')
    const index =
      Number(useDateFormat(event.start.dateTime, 'HH').value) - currentHour

    const list = eventBlocks[index] ?? []
    const block = {
      startPercentage: Number(eventMinute.value) / 60,
      summary: event.summary,
      creator: event.creator.email,
      htmlLink: event.htmlLink,
      hangoutLink: event.hangoutLink || '',
    }
    eventBlocks[index] = [...list, block]
  })
}

generateEventBlocks()

const getTimeDiff = (
  startTime: string,
  endTime: string,
  unit = 1000 * 60 * 60
) => {
  const diff = new Date(endTime).getTime() - new Date(startTime).getTime()
  return diff / unit
}

const watcherDisposer = watchEffect(() => {
  setInterval(() => {
    progress.value = Number(useDateFormat(useNow(), 'mm').value) / 60
  }, 1000)
})

const timeFormatter = (number: number) => {
  if (number < 24) return number
  return number - 24
}

const hangoutLinkHandler = (event: EventBlock) => {
  if (!event.hangoutLink) return
  chrome.tabs.create({ url: event.hangoutLink })
}

const htmlLinkHandler = (event: EventBlock) => {
  if (!event.htmlLink) return
  chrome.tabs.create({ url: event.htmlLink })
}

const createEventPage = () => {
  chrome.tabs.create({
    url: 'https://calendar.google.com/calendar/u/0/r/eventedit',
  })
}

onUnmounted(() => {
  watcherDisposer && watcherDisposer()
})
</script>

<template>
  <div class="bg-gray-800">
    <ProgressBar :loading="loading"></ProgressBar>
    <div
      v-for="num of 5"
      :key="num"
      class="grid grid-cols-5 border-t border-slate-500 h-12"
    >
      <div class="col-span-1">
        <h3 class="text-center">
          {{ timeFormatter(num + currentHour - 1) }}
          {{ num + currentHour > 24 ? 'AM' : 'PM' }}
        </h3>
      </div>
      <div class="col-span-4 flex">
        <div
          v-for="(event, evnetIndex) of eventBlocks[num - 1]"
          :key="event.summary"
          class="min-w-min h-min mx-px bg-gray-600 text-white p-1 rounded-sm flex justify-center items-center cursor-pointer"
          :style="{
            marginTop: event.startPercentage * 48 + 'px',
            zIndex: evnetIndex,
          }"
          @click.self="htmlLinkHandler(event)"
        >
          {{ event.summary }}
          <CameraIcon
            v-show="event.hangoutLink"
            class="mx-1 cursor-pointer"
            @click="hangoutLinkHandler(event)"
          />
        </div>
      </div>
    </div>
    <div class="absolute bottom-3 right-3">
      <button
        class="grid place-items-center bg-slate-500 bg-opacity-50 w-8 h-8 rounded-full ease-out hover:scale-110"
        @click="createEventPage"
      >
        <IconPlus />
      </button>
    </div>
    <div
      class="countdownBar absolute right-1 top-0 w-4/5 h-0.5 bg-white z-50"
      :style="{ top: `${progress * 48}px` }"
    ></div>
  </div>
</template>

<style scoped>
.countdownBar {
  transform: translateY(--countdown-progress);
  transition: top 0.1s ease;
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
