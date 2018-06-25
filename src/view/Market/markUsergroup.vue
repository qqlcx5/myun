<template>
  <div>
    <div class="title" style=" margin-bottom: 20px;"><i></i>
      <span>设置用户群</span>
    </div>
    <div class="user-border">
      <div class="user-title">
        <span>*用户群名称：</span>
        <input type="text">
      </div>
      <div class="user-tel">
        <span>用户群手机号：</span>
        <el-row>
          <el-button size="mini">Excel导入</el-button>
          <el-button size="mini">导入其他用户群</el-button>
        </el-row>
      </div>
      <div class="user-tag">
        <el-tag closable
                :disable-transitions="false">
          <span>XX公司高管，112人</span>
        </el-tag>
        <el-tag closable
                :disable-transitions="false">
          <span>XX公司高管，112人</span>
        </el-tag>
        <el-tag closable
                :disable-transitions="false">
          <span>XX公司高管，112人</span>
        </el-tag>
      </div>
      <div class="user-text">
        <textarea cols="300" rows="10"></textarea>
        <span class="t666" style="font-size: 14px">不同号码请用逗号（中英文均可），空格，回车键区分；</span>
        <el-button type="primary">智能纠错</el-button>
      </div>
    </div>
    <div  class="user-btn">
      <el-button type="primary">保存</el-button>
      <el-button >取消</el-button>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .user-border{
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
    width:calc(100% - 70px);
    height: auto;
    margin-right: 30px;
    padding-left: 30px;
  }
  .user-title{
    width: 100%;
    height: 100px;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px dashed #D8D8D8;
  }
  .user-title>span{
    width: 130px;
    height: 30px;
    font-size: 20px;
  }
  .user-title>input{
    width: 300px;
    height: 30px;
  }

  .user-tel{
    display: inline-flex;
    height: 60px;
    width: 100%;
    align-items: center;
    font-size: 20px;
  }

  .user-tag .el-tag{
    margin-right: 10px;
  }
  .user-text{
    display: flex;
    flex-direction: column;
  }
  .user-text>textarea{
    width: 935px;
    height: 178px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #dcdfe6;
    resize: none;
    margin: 20px 0;
    font-size: 16px;
  }
  .user-text>.el-button{
    margin-top: 20px;
    margin-bottom: 30px;
    width: 95px;
    height: 40px;
    border-radius: 4px;
    background-color: #1989FA;
  }
  .user-btn{
    width:calc(100% - 70px);
    height: 80px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .user-btn>.el-button{
    width: 95px;
    height: 40px;
    border-radius: 4px;
    margin-right: 30px;
  }
</style>
