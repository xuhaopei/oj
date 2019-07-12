<template>
  <div v-if="ready" class="testcase">
    <div class="op">
      <mu-text-field class="text-input" v-model="input" label="输入" label-float ></mu-text-field><br/>
      <mu-text-field class="text-input" v-model="output" label="输出" label-float ></mu-text-field><br/>
      <mu-button class="text-input"  @click="addTestCase" color="primary">添加测试用例</mu-button>
      <mu-button  @click="deleteAllTestCase" color="secondary">清空测试用例</mu-button>
    </div>
    <div style="width: 100%;">
      <el-table
        :data="data.list"
        border
        style="width: 100%">
        <el-table-column
          label="输入">
          <template slot-scope="scope">
            <span>{{scope.row.input}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="输出">
          <template slot-scope="scope">
            <span>{{scope.row.output}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template slot-scope="scope">
            <mu-button color='secondary' @click="deleteTestCase(scope.row)">
              删除
            </mu-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'testcase',
  props: {
  },
  components: {
  },
  data () {
    return {
      input: '',
      output: '',
      testCaseId: 0,
      showComponentProblemSubmissions: false,
      componentProblemSubmissionsData: null,
      ready: false,
      data: {
        list: [],
        total: null,
        unready: [0, 1, 2, 3, 4, 5],
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
      this.data.list = this.$store.state.problem.testcase
      this.ready = true
    },
    handleSizeChange (val) {
      this.params.pageSize = val
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    handleSortChange () {

    },
    addTestCase () {
      if (this.output === '') return
      this.data.list.push({
        id: this.testCaseId ++,
        input: this.input,
        output: this.output,
      })
      this.input = this.output = ''
      this.$store.commit(this.$types.PROBLEM.SET_TEST_CASE, this.data.list)
    },
    deleteTestCase (data) {
      let t = []
      for (const i of this.data.list) {
        if (i.id == data.id) continue
        t.push(i)
      }
      this.data.list = t
      this.$store.commit(this.$types.PROBLEM.SET_TEST_CASE, this.data.list)
    },
    deleteAllTestCase () {
      this.data.list = []
      this.$store.commit(this.$types.PROBLEM.SET_TEST_CASE, this.data.list)
    }
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
  .testcase {
    /* justify-content: space-between; */
    height: 100%;
    padding: 30px;
    padding-bottom: 0px;
    overflow-y: scroll;
  }
  .testcase .op {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .testcase .op .text-input{
    margin-right: 25px;
  }
  .skeleton-item {
    height: 36px;
    width: 100%;
    margin-bottom: 10px;
  }
</style>
