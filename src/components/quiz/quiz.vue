<!--
模块说明
功能：考试内容的组合模块，这个模块主要获取试卷的所有信息。然后将信息重新组合后分发给各个模块。
作者：许浩培
完成时间：2019/11/28
获取  父组件的输入参数：
传递给父组件的输出参数：
获取  子组件的输入参数：
page-btn：current_problem
传递给子组件的输入参数：
page-btn：data.pageArray 
-->
<template>
  <div class="quiz main-view center-div" v-loading="loading" element-loading-text="考试内容加载中,请稍等" >
    <answerSheet v-if='!loading'  :answerSheet_problem.sync="data.answerSheet_problem"  :current_problem.sync="current_problem"></answerSheet>
    <tip v-if='!loading' ></tip>
    {{current_problem}}
    <!--<div v-if="ready" class="center-item">
      <page-btn v-if="refresh.pageBtn" :pages.sync="data.pageArray" :currentPage.sync="currentPage"></page-btn>-->

      <!-- <el-button @click="test">test</el-button> -->
      <!--<div v-loading="subReady.quizItem" v-if="data.currentData.type==2">
        <description :detail="data.currentData.data"></description>
      </div>
      <div v-loading="subReady.quizItem" v-else>
        <h1>客观题</h1>
      </div>
    </div>
    <mu-snackbar style="margin: 8px 0;" snack.position="snack.postition" :open.sync="snack.open" :color='snack.type'>
      <mu-icon left :value="snack.icon"></mu-icon>
      {{snack.msg}}
    </mu-snackbar>-->
  </div>
</template>

<script>
import axios from 'axios';
import answerSheet from './pageBtn.vue'
//import description from './description.vue'
import tip from './tip.vue'
export default {
  name: 'quiz',
  props: {
  },
  components: {
    answerSheet,
   // description,
    tip
  },
  data () {
    return {
      ready: false,
      snack: {
        msg: '',
        type: '',
        open: false,
        icon: '',
        position: 'bottom',
      },
      data: {
        list: [],
        pageArray: [
          {
            name:'单选题',
            sum:[
              {id:1,status:2},
              {id:2,status:2},
              {id:3,status:2},
              {id:4,status:2},
              {id:5,status:2},
              {id:6,status:3},
              {id:7,status:2},
              {id:8,status:3}
            ],
            type:0
          },
          {
            name:'编程题',
            sum:[
              {id:1,status:2},
              {id:2,status:2},
              {id:3,status:2},
              {id:4,status:2},
              {id:5,status:2},
              {id:6,status:3},
              {id:7,status:2},
              {id:8,status:3}
            ],
            type:1
          }
        ],
        pageData: [],
        currentData: null,
        program_problem:[],           // 编程题
        object_problem:[],            // 选择题
        answerSheet_problem:[
            {
            name:'单选题',
            sum:[
              {id:1,status:2},
            ],
            type:0
          },
        ]        // 答题卡
      },
      params: {

      },
      current_problem: {},
      options: {
      },
      refresh: {
        pageBtn: true,
      },
      subReady: {
        quizItem: false,
      },
      temp: 2,
      show: {
        tip:true
      },
      loading:true
    }
  },
  methods: {
    /*async init () {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      this.snack = {
        msg: '获取题目元数据中',
        type: '',
        open: true,
        icon: 'info',
        position: 'bottom',
      }
      await sleep(1000)
      // 此处应该获取到了题目的数量等信息
      const pageCount = 50
      for (let i = 1; i <= pageCount; i++) {
        this.data.pageArray.push({
          page: i,
          status: 2,
        })
        this.data.pageData.push({
          type: 0,
        })
      }
      this.snack = {
        msg: '加载题目',
        type: '',
        open: true,
        icon: 'info',
        position: 'bottom',
      }
      await this.getDataByPageNum(this.currentPage)
      this.data.pageArray[this.currentPage-1].status=1
      this.snack.open = false
      this.ready = true
    },*/
    /*async getDataByPageNum (p) {
      this.subReady.quizItem = true
      // 如果数据未曾获取过才获取数据
      if (this.data.pageData[p-1].type === 0) {
        const d = await this._getDataByPageNum(p)
        this.data.pageData[p-1] = d
      }
      this.data.currentData = this.data.pageData[p-1]
      // await Promise.all([
      //   this.$store.dispatch('n', {
      //     flag: 0,
      //     method: 'post',
      //     url: `/code/user`,
      //     params: {
      //       "examinationId": 0,
      //       "groupId": 0,
      //       "lang": this.data.codeInfo.lang,
      //       "pid": this.$route.params.id,
      //       "sourceCode": this.data.codeInfo.code
      //     }
      //   }),
      // ])
      this.subReady.quizItem = false
    },
    async _getDataByPageNum (p) {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      if (this.temp === 1) {
        this.temp = 2
        return {
          type: 1,
          data: {
            title: 'Design Sprnt为Google的一套产品设计方法，关于该产品设计方法说法正确的是（）',
            options: [
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
              '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
            ],
          }
        }
      } else {
        this.temp = 1
        return {
          type: 2,
          data: {
            "ac_times": 0,
            "ce_times": 0,
            "deleted": 0,
            "description": {
              "insert": "二叉树可以用于排序。其原理很简单：对于一个排序二叉树添加新节点时，先与根节点比较，若小则交给左子树继续处理，否则交给右子树。\n当遇到空子树时，则把该节点放入那个位置。 \n比如，10 8 5 7 12 4 的输入顺序，应该建成二叉树如下图所示，其中.表示空白。\n...|-12\n 10-|\n ...|-8-|\n .......|...|-7\n .......|-5-|\n ...........|-4 \n本题目要求：根据已知的数字，建立排序二叉树，并在标准输出中横向打印该二叉树。\n"
            },
            "difficult": 0,
            "gmt_create": 1556269441000,
            "gmt_modified": 1556270421000,
            "input_format": {
              "insert": "输入数据为一行空格分开的N个整数。 N<100，每个数字不超过10000。\n输入数据中没有重复的数字。\n"
            },
            "memory": 128,
            "output_format": {
              "insert": "输出该排序二叉树的横向表示。为了便于评卷程序比对空格的数目，请把空格用句点代替：\n"
            },
            "program_problem_id": 20,
            "rte_times": 0,
            "run_time": 1,
            "samples": [
              {
                "output": "...|-20\n10-|\n...|-5 \n",
                "input": "10 5 20 "
              }
            ],
            "status": 0,
            "submit_times": 0,
            "title": "横向打印二叉树123",
            "tle_times": 0,
            "used_times": 0,
            "wa_times": 0
          }
        }
      }
    },*/
    /**
     * 函数描述：想服务器发送请求，获取试卷的所有信息
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
               // that.data.object_problem = response.data.object_problem;  // 获取试卷的选择题
               // that.data.program_problem = response.data.program_problem;//  获取试卷的编程题
                that.data.object_problem = [
                  {
                      "gmt_create": 1555938245000,
                      "ac_times": 0,
                      "is_deleted": 0,
                      "object_problem_id": 4,
                      "answer": "final",
                      "description": "{\"des\": \"局部内部类可以用private、abstract、_____ 修饰符修饰\"}",
                      "type": "1",
                      "gmt_modified": 1556014876000,
                      "submit_times": 0,
                      "status": 0
                  },
                  {
                      "gmt_create": 1555938245000,
                      "ac_times": 0,
                      "is_deleted": 0,
                      "object_problem_id": 4,
                      "answer": "final",
                      "description": "{\"des\": \"局部内部类可以用private、abstract、_____ 修饰符修饰\"}",
                      "type": "1",
                      "gmt_modified": 1556014876000,
                      "submit_times": 0,
                      "status": 0
                  }
                ];
                that.data.program_problem = [
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
                that.initAnswerSheet_type(that.data.object_problem.length,0);
                that.initAnswerSheet_type(that.data.program_problem.length,1);
                }).catch(function () {
                    that.openError();
                })
          ]);

          this.loading = false;
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
     * 函数描述：根据obj,type来设置答题卡各个模块的信息
     * 作者：许浩培
     * 时间：2019/12/2
     * 参数:
     * obj:这套试卷的模块信息，
     * type:这套试卷的模块类型 0代表单选题 1代表多选题 2代表填空题 3代表编程题 
     */
    initAnswerSheet_type (problemLength,type) {
        var obj = {};

        if(type == 0) {       
            obj.name = '单选题'; 
        }
        
        if(type == 1) {       
            obj.name = '多选题'; 
        }
        
        if(type == 2) {       
            obj.name = '填空题'; 
        }
        
        if(type == 3) {       
            obj.name = '编程题'; 
        }
        obj.type = type;          // 0代表单选题 1代表多选题 2代表填空题 3代表编程题 
        obj.sum = [];
    
        for(let i = 0; i < problemLength; i++){
            var single = {};          // 存储这个类型题的答题信息
            single.id = i + 1;       // 存储题号
            single.status = 2;        // 1表示当前题，2代表该题未答，3代表已答题
            obj.sum.push(single);
        }
        this.data.answerSheet_problem[type] = obj;
    },
  },

  watch: {
    /*currentPage: async function (newd, oldd) {
      this.refresh.pageBtn = false
      this.data.pageArray[oldd-1].status = 2
      // todo: 获取题目数据, 改变状态
      this.getDataByPageNum(oldd)
      // todo: 与后端同步数据, 改变状态
      this.submitPageData(oldd)

      this.data.pageArray[newd-1].status = 1
      this.$nextTick(function () {
        this.refresh.pageBtn = true
      })
    }*/
  },
  created () {
    //this.init()
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
/*  .left_navTemp {
    position: fixed;
    top:65px;
    width: 220px;
    left:0px;
  }
  .left_nav {
    position: fixed;
    top:65px;
    width: 220px;
    transition:left 1s;
    left:-200px;
  }
  .left_nav:hover {
    left:0px;
  }
*/
  
</style>
