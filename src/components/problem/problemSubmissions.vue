<template>
  <div class="submissionsDetail">
    <h2>in</h2>
  </div>
</template>

<script>
export default {
  name: 'submissionsDetail',
  props: {
    data: Object,
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
          flag: 3,
          method: 'get',
          url: `/code/${this.data.id}`,
          params: {
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
