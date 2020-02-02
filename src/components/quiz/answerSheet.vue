<!--
模块说明
功能：答题卡
获取  父组件的输入参数：
answerSheet_problem:
[
  {
    name:'客观题',
    sum:[{id:1,status:2},     // 存储这个类型题的答题信息
    type:0                    // 0代表客观题 1代表编程题
  },
  {
    name:'编程题',
    sum:[{id:1,status:2},     
    type:1
  }....
]
传递给父组件的输出参数：
current_answerSheet:
{
  type:0,                     // 0 代表客观题，1代表编程题 
  id:1,                       // 题目数字
  statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
}
作者：许浩培
完成时间：2019/11/29
-->
<template>
  <div class="pageBtnTemp" id = "pageBtn">
      <el-collapse  accordion style = "margin-left:5px;">
        <el-collapse-item  :name="id" v-for="(problem,id) in data" :key="id">
          <template slot="title">
            <h2>{{problem.name}}</h2>
          </template>
          <ul class="pageBtnWrap">
              <li @click="clickPage(i.id,problem)" v-for="(i, idx) in problem.sum" :key="idx" :class="`pageBtnLi status${i.status}`">
                {{i.id}}
            </li> 
          </ul>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'pageBtn',
  props: {
    answerSheet_problem: Array,
  },
  components: {
  },
  data () {
    return {
      data: this.answerSheet_problem,                 // 答题表的数据
      current_answerSheet:{type:0,id:1,statu:2},      // 初始化
    }
  },
  methods: {
    /**
     * 函数描述：进入考试时，设置当前题号的初始状态，以及给选择题的第一题的状态变成蓝色。
     * 作者：许浩培
     * 时间：2019/11/29
     */
    init () {
      this.data[0].sum[0].status = 1;
    },
    /**
     * 函数描述：点击题号，修改题号状态，并向父组件发送题号。
     * 作者：许浩培
     * 时间：2019/11/28
     * 输入参数:
     * id(题号)，表示点击后的当前题号
     * problem(大题类型)，表示当前大题 例如选择题 客观题 编程题中的一种。
     * 输出参数:
     * current_answerSheet(当前题号信息)
     */
    clickPage (id,problem) {
        // 恢复题号的原始状态
        this.data[this.current_answerSheet.type].sum[this.current_answerSheet.id - 1].status = this.current_answerSheet.statu;
        // 保存当前题号信息
        this.current_answerSheet.type = problem.type;               // 题目类型
        this.current_answerSheet.id = id;                           // 题目
        this.current_answerSheet.statu = problem.sum[id-1].status;  // 题目状态
        // 将点击的题号暂时修改成蓝色的状态
        this.data[problem.type].sum[id - 1].status = 1;                             
        // 发送当前题号信息给父组件
        this.$emit('update:current_answerSheet', this.current_answerSheet);
    },
    /*
    * 函数描述：鼠标左键时，执行组件动画的效果。
    * 作者：许浩培
    * 时间：2019/11/28
    */ 
    animationShow () {
      document.getElementById('pageBtn').className = 'pageBtn';
    }
  },
  created () {
   this.init();

  },
  mounted () {
    document.getElementById('pageBtn').parentNode.onclick = this.animationShow;
  },
  watch: {
     
  }
  
}
</script>

<style scoped>
  .pageBtnTemp {
    position: fixed;
    top:65px;
    width: 220px;
    left:0px;
  }
  .pageBtn {
    position: fixed;
    top:65px;
    width: 220px;
    transition:left 1s;
    left:-200px;
  }
  .pageBtn:hover {
    left:0px;
  }
  .pageBtnWrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    top:-10px;
    left:0px;
    padding: 0;
  }
  .pageBtnLi {
    width: 28px;
    height: 28px;
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
