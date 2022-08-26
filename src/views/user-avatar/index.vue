<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
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
        >上传头像</el-button>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      newAvatar: ''
    }
  },
  methods: {
    selectAvatarFn () {
      // 目的:为了让input[type=file]标签，让他再用代码来触发它的点击事件(导致它默认行为给一个文件选择窗口)
      // 原因:input[type=file]它是原生标签,样式不太好改
      // 解决:移花接木
      this.$refs.iptRef.click()
    },
    async updateAvatarFn () {
      const { data: res } = await updateUserAvatarAPI(this.newAvatar)
      if (res.code === 0) {
        this.$store.dispatch('initUserInfo')
        // 因为添加了头像信息  从后台重新获取用户信息
        this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
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
      }
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
  width: 350px;
  height: 350px;
}
</style>
