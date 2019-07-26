<template>
  <div class="submissionsDetail center-div main-view">
    <div class="center-item">
      <testcase-info :data="data.meta"></testcase-info>
    </div>
  </div>
</template>

<script>
import testcaseInfo from './testcaseInfo.vue'
export default {
  name: 'submissionsDetail',
  props: {
    id: String,
  },
  components: {
    testcaseInfo,
  },
  data () {
    return {
      ready: false,
      data: {
        meta: null,
      },
      active: 0,
    }
  },
  methods: {
    async init () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 9,
          method: 'get',
          url: `/program-sub-detail`,
          params: {
            sub_user_id: this.$route.query.sub_user_id,
            pid: this.$route.params.id,
            sub_id: this.$route.query.sub_id,
            token: this.$route.query.token2,
          },
          headers: {
            authorization: this.$route.query.token,
          },
        }),
      ])
      
      if (!this.$store.state.n[9].success) return
      this.data.meta = this.$store.state.n[9].data
      await this.getSourceCode()

      this.ready = true
    },
    async getSourceCode () {
      // await Promise.all([
      //   this.$store.dispatch('n', {
      //     flag: 8,
      //     method: 'get',
      //     url: `/program-sub-detail`,
      //     params: {
      //       sub_user_id: this.$route.query.sub_user_id,
      //       pid: this.$route.params.id,
      //       sub_id: this.$route.query.sub_id,
      //       token: this.$route.query.token2,
      //     },
      //     headers: {
      //       authorization: this.$route.query.token,
      //     },
      //   }),
      // ])
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .submissionsDetail {
    display: flex;
    height: calc(100vh - 64px);
    
  }
</style>
