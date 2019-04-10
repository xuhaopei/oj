<template>
  <div v-if="ready" class="codeEdit">
    <div class='_codeEditor-option'>
      <div style="display: flex; width: 450px;">
        <mu-select class="_codeEditor-language" label="语言" v-model="cmOptions.mode" full-width>
          <mu-option v-for="(option,index) in optionsLanguage" :key="index" :label="option.label" :value="option.value"></mu-option>
        </mu-select>
        <mu-select class="_codeEditor-language" label="主题颜色" v-model="cmOptions.theme" full-width>
          <mu-option v-for="(option,index) in optionsTheme" :key="index" :label="option.label" :value="option.value"></mu-option>
        </mu-select>
      </div>
      <div style="display: flex;align-items: center;">
        <mu-button color="success" data-mu-loading-size='24' v-loading="committing" @click="commit">提交</mu-button>
      </div>
    </div>
    <div>
      <codemirror v-model="code" :options="cmOptions"></codemirror>
    </div>
    <mu-snackbar :color='snackbar.color' position="bottom-end" :open.sync="snackbar.open">
      {{snackbar.msg}}
      <!-- <mu-button flat slot="action" color="secondary" @click="normal.open = false">Close</mu-button> -->
    </mu-snackbar>
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

export default {
  name: 'codeEdit',
  props: {
  },
  components: {
    codemirror,
  },
  data () {
    return {
      ready: false,
      code: '',
      snackbar: {
        open: false,
        msg: '',
        color: 'success', // error warning  info
      },
      committing: false,
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-c++src',
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
      },
      optionsLanguage: [
        {
          label: 'C++',
          value: 'text/x-c++src',
        },
        {
          label: 'Java',
          value: 'text/x-java',
        },
        {
          label: 'Python',
          value: 'text/x-python',
        },
      ],
      optionsTheme: [
        {
          label: '默认',
          value: 'base16-light',
        },
        {
          label: '暗色',
          value: 'monokai',
        },
      ],
    }
  },
  methods: {
    async commit () {
      this.committing = true
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      this.committing = false
      // this.snackbar = { ...this.snackbar, ...{

      // }}
      this.snackbar = {
        open: true,
        msg: '测试通过',
        color: 'success'
      }
      setTimeout(() => {
        this.snackbar.open = false;
      }, 1500);
    }
  },
  created () {
    this.ready = true
  }
}
</script>

<style>
  .codeEdit ._codeEditor-option {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .codeEdit ._codeEditor-language {
    width: 200px;
    margin-right: 50px;
  }
  /* .codeEdit ._slider {
    width: 200px;
    margin-right: 50px;
  } */

  .CodeMirror {
    border: 1px solid #eee;
    height: calc(100vh - 200px);
    font-size: 20px;
  }
</style>
