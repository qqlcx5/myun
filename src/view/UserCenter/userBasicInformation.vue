<template>
  <div class="user-info">
    <div class="title">
      <i></i>
      <span class="t333">基本信息</span>
    </div>
    <div class="avatarbox magT30">
      <span>头像：</span>
      <el-upload
        class="avatar-uploader magL30"
        action="common/mobileUpload/uploadImg.do"
        :show-file-list="false"
        :data="dataObj"
        :on-success="handleAvatarSuccess">
        <img v-if="avatar" :src="avatar" class="avatarUp">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <el-button type="text">修改头像</el-button>
      </el-upload>
    </div>
    <div class="list magT30">
      <div class="item">
        <span>登录账号：</span>
        <i class="t666">{{username}}</i>
      </div>
      <div class="item">
        <span>手机：</span>
        <el-input v-model="mobile" class="t666" :readonly="true" v-if="isMobile"></el-input>
        <el-input v-model="mobile" class="t666" v-else="!isMobile" v-focus maxlength="11"></el-input>
        <el-button type="text" @click="changeMobile">{{oriMobile}}</el-button>
      </div>
      <div class="item">
        <span>邮箱：</span>
        <el-input v-model="email" class="t666" :readonly="true" v-if="isEmail"></el-input>
        <el-input v-model="email" class="t666" v-else="!isEmail" v-focus maxlength="40"></el-input>
        <el-button type="text" @click="changeEmail">{{oriEmail}}</el-button>
      </div>
      <div class="item">
        <span>企业名称：</span>
        <el-input v-model="enterpriseName" class="t666" :readonly="true" v-if="isEnterpriseName"></el-input>
        <el-input v-model="enterpriseName" class="t666" v-else="!isEnterpriseName" v-focus maxlength="40"></el-input>
        <el-button type="text" @click="changeEnterpriseName">{{oriEnterpriseName}}</el-button>
      </div>
      <div class="item">
        <span>联系人：</span>
        <el-input v-model="contacts" class="t666" :readonly="true" v-if="isContacts"></el-input>
        <el-input v-model="contacts" class="t666" v-else="!isContacts" v-focus maxlength="40"></el-input>
        <el-button type="text" @click="changeContacts">{{oriContacts}}</el-button>
      </div>
      <div class="item">
        <span>注册时间：</span><i class="t666">{{registerTime | converDate}}</i>
      </div>
    </div>
  </div>
</template>
<script>
  import miment from 'miment'

  export default {
    data() {
      return {
        avatar: 'http://mbackend.torvoz.cn/static/attachment/file/15278255887216758/admin/pic-default@3x.png',
        username: '',
        mobile: '',
        email: '',
        enterpriseName: '',
        contacts: '',
        registerTime: '',
        isMobile: true,     // input 修改
        isEmail: true,
        isEnterpriseName: true,
        isContacts: true,
        oriMobile: "编辑",
        oriEmail: "编辑",
        oriEnterpriseName: "编辑",
        oriContacts: "编辑",
        dataObj: {
          from: 'customer'
        },
        oriavatar: '',
        orimobile: "",
        oriemail: "",
        orienterpriseName: "",
        oricontacts: "",


      }
    },
    filters: {
      converDate(value) {
        return miment(value).format('YYYY年MM月DD日')
      }
    },

    methods: {
      // 图片上传成功
      handleAvatarSuccess(res, file) {
        // console.log(res)
        if (res.code == 1) {
          // console.log(res.url)
          this.avatar = res.url
          this.changeUserInfo()
        } else {
          this.alertInfo(res.message)
        }
      },
      async upMobile() {
        let url = 'customer/mobileCustomerInfo/editInfo.do'
        let body = {
          mobile: this.mobile,

          avatar: this.oriavatar,
          email: this.oriemail,
          enterpriseName: this.orienterpriseName,
          contacts: this.oricontacts
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.oriMobile = "编辑"
          this.isMobile = true
          this.submitInfo()
        } else {
          this.alertInfo(res.message)
        }
      },
      async upEmail() {
        let url = 'customer/mobileCustomerInfo/editInfo.do'
        let body = {
          email: this.email,
          avatar: this.oriavatar,
          mobile: this.orimobile,
          enterpriseName: this.orienterpriseName,
          contacts: this.oricontacts
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.oriEmail = "编辑"
          this.isEmail = true
          this.submitInfo()
        } else {
          this.alertInfo(res.message)
        }
      },

      changeMobile() {
        // 去除只读
        this.isMobile = false
        if (this.oriMobile === "确定") {

          this.upMobile()
        }
        this.oriMobile = "确定"

      },
      changeEmail() {
        // 去除只读
        this.isEmail = false
        if (this.oriEmail === "确定") {
          this.upEmail()
        }

        this.oriEmail = "确定"
      },
      changeEnterpriseName() {
        // 去除只读
        this.isEnterpriseName = false
        if (this.oriEnterpriseName === "确定") {
          this.changeUserInfo(3)
        }
        this.oriEnterpriseName = "确定"
      },
      changeContacts() {
        // 去除只读
        this.isContacts = false
        if (this.oriContacts === "确定") {
          this.changeUserInfo(4)

        }
        this.oriContacts = "确定"
      },
      submitErr(message) {
        this.$message.error(message)
      },
      // 获取客户信息
      async getUserInfo() {
        let url = 'customer/mobileCustomerInfo/getInfo.do';
        let res = await this.post(url)
        if (res.code == 1) {
          // this.avatar = '';
          if (res.avatar) {
            this.avatar = res.avatar;
            this.oriavatar = res.avatar
          }
          this.mobile = res.mobile;
          this.email = res.email;
          this.enterpriseName = res.enterpriseName;
          this.contacts = res.contacts;
          this.registerTime = res.registerTime;   //获取时间戳
          //  后台处理方法 保存单条的时候调用获取用户信息的接口
          this.orimobile = res.mobile;
          this.oriemail = res.email;
          this.orienterpriseName = res.enterpriseName;
          this.oricontacts = res.contacts;
        } else {
          this.submitErr(res.message)
        }
      },
      // 提交样式
      submitInfo() {
        this.$message({
          message: '信息修改成功',
          type: 'success'
        });
      },
      alertInfo(message) {
        this.$message({
          message: message,
          type: 'info'
        });
      },
      uploadImgErr() {
        this.$message.error('图片上传失败');
      },
      // 修改基本信息
      async changeUserInfo(num) {
        let url = 'customer/mobileCustomerInfo/editInfo.do'
        let body = {
          avatar: this.avatar,
          enterpriseName: this.enterpriseName,
          contacts: this.contacts,

          mobile: this.orimobile,
          email: this.oriemail,

        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          // 3 企业名称4 联系人
          if (num === 3) {
            this.oriEnterpriseName = "编辑"
            this.isEnterpriseName = true
            this.submitInfo()
          }
          else {
            this.oriContacts = "编辑"
            this.isContacts = true
            this.submitInfo()
          }
        }
        else {
          this.alertInfo(res.message)
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
  .displayInput {
    border: red;
  }

  .el-input {
    width: 230px;
  }

  .user-info {
    min-width: 600px;
    font-size: 14px;
  }

  .avatarbox {
    display: inline-flex;
    align-items: center;
  }

  .avatarbox span {
    width: 70px;
  }

  .list {
    display: flex;
    flex-flow: column;
  }

  .item {
    display: inline-flex;
    align-items: center;
    height: 60px;
  }

  .item > span {
    width: 100px;
  }

  .item > .el-button {
    margin-left: 14px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader {
    height: 80px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 100%;
    text-align: center;
  }

  .avatar-uploader .el-button {
    margin-left: 90px;
  }

  .avatarUp {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    display: block;
    border: 1px solid #e5e5e5;
  }
</style>
