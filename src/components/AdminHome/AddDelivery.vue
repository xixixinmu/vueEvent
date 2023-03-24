<template>
  <div class="content">
    <div class="tab_content">
      <div class="step">
        <el-steps :active="active" finish-status="success">
          <el-step title="物品信息"></el-step>
          <el-step title="发现信息"></el-step>
          <el-step title="登记信息"></el-step>
          <el-step title="其他信息"></el-step>
        </el-steps>
      </div>
      <div class="first_tab" v-show="active === 0">
        <el-form ref="delivery1" :model="delivery" :rules="rules" label-width="100px">
          <el-form-item label="内件信息" prop="inInfo">
            <el-input v-model="delivery.inInfo"></el-input>
          </el-form-item>
          <el-form-item label="物件类别" prop="stuffType">
            <el-input v-model="delivery.stuffType"></el-input>
          </el-form-item>
          <el-form-item label="物品重量" prop="stuffWeight">
            <el-input v-model="delivery.stuffWeight"></el-input>
          </el-form-item>
          <el-form-item label="内件颜色" prop="inColor">
            <el-input v-model="delivery.inColor"></el-input>
          </el-form-item>
          <el-form-item label="内件个数" prop="inNum">
            <el-input v-model="delivery.inNum"></el-input>
          </el-form-item>
          <el-form-item label="上传物品图片" required>
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
          </el-form-item>
        </el-form>
        <div class="step_btn">
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery1')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="second_tab" v-show="active === 1">
        <el-form ref="delivery2" :model="delivery" :rules="rules" label-width="80px">
          <el-form-item label="发现时间" prop="discoverTime">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="delivery.discoverTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="发现环节" prop="discoverLink">
            <el-input v-model="delivery.discoverLink"></el-input>
          </el-form-item>
          <el-form-item label="发现人员" prop="discoverer">
            <el-input v-model="delivery.discoverer"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
            <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery2')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="third_tab" v-show="active === 2">
        <el-form ref="delivery3" :model="delivery" :rules="rules" label-width="80px">
          <el-form-item label="登记时间" prop="registrationTime">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="delivery.registrationTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="登记单位" prop="registrationUnit">
            <el-input v-model="delivery.registrationUnit"></el-input>
          </el-form-item>
          <el-form-item label="简登人员" prop="simpleRegistrant">
            <el-input v-model="delivery.simpleRegistrant"></el-input>
          </el-form-item>
          <el-form-item label="补登人员" prop="supRegistrant">
            <el-input v-model="delivery.supRegistrant"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="delivery.phone"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
            <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery3')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="markdown_tab" v-show="active === 3">
        <el-form ref="delivery4" :model="delivery" :rules="rules" label-width="100px">
          <el-form-item label="无面单编号" prop="picID">
            <el-input v-model="delivery.picID"></el-input>
          </el-form-item>
          <el-form-item label="进/出港" prop="Inout">
            <el-input v-model="delivery.Inout"></el-input>
          </el-form-item>
          <el-form-item label="快件遗落类型" prop="loseType">
            <el-input v-model="delivery.loseType"></el-input>
          </el-form-item>
          <el-form-item label="车辆运输号" prop="carId">
            <el-input v-model="delivery.carId"></el-input>
          </el-form-item>
          <el-form-item label="上一站编码" prop="preStation">
            <el-input v-model="delivery.preStation"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
          <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="onSubmit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDelivery } from '@/api'
import { baseURL } from '@/utils/request'

export default {
  name: 'AddDelivery',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      baseURL,
      avatar: [],
      images: [],
      newAvatar: '',
      myHeader: {
        Authorization: ''
      },
      active: 0, // 激活的过程卡片选择器
      delivery: {
        picID: '',
        discoverer: '',
        registrationTime: '',
        phone: '',
        stuffWeight: '',
        inInfo: '',
        discoverTime: '',
        Inout: '',
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
      rules: {
        picID: [
          { required: true, message: '请输入无面单编号', trigger: 'blur' }
        ],
        discoverer: [
          { required: true, message: '请输入发现人员', trigger: 'blur' }
        ],
        registrationTime: [
          { required: true, message: '请选择登记时间', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        stuffWeight: [
          { required: true, message: '请输入物品重量', trigger: 'blur' }
        ],
        inInfo: [
          { required: true, message: '请输入内件信息', trigger: 'blur' }
        ],
        discoverTime: [
          { required: true, message: '请选择发现时间', trigger: 'blur' }
        ],
        Inout: [
          { required: true, message: '请输入进/出港', trigger: 'blur' }
        ],
        simpleRegistrant: [
          { required: true, message: '请输入简登人员', trigger: 'blur' }
        ],
        loseType: [
          { required: true, message: '请输入快件遗落类型', trigger: 'blur' }
        ],
        inNum: [
          { required: true, message: '请输入内件数量', trigger: 'blur' }
        ],
        carId: [
          { required: true, message: '请输入车辆运输号', trigger: 'blur' }
        ],
        discoverLink: [
          { required: true, message: '请输入发现环节', trigger: 'blur' }
        ],
        registrationUnit: [
          { required: true, message: '请输入登记单位', trigger: 'blur' }
        ],
        supRegistrant: [
          { required: true, message: '请输入补登人员', trigger: 'blur' }
        ],
        stuffType: [
          { required: true, message: '请输入物品类别', trigger: 'blur' }
        ],
        inColor: [
          { required: true, message: '请输入内件颜色', trigger: 'blur' }
        ],
        preStation: [
          { required: true, message: '请输入上一站编码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 过程链的操作函数
    nextToAttr (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++
        } else {
          this.$message.error('数据未通过验证')
          return false
        }
      })
    },
    nextToSale () {
      this.active++
    },
    next () {
      if (this.active < 3) {
        this.active++
      } else {
        this.active = 3
      }
    },
    prev () {
      if (this.active > 1) {
        this.active--
      } else {
        this.active = 0
      }
    },

    // 验证函数，验证值只能是正整数
    proving (e) {
      const keyNum = window.event ? e.keyCode : e.which // 获取键盘吗
      if (
        keyNum === 189 ||
        keyNum === 190 ||
        keyNum === 110 ||
        keyNum === 109
      ) {
        this.$message.warning('禁止输入小数以及负数')
        e.target.value = ''
      }
    },
    handleChange (file, fileList) {
      const avatar = []
      for (let i = 0; i < fileList.length; i++) {
        avatar.push(fileList[i].raw)
        console.log(fileList[i].raw)
      }
      this.avatar = avatar
      // this.avatar = fileList[0].raw
    },
    async onSubmit () {
      const formData = new FormData()
      // console.log(this.avatar)
      formData.append('avatar', this.avatar[0])
      formData.append('brief', this.delivery)
      formData.append('tags', '')
      console.log(formData.get('avatar'))
      const { data: res } = await addDelivery(formData)
      console.log(JSON.parse(res[0]))
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: res.message
        })
      } else {
        this.$message({
          type: 'warning',
          message: res.message
        })
      }
    }
  },
  created () {}
}
</script>

  <style scoped>
.btn-box {
  margin-top: 10px;
}
.the_img {
  width: 250px;
  height: 250px;
}
</style>
