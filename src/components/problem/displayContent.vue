<template>
  <div class="displayContent">
    <mu-bottom-nav color='#222222' :value.sync="active">
      <mu-bottom-nav-item :to="`/problems/${$route.params.id}`" :value="0" title="描述" icon="description"></mu-bottom-nav-item>
      <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="1" title="参考答案" icon="question_answer"></mu-bottom-nav-item>
      <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="2" title="提交历史" icon="history"></mu-bottom-nav-item>
      <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="3" title="讨论" icon="insert_comment"></mu-bottom-nav-item>
    </mu-bottom-nav>
    <div style="width: 100%;height: 100%;">
      <div v-show="active===0">
        555
      </div>
      <router-view v-show="active!==0"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'displayContent',
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
      await sleep(2000)
      this.ready = true
    }
  },
  created () {
    // console.log(this.id);
    
    this.init()
  }
}
</script>

<style scoped>
  .displayContent {
    display: flex;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
  .t {
    background-color: #404344;
  }
</style>
