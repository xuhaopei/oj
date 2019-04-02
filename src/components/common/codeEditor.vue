<template>
  <div v-if="ready" class="codeEdit">
    <div class='option' style="width: 450px;">
      <mu-select class="language" label="语言" v-model="cmOptions.mode" full-width>
        <mu-option v-for="(option,index) in optionsLanguage" :key="index" :label="option.label" :value="option.value"></mu-option>
      </mu-select>
      <mu-select class="language" label="主题颜色" v-model="cmOptions.theme" full-width>
        <mu-option v-for="(option,index) in optionsTheme" :key="index" :label="option.label" :value="option.value"></mu-option>
      </mu-select>
    </div>
    <div>
      <codemirror v-model="code" :options="cmOptions"></codemirror>
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
  },
  created () {
    this.ready = true
    console.log(this.cmOptions);
    
  }
}
</script>

<style scoped>
  .option {
    display: flex;
  }
  .language {
    width: 200px;
    margin-right: 50px;
  }
</style>
