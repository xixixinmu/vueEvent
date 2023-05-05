<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="webTitle">无面单快递查找</div>
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="2" @click="logoutFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->

      <!-- 侧边栏用户信息区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <span>欢迎 {{ $store.state.username }}</span>
        </div>
        <!-- 侧边栏导航菜单 -->

        <!--
             default-active:当前激活菜单的index (el-submenu/el-menu-item的index值)，对应菜单就有激活样式@open: sub-menu展开的回调
             @close: sub-menu关闭的回调
             active-text-color:哪项index的值和default-active一致，就会被设置动态文字颜色
         -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
        <!-- 加上router属性 当你点击某行菜单时，以index作为路由切换 -->
          <template v-for="item in menus">
            <el-menu-item
              v-if="!item.children"
              :index="item.indexPath"
              :key="item.indexPath"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="child in item.children">
                <el-menu-item :key="child.title" :index="child.indexPath">
                  <i :class="child.icon"></i>
                  <span>{{ child.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>无面单快递查找</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
// 经验:在组件标签上绑定的所有事件(包括原生事件的名字click,input等等)//都是自定义事件，都需要组件内$emit来触发才行
// 万一组件内不支持这个原生事件名字
// 解决:@事件名.native="methods里方法名"
// .native给组件内根标签，绑定这个原生的事件
export default {
  name: 'LayoutPage',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
    // getters要映射到computed里
  },
  created () {
    this.setMenuListFn()
  },
  methods: {
    ...mapMutations(['updateToken', 'updateIsAdmin', 'updateUsername']),
    logoutFn () {
      // 退出登录的逻辑：增加确认提示，去除token，强制跳转
      this.$confirm('是否退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已退出登录'
          })
          this.$store.commit('updateToken', '')
          this.$store.commit('updateIsAdmin', '')
          this.$store.commit('updateUsername', '')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出登录'
          })
        })
    },
    setMenuListFn () {
      const isAdmin = JSON.parse(localStorage.getItem('vuex')).isAdmin
      if (isAdmin === 1) {
        this.menus = [
          {
            icon: 'el-icon-folder-add',
            title: '添加快件',
            indexPath: '1',
            children: [{
              icon: 'el-icon-edit',
              indexPath: '/addDelivery',
              title: '单个添加'
            }, {
              icon: 'el-icon-menu',
              indexPath: '/batchImport',
              title: '批量添加'
            }]
          },
          {
            icon: 'el-icon-s-cooperation',
            indexPath: '/user-avatar',
            title: '管理快件'
          },
          {
            icon: 'el-icon-user',
            indexPath: '/personalCenter',
            title: '个人中心'
          }
        ]
      } else {
        this.menus = [
          {
            icon: 'el-icon-folder-add',
            title: '添加快件',
            indexPath: '1',
            children: [{
              icon: 'el-icon-edit',
              indexPath: '/addDelivery',
              title: '单个添加'
            }, {
              icon: 'el-icon-menu',
              indexPath: '/batchImport',
              title: '批量添加'
            }]
          },
          {
            icon: 'el-icon-s-cooperation',
            indexPath: '/user-avatar',
            title: '管理快件'
          },
          {
            icon: 'el-icon-s-cooperation',
            indexPath: '/statistics',
            title: '统计功能'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .webTitle{
    font-family: fangsong;
    color: white;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    user-select: none;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 15px;
      object-fit: cover;
    }
    span {
      color: white;
      font-size: 12px;
    }
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
</style>
