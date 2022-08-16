<template>
  <div id="app">
    <!-- 一级路由规则对象组件的挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
created(){
  this.$store.dispatch("initUserInfo")
}
};
</script>

<style lang="less">
</style>
