<template>
  <div v-if="ready" class="completionProblem main-view center-div">
    <div class="center-item">
      <div class="processBar">

      </div>
      <div class="main-display">
        <div class="promblem">

        </div>
        <div class="panel">
          <div class="panel-heading">
            <div class="panel-title">
              答题卡
              <span class="color-primary mls js-done-number">0</span>
              <span class="color-gray">
                /
                <span class="font-sm js-total-number">
                    10
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'completionProblem',
  props: {
    tag: Array,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      params: {
        page: 1,
        pageSize: 20,
      },
      data: {
        list: [],
        total: 0,
        save: {},
      },
      currentProblem: {
        description: null,
        idx: 0,
        selected: 0,
      },
    }
  },
  watch: {
    tag () {
      this.getData()
    },
  },
  methods: {
    async init () {
      // await this.getData()
      // this.currentProblem.idx = 0
      // this.currentProblem.description = JSON.parse(this.data.list[this.currentProblem.idx].description)
      this.ready = true
    },
    async getData () {
      const tempTag = this.tag.length===0?null:this.tag.join(',')
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 20,
          method: 'get',
          url: `/object-problems`,
          params: {
            page_num: this.params.page,
            page_size: this.params.pageSize,
            type: 0,
            tag_list: tempTag,
          }
        }),
      ])
      this.data.list = this.$store.state.n[20].data.data
      this.data.total = this.$store.state.n[20].data.total
    },
    handleSortChange () {

    },
    changePage (p) {
      // 保存当前题目信息
      this.data.save[this.currentProblem.idx] = {
        selected: this.currentProblem.selected
      }
      // 更改题目信息
      this.currentProblem.idx = p-1
      this.currentProblem.description = JSON.parse(this.data.list[this.currentProblem.idx].description)
      if (this.data.save[this.currentProblem.idx] === undefined) {
        this.currentProblem.selected = 0
      } else {
        this.currentProblem.selected = this.data.save[this.currentProblem.idx].selected
      }
    },
    selectOpt (opt) {
      this.currentProblem.selected = opt
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
  },
}
</script>

<style scoped>
  .completionProblem {
  }
  .main-display {
    display: flex;
  }
  .promblem {
    width: 900px;
    height: 100px;
  }
  .panel {
    width: calc(100% - 900px);
    height: 100px;
  }
  .pagination {
    clear: both;
  }
  .pagination-item {
    list-style: none;
    float:left;
    height: 48px;
    width: 48px;
    color: #0a85e9;
    border: 1px solid #0a85e9;
    text-align: center;
  }
  .panel {

  }
  .panel-header {
    border-color: #e6e6e6;
    box-shadow: none;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;
  }
</style>
