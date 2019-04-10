<template>
  <div class="carousel">
    <div :class="`${ready?'':'skeleton-screen'} fullwh`">
      <div v-if="ready" style="width: 100%;height: 100%">
        <mu-carousel style="widht: 100%;height: 100%" transition="fade">
          <mu-carousel-item>
            <img style="width: 100%;height: 100%" :src="img">
          </mu-carousel-item>
        </mu-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import img from '../../assets/carousel.jpg'
export default {
  name: 'carousel',
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
  .carousel {
    width: 100%;
    height: 100%;
  }
</style>
