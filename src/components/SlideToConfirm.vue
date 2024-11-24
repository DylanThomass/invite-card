<template>
  <div class="max-w-sm mx-auto px-4">
    <div
      ref="track"
      class="relative h-10 bg-gray-50/80 rounded-full overflow-hidden shadow-inner border border-gray-100"
      @mousedown="startSlide"
      @touchstart="startSlide"
      @mousemove="moveSlide"
      @touchmove="moveSlide"
      @mouseup="endSlide"
      @touchend="endSlide"
      @mouseleave="endSlide"
    >
      <!-- 滑块 -->
      <div
        ref="slider"
        :style="sliderStyle"
        class="absolute left-0 top-0 h-full aspect-square rounded-full bg-gradient-to-r from-indigo-500 to-rose-400 cursor-pointer flex items-center justify-center shadow-md will-change-transform"
      >
        <font-awesome-icon
          icon="chevron-right"
          class="text-white text-sm"
          :class="{ 'animate-pulse-gentle': !sliding }"
        />
      </div>

      <!-- 背景文字 -->
      <div
        class="absolute inset-0 flex items-center justify-center text-gray-400 font-lxgw text-sm pointer-events-none transition-opacity duration-200"
        :class="{ 'opacity-0': position > 20 }"
      >
        滑动确认接受邀请
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const position = ref(0)
const sliding = ref(false)
const startX = ref(0)
const slider = ref(null)
const track = ref(null)
const maxPosition = ref(0)

const emit = defineEmits(['confirm'])

const sliderStyle = computed(() => ({
  transform: `translateX(${position.value}px)`,
}))

const startSlide = (e) => {
  e.preventDefault()
  sliding.value = true
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
  maxPosition.value = track.value.offsetWidth - slider.value.offsetWidth

  // 添加事件监听
  if (e.type === 'mousedown') {
    document.addEventListener('mousemove', moveSlide)
    document.addEventListener('mouseup', endSlide)
  }
}

const moveSlide = (e) => {
  if (!sliding.value) return
  e.preventDefault()

  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  const newPosition = Math.max(0, Math.min(maxPosition.value, position.value + diff))

  position.value = newPosition
  startX.value = currentX

  if (position.value >= maxPosition.value * 0.8) {
    emit('confirm')
    endSlide()
  }
}

const endSlide = () => {
  if (!sliding.value) return

  sliding.value = false
  // 移除事件监听
  document.removeEventListener('mousemove', moveSlide)
  document.removeEventListener('mouseup', endSlide)

  // 如果没有滑到足够距离，使用 requestAnimationFrame 平滑回弹
  if (position.value < maxPosition.value * 0.8) {
    const animate = () => {
      position.value = Math.max(0, position.value * 0.8)
      if (position.value > 0.5) {
        requestAnimationFrame(animate)
      } else {
        position.value = 0
      }
    }
    requestAnimationFrame(animate)
  }
}
</script>

<style scoped>
.animate-pulse-gentle {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.will-change-transform {
  will-change: transform;
}
</style>
