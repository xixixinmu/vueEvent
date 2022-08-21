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
          <!-- scope对象：{row:行对象} -->
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <!-- 将参数scope.row直接传进函数获取点击的那项 -->
            <el-button type="primary" size="mini" @click="changeCate(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini">删除</el-button>
          </template>
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
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//经验:如果用同一个按钮，想要做状态区分
//1.定义一个标记变量isEdit (true编辑，false新增)，还要定义本次要编辑的数据唯一id值,editId// 2．在点击修改的时候，isEdit改为true,editId保存要修改的数据id
// 3．在点击新增按钮的时候，isEdit改为false, editId置空
// 4．在点击保存按钮时(确定按钮时)，就可以用isEdit变量做区分了

import {
  getCateListAPI,
  createCateListAPI,
  getCateAPI,
  changeCateAPI,
} from "@/api";
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
      isEdit: false,
      editId: "",
    };
  },
  methods: {
    // 获取文章分类信息
    async getCateList() {
      const { data: res } = await getCateListAPI();
      if (res.code !== 0) return this.$message.error(res.message);
      this.cateList = res.data;
    },
    // 点击添加分类按钮
    addCateList() {
      this.isEdit = false; //变回新增状态标记
      this.editId = "";
      this.addVisible = true;
    },
    // 点击确定按钮新增或者修改 标志位为isEdit
    confirmFn() {
      // 表单预校验
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          // 调用接口传递数据给后台
          if (this.isEdit) {
            const { data: res } = await changeCateAPI({
              id: this.editId,
              ...this.addCateForm,
            });
            // id是不在addCateForm的属性 要分开传 这样写就行
            if (res.code !== 0) return this.$message.error("更新分类失败！");
            this.$message.success("更新分类成功！");
            this.isEdit = false;
            this.editId = null;
          } else {
            const { data: res } = await createCateListAPI(this.addCateForm);
            if (res.code !== 0) return this.$message.error("添加分类失败！");
            this.$message.success("添加分类成功！");
          }

          // 重新请求列表数据
          this.getCateList();
          // 关闭对话框
          this.addVisible = false;
        } else {
          return false;
        }
      });
    },
    // 重置按钮 把表单清空
    onAddClosedFn() {
      this.$refs.addRef.resetFields();
    },
    // 修改文章分类名称按钮
    async changeCate(row) {
      this.isEdit = true;
      this.editId = row.id;
      const { data: res } = await getCateAPI(this.editId);
      //   通过id获取cate_name cate_alias后渲染到表单里
      if (res.code == 0) {
        this.addVisible = true;
        //让el-dialog第一次挂载el-form时，先用addForm空字符串初始值绑定到内部，后续用作resetFields重置
        //所以让真实DOM先创建并在内部绑定好"复制"好初始值 
        this.$nextTick(() => {
          this.addCateForm.cate_name = res.data.cate_name;
          this.addCateForm.cate_alias = res.data.cate_alias;
        });
      } else {
        return this.$message.error(res.message);
      }
    },
  },
  //   在挂载时或者created里获取文章分类的信息 调用上面写的方法
  mounted() {
    this.getCateList();
  },
  //小bug: (el-form和el-dialog和数据回显同时用，有bug)
  //复现:第一次打开网页，先点击修改，再点击新增，发现输入框竟然有值
  //原因:点击修改后，关闭对话框的时候，置空失效了
  //具体分析:主人公resetFields有问题
  //线索:Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认slot不会被渲染到 DOM 上
  //线索:vue数据改变(先执行同步所有)再去更新DOM(异步代码)
  //无问题:第一次打开网页，先点击新增按钮-> dialog出现-〉 el-fonrm组件第一次挂载（关联的addForm对象的属性的值为空字符串) el-form组件内绑定了初始值，所以后续调用resetFields的时候，它可以用到空字符串初始值来重置
  //有问题:第一次打开网页，先点击修改按钮-〉虽然dialog变量为true了但是同步代码把addForm对象里赋值了(默认值)->DOMN更新异步-〉 dialog出现-〉 el-form组件第一次挂载(使用addForm内置做回显然后第一次el-fonm内绑定了初始值(有值))->以后做重置，它就用绑定的带值的做重置
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>