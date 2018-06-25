<template>
  <div>
    <div class="content-top">
      <div class="content-top-time">
        <div>
          <span style="margin-left: 40px">提交时间：</span>
          <el-time-picker
            is-range
            v-model="timeValue1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </div>
        <div>
          <span style="margin-left: 100px">预计发送时间：</span>
          <el-time-picker
            is-range
            v-model="timeValue2"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </div>
      </div>
      <div class="content-top-search">
        <span style="margin-left: 40px">搜索：</span>
        <el-input
          placeholder="内容，收信人"
          v-model="text"
          clearable>
        </el-input>
        <span style="margin-left: 40px">状态：</span>
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="不限" value="1"></el-option>
          <el-option label="定时中" value="2"></el-option>
          <el-option label="审核中" value="3"></el-option>
        </el-select>
        <el-button type="success" style="margin-left:20px ">搜索</el-button>
        <el-button type="text" style="margin-left: 14px" @click="clearCondition">清除条件</el-button>
      </div>


    </div>

    <div class="content-bottom">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="状态"
          align="center"
          width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.audit }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="日期"
          align="center"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预计发送时间"
          align="center"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.yData }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          align="center"
          min-width="400">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="发送目标"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px" class="tRed">{{ scope.row.name }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text">取消</el-button>
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
    data() {
      return {
        text: '',
        select: '',
        timeValue1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        timeValue2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        tableData: [{
          audit:'审核中',
          date: '2016-05-02',
          yData:'2017-07-03',
          name: '117条',
          address: '上海市普陀区金沙江路 1518 '
        }, {
          audit:'审核中',
          date: '2016-05-04',
          yData:'2017-07-03',
          name: '117条',
          address: '上海市普陀区金沙江路 1517 '
        },
          {
            audit:'待审核',
            date: '2016-05-01',
            yData:'2017-07-03',
            name: '117条',
            address: '上海市普陀区金沙江路 1519 '
          },
          {
            audit:'待审核',
            date: '2016-05-01',
            yData:'2017-07-03',
            name: '117条',
            address: '上海市普陀区金沙江路 1519 '
          },
          {
            audit:'待审核',
            date: '2016-05-01',
            yData:'2017-07-03',
            name: '117条',
            address: '上海市普陀区金沙江路 1519 '
          },
          {
            audit:'待审核',
            date: '2016-05-01',
            yData:'2017-07-03',
            name: '117条',
            address: '上海市普陀区金沙江路 1519 '
          },
          {
            audit:'待审核',
            date: '2016-05-03',
            yData:'2017-07-03',
            name: '117条',
            address: '上海市普陀区金沙江路 1516 '
          }]
      }
    },
    methods:{
      clearCondition(){
        this.text='',
        this.select=''
      }
    }
  }
</script>

<style scoped>
  .content-top {
    width: calc(100% - 30px);
    height: 20vh;
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
    display: flex;
    flex-direction: column;
  }
  .content-top-time{
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    height: 12vh;
  }
  .content-top-search{
    height: 8vh;
  }
  .content-top-search .el-input{
    width: 20%;
  }
  .content-bottom{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    width: calc(100% - 30px);
    box-shadow: 0 2px 4px 0 rgba(210, 210, 210, 0.5);
    background-color: #ffffff;
    border: solid 1px #e8e8e8;
  }
  .content-page{
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 50px;
  }
  .content-page .el-pagination{
    margin-right: 60px;
  }
</style>
