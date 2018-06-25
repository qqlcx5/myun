<template>
  <div>
    <div class="content-input" style="margin-left: 14px">
      <el-input placeholder="请输入内容" style="width: 30%;" v-model="text">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="text" style="margin-left: 1%" @click="text=''">清空条件</el-button>
    </div>
    <div class="content-button" style="margin: 22px 0 22px 14px">
      <el-button type="info" icon="el-icon-plus" size="small">创建用户群</el-button>
    </div>

    <div class="content-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="num"
          align="center"
          label="数量"
          width="180">
        </el-table-column>

        <el-table-column
          prop="address"
          min-width="500"
          align="center"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后修改时间"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push({name:'markUsergroup'})">设置</el-button>
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
        tableData: [{
          date: '2016-05-02',
          name: 'XX公司高管',
          num: '116',
          address: '上上海市普陀区金沙江路 1517 弄这里展示备注这里展示备...'
        }, {
          date: '2016-05-04',
          name: 'XX公司高管',
          num: '116',
          address: '上海市普陀区金沙江路 1517 弄这里展示备注这里展示备...'
        }, {
          date: '2016-05-01',
          name: 'XX公司高管',
          num: '116',
          address: '上海市普陀区金沙江路 1517 弄这里展示备注这里展示备...'
        }, {
          date: '2016-05-03',
          name: 'XX公司高管',
          num: '116',
          address: '上上海市普陀区金沙江路 1517 弄这里展示备注这里展示备...'
        }]

      }
    }
  }
</script>

<style scoped>
  .content-table{
    width: 90%;
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
