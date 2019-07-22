<template>
  <div v-if="ready" class="history">
    <problemSubmissions :params='componentProblemSubmissionsData' v-if="showComponentProblemSubmissions"></problemSubmissions>
    <div style="width: 100%;">
      <el-table
        :data="data.list"
        border
        style="width: 100%">
        <el-table-column
          label="时间"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态">
          <template slot-scope="scope">
            <span :class="`history-item-${historyStatusTable[scope.row.status]} table-link`" @click="toSubmissionsDetail(scope.row)" >{{historyStatusTable[scope.row.status]}}</span>
            <!-- <span class="history-item-accepted table-link" @click="toSubmissionsDetail(scope.row)" v-if="scope.row.status==='AC'">Accepted</span>
            <span class="history-item-unaccepted table-link" @click="toSubmissionsDetail(scope.row)" v-if="scope.row.status===2">Error</span> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="runtime"
          label="用时">
          <template slot-scope="scope">
            <span>{{scope.row.runtime}}ms</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="内存">
          <template slot-scope="scope">
            <span>{{scope.row.memory}}mb</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="语言">
          <template slot-scope="scope">
            <span>{{scope.row.lang}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分数">
          <template slot-scope="scope">
            <span>{{scope.row.score}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-control">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-sizes="options.pageSize"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
      </el-pagination>
    </div>
    <!-- <h3>待讨论1: 这里可以把页面选择放底部</h3>
    <h3>待讨论2: 两个时间用哪些算</h3> -->
  </div>
  <div v-else class="history">
    <div style="height: 100%;width: 100%;">
      <div v-for="item in data.unready" :key='item' class="skeleton-screen skeleton-item"></div>
    </div>
  </div>
</template>

<script>
import problemSubmissions from './problemSubmissions.vue'
export default {
  name: 'history',
  props: {
  },
  components: {
    problemSubmissions,
  },
  data () {
    return {
      showComponentProblemSubmissions: false,
      componentProblemSubmissionsData: null,
      ready: false,
      data: {
        list: [],
        total: null,
        unready: [0, 1, 2, 3, 4, 5],
      },
      historyStatusTable: {
        'AC': 'Accepted',
        'WA': 'WA',
        'CE': 'CE',
      },
      params: {
        pageNum: 1,
        pageSize: 20,
      },
      options: {
        pageNum: [
          {
            label: '20条',
            value: 20,
          },
          {
            label: '50条',
            value: 50,
          },
        ],
        pageSize: [20, 50],
      }
    }
  },
  methods: {
    async init () {
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)
      await this.getData()
      // let t = []
      // for (let i = 0; i < 10; i++) {
      //   t.push({
      //     id: i,
      //     date: '2019-04-23 10:52',
      //     runtime: '34',
      //     memory: '20',
      //     language: 'c++',
      //     status: i%2==0?1:2,
      //   })
      // }
      // this.data.list = t
      this.ready = true
    },
    async getData () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 2,
          method: 'get',
          url: `/program-submissions/problem`,
          params: {
            page_num: this.params.pageNum,
            page_size: this.params.pageSize,
            pid: this.$_env.testUserInfo.submissionPid,
            pid: this.$route.params.id,
            uid: this.$_env.testUserInfo.uid,
          }
        }),
      ])
      if (!this.$store.state.n[2].success) return
      
      this.data.list = this.$store.state.n[2].data.data
      this.data.total = this.$store.state.n[2].data.total
    },
    handleSizeChange (val) {
      this.params.pageSize = val
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    handleSortChange () {

    },
    toSubmissionsDetail (data) {
      let url = `/submissions/detail/${this.$route.params.id}?sub_user_id=${this.$_env.testUserInfo.uid}`
      url += `&sub_id=${data.sub_id}&token=${this.$_env.testUserInfo.token}`
      window.open( url, '_blank')
    },
  },  
  computed: {
    // 
    showSubmission() {
      return this.$store.state.problem.subId
    }
  },
  watch: {
    // 提交试题
    showSubmission: async function () {
      // 保存submissionId，设置problemSubmissions可见
      this.showComponentProblemSubmissions = false
      this.componentProblemSubmissionsData = {
        id: this.$store.state.problem.subId,
      }
      this.$nextTick(function () {
        this.showComponentProblemSubmissions = true
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .history {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    height: 100%;
    padding: 20px;
    padding-bottom: 0px;
    overflow-y: scroll;
  }
  .history-item-WA {
    color: #009688;
  }
  .history-item-AC {
    color: #009688;
  }
  .history-item-CE {
    color: #c62928;
  }
  .history-item-accepted {
    color: #009688;
  }
  .history-item-unaccepted {
    color: #c62928;
  }
  .table-link:hover {
    cursor: pointer;
  }
  .table-link:active {
    cursor: pointer;
    color: #1a74be;
  }
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
    margin-bottom: 10px;
  }
</style>
