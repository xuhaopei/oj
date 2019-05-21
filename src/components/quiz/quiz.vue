<template>
  <div class="quiz main-view center-div">
    <div v-if="ready" class="center-item">
      <div >
        <page-btn v-if="refresh.pageBtn" :pages.sync="data.pageArray" :currentPage.sync="currentPage"></page-btn>
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :page-size="1"
          :pager-count="50"
          :total="50">
        </el-pagination> -->
        <el-button @click="test">test</el-button>
      </div>
    </div>
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
      data: {
        list: [],
        total: 20,
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
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)
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
    test () {
      console.log(this.data.pageArray, this.currentPage)
    },
  },

  watch: {
    currentPage: async function (newd, oldd) {
      this.refresh.pageBtn = false
      this.data.pageArray[oldd-1].status = 2
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
