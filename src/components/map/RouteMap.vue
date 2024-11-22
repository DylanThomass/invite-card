<template>
  <div class="relative h-full w-full">
    <svg class="w-full h-full" viewBox="0 0 300 200">
      <!-- 添加3D效果的底层阴影路径 -->
      <path
        :d="generatePath(points)"
        class="path-shadow"
        fill="none"
        stroke="#CBD5E1"
        stroke-width="2"
        transform="translate(2, 2)"
        opacity="0.2"
      />

      <!-- 未访问的路线 -->
      <path
        :d="generatePath(points)"
        class="path-unvisited"
        stroke-dasharray="4,4"
        fill="none"
        stroke="#E2E8F0"
        stroke-width="2"
      />

      <!-- 已访问的路线 -->
      <path
        :d="generatePath(points)"
        :stroke-dasharray="pathTotalLength"
        :stroke-dashoffset="pathOffset"
        fill="none"
        stroke="#818CF8"
        stroke-width="2"
        class="path-visited"
      />

      <!-- 路线节点 -->
      <template v-for="(point, index) in points" :key="index">
        <g
          :transform="`translate(${point.x}, ${point.y})`"
          @click="handlePointClick(index)"
          class="cursor-pointer node-group"
        >
          <circle
            r="6"
            :class="[
              'node-circle transition-all duration-300',
              currentIndex >= index ? 'fill-indigo-500' : 'fill-gray-300',
            ]"
          />
          <text
            :x="0"
            :y="-12"
            class="text-[10px] fill-gray-600 font-lxgw select-none pointer-events-none"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            {{ point.name }}
          </text>
        </g>
      </template>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['point-click'])

const currentIndex = ref(0)
const pathTotalLength = ref(0)
const pathOffset = ref(0)
const pathSegmentLengths = ref([])

const generatePath = (points) => {
  if (!points || points.length < 2) return ''

  let path = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = prev.x + (curr.x - prev.x) / 2

    if (curr.x > prev.x) {
      // 向右移动
      path += ` L ${prev.x} ${prev.y - 10}` // 先向上
      path += ` L ${midX} ${prev.y - 10}` // 再向右
      path += ` L ${midX} ${curr.y}` // 再向上/下到目标点高度
      path += ` L ${curr.x} ${curr.y}` // 最后向右到目标点
    } else {
      // 向左移动
      path += ` L ${prev.x} ${prev.y + 10}` // 先向下
      path += ` L ${midX} ${prev.y + 10}` // 再向左
      path += ` L ${midX} ${curr.y}` // 再向上/下到目标点高度
      path += ` L ${curr.x} ${curr.y}` // 最后向左到目标点
    }
  }

  return path
}

onMounted(() => {
  const path = document.querySelector('.path-visited')
  if (path) {
    const totalLength = path.getTotalLength()
    pathTotalLength.value = totalLength
    pathOffset.value = totalLength // 初始状态完全隐藏

    // 计算每个点对应的路径长度
    let accumulatedLength = 0
    pathSegmentLengths.value = props.points.map((_, index) => {
      if (index === 0) return 0

      // 获取当前点的精确路径长度
      const point = props.points[index]
      let currentLength = 0

      // 遍历路径找到最接近目标点的位置
      for (let i = 0; i <= totalLength; i += 1) {
        const pos = path.getPointAtLength(i)
        if (Math.abs(pos.x - point.x) < 1 && Math.abs(pos.y - point.y) < 1) {
          currentLength = i
          break
        }
      }

      return currentLength
    })
  }
})

const handlePointClick = (index) => {
  currentIndex.value = index

  // 更新路径显示
  if (index === 0) {
    pathOffset.value = pathTotalLength.value // 完全隐藏路径
  } else {
    const segmentLength = pathSegmentLengths.value[index]
    pathOffset.value = pathTotalLength.value - segmentLength // 显示到当前点的路径
  }

  emit('point-click', index)
}
</script>

<style scoped>
.path-visited {
  transition: stroke-dashoffset 0.8s ease;
}

.path-shadow {
  filter: blur(2px);
}

.node-group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.node-group:hover .node-circle {
  r: 8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
