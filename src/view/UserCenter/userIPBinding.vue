<template>
  <div class="userip">
    <div class="title">
      <i></i>
      <span class="t333">IP绑定</span>
    </div>
    <div class="ip-content">
      <div>
        <span style="width: 80px;display: inline-flex">当前IP</span>{{ip}}
      </div>
      <div class="magT30">
        <span style="width: 80px;display: inline-flex">启用认证</span>
        <el-switch
          v-model="showOpen"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="testPWbox">
        </el-switch>
      </div>
      <div style="color: #FA3030;margin-top: 30px; line-height: 24px;">
        <p>提示：绑定IP后，只有被绑定IP地址发送过来的服务器请求才会被正常处理。</p>
        <p>若您处于动态IP环境，或使用代理、VPN，请勿开启认证IP；</p>
        <p>认证的IP最多添加5个</p>
      </div>
      <div v-if="showOpen">
        <div class="magT30">
          <el-button icon="el-icon-plus" @click="isPWAdd" :disabled="addbtn" v-if="tableData.length>=5">新增绑定</el-button>
          <el-button icon="el-icon-plus" @click="isPWAdd" v-else>新增绑定</el-button>
        </div>
        <div class="ip-table">
          <template>
            <el-table
              :data="tableData"
              border>
              <el-table-column
                prop="ipAuth"
                label="服务器地址"
                align="center"
                min-width="300">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="80px">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                  <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showOpen: false, // 显示或者隐藏
        isPW: false,
        message: "",
        addbtn: true,
        tableData: [],
        ip: ''
      }
    },
    methods: {
      submitErr(message) {
        this.$message.error(message)
      },
      // 进入获取IP
      async Gip() {
        let url = 'common/mobileCommon/getIp.do'
        let res = await this.post(url)
        if (res.code == 1) {
          this.ip = res.ip
          this.userIp(res.ip)
        }
      },

      // 进入获取用户是否开启IP认证
      async getIP() {
        let url = 'customer/mobileCustomerInfo/getInfo.do'
        let res = await this.post(url)
        if (res.code == 1) {
          this.showOpen = Boolean(res.isOpenIpAuth)
          // this.isOpen = Boolean(res.isOpenIpA2uth)  // 密码或者取消ip认证开启不变
          if (this.showOpen) {
            this.getIPlist()
          }
        } else {
          this.submitErr(res.message)
        }
      },
      //ip开启获取ip列表
      async getIPlist() {
        let url = 'customer/mobileIpAuth/listIpAuth.do'
        let res = await this.post(url)
        if (res.code == 1) {
          let ipArray = res.ipAuthArray
          this.tableData = ipArray
          // ipArray.forEach(item => {
          //   this.$data.tableData.push(item)
          // })
        }
      },
      // 开启或者关闭ip认证
      async postIP() {
        let url = 'customer/mobileIpAuth/ipAuth.do'
        let body = {
          isOpen: Number(this.showOpen)
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          // 更新 isOpen参数
          // window.setInterval(function () {
          //   location.reload();
          // }, 2000)
        }
      },
      // 验证密码弹窗
      testPWbox() {
        if (this.showOpen) {
          this.message = "若您处于动态IP环境，或使用代理、VPN，请勿开启认证IP；"
          this.info()
        }
        this.$prompt('为保障用户安全，请输入您的登录密码通过验证', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /^.{3,12}$/,
          inputType: 'password',
          //inputErrorMessage: '长度在3~12之间，只能包含字母、数字和下划线',
        }).then(({value}) => {
          this.testPW(value)
        }).catch(() => {
          // 禁止修改
          this.showOpen = !this.showOpen // ip认证状态不变
          // this.$message.info("取消验证");
        });
      },
      // 验证密码，是否开启ip认证
      async testPW(value) {
        let url = 'customer/mobileCustomerInfo/validatePassword.do'
        let body = {
          password: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          if (res.isCorrect == 1) {
            this.postIP()
            this.isPW = true
            this.getIPlist()
          }
          else {
            this.showOpen = !this.showOpen
            this.message = "密码输入错误"
            this.error()
          }
        }
      },
      // 表格编辑
      handleEdit(index, row) {
        if (this.isPW) {
          //console.log(this.isPW)
          //console.log(index,row.ipAuthId)
          this.editbox(row.ipAuthId)
        }
        else {
          this.editpassword(index, row)
        }
      },
      // 验证编辑密码
      editpassword(index, row) {
        this.$prompt('为保障用户安全，请输入您的登录密码通过验证', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /^.{3,12}$/,
          inputType: 'password',
          // inputErrorMessage: '长度在3~12之间，只能包含字母、数字和下划线'
        }).then(({value}) => {

          this.editPW(value, index, row)
        }).catch(() => {

        })
      },
      async editPW(value, index, row) {
        let url = 'customer/mobileCustomerInfo/validatePassword.do'
        let body = {
          password: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          // console.log(index, row)
          if (res.isCorrect == 1) {
            this.isPW = true
            this.editbox(row.ipAuthId)
          }
          else {
            this.message = "密码验证失败"
            this.error()
          }
        }
      },
      // 编辑IP地址弹窗
      editbox(index) {
        this.$prompt('请输入IP地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
          inputTrigger: 'blur',
          inputErrorMessage: 'IP格式不合法'
        }).then(({value}) => {
          //console.log(index, value)
          this.editIP(index, value)
        }).catch(() => {

        })
      },
      // 编辑IP地址
      async editIP(index, value) {
        //console.log(index, value)
        let url = 'customer/mobileIpAuth/editIpAuth.do'
        let body = {
          ipAuthId: index,
          ipAuth: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.getIPlist()
          this.message = "IP地址修改" + res.message
          this.success()
        } else {
          this.message = res.message
          this.error()
        }
      },

      // 表格删除
      handleDelete(index, row) {
        this.$confirm('是否确认删除？', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
        }).then(() => {
          if (this.isPW) {
            this.delIP(row.ipAuthId)
            return
          } else {
            this.delpassword(index, row)
            return
          }
        }).catch(() => {

        });
      },
      // 删除验证密码
      delpassword(index, row) {
        this.$prompt('为保障用户安全，请输入您的登录密码通过验证', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /^.{3,12}$/,
          inputType: 'password',
          // inputErrorMessage: '长度在3~12之间，只能包含字母、数字和下划线'
        }).then(({value}) => {
          this.delPW(value, index, row)
        }).catch(() => {

        })
      },
      async delPW(value, index, row) {
        let url = 'customer/mobileCustomerInfo/validatePassword.do'
        let body = {
          password: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          // console.log(index, row)
          if (res.isCorrect == 1) {
            this.isPW = true
            this.delIP(row.ipAuthId)
          }
          else {
            this.message = "密码验证失败"
            this.error()
          }
        }
      },
      // 删除IP地址
      async delIP(value) {
        let url = 'customer/mobileIpAuth/delIpAuth.do'
        let body = {
          ipAuthId: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.getIPlist()
          this.message = "IP地址删除" + res.message
          this.success()
        }
      },

      // 消息样式弹窗
      success() {
        this.$message({
          showClose: true,
          message: this.message,
          type: 'success'
        });
      },
      error() {
        this.$message({
          showClose: true,
          message: this.message,
          type: 'error'
        });
      },
      info() {
        this.$message(this.message);
      },
      isPWAdd() {
        if (this.isPW) {
          this.addIP()
        } else {
          this.changeAdd()
        }
      },
      // 新增ip地址,验证密码
      changeAdd() {
        this.$prompt('为保障用户安全，请输入您的登录密码通过验证', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /^.{3,12}$/,
          inputType: 'password',
          // inputErrorMessage: '长度在3~12之间，只能包含字母、数字和下划线'
        }).then(({value}) => {
          this.changetest(value)
        }).catch(() => {

        })
      },
      async changetest(value) {
        let url = 'customer/mobileCustomerInfo/validatePassword.do'
        let body = {
          password: value
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          if (res.isCorrect == 1) {
            this.isPW = true
            this.addIP()
          }
          else {
            this.message = "密码验证失败"
            this.error()
          }
        }
      },
      addIP() {
        this.$prompt('请输入IP地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
          inputErrorMessage: 'IP格式不合法'
        }).then(({value}) => {
          this.addPostIP(value)
        }).catch(() => {

        })
      },
      // 提交IP地址
      async addPostIP(value) {
        // alert(value)
        let url = 'customer/mobileIpAuth/addIpAuth.do'
        let body = {
          ipAuth: value

        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.getIPlist()
          this.message = "IP地址添加" + res.message
          this.success()
        }
        else {
          this.message = res.message
          this.error()
        }
      },
      async userIp(ip) {
        let url = 'customer/mobileIpAuth/addIpAuth.do'
        let body = {
          ipAuth: ip
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.getIPlist()
        }

      },
    },
    created() {
      this.getIP()
      this.Gip()


    }
  }
</script>
<style scoped>
  .userip {
    min-width: 600px;
  }

  .ip-content {
    margin-top: 30px;
  }

  .ip-table {
    width: 60%;
    min-width: 600px;
    margin-top: 30px;

  }
</style>
