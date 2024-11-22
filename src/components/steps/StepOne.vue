<template>
  <div class="flex flex-col items-center">
    <!-- 主标题区域 -->
    <div class="text-center mb-2">
      <div class="flex items-center justify-center gap-3">
        <font-awesome-icon icon="heart" class="text-rose-400/80 text-xl" />
        <h1 class="text-2xl font-bold mb-1">浪漫冒险邀请函</h1>
        <font-awesome-icon icon="heart" class="text-rose-400/80 text-xl" />
      </div>
      <div class="text-sm text-gray-500">Romantic Adventure Invitation</div>
    </div>

    <!-- 分割线 1 - 调整为与标题文字相近的宽度 -->
    <div class="w-[280px] h-[1px] bg-gray-200 my-2"></div>

    <!-- 副标题 -->
    <div class="text-gray-600 text-lg mb-4 font-lxgw">
      和我一起进行一场浪漫的冒险吧
      <span class="ml-2 text-gray-500">——Dylan</span>
    </div>

    <!-- 分割线 2 - 修改宽度 -->
    <div class="w-[320px] h-[1px] bg-gray-200 mb-4"></div>

    <!-- 信息区域：使用grid布局实现左右排列 -->
    <div class="grid grid-cols-2 gap-8 mb-8">
      <!-- 日期时间 -->
      <div class="flex flex-col h-full">
        <!-- 日期滚动组件容器 -->
        <div class="h-[180px] mb-3 flex items-center justify-end">
          <div class="flex items-center">
            <!-- 年份 -->
            <div class="flex items-center">
              <number-wheel :value="2024" :duration="3000" :is-year="true" :start-year="2015" />
              <span class="mx-1">年</span>
            </div>

            <!-- 月份 -->
            <div class="flex items-center">
              <number-wheel :value="11" :duration="3500" :is-month="true" />
              <span class="mx-1">月</span>
            </div>

            <!-- 日期 -->
            <div class="flex items-center">
              <number-wheel :value="23" :duration="4000" />
              <span class="mx-1">日</span>
            </div>
          </div>
        </div>

        <!-- 标题部分 -->
        <div class="flex items-center justify-center gap-2">
          <font-awesome-icon icon="calendar" class="text-lg text-violet-400/80" />
          <span class="text-lg">出行日期</span>
          <span class="text-gray-300 mx-2 text-lg leading-none">|</span>
          <span class="text-gray-500 text-lg leading-none">风和日丽的周六</span>
        </div>
      </div>

      <!-- 出行方式区域 -->
      <div class="flex flex-col h-full">
        <!-- 3D模型容器 -->
        <div class="h-[180px] mb-3">
          <CarModel />
        </div>

        <!-- 标题部分 -->
        <div class="flex items-center justify-center gap-2">
          <font-awesome-icon icon="car" class="text-lg text-indigo-400/80" />
          <span class="text-lg">驾车出行</span>
          <span class="text-gray-300 mx-2 text-lg leading-none">|</span>
          <span class="text-gray-500 text-lg leading-none">Volvo XC90</span>
        </div>
      </div>
    </div>

    <!-- 分割线 3 - 调整为与尾缀文字相近的宽度 -->
    <div class="w-[200px] h-[1px] bg-gray-200 mb-4"></div>

    <!-- 尾缀部分 -->
    <div class="flex items-center justify-center gap-2">
      <font-awesome-icon icon="pen-fancy" class="text-amber-400/80" />
      <div class="text-gray-500 text-sm">Invited & Made by Dylan</div>
      <!-- 头像更新 -->
      <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
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
import { ref, onMounted } from 'vue'
import NumberWheel from '../NumberWheel.vue'
import CarModel from '../CarModel.vue'

// 如果需要动画效果，可以使用 ref 控制数值的变化
const year = ref(2020)
const month = ref(1)
const day = ref(1)

// 在组件挂载后启动动画
onMounted(() => {
  setTimeout(() => {
    year.value = 2024
    setTimeout(() => {
      month.value = 11
      setTimeout(() => {
        day.value = 23
      }, 200)
    }, 200)
  }, 0)
})
</script>

<style scoped>
/* 可以添加分割线的渐变效果 */
.h-[1px] {
  background: linear-gradient(to right, transparent, #e5e7eb 50%, transparent);
}

/* 添加数字动画相关样式 */
:deep(.number-animation) {
  @apply text-lg font-bold;
  min-width: 2ch;
  text-align: center;
}

/* 添加字体样式 */
.font-lxgw {
  font-family: 'LXGW Bright Medium';
}
</style>
