<template>
  <div class="register_background">
    <div class="register_box">
      <div class="title_box"></div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" label-position="left">
        <el-form-item prop="realName" label="真实姓名">
          <el-input
            placeholder="请输入真实姓名"
            v-model="form.realName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            placeholder="请输入手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号">
          <el-input
            placeholder="请输入身份证号码"
            v-model="form.idCard"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="storeName" label="门面名称">
          <el-input
            placeholder="请输入门面名称"
            v-model="form.storeName"
          ></el-input>
        </el-form-item>
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
      <el-button type="primary" style="width: 100%" @click="registerFn"
        >注册</el-button
      >
      <el-link type="info" @click="goLogin">去登录</el-link>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index'
export default {
  name: 'RegisterPage',
  data () {
    // 自定义规则函数也要写在data里 但不写return里
    const samePwdFn = (rule, value, callback) => {
      // console.log(rule, value, callback);
      if (this.form.password !== value) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        realName: '',
        username: '',
        phone: '',
        idCard: '',
        storeName: '',
        password: '',
        repassword: ''
      },
      rules: {
        // 校验规则
        realName: [
          { required: true, message: '你的真实姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            message: '电话号码是必须以1开头的11位数字',
            trigger: 'blur'
          }
        ],
        idCard: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          {
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '身份证号码的格式有误',
            trigger: 'blur'
          }
        ],
        storeName: [
          { required: true, message: '店铺名称不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
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
    // 注册
    registerFn () {
      // js兜底校验  判断输入是否通过前端校验
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 通过校验

          // 把axios返回的数据对象data中的值存在res里
          const res = await registerAPI(this.form)
          console.log(res)
          // if (res.code !== 0) {
          //   // code为0成功 1异常
          //   return this.$message.error(res.message)
          //   // $message为elementUI封装的弹窗
          // } else {
          //   this.$message.success(res.message)
          //   this.$router.push('./login')
          // }
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
      height: 600px;
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
