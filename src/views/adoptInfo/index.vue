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
        <el-table-column label="认领图片"  prop="address">
            <template slot-scope="scope">
                <el-image style="width: 100px; height: 100px" :src="scope.row.address?scope.row.address:''" :preview-src-list="[scope.row.address]?[scope.row.address]:[]"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="运单编号"  prop="waybillNumber"></el-table-column>
        <el-table-column label="快件中转类型"  prop="transferType">
            <template slot-scope="scope">
                <div v-if="scope.row.transferType==0">转出至收件人</div>
                <div v-else>退回至发件网点</div>
            </template>
        </el-table-column>
        <el-table-column label="寄件信息" width="320px">
          <template slot-scope="scope">
            <div>寄件人:{{ scope.row.sender }}</div>
            <div>寄件电话:{{ scope.row.senderPhone }}</div>
            <div>寄件地址:{{ scope.row.receiverProvince }}{{scope.row.receiverCity}}{{scope.row.receiverArea}}</div>
            <div>详细地址:{{ scope.row.senderDetailAddress }}</div>
          </template>
        </el-table-column>
        <el-table-column label="收件信息" width="320px">
          <template slot-scope="scope">
            <div>收件人：{{ scope.row.receiver }}</div>
            <div>收件电话:{{ scope.row.receiverPhone }}</div>
            <div>收件地址:{{ scope.row.senderProvince }}{{ scope.row.senderCity }}{{ scope.row.senderArea }}</div>
            <div>详细地址:{{ scope.row.receiverDetailAddress }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px; width: 100%">
      <div class="block">
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
import { adoptInfoAPI } from '@/api/index'
import { baseURL } from '@/utils/request'

export default {
  name: 'adoptInfo',
  data () {
    return {
      baseURL,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
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
    async getList (page) {
      const { data: res } = await adoptInfoAPI(page)
      if (res.code === '200') {
        this.total = res.data.count
        this.pageSize = res.data.briefList.length
        const tabledata = []
        for (let i = 0; i < res.data.briefList.length; i++) {
          let obj = res.data.briefList[i]
          const address = baseURL + '/' + res.data.briefList[i].picPath
          obj = { ...obj, address }
          tabledata.push(obj)
        }
        console.log(tabledata)
        this.tableData = tabledata
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

<style>

</style>
