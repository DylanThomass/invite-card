import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHeart,
  faCalendar,
  faCar,
  faPenFancy,
  faPalette,
  faPaintBrush,
  faCompass,
  faPersonWalking,
  faStore,
  faCamera,
  faUtensils,
  faCoffee,
  faCode,
  faLocationDot,
  faImage,
  faComments,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 注册所有图标
library.add(
  faHeart,
  faCalendar,
  faCar,
  faPenFancy,
  faPalette,
  faPaintBrush,
  faCompass,
  faPersonWalking,
  faStore,
  faCamera,
  faUtensils,
  faCoffee,
  faCode,
  faLocationDot,
  faImage,
  faComments,
  faQuoteLeft,
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 注册全局组件
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
