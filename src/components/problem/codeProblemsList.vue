<template>
  <div class="codeProblemsList">
    <mu-data-table :loading="!ready" style='width: 100%;' :columns="columns" @sort-change="handleSortChange" :data="data.list">
      <template slot-scope="scope">
        <td>{{scope.row.id}}</td>
        <td>
          <span class="table-link" @click="toProblem(scope.row)">{{scope.row.title}}</span>
        </td>
        <td><span class="accept">{{scope.row.accept}}%</span></td>
      </template>
    </mu-data-table>
    <mu-pagination style="margin-top: 10px;"  v-if="ready" raised circle :total="1000" :current.sync="data.page"></mu-pagination>
    <!-- <div v-else style='width: 100%;'>
      <div v-for="item in data.noneList" :key="item" class="skeleton-screen none">

      </div>
    </div> -->
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
export default {
  name: 'codeProblemsList',
  props: {
    data: Object,
    ready: Boolean,
  },
  components: {
    codeEditor,
  },
  data () {
    return {
      columns: [
          { title: '序号', width: 50, id: 'id' },
          { title: '标题', id: 'title', width: 350, },
          { title: '通过率', id: 'accept', },
          // { title: 'Calories', name: 'calories', width: 126, align: 'center', sortable: true },
      ],
    }
  },
  methods: {
    async init () {
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)

      // this.ready = true
    },
    handleSortChange () {

    },
    toProblem (data) {
      this.$router.push({
        name: 'problems',
        params: {
          id: `${data.id}`,
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .codeProblemsList {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .codeProblemsList .none{
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
  }
  .table-link {
    color: #2196f3;
  }
  .table-link:hover {
    cursor: pointer;
  }
  .table-link:active {
    cursor: pointer;
    color: #1a74be;
  }
  .accept {
    color: #808080;
  }
</style>
