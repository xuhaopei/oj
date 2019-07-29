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
        <span style="font-size: 150%;">登录</span>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="show.aside" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-dialog title="登录" width="360" :open.sync="show.login">
      <login :needCloseLogin.sync="needCloseLogin"></login>
    </mu-dialog>
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
    }
  },
  methods: {
    showAside () {
      this.show.aside = true
    },
    showLogin () {
      this.show.login = true
    }
  },
  watch: {
    needCloseLogin: function () {
      this.show.login = false
      this.$message({
        message: '登录成功',
        type: 'success'
      });
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
