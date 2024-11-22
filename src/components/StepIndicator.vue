<template>
  <div class="flex items-center justify-center gap-3 py-4">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="relative cursor-pointer"
      @click="$emit('update:currentStep', index)"
    >
      <div
        class="w-10 h-10 rounded-full overflow-hidden transition-all duration-300 border-2"
        :class="[
          index === currentStep ? 'border-blue-500 scale-110' : 'border-gray-200 opacity-60',
        ]"
      >
        <img :src="step.image" :alt="step.title" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
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
        image: '/images/step1.png',
      },
      {
        title: '活动详情',
        image: '/images/step2.png',
      },
      {
        title: '确认信息',
        image: '/images/step3.png',
      },
    ],
  },
})

defineEmits(['update:currentStep'])
</script>
