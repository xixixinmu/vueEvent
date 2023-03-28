<template>
    <!-- 一级路由规则对象组件的挂载点 -->
<div style="height:100%">
      <router-view></router-view>
      <Loading v-if="$store.state.isLoading"></Loading>
</div>
</template>

<script>
// import loading from './components/Loading/loading.vue'
export default {
  // components: { loading }
}
// 退出登录，重新登录，只走相关组件代码（异步dom切换，不会导致所有代码重新执行，App.vue不走)
</script>

<style lang="less">
</style>
