<template>
  <div v-if="ready" class="completionProblems">
    <!-- <div class="option-item">

    </div> -->
    <div class="option-item-warp">
      <mu-ripple @click="selectOpt(1)" 
        :class="`option-item-i option-item-i-${currentProblem.select==1?'selected':'unselected'}`">
        {{currentProblem.description.opt1}}
      </mu-ripple>
    </div>
    <div class="option-item-warp">
      <mu-ripple @click="selectOpt(2)" 
        :class="`option-item-i option-item-i-${currentProblem.select==2?'selected':'unselected'}`">
        {{currentProblem.description.opt2}}
      </mu-ripple>
    </div>
    <div class="option-item-warp">
      <mu-ripple @click="selectOpt(3)" 
        :class="`option-item-i option-item-i-${currentProblem.select==3?'selected':'unselected'}`">
        {{currentProblem.description.opt3}}
      </mu-ripple>
    </div>
    <div class="option-item-warp">
      <mu-ripple @click="selectOpt(4)" 
        :class="`option-item-i option-item-i-${currentProblem.select==4?'selected':'unselected'}`">
        {{currentProblem.description.opt4}}
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
        select: 0,
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
      this.currentProblem.description = JSON.parse(this.data.list[0].description)
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
    selectOpt (opt) {
      this.currentProblem.select = opt
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
</style>
