<template>
  <div id="app">
    <div class="nopm fullwh app-main">
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
.app-main {
  display: flex;
  flex-direction: column;
}
</style>
