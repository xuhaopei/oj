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
                  
                    <!-- row-style="background-color: #bebebe;" -->
                  <el-table
                    :data="data.codeProblemsList.list"
                    style="width: 100%">
                    <el-table-column
                      width="70"
                      v-if="this.$_env.testUserInfo.uid!==null"
                      prop="name"
                      label="状态">
                      <template slot-scope="scope">
                        <span class="accepted table-link" v-if="scope.row.status==='AC'">
                          <i class="el-icon-check" style="color: rgb(25, 190, 107);"></i>
                        </span>
                        <span class="unaccepted table-link" v-if="scope.row.status===2">
                          <i class="el-icon-minus" style="color: rgb(255, 153, 0);"></i>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="标题"
                      width="350">
                      <template slot-scope="scope">
                        <el-button type="text" @click="toProblem(scope.row)">{{scope.row.title}}</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="runtime"
                      label="提交次数">
                      <template slot-scope="scope">
                        <span>{{scope.row.submit_times}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="通过率">
                      <template slot-scope="scope">
                        <span>{{ scope.row._percentage }}%</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="难度">
                      <template slot-scope="scope">
                        <el-tag size='small' :type="scope.row._difficultFlag">{{scope.row._difficult}}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="bottom-control">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.program.page_num"
                    :page-sizes="options.pageSize"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="data.codeProblemsList.total">
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
            <mu-button v-loading="subReady.screen" @click="screen" color="primary">筛选</mu-button>
            <mu-select @change="getData" class="pageSizeSelect" label="" v-model="data.difficult" full-width>
              <mu-option v-for="(option,index) in options.difficult" :key="index" :label="option.label" :value="option.value"></mu-option>
            </mu-select>
          </div>
          <div class="filter-row">
            <mu-text-field  v-model="filter.keyword" style="width: 100%;" placeholder="关键字" ></mu-text-field>
          </div>
          <div class="filter-row-tag">
            <div v-if="subReady.filter">
              <!-- <mu-chip @click="handleTagClick(item)" class="item" :color="`${item.deleted==0?'#ffffff':'#e6e6e6'}`" 
                :text-color="`${item.selected?'#2d8cf0':'#333333'}`"
                v-for="(item, idx) in filter.tag" :key='idx' 
                round :ripple='false'>
                <span class="tag-content">{{item.tag_name}}</span><mu-badge :content="`${item.used_times}`" color="#61a9a7"></mu-badge>
              </mu-chip> :type="`${item.deleted==0?'primary':'s'}`"-->
              <el-badge class="tag-badge" v-for="(item, idx) in filter.tag" :key='idx' 
                :value="item.used_times" type="primary">
                <el-tag @click="handleTagClick(item)" :class="`${item.isSelected?'tag-selected':'tag-unselected'}`">
                  {{item.tag_name}}
                </el-tag>
              </el-badge>
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
        screen: false,
      },
      data: {
        tags: [],
        unready: [0, 1, 2, 3],
        difficult: 1,
        codeProblemsList: {
          list: [],
          page: 1,
          total: null,
        },
        noneFilter: [1, 2, 3, 4, 5, ]
      },
      options: {
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
        selectedTat: [],
      },
      active: 0,
    }
  },
  methods: {
    async init () {
			// const sleep = (ms) => {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await sleep(1000)
      await Promise.all([
        this.getData(),
        this.getFilterTag(),
      ])
      this.ready = true
    },
    async getFilterTag() {
      this.subReady.filter = false
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 1,
          method: 'get',
          url: `/program-tags`,
          params: {
          }
        }),
      ])
      // this.filter.tag = this.$store.state.n[1].data
      let temp = []
      for (const i of this.$store.state.n[1].data) {
        // deleted	0
        // gmt_create	1552931096000
        // gmt_modified	1556245604000
        // program_tag_id	1
        // tag_name	标签111
        // used_times	2
        temp.push({
          tag_name: i.tag_name,
          id: i.program_tag_id,
          isSelected: false,
          used_times: i.used_times,
        })
      }
      this.filter.tag = temp
      this.$nextTick(function () {
        this.subReady.filter = true
      })
    },
    async screen () {			
      // this.$store.dispatch('n', {
			// 	method: 'get',
			// 	url: '',
			// 	params: {
					
			// 	}
      // })
      this.subReady.screen = true
      await this.getData()
      this.subReady.screen = false
    },
    async getData () {
      switch (this.active) {
        case 0: {
          this.data.codeProblemsList.list = []
          this.subReady.codeProblemsList = false

          // 处理标签参数
          let t = []
          for (const i of this.filter.tag) {
            if (i.isSelected) {
              t.push(i.id)
            }
          }
          this.params.program.tagList = t.length===0?null:t.join(',')
          await Promise.all([
            this.$store.dispatch('n', {
              flag: 0,
              method: 'get',
              url: `/program-problems`,
              params: {
                page_num: this.params.program.page_num,
                page_size: this.params.program.page_size,
                difficult: this.params.program.difficult,
                query: this.filter.keyword,
                tag_list: this.params.program.tagList,
                uid: this.$_env.testUserInfo.uid,
              }
            }),
          ])
          if (!this.$store.state.n[0].success) return
          for (const i of this.$store.state.n[0].data.data) {
            let _difficult, _difficultFlag, _percentage
            switch (i.difficult) {
              case 1: {
                _difficult = '简单'
                _difficultFlag = 'success'
              }
              case 2: {
                _difficult = '中等'
                _difficultFlag = ''
              }
              case 3: {
                _difficult = '困难'
                _difficultFlag = 'danger'
              }
            }
            i._difficult = _difficult
            i._difficultFlag = _difficultFlag
            i._percentage = (i.ac_times / i.submit_times)
            i._percentage = i._percentage!==NaN?'0.00':i._percentage.toFixed(2)
          }
          this.data.codeProblemsList.list = this.$store.state.n[0].data.data
          this.data.codeProblemsList.total = this.$store.state.n[0].data.total
          this.$nextTick(function () {
            this.subReady.codeProblemsList = true
          })
          break;
        }
      
        default:
          break;
      }
    },
    async handleTagClick (data) {
      for (const i of this.filter.tag) {
        if (i.id === data.id) {
          i.isSelected = !data.isSelected
        }
      }
      this.getData()
    },

    async handleSizeChange(val) {
      this.params.page_size = val
      await Promise.all([
        this.getData(),
        this.getFilterTag(),
      ])
    },
    async handleCurrentChange(val) {
      this.params.page_num = val
      await Promise.all([
        this.getData(),
        this.getFilterTag(),
      ])
    },
    problemsRowClass () {
      return 'problems-row'
    },
    toProblem (data) {
      this.$router.push({
        name: 'problems',
        params: {
          id: `${data.program_problem_id}`,
        }
      })
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
    margin-bottom: 20px;
  }
  .el-table__body tr:hover {
    background-color: rgb(10, 11, 12);
  }
  .accepted {
    color: #009688;
  }
  .unaccepted {
    color: #c62928;
  }
  .tag-badge {
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .tag-unselected {
    color: #2d8cf0;
    background-color: #ffffff;
  }
  .tag-unselected:hover {
    cursor: pointer;
  }
  .tag-selected {
    color: #333333;
    background-color: #e6e6e6;
  }
  .tag-selected:hover {
    cursor: pointer;
  }
</style>
