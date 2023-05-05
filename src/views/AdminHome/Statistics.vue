<template>
  <div class="content">
    <div class="table_content">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="用户名" align="center" prop="username"></el-table-column>
        <el-table-column label="手机号" align="center" prop="phone"></el-table-column>
        <el-table-column label="入库次数" align="center">
          <template slot-scope="scope">{{ scope.row.addTimes }}</template>
        </el-table-column>
        <el-table-column label="搜索次数" align="center">
          <template slot-scope="scope">{{ scope.row.searchTimes }}</template>
        </el-table-column>
        <el-table-column label="修改次数" align="center">
          <template slot-scope="scope">{{ scope.row.updateTimes }}</template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="删除次数"
          width="190"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.deleteTimes }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px; width: 100%">
      <div class="block" style="float: right; padding: 0px 0px 10px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { statisticsAPI } from '@/api'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Statistics',
  data () {
    return {
      loading: true,
      tableData: [],
      currentPage: 1,
      total: null
    }
  },
  mounted () {
    this.handleCurrentChange()
  },
  methods: {
    // 处理选项框的操作，获取表格中哪些选项被选中
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val = 1) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      console.log(this.currentPage)
      this.getList(this.currentPage)
    },
    // 得到统计列表
    async getList (page) {
      const formData = new FormData()
      formData.append('page', page)
      const { data: res } = await statisticsAPI(formData)
      if (res.code === '200') {
        console.log(res.data)
        this.total = res.data.count
        this.tableData = res.data.briefList
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
      // this.tableData = JSON.parse(res.data)
    }
  }
}
</script>

    <style scoped>
</style>
