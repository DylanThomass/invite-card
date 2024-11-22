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
      <div class="relative h-[280px] rounded-lg overflow-hidden">
        <div class="absolute inset-0">
          <!-- 轮播图片容器 -->
          <div class="carousel-container h-full">
            <LocationCard v-if="currentLocation" :location="currentLocation" />
          </div>
        </div>
      </div>

      <!-- 右侧：地图区域和活动列表 -->
      <div class="flex flex-col gap-2">
        <!-- 地图容器 - 调整高度 -->
        <div class="relative h-[240px] rounded-lg overflow-hidden">
          <!-- 艺术化的地图标题 -->
          <div
            class="absolute top-3 left-3 z-10 flex items-center gap-2.5 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
          >
            <font-awesome-icon icon="paint-brush" class="text-rose-400" />
            <font-awesome-icon icon="compass" class="text-indigo-400" />
            <span class="font-lxgw text-gray-700">艺术漫步指南</span>
          </div>
          <RouteMap
            :points="routePoints"
            :path-data="routePath"
            @point-click="handleRoutePointClick"
          />
        </div>

        <!-- 活动列表组件 -->
        <ActivityList
          :location-name="currentLocation?.name"
          :activities="currentLocation?.activities || []"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import RouteMap from '../map/RouteMap.vue'
import ActivityList from '../ActivityList.vue'
import LocationCard from '../LocationCard.vue'

// 当前选中的位置
const currentLocation = ref(null)

// 路线数据
// 路线数据
const routePoints = reactive([
  {
    x: 50,
    y: 140,
    name: '御宸上院',
    description: '我们的旅程从这里开始',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [{ name: '接上小可爱', icon: 'heart', description: '开启浪漫之旅' }],
  },
  {
    x: 100,
    y: 80,
    name: '宋庄艺术小镇',
    description: '充满艺术气息的文艺街区',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [
      { name: '漫步街区', icon: 'person-walking', description: '感受艺术氛围' },
      { name: '文艺逛街', icon: 'store', description: '探索特色小店' },
    ],
  },
  {
    x: 150,
    y: 160,
    name: '艺术科技文创园',
    visited: false,
    labelX: -20,
    labelY: 20,
    activities: [
      { name: '欣赏艺术', icon: 'palette', description: '欣赏艺术作品' },
      { name: '打卡拍照', icon: 'camera', description: '打卡拍照' },
    ],
  },
  {
    x: 200,
    y: 100,
    name: '小堡文化广场',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [
      { name: '品尝美食', icon: 'utensils', description: '品尝美食' },
      { name: '休闲咖啡', icon: 'coffee', description: '品尝咖啡' },
      { name: '学习Python', icon: 'code', description: '学习Python' },
    ],
  },
  {
    x: 250,
    y: 140,
    name: '树美术馆',
    visited: false,
    labelX: -20,
    labelY: 20,
    activities: [
      { name: '观赏展览', icon: 'image', description: '观赏展览' },
      { name: '艺术交流', icon: 'comments', description: '艺术交流' },
      { name: '创作体验', icon: 'paint-brush', description: '创作体验' },
    ],
  },
])

// 路线路径
const routePath = 'M 50,140 L 100,80 L 150,160 L 200,100 L 250,140'

// 点击处理
const handleRoutePointClick = (index) => {
  currentLocation.value = routePoints[index]
}
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
