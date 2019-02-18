<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="index">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>MNG Admin Page</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.native.stop="openGithub()">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-footer class="indigo pa-3" dark app>
      <span>© 2018 - <a href="https://github.com/disjfa" class="indigo text--lighten-5">disjfa</a></span>
    </v-footer>
  </v-app>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      drawer: false,
      items: [{
        href: 'home',
        router: true,
        title: '메인 화면',
        icon: 'home',
      },{
        href: 'notice',
        router: true,
        title: '공지사항 관리',
        icon: 'notification_important',
      }, {
        href: 'event',
        router: true,
        title: '이벤트 관리',
        icon: 'event',
      }, {
        href: 'gold',
        router: true,
        title: '골드 관리',
        icon: 'money',
      }, {
        href: 'ruby',
        router: true,
        title: '루비 관리',
        icon: 'attach_money',
      }, {
        href: 'alert',
        router: true,
        title: '푸시 알림',
        icon: 'add_alert',
      }],
    };
  },
  methods: {
    openGithub() {
      window.open('https://github.com/disjfa/vuetify-sidebar-template');
    },
  },
};
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main';
  @import 'css/main.css';
html, body, #app {
  height: 100%;
  margin: 0px;
}
#app {
  display: flex;
  flex-direction: column;
}
.container {
  flex-grow: 1;
  position: relative;
}
.btn {
  border-radius: 3px;
  padding: 6px 8px;
  background-color: #e2e4e6;
  border: none;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  line-height: 20px;  
  font-weight: 700;
  cursor: pointer;
}
.btn-success {
  background-color: #5aac44;
  box-shadow: 0 1px 0 #519839;
}
.form-control {
  width: 100%;
  box-sizing: border-box;
  background-color: #e2e4e6;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color .3s;
}
input[type=text].form-control,
input[type=password].form-control,
textarea.form-control {
  font-size: 14px;
}
.form-control:focus {
  background-color: #fff;
}

</style>
