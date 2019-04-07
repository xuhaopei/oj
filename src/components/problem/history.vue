<template>
  <div class="history center-div">
    999
  </div>
</template>

<script>
export default {
  name: 'history',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(2000)
      this.ready = true
    }
  },
  created () {
    // this.init()
  }
}
</script>

<style scoped>
</style>
