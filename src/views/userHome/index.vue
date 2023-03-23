<template>
    <el-container class="main-container">
      <!-- 头部区域 -->
      <el-header>
        <img src="@/assets/logo1.png" style="width: 200px; height: 100%;" alt="" />
        <el-menu
          class="el-menu-top"
          mode="horizontal"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <img :src="$store.state.userInfo.user_pic" alt="" class="avatar" />
              <span>个人中心</span>
            </template>
            <el-menu-item index="1-1"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="1-2"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="1-3"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu> -->
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
            <img :src="user_pic" alt="" v-if="user_pic" />
            <img src="@/assets/logo.png" v-else />
            <span>欢迎 {{ nickname || username }}</span>
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
            @open="handleOpen"
            @close="handleClose"
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
          <el-footer>昊目智能网站</el-footer>
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
  name: 'userHome',
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
    ...mapMutations(['updateToken', 'updateUserInfo']),
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
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出登录'
          })
        })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setMenuListFn () {
      this.menus = [
        {
          icon: 'el-icon-s-cooperation',
          indexPath: '/userAddDelivery',
          title: '添加快件'
        },
        {
          icon: 'el-icon-s-cooperation',
          indexPath: '/user-avatar',
          title: '管理快件'
          // children: [
          //   {
          //     icon: 'el-icon-camera',
          //     indexPath: '/user-avatar',
          //     title: '操作快件'
          //   }
          // ]
        }
      ]
    }
  }
}
</script>

  <style lang="less" scoped>
  .main-container {
    height: 100%;
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
