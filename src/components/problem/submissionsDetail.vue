<template>
  <div class="submissionsDetail">
    <h2>iiiiiiii</h2>
  </div>
</template>

<script>
export default {
  name: 'submissionsDetail',
  props: {
    id: String,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
      },
      active: 0,
    }
  },
  methods: {
    async init () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 1,
          method: 'get',
          url: `/program-sub-detail`,
          params: {
            sub_user_id: this.$route.query.sub_user_id,
            pid: this.$route.params.id,
            sub_id: this.$route.query.sub_id,
            token: this.$route.query.token,
          }
        }),
      ])
      this.ready = true
    },
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
