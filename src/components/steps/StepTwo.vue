<template>
  <div class="relative">
    <!-- 添加绘画背景 SVG - 左上角 (添加 -scale-x-100 实现水平翻转) -->
    <div class="absolute top-0 left-0">
      <img :src="drawSvg" alt="Draw" class="w-48 h-48 -scale-x-100" />
    </div>

    <!-- 添加爵士背景 SVG - 右下角 -->
    <div class="absolute bottom-0 right-0 opacity-30">
      <img :src="jazzSvg" alt="Jazz" class="w-48 h-48" />
    </div>

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
    <div class="grid grid-cols-2 gap-4 px-4 relative">
      <!-- 左侧：轮播区域 -->
      <div class="flex flex-col gap-2">
        <div class="h-full">
          <LocationCard v-if="currentLocation" :location="currentLocation" />
        </div>
      </div>

      <!-- 右侧：地图区域和活动列表 -->
      <div class="flex flex-col gap-2">
        <!-- 地图容器 -->
        <div class="relative h-[240px] rounded-lg overflow-hidden">
          <!-- 艺术化的地图标题 -->
          <div
            class="absolute top-3 left-3 z-10 flex items-center gap-2.5 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
          >
            <font-awesome-icon icon="paint-brush" class="text-rose-400" />
            <span class="font-lxgw text-gray-700">艺术漫步指南</span>
          </div>
          <RouteMap
            :points="routePoints"
            :path-data="routePath"
            :current-index="currentIndex"
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
import { reactive, ref, onMounted } from 'vue'
import RouteMap from '../map/RouteMap.vue'
import ActivityList from '../ActivityList.vue'
import LocationCard from '../LocationCard.vue'
import jazzSvg from '@/assets/svg/jazz.svg?url'
import drawSvg from '@/assets/svg/draw.svg?url'

// 当前选中的索引
const currentIndex = ref(0)

// 当前选中的位置
const currentLocation = ref(null)

// 路线数据
const routePoints = reactive([
  {
    x: 50,
    y: 140,
    name: '御宸上院',
    description:
      '每一段美好旅程的起点，都始于心动的瞬间。在这里，我们相遇，准备踏上诗意的漫步之旅。',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [{ name: '接上小可爱', icon: 'heart' }],
  },
  {
    x: 100,
    y: 80,
    name: '宋庄艺术小镇',
    description:
      '漫步在这片充满艺术气息的街区，每一个转角都可能遇见惊喜。斑驳的墙面上是艺术家们留下的印记。',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [
      { name: '漫步街区', icon: 'person-walking' },
      { name: '文艺逛街', icon: 'store' },
    ],
  },
  {
    x: 150,
    y: 160,
    name: '艺术科技文创园',
    description:
      '在这里，传统艺术与现代科技完美融合。每一处展览都是一场跨越时空的对话，让我们一起探索艺术的魅力。',
    visited: false,
    labelX: -20,
    labelY: 20,
    activities: [
      { name: '欣赏艺术', icon: 'palette' },
      { name: '打卡拍照', icon: 'camera' },
    ],
  },
  {
    x: 200,
    y: 100,
    name: '小堡文化广场',
    description:
      '这里是艺术与生活的完美交汇处。品一杯香醇的咖啡，沉浸在艺术的氛围中，让灵感在此刻绽放。',
    visited: false,
    labelX: -20,
    labelY: -10,
    activities: [
      { name: '品尝美食', icon: 'utensils' },
      { name: '休闲咖啡', icon: 'coffee' },
      { name: '学习Python', icon: 'code' },
    ],
  },
  {
    x: 250,
    y: 140,
    name: '树美术馆',
    description:
      '走进这座充满生命力的美术馆，仿佛步入一片艺术的森林。每一件展品都是一个故事，每一面墙都是一次心灵的对话。',
    visited: false,
    labelX: -20,
    labelY: 20,
    activities: [
      { name: '观赏展览', icon: 'image' },
      { name: '艺术交流', icon: 'comments' },
      { name: '创作体验', icon: 'paint-brush' },
    ],
  },
])

// 路线路径
const routePath = 'M 50,140 L 100,80 L 150,160 L 200,100 L 250,140'
onMounted(() => {
  currentLocation.value = routePoints[0]
})

// 点击处理
const handleRoutePointClick = (index) => {
  currentIndex.value = index
  currentLocation.value = routePoints[index]
}
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
