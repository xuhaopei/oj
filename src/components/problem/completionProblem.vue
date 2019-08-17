<template>
  <div v-if="ready" class="completionProblem center-div">
    <div class="center-item">
      <div class="processBar">

      </div>
      <div>
        <div class="promblem">

        </div>
        <div class="answerSheet">

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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .option-item-warp {
    width: 100%;
    height: 60px;
    padding: 10px;
  }
  .option-item-i {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    border-radius: 4px;
  }
  .option-item-i-selected {
    background-color: #fff;
    color: #000000;
    border: 1px solid #000000;
    background-color: #d8d5d5;
  }
  .option-item-i-unselected {
    background-color: #fff;
    color: #0a85e9;
    border: 1px solid #0a85e9;
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
</style>
