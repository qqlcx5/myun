<!-- 扫码支付弹窗 -->
<template>
  <div>
    <el-dialog title="扫描二维码支付" center :visible.sync="dialogVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" width="500px" :before-close="beforeClose">
      <div class="codeImgBox">
        <img :src="payCodeUrl" alt="">
        <p>请于 <span>48小时</span> 内付款， 逾期订单失效！</p>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'pay-code-dialog',
    props: {
      codeUrl: {
        type: String,
        default: 'http://mbackend.torvoz.cn/static/attachment/qrcode/timeliness/1528077860715_7786qrcode.jpg'
      },
      orderSn: {
        type: String
      },
      successCallBack: {
        type: Function,
        default: () => {}
      },
      closeCallBack: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        dialogVisible: true,
        timer: null
      }
    },
    computed: {
      payCodeUrl() {
        return this.codeUrl
      }
    },
    mounted () {
      this.getOrderPayStatus()
    },
    methods: {
      async getOrderPayStatus() {
        let reqData = {
          sn: this.orderSn
        }
        let res = await this.post('customer/mobilePay/queryOrderPayStatus.do', reqData)
        clearTimeout(this.timer)
        if (parseInt(res.code) !== 1) {
          this.$message.error(res.message)
          return
        }
        if (res.isPay === 1) { // 已经支付
          this.successCallBack()
          return
        }
        if (res.isPay === 0) { // 还未支付
          this.timer = setTimeout(() => {
            this.getOrderPayStatus()
          }, 10 * 1000)
        }
      },
      beforeClose(done) {
        this.closeCallBack()
        clearTimeout(this.timer)
        done()
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .codeImgBox {
    width: 350px;
    height: 350px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
    p {
      text-align: center;
      color: #666;
      span {
        color: #fa3030;
      }
    }
  }

</style>
