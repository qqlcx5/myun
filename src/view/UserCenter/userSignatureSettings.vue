<template>
  <div>
    <div class="title">
      <i></i>
      <span class="t333">签名设置</span>
    </div>
    <div class="magT30">
      <el-button @click="addSign" v-if="showAddsign">新增签名</el-button>
      <el-dialog title="添加签名" :visible.sync="Signdialog" center width="560px">
        <el-form :model="sign" :rules="rules">
          <el-form-item label="签名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="sign.name" maxlength="8" placeholder="推荐使用2-8个英文或者汉字" @input="descInput"></el-input>
            <div class="descInput">{{remnant}}/8</div>
          </el-form-item>
          <el-form-item>
            <p style="margin-left: 12%">
              1、根据中国运营商规定，每条短信必需添加签名标签
            </p>
            <p style="margin-left: 12%">
              2、签名格式为中文括号加里面内容，内容为2-8字，
            </p>
            <p style="margin-left: 12%">
              建议使用汉字，如：【M信云】，不能包括网址或者特殊字符。
            </p>
            <p style="margin-left: 12%">
              3、您设置好签名之后，签名会自动添加在短信开头。
            </p>
            <p style="margin-left: 12%">
              4、签名也会占用短信字数，请注意签名长度。
            </p>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Signdialog = false">取 消</el-button>
          <el-button :disabled="disBtn" type="primary" @click="submitSign()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <div class="sign-table">
      <template>
        <el-table
          :data="tableData">
          <el-table-column
            prop="signName"
            label="签名名称"
            align="center"
            min-width="300">
          </el-table-column>

          <el-table-column
            label="状态"
            min-width="150"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.examineStatus ===0">审核中</span>
              <span v-if="scope.row.examineStatus ===1">审核成功</span>
              <el-popover v-if="scope.row.examineStatus === 2" trigger="hover" placement="top">
                <p>{{ scope.row.examineReason }}</p>
                <div slot="reference">
                  审核拒绝
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="TFSign">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div style="margin-top: 30px;font-size: 14px;color: #666">
      * 若存在异议请 <span class="tBlue" style="cursor: pointer" @click="contact">联系客服</span>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        let req = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
        if (!req.test(value)) {
          this.disBtn = true
          callback('签名含有非法字符')
          return;
        } else {
          this.disBtn = false
        }
      };
      return {
        tableData: [],
        signName: '',
        message: '',
        disBtn: '',    // 提交按钮
        signId: '',
        examineReason: "",
        showAddsign: true,   // 显示隐藏添加签名按钮
        Signdialog: false,
        formLabelWidth: '90px',
        remnant: 0,
        sign: {
          name: ''
        },
        rules: {
          name: [
            {required: false},
            {validator: validatePass, trigger: 'change'},
          ]
        },
      }
    },
    methods: {
      descInput() {

        this.remnant = this.sign.name.length;
      },
      // 弹消息窗
      addSuccess() {
        this.$message.success(this.message);
      },
      //添加 签名内容
      addSign() {
        this.Signdialog = true

        // this.$prompt('签名中无需添加【】符号，避免重复', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputPattern: /^.{0,4}$/,
        //   inputErrorMessage: '签名不合法',
        //   inputPlaceholder: "长度不超过4字符"
        // }).then(({value}) => {
        //   this.submitSign(value)
        // }).catch(() => {
        //
        // });
      },
      // 添加签名
      async submitSign() {
        let url = 'customer/mobileCustomerSign/addSign.do'
        let body = {
          signName: this.sign.name
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.Signdialog = false
          this.getUserInfo()
          // this.message = res.message
          // this.addSuccess()
        }
        else {
          this.message = res.message
          this.addErr()
        }

      },
      // 删除签名
      TFSign() {
        this.$confirm('是否确认删除？', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
        }).then(() => {
          this.delSign()
        }).catch(() => {

        });
      },
      async delSign() {
        let url = 'customer/mobileCustomerSign/delSign.do'
        let body = {signId: this.signId}
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.message = "删除" + res.message
          this.addSuccess()
          this.getUserInfo()
        }
        else {
          this.message = "删除" + res.message
          this.addErr()
        }

      },
      contact() {
        // message: h('p', {style: 'color: #1989FA;fontSize:30px;marginTop:10px'}, '0592-2061870')
        const h = this.$createElement;
        this.$msgbox({
          title: '联系方式',
          center: true,
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          message: h('p', null, [
            h('p', {style: 'marginTop:16px'}, [
              h('span', {style: 'color: #666;fontSize:18px;marginRight:20px'}, '咨询电话:  '),
              h('span', {style: 'color: #1989FA;fontSize:28px;'}, '  0592-2061870')
            ]),
            h('p', {style: 'marginTop:16px'}, [
              h('span', {style: 'color: #666;fontSize:18px;marginRight:50px'}, 'QQ:'),
              h('span', {style: 'color: #1989FA;fontSize:28px;'}, '2192979180')
            ])
          ])
        }).then(() => {

        }).catch(() => {

        })
      },

      // 获取签名信息
      async getUserInfo() {
        let url = 'customer/mobileCustomerSign/listSign.do';
        let res = await this.post(url)
        if (res.code == 1) {
          // console.log(res.signArray)
          let signInfo = res.signArray[0] || {}
          this.signId = signInfo.signId
          if (this.signId) {
            this.showAddsign = false
          }
          else {
            this.showAddsign = true
          }
          this.tableData = res.signArray
          // // 判断数组是否为空
          // if (!res.signArray[0] == 0) {
          //   this.showAddsign = false     // 隐藏添加签名
          //   let signInfo = res.signArray[0] || {}
          //   this.signId = signInfo.signId
          //
          //   if (signInfo.examineStatus == 0) {
          //     signInfo.examineStatus = "审核中"
          //
          //   }
          //   else if (signInfo.examineStatus == 1) {
          //     signInfo.examineStatus = "审核通过"
          //   }
          //   else {
          //     signInfo.examineStatus = "审核拒绝"
          //     this.examineReason = signInfo.examineReason
          //
          //   }
          //   this.$data.tableData.push(signInfo)
        }
        else {
          this.submitErr(res.message)
        }
      }
    },
    created() {
      this.getUserInfo()
    }

  }
</script>
<style scoped>
  .el-input {
    width: 80%;
    position: relative;
  }

  .descInput {
    position: absolute;
    right: 10%;
    top: 0;
  }

  .el-dialog {
    min-width: 300px;
  }

  .sign-table {
    width: 60%;
    min-width: 600px;
    margin-top: 30px;
  }
</style>
