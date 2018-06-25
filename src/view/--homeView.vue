<template>
  <div>
    <div class="home-button">
      <el-row>
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
        <el-button size="small">再发一单</el-button>
        <el-button size="small">撤回</el-button>
      </el-row>
    </div>

    <div class="home-info">
      <div><span>发送状态：</span><i class="tBlue">定时发送中</i></div>
      <div><span>目标：</span>99</div>
      <div><span>提交时间：</span>2016-12-12 13:13</div>
      <div><span>预计发送时间：</span>2018-12-12 13:13</div>
    </div>

    <div class="send-content">
      <div class="title padd"><i></i>
        <span>发送内容</span>
      </div>
      <div>
            <textarea
              class="textArea"
              placeholder=""
              v-model="textArea">
            </textarea>
      </div>
    </div>
    <div class="send-object">
      <div class="title padd"><i></i>
        <span>发送对象</span>
      </div>
      <div>
            <textarea
              class="textArea marg"
              placeholder=""
              v-model="textArea">
            </textarea>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textArea:""
      }
    },
  }
</script>

<style scoped>
  .home-button .el-button{
    width: 95px;
    height: 30px;
  }
  .home-info{
    height: 184px;
    margin-top: 32px;
    margin-bottom: 50px;
  }
  .home-info span{
    display: inline-flex;
    width: 128px;
    height: 46px;
    line-height: 46px;
  }
  .textArea {
    margin-left: 8px;
    resize: none;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    width: 935px;
    height: 178px;
    color:#999;
  }
  .send-content{
    padding-bottom: 50px;
    border-bottom: dashed 1px #d8d8d8;
  }
  .marg{
   margin-bottom: 76px;
  }
  .padd{
    padding: 28px 0;
  }
</style>
