<template>
  <div class="register_background">
    <div class="register_box">
      <div class="title_box"></div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" label-position="left">
        <el-form-item prop="password" label="密码">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
            type="password"
            placeholder="请确认密码"
            v-model="form.repassword"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="changePasswordFn"
        >重置密码</el-button>
      <el-link type="info" @click="goLogin" style="margin-bottom:20px;margin-top:10px">去登录</el-link>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/api/index'

export default {
  name: 'resetPassword',
  data () {
    // 自定义规则函数也要写在data里 但不写return里
    const samePwdFn = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        repassword: ''
      },
      rules: {
        // 校验规则
        // pattern属于正则匹配要输入的东西
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[\S]{5,15}$/,
            //  \S为匹配非空格字符  \s为匹配空白字符
            message: '密码为5-15位的非空格字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changePasswordFn () {
      // js兜底校验  判断输入是否通过前端校验
      this.$refs.form.validate(async (valid, a, b) => {
        if (valid) {
          const formData = new FormData()
          formData.append('password', this.form.password)
          const { data: res } = await changePassword(formData)
          if (res.code !== '200') {
            return this.$message.error(res.msg)
            // $message为elementUI封装的弹窗
          } else {
            this.$message.success(res.msg)
            this.$router.push('./login')
          }
        } else {
          return false
          // 阻止表单默认提交行为
        }
      })
    },
    goLogin () {
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>
body {
  .verifiInput.el-input /deep/ .el-input__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .verifiButton{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    height: 41px;
    margin-top: 1px;
  }
  .register_background {
    position: fixed;
    width: 100%;
    background: url("@/assets/login.jpg") center;
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
      width: 485px;
      // height: 400px;
      background-color: #fff;
      opacity: 0.8;
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
