<template>
  <div v-if="ready" class="test center-div">
    <codeEditor style="width: 100%;" :codeInfo.sync='data.codeInfo' ></codeEditor>
  </div>
</template>

<script>
import axios from 'axios'

import codeEditor from './common/codeEditor.vue'
export default {
  name: 'test',
  props: {
  },
  components: {
    codeEditor,
    // displayContent,
  },
  data () {
    return {
      data: {
        codeInfo: {
          code: '',
          lang: 'java',
        },
      },
      ready: false,
      
    }
  },
  methods: {
    async init () {
      
      // this.$store.dispatch('n', {
      //   flag: 0,
      //   method: 'get',
      //   url: `/program-problems`,
      //   params: {
      //     page_num: this.params.program.page_num,
      //     page_size: this.params.program.page_size,
      //     difficult: this.params.program.difficult,
      //     query: this.filter.keyword,
      //     tagList: this.params.program.tagList,
      //     uid: this.$_env.testUserInfo.uid,
      //   }
      // })
      // const s = 'https://cdn.eagleoj.com/2019/4/18/712bcfe0-af33-47c2-beff-e11cbf8a52e9.java'
      const s = '/noLogin/readImageFile'
      let d = await axios.get(s)
      console.log('d is ', d.data);
      this.data.codeInfo.code = d.data
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }

      // localhost:8080/noLogin/readImageFile
      // await sleep(1000)
      // https://cdn.eagleoj.com/2019/4/18/712bcfe0-af33-47c2-beff-e11cbf8a52e9.java
      this.ready = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
</style>
