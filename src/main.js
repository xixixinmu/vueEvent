import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/elementUI'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入并使用vue-quill-editor 富文本编辑器

import '@/assets/global.less'

import dayjs from 'dayjs'
// 全局组件的引入    form 后面 标清 loading 路径 因为我的是放在components里面的
import Loading from '@/components/Loading/loading.vue'
// 全局组件的使用
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Loading', Loading)

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
// 定义时间格式化函数
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// 打包相关问题:
// 问题:打开index.html，出现了404问题
// 原因:
// 1．默认打包， index.html引入其他打包的文件使用的是绝对地址
// 地址是以/开头（要找到当前index.html打开时所在服务器的根地址(文件夹))
// 就得确保你的vscode+liserver插件打开时，vscode根目录得直接是dist文件夹
// 你如果把dist文件夹交给后台运维工程师部署到服务器上， dist下内容就得在服务器根目录才行
// 但是服务器一般会有多个项目，不让你用根目录直接放一个项目，很乱
// 解决:webpack让你写一个配置项publicPath(控制index.html引入其他资源前缀地址)
// vue.config.js（脚手架配置文件，webpack配置文件)
// publicPath:默认值‘/’确保开发环境下，是这个值，因为开发服务器会把所有打包在内存里而且作服务器的根目录文件夹，绝对地址
// 生产环境准备上线了，这个时候，就得用相对地址
