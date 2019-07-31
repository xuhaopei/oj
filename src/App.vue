<template>
  <div id="app">
    <div class="app-main">
      <headBar></headBar>
      <router-view></router-view>
    </div>
    <!-- <mu-snackbar position="top" :color='$store.state.n.msgColor' :open="$store.state.n.showMsg">
      {{$store.state.n.msg}}
    </mu-snackbar> -->
  </div>
</template>

<script>
import headBar from './components/headBar/headBar.vue'
export default {
  name: 'app',
  components: {
    headBar,
  },
  data () {
    return {
      ready: false,
    }
  },
  computed: {
    needShowMsg () {
      return this.$store.state.msg
    },
  },
  watch: {
    needShowMsg (newVal) {
      this.$message({
        title: newVal.title,
        message: newVal.message,
        type: newVal.type,
      });      
    }
  },
  methods: {
    async init () {
			if(!window.localStorage){
				alert('浏览器不支持或禁用了localStorage,浏览时可能会出现问题')
			}
      await this.$store.dispatch('getUserInfo')
      this.ready = true
    }
  },
  created () {
    this.$store.dispatch('getUserInfo')
    // this.init()
  },
  mounted() {
    // window.onresize = () => {
    //   // console.log('r');
    // }
},
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
#app-main {
  display: flex;
  flex-direction: column;
}
.fullwh {
  height: 100%;
  width: 100%;
}
.main-view {
  overflow-y: scroll;
  height: calc(100vh - 64px);
}
.center-div {
  display: flex;
  justify-content: center;
}
.center-div .center-item {
  flex-basis: 1200px;
}
/* .center-div .left-item {
  background-color: rebeccapurple;
}
.center-div .right-item {
  display: flex;
  padding: 20px;
  position: fixed;
  width: calc((100vw - 1200px)/2);
  right: 0px;
  min-width: 200px;
} */
.skeleton-screen {
  background-color: #ebecf0;
}
</style>
