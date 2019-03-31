<template>
  <div class="nopm fullwh main">
    <div class="nopm fullwh index">
      <div style="width: 1000px;">

        <code-editor></code-editor>
      </div>
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
export default {
  name: 'index',
  props: {
  },
  components: {
    codeEditor,
  },
  data () {
    return {
    }
  },
  methods: {
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
