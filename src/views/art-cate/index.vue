<template>
  <div>
    <el-card>
      <div slot="header" class="header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateList"
          >添加分类</el-button
        >
      </div>
      <el-table style="width: 100%" border stripe :data="cateList">
        <!-- type是table-column内置属性，你告诉他用index，意思就是第一个单元格用索引-->
        <el-table-column
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加文章分类"
      :visible.sync="addVisible"
      width="35%"
      @closed="onAddClosedFn"
    >
      <el-form label-width="80px" :model="addCateForm" ref="addRef">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addCateForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addCateForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmFn"
          >添 加</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateListAPI, createCateListAPI } from "@/api";
export default {
  name: "art-cate",
  data() {
    return {
      cateList: [],
      addVisible: false,
      addCateForm: {
        cate_name: "",
        cate_alias: "",
      },
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "分类名必须是1-10位的非空字符",
            trigger: "blur",
          },
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类别名必须是1-15位的字母数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await getCateListAPI();
      if (res.code !== 0) return this.$message.error(res.message);
      this.cateList = res.data;
    },
    addCateList() {
      this.addVisible = true;
    },
    confirmFn() {
      // 表单预校验
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          // 调用接口传递数据给后台
          const { data: res } = await createCateListAPI(this.addCateForm);
          if (res.code !== 0) return this.$message.error("添加分类失败！");
          this.$message.success("添加分类成功！");
          // 重新请求列表数据
          this.getCateList();
          // 关闭对话框
          this.addVisible = false;
        } else {
          return false;
        }
      });
    },
    onAddClosedFn() {
      this.$refs.addRef.resetFields();
    },
  },
  mounted() {
    this.getCateList();
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>