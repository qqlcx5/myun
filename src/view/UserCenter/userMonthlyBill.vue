<template>
  <div>
    <div>
      <el-button type="primary" @click="exportExcel()">导出账单</el-button>
    </div>

    <div class="magT30">
      <template>
        <el-table
          :data="reportArray">
          <el-table-column
            prop="timeStr"
            label="月份"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="lastMonthRemainNum"
            label="上月剩余条数"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="currentMonthRechargeNum"
            label="当月充值条数"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="currentMonthUseNum"
            label="当月使用条数"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="currentMonthRemainNum"
            label="月末剩余条数"
            align="center"
            min-width="130">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
  // import miment from 'miment'

  export default {
    data() {
      return {
        reportArray: [],
        url: ''
      }
    },
    methods: {
      submitErr(message) {
        this.$message.error(message)
      },
      async exportExcel() {
        let url = 'customer/mobileAccountReport/exportExcel.do'
        let res = await this.post(url)
        if (res.code == 1) {
          console.log(res)
          window.location.href = res.url
        }
      },
      async GetMonthlyBill() {
        // let time = miment().add(-1, 'MM').format('YYYY.MM')
        let url = 'customer/mobileAccountReport/list.do'
        // let body = {
        //   timeStr: time
        // }
        let res = await this.post(url)
        if (res.code == 1) {
          this.reportArray = res.reportArray
        } else {
          this.submitErr(res.message)
        }
      },
    },
    created() {
      this.GetMonthlyBill()
    }
  }
</script>
<style scoped>
  .el-button a {
    color: #fff;
  }
</style>
