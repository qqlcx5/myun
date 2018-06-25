<template>
  <div class="backgroundImage">
    <!--发送成功提示-->
    <div v-if="sendSuccessPromptMask == true" class="index">
      <div class="alert">
        <h4>发送成功</h4>
        <p>
          系统已发送验证邮件到您的 <span>{{ username }}</span>
          邮箱，请检查您的邮箱并按提示完成找回密码
        </p>
        <input type="button" class="alertButton" @click="alertButton()" value="确定"/>
      </div>
    </div>
    <!--发送失败提示-->
    <div v-if="sendFailPromptMask == true" class="index">
      <div class="alert">
        <h4>发送失败</h4>
        <p>
            发送频繁,请稍后再试
        </p>
        <input type="button" class="alertButton" @click="alertButton()" value="确定"/>
      </div>
    </div>
    <div class="forgotPage">
      <!--找回密码标题-->
      <div class="forgetPasswordTitle"><span>找回密码</span></div>
      <!--进度条-->
      <div class="progress">
        <div class="progressOne"></div>
        <div class="progressTwo"  v-if="status < 2"></div>
        <div class="progressTwoBlue"  v-if="status >= 2"></div>
        <div class="progressThree"  v-if="status < 3"></div>
        <div class="progressThreeBlue"   v-if="status >= 3"></div>
        <div class="progressFour"  v-if="status < 4"></div>
        <div class="progressFourBlue"  v-if="status >= 4"></div>
      </div>
      <!--图标-->
      <div class="icons">
        <div class="firSelIcon">
          <img src="~@/assets/icon-fir-sel.png">
        </div>
          <!--dis为 未完成 Sel为 完成-->
        <div class="secDisIcon" v-if="status < 2">
          <img src="~@/assets/icon-sec-dis.png">
        </div>
        <div class="secSelIcon" v-if="status >= 2">
          <img src="~@/assets/icon-sec-sel.png">
        </div>
        <div class="thirdDisIcon" v-if="status < 3">
          <img src="~@/assets/icon-third-dis.png">
        </div>
        <div class="thirdSelIcon" v-if="status >= 3">
          <img src="~@/assets/icon-third-sel.png">
        </div>
        <div class="finishDisIcon" v-if="status < 4">
          <img src="~@/assets/icon-finish-dis.png">
        </div>
        <div class="finishSelIcon" v-if="status >= 4">
          <img src="~@/assets/icon-finish-sel.png">
        </div>
      </div>
      <!--图标下面的文字-->
      <div class="iconText">
        <div class="writeUsername"><span>填写用户名</span></div>
        <div class="checkStatus"><span>验证身份</span></div>
        <div class="setNewPassword"><span>设置新密码</span></div>
        <div class="finish"><span>完成</span></div>
      </div>
      <!--找回密码页面-->
      <div class="forgetPassword">
        <!--手机找回密码的div-->
        <div class="phoneStyleShow" v-if="isPhoneStyleShow == 'phone'">
          <div class="phoneFindMode" v-if="isshowcheckStatus == 'phone'">
            <div class="checkStatusKey">
              <p>验证方式：</p>
              <p>已验证手机号：</p>
            </div>
            <div class="checkStatusValue">
              <div>
              <p>手机号</p>
              <p>{{ username }}</p>
              </div>
            </div>
          </div>
          <div class="phonePageOne" v-if="status === 1">
            <div class="usernameInputBox">
              <p>用户名&nbsp;/</p>
              <input type="text" placeholder="请输入账号" maxlength="40" v-model="username" @keyup.enter="submitButtonFunction">
            </div>
            <div class="imgValidInput">
              <p>验证码&nbsp;/&nbsp;&nbsp;&nbsp;</p>
              <input type="text" placeholder="请输入图形验证码" maxlength="4" v-model="validCode" @keyup.enter="submitButtonFunction">
            </div>
            <div class="imgVerification">
              <img :src="captchaCode" v-on:click="getImgCaptcha()" width="167px" height="56px">
            </div>
          </div>
          <div class="phonePageTwo" v-if="status === 2">
            <div class="imgValidInput">
              <p>图形验证码&nbsp;/&nbsp;&nbsp;&nbsp;</p>
              <input type="text" placeholder="请输入图形验证码" v-model="validCode" maxlength="4" @keyup.enter="submitButtonFunction">
            </div>
            <div class="imgVerification">
              <img :src="captchaCode" v-on:click="getImgCaptcha()" width="167px" height="56px">
            </div>

            <div class="phoneCodeInput">
              <p>短信验证码&nbsp;/</p>
              <input type="text" placeholder="请输入短信验证码" v-model="phoneCode" maxlength="6" @keyup.enter="submitButtonFunction">
              <div class="phoneCodeButton">
                <input type="button" @click="getPhoneCode()" id="ButtonNoClick" v-model="defaultContent" >
              </div>
            </div>
          </div>
          <div class="phonePageThree" v-if="status===3">
            <div class="setNewPasswordInputBox">
              <p>新密码&nbsp;/</p>
              <input type="text" v-model="setNewPasswordPhone" maxlength="20" @keyup.enter="submitButtonFunction">
            </div>
            <div class="setNewPasswordInputBox">
              <p>确认密码&nbsp;/</p>
              <input type="text"  v-model="confirmsetNewPassowrdPhone" maxlength="20" @keyup.enter="submitButtonFunction">
            </div>

          </div>
          <div class="setFinish" v-if="status===4">
           <img src="~@/assets/success-icon.png" width="30px">
           <span>新密码设置成功！</span>
         </div>
          <div class="submitButton" @click="submitButtonFunction()" v-if="buttonNone">
            <button><span>提交</span></button>
         </div>
          <div class="returnLoginPage">
          <a href="#" @click="gotoLogin">返回登录页></a>
        </div>
        </div>
         <!--邮箱找回密码的div-->
        <div class="emailStyleShow" v-if="isEmailStyleShow == 'email'">

           <div class="emailFindMode" v-if="isshowcheckStatus == 'email'">
             <div class="checkStatusKey">
               <p>验证方式：</p>
               <p>已验证邮箱号：</p>
             </div>
             <div class="checkStatusValue">
               <p>邮箱号</p>
               <p>{{ username }}</p>
             </div>
             <div class="sendEmailBuntton" v-on:click="sendEmailButtonFunction()">
               <button><span>发送验证邮件</span></button>
             </div>

           </div>
           <div class="returnLoginPage">
             <a href="#" @click="gotoLogin">返回登录页></a>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--vue的script-->
<script>
  import uuid from 'node-uuid'
  export default {
    name: "forgetPassword",
    props: {
      findPassword: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        // 是否显示手机样式
        isPhoneStyleShow:'phone',
        // 是否显示邮箱样式
        isEmailStyleShow:'',
        // 注册方式按照值显示
        isshowcheckStatus: '',
        status: 1, // 当前为 第一个页面
        buttonNone: true, // 按钮隐藏 默认为true
        username: '', //用户名
        mobile: '', // 手机号
        phoneCode: '', //短信验证码
        defaultContent: '获取短信验证码', // 默认值是获取短信验证码
        type: 1, // 短信验证码的类型
        phoneFindKey: '', // 手机找回密码的key
        setNewPasswordPhone: '', // 设置新密码 手机
        confirmsetNewPassowrdPhone: '', // 确认设置新密码 手机
        validToken: '',  // 图片验证码Token
        validCode: '', //图片验证码输入
        captchaCode: '', //图片验证码base64字符串
        pageFlag: false, // 页面的flag
        sendSuccessPromptMask: false, // 发送邮件按钮的的 遮罩（成功）
        sendFailPromptMask: false,    // 发送邮件按钮的的 遮罩（失败)
        alertFlag: false, // 弹窗页面的Flag
        lastSendTime: null, // 时间戳
      }
    },
    methods: {
      // 去下一页
      nextPage(){
        this.status = this.status + 1
        this.validCode = ''
        // 每次调用nextPage函数时把pageFlag值变为false 直到值为true才可以执行代码
        this.pageFlag = false
        if(this.status === 2){
            this.isshowcheckStatus = 'phone'
        }
         else if(this.status === 3){
            this.isshowcheckStatus = ''
        }else if(this.status === 4){
          // 隐藏提交按钮
           this.buttonNone = false
           window.setTimeout(function(){
            window.location.href="/login.html"
           },2000)
        }
      },
      // 跳转登录界面
      gotoLogin(){
        this.$emit('changeID',0)
      },
      // 点击获取短信验证码时 禁止按钮60秒
      disableButton(){
        let wait = 60
        let self = this
        ButtonNoClick.setAttribute("disabled", true);
        let timer = setInterval(function () {
          wait--
          self.defaultContent = wait + "秒后再次获取"
          if (wait == 0) {
            self.defaultContent = "获取短信验证码"
            ButtonNoClick.removeAttribute("disabled")
            clearInterval(timer)
          }
        }, 1000)
      },
      // 判断用户名的找回方式
      judegUserType(){
        // 如果输入的值不为数字 则进入邮箱注册页面
        if(isNaN(this.username) == true){
          this.isshowcheckStatus = 'email'
          this.isPhoneStyleShow = ''
          this.isEmailStyleShow = 'email'
        }
      },
      // 显示发送成功页面
      showSendSuccess(){
        this.sendSuccessPromptMask = true
        this.alertFlag = true
      },
      // 显示发送失败页面
      showSendFail(){
        this.sendFailPromptMask = true
      },
      // 发送邮件函数
      sendEmailButtonFunction(){
        // 如果alertFlag等于 false 证明按钮没有被点击过 执行 发送成功的页面
        if (this.alertFlag == false){
          // 显示发送成功的页面
          this.showSendSuccess()
          // 获取邮箱代码
          this.getEmailCode()
          // 记录当前时间戳
          this.lastSendTime = new Date().getTime()
        }else {
          // 如果当前时间戳减去lastSendTime时间戳 执行 发送失败的页面
          if (this.lastSendTime && (new Date().getTime() - this.lastSendTime < 60*1000)) {
            this.showSendFail()
          }else{
            this.alertFlag = false
          }
        }
      },
      // 警告上的确认按钮 点击后页面都隐藏
      alertButton(){
        this.sendSuccessPromptMask = false
        this.sendFailPromptMask = false
      },
      // 判断手机验证码格式
      async checkPhoneValid(){
        if(this.validCode.length == 0){
          this.$toast('请输入图形验证码')
          return false
        }
        if(this.phoneCode.length == 0){
          this.$toast('请输入短信验证码')
          return false
        }
        if(await this.checkCaptcha() !== true){
          return false
        }
        return true
      },
      // 判断输入的两次密码是否一致
      checkSetNewPasswordIsSame(){
        if(this.setNewPasswordPhone.length == 0){
          this.$toast('请输入密码')
          return false
        }
        if(this.confirmsetNewPassowrdPhone.length == 0){
          this.$toast('请输入确认密码')
          return false
        }
        if(this.setNewPasswordPhone !== this.confirmsetNewPassowrdPhone){
          this.$toast('密码不一致请确认后输入')
          return false
        }
        return true
      },
      // 获取图形验证码
      async getImgCaptcha(){
        this.validToken = uuid.v4()
        let url = "common/mobileCommon/getValidateCode.do"
        let body = {validToken: this.validToken}
        let imgRes = await this.post(url,body)
        if(imgRes.code == 1){
          this.captchaCode = imgRes.base64Img
        }
      },
      // 判断图形验证码是否正确 手机找回密码的第二页使用
      // validImageCode.do?validToken
      async checkCaptcha(){
        let url = 'common/mobileCommon/validImageCode.do'
        let body = {
          validToken: this.validToken,
          validCode: this.validCode,
        }
        let checkCaptcha = await this.post(url,body)
        if(checkCaptcha.code == 0){
          this.$toast(checkCaptcha.message)
          return false
        }
        return true
      },
      // 账号是否可以通过验证（是否存在 是否可以找回） 接口
      async checkUsername(){

        if(this.username.length == 0){
          this.$toast('请输入正确的用户名')
          return false
        }
        if(this.validCode.length == 0){
          this.$toast('请输入图形验证码')
          return false
        }

        let url = "customer/mobileCustomer/findPasswordStepOne.do"
        let body = {
          username: this.username,
          validToken: this.validToken,
          validCode: this.validCode
        }
        let checkUser = await this.post(url,body)
        // 如果检验失败 则判断用户名格式
        if(checkUser.code == 0){
          // 如果再错误弹出错误提示
          this.$toast(checkUser.message)
          // 如果都验证成功
        }else if(checkUser.code == 1){
          this.pageFlag = true
          return false
        }
      },
      // 获取手机校验码
      async getPhoneCode () {
        let url = 'common/mobileMessage/sendSmsCode.do'
        let body = {
          mobile: this.username,
          type: 1,
          validToken: this.validToken,
          validCode: this.validCode,
        }
        if(this.validCode.length == 0){
          this.$toast("请输入短信验证码")
          return
        }
        let phoneCode = await this.post(url, body)
        if(phoneCode.code == 1){
          this.$toast(phoneCode.message)
          this.disableButton()
          return false
        }else{
          this.$toast(phoneCode.message)
          return false
        }
      },
      // 验证身份(邮箱) 获取邮箱代码
      async getEmailCode(){
        let url = 'customer/mobileCustomer/findPasswordStepTwoByEmail.do'
        let body = {
          username: this.username
        }
        let emailCode = await this.post(url,body)
        if(emailCode.code == 0){
          this.$toast(emailCode.message)
        }
      },

      async checkPhoneForget(){
        let url = 'customer/mobileCustomer/findPasswordStepTwoByMobile.do'
        let body = {
          username: this.username,
          smsCode: this.phoneCode,
        }
        let phoneForgetPwd = await this.post(url,body)
        if(phoneForgetPwd.code == 0){
          this.$toast(phoneForgetPwd.message)
          return false
        }
        // 如果验证码为true 保存findKey的值 并把pageFlag的值赋为true (代表本页面验证成功)
        if(phoneForgetPwd.code == 1){
          this.phoneFindKey = phoneForgetPwd.findKey
          this.pageFlag = true
          return true
        }
      },
      // 点击时按钮的判断（手机）
      async submitButtonFunction(){
        // 如果进入第一页 则执行以下函数
        if(this.status == 1){
          // 检查用户名是否可以通过验证
          await this.checkUsername()
          // 当pageFlag 为 true 时 意为 本页面验证成功
          if (this.pageFlag == true){
            this.nextPage() // 进入下一个页面
            this.judegUserType() // 进入下一个页面的时候判断用户注册方式
            return false
          }
          return
        }
        // 如果进入第二页 则执行以下函数
        if(this.status == 2){
          // 如果表单格式正常 则判断手机验证码是否正确
         if(await this.checkPhoneValid() == true){
           // 判断手机验证码是否正确
           if(await this.checkPhoneForget() == true){
            // 如果手机验证码为验证成功 则进入下一页
            if(this.pageFlag == true){
             this.nextPage()
            }
           }
          }
          return
        }
        if(this.status == 3){
          if(this.isshowcheckStatus == ''){
            // 检查两次输入的密码是否相同
            if(!this.checkSetNewPasswordIsSame()){}
            else{
                await this.setNewPassPhone()
              if(this.pageFlag == true){
                this.nextPage()
              }
                return
              }
          }
          else{
           if(!this.checkSetNewPasswordIsSame()){}
           else{
            await this.setNewPassEmail()
            if(this.pageFlag == true){
              this.nextPage()
            }
            return
            }
          }
        }
      },
      // 设置新密码 手机
      async setNewPassPhone(){
        let url = 'customer/mobileCustomer/findPasswordStepThreeByMobile.do'
        let body = {
          findKey: this.phoneFindKey,
          password: this.confirmsetNewPassowrdPhone,
        }
        let setNewPassword = await this.post(url,body)
        if(setNewPassword.code == 1){
          // 如果成功则将Flag赋值为true
          this.pageFlag = true
        }else{
          this.$toast(setNewPassword.message)
        }
      },
      // 设置新密码 邮箱
      async setNewPassEmail(){
        let url = 'customer/mobileCustomer/findPasswordStepThreeByEmail.do'
        let body = {
          findCode: this.findPassword,
          password: this.confirmsetNewPassowrdPhone,
        }
        let setNewPassword = await this.post(url,body)
          if (setNewPassword.code == 1){
            this.pageFlag = true
          }
      },
    },
    created(){
      this.getImgCaptcha()
      // 如果已经获取findPassword的值 并且值不为空 则直接跳转到第三个页面
      if (this.findPassword !== '') {
        this.isshowcheckStatus = 'email'
        this.status = 3
      }
    }
  }
</script>

<style scoped>
  .backgroundImage{
    width: 100vw;
    height: 100vh;
    background:url("~@/assets/bg.png") center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width:990px;
    overflow:hidden;
  }
  .forgotPage{
    width: 1000px;
    height: 820px;
    border-radius: 6px;
    background-color: #ffffff;
    border:1px solid transparent;
  }
  .forgetPasswordTitle span{
    width: 99px;
    height: 24px;
    font-size: 24px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #3b88e2;
  }
  .forgetPasswordTitle {
    margin-left: auto;
    margin-right: auto;
    width:99px;
    margin-top:80px;
    margin-bottom:70px;
  }
  .progress{
    width: 800px;
    height: 4px;
    margin-left:auto;
    margin-right:auto;
  }
  .progressOne{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #3b88e2;
    margin-right:-4px;
  }

  .progressTwo{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #d5d5d5;
    margin-right:-4px;
  }
  .progressTwoBlue{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #3b88e2;
    margin-right:-4px;
  }

  .progressThree{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #d5d5d5;
    margin-right:-4px;
  }
  .progressThreeBlue{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #3b88e2;
    margin-right:-4px;
  }

  .progressFour{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #d5d5d5;
  }
  .progressFourBlue{
    display:inline-block;
    width: 195px;
    height: 4px;
    background-color: #3b88e2;
    margin-right:-4px;
  }
  .icons div{
    display:inline-block;
  }
  .firSelIcon{
    position: relative;
    left:175px;
    bottom:16px;
  }
  .secDisIcon{
    position: relative;
    left:320px;
    bottom:16px;
  }
  .secSelIcon{
    position: relative;
    left:320px;
    bottom:16px;

  }
  .thirdDisIcon{
    position: relative;
    left:465px;
    bottom:16px;
  }
  .thirdSelIcon{
    position: relative;
    left:465px;
    bottom:16px;
  }
  .finishDisIcon{
    position: relative;
    left:610px;
    bottom:16px;
  }
  .finishSelIcon{
    position: relative;
    left:610px;
    bottom:16px;
  }
  .iconText div{
    width:200px;
    display:inline-block;
    margin-top:0px;
  }
  .iconText {
    display: flex;
    justify-content: center;
    align-items: center;
    width:810px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:50px;
    text-align:center;
  }

  .writeUsername span{
    width: 84px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #2690fb;

  }.checkStatus span{
    width: 67px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #999999;
  }
  .setNewPassword span{
    width: 84px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #999999;
  }
  .finish{
    width: 34px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #999999;
  }
  .checkStatusKey{
    width: 118px;
    height: 112px;
    font-size: 16px;
    line-height: 3.5;
    letter-spacing: 0.7px;
    text-align: right;
    color: #666666;
    display:inline-block;
  }
  .checkStatusValue{
    width: 104px;
    height: 112px;
    font-size: 16px;
    line-height: 3.5;
    letter-spacing: 0.7px;
    text-align: left;
    color: #333333;
    display:inline-block;
  }
  /*找回方式*/
  .phoneFindMode{
    margin-left:245px;
    margin-bottom:30px;
  }
  .emailFindMode{
    margin-left:245px;
    margin-bottom:30px;
  }
  .phonePageOne{
    margin-left:250px;
  }
  .phonePageTwo{
    margin-left:250px;
  }
  .phonePageThree{
    margin-left:250px;
  }
  .usernameInputBox{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px #3b88e2;
    margin-bottom:40px;
  }
  .usernameInputBox p{
    width:66px;
    padding-left:30px;
    font-size: 16px;
    display:inline-block;
  }
  .usernameInputBox input{
    width:350px;
    font-size:16px;
    background: none;
    border: none;
    outline:none;
    flex: 1;
    color: black;
  }

  .setNewPasswordInputBox input{
    font-size:16px;
    width:300px;
    background: none;
    border: none;
    outline:none;
    flex: 1;
    color: black;
  }
  .setNewPasswordInputBox{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px #3b88e2;
    margin-bottom:40px;
  }
  .setNewPasswordInputBox p{
    width:100px;
    padding-left:30px;
    font-size: 16px;
    display:inline-block;
  }
  .imgValidInput{
    width: 333.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px #3b88e2;
    margin-bottom:40px;
    display:inline-block;
  }
  .imgValidInput p{
    padding-left:30px;
    font-size: 16px;
    display:inline-block;
  }
  .imgValidInput input{
   width:150px;
   font-size:16px;
   border:none;
   background: none;
   outline:none;
   flex: 1;
   color: black;
  }
  .phoneCodeInput{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    border: solid 1px #3b88e2;
    margin-bottom:40px;

  }
  .phoneCodeInput p{
    width:100px;
    padding-left:30px;
    display:inline-block;
  }
  .phoneCodeInput input{
    font-size: 16px;
    width:155px;
    border:none;
    background: none;
    outline:none;
    flex: 1;
    color: black;
  }
  .imgVerification{
    display:inline-block;
    vertical-align:middle;
  }
  .phoneCodeButton{
    display:inline-block;
    width:100px;
    margin-left:20px;
  }
  .phoneCodeButton input{
    height:56px;
    border:0px;
    color:#3b88e2;
    outline:none;
  }

  .submitButton button{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    background-color: #3b88e2;
    border: solid 1px rgba(175, 201, 254, 0.4);
    outline:none
  }
  .submitButton span{
    width: 34px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #ffffff;
  }
  .submitButton{
    margin-left:250px;
  }

  .submitButtonEmail button{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    background-color: #3b88e2;
    border: solid 1px rgba(175, 201, 254, 0.4);
    outline:none
  }
  .submitButtonEmail span{
    width: 34px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #ffffff;
  }

  .returnLoginPage{
    margin-top:30px;
    margin-left:650px;
  }
  .returnLoginPage a{
    width: 100px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #999999;
  }
  .setFinish{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sendEmailBuntton{
    margin-top:40px;
  }
  .sendEmailBuntton button{
    width: 502.1px;
    height: 56px;
    border-radius: 27px;
    background-color: #3b88e2;
    border: solid 1px rgba(175, 201, 254, 0.4);
    outline:none;
  }
  .sendEmailBuntton span{
    width: 34px;
    height: 16px;
    font-size: 16px;
    letter-spacing: 0.7px;
    text-align: center;
    color: #ffffff;
  }

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
    width: 500px;
    height: 220px;
    background-color: #ffffff;
    border-radius:10px;
  }
  .alert h4 {
    color:black;
    text-align:center;
  }
  .alert p {
    width: 340px;
    height: 56px;
    font-size: 14px;
    line-height: 2;
    color: #666666;
    text-align:left;
    margin-left:100px;
    margin-top:30px;
  }
  .alert span{
    color:#3b88e2;
  }
  .alertButton {
    width: 82px;
    height: 32px;
    border-radius: 4px;
    background-color: #3b88e2;
    border:0px;
    color:#ffffff;
    float:right;
    margin-top:20px;
    margin-right:20px;
  }



</style>
