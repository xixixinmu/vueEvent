<template>
  <div>
    <h3>认领信息填写</h3>
    <el-card>
      <div slot="header" class="clearfix">
        寄件信息
      </div>
      <el-form label-position="left" label-width="90px">
        <el-form-item label="运单编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="快件中转类型">
          <el-radio-group>
            <el-radio :label="0">转出至收件人</el-radio>
            <el-radio :label="1">退回至发件网点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="寄件人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="寄件电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="寄件地址">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <div slot="header" class="clearfix">
        收件信息
      </div>
      <el-form label-position="left" label-width="90px">
        <el-form-item label="收件人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="收件电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="寄件地址">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="认领说明">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button>认领快件</el-button>
    </el-card>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'

export default {
  name: 'claimPage',
  data () {
    return {
      options: regionData,
      selectedOptions: []
    }
  },
  methods: {
    handleChange () {
      let loc = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += codeToText[this.selectedOptions[i]]
      }
      console.log(codeToText)
      console.log(loc)
    }
  }
}
</script>

<style>

</style>
