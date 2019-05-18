<template>
  <div class="quizList main-view center-div">
    <div class="center-item">
      <div style="width: 100%;padding-top: 30px;">
        <el-table
          :data="data.list"
          style="width: 100%">
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <b>{{scope.row.title}}</b>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="分数"
            width="150">
            <template slot-scope="scope">
              <span>{{ scope.row._percentage }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态"
            width="250">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status===0" @click="toQuiz(scope.row)" type="text">进入考试</el-button>
              <el-button v-if="scope.row.status===1" disabled type="text">考试已结束</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-control">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page_num"
          :page-sizes="options.pageSize"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quizList',
  props: {
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
        list: [],
        total: 20,
      },
      params: {
        page_size: 10,
        page_num: 1,
      },
      options: {
        pageSize: [20, 50],
      },
    }
  },
  methods: {
    async init () {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      let temp = []
      let s = true
      for (let i = 0; i < 10; i++) {
        s = !s
        temp.push({
          id: i,
          title: '期末考试',
          time: '60分钟',
          status: s?1:0,
        })
      }
      this.data.list = temp
      this.ready = true
    },
    toQuiz (data) {
      this.$router.push({
        name: 'quiz',
        params: {
          id: `${data.id}`,
        }
      })
    },
    async handleSizeChange(val) {
      this.params.page_size = val
      await this.init()
    },
    async handleCurrentChange(val) {
      this.params.page_num = val
      await this.init()
    },
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
</style>
