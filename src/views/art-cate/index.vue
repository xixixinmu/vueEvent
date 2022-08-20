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
    >
      <span>这是一段信息</span>
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
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await getCateListAPI();
      console.log(res.data);
      if (res.code !== 0) return this.$message.error(res.message);
      this.cateList = res.data;
    },
     addCateList() {
      this.addVisible = true;
    },
    async confirmFn(){
      const { data: res } = await createCateListAPI(this.cateList);
      console.log(res);
      this.addVisible = false
    }
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