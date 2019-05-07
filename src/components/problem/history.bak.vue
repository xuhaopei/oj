<template>
  <div class="history">
    <mu-data-table :loading="!ready" style='width: 100%;overflow-y: scroll;' :columns="columns" 
      @sort-change="handleSortChange" :data="data.list">
      <template slot-scope="scope">
        <td>{{scope.row.date}}</td>
        <td>
          <span class="accepted table-link" @click="toHistoryDetail(scope.row)" v-if="scope.row.status===1">Accepted</span>
          <span class="unaccepted table-link" @click="toHistoryDetail(scope.row)" v-if="scope.row.status===2">Error</span>
        </td>
        <td>{{scope.row.runtime}}ms</td>
        <td>{{scope.row.memory}}mb</td>
        <td>{{scope.row.language}}</td>
        <td><span class="accept">{{scope.row.accept}}%</span></td>
      </template>
    </mu-data-table>
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
      columns: [
          // { title: '时间', id: 'time', width: 350, },
          { title: '时间', id: 'date', width: 160},
          { title: '状态', id: 'status', },
          { title: '用时', id: 'runtime', },
          { title: '内存', id: 'memory', },
          { title: '语言', id: 'language', },
          // { title: 'Calories', name: 'calories', width: 126, align: 'center', sortable: true },
      ],
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
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
