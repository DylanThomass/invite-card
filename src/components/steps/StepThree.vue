<template>
  <div>
    <!-- 艺术感标题 -->
    <div class="flex items-center justify-center mb-8">
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

    <!-- 基础信息部分 - 更有艺术感的设计 -->
    <div
      class="relative bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-2xl p-8 mb-6 overflow-hidden"
    >
      <!-- 装饰元素 -->
      <div
        class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl"
      ></div>
      <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-rose-100/30 rounded-full blur-2xl"></div>

      <!-- 内容区域 -->
      <div class="relative space-y-6">
        <!-- 活动名称 -->
        <div class="flex items-center gap-4 group">
          <div
            class="w-2 h-2 rotate-45 bg-indigo-400 group-hover:rotate-90 transition-transform duration-300"
          ></div>
          <div class="font-lxgw">
            <span class="text-gray-800 text-lg">浪漫的冒险</span>
            <span class="ml-2 text-gray-400 text-sm">Adventure of Love</span>
          </div>
        </div>

        <!-- 时间信息 -->
        <div class="flex items-center gap-4 group">
          <div
            class="w-2 h-2 rotate-45 bg-rose-400 group-hover:rotate-90 transition-transform duration-300"
          ></div>
          <div class="font-lxgw">
            <span class="text-gray-800">春日晨光 · </span>
            <span class="text-gray-600">2024年3月20日 09:30</span>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="flex items-center gap-4 group">
          <div
            class="w-2 h-2 rotate-45 bg-emerald-400 group-hover:rotate-90 transition-transform duration-300"
          ></div>
          <div class="font-lxgw">
            <span class="text-gray-800">微信联系 · </span>
            <span class="text-gray-600">让沟通更便捷</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 路线信息部分 -->
    <div>
      <h3>行程路线</h3>
      <div v-for="(point, index) in routePoints" :key="index">
        <div>
          {{ point.name }}：
          <span v-for="(activity, actIndex) in point.activities" :key="actIndex">
            {{ activity.name }}{{ actIndex !== point.activities.length - 1 ? '、' : '' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 其他信息部分 -->
    <div>
      <h3>其他信息</h3>
      <div>
        <div>交通方式：自驾</div>
        <div>活动人数：2人</div>
        <div>邀请对象：蒙蒙宝宝</div>
      </div>
    </div>

    <!-- 底部滑动确认 -->
    <div class="mt-8 px-8">
      <SlideToConfirm @confirm="handleConfirm" />
    </div>
  </div>
</template>

<script setup>
import SlideToConfirm from '../SlideToConfirm.vue'

// 引入路线点位数据
const routePoints = [
  {
    name: '御宸上院',
    activities: [{ name: '接上小可爱', icon: 'heart' }],
  },
  {
    name: '宋庄艺术小镇',
    activities: [
      { name: '漫步街区', icon: 'person-walking' },
      { name: '文艺逛街', icon: 'store' },
    ],
  },
  {
    name: '艺术科技文创园',
    activities: [
      { name: '欣赏艺术', icon: 'palette' },
      { name: '打卡拍照', icon: 'camera' },
    ],
  },
  {
    name: '小堡文化广场',
    activities: [
      { name: '品尝美食', icon: 'utensils' },
      { name: '休闲咖啡', icon: 'coffee' },
      { name: '学习Python', icon: 'code' },
    ],
  },
  {
    name: '树美术馆',
    activities: [
      { name: '观赏展览', icon: 'image' },
      { name: '艺术交流', icon: 'comments' },
      { name: '创作体验', icon: 'paint-brush' },
    ],
  },
]

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
