<template>
  <div>

    <loginView v-if="componentId==0" @changeID="changeID"/>

    <Register v-else-if="componentId==1" @changeID="changeID"/>

    <forgetPassword :findPassword="findPassword" v-else-if="componentId==2" @changeID="changeID"/>

    <span v-else-if="componentId=='registerIng'">激活中</span>

  </div>

</template>
<script>

  import loginView from './loginView/login'
  import Register from './loginView/Register'
  import forgetPassword from './loginView/forgetPassword'
  export default {
    components:{
      loginView,Register,forgetPassword
    },
    name: 'login',
    data() {
      return {
        componentId:0,
        findPassword: '',
      }
    },
    methods: {
      changeID(id) {
        this.componentId = id
      },
      // 激活用户函数
      async activationUser(){
        let registerCode = this.registerCode
        let url = 'customer/mobileCustomer/activateCustomer.do'
        let isActivationUser = await this.post(url,{registerCode})

        if(isActivationUser.code == 1){
          this.$toast(isActivationUser.message)
          this.loginPrompt() // 激活成功后跳转登录页面
        }else{
          this.$toast(isActivationUser.message)
          this.loginPrompt()
        }
      },
      loginPrompt(){
        window.setTimeout(function(){
          window.location.href="/login.html"
        },2000)
      },

    },
    created() {
      sessionStorage.getItem('loginInfo') || localStorage.getItem('loginInfo')
      sessionStorage.clear()
      localStorage.clear()

        // 表示从邮箱注册页面进来的
        if (location.hash.indexOf('Registry') > -1) {
          this.componentId = 'registerIng'        // 显示注册页面
          this.registerCode = location.hash.substr(location.hash.indexOf('##')+2,location.hash.length)  // 获取token
          this.activationUser()
        } else if (location.hash.indexOf('Registry') > -1) {

        } else {
          this.componentId = location.hash.substr(2) || 0
        }
        // 表示从邮箱找回密码页面进来的
        if (location.hash.indexOf('FindPassword') > -1){
          this.componentId = 2
          this.findPassword  = location.hash.substr(location.hash.indexOf('##')+2,location.hash.length)
        }
     },
  }

</script>

<!--所有登录页面的链接下划线去掉-->
<style>
  a{
    text-decoration:none;
  }
</style>
