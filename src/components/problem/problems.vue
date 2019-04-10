<template>
  <div class="problems">
    <div class="content">
      <displayContent></displayContent>
    </div>
    <div class="code">
      <codeEditor></codeEditor>
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
import displayContent from './displayContent.vue'
export default {
  name: 'problems',
  props: {
    id: String,
  },
  components: {
    codeEditor,
    displayContent,
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
