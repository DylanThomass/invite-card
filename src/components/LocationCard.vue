<template>
  <div class="relative w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
    <!-- 上半部分：图片区域 -->
    <div class="h-1/2 min-h-[180px] bg-gray-100 flex items-center justify-center">
      <img
        :src="location.image"
        :alt="location.name"
        class="w-full h-full object-cover object-top"
      />
    </div>

    <!-- 下半部分：文字信息 -->
    <div class="flex-1 p-4">
      <!-- 地点名称 -->
      <div class="flex items-center gap-2 mb-2">
        <font-awesome-icon icon="location-dot" class="text-rose-400 text-xl" />
        <h3 class="text-2xl font-bold font-lxgw text-gray-800">
          {{ location.name }}
        </h3>
      </div>
      <!-- 描述文字 -->
      <div class="flex gap-2">
        <font-awesome-icon icon="quote-left" class="text-indigo-400 text-lg shrink-0 mt-1" />
        <p class="text-base text-gray-600 font-lxgw leading-relaxed line-clamp-3">
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
  },
})
</script>

<style scoped>
.font-lxgw {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
