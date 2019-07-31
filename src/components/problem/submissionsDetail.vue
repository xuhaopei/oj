<template>
  <div v-if="ready" class="submissionsDetail center-div main-view">
    <div class="center-item">
      <testcase-info :data="data.meta"></testcase-info>
      <div v-if="show.code" class="code-area">
        <codemirror style="height: 1200px;" v-model="data.code" :options="cmOptions"></codemirror>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// 代码风格
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'
// import 'codemirror/mode/javascript/javascript.js'
// 颜色主题
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/base16-light.css'
import testcaseInfo from './testcaseInfo.vue'
export default {
  name: 'submissionsDetail',
  props: {
    id: String,
  },
  components: {
    testcaseInfo,
    codemirror,
  },
  data () {
    return {
      ready: false,
      data: {
        meta: null,
        code: ``
      },
      show: {
        code: false,
      },
      active: 0,
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-java',
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
      },
      tableForLangBackEndToLangShow: {
        'java': 'text/x-java',
        'cpp': 'text/x-c++src',
        'py': 'text/x-python',
      },
    }
  },
  methods: {
    async init () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 9,
          method: 'get',
          url: `/program-sub-detail`,
          params: {
            sub_user_id: this.$route.query.sub_user_id,
            pid: this.$route.params.id,
            sub_id: this.$route.query.sub_id,
            token: this.$route.query.token2,
          },
          headers: {
            authorization: this.$route.query.token,
          },
        }),
      ])
      
      if (!this.$store.state.n[9].success) return
      this.data.meta = this.$store.state.n[9].data
      this.data.meta.sub_detail.judge_detail = JSON.parse(this.data.meta.sub_detail.judge_detail)
      // console.log('this.data.meta', this.data.meta);
      await this.getSourceCode()
      this.ready = true
    },
    async getSourceCode () {
      this.show.code = false
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 8,
          method: 'get',
          url: `/file/code/${this.data.meta.sub_detail.source_code}`,
          stopHandleNetErr: true,
          params: {
          },
          // headers: {
          //   authorization: this.$route.query.token,
          // },
        }),
      ])
      this.cmOptions.mode = this.tableForLangBackEndToLangShow[this.data.meta.sub_detail.source_code.split('.')[1]]
      this.data.code = this.$store.state.n[8].data.code
      this.show.code = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
  .submissionsDetail {
    display: flex;
    height: calc(100vh - 64px);
    
  }
  .submissionsDetail .CodeMirror {
    border: 1px solid #eee;
    min-height: 900px;
    font-size: 20px;
  }
</style>
