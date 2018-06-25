<template>
  <div>
    <el-form :model="formData" label-width="90px" class="form-search">
      <el-row>
        <el-col :span="8">
          <el-form-item label="发送时间">
            <el-date-picker v-model="formData.timeArr" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="formData.status" placeholder="请选择">
              <el-option label="不限" value=""></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="失败" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input
              placeholder="请输入手机号"
              v-model="formData.mobile"
              maxlength="40"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模板名称">
            <el-input
              placeholder="请输入模板名称"
              maxlength="40"
              v-model="formData.templateName"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getHistoryInfo">搜索</el-button>
            <el-button type="text" class="cMore" style="margin-left: 30px" @click="toclear">清除条件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="content-table">
      <el-table v-loading="mainLoading" :data="templateArray" header-align="center"
                style="width: 100%; ">
        <div slot="empty">
          您还未有发送历史
        </div>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          label="发送时间"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span>{{scope.row.createTime |converDate}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="模板名称"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.templateName.length<10">{{scope.row.templateName}}</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{ scope.row.templateName }}</p>
              <div slot="reference">
                {{scope.row.templateName | snippet}}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="短信信息"
          align="center"
          min-width="300">
          <template slot-scope="scope">
            <span v-if="scope.row.content.length<10">{{scope.row.content}}</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{ scope.row.content }}</p>
              <div slot="reference">
                {{scope.row.content | snippet}}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          align="center"
          min-width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1 ">成功</span>
            <span v-else="scope.row.status ==0 ">失败 {{scope.row.errorMessage}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-page" v-if="pageInfo.totalResult">
      <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.showCount" :total="pageInfo.totalResult"
                     @current-change="handleCurrentChange" background layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import miment from "miment"

  export default {
    data() {
      return {
        formData: {
          timeArr: [],
          mobile: "",
          createTime: '',
          templateName: '',
          content: '',
          status: '',
          errorMessage: ""
        },
        mainLoading: false,
        templateArray: [],
        pageInfo: {
          currentPage: 1,
          showCount: 20,
          totalResult: 0
        },
      }
    },
    filters: {
      converDate(value) {
        return miment(value).format('YYYY-MM-DD hh:mm:ss')
      },
      snippet(value) {
        return value.slice(0, 10) + "..."
      }
    },

    methods: {
      toclear() {
        this.formData = {}
        this.getHistoryInfo()
      },
      async pageTmpInfo(val) {
        let url = 'customer/mobileSendHistory/searchSendHistory.do'
        let body = {
          currentPage: val
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.templateArray = res.logArray
        }
      },
      async getHistoryInfo() {
        let url = 'customer/mobileSendHistory/searchSendHistory.do'
        let reqDate = {
          mobile: this.formData.mobile,
          templateKey: this.formData.templateKey,
          status: this.formData.status,
          currentPage: this.formData.currentPage,
          showCount: this.formData.showCount,
          templateName: this.formData.templateName,
        }
        reqDate = Object.assign({}, reqDate, this.formData)
        reqDate.createTimeStart = reqDate.timeArr && reqDate.timeArr.length >= 2 ? reqDate.timeArr[0] : ''
        reqDate.createTimeEnd = reqDate.timeArr && reqDate.timeArr.length >= 2 ? reqDate.timeArr[1] : ''
        delete reqDate.timeArr
        let res = await this.post(url, reqDate)
        if (res.code == 1) {
          // console.log(res)
          this.pageInfo.totalResult = res.totalResult
          this.templateArray = res.logArray
        } else {
          this.submitErr(res.message)
        }
      },
      submitErr(message) {
        this.$message.error(message)
      },
    },
    created() {
      this.getHistoryInfo()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .content-page {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .form-search {

    .el-input {
      width: 80%;
    }
    .el-date-editor {
      width: 80%;
    }
    .el-select {
      width: 80%;
    }
  }
</style>
