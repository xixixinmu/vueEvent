<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div class="the_img">
      <img src="@/assets/avatar.jpg" />
    </div>
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
        >选择图片</el-button
      >
      <el-button type="success" icon="el-icon-upload" @click="updateAvatarFn"
        >上传头像</el-button
      >
    </div>
  </el-card>
</template>

<script>
export default {
  name: "user-avatar",
  methods: {
    selectAvatarFn() {
      //目的:为了让input[type=file]标签，让他再用S代码来触发它的点击事件(导致它默认行为给一个文件选择窗口)
      //原因:input[type=file]它是原生标签,样式不太好改//解决:移花接木
      this.$refs.iptRef.click();
    },
    updateAvatarFn() {},
    onFileChange(e) {
      const file = e.target.files;
      if (file.length == 0) {
        // 证明用户没有选择任何文件 然后点击了确定关闭选择弹窗
      } else {
        console.log(file[0]);
        //证明它选择了文件(默认只能选1个，如果选择多个你需要给input标签加额外原生属性)
      }
    },
  },
};
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