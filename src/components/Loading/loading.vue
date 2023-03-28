<template>
  <div class="loading">
    <i class="el-icon-loading" style="font-size:30px"></i>
    <span style="font-size:20px">加载中，请稍后...</span>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Loading',
  data () {
    return {}
  },
  props: {},
  components: {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.loading {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
}
</style>
