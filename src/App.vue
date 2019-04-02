<template>
  <div id="app">
    <div class="nopm fullwh app-main">
      <headBar></headBar>
      <router-view class="nopm view"></router-view>
    </div>
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
      ready: false
    }
  },
  methods: {
    async init () {
      await this.$store.dispatch('getUserInfo')
      this.ready = true
    }
  },
  created () {
    this.$store.dispatch('getUserInfo')
    // this.init()
  },
  mounted() {
    window.onresize = () => {
      console.log('r');
    }
},
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
.nopm {
  padding: 0px;
  margin: 0px;
}
.fullwh {
  width: 100%;
  height: 100%;
}
.view {
  
}
.center-div {
  display: flex;
  justify-content: center;
}
.center-div .center-item {
  flex-basis: 1200px;
}
.center-div .left-item {
  background-color: rebeccapurple;
}
.center-div .right-item {
  display: flex;
  padding: 20px;
  position: fixed;
  width: calc((100vw - 1200px)/2);
  right: 0px;
  min-width: 200px;
}
.app-main {
  display: flex;
  flex-direction: column;
}
.skeleton-screen {
  background-color: #ebecf0;
}
</style>
