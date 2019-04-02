<template>
  <div class="nopm fullwh index center-div">
    <div class="center-item">
      <div v-show="true" class="row1">
        <div class="carousel-div">
          <div :class="`${ready?'':'skeleton-screen'} fullwh`">
            <div v-if="ready" class="fullwh">
              <mu-carousel style="widht: 100%;height: 100%" transition="fade">
                <mu-carousel-item>
                  <img class="fullwh" :src="img">
                </mu-carousel-item>
              </mu-carousel>
            </div>
          </div>
        </div>
        <div class="quote-div">
          <div :class="`${ready?'':'skeleton-screen'} fullwh`">
            <div class="fullwh">
              <mu-card v-if="ready" style="height: 100%;width: 100%;">
                <mu-card-media title="Image Title" sub-title="
                  散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                  调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                  似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                  找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！">
                    <img :src="img">
                </mu-card-media>
                <!-- <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
                <mu-card-text>
                  散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                  调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                  似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                  找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text> -->
              </mu-card>
            </div>
          </div>
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
    </div>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
import copyright from '../common/copyright.vue'
import dynamic from './dynamic.vue'
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
      await sleep(2000)
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
    /* width: 100vw;
    height: 100vh; */
    padding: 20px;
  }
  .index {
    display: flex;
    justify-content: center;
  }
  .row1 {
    display: flex;
    height: 400px;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .row2 {
    display: flex;
    height: 400px;
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
