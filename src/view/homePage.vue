<template>
  <div>
    <div class="today-send-box">
      <div class="today-send">
        <img :src="avatar" class="borderAvatar">
        <div>
          <div class="today-send-user">
            <span>用户名：</span>
            <div class="userName">
              {{username}}
            </div>
          </div>
          <div>
            <el-button type="text" @click="$router.push({name:'userSafetyReminder'})">余额预警</el-button>
          </div>
        </div>
      </div>
      <div class="today-send" style="margin-left: 76px">
        <img src="~@/assets/home-notesend.png" alt="" @click="$router.push({name:'tmpSendHistory'})">
        <i class="today-send-i"></i>
        <div class="today-send-content">
          <h3>今日发送</h3>
          <ul>
            <li><i class="point"></i><span>模板类短信：</span><i class="tBlue">{{toDaySendTemplateSmsNum}}</i> 条</li>
          </ul>
        </div>
      </div>
      <div class="today-send" style="margin-left: 76px">
        <img src="~@/assets/home-noteres.png" alt="" @click="$router.push({name:'smsShop'})">
        <i class="today-send-i"></i>
        <div class="today-send-content">
          <h3>剩余条数</h3>
          <ul>
            <li><i class="point"></i><span>模板类短信：</span><i class="tBlue">{{remainTemplateSmsNum}}</i> 条</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username: '',
        avatar: 'http://mbackend.torvoz.cn/static/attachment/file/15278255887216758/admin/pic-default@3x.png',
        toDaySendTemplateSmsNum: 0,
        remainTemplateSmsNum: 0
      }
    },
    methods: {
      submitErr(message) {
        this.$message.error(message)
      },

      // 获取客户信息
      async getUserInfo() {
        let url = 'customer/mobileCustomerInfo/getInfo.do';
        let res = await this.post(url)
        if (res.code == 1) {
          if (res.avatar) {
            this.avatar = res.avatar;
          }
          this.username = res.username;
        } else {
          this.submitErr(res.message)
        }
      },
      async getIndex() {
        let url = 'customer/mobileCustomerIndex/getIndex.do';
        let res = await this.post(url)
        if (res.code == 1) {
          this.remainTemplateSmsNum = res.remainTemplateSmsNum;
          this.toDaySendTemplateSmsNum = res.toDaySendTemplateSmsNum;
        } else {
          this.submitErr(res.message)
        }
      }
    },
    created() {
      this.getUserInfo()
      this.getIndex()
    }
  }
</script>

<style scoped>
  .today-send-box {
    min-width: 1400px;
  }

  .today-send {
    width: 405px;
    height: 138px;
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
    display: inline-flex;
    align-items: center;
  }

  .today-send-user {
    display: flex;
    width: 230px;
    height: 50px;
    font-size: 18px;

  }

  .today-send-user span {
    display: flex;
    width: 80px;
    height: 20px;
  }

  .userName {
    width: 148px;
    height: 50px;
    display: flex;
    word-break: break-all;

  }

  .today-send img {
    width: 78px;
    height: 78px;
    border-radius: 100%;
    margin: 0 36px;

  }

  .borderAvatar {
    border: 1px solid #e5e5e5;
  }

  .today-send-i {
    background: #e1e1e1;
    width: 1px;
    height: 60px;
  }

  .today-send-content {
    padding-left: 28px;
    height: 100px;
    width: 210px;
  }

  .today-send-content h3 {
    font-size: 18px;
  }
  .today-send-content span {
    height: 80px;
    line-height: 80px;
    width: 100px;
    padding-left: 10px;
  }

  .point {
    width: 6px;
    height: 6px;
    background-color: #86b4ff;
    border-radius: 100%;
    display: inline-flex;
  }
</style>
