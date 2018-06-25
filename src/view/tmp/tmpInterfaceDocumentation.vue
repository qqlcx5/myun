<template>
  <div>
    <div class="downLoadDocument">
      <span class="tBlue" @click="DLfile" style="cursor: pointer">下载接口说明文档</span>
    </div>
    <div v-html="content" style="margin: 20px 0 0 10px">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        content: '',
        fileUrl: ''
      }
    },
    methods: {
      DLfile() {
        window.location.href = this.fileUrl
      },
      submitErr(message) {
        this.$message.error(message)
      },
      async getHistoryInfo() {
        let url = 'customer/mobileSetting/getInterfaceDoc.do'
        let res = await this.post(url)
        if (res.code == 1) {
          // console.log(res)
          this.content = res.content
          this.fileUrl = res.fileUrl
        } else {
          this.submitErr(res.message)
        }
      },
    },
    created() {
      this.getHistoryInfo()
    }
  }
</script>

<style scoped>

</style>
