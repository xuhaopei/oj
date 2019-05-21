<template>
  <ul class="pageBtnWrap">
    <li @click="clickPage(i)" v-for="(i, idx) in pages" :key="idx" :class="`pageBtnLi status${i.status}`">
      {{i.page}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pageBtn',
  props: {
    pages: Array,
    currentPage: Number,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      data: {
      },
      params: {
      },
      options: {
      },
    }
  },
  methods: {
    async init () {
      this.ready = true
    },
    clickPage (data) {
      this.$emit('update:currentPage', data.page)
    },
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .pageBtnWrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .pageBtnLi {
    width: 32px;
    height: 32px;
    list-style: none;
    margin: 3px;
    font-size: 15px;
    min-width: 35.5px;
    line-height: 32px;
    box-sizing: border-box;
    text-align: center;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
  }
  .pageBtnLi:hover {
    cursor: pointer;
  }
  /**
    1 当前激活
    2 非当前
    3 已完成 
  */
  .status1 {
    background-color: #409eff;
  }
  .status1:active {
    background-color: rgb(140, 192, 245);
  }
  .status2 {
    background-color: #f4f4f5;
  }
  .status2:active {
    background-color: #b4b4b6;
  }
  .status3 {
    background-color: #67c23a;
  }
  .status3:active {
    background-color: #59923d;
  }
</style>
