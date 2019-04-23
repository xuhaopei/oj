<template>
  <div class="description">
    <div v-if="ready" class='description-main'>
      <div class="description-item">
        <div>
          <h2>描述</h2>
        </div>
        <div v-for="(item, idx) in data.problem.description.ops" :key='idx'>
          {{item.insert}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输入规范</h2>
        </div>
        <div v-for="(item, idx) in data.problem.input_format.ops" :key='idx'>
          {{item.insert}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输出规范</h2>
        </div>
        <div v-for="(item, idx) in data.problem.output_format.ops" :key='idx'>
          {{item.insert}}
        </div>
      </div>
      <div class="description-item">
        <h2 style='margin-bottom: 0px;'>样例</h2>
        <div class="sample">
          <div v-for="(item, idx) in data.problem.samples" :key='idx'>
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
      data: null,
      d: d,
      ready: false,
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(2000)
      await Promise.all([
        this.getData(),
      ])
      this.ready = true
    },
    async getData () {
      this.$route.params.id
      this.data = d.data
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
  }
  .description-main .sample {
    padding: 5px 10px;
    border-left: 2px solid #2d8cf0;
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
