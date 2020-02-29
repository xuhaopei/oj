<template>
  <div class="quizList main-view center-div">
    <div class="center-item">
      <div style="width: 100%;padding-top: 30px;">
        <el-table
          v-loading="Loading"
          :data="data1.content"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
            <template slot-scope="scope">
              <b>{{scope.row.title}}</b>
            </template>
          </el-table-column>
          <el-table-column
            prop="score"
            label="分数"
            width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="250">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status=='editing'" @click="toQuiz(scope.row.exam_id)" type="text">进入考试</el-button>
              <el-button v-else disabled type="text">考试已结束</el-button>
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
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data1.total">
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
      data1:[],
      params: {
        page_size: 8,          // 单页试卷数量
        page_num: 1,           // 页码
      },
      options: {
        pageSize: [8],         // pageSize条/页
      },
      Loading:true
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
    toQuiz (exam_id) {
      this.$router.push({
        name: 'quiz',
        params: {
          id: `${exam_id}`,
        }
      })
    },
    async handleSizeChange(val) {
      this.params.page_size = val;
      //await this.init()
    },
    async handleCurrentChange(val) {
      this.params.page_num = val;
     // await this.init();
      this.getData();
    },
    
    /*
     * 函数描述：根据URL参数ID获取试卷
     * 作者：许浩培
     * 时间：2019/11/15
     */
    async getData() {
        this.Loading = true;
        const that = this;
        await Promise.all([
          this.$axios.get(`/exam/page/`+ this.params.page_num + "/" + this.params.page_size,{
          }).then(function(response){
          that.data1 = response.data.data;
          }).catch(function (error) {
            that.openError();
          }),
        ])
        this.Loading = false;
    },
    /*
     * 函数描述：加载数据失败时，弹出提示框
     * 作者：许浩培
     * 时间：2019/11/17
     */
    openError () {
        this.$message.error('加载数据失败');
    }
  },
  created () {
    //this.init();
    this.getData();
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
