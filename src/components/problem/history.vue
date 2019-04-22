<template>
  <div class="history">
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
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      this.ready = true
    },
    handleSortChange () {

    },
  },
  created () {
    // this.init()
  }
}
</script>

<style scoped>
</style>
