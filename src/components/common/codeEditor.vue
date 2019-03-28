<template>
  <div class="nopm fullwh codeEdit">
    <div>

    </div>
    <div>
      <codemirror v-model="code" :options="cmOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'codeEdit',
  props: {
  },
  components: {
    codemirror,
  },
  data () {
    return {
      code: '',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-c++src',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
    }
  },
  methods: {
  },
}
</script>

<style scoped>
</style>
