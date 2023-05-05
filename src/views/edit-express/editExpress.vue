<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span style="font-size:18px">编辑快件信息</span>
      </div>
      <el-form inline>
        <div>
          <div class="title">物品细节</div>
          <el-form-item label="物品分类">
            <el-input v-model="submitData.stuffType"  size="medium"></el-input>
          </el-form-item>
          <el-form-item label="物品名称">
            <el-input v-model="submitData.inInfo" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="物品数量">
            <el-input v-model="submitData.inNum" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="物品颜色">
            <el-input v-model="submitData.inColor" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="物品重量">
            <el-input v-model="submitData.stuffWeight" size="medium"></el-input>
          </el-form-item>
        </div>
        <div>
          <div class="title">发现细节</div>
          <el-form-item label="发现时间">
            <el-date-picker
              v-model="submitData.discoverTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              size="medium"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发现环节">
            <el-input v-model="submitData.discoverLink" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="发现人员">
            <el-input v-model="submitData.discoverer" size="medium"></el-input>
          </el-form-item>
        </div>
        <div>
          <div class="title">登记细节</div>
          <el-form-item label="登记时间">
            <el-date-picker
              v-model="submitData.registrationTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              size="medium"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登记单位">
            <el-input v-model="submitData.registrationUnit" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="简登人员">
            <el-input v-model="submitData.simpleRegistrant" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="补登人员">
            <el-input v-model="submitData.supRegistrant" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="submitData.phone" size="medium"></el-input>
          </el-form-item>
        </div>
        <div>
          <div class="title">其他信息</div>
          <el-form-item label="无面单编号">
            <el-input v-model="submitData.picID"  size="medium"></el-input>
          </el-form-item>
          <el-form-item label="快件遗落类型">
            <el-input v-model="submitData.loseType" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="进/出港">
            <el-input v-model="submitData.inout" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="车辆运输号">
            <el-input v-model="submitData.carId" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="上一站编码">
            <el-input v-model="submitData.preStation" size="medium"></el-input>
          </el-form-item>
        </div>
        <div>
          <div class="title">物品图片</div>
          <el-upload
          :action="baseURL"
          multiple
          :auto-upload='false'
          accept="jpg,png,bmp"
          list-type="picture-card"
          :file-list='images'
          disabled
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form>
      <br/>
      <el-button @click="submitFrom" type="primary">保存</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-card>
  </div>
</template>

<script>
import { updateDelivery, getDeliveryInfo } from '@/api'
import { baseURL } from '@/utils/request'
export default {
  data () {
    return {
      submitData: {
        picID: '',
        discoverer: '',
        phone: '',
        stuffWeight: '',
        inInfo: '',
        discoverTime: '',
        inout: '',
        simpleRegistrant: '',
        loseType: '',
        inNum: '',
        carId: '',
        discoverLink: '',
        registrationUnit: '',
        supRegistrant: '',
        stuffType: '',
        inColor: '',
        preStation: ''
      },
      images: [],
      baseURL,
      cont_sign: ''
    }
  },
  created () {
    if (!sessionStorage.getItem('cont_sign')) {
      sessionStorage.setItem('cont_sign', this.$route.query.row.cont_sign)
    }
    this.cont_sign = sessionStorage.getItem('cont_sign')
  },
  mounted () {
    this.getInfo()
  },
  beforeDestroy () {
    sessionStorage.removeItem('cont_sign')
  },
  methods: {
    async getInfo () {
      const { data: res } = await getDeliveryInfo(this.cont_sign)
      if (res.code === '200') {
        this.submitData = res.data
        const address = baseURL + '/' + res.data.picPath
        const images = []
        images.push({ url: address })
        this.images = images
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    async submitFrom () {
      const formData = new FormData()
      formData.append('cont_sign', this.cont_sign)
      formData.append('brief', JSON.stringify(this.submitData))
      formData.append('tags', '')
      const { data: res } = await updateDelivery(formData)
      if (res.code === '200') {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.$router.push('/user-avatar')
      } else {
        this.$message({
          type: 'warning',
          message: res.msg
        })
      }
    },
    goBack () {
      this.$router.push('/user-avatar')
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 16px;
  line-height: 40px;
}
</style>
