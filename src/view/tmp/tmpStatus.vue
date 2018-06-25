<template>
  <div>
    <div class="tmp-top">
      <div class="title"><i></i>
        <span>模板参数</span>
        <el-button type="small" style="margin-left: 44px" @click="$router.go(-1)">返回上层</el-button>
      </div>
      <div class="status">

        <span v-if="examineStatus===0">状态：<i class="tGreen">审核中</i></span>
        <span v-else-if="examineStatus===1">状态：审核通过</span>

        <div v-else="examineStatus===2">
          <span>状态：<i class="tRed">审核拒绝</i></span><br><br>
          <span>拒绝原因：<i class="tRed">{{examineReason}}</i></span>
        </div>


      </div>
      <div class="tmp-form">
        <el-form label-width="80px">
          <el-form-item label="*名称：">
            <el-input v-model="templateName" placeholder="234234" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item label="*key：">
            <el-input v-model="templateKey" placeholder="00012" maxlength="40"></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="templateRemark" placeholder="注册时使用" maxlength="200"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tmp-botton">
      <!--左部分-->
      <div class="tmp-left">
        <div class="title padd"><i></i>
          <span>模板内容</span>
        </div>

        <div class="areaBox">
            <textarea
              class="textArea"
              maxlength="200"
              placeholder="您的验证码是： #${23423}"
              v-model="templateContent"
              @input="descInput()">
            </textarea>
          <div class="remnant"><span>当前已输入{{remnant}}字</span></div>
        </div>
        <div class="tmp-instru">
          <ul>
            <li>•&nbsp;替换符为 #${***} <i class="tag-read" data-clipboard-text="#${***}" @click="copy">复制</i>
              ”***”可以替换成相应的识别码；
            </li>
            <li>•&nbsp;相关替换字符规则请点击&nbsp;&nbsp;<a href="#">下载接口说明文档</a></li>
          </ul>
        </div>
        <el-button type="primary" @click="addJudgment()">提交审核</el-button>
      </div>
      <div class="tmp-right">
        <img src="~@/assets/iphone-mobile.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        templateName: '',
        templateKey: '',
        templateContent: '',
        templateRemark: '',
        examineStatus: '',
        remnant: 0,
        templateId: this.$route.params.id,

      }
    },
    methods: {
      success(val) {
        this.$message.success(val);
      },
      descInput() {
        this.remnant = this.templateContent.length;
      },
      // 获取模板详情信息
      async getIdDetail() {
        let url = 'customer/mobileSmsTemplate/detailTemplate.do'
        let body = {
          templateId: this.templateId
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          // console.log(res)
          this.templateName = res.templateName
          this.templateKey = res.templateKey
          this.templateContent = res.templateContent
          this.templateRemark = res.templateRemark
          this.examineStatus = res.examineStatus
          this.examineReason = res.examineReason
          this.descInput()
        }
      },
      // 判断输入情况在提交
      addJudgment() {
        if (!this.templateName) {
          this.success("您有必填信息未填写")
          return;
        }
        else if (!this.templateKey) {
          this.success("您有必填信息未填写")
          return;
        }
        else if (!this.templateContent) {
          this.success("您有必填信息未填写")
          return;
        } else {
          this.submitCondition()
        }
      },
      //  根据审核条件弹窗
      submitCondition() {
        if (this.examineStatus === 1) {
          this.$confirm('是否替换模板内容重新审核？<br>审核期间，将不能使用原模板', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            dangerouslyUseHTMLString: true
          }).then(() => {
            this.addPost()
          }).catch(() => {

          });
          return;
        }
        else if (this.examineStatus === 0) {
          this.$confirm('是否替换模板内容重新审核？', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
          }).then(() => {
            this.addPost()
          }).catch(() => {

          });
        } else {
          this.$confirm('是否替换模板内容重新审核？', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
          }).then(() => {
            this.addPost()
          }).catch(() => {

          });
        }
      },

      // 提交编辑后的内容
      async addPost() {
        let url = 'customer/mobileSmsTemplate/editTemplate.do'
        let body = {
          templateId: this.templateId,
          templateName: this.templateName,
          templateKey: this.templateKey,
          templateContent: this.templateContent,
          templateRemark: this.templateRemark
        }

        let res = await this.post(url, body)
        if (res.code == 1) {
          this.success('提交' + res.message)
        }
      },
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.success('复制成功')
          // 释放内存
          clipboard.destroy()
        })
      }
    },
    created() {
      this.getIdDetail()
    },
  }
</script>

<style scoped>
  .tGreen {
    color: #64C15C;
  }

  .tag-read {
    cursor: pointer;
    color: #1989FA;
  }

  .status {
    display: flex;
    margin-top: 30px;
    font-size: 16px;
    margin-left: 24px;

  }

  .tmp-top {
    border-bottom: 1px dashed #e1e1e1;
    padding-bottom: 40px;
  }

  .tmp-form {
    margin-top: 42px;
  }

  .tmp-form .el-input {
    width: 240px;
    height: 40px;
  }

  .tmp-botton {
    display: flex;
    margin-bottom: 246px;
  }

  /*调整主题边距*/
  .padd {
    padding: 30px 0;
  }

  .textArea {
    width: 426px;
    height: 116px;
    resize: none;
    margin-left: 8px;
    border-radius: 4px;
    border: solid 1px #dcdfe6;

    color: #707070;
    padding: 10px 10px 10px 16px;
  }

  .areaBox {
    position: relative;
  }

  .remnant {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .tmp-instru {
    margin-left: 18px;

    color: #999;
    height: 56px;
    line-height: 28px;
  }

  .tmp-left .el-button {
    margin-left: 8px;
    margin-top: 64px;
  }

  .tmp-right {
    width: 416px;
    height: 326px;
    background: #999;
    margin-top: 64px;
    margin-left: 70px;
    overflow: hidden;
  }
</style>
