<template>
  <div class="payFalse">
    <img src="./assets/success-icon.png" alt="">
    <span>{{text}}</span>
    <router-link to="smsHistory">
      <el-button>查看订单</el-button>
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return{
        text: '付款成功'
      }
    },
    created() {
      if (this.$route.query.type && this.$route.query.type == 2 ) {
        this.text = '上传成功'
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
</style>
