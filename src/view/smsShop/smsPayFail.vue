<template>
  <div class="payFalse">
    <img src="./assets/fail-icon.png">
    <span>付款失败</span>
    <p>如果您有任何疑问，请立即联系客服。</p>
    <p>邮箱：XXXX@XXXXX.com</p>
    <p>电话：400-XXX-XXXX</p>
    <div class="payButton">
      <el-button type="primary">重新支付</el-button>
      <router-link to="smsHistory">
        <el-button>查看订单</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return{

      }
    }
  }
</script>

<style scoped>
  .payFalse{
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
  }
  .payFalse img{
    width: 90px;
    height: 90px;
  }
  .payFalse span{
    height: 60px;
    line-height: 60px;
    font-weight: 700;
  }
  .payButton{
    padding: 30px 0;
  }
</style>
