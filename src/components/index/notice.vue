<template>
  <div class="fullwh notice">
    <ul v-if="ready" class="notice-ul">
      <li class="notice-li" v-for="(item, idx) in data.list" :key="idx">
        <a :href="item.link"><span>{{item.content}}</span></a>
      </li>
    </ul>
    <ul v-else class="notice-ul">
      <li class="notice-li-unready skeleton-screen" v-for="(item, idx) in data.noneList" :key="idx">
        <a :href="item.link"><span>{{item.content}}</span></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
        list: [],
        noneList: [1, 2, 3,]
      }
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)

      for (let i = 0; i<20; i++) {
        this.data.list.push({
          content: '公告新闻',
          link: '',
        })
      }
      this.ready = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .notice {
    overflow-y: auto;
  }
  .notice-ul {
    list-style: none;
  }
  .notice-li {
    padding: 3px;
  }
  .notice-li a {
    color: #0084ff;
    font-size: 150%;
  }
  .notice-li-unready {
    height: 23px;
    width: 100%;
    margin-bottom: 6px;
  }
</style>
