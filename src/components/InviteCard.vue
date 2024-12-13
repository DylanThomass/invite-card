<template>
  <div class="relative w-[90%] max-w-[780px] mx-auto">
    <!-- 左侧礼花 - 进一步向外移动 -->
    <div
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-64 w-96 h-[1000px] z-[100] pointer-events-none"
    >
      <div class="relative w-full h-full">
        <ConfettiEffect :active="store.showConfetti" position="left" class="absolute inset-0" />
      </div>
    </div>

    <!-- 右侧礼花 - 进一步向外移动 -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-64 w-96 h-[1000px] z-[100] pointer-events-none"
    >
      <div class="relative w-full h-full">
        <ConfettiEffect :active="store.showConfetti" position="right" class="absolute inset-0" />
      </div>
    </div>

    <!-- 导航按钮 - 调整 z-index -->
    <div
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-[90]"
      v-if="store.currentStep > 0"
    >
      <button
        @click="prevStep"
        class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group transition-all duration-500 ease-out hover:shadow-lg hover:scale-110 active:scale-95"
      >
        <font-awesome-icon
          icon="chevron-left"
          class="text-gray-400 group-hover:text-indigo-500 transition-all duration-500 group-hover:-translate-x-0.5"
        />
        <span
          class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-lxgw transition-all duration-300 ease-out opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
        >
          PREV
        </span>
      </button>
    </div>

    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-[90]"
      v-if="store.currentStep < steps.length - 1"
    >
      <button
        @click="nextStep"
        class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group transition-all duration-500 ease-out hover:shadow-lg hover:scale-110 active:scale-95"
      >
        <font-awesome-icon
          icon="chevron-right"
          class="text-gray-400 group-hover:text-indigo-500 transition-all duration-500 group-hover:translate-x-0.5"
        />
        <span
          class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-lxgw transition-all duration-300 ease-out opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
        >
          NEXT
        </span>
      </button>
    </div>

    <div class="relative">
      <!-- 步骤指示器 -->
      <StepIndicator
        :current-step="store.currentStep"
        class="absolute -top-7 left-0 right-0 z-30"
      />

      <!-- 卡片本体 -->
      <el-card
        :body-style="{ padding: 0 }"
        class="rounded-[24px] shadow-md overflow-hidden relative"
      >
        <div class="p-6 relative">
          <transition
            mode="out-in"
            :name="animationDirection === 'next' ? 'slide-next' : 'slide-prev'"
          >
            <div :key="store.currentStep">
              <component :is="steps[store.currentStep]"></component>
            </div>
          </transition>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInviteStore } from '@/stores/inviteStore'
import StepOne from './steps/StepOne.vue'
import StepTwo from './steps/StepTwo.vue'
import StepThree from './steps/StepThree.vue'
import StepIndicator from './StepIndicator.vue'
import ConfettiEffect from './ConfettiEffect.vue'

const store = useInviteStore()
const steps = [StepOne, StepTwo, StepThree]
const animationDirection = ref('next')

const nextStep = () => {
  if (store.currentStep < steps.length - 1) {
    animationDirection.value = 'next'
    store.setCurrentStep(store.currentStep + 1)
  }
}

const prevStep = () => {
  if (store.currentStep > 0) {
    animationDirection.value = 'prev'
    store.setCurrentStep(store.currentStep - 1)
  }
}
</script>

<style scoped>
/* 向前滑动动画 */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.3s ease-out;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 向后滑动动画 */
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

:deep(.el-card) {
  @apply rounded-[24px] shadow-md;
}

:deep(.el-card__body) {
  width: 100%;
}

/* 移除响应式高度样式 */
@media (max-width: 1024px) {
  .content-container {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: 1rem 0.75rem;
  }
}
</style>
