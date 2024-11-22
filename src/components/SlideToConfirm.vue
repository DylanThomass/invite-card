<template>
  <div class="relative w-full h-14 rounded-full bg-gray-100 overflow-hidden">
    <!-- 滑块背景 -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500"
      :style="{ width: `${progress}%` }"
    ></div>

    <!-- 滑块 -->
    <div
      ref="slider"
      class="absolute top-1 left-1 w-12 h-12 bg-white rounded-full cursor-pointer shadow-md flex items-center justify-center"
      :style="{ transform: `translateX(${sliderPosition}px)` }"
      @mousedown="startDragging"
      @touchstart="startDragging"
    >
      <font-awesome-icon icon="chevron-right" class="text-gray-400" />
    </div>

    <!-- 提示文字 -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span class="text-sm font-medium text-gray-500">
        {{ progress >= 100 ? '已接受邀请' : '滑动接受邀请' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['confirm'])

const slider = ref(null)
const sliderPosition = ref(0)
const progress = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const maxSlide = ref(0)

onMounted(() => {
  // 计算最大滑动距离
  const container = slider.value.parentElement
  maxSlide.value = container.clientWidth - slider.value.clientWidth - 8 // 减去内边距
})

const startDragging = (e) => {
  isDragging.value = true
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchend', stopDragging)
}

const drag = (e) => {
  if (!isDragging.value) return

  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  const newPosition = Math.max(0, Math.min(maxSlide.value, diff))

  sliderPosition.value = newPosition
  progress.value = (newPosition / maxSlide.value) * 100

  if (progress.value >= 100) {
    emit('confirm')
    stopDragging()
  }
}

const stopDragging = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchend', stopDragging)

  // 如果没有完成滑动，则回到起始位置
  if (progress.value < 100) {
    sliderPosition.value = 0
    progress.value = 0
  }
}

onUnmounted(() => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchend', stopDragging)
})
</script>
