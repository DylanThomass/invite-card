<template>
  <div class="invite-page">
    <div class="fixed inset-0">
      <!-- 静态背景 -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100"></div>

      <!-- 动态背景 -->
      <div class="background-wrapper">
        <!-- 前三个步骤背景 -->
        <div
          v-for="(bg, index) in backgrounds.slice(0, 3)"
          :key="index"
          class="background-item"
          :style="{
            zIndex: index,
            clipPath: `inset(0 ${store.currentStep > index ? '100%' : '0'} 0 ${store.currentStep < index ? '100%' : '0'})`,
          }"
        >
          <img
            :src="bg"
            class="w-full h-full object-cover"
            :style="{
              transform: `scale(${store.currentStep === index ? '1' : '1.1'})`,
            }"
            alt="background"
          />
        </div>

        <!-- 第四个背景（滑动确认背景） -->
        <div
          v-show="store.currentStep === 2"
          class="background-item slide-background"
          :style="{
            zIndex: 3,
            clipPath: `inset(0 ${100 - store.slideProgress * 100}% 0 0)`,
          }"
        >
          <img
            :src="backgrounds[3]"
            class="w-full h-full object-cover"
            :style="{
              transform: `scale(${store.slideProgress > 0 ? '1' : '1.1'})`,
            }"
            alt="background"
          />
        </div>
      </div>
    </div>

    <!-- 内容层 -->
    <div class="relative z-10 min-h-screen flex items-center justify-center">
      <InviteCard />
    </div>
  </div>
</template>

<script setup>
import { useInviteStore } from '@/stores/inviteStore'
import InviteCard from '@/components/InviteCard.vue'

import bg1 from '@/assets/svg/bg-1.svg?url'
import bg2 from '@/assets/svg/bg-2.svg?url'
import bg3 from '@/assets/svg/bg-3.svg?url'
import bg4 from '@/assets/svg/bg-4.svg?url'

const store = useInviteStore()
const backgrounds = [bg1, bg2, bg3, bg4]
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
  will-change: clip-path, transform;

  &:not(.slide-background) {
    transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center;
    will-change: transform;

    &:not(.slide-background img) {
      transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}

// 第四个背景特殊样式
.slide-background {
  will-change: clip-path;
  transition: none; // 移除过渡效果以实现实时响应

  img {
    transition: transform 0.3s ease;
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
    opacity: 0.5;
  }
}
</style>
