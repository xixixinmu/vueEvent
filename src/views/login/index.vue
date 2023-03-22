<template>
  <div class="register_background">
    <div class="register_box">
      <div class="title_box"></div>
      <el-form ref="form" :model="form" :rules="rules">
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
        <el-form-item prop="inputVal">
            <div class="validateCode">
              <el-input v-model="form.inputVal" style="width:150px" clearable placeholder="请输入验证码"></el-input>
              <validateCode ref="ref_validateCode" @change="changeCode" />
            </div>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="loginFn">登录</el-button>
          <el-link type="info" @click="goRegister">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'
import validateCode from '@/components/Login/validateCode.vue'
import { mapMutations, mapActions } from 'vuex'
// 导入mutation中写的函数
export default {
  name: 'LoginPage',
  components: {
    validateCode
  },
  data () {
    const sameCode = (rule, value, callback) => {
      if (this.form.inputVal.toUpperCase() === this.checkCode) {
        // this.result = '比对成功'
        callback()
      } else {
        callback(new Error('验证码输入错误'))
        this.inputVal = ''
        this.$refs.ref_validateCode.draw()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        inputVal: ''
      },
      // inputVal: '',
      checkCode: '',
      result: '',
      rules: {
        // 校验规则
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        // pattern属于正则匹配要输入的东西
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: /^[\S]{5,15}$/,
            //  \S为匹配非空格字符  \s为匹配空白字符
            message: '密码为5-15位的非空格字符',
            trigger: 'blur'
          }
        ],
        inputVal: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { validator: sameCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 扩展运算符导入函数
    ...mapMutations(['updateToken']),
    ...mapActions(['initUserInfo']),
    loginFn () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 把axios返回的数据对象data中的值存在res里
          const { data: res } = await loginAPI(this.form)
          console.log(res)
          if (res.code !== 0) {
            // code为0成功 1异常
            return this.$message.error('用户名或密码错误')
            // $message为elementUI封装的弹窗
          } else {
            this.$message.success('登录成功')
            this.updateToken(res.token)
            console.log(res.isAdmin)
            if (res.isAdmin === 0) {
              // this.$router.push('/user-avatar')
              this.$router.push('/admin')
              // 调用mutation中的方法
              this.initUserInfo()
            } else {
              // this.$router.push('/user-avatar')
              this.$router.push('/user')
              // 调用mutation中的方法
              this.initUserInfo()
            }
          }
        } else {
          return false
          // 阻止表单默认提交行为
        }
      })
    },
    goRegister () {
      this.$router.push('./register')
    },
    changeCode (value) {
      this.checkCode = value
    },
    compare () {
      if (this.inputVal.toUpperCase() === this.checkCode) {
        this.result = '比对成功'
      } else {
        this.result = '比对失败,请重新输入'
        this.inputVal = ''
        this.$refs.ref_validateCode.draw()
      }
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
      width: 400px;
      height: 350px;
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
.validateCode{
  display: flex;
  justify-content: space-between;
}
</style>
