<template>
  <div class="relative w-[90%] max-w-[780px] mx-auto">
    <!-- 导航按钮 -->
    <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12" v-if="currentStep > 0">
      <el-button @click="prevStep">上一步</el-button>
    </div>
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12"
      v-if="currentStep < steps.length - 1"
    >
      <el-button @click="nextStep">下一步</el-button>
    </div>

    <!-- 步骤指示器 - 调整位置和层级 -->
    <div class="relative">
      <StepIndicator
        :current-step="currentStep"
        :steps="steps"
        class="absolute -top-7 left-0 right-0 z-30"
      />

      <!-- 卡片本体 - 移除固定高度 -->
      <el-card :body-style="{ padding: 0 }" class="rounded-[24px] shadow-md">
        <!-- 内容区域 - 移除固定高度，保留内边距 -->
        <div class="p-6">
          <component :is="steps[currentStep]"></component>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StepOne from './steps/StepOne.vue'
import StepTwo from './steps/StepTwo.vue'
import StepThree from './steps/StepThree.vue'
import StepIndicator from './StepIndicator.vue'

const currentStep = ref(0)
const steps = [StepOne, StepTwo, StepThree]

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
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
