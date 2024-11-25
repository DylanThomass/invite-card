<template>
  <div class="invite-page">
    <!-- 背景层 -->
    <div class="fixed inset-0">
      <!-- 静态背景 始终显示 -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100"></div>

      <!-- 动态背景 -->
      <div class="background-wrapper">
        <div
          v-for="(bg, index) in backgrounds"
          :key="index"
          class="background-item"
          :style="{
            zIndex: index,
            clipPath: `inset(0 ${currentStep > index ? '100%' : '0'} 0 ${currentStep < index ? '100%' : '0'})`,
          }"
        >
          <img
            :src="bg"
            class="w-full h-full object-cover"
            :style="{
              transform: `scale(${currentStep === index ? '1' : '1.1'})`,
            }"
            alt="background"
          />
        </div>
      </div>
    </div>

    <!-- 内容层 -->
    <div class="relative z-10 min-h-screen flex items-center justify-center">
      <InviteCard @step-change="handleStepChange" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InviteCard from '@/components/InviteCard.vue'

// 导入 SVG 背景
import bg1 from '@/assets/svg/bg-1.svg?url'
import bg2 from '@/assets/svg/bg-2.svg?url'
import bg3 from '@/assets/svg/bg-3.svg?url'

const backgrounds = [bg1, bg2, bg3]
const currentStep = ref(0)

const handleStepChange = (step) => {
  currentStep.value = step
}
</script>

<style lang="scss" scoped>
.invite-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.background-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.background-item {
  position: absolute;
  inset: 0;
  overflow: hidden;
  will-change: clip-path;
  transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center;
    will-change: transform;
    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.2),
      transparent 10%,
      transparent 90%,
      rgba(0, 0, 0, 0.2)
    );
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  &:not(.active) {
    &::after {
      opacity: 1;
    }
  }
}
</style>
