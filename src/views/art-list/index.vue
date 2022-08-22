<template>
  <div>
    <!-- 本身的页面卡片 -->
    <el-card>
      <div slot="header">
        <span>文章列表</span>
      </div>
      <div>
        <el-form inline :model="articleForm">
          <el-form-item label="文章分类" style="margin-right: 25px">
            <el-select
              v-model="articleForm.atrClass"
              placeholder="请选择分类"
              @click="getCateData"
            >
              <el-option
                :label="obj.cate_name"
                :value="obj.cate_id"
                v-for="obj in cateFrom"
                :key="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select
              v-model="articleForm.publishState"
              placeholder="请选择状态"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">筛选</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="showPubDialogFn"
              >发表文章</el-button
            >
          </el-form-item>
          <el-table :data="artList" style="width: 100%" border stripe>
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="分类" prop="cate_name"></el-table-column>
            <el-table-column label="发表时间" prop="pub_date"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-card>
    <!-- 写文章弹出来的对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <!-- 发布文章的对话框 -->
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              :label="obj.cate_name"
              :value="obj.id"
              v-for="obj in cateFrom"
              :key="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            @blur="contentChangeFn"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/cover.jpg" class="cover-img" ref="imgRef" />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="changeCover"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="selCover">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCateListAPI, addArticleAPI, getArticleListAPI } from "@/api";
import defaultImg from "@/assets/cover.jpg";
export default {
  name: "art-list",
  data() {
    return {
      articleForm: {
        atrClass: "",
        publishState: "",
      },
      pubDialogVisible: false,
      pubForm: {
        // 表单的数据对象
        title: "", //文章标题
        cate_id: "", //文章分类id
        content: "", //文章内容
        cover_img: "", //文章封面
        state: "", //文章状态 草稿或已发布
      },
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
        content: [
          //content对应quill-editor富文本编辑器，它不是el提供表单标签
          // quill-editor2个事件都没有，所以你输入内容也不会自动走校验//解决:
          //自己来给quill-editor绑定change事件(在文档里查到的它支持change事件内容改变事件)
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        cover_img: [
          { required: true, message: "请选择文章封面", trigger: "blur" },
        ],
      },
      cateFrom: [],
      artList: [], // 文章的列表数据
      total: 0, // 总数据条数
      q: {
        pagenum: 1, //默认拿第一页的数据
        pagesize: 2, //当前页需要几条数据
        cate_id: "", //分类id
        state: "", //状态
      },
    };
  },
  methods: {
    // 对话框关闭前的回调
    async handleClose(done) {
      // done的作用:调用就会关闭对话框
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm(
        "此操作将导致文章信息丢失, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //$confirm内部虽然是一个确认提示框，但是它借用了Promise语法来管理，点击确定它的状态为兑现成功状态返回'confirm'，
      //如果用户点击了取消按钮，此Promise对象状态为拒绝状态，返回'cancel'字符串
      //因为await只能捕获成功的结果，用catch可以把cancel字符串变成成功的结果 就被捕获到了
      //因为catch把所有非Promise的值返回为成功，（对↑的补充）

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === "cancel") return;
      // 确认关闭
      done();
    },
    showPubDialogFn() {
      this.pubDialogVisible = true;
    },
    // 获取文章分类数据
    async getCateData() {
      const { data: res } = await getCateListAPI();
      this.cateFrom = res.data;
    },
    selCover() {
      this.$refs.iptFileRef.click();
    },
    changeCover(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.pubForm.cover_img = null;
        this.$refs.imgRef.setAttribute("src", defaultImg);
      } else {
        this.pubForm.cover_img = files[0];
        const url = URL.createObjectURL(files[0]);
        this.$refs.imgRef.setAttribute("src", url);
      }
      this.$refs.pubFormRef.validateField("cover_img");
    },
    // 发布或存为草稿
    pubArticleFn(str) {
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          this.pubForm.state = str;
          const fd = new FormData(); //准备一个表单数据对象的容器，FormData类是HTML5新出的专门为了装文件内容的一个容器
          // fd.append("参数名"，值)
          fd.append("title", this.pubForm.title);
          fd.append("cate_id", this.pubForm.cate_id);
          fd.append("content", this.pubForm.content);
          fd.append("cover_img", this.pubForm.cover_img);
          fd.append("state", this.pubForm.state);
          const { data: res } = await addArticleAPI(fd);
          console.log(res);
          if (res.code !== 0) return this.$message.error("发布文章失败！");
          this.$message.success("发布文章成功！");
          this.pubDialogVisible=false
          // 关闭对话框
          this.initArtListFn();
          // 发布后重新获取文章数据
        } else return false;
      });
    },
    //富文本编辑器内容改变触发此事件方法
    contentChangeFn() {
      this.$refs.pubFormRef.validateField("content");
    },
    // 新增文章的对话框关闭后清空表单
    dialogCloseFn() {
      this.$refs.pubFormRef.resetFields();
      // 手动给封面标签清空
      this.$refs.imgRef.setAttribute("src", defaultImg);
    },
    // 初始化文章列表
    async initArtListFn() {
      const { data: res } = await getArticleListAPI(this.q);
      if (res.code !== 0) return this.$message.error("获取文章列表失败!");
      this.artList = res.data;
      this.total = res.total;
    },
  },
  created() {
    this.getCateData();
    this.initArtListFn();
  },
};
</script>

<style lang="less" scoped>
// scoped原理: webpack打包的时候，会给组件标签上添加相同data-v-hash值，
// 然后也会给所有选择器后面加上一个[data-v-hash]值的属性选择器
//<标签data-v-390246 class="my_a"></标签>
//选择器会变成.my_a[data-v-390246]

// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
//重要注意事项: scoped只会给当前组件所有原生标签添加data-v-hash值属性，还会给组件标签内根标签添加data-v-hash值性,组件内的标签不会添加
// 里面的没被添加v-data-hash就不会起作用

::v-deep .ql-editor {
  //最小高度:标签本身的高度靠内容撑开，但是无内容没有300高度，标签会设置最小高度为300pX
  //如果内容大于300px,,标签高度也会随着撑开(比300px大) 4rem,4rem
  //直接给height:那么无论容器内的内容有多少，超出300高度的内容会溢出到外面而不是撑开此容器

  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>