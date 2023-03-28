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
          :on-change="handleChange"
          :limit="8"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form>
      <br/>
      <el-button @click="submitFrom" type="primary">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import { updateDelivery } from '@/api'
import { baseURL } from '@/utils/request'
export default {
  data () {
    return {
      avatar: [],
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
      baseURL
    }
  },
  mounted () {
    console.log(this.$route.query.row)
    this.submitData = { ...this.$route.query.row }
  },
  methods: {
    handleChange (file, fileList) {
      const avatar = []
      for (let i = 0; i < fileList.length; i++) {
        avatar.push(fileList[i].raw)
      }
      this.avatar = avatar
    },
    async submitFrom () {
      const formData = new FormData()
      console.log(this.submitData.cont_sign)
      formData.append('cont_sign', this.submitData.cont_sign)
      const res = await updateDelivery(formData)
      console.log(res)
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
