<!--
模块说明
功能：前端练习模块
作者：许浩培
完成时间：2019/10/22
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
-->
<template>
  <div class = 'fronEnd'>
      <mu-button flat large   color="success" v-on:click="run" >Run</mu-button>
      <mu-flex  justify-content="between">
        <div class = 'left' >
<pre contenteditable="true" id = 'pre_result' >
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;script src="/jquery/jquery-1.11.1.min.js"&gt;
&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){
$("p").click(function(){
    $(this).hide();
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p>如果您点击我，我会消失。&lt;/p&gt;
&lt;p>点击我，我会消失。&lt;/p&gt;
&lt;p>也要点击我哦。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>       
        </div>
        <div  id="inputText"  class = 'right'>
            <iframe src="" frameborder="0" id = 'iframe_result' style = "width:100%;height:100%"></iframe>
        </div>
     </mu-flex>
  </div>
</template>

<script>
export default {
    name:'frontEnd',
    props:{

    },
    components:{

    },
    data(){
        return {
            test:"nihao"
        }
    },
    methods:{
        /**************************************************************
         * 函数名：run
         * 功能描述：点击RUN时，展示编写的HTML效果
         * 输入参数：
         * 输出参数：
         * 
         *************************************************************/
        run:function(){
            var objPre = document.getElementById("pre_result");
            var objIframe = document.getElementById("iframe_result");
            objIframe.contentDocument.open();
            objIframe.contentDocument.write(objPre.innerText);
            objIframe.contentDocument.close();
            
        }
    },
    created(){

    }
}
</script>

<style>
.fronEnd{
    background-color: #f7f7f7;
    width: 100%;
    overflow: auto;
    position: relative;
    top: 0px;
    bottom: 0px;
    height: 100%;
    border: 0px solid #000000;
    clear: both;
}
.fronEnd .left,.fronEnd .right{
    width: 100%;
    position: relative;
    background: white;
    margin: 10px;
    height: 580px;
    border: 1px outset rgba(0,0,0,0.2);
    
}
.fronEnd .left pre{
    padding: 6px;
    height: 580px;
    width: 100%;
    overflow-y: auto;
}
</style>