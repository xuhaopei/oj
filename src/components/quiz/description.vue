<!--
模块说明
功能：试卷内容显示
获取  父组件的输入参数：
exam_AllProblem:Object
current_answerSheet:
{
  type:0,                     // 0 代表客观题，1代表编程题 
  id:1,                       // 题目数字
  statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
}
传递给父组件的输出参数：
current_answerSheet:
{
  type:0,                     // 0 代表客观题，1代表编程题 
  id:1,                       // 题目数字
  statu:1                     // 题目状态,1 当前激活 2 非当前 3 已完成
}
作者：许浩培
完成时间：2020/1/22
-->
<template>
  <div class="description" id = 'description'  >
    <div class = 'object_problem' v-if="current_answerSheet.type == 0">
      <h2 style="margin-left:10px" class = "description_title" v-if="current_answerSheet.type == 0">{{exam_Titles[exam_AllProblem.object_problem[current_answerSheet.id - 1].type]}}</h2>
      <div class = 'description_hr' ></div>
      <div v-if ="exam.type == 0"      class = "object_problem_select" >
        <h2>{{exam.problem.description.des}}</h2>
        <ul class = "_ul">
          <label v-for="(value,key,index) in exam.problem.description" v-bind:key="index" v-show="index != 0"><li class = "_ul_li"><input class="_ul_li_input" type="radio" name='singleSelect' v-bind:value="key" v-model="examObject_problemTemp.answerSelect">{{value}}</li></label>
        </ul>
        {{examObject_problemTemp.answerSelect}}
      </div>
      <div v-else-if ="exam.type == 1" class = "object_problem_tiankong" >
          <div class = 'object_problem_tiankong-contend' v-html="exam.problem.description.des"></div>
          <div class = 'object_problem_tiankong-input'>
            <h2>请输入你的答案</h2>
            <input type="text" v-model="examObject_problemTemp.answerTiankong">
          </div>
      </div>
      <div v-else                      class = "object_problem_juedge">
          <div class = 'object_problem_juedge-contend' v-html="exam.problem.description.des"></div>
          <div class = 'object_problem_juedge-input'>
            <ul class = "_ul">
              <label>
                <li class ="_ul_li">
                  <input class ="_ul_li_input" type="radio" name='singleSelect' value="true"  v-model="examObject_problemTemp.answerSelect">True
                </li>
              </label>
              <label>
                <li class ="_ul_li">
                  <input class ="_ul_li_input" type="radio" name='singleSelect' value="false" v-model="examObject_problemTemp.answerSelect">False
                </li>
              </label>
              {{examObject_problemTemp.answerSelect}}
            </ul>
          </div>
      </div>
      
    </div>
    <div class = 'program_problem' v-else>
      <div class = "progam_problem_title" style = "width:100%" >
          <h2 style="margin-left:2%;" >{{exam_Titles[exam.type]}}</h2>
          <div class = 'description_hr' ></div>
      </div>
      <div class = 'program_problem_body' >
        <div class='program_problem-main'>
          <div class="program_problem-item" >
            <div>
              <h2>输入规范</h2>
            </div>
            <div>
              {{exam.problem.input_format.insert}}
            </div>
          </div>
          <div class="program_problem-item">
            <div>
              <h2>输出规范</h2>
            </div>
            <div>
              {{exam.problem.output_format.insert}}
            </div>
          </div>
          <div class="program_problem-item">
            <h2 style='margin-bottom: 0px;'>样例</h2>
            <div class="sample">
              <div v-for="(item, idx) in exam.problem.samples" :key='idx'>
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
        <div class='program_problem-answer'>
          <editor  v-model="content" @init="editorInit" lang="java" theme="chrome" width="100%" height="100%" ></editor>
        </div>
      </div>

    </div>
    <div class = 'control_problem'>
        <div class = 'btn btn-origin'>提交试卷</div>
        <div class = 'btn btn-blue' v-show="show.front"  v-on:click="frontProblem">上一题</div>
        <div class = 'btn btn-blue' v-show="show.next" v-on:click="nextProblem">下一题</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'description',
  props: {
    exam_AllProblem: Object,                // 获取父组件传递过来的试卷数据
    current_answerSheet:Object              // 获取父组件传递过来的点击的题号
  },
  components: {
    editor: require('vue2-ace-editor'),     // 导入代码编写的模块
  },
  data () {
    return {
      content:"package xu;\n"+
              "public class Main {\n"+
              "       public static void main(String[] args) {\n"+
              "         xhpShowLayout xhp = new xhpShowLayout();\n"+
              "         xhp.setTitle(\"两个界面组合起来使用:许浩培2017035144038广技师1班\");\n"+
              "       }\n"+
              "}",
      exam_Titles:["选择题","填空题","判断题","编程题"],  // 设置题目类型的标题 
      exam:{                                            // 一道题的数据
        type:0,                                         // 题目类型 0选择题，1填空题，2判断题，3编程题
        problem:Object                                  // 题目数据  
      },
      examAnswer:{                                      // 一整张试卷提交的答案
        object_problem:[                                    // 客观题的答案
          {
            id:0,                                           // 题目编号
            type:0,                                         // 题目类型 0选择题，1填空题，2判断题，3编程题
            answer:0                                        // 答题结果 1正确 0错误 
          },
          {
            id:0,                                           
            type:0,                                         
            answer:0                                         
          }
        ],                              
        program_problem:[                                 // 编程题的答案
          {
            id:0,                                           // 题目编号
            type:0,                                         // 题目类型 0选择题，1填空题，2判断题，3编程题
            answer:' '                                      // 答题结果
          }
        ],
        userId:0 ,                                       // 用户ID   
        examId:0                                        // 试卷ID
      },
      examObject_problem:{                              // 一道客观题的答案
        id:0,                                           // 题目编号
        type:0,                                         // 题目类型 0选择题，1填空题，2判断题，3编程题
        answer:0                                        // 答题结果 1正确 0错误
      },  
      examProgram_problem:{                             // 一道编程题的答案
        id:0,                                           // 题目编号
        type:0,                                         // 题目类型 0选择题，1填空题，2判断题，3编程题
        answer:' '                                      // 答题结果
      },
      examObject_problemTemp:{                          // 暂时存储数据，用来比较答案
        answerSelect:'',                                // 存储选择题
        answerTiankong:'',                              // 存储填空题
        answerJuedge:''                                 // 存储判断题
      },
      show:{                                            // 组件的显示
        next:true,                                  // 下一题按钮的显示
        front:true                                  // 上一题按钮的显示
      }
    }
  },
  methods: {
        /**
         * 函数描述：这是导入vue2-ace-editor后使用的方法，根据官网https://www.npmjs.com/package/vue2-ace-editor配置的
         * 作者：许浩培
         * 时间：2019/11/18
         */ 
        editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
             require('brace/mode/java')         //language
            require('brace/mode/less')
            require('brace/theme/chrome')
            require('brace/snippets/javascript') //snippet
            require('brace/snippets/java') //snippet
        },
        /**
         * 函数描述：初始化题目默认显示答题卡中的客观题中的第一道题
         * 作者：许浩培
         * 时间：2019/11/18
         */
        dataInit: function() {
            this.exam.problem = this.exam_AllProblem.object_problem[this.current_answerSheet.id - 1];
            this.exam.type    = this.exam_AllProblem.object_problem[this.current_answerSheet.id - 1].type;
            //this.show.front   = false;                                     // 初始化设置上一题按钮不可见
        },
        /**
         * 函数描述：点击下一题时，改变题目内容，保存答案。
         * 作者：许浩培
         * 时间：2019/11/18
         */
         nextProblem: function() {
            let defineNum = 999;                                          // 约定999数字客观题阀值，为客观题转编程题做辅助。
            this.show.front = true;
            if(this.current_answerSheet.id == this.exam_AllProblem.object_problem.length) {
                  this.current_answerSheet.type = 1;                
                  this.current_answerSheet.id = 1;       
            }           
            else {
                this.current_answerSheet.id ++;
                if(this.current_answerSheet.id == this.exam_AllProblem.program_problem.length && this.current_answerSheet.type == 1) {
                  this.show.next = false;                
                } 
            }                   
         },
          /**
         * 函数描述：点击下一题时，改变题目内容，保存答案。
         * 作者：许浩培
         * 时间：2019/11/18
         */
         frontProblem: function() {
            let defineNum = 999;                                          // 约定999数字客观题阀值，为客观题转编程题做辅助。
            this.show.next = true;
            if(this.current_answerSheet.id == 1 && this.current_answerSheet.type == 1) {
                  this.current_answerSheet.type = 0;                
                  this.current_answerSheet.id = this.exam_AllProblem.object_problem.length;       
            }           
            else {
                this.current_answerSheet.id --;
                if(this.current_answerSheet.id == 1 && this.current_answerSheet.type == 0) {
                  this.show.front = false;                
                } 
            }                   
         }
  },
  created () {
        this.dataInit();                // 初始化题目默认显示答题卡中的客观题中的第一道题
  },
  mounted () {
    
  },
  watch : {
    /**
     * 监听对象描述：当点击答题卡、点击上下提时，更改题目内容。
     */
    'current_answerSheet':{
      deep:true,
      handler:function() {
        // 答题卡点击的是客观题
        if(this.current_answerSheet.type == 0) {
            this.exam.problem = this.exam_AllProblem.object_problem[this.current_answerSheet.id - 1];
            this.exam.type    = this.exam_AllProblem.object_problem[this.current_answerSheet.id - 1].type;
        }
        // 答题卡点击的是编程题
        else {
            this.exam.problem = this.exam_AllProblem.program_problem[this.current_answerSheet.id - 1];
            this.exam.type    = 3;
        }
      }
    }
  }
}

</script>

<style scoped>
  .description {
    width: 100%;
    display: flex;
    flex-direction: column; 
    margin:0 10%;  
  }
  .description_hr {
    height:1px;
    width:100%;
    border:1px solid rgba(0,0,0,0.2);
  }
  /**客观题的样式 */
  .object_problem {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding:0 2%;
    background-color:white; 
  }
  /**选择题的样式 */
  .object_problem_select {
    width: 100%;
  }
  ._ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  ._ul_li {
    border: 1px solid black;
    height: 50px;
    width: 100%;
    margin-bottom: 2%;
    line-height: 50px;
    padding-left: 2%;
    display: flex;
    align-items: center;
  }
  ._ul_li_input {
    height: 40px;
    margin-right: 0.5%;
    border: 0;
    appearance: none;               /*设置它的外观为空 */
    border-radius: 50%;
  }
  ._ul_li_input::before {
    content: " ";
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0,0,0,0.5);
    display:inline-block;
    border-radius: 50%;
  }
  ._ul_li_input:checked::before {
    border: 1px solid #407dff;
    background: #407dff;
  }
  ._ul_li:hover {
    background-color:rgba(0,0,0,0.1);
    cursor:pointer; 
  }
  /**填空题的样式 */
  .object_problem_tiankong {
    margin-top: 2%;
  }
  /**判断题的样式 */
  .object_problem_juedge{
    width:100%;
  }
  .object_problem_juedge-contend {
    margin: 2% 0;
  }
  /*编程题的样式 */
  .program_problem {
    width: 100%;
    background-color:white; 
  }
  .program_problem_body{
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    height: 85%;
    background-color:white; 
  }
  .program_problem-main {
    flex:1;
    flex-direction:row;
    margin-left:25px;
  }
  .program_problem-main .sample {
    padding: 5px 10px;
    border-left: 2px solid #2d8cf0;
  }
  .program_problem-main .sample .res {
    margin: 5px 0;
    padding: 5px;
    background-color: #f4faff;
    width: 100%;
    font-size: 1em;
    color: #495060;
  }
  .program_problem-main .description-nodata-item {
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
  .program_problem-answer {
    flex:1;
    height:100%;
  }
  /**按钮的样式 */
  .control_problem {
    width: 100%;
    display: flex;
    justify-content: flex-end;        /*控制水平方向 */
    align-items: center;              /*控制竖直方向 */
    height: 15%;
  }
  .btn {
    height: 50px;
    width: 120px;
    color: white;
    margin: 12px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn-origin {
    background-color: #FF654B;
  }
  .btn-origin:hover {
    background-color: #ec7063;
  }
  .btn-blue {
    background-color: #407dff;
  }
  .btn-blue:hover {
    background-color: #409dff;
  }

</style>
