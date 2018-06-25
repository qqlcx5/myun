<template>
  <div class="logo">
    <div class="logo_box">
      <div class="logo_title"><span>M信云</span></div>
      <div class="item">
        <span>账号&nbsp;/</span>
        <input type="text" v-model="username" maxlength="40" placeholder="请输入手机号/邮箱账号" @keyup.enter="login"></div>
      <div class="item">
        <span>密码&nbsp;/</span>
        <input type="password" v-model="password" maxlength="20" placeholder="请输入密码" @keyup.enter="login"></div>

      <div class="automaticLogin">
        <input type="checkbox" v-model="checked">
        <span>30天内自动登录</span>
      </div>
      <div class="submit" @click="login" @keyup.enter="login">登录</div>
      <div class="forget"><a href="#" @click="gotoForgetPassword">忘记密码</a></div>
      <div class="register">还没有账号，<a href="#" @click="gotoRegistry">立即注册</a></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username:'',
        password:'',
        checked: false, // 单选框的值
      }
    },
    methods: {
      gotoRegistry(){
        this.$emit('changeID',1)
      },
      gotoForgetPassword(){
        this.$emit('changeID',2)
      },

      // 登录
      async login(){
        if(this.username.length == 0){
          this.$toast('请输入账号')
          return false;
        }

        if(this.password.length == 0){
          this.$toast('请输入密码')
          return false;
        }


        let url = 'customer/mobileCustomer/login.do'
        let body = {
          username: this.username,
          password: this.password,
        }
        let res = await this.post(url, body)
        // 如果 code == 1 则登录成功
        if (res.code == 1) {
          if(this.checked == false){

          sessionStorage.setItem("loginInfo",JSON.stringify(res))
          console.log("sessionStorage")
          }else{

          localStorage.setItem("loginInfo",JSON.stringify(res))
          console.log("localStorage")
          }
        }
        if (res.code == 0) {
          this.$toast('账号或密码错误')
          return false;
        }
        // 如果登录的 code的值等于1 则提示消息 登录成功 并跳转到后台页面
        if (res.code == 1) {
          this.$toast('正在登录中')
          // 两秒后跳转
          window.setTimeout(function () {
            window.location.href = "/"
          }, 2000)
        }
      },
    },
    created() {
      localStorage.clear()
      sessionStorage.clear()
  },
  }
</script>
<style scoped>
  .logo{
    background: url("~@/assets/bg.png") no-repeat;
    background-size: auto;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo_box{
    background:none;
    height: 500px;
    width: 502.1px;
  }
  .item{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px rgba(255, 255, 255, 0.6);
    margin-bottom: 41px;
  }
  .logo_title{
    width: 502.1px;
    height: 56px;
    margin-bottom: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
  }
  .item:nth-child(2) span,.item:nth-child(3) span{
    padding: 0 22px 0 32px;
    color: #ccc;
    font-size: 16px;
  }
  .item:nth-child(2) input,.item:nth-child(3) input{
    width:350px;
    height: 56px;
    font-size: 16px;
    background: none;
    border: none;
    outline:none;
    flex: 1;
    color: #ccc;
  }
  .submit{
    width: 502px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-radius: 27px;
    background-color: rgba(220, 225, 255, 0.4);
    border: solid 1px rgba(175, 201, 254, 0.4);
    font-size: 16px;
    color: #ccc;
    margin-bottom: 30px;
    cursor: pointer;
  }


  /* 新加的 */
  .forget {
    margin-left:10px;
    display:inline-block;
  }
  .forget a{
    background: none;
    color: #ccc;
    border: none;
    outline: none;
    font-size:14px;
  }
  .register {
    display:inline-block;
    margin-left:280px;
    color:#ccc;
    font-size:13px;
  }
  .register a{
    background: none;
    color: deepskyblue;
    border: none;
    font-size:13px;
  }

   /*是否自动登录*/
  .automaticLogin{
    /*margin-left:20px;*/
    margin-bottom:30px;
  }
  .automaticLogin input{
    vertical-align:middle
  }
  .automaticLogin span{
    font-size:14px;
    vertical-align:middle;
    color:#ccc;
  }
</style>
