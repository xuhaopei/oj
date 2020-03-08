<!--
模块说明
功能：OJ的导航模块
原作者：曾嘉铭
修改者：许浩培
完成时间：2019/11/15
获取  父组件的输入参数：
传递给父组件的输出参数：
传递给子组件的输入参数：
listChapter
login：needCloseLogin
-->
<template>
  <div class="headBar">
    
    <mu-appbar :z-depth='0' style="width: 1200px;background-color: #222222;margin-right: 16px;" color="primary">
      
      <!-- <span style="font-size: 150%;" slot="left">
        {{$store.state.userInfo.name}}
      </span> -->
      <!-- <mu-button flat @click="$router.push({name: 'index'})" slot="left">
        <span style="font-size: 150%;">主页</span>
      </mu-button> -->
      <mu-button  @click="showAside" icon slot="left">
        <img :src="imgURL" alt="" style="width:40px;height:30px;">
      </mu-button>
      <mu-button flat @click="$router.push({path:'/frontEnd'})" slot="left">
        <span style="font-size: 130%;">前端练习</span>
      </mu-button>
      <mu-button flat @click="$router.push({name: 'allProblems'})" slot="left">
        <span style="font-size: 130%;">后端练习</span>
      </mu-button>
      <mu-button flat @click="$router.push({name: 'quizList'})" slot="left">
        <span style="font-size: 130%;">考试中心</span>
      </mu-button>
      <mu-button flat @click="$router.push({name: 'begin'})" slot="right">
        <span style="font-size: 130%;">公告</span>
      </mu-button>
      <mu-button flat @click="showLogin" slot="right">
        <span style="font-size: 130%;">{{userInfo.name}}</span>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="show.aside" :docked="false" :left="true">
      <mu-list>
        <list-chapter v-show="show.listChapter"></list-chapter>
        <mu-list-item button @click="logout">
          <mu-list-item-title v-show="show.title">退出登录</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-dialog title="登录" width="360" :open.sync="show.login">
      <login :needCloseLogin.sync="needCloseLogin"></login>
    </mu-dialog>
    <mu-snackbar style="margin: 8px 0;" snack.position="snack.postition" :open.sync="snack.open" :color='snack.type'>
      <mu-icon left :value="snack.icon"></mu-icon>
      {{snack.msg}}
    </mu-snackbar>
  </div>
  
</template>

<script>
import listChapter from '../common/listChapter.vue'
import login from '../common/login.vue'
export default {
  name: 'headBar',
  props: {
  },
  components: {
    login,
    listChapter,
  },
  data () {
    return {
      show: {
        aside: false,
        login: false,
        imgURL:'',
        listChapter:false,
        title:false
      },
      needCloseLogin: 1,
      snack: {
        msg: '获取用户信息中',
        type: '',
        open: false,
        icon: '',
        position: 'bottom',
      },
      userInfo: {
        name: '登录',
        isLogin: false,
      }
    }
  },
  methods: {
    /*
     * 函数描述：如果用户没有登录，不显示
     * 作者：许浩培
     * 时间：2019/11/15
     */
    showAside () {
      this.show.aside = true;
      if (this.userInfo.isLogin == true) {
          this.show.title = true;
      } 
    },
    showLogin () {
      if (this.userInfo.isLogin) {
        return
      }
      this.show.login = true
    },
		sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async getUserMsg () {
      // 获取用户信息
      this.snack.msg = '登录成功,获取用户信息中'
      this.snack.icon = 'info'
      this.snack.open = true
      await this.$store.dispatch('getUserInfo')
      if (this.$store.state.userInfo.name === '') {
        this.userInfo.name = '登录'
        this.snack.icon = 'warning'
        this.snack.msg = '获取用户信息失败'
        await this.sleep(1000)
        this.snack.open = false
      } else {
        this.userInfo = this.$store.state.userInfo
        this.snack.icon = 'check_circle'
        this.snack.msg = '已获取用户信息'
        await this.sleep(1000)
        this.snack.open = false
      }
    },
    logout () {
      localStorage.removeItem("token")
      this.userInfo.name = '登录'
      this.userInfo.isLogin = false
      this.$nextTick(function () {
        this.show.aside = false
      })
      this.$router.push({name: 'begin'});
    },
    /*
     * 函数描述：通过地址变化控制只有进入后端练习，即url为(/allProblems)时，listChapter组件显示出来
     * 作者：许浩培
     * 时间：2019/11/15
     */
    isShowlistChapter () {
      var path = this.$route.path;
      if(typeof path == 'undefined'){
        return;
      }
      if (path.search('allProblems') > -1) {
        this.show.listChapter = true;
      } else {
        this.show.listChapter = false;
      }
    },
    /*
     * 函数描述：如果变化的地址有参数，但是用户没有登录，不允许进入，跳回公告页面并弹出提示框要求登录。
     * 作者：许浩培
     * 时间：2019/11/15
     */
    isLogin () {
      var params = this.$route.params.id;
      var pattern = /\d/g;
      if(typeof params == 'undefined'){
        return;
      }
      if(params.search(pattern) > -1){
        if (this.userInfo.isLogin == false) {
          this.$router.push({name: 'begin'});
          this.$alert('请您先登录', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.show.login = true;
          }
          });
        } 
      }
     
    },
  },
  computed: {
    needUpdateUserInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {
    needCloseLogin: function () {
      this.show.login = false
      // this.$message({
      //   message: '登录成功',
      //   type: 'success'
      // });
      this.getUserMsg()
    },
    needUpdateUserInfo: function () {
      this.userInfo.name = this.$store.state.userInfo.name
      this.userInfo.isLogin = this.$store.state.userInfo.isLogin
    },
    /*    
     * 函数描述：监听URL地址变化,如果变化，进行一系列操作
     * 作者：许浩培
     * 时间：2019/11/15
     */
    $route() {

      this.isShowlistChapter();
      
      //this.isLogin();
     
      //console.log(this.$route.path);   获取地址
      //console.log(this.$route.params); 获取地址参数

    }
  },
  created(){
    this.imgURL = require('../../assets/OJ.png')
  }
}
</script>

<style scoped>
  .headBar {
    height: 65px;
    display: flex;
    justify-content: center;
    background-color: #222222;
  }
</style>
