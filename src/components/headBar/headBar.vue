<template>
  <div class="nopm fullwh headBar">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button @click="showAside" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
        Title
      <mu-button flat @click="showLogin" slot="right">
        <span style="font-size: 150%;">登录</span>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="show.aside" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-dialog title="登录" width="360" :open.sync="show.login">
      <login></login>
    </mu-dialog>
  </div>
</template>

<script>
import login from '../common/login.vue'
export default {
  name: 'headBar',
  props: {
  },
  components: {
    login,
  },
  data () {
    return {
      show: {
        aside: false,
        login: false,
      }
    }
  },
  methods: {
    showAside () {
      this.show.aside = true
    },
    showLogin () {
      this.show.login = true
    }
  },
}
</script>

<style scoped>
  .headBar {
    height: 65px;
  }
</style>
