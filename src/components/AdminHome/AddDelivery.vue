<template>
  <div class="content">
    <div class="tab_content">
      <div class="step">
        <el-steps :active="active" finish-status="success">
          <el-step title="登记信息"></el-step>
          <el-step title="登记信息"></el-step>
          <el-step title="登记信息"></el-step>
          <el-step title="登记信息"></el-step>
        </el-steps>
      </div>
      <div class="first_tab" v-if="active === 0">
        <el-form ref="delivery" :model="delivery" :rules="rules" label-width="80px">
          <el-form-item label="无面单编号" prop="ID">
            <el-input v-model="delivery.ID"></el-input>
          </el-form-item>
          <el-form-item label="发现人员" prop="findPeople">
            <el-input v-model="delivery.findPeople"></el-input>
          </el-form-item>
          <el-form-item label="登记时间" prop="datetime">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="delivery.datetime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话" prop="telphone">
            <el-input v-model="delivery.telphone"></el-input>
          </el-form-item>
          <el-form-item label="物品重量" prop="weight">
            <el-input v-model="delivery.weight"></el-input>
          </el-form-item>
          <el-form-item label="内件信息" prop="description">
            <el-input v-model="delivery.description"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="second_tab" v-if="active === 1">
        <el-form ref="delivery" :model="delivery" :rules="rules" label-width="80px">
          <el-form-item label="发现时间" prop="findTime">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="delivery.findTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="进/出港" prop="port">
            <el-input v-model="delivery.port"></el-input>
          </el-form-item>
          <el-form-item label="简登人员" prop="datePeople">
            <el-input v-model="delivery.datePeople"></el-input>
          </el-form-item>
          <el-form-item label="快件遗落类型" prop="type1">
            <el-input v-model="delivery.type1"></el-input>
          </el-form-item>
          <el-form-item label="内件个数" prop="number">
            <el-input v-model="delivery.number"></el-input>
          </el-form-item>
          <el-form-item label="车辆运输号" prop="transportNumber">
            <el-input v-model="delivery.transportNumber"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
            <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="third_tab" v-if="active === 2">
        <el-form ref="delivery" :model="delivery" :rules="rules" label-width="80px">
          <el-form-item label="发现环节" prop="discoverLink">
            <el-input v-model="delivery.discoverLink"></el-input>
          </el-form-item>
          <el-form-item label="登记单位" prop="unit">
            <el-input v-model="delivery.unit"></el-input>
          </el-form-item>
          <el-form-item label="补登人员" prop="retroactivePeople">
            <el-input v-model="delivery.retroactivePeople"></el-input>
          </el-form-item>
          <el-form-item label="物件类别" prop="type2">
            <el-input v-model="delivery.type2"></el-input>
          </el-form-item>
          <el-form-item label="内件颜色" prop="color">
            <el-input v-model="delivery.color"></el-input>
          </el-form-item>
          <el-form-item label="上一站编码" prop="formerCode">
            <el-input v-model="delivery.formerCode"></el-input>
          </el-form-item>
        </el-form>
        <div class="step_btn">
            <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="nextToAttr('delivery')"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="markdown_tab" v-if="active === 3">
        <img class="the_img" src="@/assets/avatar.jpg" v-if="!newAvatar" @click="selectAvatarFn" />
        <img class="the_img" :src="newAvatar" v-else @click="selectAvatarFn" />
        <div class="btn-box">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="iptRef"
            @change="onFileChange"
          />
          <!-- 用于打开选择图片的 因为是原生的样式不好改 所以在elbutton里面获取该节点 -->
          <el-button type="primary" icon="el-icon-plus" @click="selectAvatarFn"
            >选择图片</el-button
          >
          <!-- <el-button
            type="success"
            icon="el-icon-upload"
            @click="updateAvatarFn"
            >上传图片</el-button
          > -->
        </div>
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
      newAvatar: '',
      myHeader: {
        Authorization: ''
      },
      formData: {
        avatar: '',
        tags: ''
      },
      active: 0, // 激活的过程卡片选择器
      delivery: {
        ID: '',
        findPeople: '',
        datetime: '',
        telphone: '',
        weight: '',
        description: '',
        findTime: '',
        port: '',
        datePeople: '',
        type1: '',
        number: '',
        transportNumber: '',
        discoverLink: '',
        unit: '',
        retroactivePeople: '',
        type2: '',
        color: '',
        formerCode: ''
      },
      rules: {
        ID: [
          { required: true, message: '请输入无面单编号', trigger: 'blur' }
        ],
        findPeople: [
          { required: true, message: '请输入发现人员', trigger: 'blur' }
        ],
        datetime: [
          { required: true, message: '请选择登记时间', trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入物品重量', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入内件信息', trigger: 'blur' }
        ],
        findTime: [
          { required: true, message: '请选择发现时间', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入进/出港', trigger: 'blur' }
        ],
        datePeople: [
          { required: true, message: '请输入简登人员', trigger: 'blur' }
        ],
        type1: [
          { required: true, message: '请输入快件遗落类型', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入内件数量', trigger: 'blur' }
        ],
        transportNumber: [
          { required: true, message: '请输入车辆运输号', trigger: 'blur' }
        ],
        discoverLink: [
          { required: true, message: '请输入发现环节', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入登记单位', trigger: 'blur' }
        ],
        retroactivePeople: [
          { required: true, message: '请输入补登人员', trigger: 'blur' }
        ],
        type2: [
          { required: true, message: '请输入物品类别', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请输入内件颜色', trigger: 'blur' }
        ],
        formerCode: [
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
    selectAvatarFn () {
      // 目的:为了让input[type=file]标签，让他再用代码来触发它的点击事件(导致它默认行为给一个文件选择窗口)
      // 原因:input[type=file]它是原生标签,样式不太好改
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
      const file = e.target.files
      if (file.length === 0) {
        // 证明用户没有选择任何文件 然后点击了确定关闭选择弹窗
        this.newAvatar = ''
      } else {
        console.log(file[0])
        // 证明它选择了文件(默认只能选1个，如果选择多个你需要给input标签加额外原生属性)

        // img标签的src值
        //* 只能是图片的"链接地址"(外链http://开头，图片文件相对路径)
        //* 或者是图片的base64字符串(而且字符串还必须是data:image/ png;base64，图片转base64字符串)

        // 解决方案1:文件 ->内存临时地址(这个地址只能在js里内存里不能发给后台)
        // 语法:URL.createObjectURL(文件)
        // 返回值:内存临时地址
        // this.newAvatar = URL.createObjectURL(file[0]);

        // 解决方案2:文件 -> base64字符串(此字符串是可以发给后台的)

        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(file[0])
        // 3. 监听 fr 的 onload 事件
        fr.onload = (e) => {
          // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.newAvatar = e.target.result
        }
        const formData = new FormData()
        formData.append('avatar', file[0])
        formData.append('tags', '100,11')
        this.formData.avatar = formData.get('avatar')
        this.formData.tags = formData.get('tags')
      }
    },
    async onSubmit () {
      if (this.delivery) {
        // const { data: res } = await addDelivery(this.formData, this.delivery)
        // if (res.code === 0) {
        //   return this.$message({
        //     type: 'success',
        //     message: '添加成功'
        //   })
        // } else {
        //   return this.$message({
        //     type: 'warning',
        //     message: '添加失败'
        //   })
        // }
        await addDelivery(this.formData, this.delivery)
        console.log('123')
        return this.$message({
          type: 'success',
          message: '添加成功'
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
