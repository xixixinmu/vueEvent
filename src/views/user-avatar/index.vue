<template>
<div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size:18px">上传图片搜索相似图片</span>
    </div>
    <div class="btn-box">
      <el-upload
        :action="baseURL"
        multiple
        :auto-upload='false'
        accept="jpg,png,bmp"
        list-type="picture-card"
        :file-list='images'
        :on-change="onFileChange"
        :limit="1"
        :on-exceed='limitNum'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <br/>
      <el-button type="success" icon="el-icon-upload" @click="updateAvatarFn"
        >上传图片</el-button>
    </div>
  </el-card>
  <el-card>
    <div slot="header" class="clearfix">
    <span style="font-size:18px">快件信息</span>
    <div style="float:right">没找到您想要的？可选择<el-button type="text" @click="goToEditExpress">新增丢失快件</el-button></div>
  </div>
  <el-table :data="tableData">
    <el-table-column label="物品信息" width="300px">
      <template slot-scope="scope">
        <div style="display:flex">
          <div>
            <el-image style="width: 100%; height: 100px" :src="scope.row.address" :preview-src-list="scope.row.srcList" :key="scope.row.id">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          </div>
          <div style="margin-left:10px">
            <div>分类：{{scope.row.goodsType}}</div>
            <div>名称：{{scope.row.goodsName}}</div>
            <div>数量：{{scope.row.goodsNum}}</div>
            <div>颜色：{{scope.row.goodsColor}}</div>
            <div>重量：{{scope.row.goodsWeight}}</div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="发现细节">
      <template slot-scope="scope">
        <div>发现时间：{{scope.row.findTime}}</div>
        <div>发现环节：{{scope.row.findPart}}</div>
        <div>发现人员：{{scope.row.findPerson}}</div>
      </template>
    </el-table-column>
    <el-table-column label="登记细节">
      <template slot-scope="scope">
        <div>登记时间：{{scope.row.recordTime}}</div>
        <div>登记单位：{{scope.row.recordHospital}}</div>
        <div>简登人员：{{scope.row.firstRecordPerson}}</div>
        <div>补登人员：{{scope.row.lastRecordPerson}}</div>
        <div>联系电话：{{scope.row.phone}}</div>
      </template>
    </el-table-column>
    <el-table-column label="其他信息">
      <template slot-scope="scope">
        <div>无面单编号：{{scope.row.noExpressSheet}}</div>
        <div>快件遗落类型：{{scope.row.goodsLoseType}}</div>
        <div>进/出港：{{scope.row.port}}</div>
        <div>车辆运输号：{{scope.row.carID}}</div>
        <div>上一站编码：{{scope.row.previousCode}}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="goToEdit(scope.row)">编辑</el-button>
        <el-button type="text" @click="openDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</div>
</template>

<script>
import { searchPictureAPI } from '@/api'
import { baseURL } from '@/utils/request'
export default {
  name: 'user-avatar',
  data () {
    return {
      baseURL: baseURL,
      newAvatar: '',
      formData: {},
      tableData: [{ previousCode: '1' }]
    }
  },
  methods: {
    async updateAvatarFn () {
      const res = await searchPictureAPI(this.formData)
      console.log(JSON.parse(res.data[0]))
      this.tableData = JSON.parse(res.data[0]).result
    },
    limitNum () {
      // alert('只能搜索一张图片')
      this.$message.error('只能上传一张图片用于搜索')
    },
    onFileChange (file) {
      // const file = e.target.files
      if (file.length === 0) {
        // 证明用户没有选择任何文件 然后点击了确定关闭选择弹窗
      } else {
        console.log(file.raw)
        const formData = new FormData()
        formData.append('avatar', file.raw)
        formData.append('rn', 1)
        this.formData = formData
      }
    },
    openDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goToEdit (row) {
      this.$router.push('/edit-express')
    },
    goToEditExpress () {
      this.$router.push('/addDelivery')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
</style>
