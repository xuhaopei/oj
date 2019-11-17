<!--
模块说明
功能：公告模块
作者：许浩培
完成时间：2019/10/22
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
-->
<template>
  <div class = 'begin'>
    <div class ="info">公告</div>
    <div class = 'table'>
         <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="content"
            label="内容">
        </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'begin',
    props: {
    },
    components: {
    },
    data () {
        return {
        tableData: [{
            date: '2016-05-02',
            title: '添加了JS功能',
            content: '当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。'
          }, {
            date: '..............',
            title: '..............',
            content: '..............'
          }, {
            date: '..............',
            title: '..............',
            content: '..............'
          }]
        }
    },
    methods: {
        
    },
    created () {
        
    }
}
</script>

<style>
.begin{
    position: relative;
    width: 1200px;
    margin: 0 auto;
}
.begin .info{
    color: black;
    font-size: 45px;

}
.begin .table{
    margin-bottom: 50px;
}
</style>