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
    <!-- <div v-else style='width: 100%;'>
      <div v-for="item in data.noneList" :key="item" class="skeleton-screen none"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'codeProblemsList',
  props: {
    data: Object,
    ready: Boolean,
  },
  components: {
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
