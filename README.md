# 前述

这个网站由8个大模块组成，每个模块中有小模块，模块之间有相互的关联。具体关联请参考如下链接的思维导图。

http://naotu.baidu.com/file/55c39a262cab5f0f0ff25743a15a0d9c?token=52e1810aabc4bdbf

注：由于部分模块不是我开发的，所以具体的功能我也不知道怎么写，所以就没写了。我开发的模块都有详细的代码注释。

# 项目下载和配置环境

1. gitHub上clone项目
2. npm i 

# 项目进入开发环境

npx vue-cli-service serve     或  npm run serve

# 项目打包

npx vue-cli-service build      或  npm run build

# 请求网络数据说明

说明：有两种请求方式，曾嘉铭师兄写的我看不懂，所以我自己写了一种。

## 我写的

```javascript
let axios_Base = axios.create({     // 设置axios的基本格式

 baseURL: 'http://47.115.54.133:8080', // 设置请求映射 例如你发出请求的url为(/api)，那么它在页面上就会进行转换，转换成 http://47.115.54.133:8080/api。如果没有设置则会转换成http://localhost:8080/api 这是为上线服务的。

 timeout: 1000,

 responseType: 'json',

 headers: {

 }

 });

Vue.prototype.$axios = axios_Base;   // 将该对象注入Vue，全局调用。
```

**请求举例**

```javascript
await Promise.all([

        this.$axios.get(`/sys/cate/tree.json`,({
        })).then(function (response) {
        if(response.status != 200){
          throw "获取数据失败，status不为200!";
        }
        that.msg = response.data;
        }).catch(function (error) {
          that.openError();
        })
     ]);
```

axios的具体用法：https://www.kancloud.cn/yunye/axios/234845

## 曾嘉铭师兄写的

**请求**

```
this.$store.dispatch('n', {
  flag: flag,  //
  method: method,
  url: `/path/${this.$route.params.id}`,
  params: {
    param1: param1
  },
  // 当请求出错时调用的方法，非必需
  recall: function,
  // 不处理网络错误
  stopHandleNetErr: true,
}),
```

**获取请求后的数据**

```
this.$store.state.n[flag].data
```

**说明**

``` this.$store.state.n ```是一个保存返回数据的对象

``` flag ``` 指定 ``` this.$store.state.n ``` 中的哪一部分数据。当有多个并发请求时，通过指定 ``` flag ``` 来区分获取到的数据

# 获取登录后的用户信息

```js
import jwtDecode from "jwt-decode";

var token =  localStorage.getItem("token")；

token = jwtDecode (token )；

console.log(token)；
```

具体用法：百度jwt解析token

# 模块说明

## 导航 

**模块入口文件：** components\headBar\headBar.vue 

**作用：**导航进入各个模块。

**发出请求的接口：**无

**注意点：**无

## OJ 

**模块入口文件：** components\common\listChapter.vue 

**作用：**列出所有章节分类

**发出请求数据的接口：**

1. /sys/cate/tree.json   获取章节分类的数据

**注意点：**无

**子模块：**无

## 前端练习 

**模块入口文件：** components\frontEnd\frontEnd.vue 

**作用：**前端练习模块

**发出请求数据的接口**：无

**注意点：**

1. 左边模块HTML的样式是使用了插件vue2-ace-editor，想要了解更加详细的方法请访问https://www.npmjs.com/package/vue2-ace-editor。

**子模块：**无

## 后端练习 

**模块入口文件：** components\problem\allProblems.vue

**作用：**主要功能是用来进来后端练习的页面（具体内容不清楚，不是我开发的）

**发出请求数据的接口：**

**注意点：**

**子模块：** 

## 考试中心 

**模块入口文件：** components\quiz\quizList.vue 

**作用：**进行考试的页面。

**发出请求数据的接口：**

1. /exam/page/${页码}/ ${单页试卷数量}    请求获取${单页试卷数量}  张试卷。

**注意点：**

1. 点击"进入考试"时，会通过router进入quiz模块。实现的函数为toQuiz (exam_id)
2. 有关试卷的显示，编辑为：不显示不进去，发布为：显示可进去，不可用为：显示不能进

**子模块：**

1. 试卷内容展示模块( components\quiz\quiz.vue )

### 试卷内容展示

**模块入口文件：** components\index\begin.vue 

**作用：**考试内容的展示。

**发出请求数据的接口：**

1. /backStageExamination/${id}  向后台获取这张试卷的所有数据。

**注意点：**

1. 这个模块包含了2个子模块，其中父模块与子模块之间有信息交换。注意我在该模块开头注释的内容。“获取 子组件的输入参数 ”+“传递给子组件的输出参数”。

**子模块：**

1. 提示模块 （components\quiz\tip.vue）
2. 答题表模块（components\quiz\answerSheet.vue）
3. 答题内容模块  (components\quiz\description.vue)   

#### 提示

**模块入口文件：** components\quiz\tip.vue 

**作用：**进行考试的温馨提示

**发出请求数据的接口：**无

**注意点：**

温馨提示的内容是死数据，没有跟后台进行有效交互。所以后面需要修改成动态数据要跟后台进行商量。

**子模块：**无

#### 答题表

**模块入口文件：**components\quiz\answerSheet.vue

**作用：**答题表，学生可以通过点击答题表上的数字快速跳转到指定题目位置。

**发出请求数据的接口：**无

**注意点：**

1. 这个模块与父模块有数据交互，注意我在该模块开头注释的内容。“获取 父组件的输入参数 ”+“传递给父组件的输出参数”。

**子模块：**无

#### 答题内容

**模块入口文件：** components\quiz\description.vue

**作用：**试卷内容的显示

**发出请求数据的接口：**

1. /object-problem/${id}  根据客观题ID请求具体数据。
2. /backStageClassProgramProblem/ ${id}  根据编程题ID请求具体数据

**注意点：**

1. 这个模块与父模块有数据交互，注意我在该模块开头注释的内容。“获取 父组件的输入参数 ”+“传递给父组件的输出参数”。

**子模块：**无

## 公告 

**模块入口文件：** components\index\begin.vue 

**作用：**公告

**发出请求数据的接口：**无

**注意点：**

公告的内容是死数据，没有跟后台进行有效交互。所以后面需要修改成动态数据要跟后台进行商量。

**子模块：**无

## 登录 

**模块入口文件：** components\common\login.vue 

**作用：**主要功能是用来进来登录的页面（具体内容不清楚，不是我开发的）

**发出请求数据的接口：**

**注意点：**

**子模块：**

# Linux下部署Vue指导

1、找一个地方新建一个文件夹，例如 叫 server-web
2、初始化环境,进入目录 /server-web,打开命令窗口，输入以下命令
	npm init -y
	npm i express -S   // 安装 express
	npm i compression -S  // 安装 compression  
	npm i pm2 -g   // 安装 pm2 管理项目
3、在server-web 目录下，新建一个启动文件，例如叫 app.js
	在文件里面，输入以下代码


```javascript
{
    const express = require('express')
    const app = express()

    const compress = require('compression')
    app.use(compress())
    
    // 这里的 dist 就是vue项目打包后的目录
    app.use(express.static('./dist'))   
    
    // 21542端口这里是网站的访问端口，到时候可根据自身需求修改 
    app.listen(21542, () => {
        console.log("server running success !!")
    })

}
```

保存

4、上传代码到服务器
首先打包项目，在本地打开项目，在控制台输入
	npm run build
	打包成功之后，会在项目的目录下面生成一个 /dist 的文件夹
	将 dist 打包发到服务器上的  server-web 目录下，解压

5、利用pm2启动项目
	pm2 start app.js --name admin-web
	
	pm2命令说明
	启动项目：pm2 start 脚本 --name 自定义名称/或者ID(这里的ID，项目启动之后，使用pm2 ls 可以查看)
	查看项目：pm2 ls
	重启项目：pm2 restart 自定义名称/或者ID
	删除项目：pm2 delete  自定义名称/或者ID

# 项目gitHub地址：

https://github.com/xuhaopei/oj

# 掉坑总结

1. 开发页面的时候要想好总体的设计再进行开发
2. 开发过程中要写好注释。
3. 开发的页面有请求到数据的话，如果后台还没开发好，一定要跟后台约定好数据格式。