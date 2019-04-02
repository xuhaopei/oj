<template>
  <div class="quote">
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
</template>

<script>
import img from '../../assets/carousel.jpg'
export default {
  name: 'quote',
  props: {
  },
  components: {
  },
  data () {
    return {
      img: img,
      ready: false,
      data: {
        list: [],
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
  .quote {
    width: 100%;
    height: 100%;
  }
</style>
