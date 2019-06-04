<template>
  <div class="problems">
    <div class="content">
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
    <div class="code">
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
      ready: false,
      showProblemSubmissions: false,
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
            authorization: this.$_env.testUserInfo.token
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

// int main() {
//   return 0;
// }
      this.subReady.committing = false
    }
  },
  methods: {
    async init() {
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
          this.$store.commit(this.$types.PROBLEM.SET_CURRENT_SUBMISSION_RES_ID, this.data.judgementProcess.id)
          this.showJudgementRes()
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
    }
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
  .problems .content {
    width: 50%;
  }
  .problems .code {
    width: 50%;
  }
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
</style>
