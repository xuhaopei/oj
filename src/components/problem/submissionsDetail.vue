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
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
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
