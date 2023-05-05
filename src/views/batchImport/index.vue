<template>
    <div>
        <div style="fontSize:20px">批量上传</div>
        <br/>
        <el-upload
          class="upload-demo"
          drag
          :action="baseURL"
          multiple
          :on-change="handleChange"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <br/>
        <el-button type="primary" icon="el-icon-download">下载批量导入模版</el-button>
    </div>
</template>

<script>
import { baseURL } from '@/utils/request'
export default {
  name: 'batchImport',
  data () {
    return {
      baseURL
    }
  },
  methods: {
    handleChange (files) {
      console.log(files.raw)
    }
  }
}
</script>

<style>

</style>
