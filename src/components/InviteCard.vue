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

    <!-- 卡片本体 -->
    <el-card :body-style="{ padding: 0 }" class="card-container">
      <!-- 添加步骤指示器 -->
      <StepIndicator :current-step="currentStep" :total-steps="steps.length" />

      <!-- 内容区域 -->
      <div class="content-container">
        <component :is="steps[currentStep]"></component>
      </div>
    </el-card>
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
.card-container {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
}

.content-container {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

:deep(.el-card) {
  @apply rounded-[24px] shadow-md;
}

:deep(.el-card__body) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 添加响应式样式 */
@media (max-width: 1024px) {
  .card-container {
    min-height: 500px;
  }

  .content-container {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .card-container {
    min-height: 450px;
  }

  .content-container {
    padding: 1rem 0.75rem;
  }
}
</style>
