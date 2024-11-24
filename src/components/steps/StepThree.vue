<template>
  <div>
    <!-- 艺术感标题 -->
    <div class="flex items-center justify-center mb-6">
      <div class="relative">
        <h2 class="text-2xl font-lxgw text-gray-800">
          <span class="text-indigo-500">✦</span>
          邀请函确认
          <span class="text-rose-400">✦</span>
        </h2>
        <div
          class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        ></div>
      </div>
    </div>

    <!-- 将基础信息和路线信息改为左右布局 -->
    <div class="grid grid-cols-2 gap-2 mb-1">
      <!-- 基础信息部分 -->
      <div class="relative p-4">
        <!-- 内容区域 -->
        <div class="relative space-y-5">
          <!-- 活动名称 -->
          <div class="flex items-center gap-4 group">
            <div
              class="w-2.5 h-2.5 rotate-45 bg-indigo-400 group-hover:rotate-90 transition-transform duration-300"
            ></div>
            <div class="font-lxgw">
              <span class="text-gray-800 text-xl">浪漫的冒险</span>
              <span class="ml-2 text-gray-400 text-base">Adventure of Love</span>
            </div>
          </div>

          <!-- 时间信息 -->
          <div class="flex items-center gap-4 group">
            <div
              class="w-2.5 h-2.5 transform rotate-45 bg-rose-400 group-hover:rotate-90 transition-transform duration-300"
            ></div>
            <div class="font-lxgw">
              <span class="text-gray-800 text-lg">春日晨光 · </span>
              <span class="text-gray-600">2024年3月20日 09:30</span>
            </div>
          </div>

          <!-- 天气状况 -->
          <div class="flex items-center gap-4 group">
            <div
              class="w-2.5 h-2.5 transform rotate-45 bg-amber-400 group-hover:rotate-90 transition-transform duration-300"
            ></div>
            <div class="font-lxgw">
              <span class="text-gray-800 text-lg">春光正好 · </span>
              <span class="text-gray-600">阳光明媚 微风轻拂</span>
            </div>
          </div>

          <!-- 路途总览 -->
          <div class="flex items-center gap-4 group">
            <div
              class="w-2.5 h-2.5 transform rotate-45 bg-emerald-400 group-hover:rotate-90 transition-transform duration-300"
            ></div>
            <div class="font-lxgw">
              <span class="text-gray-800 text-lg">山海之约 · </span>
              <span class="text-gray-600">穿越山林 漫步海边</span>
            </div>
          </div>

          <!-- 活动内容 -->
          <div class="flex items-center gap-4 group">
            <div
              class="w-2.5 h-2.5 transform rotate-45 bg-violet-400 group-hover:rotate-90 transition-transform duration-300"
            ></div>
            <div class="font-lxgw">
              <span class="text-gray-800 text-lg">浪漫寻踪 · </span>
              <span class="text-gray-600">寻找属于我们的惊喜</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 路线信息部分改为 happy svg -->
      <div class="relative p-4 flex items-center justify-center">
        <img :src="happySvg" alt="happy face" class="w-48 h-48" />
      </div>
    </div>

    <!-- 其他信息部分 -->
    <div class="p-4">
      <!-- 其他信息标题 -->
      <div class="flex items-center gap-4 mb-4">
        <div class="w-2.5 h-2.5 rotate-45 bg-rose-400"></div>
        <h3 class="font-lxgw text-lg text-gray-800">出行详情</h3>
      </div>

      <!-- 信息列表 -->
      <div class="grid grid-cols-3 gap-6">
        <div class="text-center p-4 rounded-lg bg-gray-50 group">
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="car"
              class="text-indigo-400 group-hover:scale-110 transition-transform duration-300"
            />
            <span class="font-lxgw">交通方式</span>
          </div>
          <div class="text-gray-700 font-lxgw">自驾</div>
        </div>
        <div class="text-center p-4 rounded-lg bg-gray-50 group">
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="users"
              class="text-rose-400 group-hover:scale-110 transition-transform duration-300"
            />
            <span class="font-lxgw">活动人数</span>
          </div>
          <div class="text-gray-700 font-lxgw">2人</div>
        </div>
        <div class="text-center p-4 rounded-lg bg-gray-50 group">
          <div class="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <font-awesome-icon
              icon="heart"
              class="text-amber-400 group-hover:scale-110 transition-transform duration-300"
            />
            <span class="font-lxgw">邀请对象</span>
          </div>
          <div class="text-gray-700 font-lxgw">蒙蒙宝宝</div>
        </div>
      </div>
    </div>

    <!-- 底部滑动确认 -->
    <div class="mt-2">
      <SlideToConfirm @confirm="handleConfirm" />
    </div>
  </div>
</template>

<script setup>
import SlideToConfirm from '../SlideToConfirm.vue'
import happySvg from '@/assets/svg/happy.svg?url'

const handleConfirm = () => {
  console.log('邀请已接受')
  // 处理确认逻辑
}
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
