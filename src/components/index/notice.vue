<template>
  <div class="fullwh center-div">
    <mu-list v-if="!ready" textline="two-line">
      <mu-sub-header>最近提交列表</mu-sub-header>
      <mu-list-item class="notice-list" v-for="(item, idx) in data.noneList" :key="idx" avatar button :ripple="true">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="noneava">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title style="height: 14px;width: 100px;margin-bottom: 5px;" class="skeleton-screen"></mu-list-item-title>
          <mu-list-item-sub-title class="sub-title skeleton-screen" style="height: 14px;">
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-list v-else textline="two-line">
      <mu-sub-header>公告</mu-sub-header>
      <mu-list-item class="" v-for="(item, idx) in data.list" :key="idx" avatar button :ripple="true">

        <mu-list-item-title>通知</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import img from '../../assets/carousel.jpg'
import noneava from '../../assets/noneava.png'
export default {
  name: 'notice',
  props: {
  },
  components: {
  },
  data () {
    return {
      img: img,
      noneava: noneava,
      ready: false,
      data: {
        list: [],
        noneList: [1, 2, 3,]
      }
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(2000)

      for (let i = 0; i<10; i++) {
        this.data.list.push({
          avatar: img,
          name: '用户名',
          time: 'Jan 17, 2014',
          commitCount: 1,
          accessCount: 1,
          status: '100%',
        })
      }
      this.ready = true
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .sub-title {
    width: 100%;
    display: flex;
  }
  .sub-title span{
    margin-right: 10px;
  }
</style>
