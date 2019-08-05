<template>
  <div class="completionProblems">
    <div v-for="i in tag" :key="i">
      {{i}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'completionProblems',
  props: {
    tag: Array,
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    async init () {
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)

      // this.ready = true
    },
    handleSortChange () {

    },
    toProblem (data) {
      this.$router.push({
        name: 'problems',
        params: {
          id: `${data.id}`,
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .completionProblems {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
