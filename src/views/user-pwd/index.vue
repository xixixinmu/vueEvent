<template>
  <div>
    <el-card>
      <div slot="header">
        <span>重置密码</span>
      </div>
      <div class="text item">
        <el-form
          label-width="100px"
          class="labelBox"
          :rules="pwdRules"
          ref="pwdRef"
          :model="pwdForm"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePwd">修改密码</el-button>
            <el-button @click="resetPwd">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { updateUserPwdAPI } from "@/api";
export default {
  name: "user-pwd",
  data() {
    // 新旧密码不能相同
    const samePwd=(rules,value,callback)=>{
      // value就是校验规则所对应输入框值(新密码)
      if(this.pwdForm.old_pwd==value){
        callback(new Error("新密码不能与原密码相同")) 
      }else{
        callback()
      }
    }
    const rePwd=(rules,value,callback)=>{
      if(this.pwdForm.new_pwd===value){
        callback()
      }else{
        callback(new Error("两次输入密码不一致"))
      }
    }
    return {
      pwdRules: {
        old_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
        ],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
          { validator: samePwd, trigger: "blur" },
        ],
        re_pwd: [
          { required: true, message: "请再次确认新密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
          { validator: rePwd, trigger: "blur" },
        ],
      },
      pwdForm: {
        old_pwd: "",
        new_pwd: "",
        re_pwd: "",
      },
    };
  },
  methods: {
    updatePwd() {
      this.$refs.pwdRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await updateUserPwdAPI(this.pwdForm);
          if (res.code == 0) {
            this.$message.success(res.message);
            this.$store.dispatch("initUserInfo");
          } else {
            this.$message.error(res.message);
          }
        } else {
          return false;
        }
      });
    },
    resetPwd() {
      (this.pwdForm.old_pwd = ""),
        (this.pwdForm.new_pwd = ""),
        (this.pwdForm.re_pwd = "");
    },
  },
};
</script>

<style scoped>
.labelBox {
  width: 450px;
}
</style>