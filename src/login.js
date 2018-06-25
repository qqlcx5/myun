import Vue from 'vue'
import Login from './login.vue'
import  {post} from './utils/post'
import toastReg from './loginView/tosat'

toastReg()
Vue.config.productionTip = false
Vue.prototype.post = post
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Login },
  template: '<Login/>'
})
