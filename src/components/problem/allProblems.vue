<template>
  <div class="allProblems main-view center-div">
    <div class="center-item">
      <div class="display">
        <div class="display-item-left">
          <mu-tabs inverse color="#000000" indicator-color='#93989c' text-color="rgba(0, 0, 0, .54)" :value.sync="active">
            <!-- <mu-tab>全部</mu-tab> -->
            <mu-tab>编程</mu-tab>
            <mu-tab>填空</mu-tab>
            <mu-tab>选择</mu-tab>
          </mu-tabs>
          <div class="show-problems">
            <codeProblemsList
             v-if="active===0" :ready='subReady.codeProblemsList' :data='data.codeProblemsList'>
            </codeProblemsList>
          </div>
        </div>
        <div class="display-item-right">
          <div class="filter-row">
            <mu-button color="primary">筛选</mu-button>
            <mu-select @change="getData" class="pageSizeSelect" label="" v-model="filter.pageSize" full-width>
              <mu-option v-for="(option,index) in filter.pageSizeOption" :key="index" :label="option.label" :value="option.value"></mu-option>
            </mu-select>
          </div>
          <div class="filter-row">
            <mu-text-field  v-model="filter.keyword" style="width: 100%;" placeholder="关键字" ></mu-text-field>
          </div>
          <div class="filter-row-tag">
            <div v-if="subReady.filter">
              <mu-chip @click="handleTagClick(item)" class="item" :color="`${item.selected?'#bebebe':'#868282'}`" 
                :text-color="`${item.selected?'#000000':'ffffff'}`"
                v-for="(item, idx) in filter.tag" :key='idx' 
                round :ripple='false'>
                <span class="tag-content">{{item.tag}}</span><mu-badge :content="`${item.count}`" color="#61a9a7"></mu-badge>
              </mu-chip>
            </div>
            <div class='filter-row-tag' v-else>
              <div v-for="item in data.noneFilter" :key='item' 
                class='item skeleton-screen nofilter'>
              </div>
            </div>
          </div>
        </div>
      </div>
      <copyright v-if="ready"></copyright>
    </div>
  </div>
</template>

<script>
import codeProblemsList from './codeProblemsList.vue'
import copyright from '../common/copyright.vue'
export default {
  name: 'allProblems',
  props: {
  },
  components: {
    codeProblemsList,
    copyright,
  },
  data () {
    return {
      ready: false,
      subReady: {
        codeProblemsList: false,
        filter: false,
      },
      data: {
        codeProblemsList: {
          list: [],
          page: 1,
        },
        noneFilter: [1, 2, 3, 4, 5, ]
      },
      filter: {
        keyword: '',
        tag: [],
        pageSize: 20,
        pageSizeOption: [
          {
            label: '每页20项',
            value: 20,
          },
          {
            label: '每页30项',
            value: 30,
          },
          {
            label: '每页50项',
            value: 50,
          },
        ],
      },
      active: 0,
    }
  },
  methods: {
    async init () {
      
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      await Promise.all([
        this.getData(),
        this.getFilterTag(),
      ])
      this.ready = true
    },
    async getFilterTag() {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
      this.subReady.filter = false
      let t = ['数组', '排序', '动态规划', '树', '图', '动态规划', '树', '图', '数组', '排序', '动态规划', '树', '图', 
      '数组', '排序', '数组', '排序', '动态规划', '树', '图', ]
      let selected = false
      for (let idx = 0; idx < t.length; idx++) {
        const element = t[idx]
        this.filter.tag.push({
          id: idx,
          tag: element,
          selected: selected,
          count: 100,
        })
        selected = !selected
        this.$nextTick(function () {
           this.subReady.filter = true
        })
      }
    },
    async getData() {
      switch (this.active) {
        case 0:
          this.data.codeProblemsList.list = []
          this.subReady.codeProblemsList = false
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(1000)
          let t = []
          for (let i = 0; i < 20; i++) {
            t.push({
              id: i,
              title: '这是问题的题目',
              accept: '80',
            })
          }
          this.data.codeProblemsList.list = t
          this.$nextTick(function () {
            this.subReady.codeProblemsList = true
          })
          //this.subReady.codeProblemsList = true
          break;
      
        default:
          break;
      }
    },
    async handleTagClick (data) {
      for (const i of this.filter.tag) {
        if (i.id === data.id) {
          data.selected = !data.selected
        }
      }
      this.getData()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .allProblems {
    padding-top: 20px;
  }
  .allProblems .display {
    display: flex;
    width: 100%;
  }
  .allProblems .display .display-item-left{
    width: 75%;
  }
  .allProblems .display .display-item-right{
    width: 25%;
    padding-left: 20px;
    padding-top: 40px;
  }
  .allProblems .display .display-item-right .filter-row {
    display: flex;
    margin-bottom: 20px;
  }
  .allProblems .display .display-item-right .filter-row .pageSizeSelect {
    width: 100px;
    margin-left: 20px;
  }
  .allProblems .display .display-item-right .filter-row-tag {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .allProblems .display .display-item-right .filter-row-tag .item {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .allProblems .display .display-item-right .filter-row-tag .nofilter {
    width: 80px;
    height: 32px;
  }
  
  .allProblems .display .display-item-right .filter-row-tag .item .tag-content {
    margin-right: 5px;
  }
  .t {
    
    background-color: #bebebe
  }
  .show-problems {
    padding-top: 20px;
  }
</style>
