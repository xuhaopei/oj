<!--
模块说明
功能：考试内容的组合模块，这个模块主要获取试卷的所有信息。然后将信息重新组合后分发给各个模块。
获取  子组件的输入参数：
answerSheet：
    current_answerSheet:
    {
      type:0,                     // 0 代表客观题，1代表编程题 
      id:1,                       // 题目数字
      statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
    }
传递给子组件的输出参数：
answerSheet：
   current_answerSheet:
    {
      type:0,                     // 0 代表客观题，1代表编程题 
      id:1,                       // 题目数字
      statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
    }
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
description：data.exam_AllProblem 
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
        answerSheet_problem:[],       // 答题卡  
        //current_problem:{}            // 当前题目信息（传递给answerSheet组件）
      },
      current_answerSheet:{type:0,id:1,statu:2},    // 当前的题号信息， type为题目类型，ID为题号，statu为题号的背景颜色
    
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
          var that = this;
          this.loading = true;
          await Promise.all([
                axios.get("http://localhost:8080/exam/"+id,({

                })).then(function (response) {
                if(response.status != 200){
                    throw "获取数据失败!";
                }
               // that.data.exam_AllProblem = response.data;
               // that.data.object_problem = response.data.object_problem;  // 获取试卷的客观题（选择题0、填空题1、判断题2）
               // that.data.program_problem = response.data.program_problem;//  获取试卷的编程题
                that.data.exam_AllProblem.object_problem = [
                {
                    "gmt_create": 1571541020000,
                    "ac_times": 0,
                    "is_deleted": 0,
                    "object_problem_id": 10,
                    "answer": "false",
                    "description": "{\"des\": \"<div class=\\\"question-main\\\"><span>下列程序段的输出结果是：（ </span> <span> ）</span> <span> <br> public void complicatedexpression_r(){<br> &nbsp;&nbsp;&nbsp;&nbsp;int x=20, y=30;<br> &nbsp;&nbsp;&nbsp;&nbsp;boolean   b;<br> &nbsp;&nbsp;&nbsp;&nbsp;b = x &gt; 50 &amp;&amp; y &gt; 60 || x &gt; 50 &amp;&amp; y &lt; -60 || x &lt; -50 &amp;&amp; y &gt; 60 || x &lt; -50 &amp;&amp; y &lt; -60;<br> &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(b);<br> }<br> </span></div>\"}",
                    "type": "1",
                    "gmt_modified": 1571541020000,
                    "submit_times": 0,
                    "status": 0
                },
                {
                    "gmt_create": 1571541020000,
                    "ac_times": 0,
                    "is_deleted": 0,
                    "object_problem_id": 11,
                    "answer": "final",
                    "description": "{\"des\": \"局部内部类可以用private、abstract、( )修饰符修饰\"}",
                    "type": "1",
                    "gmt_modified": 1571541020000,
                    "submit_times": 0,
                    "status": 0
                },
                {
                    "gmt_create": 1555938245000,
                    "ac_times": 0,
                    "is_deleted": 1,
                    "object_problem_id": 1,
                    "answer": "C",
                    "description": "{\"des\": \" 下列选项中，用于在定义子类时声明父类名的关键字是：( ) \", \"opt1\": \"interface\", \"opt2\": \"package\", \"opt3\": \"extends\", \"opt4\": \"class\"}",
                    "type": "0",
                    "gmt_modified": 1571543419000,
                    "submit_times": 0,
                    "status": 0
                },
                {
                    "gmt_create": 1571541039000,
                    "ac_times": 0,
                    "is_deleted": 0,
                    "object_problem_id": 18,
                    "answer": "true",
                    "description": "{\"des\": \"如果a.equals(b)返回true，那么a,b两个对象的hashcode必须相同\"}",
                    "type": "2",
                    "gmt_modified": 1571541039000,
                    "submit_times": 0,
                    "status": 0
                  },
                  {
                      "gmt_create": 1555938245000,
                      "ac_times": 0,
                      "is_deleted": 0,
                      "object_problem_id": 4,
                      "answer": "final",
                      "description": "{\"des\": \"局部内部类可以用private、abstract、<div class = 'inputValue' contentEditable='true'></div> 修饰符修饰\"}",
                      "type": "1",
                      "gmt_modified": 1556014876000,
                      "submit_times": 0,
                      "status": 0
                  }
                ];
                that.data.exam_AllProblem.program_problem = [
                  {
                      "gmt_create": 1556269441000,
                      "used_times": 0,
                      "program_problem_id": 20,
                      "ac_times": 0,
                      "memory": 128,
                      "run_time": 1,
                      "description": "{\"insert\": \"二叉树可以用于排序。其原理很简单：对于一个排序二叉树添加新节点时，先与根节点比较，若小则交给左子树继续处理，否则交给右子树。\\n当遇到空子树时，则把该节点放入那个位置。 \\n比如，10 8 5 7 12 4 的输入顺序，应该建成二叉树如下图所示，其中.表示空白。\\n...|-12\\n 10-|\\n ...|-8-|\\n .......|...|-7\\n .......|-5-|\\n ...........|-4 \\n本题目要求：根据已知的数字，建立排序二叉树，并在标准输出中横向打印该二叉树。\\n\"}",
                      "difficult": 0,
                      "wa_times": 0,
                      "gmt_modified": 1556270421000,
                      "title": "横向打印二叉树123",
                      "submit_times": 0,
                      "rte_times": 0,
                      "input_format": "{\"insert\": \"输入数据为一行空格分开的N个整数。 N<100，每个数字不超过10000。\\n输入数据中没有重复的数字。\\n\"}",
                      "samples": "[{\"input\": \"10 5 20 \", \"output\": \"...|-20\\n10-|\\n...|-5 \\n\"}]",
                      "is_deleted": 0,
                      "tle_times": 0,
                      "ce_times": 0,
                      "output_format": "{\"insert\": \"输出该排序二叉树的横向表示。为了便于评卷程序比对空格的数目，请把空格用句点代替：\\n\"}",
                      "status": 0
                  },
                  {
                      "gmt_create": 1563432940000,
                      "used_times": 0,
                      "program_problem_id": 21,
                      "ac_times": 3,
                      "memory": 128,
                      "run_time": 1,
                      "description": "{\"insert\": \"Fibonacci数列的递推公式为：Fn=Fn-1+Fn-2，\\n其中F1=F2=1。当n比较大时，Fn也非常大，现在我们想知道，Fn除以10007的余数是多少。\"}",
                      "difficult": 0,
                      "wa_times": 2,
                      "gmt_modified": 1567187066000,
                      "title": "Fibonacci数列  ",
                      "submit_times": 5,
                      "rte_times": 0,
                      "input_format": "{\"insert\": \"输入包含一个整数n。\\n\"}",
                      "samples": "[{\"input\": \"10\", \"output\": \"55\\n\"}, {\"input\": \"22\", \"output\": \"7704\\n\"}]",
                      "is_deleted": 0,
                      "tle_times": 0,
                      "ce_times": 0,
                      "output_format": "{\"insert\": \"输出一行，包含一个整数，表示Fn除以10007的余数。\\n\"}",
                      "status": 0
                  }
                ];
                that.initAnswerSheet_type(that.data.exam_AllProblem.object_problem.length,'客观题');      // 设置答题卡标题为客观题，题目数量为length
                that.initAnswerSheet_type(that.data.exam_AllProblem.program_problem.length,'编程题');     // 设置答题卡标题为编程题，题目数量为length
                that.show.answerSheet = true;
                that.show.tip = true;
                that.setCurrent_problem (that.data.exam_AllProblem);          // 传数据给答题内容模块
                }).catch(function () {
                    that.openError();
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
        this.$message.error('加载数据失败');
    },
    /**
     * 函数描述：根据problemLength,name来设置答题卡各个模块的信息
     * 作者：许浩培
     * 时间：2019/12/2
     * 参数:
     * problemLength: Number类型，这套试卷类型的题目数量
     * name:String类型， 这套试卷类型的名称
     */
    initAnswerSheet_type (problemLength,name) {
        var obj = {};

        obj.name = name;
        obj.type = this.data.answerSheet_problem.length;           // 0代表客观题 1代表编程题 
        obj.sum = [];
    
        for(let i = 0; i < problemLength; i++){
            var single = {};                                       // 存储这个类型题的答题信息
            single.id = i + 1;                                     // 存储题号
            single.status = 2;                                     // 1表示当前题，2代表该题未答，3代表已答题
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
      for(let i = 0; i < problem.object_problem.length; i++) {    // 客观题
          this.data.exam_AllProblem.object_problem[i].description = JSON.parse(problem.object_problem[i].description);  
      }
      for(let i = 0; i < problem.program_problem.length; i++) {   // 编程题
          this.data.exam_AllProblem.program_problem[i].description = JSON.parse(problem.program_problem[i].description);
          this.data.exam_AllProblem.program_problem[i].input_format = JSON.parse(problem.program_problem[i].input_format);
          this.data.exam_AllProblem.program_problem[i].output_format = JSON.parse(problem.program_problem[i].output_format);
          this.data.exam_AllProblem.program_problem[i].samples = JSON.parse(problem.program_problem[i].samples);
      }
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
        //this.$emit("update:current_answerSheet",this.data.current_answerSheet);
       // this.data.answerSheet_problem[this.current_answerSheet.type].sum[this.current_answerSheet.id - 2].status = 2; // 将上一题改成无状态2
        //this.data.answerSheet_problem[this.current_answerSheet.type].sum[this.current_answerSheet.id - 1].status = 1; // 将当前题目改成状态1
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
