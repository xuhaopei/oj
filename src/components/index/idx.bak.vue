<template>
  <div id="t" class="nopm fullwh main">
    <div class="nopm fullwh index">
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        :value='code'
        :options='options'
        :onChange='onChange'
        :editorDidMount="editorDidMount"
      />
    </div>
  </div>
</template>

<script>

import MonacoEditor from 'react-monaco-editor';

export default {
  name: 'index',
  props: {
    msg: String
  },
  components: {
    MonacoEditor
  },
  data () {
    return {
      code: '',
      options: {
        selectOnLineNumbers: true
      }
    }
  },
  methods: {  
    onChange(newValue, e) {
      console.log('onChange', newValue, e);
    },
    
    editorDidMount(editor, monaco) {
      console.log('editorDidMount', editor);
      editor.focus();
    }
  },
}
</script>

<style scoped>
  .main {
    /* width: 100vw;
    height: 100vh; */
    overflow-y: auto;
  }
  .center {
    display: flex;
    width: 500px;
    height: 100px;
  }
  .index {
    display: flex;
    justify-content: center;
  }
</style>
