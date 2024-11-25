<template>
  <canvas ref="canvas" class="confetti-canvas" :style="{ opacity: active ? 1 : 0 }"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
  originY: {
    type: Number,
    default: 0,
  },
})

const canvas = ref(null)
let ctx = null
let animationFrame = null
let particles = []

const colors = ['#FF69B4', '#4169E1', '#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#2ECC71']

class Particle {
  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.angle = angle
    this.speed = 15 + Math.random() * 10
    this.gravity = 0.25
    this.friction = 0.98
    this.rotationSpeed = (Math.random() - 0.5) * 0.3
    this.rotation = Math.random() * Math.PI * 2
    this.velocityX = Math.cos(angle) * this.speed
    this.velocityY = Math.sin(angle) * this.speed
    this.alpha = 1
    this.decay = 0.005 + Math.random() * 0.002
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.width = 5 + Math.random() * 4
    this.height = 5 + Math.random() * 4
  }

  update() {
    this.velocityX *= this.friction
    this.velocityY *= this.friction
    this.velocityY += this.gravity
    this.x += this.velocityX
    this.y += this.velocityY
    this.rotation += this.rotationSpeed
    this.alpha -= this.decay
    return this.alpha > 0
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    ctx.restore()
  }
}

const createConfetti = (x, y, count = 30) => {
  for (let i = 0; i < count; i++) {
    const baseAngle =
      props.position === 'left' ? -Math.PI / 2 - Math.PI / 6 : -Math.PI / 2 + Math.PI / 6

    const angle = baseAngle + ((Math.random() - 0.5) * Math.PI) / 2
    particles.push(new Particle(x, y, angle))
  }
}

const animate = () => {
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles = particles.filter((particle) => {
    if (
      particle.x < -50 ||
      particle.x > canvas.value.width + 50 ||
      particle.y > canvas.value.height + 50
    ) {
      return false
    }

    const isAlive = particle.update()
    if (isAlive) {
      particle.draw(ctx)
    }
    return isAlive
  })

  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(animate)
  }
}

const resizeCanvas = () => {
  if (!canvas.value) return
  canvas.value.width = canvas.value.offsetWidth
  canvas.value.height = canvas.value.offsetHeight
}

watch(
  () => props.active,
  (newValue) => {
    if (newValue) {
      const x = props.position === 'left' ? canvas.value.width * 0.05 : canvas.value.width * 0.95
      const centerY = canvas.value.height * 0.8

      const createBurst = () => {
        for (let i = 0; i < 3; i++) {
          const xOffset = (Math.random() - 0.5) * 40
          const yOffset = (Math.random() - 0.5) * 20
          createConfetti(x + xOffset, centerY + yOffset, 30)
        }
      }

      createBurst()

      for (let i = 1; i <= 3; i++) {
        setTimeout(createBurst, i * 300)
      }

      animate()
    }
  },
)

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.confetti-canvas {
  pointer-events: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}
</style>
