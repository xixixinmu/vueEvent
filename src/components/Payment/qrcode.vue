<template>
    <div>
        <div id="qrcode" ref="qrCodeUrl">
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'qrCode',
  data () {
    return {
      link: '',
      qrcode: {}
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  watch: {
    // 监听url,当url改变时生成二维码(不包括第一次)
    url: {
      handler (newValue) {
        this.link = newValue
        this.$nextTick(() => {
          this.createQRCode()
        })
        // console.log(this.link)
      }
    }
  },
  methods: {
    // 生成二维码
    createQRCode () {
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.link,
        width: 160,
        height: 160,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })
    }
  },
  // 离开页面时销毁二维码
  beforeDestroy () {
    if (this.qrcode) {
      this.qrcode.clear()
    }
    this.$refs.qrCodeUrl.innerHTML = ''
  }
}
</script>

<style scoped>

</style>
