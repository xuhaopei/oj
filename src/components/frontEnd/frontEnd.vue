<!--
模块说明
功能：前端练习模块
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
作者：许浩培
完成时间：2019/11/18
-->
<template>
  <div class = 'fronEnd'>
      <mu-button flat large   color="success" v-on:click="run" >Run</mu-button>
      <mu-flex  justify-content="between">
        <div class = 'left' id = "pre_result" >
            <editor  v-model="content" @init="editorInit" lang="html" theme="chrome" width="100%" height="100%" ></editor>   
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
        editor: require('vue2-ace-editor'),
        
    },
    data(){
        return {
            content:'<!DOCTYPE html>\n'+
                    '<html lang="en">\n'+
                    '<head>\n'+
                    '<meta charset="UTF-8">\n'+
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
                    '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n'+
                    '<style>\n'+
                    '</style>\n'+
                    '</head>\n'+
                    '<body>\n'+
                    '</body>\n'+
                    '</html>'
        }
    },
    methods:{
        
        /*
         * 函数描述：点击RUN时，展示编写的HTML效果
         * 作者：许浩培
         * 时间：2019/11/18
         */
        run:function(){

            var objIframe = document.getElementById("iframe_result");
            objIframe.contentDocument.open();
            objIframe.contentDocument.write(this.content);
            objIframe.contentDocument.close();
            
        },
        /*
         * 函数描述：这是导入vue2-ace-editor后使用的方法，根据官网https://www.npmjs.com/package/vue2-ace-editor配置的
         * 作者：许浩培
         * 时间：2019/11/18
         */ 
        editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/less')
            require('brace/theme/chrome')
            require('brace/snippets/javascript') //snippet
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