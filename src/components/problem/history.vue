<template>
  <div class="history">
  <template>
    <div style="overflow-y: scorll;width: 100%;">
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
            <span class="accepted table-link" @click="toHistoryDetail(scope.row)" v-if="scope.row.status===1">Accepted</span>
            <span class="unaccepted table-link" @click="toHistoryDetail(scope.row)" v-if="scope.row.status===2">Error</span>
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
            <span>{{scope.row.language}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
    <mu-pagination style="margin-top: 10px;margin-bottom: 20px;"  v-if="ready" raised circle :total="1000" :current.sync="data.page"></mu-pagination>
  </div>
</template>

<script>
export default {
  name: 'history',
  props: {
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
        list: [],
      },
    }
  },
  methods: {
    async init () {
      
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)
      await this.getData()
      let t = []
      for (let i = 0; i < 10; i++) {
        t.push({
          id: i,
          date: '2019-04-23 10:52',
          runtime: '34',
          memory: '20',
          language: 'c++',
          status: i%2==0?1:2,
        })
      }
      this.data.list = t
      this.ready = true
    },
    async getData () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 2,
          method: 'get',
          url: `/submissions/problem/${this.$route.params.id}`,
          params: {
          }
        }),
      ])
      if (!this.$store.state.n[0].success) return
      this.data.list = this.$store.state.n[2].data
    },
    handleSortChange () {

    },
    toHistoryDetail () {

    },
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
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
    padding-bottom: 0px;
    /* overflow-y: scroll; */
  }
  .accepted {
    color: #009688;
  }
  .unaccepted {
    color: #c62928;
  }
  .table-link:hover {
    cursor: pointer;
  }
  .table-link:active {
    cursor: pointer;
    color: #1a74be;
  }
</style>
