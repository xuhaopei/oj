<template>
  <!-- 使用说明 

    参数:
    info: Object,
    上层组件使用 .sync 修饰符, 当点击提交按钮时, 相关的内容会同步到上层组件

    commitFlag: Number,
    传入的数字, 不关心是什么, 点击提交按钮时会更新该值, 然后上层组件通过监听改变量来执行提交代码操作

    committing: Boolean,
    提交按钮是否显示加载动画, 用于点击提交后的反馈
  -->
  <div v-if="ready" class="objectiveProblem">
    <div class='_objectiveProblemor-option'>
      <div style="display: flex; width: 450px;">
        <mu-select class="_objectiveProblemor-language" label="语言" v-model="cmOptions.mode" full-width>
          <mu-option v-for="(option,index) in optionsLanguage" :key="index" :label="option.label" :value="option.value"></mu-option>
        </mu-select>
        <mu-select class="_objectiveProblemor-language" label="主题颜色" v-model="cmOptions.theme" full-width>
          <mu-option v-for="(option,index) in optionsTheme" :key="index" :label="option.label" :value="option.value"></mu-option>
        </mu-select>
      </div>
      <div style="display: flex;align-items: center;">
        <mu-button color="success" data-mu-loading-size='24' v-loading="committing" @click="commit">提交</mu-button>
      </div>
    </div>
    <div>
      <codemirror v-model="codeInfo.code" :options="cmOptions"></codemirror>
    </div>
    <mu-snackbar :color='snackbar.color' position="bottom-end" :open.sync="snackbar.open">
      {{snackbar.msg}}
      <!-- <mu-button flat slot="action" color="secondary" @click="normal.open = false">Close</mu-button> -->
    </mu-snackbar>
  </div>
</template>

<script>

export default {
  name: 'objectiveProblem',
  props: {
    codeInfo: Object,
    commitFlag: Number,
    committing: Boolean,
  },
  components: {
    codemirror,
  },
  data () {
    return {
      ready: false,
      snackbar: {
        open: false,
        msg: '',
        color: 'success', // error warning  info
      },
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
      switch (this.cmOptions.mode) {
        case 'text/x-c++src': {
          this.codeInfo.lang = 'C++'
          break
        }
        case 'text/x-java': {
          this.codeInfo.lang = 'JAVA8'
          break
        }
        case 'text/x-python': {
          this.codeInfo.lang = 'PYTHON35'
          break
        }
      }
      this.$emit('update:codeInfo', this.codeInfo)
      this.commitFlag += 1
      this.$emit('update:commitFlag', this.commitFlag)
    },
  },
  created () {
    this.ready = true
  }
}
</script>

<style scoped>
  /* .objectiveProblem  {

  } */
</style>
