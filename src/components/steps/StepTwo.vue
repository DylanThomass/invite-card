<template>
  <div>
    <!-- 标题区域 -->
    <div class="text-center mb-6">
      <!-- 主标题 -->
      <div class="flex items-center justify-center gap-3">
        <font-awesome-icon icon="palette" class="text-indigo-400/80 text-xl" />
        <h2 class="text-2xl font-bold font-lxgw">诗意栖居 · 艺术之旅</h2>
        <font-awesome-icon icon="palette" class="text-indigo-400/80 text-xl" />
      </div>

      <!-- 英文副标 -->
      <div class="text-sm text-gray-500 mt-1">Poetic Journey Through Art</div>

      <!-- 宋庄相关信息 -->
      <div class="text-gray-600 text-lg mt-3 font-lxgw">
        宋庄艺术区漫步
        <span class="text-gray-400 mx-2">|</span>
        艺术家的乌托邦
      </div>
    </div>

    <!-- 装饰分割线 -->
    <div
      class="w-[280px] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mb-6"
    ></div>

    <!-- 主要内容区域：两栏布局 -->
    <div class="grid grid-cols-2 gap-4 px-4">
      <!-- 左侧：轮播区域 -->
      <div class="relative h-[280px] rounded-lg bg-gray-50/50 overflow-hidden">
        <!-- 轮播组件将在这里实现 -->
        <div class="absolute inset-0">
          <!-- 轮播图片容器 -->
          <div class="carousel-container">
            <!-- 轮播内容将在这里动态生成 -->
          </div>

          <!-- 轮播控制器 -->
          <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            <!-- 轮播指示器将在这里生成 -->
          </div>
        </div>
      </div>

      <!-- 右侧：地图区域 -->
      <div class="relative h-[280px] rounded-lg overflow-hidden">
        <!-- 添加地图标题 -->
        <div
          class="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm"
        >
          <font-awesome-icon icon="map-location-dot" class="text-emerald-500" />
          <span class="font-lxgw text-gray-700">艺术区导览图</span>
        </div>
        <RouteMap
          :points="routePoints"
          :path-data="routePath"
          @point-click="handleRoutePointClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import RouteMap from '../map/RouteMap.vue'

// 路线数据
const routePoints = reactive([
  {
    x: 50,
    y: 140,
    name: '御宸上院',
    visited: false,
    labelX: -20,
    labelY: -10,
  },
  {
    x: 100,
    y: 80,
    name: '宋庄艺术小镇',
    visited: false,
    labelX: -20,
    labelY: -10,
  },
  {
    x: 150,
    y: 160,
    name: '艺术科技文创园',
    visited: false,
    labelX: -20,
    labelY: 20,
  },
  {
    x: 200,
    y: 100,
    name: '小堡文化广场',
    visited: false,
    labelX: -20,
    labelY: -10,
  },
  {
    x: 250,
    y: 140,
    name: '树美术馆',
    visited: false,
    labelX: -20,
    labelY: 20,
  },
])

// 路线路径
const routePath = 'M 50,140 L 100,80 L 150,160 L 200,100 L 250,140'

// 点击处理
const handleRoutePointClick = (index) => {
  // 处理点击事件
  console.log('点击了路线点:', index)
}
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
