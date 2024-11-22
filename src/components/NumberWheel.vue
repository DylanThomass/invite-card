<template>
  <div class="number-wheel" ref="wheelRef">
    <div class="wheel-container" :style="containerStyle">
      <div
        v-for="(num, index) in numbers"
        :key="`${num}-${index}`"
        class="wheel-item"
        :class="{
          current: isCurrentItem(index),
          adjacent: isAdjacentItem(index),
        }"
      >
        {{ formatNumber(num) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 500,
  },
  format: {
    type: Function,
    default: (num) => num,
  },
  isYear: {
    type: Boolean,
    default: false,
  },
  startYear: {
    type: Number,
    default: 2020,
  },
  isMonth: {
    type: Boolean,
    default: false,
  },
})

const wheelRef = ref(null)
const rolling = ref(false)
const currentTranslateY = ref(0)

// 生成数字序列
const numbers = computed(() => {
  if (props.isYear) {
    const years = []
    const endYear = new Date().getFullYear() + 5
    for (let year = props.startYear; year <= endYear; year++) {
      years.push(year)
    }
    return years
  } else if (props.isMonth) {
    const months = []
    for (let month = 1; month <= 12; month++) {
      months.push(month.toString().padStart(2, '0'))
    }
    return months
  } else {
    const days = []
    for (let day = 1; day <= 31; day++) {
      days.push(day.toString().padStart(2, '0'))
    }
    return days
  }
})

const containerStyle = computed(() => ({
  transform: `translateY(${currentTranslateY.value}px)`,
  transition: rolling.value ? `transform ${props.duration}ms cubic-bezier(0.23, 1, 0.32, 1)` : '',
}))

const formatNumber = (num) => {
  if (typeof props.format === 'function') {
    return props.format(num)
  }
  return num
}

const startRoll = () => {
  if (rolling.value) return

  rolling.value = true
  const itemHeight = wheelRef.value.offsetHeight / 3

  const targetIndex = numbers.value.findIndex((num) => {
    const formattedValue = props.isYear ? props.value : props.value.toString().padStart(2, '0')
    return num === formattedValue
  })

  const finalPosition = -(targetIndex * itemHeight)

  currentTranslateY.value = 0

  requestAnimationFrame(() => {
    currentTranslateY.value = finalPosition
  })

  setTimeout(() => {
    rolling.value = false
  }, props.duration)
}

onMounted(() => {
  startRoll()
})

const isCurrentItem = (index) => {
  const targetIndex = numbers.value.findIndex((num) => {
    const formattedValue = props.isYear ? props.value : props.value.toString().padStart(2, '0')
    return num === formattedValue
  })
  return index === targetIndex
}

const isAdjacentItem = (index) => {
  const targetIndex = numbers.value.findIndex((num) => {
    const formattedValue = props.isYear ? props.value : props.value.toString().padStart(2, '0')
    return num === formattedValue
  })
  return Math.abs(index - targetIndex) === 1
}
</script>

<style scoped>
.number-wheel {
  height: 120px;
  overflow: hidden;
  text-align: center;
  position: relative;
  padding: 0 10px;
}

.number-wheel::before,
.number-wheel::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  pointer-events: none;
  z-index: 1;
}

.number-wheel::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

.number-wheel::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

.wheel-container {
  will-change: transform;
  padding: 40px 0;
  width: 100%;
}

.wheel-item {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
  opacity: 0.3;
  white-space: nowrap;
}

.wheel-item.current {
  color: #000;
  opacity: 1;
  transform: scale(1.1);
}

.wheel-item.adjacent {
  color: #666;
  opacity: 0.6;
  transform: scale(1.05);
}
</style>
