<template>
  <div class="headBar">
    <mu-appbar :z-depth='0' style="width: 1200px;background-color: #222222;margin-right: 16px;" color="primary">
      <mu-button @click="showAside" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <!-- <span style="font-size: 150%;" slot="left">
        {{$store.state.userInfo.name}}
      </span> -->
      <mu-button flat @click="$router.push({name: 'index'})" slot="left">
        <span style="font-size: 150%;">主页</span>
      </mu-button>
      <mu-button flat @click="$router.push({name: 'allProblems'})" slot="left">
        <span style="font-size: 150%;">题目列表</span>
      </mu-button>
      <mu-button flat @click="$router.push({name: 'quizList'})" slot="left">
        <span style="font-size: 150%;">考试中心</span>
      </mu-button>
      <mu-button flat @click="showLogin" slot="right">
        <span style="font-size: 150%;">{{userInfo.name}}</span>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="show.aside" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button @click="logout">
          <mu-list-item-title >退出登录</mu-list-item-title>
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
import login from '../common/login.vue'
export default {
  name: 'headBar',
  props: {
  },
  components: {
    login,
  },
  data () {
    return {
      show: {
        aside: false,
        login: false,
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
    showAside () {
      this.show.aside = true
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
    }
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
  },
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
