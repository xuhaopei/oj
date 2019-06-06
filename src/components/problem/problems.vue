<template>
  <div class="problems">
    <div class="content" :style="`width: ${style.content.width}px`" >
      <div class="displayContent">
        <mu-bottom-nav color='#222222' :value.sync="active">
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}`" :value="0" title="描述" icon="description"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="1" title="提交历史" icon="history"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="2" title="测试代码" icon="question_answer"></mu-bottom-nav-item>
          <mu-bottom-nav-item :to="`/problems/${$route.params.id}/history`" :value="3" title="讨论" icon="insert_comment"></mu-bottom-nav-item>
        </mu-bottom-nav>
        <div v-show="active===0" style="width: 100%;height: calc(100% - 56px);">
          <description v-show="active===0"></description>
        </div>
        <div v-show="active===1" style="width: 100%;height: calc(100% - 56px);">
          <router-view></router-view>
        </div>
        <div v-show="active===2" style="width: 100%;height: calc(100% - 56px);">
          
        </div>
      </div>
    </div>
    <span @mousedown="handleDragStart" @mousemove="handleDrag" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" class="resize-column"></span>
    <div class="code" :style="`width: ${style.code.width}px`">
      <codeEditor :codeInfo.sync='data.codeInfo' :commitFlag.sync='needCommit' :committing='subReady.committing'></codeEditor>
    </div>
    <mu-snackbar style="margin: 8px 0;" snack.position="snack.postition" :open.sync="snack.open" :color='snack.type'>
      <mu-icon left :value="snack.icon"></mu-icon>
      {{snack.msg}}
    </mu-snackbar>
  </div>
</template>

<script>
import codeEditor from '../common/codeEditor.vue'
import description from './description.vue'
// import displayContent from './displayContent.vue'
export default {
  name: 'problems',
  props: {
    id: String,
  },
  components: {
    codeEditor,
    description,
    // displayContent,
  },
  data () {
    return {
      refresh: true,
      ready: false,
      dragData: {
        dragging: false,
        sx: null,
        sy: null,
      },
      showProblemSubmissions: false,
      style: {
        content: {
          width: '',
        },
        code: {
          width: '',
        }
      },
      data: {
        codeInfo: {
          code: '',
          lang: '',
        },
        judgementResId: '',
        judgementProcess: null,
        judgementRes: null,
      },
      submissionsResIdToProblemSubmissions: '',
      subReady: {
        committing: false,
      },
      snack: {
        msg: '',
        type: '',
        open: false,
        icon: '',
        position: 'bottom',
      },
      notification: ``,
      retryGettingJudgementTime: 1000,
      needCommit: 1,
      active: 0,
    }
  },
  watch: {
    // 提交试题
    needCommit: async function () {
      this.subReady.committing = true
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 0,
          method: 'post',
          url: `/code/user`,
          headers: {
            authorization: this.$_env.testUserInfo.token,
            charset: 'utf-8',
          },
          params: {
            "examination_id": 0,
            "group_id": 0,
            "lang": this.data.codeInfo.lang,
            // "pid": this.$route.params.id,
            "pid": this.$_env.testUserInfo.testUserCodePid,
            "source_code": this.data.codeInfo.code
          }
        }),
      ])
      this.data.judgementResId = this.$store.state.n[0].data
      this.showJudgementProcess()
    }
  },
  methods: {
    async init() {
      let w = document.documentElement.clientWidth - 15
      this.style.content.width = w / 2
      this.style.code.width = w / 2
      this.ready = true
    },
    async showJudgementProcess() {
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
      }
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 1,
          method: 'get',
          url: `/code/${this.data.judgementResId}`,
          params: {
          }
        }),
      ])
      this.data.judgementProcess = this.$store.state.n[1].data
      switch (this.data.judgementProcess.status) {
        case '正在判卷':{
          this.snack = {
            msg: '判卷中',
            type: '',
            open: true,
            icon: 'info',
            position: 'bottom',
          }
          await sleep(this.retryGettingJudgementTime)
          this.showJudgementProcess()
          break
        }
        case '保存中':{
          this.snack = {
            msg: '保存结果中',
            type: '',
            open: true,
            icon: 'info',
            position: 'bottom',
          }
          await sleep(this.retryGettingJudgementTime)
          this.showJudgementProcess()
          break
        }
        case '完成':{
          this.snack = {
            msg: '判卷完成',
            type: '',
            open: true,
            icon: 'info',
            position: 'bottom',
          }
          // 如果当前在看非历史页面，则跳转
          if (this.active !== 1) {
            this.active = 1
            this.$router.push({
              path: `/problems/${this.$route.params.id}/history`
            })
          }
          this.$nextTick(function () {
            this.$store.commit(this.$types.PROBLEM.SET_CURRENT_SUBMISSION_RES_ID, this.data.judgementProcess.id)
          })
          this.showJudgementRes()
          this.subReady.committing = false
          await sleep(100)
          this.snack.open = false
          break
        }
        default:
          break
      }
    },
    async showJudgementRes() {
      // 当没有最终结果前，每隔${this.retryGettingJudgementTime}获取一次数据，并调用本身
      // await Promise.all([
      //   this.$store.dispatch('n', {
      //     flag: 1,
      //     method: 'get',
      //     url: `/code/${this.data.judgementResId}`,
      //     params: {
      //     }
      //   }),
      // ])
      // this.data.judgementProcess = this.$store.state.n[1].data
      // switch (this.data.judgementProcess.status) {
      //   case '1':{
      //     break
      //   }
      //   default:
      //     break
      // }
    },
    handleDragStart(e) {
      this.dragData.dragging = true
      this.dragData.sx = e.x
    },
    handleDrag(e) {
      if (this.dragData.dragging) {
        let shouldMoveDistance = this.dragData.sx - e.x
        this.style.content.width -= shouldMoveDistance
        this.style.code.width += shouldMoveDistance
        this.dragData.sx = e.x
      }
    },
    handleDragEnd(e) {
      this.dragData.dragging = false
    },
  },
  created () {
    switch (this.$route.path.split('/')[3]) {
      case undefined: {
        this.active = 0
        break
      }
      case 'history': {
        this.active = 1
        break
      }
      default:
        break
    }
    this.init()
  }
}
</script>

<style scoped>
  .problems {
    display: flex;
    height: calc(100vh - 64px);
  }
  .problems .bar {
    width: 100%;
    color: #8815a1;
  }
  /* .problems .content {
  }
  .problems .code {
  } */
  .problems .display {
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 48px);
  }
  .displayContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
  .problems .resize-column {
    width: 15px;
    cursor: col-resize;
    height: 100%;
    background-color: #fafafa;
  }
  .problems .resize-column:active {
    background-color: #6d6a6a;
  }
  /* .problems .resize-column::after {
    content: "";rgba(2#fafafa55
    display: block;
    width: 2px;
    height: 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  } */
</style>
