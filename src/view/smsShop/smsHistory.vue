<template>
  <div class="wrap">
    <div class="bannerWrap" v-if="bannerList && bannerList.length">
      <el-carousel height="calc(20vw - 64px)" :interval="5000" trigger="click">
        <el-carousel-item v-for="(item, i) in bannerList" :key="i">
          <img class="bannerImg" :src="item.bannerImg" alt="" @click="toClickBanner(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-form :model="formData" label-width="90px" class="content-top">
      <el-row>
        <el-col :span="8">
          <el-form-item label="购买时间">
            <el-date-picker v-model="formData.timeArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="充值状态">
            <el-select v-model="formData.orderStatus" placeholder="请选择">
              <el-option label="不限" value=""> </el-option>
              <el-option label="未付款" :value="0"> </el-option>
              <el-option label="已完成" :value="1"> </el-option>
              <el-option label="已取消" :value="4"> </el-option>
              <el-option label="审核中" :value="2"> </el-option>
              <el-option label="审核失败" :value="3"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式">
            <el-select v-model="formData.payType" placeholder="请选择">
              <el-option label="不限" value=""> </el-option>
              <el-option label="微信" :value="0"> </el-option>
              <el-option label="支付宝" :value="1"> </el-option>
              <el-option label="对公账单" :value="2"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="短信类型">
            <el-select v-model="formData.setmealType" placeholder="请选择">
              <el-option label="不限" value=""> </el-option>
              <!--<el-option label="营销短信" value="2"> </el-option>-->
              <el-option label="系统模板短信" :value="0"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="toSearch">搜索</el-button>
            <el-button type="text" class="cMore" @click="toClear" style="margin-left: 30px">清除条件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="content-bottom">
      <el-table v-loading="mainLoading" :data="listData" header-align="center" style="width: 100%; min-height: 200px;">
        <div slot="empty">
          没有购买历史，
          <router-link to="smsShop">
            <el-button type="text">点击购买</el-button>
          </router-link>
        </div>
        <el-table-column label="套餐" prop="setmealName" align="center"> </el-table-column>
        <el-table-column label="购买时间" align="center" min-width="130">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{getTime(scope.row.createTime )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="短信类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.setmealType === 0">系统模板短信</span>
          </template>
        </el-table-column>
        <el-table-column label="购买数量" prop="setmealSmsNum" align="center">
          <template slot-scope="scope">
            <span class="red">{{scope.row.setmealSmsNum || 0}}</span> 条
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="orderPrice" align="center">
          <template slot-scope="scope">
            <span class="red">{{$formatMoney(scope.row.orderPrice)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.payType === 1">支付宝</span>
            <span v-if="scope.row.payType === 0">微信</span>
            <span v-if="scope.row.payType === 2">对公账单</span>
          </template>
        </el-table-column>
        <el-table-column label="充值状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus === 0"><el-button type="text" @click="toPayNow(scope.row)">未付款</el-button></span>
            <span v-if="scope.row.orderStatus === 1">已完成</span>
            <span v-if="scope.row.orderStatus === 2">审核中</span>
            <span v-if="scope.row.orderStatus === 3">审核失败</span>
            <span v-if="scope.row.orderStatus === 4">已取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link v-if="scope.row.orderStatus === 1" :to="`/smsConfirm?setmealId=${scope.row.setmealId}`">
              <el-button type="text">再次购买</el-button>
            </router-link>
            <router-link v-else-if="scope.row.orderStatus === 3" :to="`smsPublicTransfer?orderSn=${scope.row.orderSn}&from=smsHistory`">
              <el-button type="text">重新提交</el-button>
            </router-link>
            <span v-else>-</span>
            <!--<router-link ><el-button type="text">再次购买</el-button></router-link>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-page" v-if="pageInfo.totalResult">
    <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.showCount" :total="pageInfo.totalResult"
                   @current-change="handleCurrentChange" background layout="prev, pager, next">
    </el-pagination>
    </div>
    <payCodeDialog v-if="weChatInfo.visibile" :codeUrl="weChatInfo.weChatCodeUrl" :orderSn="weChatInfo.orderSn"
                   :successCallBack="successCallBack" :closeCallBack="closeCallBack"/>
  </div>
</template>
<script>
  import miment from 'miment'
  import payCodeDialog from './components/payCodeDialog'

  export default {
    components: {
      payCodeDialog
    },
    data() {
      return {
        mainLoading: false,
        formData: {
          setmealType: '',
          payType: '',
          orderStatus: '',
          createTimeStartStr: '',
          createTimeEndStr: '',
          timeArr: []
        },
        bannerList: [],
        listData: [],
        pageInfo: {
          currentPage: 1,
          showCount: 20,
          totalResult: 0
        },
        weChatInfo: {
          weChatCodeUrl: '', // 扫码支付二维码链接
          orderSn: '',
          visibile: false
        }
      }
    },
    created() {
      if (this.$route.query.trade_no) { // 支付宝支付成功
        this.$router.push('smsPaySuccess')
      }
      this.getBannerList()
      this.getList()
    },
    methods: {
      // 获得banner列表
      async getBannerList() {
        let res = await this.post('customer/mobileBanner/list.do')
        if (parseInt(res.code) === 1) {
          this.bannerList = res.bannerArray || []
        } else {
          this.$message.error(res.message)
        }
      },
      // 获得套餐列表（商品列表）
      async getList() {
        let reqDate = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount
        }
        reqDate = Object.assign({}, reqDate, this.formData)
        reqDate.createTimeStartStr = reqDate.timeArr && reqDate.timeArr.length >= 2 ? reqDate.timeArr[0] : ''
        reqDate.createTimeEndStr = reqDate.timeArr && reqDate.timeArr.length >= 2 ? reqDate.timeArr[1] : ''
        delete reqDate.timeArr
        this.mainLoading = true
        let res = await this.post('customer/mobileOrder/searchOrder.do', reqDate)
        this.mainLoading = false
        if (parseInt(res.code) === 1) {
          this.listData = res.orderArray
          this.pageInfo.totalResult = res.totalResult
        } else {
          this.$message.error(res.message)
        }
      },
      // 搜索
      toSearch() {
        this.pageInfo.currentPage = 1
        document.querySelector('.container').scrollTo(0, 0)
        this.getList()
      },
      // 清空
      toClear() {
        this.formData = {
          setmealType: '',
          payType: '',
          orderStatus: '',
          createTimeStartStr: '',
          createTimeEndStr: '',
          timeArr: []
        }
        this.pageInfo.currentPage = 1
        this.getList()
      },
      // 切换页面
      handleCurrentChange(val) {
        this.pageInfo.currentPage = val
        document.querySelector('.container').scrollTo(0, 0)
        this.getList()
      },
      // 点击banner 图片
      toClickBanner(item) {
        if (item.isJump) {
          location.href = item.jumpUrl
        }
      },
      // 去支付
      toPayNow(data) {
        if (data.payType === 0) { // 微信支付
          this.weChatPay(data.orderSn)
          return
        }
        if (data.payType === 1) { // 支付宝
          debugger
          this.aliPay(data.orderSn)
          return

        }
        if (data.payType === 2) { // 对公转账
          this.$router.push(`smsPublicTransfer?orderSn=${data.orderSn}`)
          return
        }
      },
      // 支付宝支付
      aliPay(sn) {
        let returnUrl = window.location.protocol + '//' + window.location.host + '/#/smsHistory';
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {}

        let reqData = {
          sn,
          pluginId: 'alipayWebPlugin',
          returnUrl: encodeURIComponent(returnUrl),
          token: loginInfo.token,
          customerId: loginInfo.customerId
        }
        window.location.href = `/customer/mobilePay/pay.do?&token=${reqData.token}&customerId=${reqData.customerId}&sn=${reqData.sn}&pluginId=${reqData.pluginId}&returnUrl=${reqData.returnUrl}`
      },

      // 去支付 微信的支付
      async weChatPay(sn) {
        let reqData = {
          sn,
          pluginId: 'wechatScanCodePlugin'
        }
        this.submitLoading = true
        let res = await this.post('customer/mobilePay/pay.do', reqData)
        this.submitLoading = false
        if (parseInt(res.code) === 1) {
          this.weChatInfo.weChatCodeUrl = res.codeUrl
          this.weChatInfo.orderSn = sn
          this.weChatInfo.visibile = true
        } else {
          this.$message.error(rers.message)
        }

      },
      // 微信支付成功
      successCallBack() {
        this.weChatInfo.visibile = false
        this.getList()
      },
      // 扫码弹窗关闭
      closeCallBack() {
        this.weChatInfo.visibile = false
      },

      getTime(val) {
        return miment(val).format('YYYY-MM-DD hh:ss')
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .wrap {
    padding-right: 30px;
  }

  .red {
    color: #fa3030;
  }

  .content-top {
    padding-top: 24px;
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
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

  .content-bottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
  }

  .content-page {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 50px;
  }

  .content-page .el-pagination {
    margin-right: 60px;
  }

  // banner模块
  .bannerWrap {
    min-width: 1180px;
    margin-bottom: 30px;
    .bannerImg {
      width: 100%;
      height: auto;
      max-height: 100%;
    }
    .el-carousel__container {
      min-height: 220px;
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  // banner模块
  .bannerWrap {
    .el-carousel__container {
      min-height: 220px;
    }
    .el-carousel__button {
      background-color: #333;
    }
  }

</style>
