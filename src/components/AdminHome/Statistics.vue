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
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="编号" width="70" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.orderId }}</template>
        </el-table-column>
        <el-table-column label="入库记录数" width="170" align="center">
          <template slot-scope="scope">{{ scope.row.orderTime }}</template>
        </el-table-column>
        <el-table-column label="搜索次数" width="170" align="center">
          <template slot-scope="scope">{{ scope.row.orderTime }}</template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="删除次数"
          width="190"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.orderTime }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px; width: 100%">
      <div class="block" style="float: right; padding: 0px 0px 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="page_size"
          background
          layout="total, sizes, prev, pager, next, jumper"
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
      page_size: 5,
      total: null
    }
  },
  methods: {
    // 处理选项框的操作，获取表格中哪些选项被选中
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页函数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page_size = val
      this.getList(1, this.page_size)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      console.log(this.currentPage + ':' + this.page_size)
      this.getList(this.currentPage, this.page_size)
    },
    // 得到统计列表
    getList (page, pageSize) {
      this.loading = false
      statisticsAPI(page, pageSize)
        .then((response) => {
          if (response.code === 200) {
            this.total = response.total
            console.log(this.total)
            this.tableData = response.orderDtoList
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

    <style scoped>
</style>
