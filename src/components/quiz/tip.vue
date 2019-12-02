<!--
模块说明
功能：考试内容里面的提示模块(重构)
作者：许浩培
完成时间：2019/11/28
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
-->
<template>
<transition name="fade">
  <div class = 'tip' v-if="show"  v-on:click ="show=false" id = 'tip'>
      <h2>温馨提示</h2>
      <ul>
          <li>考试时间</li>
          <li>不能作弊</li>
          <li>不要超过考试时间</li>
          <li>合理安排考试进度，做不了就放弃</li>
          <li>确认后请<span>左击</span>开始考试</li>
      </ul>
  </div>
</transition>
</template>

<script>
export default {
    name: 'tip',
    props: {
    },
    components: {
    },
    data () {
        return {
        ready: true,
        show:true
        }
    },
    methods: {
    
    },
    created () {
    },
    mounted () {
        
    }
}
</script>

<style>
    .tip {
        padding: 10px;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 250px;
        background: rgba(0,0,0,0.01);
    }
    .tip ul li{
        list-style-type: square;
        margin-top:15px; 
    }
    .tip ul li span {
        color:red;
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>