<template>
    <!-- 一级路由规则对象组件的挂载点 -->
    <router-view></router-view>

</template>

<script>
export default {
};
//退出登录，重新登录，只走相关组件代码（异步dom切换，不会导致所有代码重新执行，App.vue不走)
</script>

<style lang="less">
</style>
