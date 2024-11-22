<template>
  <div ref="container" class="car-model-container w-full h-full">
    <!-- Three.js 将在这里渲染 -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 基础变量
const container = ref(null)
let scene, camera, renderer, controls, car
let animationFrameId = null

// 添加模型加载函数
const loadModel = () => {
  const loader = new GLTFLoader()

  loader.load(
    '/src/assets/model/my-car.glb', // 确保路径正确
    (gltf) => {
      car = gltf.scene
      // 继续增大模型尺寸
      car.scale.set(8, 8, 8) // 从5增加到8
      car.position.set(0, 0, 0)

      scene.add(car)

      // 调整相机视角
      const box = new THREE.Box3().setFromObject(car)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
      cameraZ *= 0.6 // 进一步减小相机距离（从0.8改为0.6）

      camera.position.set(cameraZ, cameraZ / 5, cameraZ) // 进一步降低相机高度
      camera.lookAt(center)

      controls.target.copy(center)
      controls.update()
    },
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%')
    },
    (error) => {
      console.error('Error loading model:', error)
    },
  )
}

// 初始化场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene()
  // scene.background = new THREE.Color(0xf9fafb)  // 移除背景色，保持透明

  // 创建相机
  const aspect = container.value.clientWidth / container.value.clientHeight
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(5, 3, 5)
  camera.lookAt(0, 0, 0)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // 确保背景透明
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  container.value.appendChild(renderer.domElement)

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false // 禁用缩放
  controls.autoRotate = true // 自动旋转
  controls.autoRotateSpeed = -0.8 // 从-1.5减小到-0.8，使旋转更加缓慢

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(5, 8, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8)
  scene.add(hemiLight)

  // 加载模型
  loadModel()

  // 移除网格辅助线
  // const gridHelper = new THREE.GridHelper(10, 10)
  // scene.add(gridHelper)

  animate()
}

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 处理窗口大小变化
const handleResize = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 生命周期钩子
onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (controls) {
    controls.dispose()
  }
})
</script>

<style scoped>
.car-model-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  background: transparent;
}

.car-model-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
