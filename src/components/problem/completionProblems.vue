<template>
  <div v-if="ready" class="completionProblems">
    <!-- <div class="option-item">

    </div> -->
    <div class="option-item-warp">
      <mu-ripple class="option-item-i">
        {{currentProblem.description.opt1}}
      </mu-ripple>
    </div>
  </div>
</template>

<script>
export default {
  name: 'completionProblems',
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
      },
      currentProblem: {
        description: null,
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
      await this.getData()
      this.currentProblem.description = this.data.list[0].description
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
  .completionProblems {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .option-item-warp {
    width: 100%;
    height: 40px;
  }
  .option-item-i {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    background-color: #fff;
    border-radius: 4px;
    color: #2196f3;
    border: 1px solid #2196f3;
  }
</style>
