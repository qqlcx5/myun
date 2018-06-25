<template>
  <div id="box">
    <div class="left">
      <div>
        <router-link :to="{name:'homePage'}" class="logo">M信云</router-link>
      </div>
      <el-menu class="menuWrap" default-active="index" :default-openeds="['1','2','3','4','5']" background-color="#1C2B36" text-color="#7BA0BB" active-text-color="#fff">
        <template>
          <router-link :to="{name:'homePage'}">
            <el-menu-item index="1" :class="{'active': currentIndex === '1'}">
              <img :src="currentIndex === '1' ? require('./assets/tab-home-s.png') : require('./assets/tab-home-n.png')" alt="" class="menuIcon">
              <span class="menuMainTitle">首页</span>
            </el-menu-item>
          </router-link>
        </template>
        <!-- <el-submenu index="2">
           <template slot="title">
             &lt;!&ndash;<i class="el-icon-bell"></i>&ndash;&gt;
             <img src="~@/assets/tab-market-n.png" alt="" class="menuIcon">
             <span class="menuMainTitle">营销短信</span>
           </template>
           <template>
             <el-menu-item index="2-1">
               <router-link :to="{name:'markSend'}">发短信</router-link>
             </el-menu-item>
             <el-menu-item index="2-2">
               <router-link :to="{name:'markSent'}">待发送短信</router-link>
             </el-menu-item>
             <el-menu-item index="2-3">
               <router-link :to="{name:'markNadopt'}">审核不通过</router-link>
             </el-menu-item>
             <el-menu-item index="2-4">
               <router-link :to="{name:'markHistory'}">发送历史</router-link>
             </el-menu-item>
             <el-menu-item index="2-5">
               <router-link :to="{name:'markTmp'}">模块配置</router-link>
             </el-menu-item>
             <el-menu-item index="2-6">
               <router-link :to="{name:'markUser'}">用户群</router-link>
             </el-menu-item>
           </template>
         </el-submenu>-->
        <el-submenu index="3">
          <template slot="title">
            <img src="~@/assets/tab-mess-n.png" alt="" class="menuIcon">
            <span class="menuMainTitle">模块短信</span>
          </template>
          <template>
            <router-link :to="{name:'tmpConfiguration'}">
              <el-menu-item index="3-1" :class="{'active': currentIndex === '3-1'}">模板配置</el-menu-item>
            </router-link>
            <router-link :to="{name:'tmpInterfaceDocumentation'}">
              <el-menu-item index="3-2" :class="{'active': currentIndex === '3-2'}">接口文档</el-menu-item>
            </router-link>
            <router-link :to="{name:'tmpSendHistory'}">
              <el-menu-item index="3-3" :class="{'active': currentIndex === '3-3'}">发送历史</el-menu-item>
            </router-link>
          </template>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <!--<i class="el-icon-message"></i>-->
            <img src="~@/assets/tab-store-n.png" alt="" class="menuIcon">
            <span class="menuMainTitle">套餐管理</span>
          </template>
          <template>
            <router-link :to="{name:'smsShop'}">
              <el-menu-item index="4-1" :class="{'active': currentIndex === '4-1'}">短信商场</el-menu-item>
            </router-link>
            <router-link :to="{name:'smsHistory'}">
              <el-menu-item index="4-2" :class="{'active': currentIndex === '4-2'}">购买历史</el-menu-item>
            </router-link>
          </template>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <!--<i class="el-icon-message"></i>-->
            <img src="~@/assets/tab-user-n.png" alt="" class="menuIcon">
            <span class="menuMainTitle">用户中心</span>
          </template>
          <template>
            <router-link :to="{name:'userBasicInformation'}">
              <el-menu-item index="5-1" :class="{'active': currentIndex === '5-1'}">基本信息</el-menu-item>
            </router-link>
            <router-link :to="{name:'userChangePassword'}">
              <el-menu-item index="5-2" :class="{'active': currentIndex === '5-2'}">修改密码</el-menu-item>
            </router-link>
            <router-link :to="{name:'userSafetyReminder'}">
              <el-menu-item index="5-3" :class="{'active': currentIndex === '5-3'}">安全提醒</el-menu-item>
            </router-link>
            <router-link :to="{name:'userIPBinding'}">
              <el-menu-item index="5-4" :class="{'active': currentIndex === '5-4'}">IP绑定</el-menu-item>
            </router-link>
            <router-link :to="{name:'userSignatureSettings'}">
              <el-menu-item index="5-5" :class="{'active': currentIndex === '5-5'}">签名配置</el-menu-item>
            </router-link>
            <router-link :to="{name:'userMonthlyBill'}">
              <el-menu-item index="5-6" :class="{'active': currentIndex === '5-6'}">月账单管理</el-menu-item>
            </router-link>
          </template>
        </el-submenu>

      </el-menu>
    </div>
    <div class="right">
      <header>
        <div class="header-right" v-show="username">
          <img :src="avatar" class="usericon">
          <span>{{username}}</span>
          <div class="exit" @click="exits">
            <img src="~@/assets/nav-exit.png" class="exitImg">
            <span>[ 退出 ]</span>
          </div>
        </div>
      </header>
      <main>
        <div class="container">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar:
        "http://mbackend.torvoz.cn/static/attachment/file/15278255887216758/admin/pic-default@3x.png",
      username: "", //判断用户名为空，隐藏退出
      currentIndex: "1"
    };
  },
  methods: {
    // 退出账号
    exits() {
      this.$confirm("退出账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        localStorage.clear();
        sessionStorage.clear();
        this.showExit = false;
        // 跳转到登录页面
        window.setInterval(function() {
          location.href = "/login.html";
        }, 2000);
      });
    },
    // 获取客户信息
    async getUserInfo() {
      let url = "customer/mobileCustomerInfo/getInfo.do";
      let res = await this.post(url);
      if (res.code == 1) {
        if (res.avatar) {
          this.avatar = res.avatar;
        }
        this.username = res.username;
      } else {
        location.href = "/login.html";
      }
      // console.log('获取客户信息', res)
    },
    changeCurrent(menuId) {
      console.log("监听", menuId);
      this.currentIndex = menuId || "1";
    }
  },
  created() {
    if (this.$route.meta) {
      this.currentIndex = this.$route.meta.menuId || "1";
    }
    if (
      !sessionStorage.getItem("loginInfo") &&
      !localStorage.getItem("loginInfo")
    ) {
      location.href = "/login.html";
      return;
    }
    this.getUserInfo();
  },
  mounted() {
    // 监听菜单项的变化
    eventBus.$on("getCurrentMenu", this.changeCurrent);
  },
  destroyed() {
    eventBus.$off("getCurrentMenu", this.changeCurrent);
  }
};
</script>
<style>
.t333 {
  color: #333;
}

.t666 {
  color: #666;
}

.t999 {
  color: #999;
}

.magT30 {
  margin-top: 30px;
}

.magL30 {
  margin-left: 30px;
}

.tBlue {
  color: #1989fa;
}

.tRed {
  color: #fa3030;
}

.tGreen {
  color: #64c255;
}

.cBtn {
  background-color: #64c15c;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}

a {
  color: #1989fa;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

i {
  font-style: normal;
}

/*标题和渐变色背景*/

.title {
  width: 100%;
  height: 28px;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
}

.title > i {
  width: 4px;
  height: 24px;
  border-radius: 2px;
  background-image: linear-gradient(351deg, #6cc1ff, #4194ff);
}

.title > span {
  font-size: 20px;
  margin-left: 20px;
}

.menuWrap .el-menu .el-menu-item {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
<style scoped>
/*a {
    color: #7BA0BB;
    display: inline-flex;
    width: 160px;
    height: 50px;
    align-items: center;
  }

  a:hover {
    color: #fff;
  }*/

#box {
  background-color: #f2f4f8;
  width: 100%;
  min-width: 1210px;
  height: 100vh;
  display: flex;
}

.left {
  width: 160px;
  height: 100vh;
  background: #1c2b36;
  overflow: hidden;
  border-right: none;
}

.logo {
  display: flex;
  height: 80px;
  width: 160px;
  align-items: center;
  align-content: center;
  justify-content: center;
  color: #c1cfe0;
  font-size: 24px;
}

/*elmenu右边框溢出，隐藏有瑕疵*/

.el-menu {
  border-right: none;
}

.right {
  width: calc(100% - 160px);
  height: 100vh;
}

header {
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  display: flex;
  justify-content: flex-end;
}

.header-right {
  height: 60px;
  min-width: 400px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-right > img {
  width: 50px;
  height: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 100%;
}

.header-right > span {
  padding: 0 20px;
}

.exit {
  width: 110px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  color: #3b88e2;
  cursor: pointer;
}

.exit > img {
  width: 30px;
  height: 30px;
  padding-right: 10px;
}

main {
  height: calc(100vh - 80px);
  width: calc(100% - 10px);
  padding: 10px 0 10px 10px;
}

.container {
  padding: 30px 0 0 30px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background: #fff;
  overflow-y: auto;
  font-size: 14px;
}

.menuWrap {
  height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}

.menuMainTitle {
  font-size: 16px;
}
.menuMainTitle:hover {
  color: #fff !important;
}

.menuIcon {
  width: 20px;
  height: 20px;
  margin-left: -6px;
}

.menuWrap a {
  color: #7ba0bb !important;
}
.menuWrap .el-menu-item {
  color: #7ba0bb !important;
}
.menuWrap .el-menu-item:hover {
  color: #fff !important;
}

.menuWrap .active {
  color: #fff !important;
}

.menuWrap .active a {
  color: #fff !important;
}
</style>
