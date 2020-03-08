<template>
  <div class="quizList main-view center-div">
    <div class="center-item">
      <div style="width: 100%;padding-top: 30px;">
        <el-table v-loading="Loading" :data="data.list" style="width: 100%">
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <b>{{ scope.row.title }}</b>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="分数" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="250">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 'published'"
                @click="toQuiz(scope.row.exam_id)"
                type="text"
                >进入考试</el-button
              >
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
          :total="data.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "quizList",
  props: {},
  components: {},
  data() {
    return {
      ready: false,
      data: {
        //显示获取到的试卷数据
        list: [],
        total: 0
      },
      params: {
        page_size: 8, // 单页试卷数量
        page_num: 1 // 页码
      },
      options: {
        pageSize: [8] // pageSize条/页
      },
      Loading: true
    };
  },
  methods: {
    /**
     * 函数描述：打开警告
     * 参数：
     */
    openWarn() {
      this.$alert("请您先登录", "警告", {
        confirmButtonText: "确定"
      });
    },
    /**
     * 函数描述：根据试卷ID进入试卷展示模块
     * 参数：exam_id 试卷ID
     */
    toQuiz(exam_id) {
      let token = localStorage.getItem("token");
      if (token == null) {
        this.openWarn();
        return;
      }
      this.$router.push({
        name: "quiz",
        params: {
          id: `${exam_id}`
        }
      });
    },
    /**
     * 函数描述：剔除试卷状态为"editing"的题目,
     * 参数:data 后台传过来的原始数据
     */
    decorateData(data) {
      for (let oneData of data) {
        if (oneData.status != "editing") {
          this.data.list.push(oneData);
          this.data.total++;
        }
      }
      //window.console.log(this.data.total)
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
      await Promise.all([
        this.$axios
          .get(
            `/exam/page/` + this.params.page_num + "/" + this.params.page_size,
            {}
          )
          .then(response => {
            this.decorateData(response.data.data.content);
          })
          .catch(error => {
            this.openError(error);
          })
      ]);
      this.Loading = false;
    },
    /*
     * 函数描述：加载数据失败时，弹出提示框
     * 作者：许浩培
     * 时间：2019/11/17
     */
    openError() {
      this.$message.error("加载数据失败");
    }
  },
  created() {
    this.getData();
  }
};
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
