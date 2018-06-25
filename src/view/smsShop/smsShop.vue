<template>
  <div class="wrap">
    <div class="bannerWrap" v-if="bannerList && bannerList.length">
      <el-carousel height="calc(20vw - 64px)" :interval="5000" trigger="click">
        <el-carousel-item v-for="(item, i) in bannerList" :key="i">
          <img class="bannerImg" :src="item.bannerImg" alt="" @click="toClickBanner(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content-button" style="margin: 22px 0 22px 14px">
      <router-link to="/smsHistory">
        <div class="bgBtn">
          <img src="../../assets/icon-history.png" alt=""><span>购买历史</span></div>
      </router-link>
      <!--<el-button type="primary">全部套餐</el-button>-->
      <!--<el-button >营销短信套餐</el-button>-->
      <!--<el-button >系统模板短信套餐</el-button>-->
    </div>
    <el-table :data="listData" style="width: 100%"  v-loading="mainLoading">
        <el-table-column label="短信类型"  align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.setmealType === 0">系统模板短信</span>
          </template>
        </el-table-column>
        <el-table-column label="套餐名称" prop="setmealName" align="center" min-width="200"> </el-table-column>
        <el-table-column align="center" label="原价" min-width="180">
          <template slot-scope="scope">
            <span class="through">{{ $formatMoney(scope.row.setmealCost) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售价" prop="setmealPrice" align="center" min-width="180">
          <template slot-scope="scope">
            <span class="tRed">{{ $formatMoney(scope.row.setmealPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="条数" prop="setmealSmsNum"  align="center" min-width="180"> </el-table-column>
      <el-table-column label="资费标准" prop="date" align="center" min-width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px" class="tRed">{{(scope.row.setmealPrice / scope.row.setmealSmsNum).toFixed(2)}}</span> 元/条
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <router-link :to="`/smsConfirm?setmealId=${scope.row.setmealId}`">
              <el-button type="text">前往购买</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    <div class="content-page" v-if="pageInfo.totalResult">
      <el-pagination
         :current-page="pageInfo.currentPage"
         :total="pageInfo.totalResult"
         :page-size="pageInfo.showCount"
         @current-change="handleCurrentChange"
        background
        layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mainLoading: false,
        bannerList: [],
        listData: [],
        pageInfo: {
          currentPage: 1,
          showCount: 20,
          totalResult: 0
        },
      }
    },
    created () {
      this.getBannerList()
      this.getList()

    },
    methods: {
      // 获得banner列表
      async getBannerList () {
        let res = await this.post('customer/mobileBanner/list.do')
        if (parseInt(res.code) === 1) {
          this.bannerList = res.bannerArray || []
        } else {
          this.$message.error(res.message)
        }
      },
      // 获得套餐列表（商品列表）
      async getList () {
        let reqDate = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount,
          setmealType: ''
        }
        this.mainLoading = true
        let res = await this.post('customer/mobileSetmeal/searchSetmeal.do',reqDate)
        this.mainLoading = false
        if (parseInt(res.code) === 1) {
          this.listData = res.setmealArray
          this.pageInfo.totalResult = res.totalResult
        } else {
          this.$message.error(res.message)
        }
      },
      // 切换页面
      handleCurrentChange (val) {
        this.pageInfo.currentPage = val
        document.querySelector('.container').scrollTo(0, 0)
        this.getList()
      },
      // 点击banner 图片
      toClickBanner(item) {
        if (item.isJump) {
          location.href = item.jumpUrl
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .bgBtn {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    padding: 0 12px;
    height: 40px;
    color: #fff;
    background-color: #64c15c;
    img {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
  }
  .wrap{
    padding-right: 30px;
  }

  .content-page {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .through {
    text-decoration: line-through;
  }

  // banner模块
  .bannerWrap{
    min-width: 1180px;
    .bannerImg{
      width: 100%;
      height: auto;
      max-height: 100%;
    }
    .el-carousel__container{
      min-height: 220px;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  // banner模块
  .bannerWrap{
    .el-carousel__container{
      min-height: 220px;
    }
    .el-carousel__button{
      background-color: #333;
    }
  }
</style>
