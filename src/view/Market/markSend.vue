<template>
  <div>
    <div class="send-content">
      <div class="main-padding">
        <div class="title">
          <i></i>
          <span class="t333">发送内容</span>
          <el-checkbox v-model="checked">是否开启签名</el-checkbox>
        </div>

        <el-row>
          <el-button type="primary">发送模板</el-button>
          <el-button type="success">设置模板</el-button>
        </el-row>
        <textarea
          class="textArea t999"
          placeholder=""
          v-model="textArea">
            </textarea>
        <article class="send-content-prompt">
          <p>当前内容每条信息按<i>1</i> 条／个扣费， 当前已输入<i>5</i>字，还可以输入<i>495</i>字。</p><br>
          <p><i>回车符在某些浏览器按1个字统计，实际按2个字计算，请注意控制字数</i></p><br>
          <p>根据运营商政策规定，建议每次提交小于等于225个字符</p>
          <p>&nbsp;（含签名、空格、字母、符号等）</p>
        </article>
      </div>

      <div class="send-content-right">
        <img src="~@/assets/iphone-mobile.jpg"/>
      </div>
    </div>

    <div class="send-object">
      <div class="main-padding">
        <div class="title marg">
          <i></i>
          <span class="t333">发送对象</span>
        </div>

        <el-row>
          <el-button type="success">发送模板</el-button>
          <el-button type="default">添加用户群</el-button>
          <el-button type="default">设为用户群</el-button>
        </el-row>
        <div class="send-object-tag">
          <el-tag closable>
            {{Tags}}
          </el-tag>
        </div>
        <textarea
          class="textArea t999"
          placeholder=""
          v-model="textArea">
            </textarea>

        <div class="send-object-prompt">
          <p>不同号码请用逗号（中英文均可），空格，回车键区分；</p>
        </div>
      </div>
    </div>

    <div class="send-time">
      <div class="main-padding">
        <div class="title marg">
          <i></i>
          <span class="t333">发送时间</span>
        </div>

        <div class="send-time-content">
          <div class="send-time-left">
            <div><el-radio v-model="radio" label="2" class="send-time-radio">审核后立即发送</el-radio></div>
            <div><el-radio v-model="radio" label="3" class="send-time-radio">审核后定时发送</el-radio></div>
          </div>
          <div class="send-time-right">
            <div class="block">
              <el-date-picker
                v-model="dateValue"
                type="date"
                placeholder="Enter Date"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
        </div>

        <div>
          <p style="color:#FA3030; margin: 22px 0 0 34px ;font-size: 12px">注：若审核通过时间大于发送时间，以审核时间为准。若有疑问，请联系客服</p>
        </div>
        <el-row style="margin-top: 50px">
          <el-button type="primary">提交审核</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked:true,
        textArea: '',
        radio:'1',
        Tags: 'XX高管112人',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        dateValue: '',
      }
    }
  }
</script>

<style scoped>
  .send-content {
    display: flex;
    justify-content: flex-start;
    border-bottom: dashed 1px #d8d8d8;
  }

  /*发送模块内边距*/
  .main-padding {
    padding-bottom:50px;
  }
  .main-padding .el-checkbox{
    padding-left: 42px;

    line-height:28px;
  }

  .send-content .el-button {
    margin: 22px 0 20px 14px;
  }

  .send-content .textArea {
    margin-left: 14px;
    resize: none;
    width: 474px;
    height: 136px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #dcdfe6;
  }

  .send-content-prompt {
    margin-left: 14px;

  }

  .send-content-prompt i {
    font-style: normal;
    color: #FA3030;
  }

  .send-content-right {
    margin-left: 174px;
  }

  .send-object {
    display: flex;
    justify-content: flex-start;
    border-bottom: dashed 1px #d8d8d8;
  }

  .send-object .el-button {
    margin: 22px 0 20px 14px;
  }

  .send-object-tag {
    margin: 0 0 10px 14px;
  }

  .send-object .textArea {
    margin-left: 14px;
    resize: none;
    width: 525px;
    height: 149px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #dcdfe6;
  }

  .send-object-prompt {
    margin-left: 14px;
  }

  .send-object-prompt p {

    color: #999;
  }
  .send-time-content{
    display: flex;
    margin-left: 14px;
  }
  .send-time-left{
    display: flex;
    flex-direction: column;

  }
  .send-time-radio{
    margin-top: 20px;

    text-align: left;
  }
  .send-time-right{
    padding-top: 30px;
    margin-left: 40px;
  }
  /*标题的外边距*/
  .marg{
    margin-top: 30px;
  }
</style>
