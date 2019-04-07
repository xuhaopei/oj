<template>
  <div class="problems">
    <div class="content">
      <div class="bar">
        <!-- <mu-tabs :value.sync="active" inverse style="background-color: #fafafa;" indicator-color='#000000' text-color="#757575" full-width> -->
        <mu-tabs :value.sync="active" color="#2c5477" indicator-color="#000000" full-width>
          <mu-tab>描述</mu-tab>
          <mu-tab>参考方法</mu-tab>
          <mu-tab>提交历史</mu-tab>
          <mu-tab>讨论</mu-tab>
        </mu-tabs>
      </div>
      <div class="display" v-if="active===1">

      </div>
    </div>
    <div class="code">
      <codeEditor></codeEditor>
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
export default {
  name: 'problems',
  props: {
    id: String,
  },
  components: {
    codeEditor,
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
    console.log(this.id);
    
    this.init()
  }
}
</script>

<style scoped>
  .problems {
    display: flex;
    height: calc(100vh - 64px);
  }
  .problems .bar {
    width: 100%;
    color: #8815a1;
  }
  .problems .content {
    width: 50%;
  }
  .problems .code {
    width: 50%;
  }
  .problems .display {
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 48px);
  }
</style>
