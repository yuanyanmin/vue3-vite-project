// core
import { createApp } from 'vue'
import App from './App.vue'
import store from "./stores"
import router from './router'

// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"

// css
import 'element-plus/dist/index.css'
import "@/styles/reset.scss";
import "@/styles/index.scss"

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
// 加载全局 svg
loadSvg(app)

app.use(store)
app.use(router)

app.mount('#app')
