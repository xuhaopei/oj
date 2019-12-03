<template>
  <div class="description" id = 'description'>
    <div class='description-main'>
      <div class="description-item">
        <div>
          <h2>输入规范</h2>
        </div>
        <div>
          {{detail.input_format}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输出规范</h2>
        </div>
        <div>
          {{detail.output_format}}
        </div>
      </div>
      <div class="description-item">
        <h2 style='margin-bottom: 0px;'>样例</h2>
        <div class="sample">
          <div v-for="(item, idx) in detail.samples" :key='idx'>
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
  </div>
</template>

<script>
export default {
  name: 'description',
  props: {
    detail: Object,
  },
  components: {
  },
  data () {
    return {
      ready: true,
    }
  },
  methods: {
    changeShow() {
      document.body.onclick = function() {
        document.getElementById('description');
      }
    },
    /**
     * 函数描述：JSON一些数据
     * 作者：许浩培
     * 时间：2019/12/3
     */
    jsonParse() {
      this.detail.description = JSON.parse(this.detail.description);
      this.detail.input_format = JSON.parse(this.detail.input_format);
      this.detail.output_format = JSON.parse(this.detail.output_format);
      this.detail.samples = JSON.parse(this.detail.samples);
    }
  },
  created () {
    this.jsonParse();
  }
}

</script>

<style scoped>
  .description {
    width: 100%;
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
