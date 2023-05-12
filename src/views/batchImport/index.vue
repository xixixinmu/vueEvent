<template>
    <div>
        <div style="fontSize:20px">批量上传</div>
        <br/>
        <el-upload
          class="upload-demo"
          drag
          action
          multiple
          :http-request="handleChange"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <br/>
        <el-link target="_blank" :href="downloadUrl" :underline="false">
          <el-button type="primary" icon="el-icon-download" >下载批量导入模版</el-button>
        </el-link>
    </div>
</template>

<script>
import { baseURL } from '@/utils/request'
import { batchImportDelivery } from '@/api/index'

export default {
  name: 'batchImport',
  data () {
    return {
      baseURL,
      downloadUrl: 'http://124.222.81.137:8080/test.xlsx',
      uploadUrl: baseURL + '/api/upload'
    }
  },
  methods: {
    async handleChange (files) {
      const formdata = new FormData()
      formdata.append('file', files.file)
      const { data: res } = await batchImportDelivery(formdata)
      if (res.code !== '200') {
        return this.$message.error(res.msg)
        // $message为elementUI封装的弹窗
      } else {
        if (res.data.fail !== {}) {
          this.$message.success(res.data.count + ',' + res.data.fail['1'])
        } else {
          this.$message.success(res.data.count)
        }
      }
    }
  }
}
</script>

<style>

</style>
