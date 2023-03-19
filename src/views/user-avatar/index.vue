<template>
<div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>上传图片搜索相似图片</span>
    </div>
    <img class="the_img" src="@/assets/avatar.jpg" v-if="!newAvatar" />
    <img class="the_img" :src="newAvatar" v-else />
    <div class="btn-box">
      <input
        type="file"
        accept="image/*"
        style="display: none"
        ref="iptRef"
        @change="onFileChange"
      />
      <!-- 用于打开选择图片的 因为是原生的样式不好改 所以在elbutton里面获取该节点 -->
      <el-button type="primary" icon="el-icon-plus" @click="selectAvatarFn"
        >选择图片</el-button>
      <el-button type="success" icon="el-icon-upload" @click="updateAvatarFn"
        >上传图片</el-button>
    </div>
  </el-card>
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
            <div>分类：{{scope.row.type}}</div>
            <div>名称：{{scope.row.message}}</div>
            <div>数量：{{scope.row.num}}</div>
            <div>颜色：{{scope.row.color}}</div>
            <div>重量：{{scope.row.weight}}</div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="发现细节">
      <template slot-scope="scope">
        <div>发现时间：{{scope.row.watch_time}}</div>
        <div>发现环节：{{scope.row.watch_address}}</div>
        <div>发现人员：{{scope.row.watch_person}}</div>
      </template>
    </el-table-column>
    <el-table-column label="登记细节">
      <template slot-scope="scope">
        <div>登记时间：{{scope.row.watch_time}}</div>
        <div>登记单位：{{scope.row.watch_address}}</div>
        <div>简登人员：{{scope.row.watch_person}}</div>
        <div>补登人员：{{scope.row.watch_person}}</div>
        <div>联系电话：{{scope.row.phone}}</div>
      </template>
    </el-table-column>
    <el-table-column label="其他信息">
      <template slot-scope="scope">
        <div>无面单编号：{{scope.row.type}}</div>
        <div>快件遗落类型：{{scope.row.type}}</div>
        <div>进/出港：{{scope.row.watch_time}}</div>
        <div>车辆运输号：{{scope.row.watch_address}}</div>
        <div>上一站编码：{{scope.row.watch_person}}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="goToEdit(scope.row)">编辑</el-button>
        <el-button type="text" @click="openDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { searchPictureAPI } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      newAvatar: '',
      formData: {},
      tableData: [{
        type: '居家日用',
        message: '水杯一个',
        num: '1',
        color: '透明',
        weight: '0.5kg',
        address: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
        watch_time: '-',
        watch_address: '-',
        watch_person: '-',
        phone: '-'
      }]
    }
  },
  methods: {
    selectAvatarFn () {
      // 目的:为了让input[type=file]标签，让他再用代码来触发它的点击事件(导致它默认行为给一个文件选择窗口)
      // 原因:input[type=file]它是原生标签,样式不太好改
      this.$refs.iptRef.click()
    },
    async updateAvatarFn () {
      const res = await searchPictureAPI(this.formData)
      console.log(JSON.parse(res.data[0]))
    },
    onFileChange (e) {
      const file = e.target.files
      if (file.length === 0) {
        // 证明用户没有选择任何文件 然后点击了确定关闭选择弹窗
      } else {
        console.log(file[0])
        // 证明它选择了文件(默认只能选1个，如果选择多个你需要给input标签加额外原生属性)

        // img标签的src值
        //* 只能是图片的"链接地址"(外链http://开头，图片文件相对路径)
        //* 或者是图片的base64字符串(而且字符串还必须是data:image/ png;base64，图片转base64字符串)

        // 解决方案1:文件 ->内存临时地址(这个地址只能在js里内存里不能发给后台)
        // 语法:URL.createObjectURL(文件)
        // 返回值:内存临时地址
        // this.newAvatar = URL.createObjectURL(file[0]);

        // 解决方案2:文件 -> base64字符串(此字符串是可以发给后台的)

        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(file[0])
        // 3. 监听 fr 的 onload 事件
        fr.onload = (e) => {
          // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.newAvatar = e.target.result
        }
        const formData = new FormData()
        formData.append('avatar', file[0])
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
      this.$router.push('')
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
.the_img {
  width: 250px;
  height: 250px;
}
</style>
