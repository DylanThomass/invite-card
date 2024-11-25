<template>
  <div class="max-w-sm mx-auto px-4 relative h-12">
    <!-- 滑动确认组件 -->
    <div ref="slideTrack" class="absolute inset-0 flex items-center justify-center">
      <div
        ref="track"
        class="relative w-full h-10 bg-gray-50/80 rounded-full overflow-hidden shadow-inner border border-gray-100"
        @mousedown="startSlide"
        @touchstart="startSlide"
        @mousemove="moveSlide"
        @touchmove="moveSlide"
        @mouseup="endSlide"
        @touchend="endSlide"
        @mouseleave="endSlide"
      >
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

        <div
          class="absolute inset-0 flex items-center justify-center text-gray-400 font-lxgw text-sm pointer-events-none transition-opacity duration-200"
          :class="{ 'opacity-0': position > 20 }"
        >
          滑动确认接受邀请
        </div>
      </div>
    </div>

    <!-- 确认状态组件 -->
    <div
      ref="confirmStatus"
      class="absolute inset-0 flex items-center justify-center"
      style="opacity: 0; visibility: hidden"
    >
      <div class="flex items-center justify-center gap-3">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="@/assets/images/avatar-2.jpg"
            alt="Meng's avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 text-sm text-gray-600 font-lxgw whitespace-nowrap">
          <div class="flex items-center gap-2">
            <span class="text-rose-400">Meng Baby</span>
            <span>has accepted</span>
            <span class="text-indigo-400">Mr. Dylan's</span>
            <span>invitation</span>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="@/assets/images/avatar-1.jpg"
            alt="Dylan's avatar"
            class="w-full h-full object-cover"
          />
        </div>
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
const slideTrack = ref(null)
const confirmStatus = ref(null)

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
  position.value = Math.max(0, Math.min(maxPosition.value, position.value + diff))
  startX.value = currentX

  if (position.value >= maxPosition.value * 0.95) {
    position.value = maxPosition.value
    handleConfirm()
    endSlide()
  }
}

const endSlide = () => {
  if (!sliding.value) return

  sliding.value = false
  document.removeEventListener('mousemove', moveSlide)
  document.removeEventListener('mouseup', endSlide)

  if (position.value < maxPosition.value * 0.95) {
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

const handleConfirm = async () => {
  try {
    // 确保元素存在
    if (!slideTrack.value || !confirmStatus.value) return

    // 1. 先将确认状态组件设置为可见，但保持透明
    confirmStatus.value.style.visibility = 'visible'
    confirmStatus.value.style.opacity = '0'
    confirmStatus.value.style.transform = 'translateY(10px) scale(0.95)'

    // 2. 滑动条淡出动画
    slideTrack.value.style.transition = 'all 0.3s ease-out'
    slideTrack.value.style.opacity = '0'
    slideTrack.value.style.transform = 'translateY(-10px) scale(0.95)'

    // 等待滑动条动画完成
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 3. 隐藏滑动条
    slideTrack.value.style.visibility = 'hidden'

    // 4. 确认状态淡入动画
    confirmStatus.value.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    confirmStatus.value.style.opacity = '1'
    confirmStatus.value.style.transform = 'translateY(0) scale(1)'

    // 等待确认状态动画完成
    await new Promise((resolve) => setTimeout(resolve, 400))

    emit('confirm')
  } catch (error) {
    console.error('Animation error:', error)
    emit('confirm')
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

.relative {
  touch-action: none;
}

/* 添加基础过渡样式 */
#slideTrack,
#confirmStatus {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* 移除之前的过渡样式 */
.slide-enter-active,
.slide-leave-active,
.slide-enter-from,
.slide-leave-to {
  display: none;
}
</style>
