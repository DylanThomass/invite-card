import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'

export const useInviteStore = defineStore('invite', () => {
  const currentStep = ref(0)
  const slideProgress = ref(0)
  const showConfetti = ref(false)

  const setCurrentStep = (step) => {
    currentStep.value = step
    if (step !== 2) {
      slideProgress.value = 0
    }
  }

  const setSlideProgress = (progress) => {
    slideProgress.value = Math.max(0, Math.min(1, progress))
  }

  const triggerConfetti = () => {
    showConfetti.value = false
    nextTick(() => {
      showConfetti.value = true
      setTimeout(() => {
        showConfetti.value = false
      }, 3000)
    })
  }

  return {
    currentStep,
    slideProgress,
    showConfetti,
    setCurrentStep,
    setSlideProgress,
    triggerConfetti,
  }
})
