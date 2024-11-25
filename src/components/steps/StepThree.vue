<template>
  <div class="relative mt-8">
    <!-- 艺术感标题 -->
    <div class="flex items-center justify-center mb-4 title-group">
      <div class="relative">
        <h2 class="text-2xl font-lxgw text-gray-800 flex items-center gap-3">
          <font-awesome-icon icon="envelope-open-text" class="text-indigo-400" />
          邀请函确认
        </h2>
        <div
          class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        ></div>
      </div>
    </div>

    <!-- 基础信息和路线信息布局 -->
    <div class="grid grid-cols-2 gap-4 mb-4 content-group">
      <!-- 左侧基础信息部分 -->
      <div class="relative p-3 space-y-3 content-left">
        <!-- 活动名称 -->
        <div
          class="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon
            icon="map-marked-alt"
            class="text-indigo-400 text-lg group-hover:scale-110 transition-transform"
          />
          <div class="font-lxgw">
            <span class="text-gray-800 text-lg">浪漫的冒险</span>
            <span class="ml-2 text-gray-400 text-sm">Adventure of Love</span>
          </div>
        </div>

        <!-- 其他信息项 -->
        <div
          class="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon
            icon="clock-rotate-left"
            class="text-rose-400 text-lg group-hover:scale-110 transition-transform"
          />
          <div class="font-lxgw">
            <span class="text-gray-800 text-base">冬日晨光 · </span>
            <span class="text-gray-600">2024年11月23日 09:30</span>
          </div>
        </div>

        <!-- 后续信息项保持相同格式... -->
        <div
          class="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon
            icon="cloud-sun"
            class="text-amber-400 text-lg group-hover:scale-110 transition-transform"
          />
          <div class="font-lxgw">
            <span class="text-gray-800 text-base">冬季温暖 · </span>
            <span class="text-gray-600">阳光明媚 微风轻拂</span>
          </div>
        </div>

        <div
          class="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon
            icon="mountain-sun"
            class="text-emerald-400 text-lg group-hover:scale-110 transition-transform"
          />
          <div class="font-lxgw">
            <span class="text-gray-800 text-base">艺术之约 · </span>
            <span class="text-gray-600">穿越山林 漫步街区</span>
          </div>
        </div>

        <div
          class="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon
            icon="compass"
            class="text-violet-400 text-lg group-hover:scale-110 transition-transform"
          />
          <div class="font-lxgw">
            <span class="text-gray-800 text-base">浪漫寻踪 · </span>
            <span class="text-gray-600">寻找属于我们的惊喜</span>
          </div>
        </div>
      </div>

      <!-- 右侧图片部分 -->
      <div class="relative p-2 flex items-center justify-center content-right">
        <img
          :src="happySvg"
          alt="happy face"
          class="w-40 h-40 hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    <!-- 出行详情部分 -->
    <div class="p-3 bg-gray-50/50 rounded-xl details-group">
      <!-- 详情标题 -->
      <div class="flex items-center gap-3 mb-3">
        <font-awesome-icon icon="clipboard-list" class="text-indigo-400" />
        <h3 class="font-lxgw text-base text-gray-800">出行详情</h3>
      </div>

      <!-- 信息列表 -->
      <div class="grid grid-cols-3 gap-4">
        <!-- 卡片内部间距调整 -->
        <div
          class="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group"
        >
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="car-side"
              class="text-indigo-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-lxgw">交通方式</span>
          </div>
          <div class="text-gray-700 font-lxgw">轻松自驾</div>
        </div>

        <div
          class="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group"
        >
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="users"
              class="text-rose-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-lxgw">活动人数</span>
          </div>
          <div class="text-gray-700 font-lxgw">浪漫二人</div>
        </div>

        <div
          class="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group"
        >
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="heart"
              class="text-amber-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-lxgw">邀请对象</span>
          </div>
          <div class="text-gray-700 font-lxgw">蒙蒙宝宝</div>
        </div>
      </div>
    </div>

    <!-- 底部滑动确认 -->
    <div class="mt-4">
      <SlideToConfirm @confirm="handleConfirm" />
    </div>

    <!-- 装饰分割线 -->
    <div
      class="w-[280px] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mt-4 mb-3"
    ></div>

    <!-- 尾缀部分 -->
    <div class="flex items-center justify-center gap-2">
      <font-awesome-icon icon="feather" class="text-amber-400/80" />
      <div class="text-gray-500 text-sm">Invited & Made by Dylan</div>
      <div class="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
        <img
          src="@/assets/images/avatar-1.jpg"
          alt="Dylan's avatar"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { animate, stagger } from 'motion'
import SlideToConfirm from '../SlideToConfirm.vue'
import happySvg from '@/assets/svg/happy.svg?url'
import { useInviteStore } from '@/stores/inviteStore'

const store = useInviteStore()

// 添加动画函数
const animatePageLoad = () => {
  // 获取需要添加动画的元素
  const titleGroup = document.querySelector('.title-group')
  const contentLeft = document.querySelector('.content-left')
  const contentRight = document.querySelector('.content-right')
  const detailsGroup = document.querySelector('.details-group')
  const leftSvg = document.querySelector('.left-svg')
  const rightSvg = document.querySelector('.right-svg')

  // 背景SVG动画
  if (leftSvg && rightSvg) {
    animate(
      [leftSvg, rightSvg],
      {
        opacity: [0, 0.1],
        scale: [0.8, 1],
      },
      {
        duration: 1,
        delay: stagger(0.2),
      },
    )
  }

  // 标题动画
  if (titleGroup) {
    animate(
      titleGroup,
      {
        opacity: [0, 1],
        y: [-20, 0],
      },
      {
        duration: 0.8,
        easing: 'ease-out',
      },
    )
  }

  // 内容区域动画
  if (contentLeft && contentRight) {
    animate(
      [contentLeft, contentRight],
      {
        opacity: [0, 1],
        x: [-30, 0],
      },
      {
        duration: 0.8,
        delay: stagger(0.2),
        easing: 'ease-out',
      },
    )
  }

  // 详情区域动画
  if (detailsGroup) {
    animate(
      detailsGroup,
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        duration: 0.8,
        delay: 0.4,
        easing: 'ease-out',
      },
    )

    // 为详情卡片添加序列动画
    animate(
      '.details-group .grid > div',
      {
        opacity: [0, 1],
        scale: [0.9, 1],
      },
      {
        delay: stagger(0.1, { start: 0.5 }),
        duration: 0.5,
        easing: [0.175, 0.885, 0.32, 1.275],
      },
    )
  }
}

const handleConfirm = () => {
  console.log('邀请已接受')
  store.triggerConfetti()
}

onMounted(() => {
  animatePageLoad()
})
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}

/* 添加过渡样式 */
.content-left,
.content-right,
.details-group {
  will-change: transform, opacity;
  transform-origin: center center;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 为信息项添加悬停动画 */
.content-left > div {
  transition: all 0.3s ease;
}

.content-left > div:hover {
  transform: translateX(4px);
}
</style>
