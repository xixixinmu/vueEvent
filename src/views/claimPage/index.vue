<template>
  <div>
    <h3>认领信息填写</h3>
    <el-card>
      <div slot="header" class="clearfix">
        寄件信息
      </div>
      <el-form label-position="left" label-width="90px" :model="sendForm">
        <el-form-item label="运单编号">
          <el-input v-model="sendForm.waybillNumber"></el-input>
        </el-form-item>
        <el-form-item label="快件中转类型">
          <el-radio-group v-model="sendForm.transferType">
            <el-radio :label="0">转出至收件人</el-radio>
            <el-radio :label="1">退回至发件网点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="寄件人">
          <el-input v-model="sendForm.sender"></el-input>
        </el-form-item>
        <el-form-item label="寄件电话">
          <el-input v-model="sendForm.senderPhone"></el-input>
        </el-form-item>
        <el-form-item label="寄件地址">
          <el-cascader
            size="large"
            :options="options"
            v-model="sendSelectedOptions"
            @change="handleChange('send')"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="sendForm.senderDetailAddress"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <div slot="header" class="clearfix">
        收件信息
      </div>
      <el-form label-position="left" label-width="90px" :model="receiveForm">
        <el-form-item label="收件人">
          <el-input v-model="receiveForm.receiver"></el-input>
        </el-form-item>
        <el-form-item label="收件电话">
          <el-input v-model="receiveForm.receiverPhone"></el-input>
        </el-form-item>
        <el-form-item label="收件地址">
          <el-cascader
            size="large"
            :options="options"
            v-model="receiveSelectedOptions"
            @change="handleChange('receive')"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="receiveForm.receiverDetailAddress"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            drag
            :on-change="handleChangePic"
            :auto-upload='false'
            :action="baseURL"
            :limit="1"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="认领说明">
          <el-input type="textarea" ></el-input>
        </el-form-item> -->
      </el-form>
    </el-card>
    <br/>
    <el-card>
      <el-button @click="submitData" type="primary">认领快件</el-button>
    </el-card>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'
import { baseURL } from '@/utils/request'
import { claimAPI } from '@/api'
export default {
  name: 'claimPage',
  data () {
    return {
      baseURL,
      options: regionData,
      sendSelectedOptions: [],
      receiveSelectedOptions: [],
      sendForm: {},
      receiveForm: {},
      picPath: '',
      cont_sign: this.$route.query.cont_sign
    }
  },
  methods: {
    handleChange (type) {
      if (type === 'receive') {
        this.receiveForm.receiverProvince = codeToText[this.receiveSelectedOptions[0]]
        this.receiveForm.receiverCity = codeToText[this.receiveSelectedOptions[1]]
        this.receiveForm.receiverArea = codeToText[this.receiveSelectedOptions[2]]
      } else if (type === 'send') {
        this.sendForm.senderProvince = codeToText[this.sendSelectedOptions[0]]
        this.sendForm.senderCity = codeToText[this.sendSelectedOptions[1]]
        this.sendForm.senderArea = codeToText[this.sendSelectedOptions[2]]
      }
    },
    handleChangePic (file) {
      this.picPath = file.raw
    },
    async submitData () {
      const formData = new FormData()
      formData.append('adoptInfo', new Blob([JSON.stringify({ ...this.receiveForm, ...this.sendForm })], { type: 'application/json' }))
      formData.append('avatar', this.picPath)
      formData.append('cont_sign', this.cont_sign)
      const { data: res } = await claimAPI(formData)
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
    }
  }
}
</script>

<style>

</style>
