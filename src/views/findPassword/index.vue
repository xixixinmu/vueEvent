<template>
  <div class="register_background">
    <div class="register_box">
      <div class="title_box"></div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" label-position="left">
        <el-form-item prop="phone" label="手机号">
          <el-input
            placeholder="请输入手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="inputVal" label="验证码">
            <div style="display:flex">
              <el-input class='verifiInput' v-model="form.inputVal" clearable placeholder="请输入验证码"></el-input>
              <el-button v-if="dydShow" class="verifiButton" @click="sendVerificationCode" type="primary">发送验证码</el-button>
              <el-button v-if="!dydShow" class="verifiButton" :disabled='true' type="primary">{{codeTimer}}s</el-button>
            </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="registerFn"
        >确定</el-button>
      <el-link type="info" @click="goLogin" style="margin-bottom:20px;margin-top:10px">去登录</el-link>
    </div>
  </div>
</template>

<script>
import { receiveVerifiCode, sendVerifiCode } from '@/api/index'

export default {
  name: 'RegisterPage',
  data () {
    return {
      form: {
        phone: '',
        inputVal: ''
      },
      rules: {
        // 校验规则
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            message: '电话号码是必须以1开头的11位数字',
            trigger: 'blur'
          }
        ],
        inputVal: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      countdownTimer: '',
      codeTimer: '',
      dydShow: true
    }
  },
  methods: {
    // 注册
    registerFn () {
      // js兜底校验  判断输入是否通过前端校验
      this.$refs.form.validate(async (valid, a, b) => {
        if (valid) {
          // 通过校验
          // 把axios返回的数据对象data中的值存在res里
          const formData = new FormData()
          formData.append('code', this.form.inputVal)
          const { data: res } = await receiveVerifiCode(formData)
          if (res.code !== '200') {
            return this.$message.error(res.msg)
            // $message为elementUI封装的弹窗
          } else {
            this.$message.success(res.msg)
            this.$router.push('./resetPassword')
          }
        } else {
          return false
          // 阻止表单默认提交行为
        }
      })
    },
    changeCode (value) {
      this.checkCode = value
    },
    async sendVerificationCode () {
      const formData = new FormData()
      formData.append('phone', this.form.phone)
      const { data: res } = await sendVerifiCode(formData)
      if (res.code !== '200') {
        return this.$message.error(res.msg)
      } else {
        this.$message.success(res.msg)
      }
      if (!this.countdownTimer) {
        // 倒计时间
        this.codeTimer = 60
        // 判断时间是不是要显示
        this.dydShow = false
        // 设置倒计时定时器
        this.countdownTimer = setInterval(() => {
          if (this.codeTimer > 0 && this.codeTimer <= 60) {
            this.codeTimer--
          } else {
            this.dydShow = true
            clearInterval(this.countdownTimer) // 清除定时器
            this.countdownTimer = null
          }
        }, 1000)
      }
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
