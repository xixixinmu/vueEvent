<template>
  <div class="content">
    <div class="table_content">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
      <!-- @selection-change="handleSelectionChange"-->
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
      <div>
        <el-pagination
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          layout="->,total, prev, pager, next, jumper"
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
      tableData: [],
      currentPage: 1,
      pageSize: 0,
      total: null
    }
  },
  mounted () {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange (val = 1) {
      this.currentPage = val
      this.getList(this.currentPage)
    },
    // 得到统计列表
    async getList (page) {
      const { data: res } = await statisticsAPI(page)
      if (res.code === '200') {
        this.total = res.data.count
        this.tableData = res.data.briefList
        this.pageSize = res.data.briefList.length
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
