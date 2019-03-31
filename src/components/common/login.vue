<template>
  <div class="nopm fullwh login">
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" label-float help-text="请填写用户名" prop="username" :rules="nameRules">
          <mu-text-field v-model="validateForm.name" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" label-float prop="password" help-text="请填写正确密码" :rules="passwordRules">
          <mu-text-field v-model="validateForm.password" prop="password"
          :action-icon="visibility ? 'visibility_off' : 'visibility'" 
          :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
  },
  components: {
  },
  data () {
    return {
      visibility: false,
      validateForm: {
        name: '',
        password: '',
      },
      nameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        // console.log('form valid: ', result)
      });
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
</style>
