<template>
  <div v-if="ready" class="testcaseInfo">
    <div class="info-row">
      <div :class="`info-tag tag-color-${caseResMsgTable[data.sub_detail.judge_detail.result]}`">
        {{caseResMsgTable[data.sub_detail.judge_detail.result]}}
      </div>
      <!-- <div class="info-tag tag-color-green">
        <span>{{data.memory}} M</span>
      </div>
      <div class="info-tag tag-color-green">
        <span>{{data.time}} S</span>
      </div> -->
    </div>
    <div class="test-case-list">
      <div v-for="(i, idx) in data.test_cases" :key="idx" class="test-case-item">
        <el-row >
          <el-col :span="6">
            <div class="left-info">
              <span>测试点{{idx+1}}</span>
              <div :class="`info-tag tag-color-${caseResMsgTable[data.sub_detail.judge_detail.test_cases[idx].result]}`">
                {{caseResMsgTable[data.sub_detail.judge_detail.test_cases[idx].result]}}
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div v-show="data.sub_detail.judge_detail.result!=='CE'" class="info-tag tag-color-green">
              <span >{{data.sub_detail.judge_detail.test_cases[idx].memory}} M</span>
            </div>
            <div v-show="data.sub_detail.judge_detail.result!=='CE'" class="info-tag tag-color-green">
              <span>{{data.sub_detail.judge_detail.test_cases[idx].time}} S</span>
            </div>
            <div class="right-info">
              <span>{{i.error_message}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="io-info">
          <el-col :span="6">
            <span>预期输入：{{i.stdin}}</span>
          </el-col>
          <el-col :span="18">
            <span>预期输出：{{i.stdout}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'testcaseInfo',
  props: {
    data: Object,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      active: 0,
      caseResMsgTable: {
        'AC': 'AC',
        'CE': 'CE',
        'WA': 'WA',
      },
    }
  },
  methods: {
    async init () {
      this.ready = true
    },
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .testcaseInfo {
    width: 100%;
    padding: 20px;
  }
  .info-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .info-tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border: 1px solid #e9eaec;
        border-top-color: rgb(233, 234, 236);
        border-top-style: solid;
        border-top-width: 1px;
        border-right-color: rgb(233, 234, 236);
        border-right-style: solid;
        border-right-width: 1px;
        border-bottom-color: rgb(233, 234, 236);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-left-color: rgb(233, 234, 236);
        border-left-style: solid;
        border-left-width: 1px;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
  }
  .tag-color-yellow {
    background: rgb(255, 205, 86) none repeat scroll 0% 0%;
    border-color: rgb(255, 205, 86);
    color: rgb(255, 255, 255);
  }
  .tag-color-green {
    background: #19be6b none repeat scroll 0% 0%;
    border-color: #19be6b;
    color: rgb(255, 255, 255);
  }
  .tag-color-CE {
    background: #c62928;
    border-color: #c62928;
    color: rgb(255, 255, 255);
  }
  .tag-color-WA {
    background: #f67c09;
    border-color: #f67c09;
    color: rgb(255, 255, 255);
  }
  .tag-color-AC {
    background: #009688;
    border-color: #009688;
    color: rgb(255, 255, 255);
  }
  .tag-color-blue {
    background: #6aade4 none repeat scroll 0% 0%;
    border-color: #6aade4;
    color: rgb(255, 255, 255);
  }
  /* .test-case-list {

  } */
  .test-case-item {
    background-color: #d5efe9;
    padding: 20px;
    margin-bottom: 10px;
  }
  .test-case-item .left-info{
    display: flex;
    align-items: center;
  }
  .test-case-item .left-info span{
    margin-right: 10px;
    font-size: 130%;
  }
  .test-case-item .right-info span{
    font-size: 130%;
  }
  .test-case-item .io-info{
    margin-top: 10px;
  }
  .test-case-item .io-info span{
    font-size: 130%;
  }
</style>
