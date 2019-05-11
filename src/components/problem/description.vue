<template>
  <div class="description">
    <div v-if="ready" class='description-main'>
      <div class="description-item">
        <div>
          <h2 style="margin-bottom: 0px;">{{data.detail.title}}</h2>
          <div class="tag-list">
            <el-button type="primary" plain size="mini" class="tag-item" small 
              v-for="(item, idx) in data.tag" :key='idx' round>
              {{item.tag_name}}
            </el-button>
          </div>
        </div>
        <div>
          {{data.detail.description.insert}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输入规范</h2>
        </div>
        <div>
          {{data.detail.inputFormat.insert}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输出规范</h2>
        </div>
        <div>
          {{data.detail.outputFormat.insert}}
        </div>
      </div>
      <div class="description-item">
        <h2 style='margin-bottom: 0px;'>样例</h2>
        <div class="sample">
          <div v-for="(item, idx) in data.detail.samples" :key='idx'>
            <h5 >输入</h5>
            <div class="res">
              <span>{{item.input}}</span>
            </div>
            <h5 >输出</h5>
            <div class="res">
              <span>{{item.output}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="description-main" v-else>
      <div class="description-nodata-item">
        <div class="skeleton-screen nodata-title"></div>
        <div class="skeleton-screen nodata-context"></div>
        <div class="skeleton-screen nodata-context"></div>
        <div class="skeleton-screen nodata-context-half"></div>
      </div>
      <div class="description-nodata-item">
        <div class="skeleton-screen nodata-title"></div>
        <div class="skeleton-screen nodata-context"></div>
        <div class="skeleton-screen nodata-context"></div>
      </div>
    </div>
  </div>
</template>

<script>
import d from '../../dummyData/description.json'
export default {
  name: 'description',
  props: {
  },
  components: {
  },
  data () {
    return {
      data: {
        detail: null,
        tag: [],
      },
      d: d,
      ready: false,
    }
  },
  methods: {
    async init () {
      
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)
      await Promise.all([
        this.getData(),
      ])
      this.ready = true
    },
    async getData () {
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 0,
          method: 'get',
          url: `/programProblem/${this.$route.params.id}`,
          params: {
          }
        }),
        this.$store.dispatch('n', {
          flag: 1,
          method: 'get',
          url: `/programProblem/tags/${this.$route.params.id}`,
          params: {
          }
        }),
      ])
      if (!this.$store.state.n[0].success) return
      this.data.detail = this.$store.state.n[0].data.programProblem

      if (!this.$store.state.n[1].success) return
      this.data.tag = this.$store.state.n[1].data
      
      // this.data = d.data
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .description {
    overflow-y: scroll;
    height: 100%;
  }
  .description-main {
    /* display: flex; */
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
  }
  .description-main .sample {
    padding: 5px 10px;
    border-left: 2px solid #2d8cf0;
  }
  .tag-list {
    display: flex;
    padding: 10px;
  }
  .tag-item:hover {
    background-color: #ffffff;
  }
  .description-main .sample .res {
    margin: 5px 0;
    padding: 5px;
    background-color: #f4faff;
    width: 100%;
    font-size: 1em;
    color: #495060;
  }
  .description-main .description-nodata-item {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .nodata-title {
    height: 31px;
    width: 120px;
    margin-bottom: 20px;
  }
  .nodata-context {
    height: 21px;
    width: 100%;
    margin-bottom: 20px;
  }
  .nodata-context-half {
    height: 21px;
    width: 50%;
    margin-bottom: 20px;
  }
</style>
