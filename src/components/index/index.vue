<template>
  <div class="index main-view center-div">
    <div class="center-item">
      <div v-show="true" class="row1">
        <div class="carousel-div">
          <carousel></carousel>
        </div>
        <div class="quote-div">
          <quote></quote>
        </div>
      </div>
      <div class="row2">
        <div class="current-div">
          <dynamic class="fullwh"></dynamic>
        </div>
        <div class="announcement-div">
          <notice></notice>
        </div>
      </div>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
import copyright from '../common/copyright.vue'
import carousel from './carousel.vue'
import dynamic from './dynamic.vue'
import quote from './quote.vue'
import notice from './notice.vue'
import img from '../../assets/carousel.jpg'
export default {
  name: 'index',
  props: {
  },
  components: {
    codeEditor,
    copyright,
    dynamic,
    notice,
    quote,
    carousel,
  },
  data () {
    return {
      img: img,
      ready: false,
      data: {
      }
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      this.ready = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .index {
    padding: 20px;
  }
  .index {
    display: flex;
    justify-content: center;
  }
  .row1 {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .row2 {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .carousel-div {
    height: 400px;
    width: 800px;
    padding: 10px;
  }
  .quote-div {
    padding: 10px;
    width: 400px;
    /* width: calc(100vw - 1240px); */
    height: 400px;
  }
  .current-div {
    height: 400px;
    width: 600px;
    padding: 10px;
  }
  .announcement-div {
    height: 400px;
    width: 600px;
    padding: 10px;
  }
</style>
