<template>
  <div class="flex items-center justify-center gap-4">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="relative cursor-pointer"
      @click="$emit('update:currentStep', index)"
    >
      <div
        class="rounded-full overflow-hidden transition-all duration-300 border-2 bg-white"
        :class="[
          index === currentStep
            ? 'w-14 h-14 border-blue-500 shadow-lg scale-110 z-20'
            : 'w-12 h-12 border-gray-200 opacity-60 z-10',
        ]"
      >
        <img :src="step.image" :alt="step.title" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入 SVG 图标
import indicator1 from '@/assets/svg/indicator-1.svg?url'
import indicator2 from '@/assets/svg/indicator-2.svg?url'
import indicator3 from '@/assets/svg/indicator-3.svg?url'

defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
    default: () => [
      {
        title: '基础信息',
        image: indicator1,
      },
      {
        title: '活动详情',
        image: indicator2,
      },
      {
        title: '确认信息',
        image: indicator3,
      },
    ],
  },
})

defineEmits(['update:currentStep'])
</script>

<style scoped>
.rounded-full {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
