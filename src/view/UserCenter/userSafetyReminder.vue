<template>
  <div class="usersafewarn">
    <div class="safe-box">
      <div class="title">
        <i></i>
        <span class="t333">预警阈值设置</span>
      </div>
      <div class="warn">
        账号短信余额不足，&nbsp;<el-input v-model="smsRemainNum" type="text" maxlength="6" @input="numInput"></el-input>
        条时提醒我。
      </div>
    </div>
    <div class="safe-box">
      <div>
        <div class="title magT30">
          <i></i>
          <span class="t333">接收提醒设置</span>
        </div>
        <p style="margin-top:10px" class="tRed">提示：短信余额预警通知将发送到您的账号邮箱或手机上</p>
      </div>
      <div class="receive">
        <div class="safe-tel">
          <span>接收手机号：</span>
          <el-input v-model="mobile" placeholder="请输入11位手机号" v-if="cMobile" :readonly="true"></el-input>
          <el-input v-model="mobile" placeholder="请输入11位手机号" v-else="!cMobile" v-focus></el-input>
          <el-button type="text" @click="changeMobile">{{tMobile}}</el-button>
        </div>
        <div class="safe-tel">
          <span>接收邮箱：</span>
          <el-input v-model="email" placeholder="请输入邮箱" :readonly="true" v-if="cEmail"></el-input>
          <el-input v-model="email" placeholder="请输入邮箱" v-else="!cEmail" v-focus></el-input>
          <el-button type="text" @click="changeEmail">{{tEmail}}</el-button>
        </div>
      </div>
    </div>
    <div class="submit-save">
      <el-button type="primary" @click="changeWarn" :disabled="saveBtn">保存</el-button>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        smsRemainNum: '',
        mobile: '',
        email: '',
        cMobile: true,
        tMobile: '编辑',
        cEmail: true,   //焦点
        tEmail: '编辑',
        saveBtn: false,
        orimobile: "",
        oriemail: "",
        orismsRemainNum: '',

      }
    },
    methods: {
      numInput() {
        let req = /^[0-9]*$/
        if (!req.test(this.smsRemainNum)) {
          this.saveBtn = true
          return;
        } else {
          this.saveBtn = false
        }
      },
      async upMobile() {
        let url = 'customer/mobileCustomerInfo/editSecurityRemind.do'
        let body = {
          mobile: this.mobile,
          email: this.oriemail,
          smsRemainNum: this.orismsRemainNum,

        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.tMobile = '编辑'
          this.cMobile = true
          this.submitInfo("修改成功")
        }
        else {
          this.submitInfo(res.message)
        }
      },
      async upEmail() {
        let url = 'customer/mobileCustomerInfo/editSecurityRemind.do'
        let body = {
          email: this.email,
          mobile: this.orimobile,
          smsRemainNum: this.orismsRemainNum,
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.tEmail = '编辑'
          this.cEmail = true
          this.submitInfo("修改成功")
        }
        else {
          this.submitInfo(res.message)
        }
      },


      // 修改按钮 输入框可输入
      changeMobile() {
        this.cMobile = false
        if (this.tMobile === '确定') {
          this.upMobile()
        }
        this.tMobile = '确定'

      },
      changeEmail() {
        this.cEmail = false
        if (this.tEmail === '确定') {
          this.upEmail()
        }
        this.tEmail = '确定'

      },
      // 更改客户提醒
      async changeWarn() {
        let url = 'customer/mobileCustomerInfo/editSecurityRemind.do'
        let body = {
          smsRemainNum: this.smsRemainNum,
          mobile: this.mobile,
          email: this.email
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.tMobile = '编辑'
          this.cMobile = true
          this.tEmail = '编辑'
          this.cEmail = true
          this.saveBtn = true
          this.submitInfo("修改成功")
        }
        else {
          this.submitErr(res.message)
        }
      },
      // 提交样式
      submitInfo(message) {
        this.$message({
          title: '信息',
          message: message,
          type: 'success'
        });
      },
      submitErr(message) {
        this.$message.error(message)
      },

      // 获取客户信息
      async getUserInfo() {
        let url = 'customer/mobileCustomerInfo/getInfo.do'
        let res = await this.post(url)
        if (res.code == 1) {
          this.smsRemainNum = res.balanceWarnNum  // 后台 剩余短信提醒
          this.mobile = res.warnMobile
          this.email = res.warnEmail
          this.orismsRemainNum = res.balanceWarnNum
          this.orimobile = res.warnMobile
          this.oriemail = res.warnEmail
        }
        else {
          this.submitErr(res.message)
        }
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.children[0].focus()
        }
      }
    },
    created() {
      this.getUserInfo()

    }
  }
</script>
<style scoped>
  .usersafewarn {
    min-width: 600px;
  }

  .safe-box {
    padding-bottom: 50px;
    width: 100%;
    border-bottom: 1px dashed #D8D8D8;
  }

  .safe-box h1 {
    font-size: 20px;
  }

  .warn {
    margin-top: 40px;
    margin-left: 10px;
  }

  .warn .el-input {
    width: 130px;
    height: 10px;
  }

  .safe-title {
    display: flex;

  }

  .receive {
    display: flex;
    flex-direction: column;
  }

  .safe-tel {
    margin-top: 30px;
    display: inline-flex;
  }

  .safe-tel > span {
    width: 100px;
    height: 40px;
    display: flex;
    line-height: 40px;
  }

  .safe-tel > .el-input {
    width: 300px;
  }

  .safe-tel > .el-button {
    margin-left: 20px;
  }

  .submit-save > .el-button {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;

  }
</style>
