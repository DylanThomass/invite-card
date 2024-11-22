<template>
  <div class="relative w-full h-full bg-white rounded-lg overflow-hidden">
    <!-- 上半部分：图片区域 -->
    <div class="h-3/5 bg-gray-100">
      <!-- 这里后续会放置图片 -->
    </div>

    <!-- 下半部分：文字信息 -->
    <div class="h-2/5 p-4">
      <!-- 地点名称 -->
      <div class="flex items-center gap-2 mb-3">
        <font-awesome-icon icon="location-dot" class="text-rose-400 text-xl" />
        <h3 class="text-2xl font-bold font-lxgw text-gray-800">
          {{ location.name }}
        </h3>
      </div>
      <!-- 描述文字 -->
      <div class="flex gap-2">
        <font-awesome-icon icon="quote-left" class="text-indigo-400 text-lg shrink-0 mt-1" />
        <p class="text-base text-gray-600 font-lxgw leading-relaxed line-clamp-4">
          {{ location.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      description: '',
    }),
  },
})
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
