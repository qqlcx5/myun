<template>
  <div v-loading="mainLoading">
    <div class="content-top borderBox">
      <div class="title" style="margin-bottom: 38px">
        <i></i>
        <span class="t333">订单信息</span>
      </div>
      <div class="sms-info">
        <div>
          <span class="leftPart">短信类型：</span>
          <span v-if="orderDetail.setmealType === 0">系统模板短信</span>
        </div>
        <div>
          <span class="leftPart">套餐名称：</span>
          <span>{{orderDetail.setmealName}}</span>
        </div>
        <div>
          <span class="leftPart">条数：</span>
          <span>{{orderDetail.setmealSmsNum}}</span>
        </div>
        <div>
          <span class="leftPart">原价：</span>
          <span>{{$formatMoney(orderDetail.setmealCost)}}</span>
        </div>
        <div>
          <span class="leftPart">销售价：</span>
        </div>
        <div>
          <span class="sms-price">￥ {{$formatMoney(orderDetail.setmealPrice)}}</span>
        </div>
      </div>

    </div>

    <div class="invoiceWrap borderBox">
      <div class="title marg">
        <i></i>
        <span class="t333">发票信息</span>
      </div>
      <div>
        <div>
          <el-checkbox v-model="formData.isInvoice">需要发票</el-checkbox>
          <el-tooltip class="invoiceTip" effect="light" popper-class="invoicePopper" :content="invoiceContent" placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
      </div>
      <el-form v-if="formData.isInvoice" :model="formData" :rules="formRule" ref="formRef" label-width="110px" class="invoiceForm">
        <el-form-item label="发票抬头" >
            <el-radio v-model="formData.invoiceType" :label="0">个人</el-radio>
            <el-radio v-model="formData.invoiceType"  :label="1">单位</el-radio>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <el-input v-model="formData.invoiceTitle" :maxlength="200"> </el-input>
        </el-form-item>
        <el-form-item v-if="formData.invoiceType" label="统一信用代码" prop="invoiceIdNo">
          <el-input v-model="formData.invoiceIdNo" :maxlength="200"> </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="pay">
      <div class="title marg">
        <i></i>
        <span class="t333">选择方式</span>
      </div>
      <div class="pay-select">
        <el-radio v-model="payWay" :label="0" border><img src="./assets/icon-wechat.png" alt=""></el-radio>
        <el-radio v-model="payWay" :label="1" border><img src="./assets/icon-alipay.png" alt=""></el-radio>
        <el-radio v-model="payWay" :label="2" border><img src="./assets/icon-public-transfer.png" alt=""></el-radio>
      </div>
      <div class="pay-confirm" style="margin-bottom: 162px">
        <el-button type="success" :loading="submitLoading" @click="toPayNow">立即支付</el-button>
      </div>
    </div>
    <payCodeDialog v-if="weChatInfo.visibile" :codeUrl="weChatInfo.weChatCodeUrl" :orderSn="weChatInfo.orderSn" :successCallBack="successCallBack" :closeCallBack="closeCallBack"/>
  </div>
</template>
<script>
  import payCodeDialog from './components/payCodeDialog'
  export default {
    components: {
      payCodeDialog
    },
    data () {
      return{
        setmealId: this.$route.query.setmealId ||'',
        mainLoading: false,
        submitLoading: false,
        orderDetail: {},
        invoiceContent: '税率说明：',
        formData: {
          isInvoice: 0,  // 是否要发票  0：否 1：是
          invoiceType: 0,  // 发票抬头类型  0：个人 1：单位
          invoiceTitle: '',  // 发票抬头
          invoiceIdNo: '',  // 统一信用代码
        },
        formRule: {
          invoiceTitle: [{ required: true, message: '请填写发票抬头', trigger: 'blur' }],
          invoiceIdNo: [{ required: true, message: '请填写统一信用代码', trigger: 'blur' }],
        },
        payWay: 0, // 支付方式  0--微信   1-支付宝 2 -对公转账
        weChatInfo: {
          weChatCodeUrl: '', // 扫码支付二维码链接
          orderSn: '',
          visibile: false
        }
      }
    },
    created () {
      if (this.$route.query.trade_no) { // 支付宝支付成功
        this.$router.push('smsPaySuccess')
      }
      this.getDetail()
    },
    methods: {
      // 获得该套餐详情
      async getDetail() {
        this.mainLoading = true
        let res = await this.post('customer/mobileSetmeal/buyNow.do', {setmealId: this.setmealId})
        this.mainLoading = false
        if (parseInt(res.code) === 1) {
          this.orderDetail = res
          if (res.invoiceDesc) {
            this.invoiceContent = '税率说明：' + res.invoiceDesc
          }
        } else {
          this.$message.error(res.message)
        }
      },
      // 立即支付-- 提交订单
      async toPayNow() {
        if (this.formData.isInvoice){ // 要发票
          this.$refs['formRef'].validate((valid) => {
            if (!valid) {
              return
            }
            this.toCreateOrder()
          });
        } else {
          this.toCreateOrder()
        }
      },
      // 创建订单
      async toCreateOrder () {
        let req = {
          setmealId: this.setmealId,
          payType: this.payWay
        }
        req = Object.assign({} , this.formData, req)
        req.isInvoice = req.isInvoice ? 1 : 0
        this.submitLoading = true
        let res = await this.post('customer/mobileOrder/createOrder.do', req)
        this.submitLoading = false
        if (parseInt(res.code) !== 1) {
          this.$message.error(res.message)
          return
        }
        // 成功创建订单后的处理
        // 微信支付
        if (this.payWay === 0) {
          this.weChatPay(res.sn)
          return
        }
        if (this.payWay === 1) { // 支付宝支付
          this.aliPay(res.sn)
          return
        }
        if (this.payWay === 2) { // 支付方式  0--微信   1-支付宝 2 -对公转账
          this.$router.push(`smsPublicTransfer?orderSn=${res.sn}`)
          return
        }
      },
      // 去支付  支付宝的支付
     aliPay(sn) {
        let returnUrl = window.location.protocol + '//' + window.location.host + `/#/smsConfirm?setmealId=${this.setmealId}`;
        let reqData = {
          sn,
          pluginId: 'alipayWebPlugin',
          returnUrl:  encodeURIComponent(returnUrl)
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
        if(parseInt(res.code) === 1) {
          this.weChatInfo.weChatCodeUrl = res.codeUrl
          this.weChatInfo.orderSn = sn
          this.weChatInfo.visibile = true
        } else {
          this.$message.error(res.message)
        }

      },
      // 微信支付成功
      successCallBack () {
        this.weChatInfo.visibile = false
        this.$router.push('smsPaySuccess')
      },
      // 扫码弹窗关闭
      closeCallBack () {
        this.weChatInfo.visibile = false
        this.$router.push('smsHistory')
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .borderBox{
    border-bottom: 1px dashed #cdcdcd;
  }
  .sms-info{
    margin-left: 36px;
    /*height: 230px;*/
    font-size: 14px;
    color: #666;

  }
  .sms-info .leftPart{
    height: 46px;
    line-height:46px;
    width: 70px;
    display: inline-flex;
    margin-right: 26px;
  }
  .sms-price{
    font-size: 32px;
    /*width: 128px;*/
    height:46px;
    display: inline-flex;
    color: #ff333f;
    margin: 20px 0 50px ;
  }
  .pay-select{
    /*margin-left: 76px;*/
    padding: 30px 30px 30px 76px;
    background: #f7fdff;
    width: 90%;
    height: 100px;
  }
  .pay-select .el-radio{
    width: 260px;
    height: 102px;
    display: inline-flex;
    align-items: center;
    background-color: #fff;
    /*justify-content: center;*/
    margin-right: 56px;
    padding-bottom: 10px;
    padding-left: 22px;

  }
  .pay-select .el-radio img{
    margin-left: 12px;
  }
  .pay-confirm{
    margin-top: 60px;
    .el-button{
      width: 128px;
      height: 46px;
      font-size: 18px;
    }
  }
  .marg{
    margin: 30px 0;
  }

  .invoiceWrap{
    padding-bottom: 30px;
    .invoiceTip{
      /*max-width: 800px;*/
      margin-left: 20px;
      font-size: 20px;
      padding: 4px;
      vertical-align: middle;
      color: #666;
    }
    .invoiceForm{
      margin-top: 20px;
      width: 600px;
    }
  }
  .invoicePopper{
    max-width: 800px;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .invoicePopper{
    max-width: 800px;
    line-height: 20px;
    background: #f7f7f7 !important;
    border: none !important;
    .popper__arrow{
      border-right-color: #f7f7f7 !important;
      &:after{
        border-right-color: #f7f7f7 !important;
      }
    }
  }
</style>
