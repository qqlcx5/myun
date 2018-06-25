<template>
  <div class="userpassword">
    <div class="title">
      <i></i>
      <span class="t333">修改密码</span>
    </div>
    <div class="password-list magT30">
      <div class="password-item"><span>旧密码：</span>
        <el-input v-model="oldPassword" placeholder="旧密码" type="password" maxlength="20"></el-input>
      </div>
      <div class="password-item"><span>新密码：</span>
        <el-input v-model="newPassword" placeholder="新密码" type="password" maxlength="20"></el-input>
      </div>
      <div class="password-item"><span>确认密码：</span>
        <el-input v-model="newPassword2" placeholder="再次输入新密码" type="password" maxlength="20"></el-input>
      </div>
    </div>
    <div class="magT30">
      <el-button type="primary" @click="changePassword" style="padding-left: 30px;padding-right: 30px">保存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        prompt: '', // 提示问题消息
        savebtn: false,   // 保存按钮

      }
    },
    methods: {
      // 两种弹窗提示
      success() {
        this.$message({
          message: '密码修改成功',
          type: 'success'
        });
      },
      warn() {
        this.$message({
          message: this.prompt,
          type: 'warning'
        });
      },
      // 更改密码
      async changePassword() {
        if (!this.oldPassword || !this.newPassword || !this.newPassword2) {
          this.prompt = "请输入密码"
          this.warn()
          return;
        } else if (this.oldPassword == this.newPassword) {
          this.prompt = "新旧密码不能重复！"
          this.warn()
          return;
        } else if (this.newPassword !== this.newPassword2) {
          this.prompt = "请输入相同的登录密码！"
          this.warn()
          return;
        } else {
          let url = 'customer/mobileCustomerInfo/editPassword.do';
          let body = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            newPassword2: this.newPassword2,
          };
          let res = await this.post(url, body)
          if (res.code == 1) {
            this.success()
            this.oldPassword = ''
            this.newPassword = ''
            this.newPassword2 = ''
            return;
          }
          else {
            this.prompt = res.message
            this.warn()
          }
        }
      },
    },
  }
</script>
<style scoped>
  .userpassword {
    min-width: 600px;
  }

  .password-list {
    display: inline-flex;
    flex-direction: column;
  }

  .password-item {
    display: inline-flex;
    align-items: center;
    height: 60px;
  }

  .password-item > span {
    width: 130px;

  }
</style>
