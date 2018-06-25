import Vue from 'vue'
import Index from './index.vue'
import router from './router'
import {
  post
} from './utils/post'

//normalize.css 初始化样式
import 'normalize.css'
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.post = post
Vue.prototype.$formatMoney = (num) => {
  if (!num && num !== 0) {
    return ''
  }
  return parseFloat(num).toFixed(2)
}

Vue.use(ElementUI);

Vue.config.productionTip = false
window.eventBus = new Vue()
router.beforeEach((to, from, next) => {
  eventBus.$emit('getCurrentMenu', to.meta.menuId)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    Index
  },
  template: '<Index/>'
})
