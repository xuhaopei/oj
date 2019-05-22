<template>
  <div class="quiz main-view center-div">
    <div v-if="ready" class="center-item">
      <page-btn v-if="refresh.pageBtn" :pages.sync="data.pageArray" :currentPage.sync="currentPage"></page-btn>

      <!-- <el-button @click="test">test</el-button> -->
      <div v-loading="subReady.quizItem" v-if="data.currentData.type==2">
        <description :detail="data.currentData.data"></description>
      </div>
      <div v-loading="subReady.quizItem" v-else>
        <h1>客观题</h1>
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
import description from './description.vue'
export default {
  name: 'quiz',
  props: {
  },
  components: {
    pageBtn,
    description,
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
        pageData: [],
        currentData: null,
      },
      params: {

      },
      currentPage: 1,
      options: {
      },
      refresh: {
        pageBtn: true,
      },
      subReady: {
        quizItem: false,
      },
      temp: 2,
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
      // 此处应该获取到了题目的数量等信息
      const pageCount = 50
      for (let i = 1; i <= pageCount; i++) {
        this.data.pageArray.push({
          page: i,
          status: 2,
        })
        this.data.pageData.push({
          type: 0,
        })
      }
      this.snack = {
        msg: '加载题目',
        type: '',
        open: true,
        icon: 'info',
        position: 'bottom',
      }
      await this.getDataByPageNum(this.currentPage)
      this.data.pageArray[this.currentPage-1].status=1
      this.snack.open = false
      this.ready = true
    },
    async getDataByPageNum (p) {
      this.subReady.quizItem = true
      // 如果数据未曾获取过才获取数据
      if (this.data.pageData[p-1].type === 0) {
        const d = await this._getDataByPageNum(p)
        this.data.pageData[p-1] = d
      }
      this.data.currentData = this.data.pageData[p-1]
      // await Promise.all([
      //   this.$store.dispatch('n', {
      //     flag: 0,
      //     method: 'post',
      //     url: `/code/user`,
      //     params: {
      //       "examinationId": 0,
      //       "groupId": 0,
      //       "lang": this.data.codeInfo.lang,
      //       "pid": this.$route.params.id,
      //       "sourceCode": this.data.codeInfo.code
      //     }
      //   }),
      // ])
      this.subReady.quizItem = false
    },
    async _getDataByPageNum (p) {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      if (this.temp === 1) {
        this.temp = 2
        return {
          type: 1,
          data: {
            title: 'Design Sprnt为Google的一套产品设计方法，关于该产品设计方法说法正确的是（）',
            options: [
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
            ],
          }
        }
      } else {
        this.temp = 1
        return {
          type: 2,
          data: {
            "ac_times": 0,
            "ce_times": 0,
            "deleted": 0,
            "description": {
              "insert": "二叉树可以用于排序。其原理很简单：对于一个排序二叉树添加新节点时，先与根节点比较，若小则交给左子树继续处理，否则交给右子树。\n当遇到空子树时，则把该节点放入那个位置。 \n比如，10 8 5 7 12 4 的输入顺序，应该建成二叉树如下图所示，其中.表示空白。\n...|-12\n 10-|\n ...|-8-|\n .......|...|-7\n .......|-5-|\n ...........|-4 \n本题目要求：根据已知的数字，建立排序二叉树，并在标准输出中横向打印该二叉树。\n"
            },
            "difficult": 0,
            "gmt_create": 1556269441000,
            "gmt_modified": 1556270421000,
            "input_format": {
              "insert": "输入数据为一行空格分开的N个整数。 N<100，每个数字不超过10000。\n输入数据中没有重复的数字。\n"
            },
            "memory": 128,
            "output_format": {
              "insert": "输出该排序二叉树的横向表示。为了便于评卷程序比对空格的数目，请把空格用句点代替：\n"
            },
            "program_problem_id": 20,
            "rte_times": 0,
            "run_time": 1,
            "samples": [
              {
                "output": "...|-20\n10-|\n...|-5 \n",
                "input": "10 5 20 "
              }
            ],
            "status": 0,
            "submit_times": 0,
            "title": "横向打印二叉树123",
            "tle_times": 0,
            "used_times": 0,
            "wa_times": 0
          }
        }
      }
    },
    async submitPageData (p) {

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
      this.getDataByPageNum(oldd)
      // todo: 与后端同步数据, 改变状态
      this.submitPageData(oldd)

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
