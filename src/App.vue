<template>
  <div id="app">
    <div class="nopm fullwh app-main">
      <div>

      </div>
      <headBar></headBar>
      <router-view class="nopm fullwh"></router-view>
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
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
.nopm {
  padding: 0px;
  margin: 0px;
}
.fullwh {
  width: 100%;
  height: 100%;
}
.center-div {
  display: flex;
  justify-content: center;
}
.center-item {
  width: 1200px;
}
.app-main {
  display: flex;
  flex-direction: column;
}
.skeleton-screen {
  background-color: #ebecf0;
}
</style>
