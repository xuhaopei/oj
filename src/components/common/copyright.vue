<template>
  <div class="bottom">
    <div class="row">
      <span>版权说明</span>
    </div>
    <div class="row">
      <span>版权说明</span>
    </div>
    <div class="row">
      <span>版权说明</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
  .bottom {
    width: 100%;
  }
  .bottom .row {
    display: flex;
    justify-content: center;
  }
  .bottom .row span {
    color: #737373;
  }
</style>
