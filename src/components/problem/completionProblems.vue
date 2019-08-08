<template>
  <div v-if="ready" class="completionProblems">
    <div v-for="i in tag" :key="i">
      {{i}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'completionProblems',
  props: {
    tag: Array,
  },
  components: {
  },
  data () {
    return {
      ready: false,
      params: {
        page: 1,
        pageSize: 20,
      }
    }
  },
  watch: {
    tag () {
      this.getData()
    },
  },
  methods: {
    async init () {
      await this.getData()
      this.ready = true
    },
    async getData () {
      const tempTag = this.tag.length===0?null:this.tag.join(',')
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 20,
          method: 'get',
          url: `/object-problems`,
          params: {
            page_num: this.params.page,
            page_size: this.params.pageSize,
            type: 0,
            tag_list: tempTag,
          }
        }),
      ])
    },
    handleSortChange () {

    },
    toProblem (data) {
      this.$router.push({
        name: 'problems',
        params: {
          id: `${data.id}`,
        }
      })
    }
  },
  created () {
    this.init()
  },
}
</script>

<style scoped>
  .completionProblems {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
