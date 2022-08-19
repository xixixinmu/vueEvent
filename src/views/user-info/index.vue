<template>
  <el-card>
    <div slot="header">
      <span>卡片名称</span>
    </div>
    <div>
      <el-form :model="userInfo" :rules="userInfoRules" label-width="80px" :ref="userInfoRef">
        <el-form-item label="登录名称">
          <el-input v-model="userInfo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitChangeFn">提交修改</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "user-info",
  data() {
    return {
      userInfo: {
        name: this.$store.state.userInfo.username,
        nickname: "",
        email: "",
      },
      userInfoRules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "昵称必须是1-10位的非空字符串",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    submitChangeFn(){
      
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>