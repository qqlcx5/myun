<template>
  <div :class="{'logoWhite': sendEmailPage, 'logo': !sendEmailPage}">
    <!--注册协议-->
    <div v-if="showRegisterProtocol == true" class="index">
      <div class="alert">
        <div class="alert_title">
          <span>M信云平台服务协议</span>
          <div class="alert_button_small">
            <input type="button" @click="registerProtocol">
          </div>
        </div>
        <div class="alert-content">
          <span>
            为使用本公司平台服务，您应当阅读并遵守《M信云平台服务协议》（以下简称“本协议”）。在接受本协议之前，请您务必仔细阅读本协议的全部内容。无论是否实际阅读本协议，您通过网络页面点击确认本协议或实际使用平台服务，均表示您与本公司方已就本协议达成一致并同意接受本协议的全部约定内容。如果您不同意本协议的任意内容，或者无法准确理解本公司方对条款的解释，请不要同意本协议或使用本协议项下的服务。否则，表示您已接受了以下所述的条款和条件，同意受本协议约束。
          </span>
          <p>本协议由本公司与您签署。</p>
            <p>第一条 定义</p>
            1.1 本公司通信能力开放平台：是本公司提供的， 面向开发者为主的互联网合作伙伴，提供融合通信能力的开放平台。 开发者可利用平台，通过公众通信网或互联网， 向用户提供以短信通道服务、语音呼叫服务等内容为主的技术服务， 以下简称“开放平台”或“平台”。
            <br>
            1.2API接口： API （Application Programming Interface,应用程序编程接口） 提供给开发人员的实现某一特定功能的接口，以下简称“接口”。
            <br>
            1.3 开发者：调用平台通信能力接口进行应用开发合作的主体，包括公司和个人， 经过本公司审核通过后成为本协议的开发者，以下简称“您”。
            <p>第二条 服务内容</p>
            本公司将通信能力以API接口的形式或者直接发送的形式提供给您调用，您根据自己的业务需要选择需要的服务，具体可选服务见网站页面。
            <p>第三条 服务费用</p>
            3.1 服务单价
            本公司将根据不同服务种类收取技术服务费用，具体费用标准以网站页面展示为准。
        </div>
        <div class="alert-button">
          <button @click="registerProtocol"><span>同意</span></button>
        </div>
      </div>
    </div>

    <div class="logo_box" v-if="registerPage">

      <div class="logo_title"><span>注册</span></div>

      <div class="registerButton">

        <div class="phoneRegisterButton" :class="{ opacityEffect: registerWay=='email', }"
             @click="changeRegistryWay('phone')">
          <input type="button" value="手机注册">
        </div>

        <div class="emailRegisterButton" :class="{ opacityEffect: registerWay=='phone', }"
             @click="changeRegistryWay('email')">
          <input type="button" value="邮箱注册">
        </div>
      </div>

      <!--手机注册页面-->
      <div class="phoneRegister" v-if="registerWay=='phone'">
        <div class="item">
          <span>手机号&nbsp;&nbsp;/</span>
          <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号" @blur="checkPhone" @keyup.enter="register">
        </div>
        <div class="itemAlone">
          <span>验证码&nbsp;&nbsp;/</span>
          <input type="text" maxlength="4" v-model="validCode" placeholder="请输入图形验证码" @keyup.enter="register">
        </div>
        <div class="imgVerification" @click="getCaptcha">
          <img :src="captchaCode">
        </div>
        <div class="item_button">
          <span>手机验证码&nbsp;&nbsp;/</span>
          <input type="text" v-model="phoneCode" maxlength="6" placeholder="请输入手机验证码" @keyup.enter="register">
          <div class="getPhoneVerification" @click="getPhoneCode">
            <div class="noClickClass">
              <input type="button" v-model="noClickTest" id="testNoClick"/>
            </div>
          </div>
        </div>
        <div class="item">
          <span>密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</span>
          <input type="password" v-model="password" maxlength="20" placeholder="请输入密码" @keyup.enter="register">
        </div>


      </div>

      <!--邮箱注册页面-->
      <div class="emailRegister" v-if="registerWay=='email'">
        <div class="item">
          <span>邮箱号&nbsp;&nbsp;/</span>
          <input type="text" v-model="emailUser" placeholder="请输入邮箱号" maxlength="40" @blur="checkEmail" @keyup.enter="register">
        </div>
        <div class="item">
          <span>密码&nbsp;&nbsp;/</span>
          <input type="password" v-model="emailPassword" maxlength="20" placeholder="请输入密码" @keyup.enter="register">

        </div>
        <div class="itemAlone">
          <span>验证码&nbsp;&nbsp;/</span>
          <input type="text" v-model="validCode" maxlength="4"  placeholder="请输入图形验证码" @keyup.enter="register">
        </div>
        <div class="imgVerification" @click="getCaptcha">
          <img :src="captchaCode">
        </div>
      </div>


      <div class="isAgree">
        <input type="checkbox" checked="checked" v-model="checked" @click="isAgree">
        <span>同意</span><a href="#" @click="registerProtocol">《M信云平台服务协议》</a>
      </div>


      <div>
        <input type="button" class="submit" value="注册" @click="register"/>
      </div>
      <div class="login">已有账号，<a href="#" @click="gotoLogin">我要登录</a></div>


    </div>

    <div v-if="sendEmailPage">
      <div class="picClass">
        <img src="~@/assets/pic.png">
      </div>
      <div class="sendEmailPageClass">
        <b>邮件已发送  已向你的邮箱 <b style="color:#3b88e2">{{ emailUser }}</b> 发送了一份验证邮件，请检查您的收件箱完成验证</b><br>
        <br>
        <br>
        <b style="float:right">收不到？请查看是否被标记为垃圾邮件&nbsp;或&nbsp;<button @click="register">再发一次</button></b>
      </div>
    </div>

  </div>
</template>


<script>
  import uuid from 'node-uuid'
  export default {
    data () {
      return {
        validToken: '',        // 验证码对应的token
        captchaCode: '', // 验证码 base64 code
        registerWay: 'phone',  // 注册方式
        mobile: '',            // 手机号码
        type: 0, // 短信验证码的类型
        emailUser: '',              // 邮箱
        emailPassword: '',           // 密码
        password: '',           // 密码
        validCode: '',         // 图形验证码对应的code
        phoneCode: '',         // 手机验证码
        noClickTest: '获取短信验证码',       // 获取手机验证码按钮 设置按钮不点击
        registerPage: true, // 注册页面
        sendEmailPage: false, // 邮件发送页面
        whatcolor:'white', //
        checked: true, // 复选框
        showRegisterProtocol: false // 显示注册协议
      }
    },
    methods: {
      // 更改注册方式
      changeRegistryWay (way) {
        this.registerWay = way
        // 每次切换注册方式将验证码框的值设为空
        this.validCode = ''
      },
      // 点击事件 去登录
      gotoLogin () {
        this.$emit('changeID', 0)
      },
      // 注册协议是否勾选
      isAgree(){
        if(this.checked == false){
          return false
        }
      },
      // 点击注册协议时触发的函数 默认是false 不显示
      // 如果调用这个函数 注册协议是不显示的 则改为显示 如果显示 则取消显示
      registerProtocol(){
        if(this.showRegisterProtocol == false){
          this.showRegisterProtocol = true
        }else{
          this.showRegisterProtocol = false
        }
      },
      // 点击获取短信验证码时 禁止按钮60秒
      disableButton(){
        var wait = 60
        var self = this
        testNoClick.setAttribute("disabled", true);
        var timer = setInterval(function () {
          wait--
          self.noClickTest = wait + "秒后再次获取"
          if (wait == 0) {
            self.noClickTest = "获取短信验证码"
            testNoClick.removeAttribute("disabled")
            clearInterval(timer)
          }
        }, 1000)
      },
      // 校验表单
      async checkForm(){
        if(this.registerWay === 'phone') {
          if(this.mobile.length == 0){
            this.$toast("请输入手机号")
            return false
          }
          if(isNaN(this.mobile)) {
            this.$toast('请输入正确的手机号')
            return false;
          }
          if(this.mobile.length !== 11){
            this.$toast('请输入正确的手机号')
            return false;
          }
          if(this.mobile.indexOf("1") !== 0){
            this.$toast('请输入正确的手机号')
            return false;
          }
          if(this.validCode.length == 0){
            this.$toast("请输入图形验证码")
            return false
          } else{
            let isCan = await this.checkCaptcha()
            if(isCan == false){
              this.$toast("请输入正确的图形验证码")
              return false
            }
          }
          if(this.phoneCode.length == 0){
            this.$toast("请输入手机验证码")
            return false
          }
          if(this.password.length == 0){
            this.$toast("请输入密码")
            return false
          }
          return true
        } else {
          // 检查邮箱号格式
          let emailRegular = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
          if (this.emailUser.length == 0){
            this.$toast('请输入邮箱账号')
            return false;
          }
          if(!emailRegular.test(this.emailUser)){
            this.$toast('请输入正确的邮箱')
            return false;
          }
          if (this.emailPassword.length == 0){
            this.$toast('请输入密码')
            return false;
          }
          if (this.validCode.length == 0){
            this.$toast('请输入图形验证码')
            return false;
          }
          return true
        }
      },
      // 校验手机 是否可以获取验证码
      checkValidForm(){
        if (this.mobile.length === 0) {
          this.$toast('请输入手机号')
          return false;
        }
        if(isNaN(this.mobile)) {
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(this.mobile.length !== 11){
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(this.mobile.indexOf("1") !== 0){
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(this.validCode.length !== 4){
          this.$toast('请输入图形验证码')
          return false;
        }
        return true
      },
      // 判断手机号格式 如果长度等于11位 则检查是否注册 鼠标失焦事件
      checkPhone(){
        if(this.mobile.length == 11){
          this.isRegister()
        }else{
          return false
        }
      },
      // 邮箱用户名的 失焦事件
      checkEmail(){
        this.isRegister()
      },

      // 获取图形验证码
      async getCaptcha () {
        this.validToken = uuid.v4()
        let url = 'common/mobileCommon/getValidateCode.do'
        let body = {
          validToken: this.validToken
        }
        let ImgRes = await this.post(url, body)
        if (ImgRes.code == 1) {
          this.captchaCode = ImgRes.base64Img
        }
      },
      // 获取 手机 校验码
      async getPhoneCode () {
        if(!this.checkValidForm()) {
          return
        }
        if(await !this.isRegister()) {
          return
        }
        let url = 'common/mobileMessage/sendSmsCode.do'
        let body = {
          mobile: this.mobile,
          type: this.type,
          validToken: this.validToken,
          validCode: this.validCode,
        }
        let phoneCodeRes = await this.post(url, body)
        // 如果发送成功 提示 ”获取验证码成功“ 并执行按钮倒计时函数
        if (phoneCodeRes.code == 1){
          this.disableButton()
        } else {
          this.$toast(phoneCodeRes.message)
        }
      },
      // 检查图片验证码
      async checkCaptcha(){
        let url = "common/mobileCommon/validImageCode.do"
        let body = {
          validToken: this.validToken,
          validCode: this.validCode,
        }
        let checkCaptcha = await this.post(url, body)
        if (checkCaptcha.code == 0){
          this.$toast("请输入正确的图形验证码")
          return false
        }
        return true
      },
      // 注册
      async register () {
        if (this.registerWay === 'phone') {
          if(! await this.checkForm()){
            return
          }
          // 判断注册协议是否勾选
          if(this.isAgree() == false){
            this.$toast('请勾选注册协议')
            return
          }

          let mobile, smsCode, password
          mobile = this.mobile
          password = this.password
          smsCode = this.phoneCode
          let url = 'customer/mobileCustomer/mobileRegister.do'
          let body = {mobile, password, smsCode}
          let phoneRegisterRes = await this.post(url, body)
          if (phoneRegisterRes.code == 1) {
            localStorage.setItem("loginInfo",JSON.stringify(phoneRegisterRes))
            this.$toast("正在注册中")
            // 跳转到登录页面
            this.loginPrompt()
          }else{
            this.$toast("请输入正确的短信验证码")
          }
        } else {
          let email, password
          email = this.emailUser
          password = this.emailPassword
          // 校验表单
          if(! await this.checkForm()){
            return
          }
          // 判断用户是否注册
          if(! await this.isRegister()){
            return
          }
          let url = 'customer/mobileCustomer/emailRegister.do'
          let body = {
           email,
           password,
           validToken : this.validToken,
           validCode : this.validCode,
          }
          let emailRegisterRes = await this.post(url,body)
          // 判断注册协议是否勾选
          if(this.isAgree() == false){
            this.$toast('请勾选注册协议')
            return
          }
          // 如果注册成功 隐藏注册页面 显示 发送邮件页面
          if (emailRegisterRes.code == 1){
            this.registerPage = false
            this.sendEmailPage = true
          }else{
            this.$toast(emailRegisterRes.message)
          }
        }

      },
      // 判断是否注册
      async isRegister(){
        let username
        if(this.registerWay === 'phone'){
          username = this.mobile
        }else{
          username = this.emailUser
        }
        let url = 'customer/mobileCustomer/isAlreadyRegisted.do'
        let isRegisterRes = await this.post(url,{username})
        if (isRegisterRes.isRegisted == 1){
          this.$toast("该账号用户已存在，请直接登录")
          return false
        } else {
          return true
        }
      },
      // 登录提示
      loginPrompt(){
        window.setTimeout(function(){
          window.location.href="/"
        },2000)
      }
    },
    created () {
      // 每次第一次加载页面时都会获取图片验证码
      this.getCaptcha()
    },

  }

</script>
<style scoped>

  .index{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content:center;
    top:0px;
    bottom:0px;
    right:0px;
    left:0px;
    z-index:999;
  }
  .alert {
    width: 945px;
    height: 655px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #979797;
  }
  .alert_title{
    width: 945px;
    height: 45px;
    border-radius: 4px;
    background-color: #57a4ff;
    border:none;
    display: flex;
    align-items: center;
    justify-content:center;
    line-height:1.5;
    position: relative;
  }
  .alert_title span{
    height: 25px;
    font-size: 18px;
    color: #ffffff;
  }
  .alert_button_small{
    display:flex;
    position: absolute;
    right:0;
    margin-right:15px;
  }
  .alert_button_small input{
    background:url('~@/assets/oval.png') no-repeat;
    width:30px;
    height:30px;
    border:none;
  }
  .alert-content{
    font-size: 14px;
    line-height: 1.71;
    color: #333333;
    display:inline-block;
    padding:40px;
  }
  .alert-button{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:20px;
  }
  .alert-button button{
    width: 148px;
    height: 42px;
    border-radius: 21px;
    background-color: #57a4ff;
    border:none;
    outline:none;
  }
  .alert-button span{
    width: 32px;
    height: 22px;
    font-size: 16px;
    color: #ffffff;
  }
  .logo {
    background: url("~@/assets/bg.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logoWhite{
    background: #fff;
    background-size: auto;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo_box {
    background: none;
    height: 770px;
    width: 502px;
    min-height:100vh;
  }
  .picClass{
    display:inline-block;
    vertical-align:middle;
  }
  .sendEmailPageClass b{
    color:black;
  }
  .sendEmailPageClass button{
    color:#3b88e2;
    background: transparent;
    border:0px;
    font-size:16px;
  }
  .sendEmailPageClass{
    display:inline-block;
    vertical-align:middle;
  }

  .item {
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px rgba(255, 255, 255, 0.6);
    margin-bottom: 41px;
    /*display: flex;*/
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }

  .logo_title {
    margin-top:50px;
    width: 502.1px;
    height: 56px;
    margin-bottom: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
  }

  .item:nth-child(1) span,
  .item:nth-child(2) span,
  .item:nth-child(3) span,
  .item:nth-child(4) span,
  .item:nth-child(5) span {

    padding: 0 22px 0 32px;
    color: #ccc;
    font-size: 16px;
  }

  .item:nth-child(1) input,
  .item:nth-child(2) input,
  .item:nth-child(3) input,
  .item:nth-child(4) input,
  .item:nth-child(5) input {
    height: 56px;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    flex: 1;
    color: #ccc;
    width: 350px;
  }
  /*验证码的框*/
  .itemAlone {
    width: 360px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px rgba(255, 255, 255, 0.6);
    margin-bottom: 41px;
    display: inline-block;
  }

  .itemAlone span {
    padding: 0 22px 0 32px;
    color: #ccc;
    font-size: 16px;
  }

  .itemAlone input {
    height: 56px;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    flex: 1;
    color: #ccc;
    width: 200px;
  }

  /*手机验证码的框*/
  .item_button{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px rgba(255, 255, 255, 0.6);
    margin-bottom: 41px;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }
  .item_button span{
    padding: 0 22px 0 32px;
    color: #ccc;
    font-size: 16px;
  }
  .item_button input{
    height: 56px;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    flex: 1;
    color: #ccc;
    width: 200px;
  }

  .submit {
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    background-color: rgba(220, 225, 255, 0.4);
    border: solid 1px rgba(175, 201, 254, 0.4);
    outline: none;
    font-size: 16px;
    color: #ccc;
    margin-bottom: 30px;
  }

  /* 新加的 */
  .registerButton {
    margin-bottom: 40px;
    display: inline-block;
  }

  .phoneRegisterButton input {
    width: 231px;
    height: 56px;
    border-radius: 27px;
    background-color: #3b88e2;
    border: solid 1px #3b88e2;
    color: #ffffff;
    font-size: 18px;
    outline: none;
  }

  .phoneRegisterButton {
    display: inline-block;

  }

  .emailRegisterButton input {
    width: 231px;
    height: 56px;
    border-radius: 27px;
    background-color: #3b88e2;
    border: solid 1px #3b88e2;
    color: #ffffff;
    font-size: 18px;
    outline: none;
  }

  .emailRegisterButton {
    /*float:left;*/
    display: inline-block;
    margin-left: 33px;
  }

  .getPhoneVerification {
    display: inline-block;
    margin-right: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
  .getPhoneVerification button {
    background: none;
    border: 0px;
    width: 120px;
    height: 20px;
  }

  .getPhoneVerification a {
    color: #ccc;
    font-size: 16px;
    width: 100px;
  }

  .noClickClass input {
    color: #ccc;
    font-size: 16px !important;
    width: 120px !important;
  }

  .imgVerification {
    display: inline-block;
    margin-left: 8px;
  }

  .imgVerification img {
    width: 125px;
    height: 60px;
    vertical-align: middle;
    border-radius: 30px;
  }

  /*按钮渐隐效果*/
  .opacityEffect {
    opacity: 0.6;
  }

  .login {
    display: inline-block;
    margin-left: 380px;
    color: #ccc;
    font-size: 13px;
  }

  .login a {
    background: none;
    color: #6CC1FF;
    border: none;
    font-size: 13px;

  }

  /*是否同意*/
  .isAgree {
    margin-bottom: 30px;
  }

  .isAgree span {
    color: #cccccc;
    font-size: 16px;
  }

  .isAgree a {
    background: none;
    color: #6CC1FF;
    border: none;
    /*outline: none;*/
    font-size: 13px;
  }
</style>
