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
            <div v-if="active===0">
              <div v-if='subReady.codeProblemsList'>
                <div style="width: 100%;">
                  <el-table
                    :data="data.codeProblemsList.list"
                    border
                    style="width: 100%">
                    <el-table-column
                      label="题目"
                      width="180">
                      <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="runtime"
                      label="提交时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.submit_times}}ms</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="状态">
                      <template slot-scope="scope">
                        <span class="accepted table-link" @click="toSubmissionsDetail(scope.row)" v-if="scope.row.status==='AC'">Accepted</span>
                        <span class="unaccepted table-link" @click="toSubmissionsDetail(scope.row)" v-if="scope.row.status===2">Error</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="通过时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.ac_times}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="难度">
                      <template slot-scope="scope">
                        <span>{{ ((d) => {
                            switch (d) {
                              case 2: {
                                return '简单'
                              }
                              case 3: {
                                return '困难'
                              }
                            }
                          })(scope.row.difficult) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="bottom-control">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.pageNum"
                    :page-sizes="options.pageSize"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="data.total">
                  </el-pagination>
                </div>
              </div>
              <div v-else class="history">
                <div style="height: 100%;width: 100%;">
                  <div v-for="item in data.unready" :key='item' class="skeleton-screen skeleton-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="display-item-right">
          <div class="filter-row">
            <mu-button @click="screen" color="primary">筛选</mu-button>
            <mu-select @change="getData" class="pageSizeSelect" label="" v-model="data.difficult" full-width>
              <mu-option v-for="(option,index) in options.difficult" :key="index" :label="option.label" :value="option.value"></mu-option>
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
        tags: [],
        unready: [0, 1, 2, 3, 4, 5],
        difficult: 1,
        codeProblemsList: {
          list: [],
          page: 1,
          total: null,
        },
        noneFilter: [1, 2, 3, 4, 5, ]
      },
      options: {
        pageNum: [
          {
            label: '20条',
            value: 20,
          },
          {
            label: '50条',
            value: 50,
          },
        ],
        pageSize: [20, 50],
        difficult: [
          {
            label: '全部难度',
            value: 1,
          },
          {
            label: '简单',
            value: 2,
          },
          {
            label: '中等',
            value: 3,
          },
          {
            label: '困难',
            value: 4,
          },
        ]
      },
      params: {
        program: {
          page_num: 1,
          page_size: 20,
          difficult: null,
          query: null,
          tagList: null,
          uid: this.$_env.testUserInfo.uid,
        }
      },
      filter: {
        keyword: '',
        tag: [],
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
    async screen () {			
      this.$store.dispatch('n', {
				method: 'get',
				url: '',
				params: {
					
				}
			})
    },
    async getData () {
      switch (this.active) {
        case 0: {
          this.data.codeProblemsList.list = []
          this.subReady.codeProblemsList = false
          // const sleep = (ms) => {
          //   return new Promise(resolve => setTimeout(resolve, ms))
          // }
          // await sleep(1000)
          // let t = []
          // for (let i = 0; i < 20; i++) {
          //   t.push({
          //     id: i,
          //     title: '这是问题的题目',
          //     accept: '80',
          //   })
          // }
          await Promise.all([
            this.$store.dispatch('n', {
              flag: 0,
              method: 'get',
              url: `/programProblems`,
              params: {
                page_num: this.params.program.page_num,
                page_size: this.params.program.page_size,
                difficult: this.params.program.difficult,
                query: this.params.program.query,
                tagList: this.params.program.tagList,
                uid: this.$_env.testUserInfo.uid,
              }
            }),
          ])
          if (!this.$store.state.n[0].success) return
          
          this.data.codeProblemsList.list = this.$store.state.n[0].data.data
          this.data.codeProblemsList.total = this.$store.state.n[0].data.total
          // console.log('this.data.codeProblemsList.list', this.data.codeProblemsList.list);
          
          this.$nextTick(function () {
            this.subReady.codeProblemsList = true
          })
          //this.subReady.codeProblemsList = true
          break;
        }
      
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
    },
    async handleSizeChange(val) {

    },
    async handleCurrentChange(val) {

    },
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
  .bottom-control {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .skeleton-item {
    height: 36px;
    width: 100%;
    margin-bottom: 10px;
  }
</style>
