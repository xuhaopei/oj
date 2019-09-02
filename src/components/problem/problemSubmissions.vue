<template>
  <div v-if="ready" class="submissionsDetail">
    <div class="info-row">
      <div :class="`info-tag tag-color-${caseResMsgTable[data.result]}`">
        {{caseResMsgTable[data.result]}}
      </div>
      <div class="info-tag tag-color-green">
        <span>{{data.memory}} M</span>
      </div>
      <div class="info-tag tag-color-green">
        <span>{{data.time}} S</span>
      </div>
      <!-- <div class="info-tag tag-color-blue">
        <span @click="showDetail">查看详情</span>
      </div> -->
    </div>
    <div class="test-case-list">
      <el-row v-for="(i, idx) in data.test_cases" :key="idx" class="test-case-item">
        <el-col :span="6">
          <div class="left-info">
            <span>测试点{{idx+1}}</span>
            <div :class="`info-tag tag-color-${caseResMsgTable[i.result]}`">
              {{caseResMsgTable[i.result]}}
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="info-tag tag-color-green">
            <span>{{i.memory}} M</span>
          </div>
          <div class="info-tag tag-color-green">
            <span>{{i.time}} S</span>
          </div>
          <div class="right-info">
            <span>{{i.error_message}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submissionsDetail',
  props: {
    params: Object,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
      },
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
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 3,
          method: 'get',
          url: `/code/${this.params.id}`,
          params: {
          }
        }),
      ])
      this.data = this.$store.state.n[3].data.response
      this.ready = true
    },
    showDetail () {
      let url = `/submissions/detail/${this.$route.params.id}?sub_user_id=${this.$_env.testUserInfo.uid}`
      url += `&sub_id=${data.sub_id}&token=${this.$_env.testUserInfo.uid}`
      window.open( url, '_blank')
    },
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .submissionsDetail {
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
    background: rgb(255, 205, 86) none repeat scroll 0% 0%;
    border-color: rgb(255, 205, 86);
    color: rgb(255, 255, 255);
  }
  .tag-color-WA {
    background: #19be6b none repeat scroll 0% 0%;
    border-color: #19be6b;
    color: rgb(255, 255, 255);
  }
  .tag-color-AC {
    background: #19be6b none repeat scroll 0% 0%;
    border-color: #19be6b;
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
</style>
