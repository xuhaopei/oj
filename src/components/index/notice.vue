<template>
  <div class="nopm fullwh notice center-div">
    <mu-container>
      <mu-expansion-panel>
        <div slot="header">Panel 1</div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        <mu-button slot="action" flat>Cancel</mu-button>
        <mu-button slot="action" flat color="primary">Save</mu-button>
      </mu-expansion-panel>
      <mu-expansion-panel>
        <div slot="header">Panel 2</div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </mu-expansion-panel>
      <mu-expansion-panel>
        <div slot="header">Panel 3</div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </mu-expansion-panel>
    </mu-container>
  </div>
</template>

<script>
import img from '../../assets/carousel.jpg'
export default {
  name: 'notice',
  props: {
  },
  components: {
  },
  data () {
    return {
      img: img,
      ready: true,
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
  .notice {
    
  }
</style>
