<template>

  <div class="description" id = 'description'  >
    <div class='description-main'>
      <div class="description-item" >
        <div>
          <h2>输入规范</h2>
        </div>
        <div>
          {{current_problem.input_format.insert}}
        </div>
      </div>
      <div class="description-item">
        <div>
          <h2>输出规范</h2>
        </div>
        <div>
          {{current_problem.output_format.insert}}
        </div>
      </div>
      <div class="description-item">
        <h2 style='margin-bottom: 0px;'>样例</h2>
        <div class="sample">
          <div v-for="(item, idx) in current_problem.samples" :key='idx'>
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
    <div class='description_answer'>
      <editor  v-model="content" @init="editorInit" lang="java" theme="chrome" width="100%" height="100%" ></editor>
    </div>
  </div>
</template>

<script>
export default {
  name: 'description',
  props: {
    current_problem: Object,
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
  data () {
    return {
      ready: true,
      show: false,
      content:"package xu;\n"+
              "public class Main {\n"+
              "       public static void main(String[] args) {\n"+
              "         xhpShowLayout xhp = new xhpShowLayout();\n"+
              "         xhp.setTitle(\"两个界面组合起来使用:许浩培2017035144038广技师1班\");\n"+
              "       }\n"+
              "}"
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
        }
  },
  created () {
    //this.jsonParse();
  },
  mounted () {
    
  },
  watch : {
    'current_problem':{
      deep:true,
      handler:function() {
        this.content='';
      }
    }
  }
}

</script>

<style scoped>
  .description {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    align-items:stretch;
  }
  .description-main {
    /* display: flex; */
    flex:1;
    margin-left:25px;
  }
  .description-main .sample {
    padding: 5px 10px;
    border-left: 2px solid #2d8cf0;
  }
  .tag-list {
    display: flex;
    padding: 10px;
  }
  .tag-item:hover {
    background-color: #ffffff;
  }
  .description-main .sample .res {
    margin: 5px 0;
    padding: 5px;
    background-color: #f4faff;
    width: 100%;
    font-size: 1em;
    color: #495060;
  }
  .description-main .description-nodata-item {
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
  .description_answer {
    flex:1;
  }
</style>
