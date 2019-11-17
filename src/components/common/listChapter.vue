
<!--
模块说明
功能：列出所有章节分类
作者：许浩培
完成时间：2019/10/22
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
-->
<template>
    <div class="listChapter" > 
        <mu-paper :z-depth="1" class="demo-list-wrap" >
            <mu-list toggle-nested>
                <mu-list-item button :ripple="true" nested :open="false" 
                v-for="(value,index) in msg.data"  :key="index">
                    <mu-list-item-title style="font-weight:bold">{{value.name}}</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down" v-show="value.cateList.length"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item button :ripple="true" slot="nested" v-for="(value,index) in value.cateList"  :key="index">
                        <mu-list-item-title>{{value.name}}</mu-list-item-title>
                    </mu-list-item>
                </mu-list-item>
            </mu-list>
        </mu-paper>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'listChapter',
    props:{},
    components:{},
    data(){
        return{
            open: 'send',
            msg:{}
        }
    },
    methods:{
        /*
        * 函数描述：获取章节数据
        * 作者：许浩培
        * 时间：2019/11/15
        */
        async getData(){
            var that = this;
            axios.get("http://localhost:8080/sys/cate/tree.json",({})).then(function(response){
                if(response.status != 200){
                    alert("获取数据失败，请确认网络是否链接正常");
                    return;
                }
                that.msg = response.data;
                //console.log(that.msg);
            });
        }
    },
    computed:{

    },
    watch:{

    },
    created () {
        this.getData();
    }
}
</script>
<style scoped>

ul{
    list-style: none;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
</style>