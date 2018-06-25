<template>
  <div>
    <div class="content-input" style="margin-left: 14px">
      <span>购买时间：</span>
      <el-time-picker
        is-range
        v-model="timeValue2"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker>
      <span style="margin-left: 40px">短信类型：</span>
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="不限" value="1"></el-option>
        <el-option label="定时中" value="2"></el-option>
        <el-option label="审核中" value="3"></el-option>
      </el-select>
      <el-button type="success" style="margin-left:20px ">搜索</el-button>
      <el-button type="text" style="margin-left: 10px">清空条件</el-button>
    </div>
    <div class="content-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="tel"
          label="套餐"

          min-width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="购买时间"
          align="center"
          min-width="180">
        </el-table-column>

        <el-table-column
          prop="key"
          align="center"
          min-width="200"
          label="短信类型">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="购买数量"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="num"
          label="价格"
          min-width="160">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" >设置</el-button>
            <el-button type="text" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        text:'',
        select:'',
        timeValue1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        timeValue2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          num: '116',
          key:"营销短信",
          tel:'套餐A',
          sh:'通过',
          address: '6666条'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          num: '116',
          key:"营销短信",
          tel:'套餐B',
          sh:'失败',
          address: '6666条'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          num: '116',
          tel:'套餐c',
          key:"营销短信",
          sh:'失败',
          address: '6666条'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          tel:'套餐D',
          num: '116',
          sh:'通过',
          key:"营销短信",
          address: '6666条'
        }]

      }
    }
  }
</script>

<style scoped>
  .content-table{
    width: 90%;
    margin-top: 3%;
  }
  .content-page{
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .content-page .el-pagination{
    margin-right: 10%;
  }
</style>
