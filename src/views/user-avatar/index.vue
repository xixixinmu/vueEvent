<template>
<div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size:18px">无面单货物查找</span>
      <span style="margin-left: 10px;color: darkslategray;">可选择上传图片或使用无面单编号搜索</span>
    </div>
    <div>
      <el-row>
        <el-col :span="9">
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
            >开始查找</el-button>
          </div>
        </el-col>
        <el-col :span="15">
          <el-form label-width="100px" inline>
            <el-form-item label="无面单编号">
              <el-input v-model.trim="inquireData.picID" ></el-input>
            </el-form-item>
            <el-button @click="getAllProductInfo" style="margin-left: 10px;">查询</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </el-card>
  <el-card>
    <div slot="header" class="clearfix">
    <span style="font-size:18px">快件信息</span>
    <div style="float:right">没找到您想要的？可选择<el-button type="text" @click="goToEditExpress">新增丢失快件</el-button></div>
  </div>
  <div class="messageCardBox">
    <el-card v-for="(item,index) in tableData" :key="index" class="cardSize">
      <div>
        <el-image style="width: 100px; height: 100px" :src="item.address?item.address:''" :preview-src-list="[item.address]?[item.address]:[]"></el-image>
        <div>
          <div>物品分类：{{item.stuffType}}</div>
          <div>物品名称：{{item.inInfo}}</div>
          <div>物品数量：{{item.inNum}}</div>
          <div>物品颜色：{{item.inColor}}</div>
          <div>物品重量：{{item.stuffWeight}}</div>
          <el-button type="text" @click="openDialog(item)">查看详细信息</el-button>
          <div>
            <el-button type="text" @click="goToEdit(item)">编辑</el-button>
            <el-button type="text" @click="openDelete(item)">删除</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <br/>
  </div>
  <el-dialog :visible.sync="dialogVisible" width="80%" title="快件详细信息">
    <div>
      <div class="title">物品细节</div>
      <div class="behindTitle">
        <span>物品分类:{{detailData.stuffType}}</span>
        <span>物品名称:{{detailData.inInfo}}</span>
        <span>物品数量:{{detailData.inNum}}</span>
        <span >物品颜色:{{detailData.inColor}}</span>
        <span>物品重量:{{detailData.stuffWeight}}</span>
      </div>
    </div>
    <div>
      <div class="title">发现细节</div>
      <div class="behindTitle">
        <span >发现时间：{{detailData.discoverTime}}</span>
        <span >发现环节：{{detailData.discoverLink}}</span>
        <span>发现人员：{{detailData.discoverer}}</span>
      </div>
    </div>
    <div>
      <div class="title">登记细节</div>
      <div class="behindTitle">
        <span >登记时间：{{detailData.registrationTime}}</span>
        <span >登记单位：{{detailData.registrationUnit}}</span>
        <span>简登人员：{{detailData.simpleRegistrant}}</span>
        <span >补登人员：{{detailData.supRegistrant}}</span>
        <span>联系电话：{{detailData.phone}}</span>
      </div>
    </div>
    <div>
      <div class="title">其他细节</div>
      <div class="behindTitle">
        <span>无面单编号：{{detailData.picID}}</span>
        <span>快件遗落类型：{{detailData.loseType}}</span>
        <span>进/出港：{{detailData.inout}}</span>
        <span>车辆运输号：{{detailData.carId}}</span>
        <span>上一站编码：{{detailData.preStation}}</span>
      </div>
    </div>
  </el-dialog>
   <el-pagination
   v-show="showPagination"
    background
    layout="->,prev, pager, next"
     @current-change="handleCurrentChange"
    :total="count">
  </el-pagination>
  </el-card>
</div>
</template>

<script>
import { searchDelivery, deleteDelivery, getAllDelivery } from '@/api'
import { baseURL } from '@/utils/request'
export default {
  name: 'user-avatar',
  data () {
    return {
      images: [],
      baseURL: baseURL,
      dialogVisible: false,
      formData: {},
      dialogData: {},
      tableData: [],
      showPagination: true,
      count: 0,
      inquireData: {
        picID: '',
        page: 1
      },
      detailData: {}
    }
  },
  mounted () {
    this.getAllProductInfo()
  },
  methods: {
    async getAllProductInfo () {
      this.showPagination = true
      const { data: res } = await getAllDelivery(this.inquireData)
      if (res.code === '200') {
        const tableData = []
        for (let i = 0; i < res.data.briefList.length; i++) {
          let obj = res.data.briefList[i]
          const address = baseURL + '/' + obj.picPath
          obj = { ...obj, address }
          tableData.push(obj)
        }
        this.count = res.data.count
        this.tableData = tableData
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    async updateAvatarFn () {
      this.showPagination = false
      const { data: res } = await searchDelivery(this.formData)
      if (res.code === '200') {
        const tableData = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = JSON.parse(res.data[i])
          const address = baseURL + '/' + obj.picPath
          obj = { ...obj.brief, address, cont_sign: obj.cont_sign }
          tableData.push(obj)
        }
        this.tableData = tableData
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    handleCurrentChange (page) {
      this.inquireData.page = page
      this.getAllProductInfo()
    },
    limitNum () {
      this.$message.error('只能上传一张图片用于搜索')
    },
    onFileChange (file) {
      // const file = e.target.files
      if (file.length === 0) {
        // 证明用户没有选择任何文件 然后点击了确定关闭选择弹窗
      } else {
        const formData = new FormData()
        formData.append('avatar', file.raw)
        formData.append('rn', 10)
        this.formData = formData
      }
    },
    openDelete (row) {
      this.$confirm('此操作将永久删除该快件信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const formData = new FormData()
        formData.append('cont_sign', row.cont_sign)
        const { data: res } = await deleteDelivery(formData)
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllProductInfo()
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openDialog (item) {
      this.$confirm('查看详细信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定后发送请求检查余额  如果成功扣费则打开快件详细信息 并且给编辑和删除权限
        this.detailData = item
        console.log(item)
        this.dialogVisible = true
      }).then(() => {

      })
    },
    goToEdit (row) {
      this.$router.push({
        path: '/edit-express',
        query: { row }
      })
    },
    goToEditExpress () {
      this.$router.push('/addDelivery')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.editNum input::-webkit-outer-spin-button,
/deep/.editNum input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
/deep/ .editNum input[type="number"] {
    -moz-appearance: textfield;
  }
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.messageCardBox{
  display:flex;
  flex-wrap: wrap;
  .cardSize{
    width:170px;
    // height:250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:10px;
    margin-bottom:10px;
  }
}
div.behindTitle > span {
  width:240px;
  height:40px;
  display: inline-block;
}
.title{
  font-size: 18px;
  line-height: 40px;
}
</style>
