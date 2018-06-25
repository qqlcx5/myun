<template>
  <div>
    <div class="content-input" style="margin-left: 14px">
      <span>名称：</span>
      <el-input v-model="templateName" placeholder="请输入名称" style="width: 20%;margin-right:40px;"
                maxlength="40"></el-input>
      <span>Key：</span>
      <el-input v-model="templateKey" placeholder="请输入Key"
                style="width: 20%;margin-left:4px;margin-right:40px;" maxlength="40"></el-input>

      <span style="">状态：</span>
      <el-select v-model="examineStatus" slot="prepend" placeholder="请选择">
        <el-option label="不限" value=""></el-option>
        <el-option label="审核通过" value="1"></el-option>
        <el-option label="审核拒绝" value="2"></el-option>
        <el-option label="审核中" value="0"></el-option>
      </el-select>


      <br><br>
      <br><span>内容：</span>
      <el-input v-model="templateContent" placeholder="请输入内容" style="width:  20%;margin-right:40px;"
                maxlength="40"></el-input>
      <span>备注：</span>
      <el-input placeholder="请输入备注" v-model="templateRemark" style="width:  20%;margin-right:40px;"
                maxlength="40"></el-input>
      <el-button type="primary" @click="searchTmpInfo()">搜索</el-button>
      <el-button type="text" style="margin-left: 10px" @click="toclear">清空条件</el-button>
    </div>
    <div class="content-button" style="margin: 22px 0 22px 14px">
      <el-button type="primary" icon="el-icon-plus" @click="$router.push({name:'tmpAdd'})">创建短信模板</el-button>
    </div>
    <div class="content-table">
      <el-table v-loading="mainLoading" :data="confignArray" header-align="center"
                style="width: 100%; ">
        <!--<div slot="empty">-->
          <!--没有模板，-->
          <!--<router-link to="tmpAdd">-->
            <!--<el-button type="text">点击添加</el-button>-->
          <!--</router-link>-->
        <!--</div>-->
        <el-table-column
          label="名称"
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
          label="Key"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.templateKey.length<10">{{scope.row.templateKey}}</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{ scope.row.templateKey }}</p>
              <div slot="reference">
                {{scope.row.templateKey | snippet}}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="备注"
          align="center"
          width="200">
          <template slot-scope="scope">

            <span v-if="!scope.row.templateRemark">{{scope.row.templateRemark}}</span>
            <span v-else-if="scope.row.templateRemark.length < 10">{{scope.row.templateRemark}}</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{ scope.row.templateRemark}}</p>
              <div slot="reference">
                {{scope.row.templateRemark | snippet }}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="内容"
          align="center"
          min-width="300">
          <template slot-scope="scope">
            <span v-if="scope.row.templateContent.length<10">{{scope.row.templateContent}}</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{ scope.row.templateContent }}</p>
              <div slot="reference">
                {{scope.row.templateContent | snippet}}
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column
          label="状态"
          min-width="160"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.examineStatus ===0" class="tGreen">审核中</span>
            <span v-if="scope.row.examineStatus ===1">审核通过</span>
            <span v-if="scope.row.examineStatus ===2" class="tRed">审核拒绝</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         min-width="130"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push({name:'tmpStatus',params:{id:scope.row.templateId}})">设置
            </el-button>
            <el-button type="text" @click="delBox(scope.row.templateId)" v-if="scope.row.examineStatus !==1">删除
            </el-button>
            <el-button type="text" @click="successDelBox(scope.row.templateId)" v-else>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-page">
      <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.showCount" :total="pageInfo.totalResult"
                     @current-change="handleCurrentChange" background layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        confignArray: [],
        mainLoading: false,
        examineStatus: '',
        templateName: '',
        templateKey: '',
        templateContent: "",
        templateRemark: "",
        pageInfo: {
          currentPage: 1,
          showCount: 20,
          totalResult: 0
        },
        templateArray: '',
        templateId: ''
      }
    },
    filters: {
      snippet(value) {
        return value.slice(0, 10) + "..."
      }
    },
    methods: {
      toclear() {
        this.examineStatus = '',
          this.templateName = '',
          this.templateKey = '',
          this.templateContent = '',
          this.templateRemark = ''
        this.searchTmpInfo()
      },
      submitErr(message) {
        this.$message.error(message)
      },
      handleCurrentChange(val) {
        this.pageTmpInfo(val)
      },
      async pageTmpInfo(val) {
        this.mainLoading = true
        let url = 'customer/mobileSmsTemplate/searchTemplate.do'
        let body = {
          currentPage: val
        }
        let res = await this.post(url, body)
        this.mainLoading = false
        if (res.code == 1) {
          this.templateArray = res.templateArray
          this.pageInfo.totalResult = res.totalResult
        }
      },
      async searchTmpInfo() {

        let url = 'customer/mobileSmsTemplate/searchTemplate.do'
        let body = {
          examineStatus: this.examineStatus,
          templateName: this.templateName,
          templateKey: this.templateKey,
          templateContent: this.templateContent,
          templateRemark: this.templateRemark,
          currentPage: this.currentPage,
          showCount: this.showCount
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          console.log(res)
          this.templateId = res.templateId
          this.pageInfo.totalResult = res.totalResult
          this.confignArray = res.templateArray
        } else {
          this.submitErr(res.message)
        }
      },
      // 删除弹窗
      delBox(val) {
        this.$confirm('是否确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.delTmpDetail(val)
        }).catch(() => {

        });
      },
      successDelBox(val) {
        this.$confirm('删除此模板后将不可调用？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.delTmpDetail(val)
        }).catch(() => {

        });
      },
      async delTmpDetail(val) {

        let url = 'customer/mobileSmsTemplate/delTemplate.do'
        let body = {
          templateId: val
        }
        let res = await this.post(url, body)
        if (res.code == 1) {
          this.searchTmpInfo()
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }
      },
    },

    created() {
      this.searchTmpInfo()
    }

  }
</script>

<style scoped>

  .content-page {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  /*.content-page .el-pagination {*/
  /*margin-right: 10%;*/
  /*}*/
</style>
