<template>
  <div class="quiz main-view center-div">
    <div v-if="ready" class="center-item">
      <page-btn v-if="refresh.pageBtn" :pages.sync="data.pageArray" :currentPage.sync="currentPage"></page-btn>
      <!-- <el-button @click="test">test</el-button> -->
      <div>

      </div>
    </div>
  <mu-snackbar style="margin: 8px 0;" snack.position="snack.postition" :open.sync="snack.open" :color='snack.type'>
    <mu-icon left :value="snack.icon"></mu-icon>
    {{snack.msg}}
  </mu-snackbar>
  </div>
</template>

<script>
import pageBtn from './pageBtn.vue'
export default {
  name: 'quiz',
  props: {
  },
  components: {
    pageBtn,
  },
  data () {
    return {
      ready: false,
      snack: {
        msg: '',
        type: '',
        open: false,
        icon: '',
        position: 'bottom',
      },
      data: {
        list: [],
        pageArray: [],
      },
      params: {

      },
      currentPage: 1,
      options: {
      },
      refresh: {
        pageBtn: true,
      }
    }
  },
  methods: {
    async init () {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      this.snack = {
        msg: '获取题目元数据中',
        type: '',
        open: true,
        icon: 'info',
        position: 'bottom',
      }
      await sleep(1000)
      this.snack = {
        msg: '加载题目',
        type: '',
        open: true,
        icon: 'info',
        position: 'bottom',
      }
      await sleep(1000)
      this.snack.open = false
      const pageCount = 50;
      for (let i = 1; i <= pageCount; i++) {
        this.data.pageArray.push({
          page: i,
          status: 2,
        })
      }
      this.data.pageArray[this.currentPage-1].status=1
      this.ready = true
    },
    async getData () {

    },
    test () {
      console.log(this.data.pageArray, this.currentPage)
    },
  },

  watch: {
    currentPage: async function (newd, oldd) {
      this.refresh.pageBtn = false
      this.data.pageArray[oldd-1].status = 2
      // todo: 获取题目数据, 改变状态
      // todo: 与后端同步数据, 改变状态

      this.data.pageArray[newd-1].status = 1
      this.$nextTick(function () {
        this.refresh.pageBtn = true
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>

  .bottom-control {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .skeleton-item {
    height: 36px;
    width: 100%;
    margin-bottom: 20px;
  }
  .pagination ul{
    display: flex;
    flex-wrap: wrap;
  }
</style>
