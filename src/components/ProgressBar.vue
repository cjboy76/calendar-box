<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: true,
  },
})
</script>

<template>
  <div class="w-full h-0.5 flex items-center relative">
    <div
      v-show="loading"
      class="progress"
    ></div>
  </div>
</template>

<style scoped>
.progress {
  width: 20%;
  height: 100%;
  top: 0;
  background-color: white;
  position: absolute;
  animation: move 1.5s linear infinite;
}

@keyframes move {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
