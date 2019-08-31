<template>
  <div class="login">
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" label-float help-text="请填写用户名" prop="name" :rules="nameRules">
          <mu-text-field v-model="validateForm.name" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" label-float prop="password" help-text="请填写正确密码" :rules="passwordRules">
          <mu-text-field v-model="validateForm.password" prop="password"
          :action-icon="visibility ? 'visibility_off' : 'visibility'" 
          :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
          @keyup.enter.native="submit">
          </mu-text-field>
        </mu-form-item>
        <span class="err-msg" v-show="showErrMsg"><h5>{{errMsg}}</h5></span>
        <mu-form-item>
          <mu-button v-loading="loginBtnSty.loading" :disabled="loginBtnSty.disabled" color="primary" 
            @click="submit" >
            提交
          </mu-button>
          <mu-button v-loading="resetBtnSty.loading" :disabled="resetBtnSty.disabled"
            @click="clear">
            重置
          </mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    needCloseLogin: Number,
  },
  components: {
  },
  data () {
    return {
      mNeedCloseLogin: this.needCloseLogin,
      responseData: null,
      visibility: false,
      validateForm: {
        name: '',
        password: '',
      },
      showErrMsg: false,
      errMsg: '',
      nameRules: [
        // { validate: (val) => !!val, message: '必须填写用户名'},
        // { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        // { validate: (val) => !!val, message: '必须填写密码'},
        // { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      loginBtnSty: {
        loading: false,
      },
      resetBtnSty: {
        disabled: false,
      },
    }
  },
  methods: {
    async submit () {
      // this.$refs.form.validate().then((result) => {
      //   // console.log('form valid: ', result)
      // });
      this.showErrMsg = false
      this.loginBtnSty.loading = true
      this.resetBtnSty.disabled = true
      const result = await this.$refs.form.validate()
      // console.log('form valid: ', result)
      const pw = this.$util.hashpw(this.validateForm.password)
      await Promise.all([
        this.$store.dispatch('n', {
          flag: 200,
          method: 'post',
          url: `/account/login`,
          // headers: {
          //   authorization: this.$_env.testUserInfo.token,
          //   charset: 'utf-8',
          // },
          params: {
            "password": pw,
            "username": this.validateForm.name
          },
          stopHandleNetErr: true,
        }),
      ])

      this.responseData = this.$store.state.n[200]
      // 登录成功则关闭弹框，失败则进行提示
      if (this.responseData.success) {
        this.mNeedCloseLogin += 1
        this.$emit('update:needCloseLogin', this.mNeedCloseLogin)
        // 保存token
        localStorage.setItem("token", this.responseData.data)
        
        // const userInfo = {
        //   isLogin: true,
        //   name: this.validateForm.name,
        //   count: 1,
        // }
        // this.$store.commit(this.$types.SET_USER_INFO, this.data.detail)
      } else {
        this.errMsg = this.responseData.data.response.data.message
        this.showErrMsg = true
      }
      this.loginBtnSty.loading = false
      this.resetBtnSty.disabled = false
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false,
      };
    }
  },
}
</script>

<style scoped>
  .err-msg {
    color: #f56c6c;
  }
</style>
