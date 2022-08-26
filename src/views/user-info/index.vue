<template>
  <el-card>
    <div slot="header">
      <span>修改个人信息</span>
    </div>
    <div>
      <el-form
        :model="userInfo"
        :rules="userInfoRules"
        label-width="80px"
        ref="userFormRefs"
      >
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
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { updateUserinfoAPI } from '@/api'
export default {
  name: 'user-info',
  data () {
    return {
      userInfo: {
        name: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      userInfoRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '昵称必须是1-10位的非空字符串',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitChangeFn () {
      // 通过refs属性获取表单 进行兜底验证 只有通过前端校验才能提交
      this.$refs.userFormRefs.validate(async (vaild) => {
        if (vaild) {
          this.userInfo.id = this.$store.state.userInfo.id
          // id属性必传  所以从vuex上面取出来 给userinfo加上
          const { data: res } = await updateUserinfoAPI(this.userInfo)
          if (res.code !== 0) return this.$message.error('更新用户信息失败')
          this.$message.success(res.message)
          this.$store.dispatch('initUserInfo')
          // 重新让vuex获取下最新的用户数据
        } else {
          return false
        }
      })
    },
    resetFn () {
      this.userInfo.nickname = ''
      this.userInfo.email = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
