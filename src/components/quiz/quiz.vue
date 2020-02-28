<!--
模块说明
功能：考试内容的组合模块，这个模块主要获取试卷的所有信息。然后将信息重新组合后分发给各个模块。
获取  子组件的输入参数：
answerSheet：
    current_answerSheet:
    {
      type:0,                     // 0 代表客观题，1代表编程题 
      id:1,                       // 题目数字
      statu:1，                     // 题目状态,1 当前激活 2 非当前 3 已完成
      problemId:0，               // 题目实际位置
    }
传递给子组件的输出参数：
answerSheet：
   current_answerSheet:
    {
      type:0,                     // 0 代表客观题，1代表编程题 
      id:1,                       // 题目数字
      statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
      problemId:0，               // 题目实际位置
    }
    answerSheet_problem:
    [
      {
        name:'客观题',
        sum:[{id:1,status:2}],     // 存储这个类型题的答题信息
        type:0 ,                   // 0代表客观题 1代表编程题
        problemId:0，               // 题目实际位置
      },
      {
        name:'编程题',
        sum:[{id:1,status:2}],     
        type:1
      }....
    ]
description：data.exam_AllProblem 
   current_answerSheet:
    {
      type:0,                     // 0 代表客观题，1代表编程题 
      id:1,                       // 题目数字
      statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
      problemId:0，               // 题目实际位置
    }
作者：许浩培
完成时间：2019/11/28
-->
<template>
  <div class="quiz main-view center-div" v-loading="loading" element-loading-text="考试内容加载中,请稍等" v-on:click='show.description=true'>
    <answerSheet v-if='show.answerSheet'  :answerSheet_problem.sync="data.answerSheet_problem"  :current_answerSheet.sync="current_answerSheet"></answerSheet>
    <tip v-if='show.tip'></tip>
    <transition name="fade">
      <description :exam_AllProblem="data.exam_AllProblem" v-if='show.description' :current_answerSheet.sync="current_answerSheet"></description>
    </transition>
    
  </div>
</template>

<script>
import axios from 'axios';
import answerSheet from './answerSheet.vue'       // 导入答题表模块
import description from './description.vue'       // 导入答题内容模块
import tip from './tip.vue'                       // 导入提示模块
export default {
  name: 'quiz',
  props: {
  },
  components: {
    answerSheet,                                  // 导入答题表模块
    description,                                  // 导入答题内容模块
    tip                                           // 导入提示模块
  },
  data () {
    return {
      data: {
        exam_AllProblem:{             // 存储一张试卷的数据
          program_problem:[],         // 存储编程题的所有题目数据
          object_problem:[]           // 存储客观题的所有题目数据（包括选择题、客观题、判断题）
        },                           
        answerSheet_problem:[],       // 答题卡数据  
      },
      // current_answerSheet:{type:0,id:1,statu:2},    // 当前的题号信息， type为题目类型，ID为题号，statu为题号的背景颜色
      current_answerSheet:{type:0,id:1,statu:2,problemId:0},    // 当前的题号信息， type为题目类型，ID为页面显示的题号，statu为题号的背景颜色，problemId为实际题号在后台的位置。
      show: {
        tip:false,                    // 控制温馨提示模块的显示
        answerSheet:false,            // 控制答题表模块的显示
        description:false             // 控制编程题模快的显示
      },
      loading:true                    // 控制请求数据时，出现加载符号
    }
  },
  methods: {
    /**
     * 函数描述：向服务器发送请求，获取试卷的所有信息
     * 作者：许浩培
     * 时间：2019/12/2
     */
    async getData() {
          const id = this.$route.params.id;
          this.loading = true;
          await Promise.all([
                axios.get("/backStageExamination/"+id,({

                })).then((response)=> {
                if(response.status != 200){
                    throw "获取数据失败!";
                }
                this.data.exam_AllProblem = response.data.data;
                this.initAnswerSheet_type(this.data.exam_AllProblem.singleProblemIdList,0);      // 设置答题卡内容
                this.initAnswerSheet_type(this.data.exam_AllProblem.programProblemIdList,1);     // 设置答题卡内容
                this.show.answerSheet = true;
                this.show.tip = true;
                this.current_answerSheet.problemId = this.data.exam_AllProblem.singleProblemIdList[0];  // 初始化problemId
                this.setCurrent_problem (this.data.exam_AllProblem);          // 传数据给答题内容模块
                }).catch(function () {
                    this.openError();
                })
          ]);

          this.loading = false;                                               // 停止数据加载图标的显示
    },
    /**
     * 函数描述：加载数据失败时，弹出提示框
     * 作者：许浩培
     * 时间：2019/12/2
     */
    openError () {
        this.$message.error('加载试卷数据失败');
    },
    /**
     * 函数描述：根据problem,name来设置答题卡各个模块的信息
     * 作者：许浩培
     * 时间：2020/02/28
     * 参数:
     * problem: array类型，这套试卷类型在后台的题目位置
     * type:Number类型， 这套试卷的类型
     */
    initAnswerSheet_type (problem,type) {
        var obj = {};
        let types = ["客观题","编程题"];
        obj.name = types[type];
        obj.type = type;           // 0代表客观题 1代表编程题 
        obj.sum = [];
    
        for(let i = 0; i < problem.length; i++){
            var single = {};                                       // 存储这个类型题的答题信息
            single.id = i + 1;                                     // 存储页面显示的题号
            single.status = 2;                                     // 1表示当前题，2代表该题未答，3代表已答题
            single.problemId = problem[i];                         // 存储题目在后台的具体位置。
            obj.sum.push(single);
        }
        this.data.answerSheet_problem.push(obj);
    },
    /**
     * 函数描述：设置这套试卷的所有数据，并传给子组件description
     * 作者：许浩培
     * 时间：2019/12/3
     * 参数:
     * problem:obj类型
     */
    setCurrent_problem (problem) {
      this.data.exam_AllProblem = problem;
      // 将数据对象里面客观题中的文本数据类型转换成JSON数据，不然答题内容的数据显示会异常。
      // for(let i = 0; i < problem.object_problem.length; i++) {    // 客观题
      //     this.data.exam_AllProblem.object_problem[i].description = JSON.parse(problem.object_problem[i].description);  
      // }
      // for(let i = 0; i < problem.program_problem.length; i++) {   // 编程题
      //     this.data.exam_AllProblem.program_problem[i].description = JSON.parse(problem.program_problem[i].description);
      //     this.data.exam_AllProblem.program_problem[i].input_format = JSON.parse(problem.program_problem[i].input_format);
      //     this.data.exam_AllProblem.program_problem[i].output_format = JSON.parse(problem.program_problem[i].output_format);
      //     this.data.exam_AllProblem.program_problem[i].samples = JSON.parse(problem.program_problem[i].samples);
      // }
      this.$emit("update:exam_AllProblem",this.data.exam_AllProblem);
    }
  },

  watch: {
    /**
     * 函数描述：当点击答题卡的不同题目时，传值给子组件，更改题目的内容。
     * 作者：许浩培
     * 时间：2020/1/15
     * 监听对象:
     * current_answerSheet:obj类型
     */
    'current_answerSheet': {
      deep: true,
      handler: function() {
        /* 这两个for循环，将所有状态全都变成无(2) */
        for(let i = 0; i < this.data.answerSheet_problem[0].sum.length; i ++) {
          this.data.answerSheet_problem[0].sum[i].status = 2;
        }
        for(let i = 0; i < this.data.answerSheet_problem[1].sum.length; i ++) {
          this.data.answerSheet_problem[1].sum[i].status = 2;
        }        
        this.data.answerSheet_problem[this.current_answerSheet.type].sum[this.current_answerSheet.id - 1].status = 1; // 将当前题目的状态改成有（1）
      }
    }
  },
  created () {
    this.getData();
  }
}
</script>

<style scoped>

  .bottom-control {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .skeleton-item {
    height: 36px;
    width: 100%;
    margin-bottom: 20px;
  }
  .pagination ul{
    display: flex;
    flex-wrap: wrap;
  }
  .center-div{
    position: relative;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
    }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
