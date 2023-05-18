<template>
  <div>
    <el-card>
      <el-descriptions title="个人信息">
        <el-descriptions-item label="用户名">{{form.username}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{form.phone}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{form.realName}}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{form.idCard}}</el-descriptions-item>
        <el-descriptions-item label="门面名称">{{form.storeName}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <br/>
    <el-card>
      <el-descriptions title="使用信息">
        <el-descriptions-item label="增加次数">{{form.addTimes}}</el-descriptions-item>
        <el-descriptions-item label="搜索次数">{{form.searchTimes}}</el-descriptions-item>
        <el-descriptions-item label="删除次数">{{form.deleteTimes}}</el-descriptions-item>
        <el-descriptions-item label="更新次数">{{form.updateTimes}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <br/>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'

export default {
  data () {
    return {
      form: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data: res } = await getUserInfo()
      this.form = res.data
    }
  }

}
</script>

<style>

</style>
