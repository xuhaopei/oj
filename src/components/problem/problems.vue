<template>
  <div class="problems">
    <div class="content">
      <div class="displayContent">
        <mu-bottom-nav color='#222222' :value.sync="active">
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}`" :value="0" title="描述" icon="description"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="1" title="提交历史" icon="history"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="2" title="参考答案" icon="question_answer"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="3" title="讨论" icon="insert_comment"></mu-bottom-nav-item>
        </mu-bottom-nav>
        <div v-show="active===0" style="width: 100%;height: calc(100% - 56px);">
          <description v-show="active===0"></description>
        </div>
        <div v-show="active===1" style="width: 100%;height: calc(100% - 56px);">
          <router-view ></router-view>
        </div>
      </div>
    </div>
    <div class="code">
      <codeEditor></codeEditor>
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
import description from './description.vue'
// import displayContent from './displayContent.vue'
export default {
  name: 'problems',
  props: {
    id: String,
  },
  components: {
    codeEditor,
    description,
    // displayContent,
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
    switch (this.$route.path.split('/')[3]) {
      case undefined: {
        this.active = 0
        break
      }
      case 'history': {
        this.active = 1
        break
      }
      default:
        break
    }
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
  .displayContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
