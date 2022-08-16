<template>
  <div class="register_background">
    <div class="register_box">
      <div class="title_box"></div>
      <el-form ref="form" :model="form">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="loginFn"
            >登录</el-button
          >
          <el-link type="info" @click="goRegister">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI,getUsersInfo } from "@/api/index";
import { mapMutations } from "vuex";
// 导入mutation中写的函数
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 扩展运算符导入函数
    ...mapMutations(["updateToken"]),
    async loginFn() {
      if (this.form.username != "" && this.form.password != "") {
        // 把axios返回的数据对象data中的值存在res里
        const { data: res } = await loginAPI(this.form);
        if (res.code != 0) {
          // code为0成功 1异常
          return this.$message.error(res.message);
          // $message为elementUI封装的弹窗
        } else {
          this.$message.success(res.message);
          this.$router.push("/layout");
          // 调用mutation中的方法
          this.updateToken(res.token);
          console.log(getUsersInfo())
        }
      } else {
        return false;
        // 阻止表单默认提交行为
      }
    },
    goRegister() {
      this.$router.push("./register");
    },
  },
};
</script>

<style lang="less" scoped>
body {
  .register_background {
    position: fixed;
    width: 100%;
    background: url("@/assets/login_bg.jpg") center;
    background-size: cover;
    height: 100%; //%参考父级高度 在App.vue里面
    // 因为那里面有个id=app的div没有高度 所以不会显示背景图片
    // 把那个div去掉就能解决  我这个是自己找的办法解决
    // 图片铺满页面

    display: flex;
    align-items: center;
    justify-content: center;
    // 垂直水平居中

    .register_box {
      width: 400px;
      height: 280px;
      background-color: #fff;
      padding: 0 30px;
      border-radius: 5px;
      .title_box {
        height: 60px;
        background: url("@/assets/login_title.png") center no-repeat;
      }
    }
  }
}
</style>