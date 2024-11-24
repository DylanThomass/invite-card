<template>
  <div v-if="activities.length">
    <div class="rounded-lg p-4">
      <div class="flex items-center gap-2 mb-3">
        <font-awesome-icon icon="location-dot" class="text-rose-400" />
        <span class="font-lxgw text-gray-700">{{ locationName }}</span>
      </div>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class="flex items-center gap-2 text-gray-600 transition-colors hover:text-indigo-500"
        >
          <font-awesome-icon :icon="activity.icon" />
          <span class="font-lxgw">{{ activity.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  locationName: {
    type: String,
    default: '',
  },
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>
