<template>
  <div class="allProblems main-view center-div">
    848
  </div>
</template>

<script>
export default {
  name: 'allProblems',
  props: {
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
      }
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
    this.init()
  }
}
</script>

<style scoped>
  .allProblems {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
</style>
