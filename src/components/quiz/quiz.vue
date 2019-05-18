<template>
  <div class="quiz main-view center-div">
    <div class="center-item">
      <h1>ojoojoi</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quiz',
  props: {
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
        list: [],
        total: 20,
      },
      params: {
        page_size: 10,
        page_num: 1,
      },
      options: {
        pageSize: [20, 50],
      },
    }
  },
  methods: {
    async init () {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      let temp = []
      let s = true
      for (let i = 0; i < 10; i++) {
        s = !s
        temp.push({
          id: i,
          title: '期末考试',
          time: '60分钟',
          status: s?1:0,
        })
      }
      this.data.list = temp
      this.ready = true
    },
    async handleSizeChange(val) {
      this.params.page_size = val
      await this.init()
    },
    async handleCurrentChange(val) {
      this.params.page_num = val
      await this.init()
    },
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>

  .bottom-control {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .skeleton-item {
    height: 36px;
    width: 100%;
    margin-bottom: 20px;
  }
</style>
