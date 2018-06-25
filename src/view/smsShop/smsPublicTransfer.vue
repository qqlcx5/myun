<template>
  <div>
    <div class="content-top" v-loading="mainLoading">
      <div class="title">
        <i></i>
        <span class="t333">对公转账</span>
      </div>
      <div class="bill-info">
        <div class="bill-item">
          <span>收款公司：</span>厦门特沃兹网络技术有限公司</div>
        <div class="bill-item">
          <span>开户银行：</span>兴业银行厦门分行营业部</div>
        <div class="bill-item">
          <span>收款账号：</span>129680100100753744</div>
        <div class="bill-item" style="margin-top: 20px; color: #666">
          如需线下充值，请直接支付至以上账号，支付完成后上传凭证即可。
        </div>
      </div>

      <div class="bill-contact">
        <span>如果您有任何疑问，请立即联系客服。</span>
      </div>
      <div class="bill-inform">
        <div class="bill-inform-padding"><img src="./assets/icon-email.png" alt="">
          <span>4164548743@qq.com</span>
        </div>
        <div class="bill-inform-padding"><img src="./assets/icon-message.png" alt="">
          <span>0592-2061870</span>
        </div>
        <div class="bill-inform-padding"><img src="./assets/icon-qq.png" alt="">
          <span>2192979180</span>
        </div>
      </div>
    </div>
    <!-------------------------------上传凭证部分------------------------>
    <div class="title marg">
      <i></i>
      <span class="t333">转账信息</span>
    </div>
    <div class="pushPicture">
      <el-upload action="common/mobileUpload/uploadImg.do" :file-list="imgList" :data="uploadReqData" multiple :before-upload="beforePicUpload" :on-success="uploadSuccess" :on-remove="handleRemove" list-type="picture-card">
        <div>
          <i class="el-icon-plus" style="margin-top: 50px"></i>
          <p class="el-upload-text" style="line-height: 30px; color: #666">上传转账凭证</p>
        </div>
      </el-upload>
      <el-dialog>
        <img width="100%">
      </el-dialog>

    </div>
    <div class="remarkBox">
      <h5>备注：</h5>
      <el-input class="textInput" type="textarea" :maxlength="200" :rows="5" resize="none" placeholder="请输入备注" v-model="remark"></el-input>
    </div>
    <div class="pushButton">
      <el-button type="primary" :loading="saveLoading" @click="toSubmit">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remark: "",
      imgList: [],
      uploadReqData: {
        from: "customer"
      },
      mainLoading: false,
      saveLoading: false
    };
  },
  created() {
    if (this.$route.query.from && this.$route.query.from === "smsHistory") {
      this.getDetail();
    }
  },
  methods: {
    // 获得之前提交的详情
    async getDetail() {
      this.mainLoading = true;
      let res = await this.post("customer/mobileOrder/detailOrder.do", {
        orderSn: this.$route.query.orderSn
      });
      this.mainLoading = false;
      if (parseInt(res.code) === 1) {
        this.remark = res.remark || "";
        this.imgList = [];
        let imageArr = res.transferImageArray
          ? JSON.parse(res.transferImageArray)
          : [];
        imageArr.map(item => {
          this.imgList.push({
            url: item.image
          });
        });
      } else {
        this.$message.error(res.message);
      }
    },
    // -- 上传图片
    beforePicUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传的图片只能是 jpg/png 格式!");
        return false;
      }
      this.imgList.push({
        uid: file.uid,
        name: file.name,
        url: file.url
      });
      return true;
    },
    // 上传图片
    uploadSuccess(res, file, fileList) {
      console.log("成功", res, file, fileList);
      let deleteItem = -1;
      this.imgList.map((item, i) => {
        if (item.uid === file.uid) {
          if (parseInt(res.code) === 1) {
            item.url = res.url;
          } else {
            deleteItem = i;
            this.$message.error(res.message);
          }
        }
      });
      if (deleteItem > -1) {
        this.imgList.splice(deleteItem);
      }
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.imgList = fileList;
    },
    // 提交数据--- > 去支付
    async toSubmit() {
      if (!this.imgList.length) {
        this.$message.error("请上传转账凭证");
        return;
      }
      let imageArray = [];
      this.imgList.map(item => {
        imageArray.push({
          image: item.url
        });
      });
      // 提交数据
      let reqData = {
        sn: this.$route.query.orderSn,
        pluginId: "transferPayPlugin",
        imageArrayStr: JSON.stringify(imageArray),
        remark: this.remark
      };
      this.saveLoading = true;
      let res = await this.post("customer/mobilePay/pay.do", reqData);
      this.saveLoading = false;
      if (parseInt(res.code) === 1) {
        this.$router.push("smsPaySuccess?type=2");
      } else {
        this.$message.error(res.message);
      }
    }
  }
};
</script>

<style scoped>
.content-top {
  border-bottom: 1px dashed #cdcdcd;
}
.bill-info {
  width: 100%;
  min-height: 84px;
  margin-left: 10px;
  background-color: #f7fdff;
  font-size: 14px;
  padding: 42px 0 42px 62px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.bill-item {
  padding: 2px 0;
}
.bill-item > span {
  width: 94px;
  height: 28px;
  display: inline-flex;
}
.bill-note {
  width: 781px;
  height: 84px;
  font-size: 14px;
  margin-left: 70px;
}
.bill-note span {
  color: #666;
  height: 30px;
  line-height: 30px;
}
.bill-contact {
  margin-left: 70px;
  margin-top: 20px;
}
.bill-contact span {
  color: #999;
}
.bill-inform {
  margin-left: 70px;
  /*height: 168px;*/
  padding-bottom: 30px;
}
.bill-inform-padding {
  padding-top: 30px;
  height: 28px;
  display: flex;
  align-items: center;
}
.bill-inform-padding img {
  margin-right: 24px;
}

.pushButton {
  margin-left: 70px;
  padding-top: 60px;
  padding-bottom: 54px;
}
.pushButton .el-button {
  width: 128px;
  height: 46px;
  font-size: 18px;
}
.marg {
  margin: 30px 0;
}
.remarkBox {
  margin: 20px 0 0 70px;
}
.remarkBox h5 {
  font-size: 16px;
  font-weight: normal;
  color: #333;
  margin-bottom: 10px;
}
.remarkBox .textInput {
  width: 800px;
}
</style>
<style lang="scss" rel="stylesheet/scss">
.pushPicture {
  margin-left: 70px;
  .el-upload--picture-card {
    line-height: 20px;
  }
}
</style>
