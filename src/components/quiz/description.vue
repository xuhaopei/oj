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
  problemId:0，               // 题目实际位置
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
  <div class="description" id="description" v-loading="loading">
    <div class="object_problem" v-if="current_answerSheet.type == 0">
      <h2
        style="margin-left:10px"
        class="description_title"
        v-if="current_answerSheet.type == 0"
      >
        {{ exam_Titles[exam.type] }}
      </h2>
      <div class="description_hr"></div>
      <!--选择题的显示-->
      <div v-if="exam.type == 0" class="object_problem_select">
        <h2>{{ exam.problem.description.des }}</h2>
        <ul class="_ul">
          <label
            v-for="(value, key, index) in exam.problem.description"
            v-bind:key="index"
            v-show="index != 0"
            ><li class="_ul_li">
              <input
                class="_ul_li_input"
                type="radio"
                name="singleSelect"
                v-bind:value="key"
                v-model="examObject_problemTemp.answerSelect"
              />{{ value }}
            </li></label
          >
        </ul>
      </div>
      <!--填空题的显示-->
      <div v-else-if="exam.type == 1" class="object_problem_tiankong">
        <div
          class="object_problem_tiankong-contend"
          v-html="exam.problem.description.des"
        ></div>
        <div class="object_problem_tiankong-input">
          <h2>请输入你的答案</h2>
          <input type="text" v-model="examObject_problemTemp.answerTiankong" />
        </div>
      </div>
      <!--判断题的显示-->
      <div v-else class="object_problem_juedge">
        <div
          class="object_problem_juedge-contend"
          v-html="exam.problem.description.des"
        ></div>
        <div class="object_problem_juedge-input">
          <ul class="_ul">
            <label>
              <li class="_ul_li">
                <input
                  class="_ul_li_input"
                  type="radio"
                  name="singleSelect"
                  value="true"
                  v-model="examObject_problemTemp.answerJuedge"
                />true
              </li>
            </label>
            <label>
              <li class="_ul_li">
                <input
                  class="_ul_li_input"
                  type="radio"
                  name="singleSelect"
                  value="false"
                  v-model="examObject_problemTemp.answerJuedge"
                />false
              </li>
            </label>
          </ul>
        </div>
      </div>
    </div>
    <!--编程题的显示-->
    <div class="program_problem" v-else>
      <div class="progam_problem_title" style="width:100%">
        <h2 style="margin-left:2%;">{{ exam.problem.title }}</h2>
        <div class="description_hr"></div>
      </div>
      <div class="program_problem_body">
        <div class="program_problem-main">
          <div class="program_problem-item">
            <div>
              <h2>输入规范</h2>
            </div>
            <div>
              {{ exam.problem.input_format.insert }}
            </div>
          </div>
          <div class="program_problem-item">
            <div>
              <h2>输出规范</h2>
            </div>
            <div>
              {{ exam.problem.output_format.insert }}
            </div>
          </div>
          <div class="program_problem-item">
            <h2 style="margin-bottom: 0px;">样例</h2>
            <div class="sample">
              <div v-for="(item, idx) in exam.problem.samples" :key="idx">
                <h5>输入</h5>
                <div class="res">
                  <span>{{ item.input }}</span>
                </div>
                <h5>输出</h5>
                <div class="res">
                  <span>{{ item.output }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="program_problem-answer">
          <editor
            v-model="examProgram_problemTemp.answer"
            @init="editorInit"
            lang="java"
            theme="chrome"
            width="100%"
            height="100%"
          ></editor>
        </div>
      </div>
    </div>
    <div class="control_problem">
      <div class="btn btn-origin" v-on:click="submitWarnMsg">提交试卷</div>
      <div class="btn btn-blue" v-show="show.front" v-on:click="frontProblem">
        上一题
      </div>
      <div class="btn btn-blue" v-show="show.next" v-on:click="nextProblem">
        下一题
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode"; // 解析token需要用到，如何使用 请用百度 “使用jwt解析token”即可
export default {
  name: "description",
  props: {
    exam_AllProblem: Object, // 获取父组件传递过来的试卷数据
    current_answerSheet: Object // 获取父组件传递过来的点击的题号
  },
  components: {
    editor: require("vue2-ace-editor") // 导入代码编写的模块
  },
  data() {
    return {
      exam_Titles: ["选择题", "填空题", "判断题", "编程题"], // 设置题目类型的标题
      exam: {
        // 当前一道题的数据
        type: 0, // 题目类型 0选择题，1填空题，2判断题，3编程题
        problem: {} // 题目数据
      },
      examAnswer: {
        // 一整张试卷提交的答案
        problem_list:[],
        userId: 0, // 用户ID
        examId: 0 // 试卷ID
      },
      examObject_problemTemp: {
        // 暂时存储客观题数据，用来上传答案
        answerSelect: "", // 存储选择题
        answerTiankong: "", // 存储填空题
        answerJuedge: "" // 存储判断题
      },
      examProgram_problemTemp: {
        // 暂时存储编程题数据，用来上传答案
        answer: "" // 存储选择题
      },
      show: {
        // 组件的显示
        next: true, // 下一题按钮的显示
        front: true // 上一题按钮的显示
      },
      loading: false // 控制请求数据时，出现加载符号
    };
  },
  methods: {
    /**
     * 函数描述：这是导入vue2-ace-editor后使用的方法，根据官网https://www.npmjs.com/package/vue2-ace-editor配置的
     * 作者：许浩培
     * 时间：2019/11/18
     */

    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/java"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
      require("brace/snippets/java"); //snippet
    },
    /**
     * 函数描述：初始化题目默认显示答题卡中的客观题中的第一道题
     * 作者：许浩培
     * 时间：2020/1/2
     */
    dataInit: function() {
      this.exam.problem.description= " ";         // 避免浏览器报错
      this.getData(0, this.current_answerSheet.problemId);  // 初始化第一题
      this.show.front = false; // 初始化设置上一题按钮不可见
      this.examAnswer.examId = this.$route.params.id; // 获取试卷ID
      this.examAnswer.userId = jwtDecode(localStorage.getItem("token")).uid; // 获取用户ID
    },
    /**
     * 函数描述：加载数据失败时，弹出提示框
     * 作者：许浩培
     * 时间：2019/12/2
     */
    openError() {
      this.$message.error("加载数据失败");
    },
    /**
     * 函数描述:请求题目数据
     */
    async getData(type, id) {
      this.loading = true;
      switch (type) {
        // 客观题
        case 0:
          await Promise.all([
            this.$axios
              .get(`/object-problem/` + id, {})
              .then(response => {
                if (response.status != 200) {
                  throw "网络错误!";
                }
                this.exam.problem = response.data.data.object_problem;
                this.exam.type = this.exam.problem.type;
              })
              .catch(() => {
                this.openError();
              })
          ]);
          this.returnShowProblem(this.current_answerSheet.id,this.exam.type);
          break;
        // 编程题
        case 1:
          await Promise.all([
            this.$axios
              .get("/backStageClassProgramProblem/" + id, {})
              .then(response => {
                if (response.status != 200) {
                  throw "网络错误!";
                }
                this.exam.problem =
                  response.data.data.program_problem.programProblemEntity;
                this.exam.type = 3;
              })
              .catch(() => {
                this.openError();
              })
          ]);
          this.returnShowProblem(this.current_answerSheet.id,this.exam.type);
          break;
      }
      this.loading = false;
    },
    /**
     * 函数描述：点击下一题时，改变题目内容，保存答案。
     * 作者：许浩培
     * 时间：2019/11/18
     */
    nextProblem: function() {
      this.pushOneProblem(this.exam.type); // 提交一道题的答案
      this.show.front = true; // 你点击下一题时必定会显示上一题的按钮
      // 如果当前题目ID刚好等于客观题最后的ID号，那么将题目类型改成编程题，题目ID改成1
      if (
        this.current_answerSheet.id ==
        this.exam_AllProblem.singleProblemIdList.length
      ) {
        this.current_answerSheet.type = 1;
        this.current_answerSheet.id = 1;
      }
      // 如果当前题的ID不等于最后的ID号，那么将题目ID+1
      else {
        this.current_answerSheet.id++;
        // 如果当前题目ID刚好是编程题最后的ID号，隐藏下一题的按钮
        if (
          this.current_answerSheet.id ==
            this.exam_AllProblem.programProblemIdList.length &&
          this.current_answerSheet.type == 1
        ) {
          this.show.next = false;
        }
      }
      this.current_answerSheet.problemId =
        this.current_answerSheet.type == 1
          ? this.exam_AllProblem.programProblemIdList[
              this.current_answerSheet.id - 1
            ]
          : this.exam_AllProblem.singleProblemIdList[
              this.current_answerSheet.id - 1
            ];
    },
    /**
     * 函数描述：点击下一题时，改变题目内容，保存答案。
     * 作者：许浩培
     * 时间：2020/2/2
     */
    frontProblem: function() {
      this.pushOneProblem(this.exam.type); // 提交一道题的答案
      this.show.next = true; // 你点击上一题时必定会显示下一题的按钮
      // 如果当前题目ID刚好等于编程题的第一道题的ID号，那么将题目类型改成客观题，题目ID为客观题最后的ID号
      if (
        this.current_answerSheet.id == 1 &&
        this.current_answerSheet.type == 1
      ) {
        this.current_answerSheet.type = 0;
        this.current_answerSheet.id = this.exam_AllProblem.singleProblemIdList.length;
      }
      // 如果当前题的ID不等于第一道题的ID号，那么将题目ID-1
      else {
        this.current_answerSheet.id--;
        // 如果当前题目ID刚好是客观题的第一道题的ID号，隐藏上一题的按钮
        if (
          this.current_answerSheet.id == 1 &&
          this.current_answerSheet.type == 0
        ) {
          this.show.front = false;
        }
      }
      this.current_answerSheet.problemId =
        this.current_answerSheet.type == 1
          ? this.exam_AllProblem.programProblemIdList[
              this.current_answerSheet.id - 1
            ]
          : this.exam_AllProblem.singleProblemIdList[
              this.current_answerSheet.id - 1
            ];
    },
    /**
     * 函数描述：获取当前题目的ID，类型，答案。
     * 输入参数:type(题目类型，类型有0选择题，1填空题，2判断题，3编程题)
     * 作者：许浩培
     * 时间：2020/2/2
     */
    pushOneProblem: function(type) {
      let exam_problem;
      switch (Number(type)) {
        // 如果提交的题目是选择题
        case 0:
          exam_problem = new this.createExam_problem(
            this.current_answerSheet.problemId,
            type,
            this.examObject_problemTemp.answerSelect
          );
          break;
        // 如果提交的题目是填空题
        case 1:
          exam_problem = new this.createExam_problem(
            this.current_answerSheet.problemId,
            type,
            this.examObject_problemTemp.answerTiankong
          );
          break;
        // 如果提交的题目是判断题
        case 2:
          exam_problem = new this.createExam_problem(
            this.current_answerSheet.problemId,
            type,
            this.examObject_problemTemp.answerJuedge
          );
          break;
        // 如果提交的题目是编程题
        case 3:
          exam_problem = new this.createExam_problem(
            this.current_answerSheet.problemId,
            type,
            this.examProgram_problemTemp.answer
          );
          break;
        default:
      }
      let index = type==3 ? this.current_answerSheet.id + this.exam_AllProblem.singleProblemIdList.length : this.current_answerSheet.id; // 存放长度
      this.examAnswer.problem_list[index-1]=exam_problem;  // 将答案填写进去
    },
    /**
     * 函数描述：提交一整张试卷的答案给后端。
     * 作者：许浩培
     * 时间：2020/2/2
     */
   async commitAllProblem() {
      this.pushOneProblem(this.exam.type); // 提交一道题的答案
      this.loading = true;         // 开始数据加载图标的显示
      await Promise.all([
                this.$axios.post("/sys/examjudge",this.examAnswer).then((response)=> {
                if(response.status != 200){
                    throw "GGG!";
                }
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                this.$router.push({ name: "begin" }); // 提交完试卷跳回公告界面 表示退出考试
                }).catch(()=> {
                    this.openError();
                })
      ]);
      this.loading = false;         // 停止数据加载图标的显示
      
    },
    /**
     * 函数描述：作为创建一个exam_problem对象的类,创建的对象来存储一道题的答案。注意 必须使用这种方式来存储多道数据，这里面涉及道数据内存的问题。
     * 参数: id(题目编号)，type(题目类型)，answer(题目答案), exam（当前一道题目的数据）
     * 作者：许浩培
     * 时间：2020/2/2
     */
    createExam_problem: function(id, type, answer) {
      this.id = id;
      // 如果是编程题直接赋值答案
      if (type == 3) {
        this.answer = answer;
        this.type = 1;
      }
      // 如果是客观题
      else {
        this.type = 2;
        // 如果是选择题     tip:为什么这样写，因为这是后台给的数据格式，我只能这样写了。怪后台
        if (type == 0) {
          var opt = { opt3: "A", opt4: "B", opt1: "C", opt2: "D" };
          this.answer = opt[answer];
        }
        // 如果是填空题 
        else if(type == 1) {
          this.answer = answer.replace(/\s+/g, "");
        }
        // 如果是判断题
        else if(type == 2) {
          this.answer = answer;
        }
      }
    },
    /**
     * 函数描述：确认是否提交试卷。 这是饿了么组件 使用直接参考官方文档
     * 作者：许浩培
     * 时间：2020/2/2
     */
    submitWarnMsg() {
      this.$confirm("是否提交试卷?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.commitAllProblem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    /**
     * 函数描述: 当点回题目的时候，会显示之前填写的答案
     * 作者：许浩培
     * 时间：2020/2/28
     * 参数：ID页面上显示的题目序号，type题目类型0选择题1填空题2判断题3编程题
     */
    returnShowProblem(id,type) {
      let index =  this.exam_AllProblem.singleProblemIdList.length;
      let abcd = { A: "opt3", B: "opt4", C: "opt1", D: "opt2" };
      try {
        switch(type){
          case 0:
            this.examObject_problemTemp.answerSelect=abcd[this.examAnswer.problem_list[id-1].answer];
            break;
          case 1:
            this.examObject_problemTemp.answerTiankong=this.examAnswer.problem_list[id-1].answer;
            break;
          case 2:
            this.examObject_problemTemp.answerJuedge=this.examAnswer.problem_list[id-1].answer;
            break;
          case 3:
            this.examProgram_problemTemp.answer=this.examAnswer.problem_list[id-1+index].answer;
            break;    
        }
      } catch (error) {
         this.examObject_problemTemp.answerSelect = " ";
         this.examObject_problemTemp.answerTiankong = " ";
         this.examObject_problemTemp.answerJuedge = " ";
         this.examProgram_problemTemp.answer = " ";
      }
    }
  },
  created() {
    this.dataInit(); // 初始化题目默认显示答题卡中的客观题中的第一道题
  },
  mounted() {},
  watch: {
    /**
     * 监听对象描述：当点击答题卡、点击上下提时，更改题目内容。
     */
    current_answerSheet: {
      deep: true,
      handler: function() {
        // 答题卡点击的是客观题
        if (this.current_answerSheet.type == 0) {
          this.getData(0, this.current_answerSheet.problemId);
          // 如果是答题卡客观题的第一道题，隐藏上一道题，显示下一道题
          if (this.current_answerSheet.id == 1) {
            this.show.next = true;
            this.show.front = false;
          }
        }
        // 答题卡点击的是编程题
        else {
          this.exam.problem.input_format = " ";       // 避免浏览器报错
          this.exam.problem.output_format = " ";      // 避免浏览器报错
          this.getData(1, this.current_answerSheet.problemId);
          // 如果是答题卡客观题的最后一道题，隐藏下一道题，显示上一道题
          if (
            this.current_answerSheet.id ==
            this.exam_AllProblem.programProblemIdList.length
          ) {
            this.show.next = false;
            this.show.front = true;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.description {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 10%;
}
.description_hr {
  height: 1px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
/**客观题的样式 */
.object_problem {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 2%;
  background-color: white;
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
  appearance: none; /*设置它的外观为空 */
  border-radius: 50%;
}
._ul_li_input::before {
  content: " ";
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: inline-block;
  border-radius: 50%;
}
._ul_li_input:checked::before {
  border: 1px solid #407dff;
  background: #407dff;
}
._ul_li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
/**填空题的样式 */
.object_problem_tiankong {
  margin-top: 2%;
}
/**判断题的样式 */
.object_problem_juedge {
  width: 100%;
}
.object_problem_juedge-contend {
  margin: 2% 0;
}
/*编程题的样式 */
.program_problem {
  width: 100%;
  background-color: white;
}
.program_problem_body {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  height: 85%;
  background-color: white;
}
.program_problem-main {
  flex: 1;
  flex-direction: row;
  margin-left: 25px;
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
  flex: 1;
  height: 100%;
}
/**按钮的样式 */
.control_problem {
  width: 100%;
  display: flex;
  justify-content: flex-end; /*控制水平方向 */
  align-items: center; /*控制竖直方向 */
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
  background-color: #ff654b;
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
