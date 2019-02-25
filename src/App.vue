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
      <v-menu offset-y>
        <v-btn slot="activator" icon flat v-on:click="alarmList()">
          <img v-if="isOpenedAlarm" src="./asset/alarm_on.png" width="26px" height="26px">
          <img v-else src="./asset/alarm_off.png" width="26px" height="26px">
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="(item, index) in alarms.slice().reverse()"
            :key="index"
            v-on:click="alarmListOpened()"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
      <span>
        © 2018 -
        <a href="https://github.com/disjfa" class="indigo text--lighten-5">disjfa</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script type="text/babel">
import { notice } from "./api";
export default {
  created: function() {
    console.log("Open Web!!");
    this.checkPeriod();
    console.log("Current route : ", this.$route)
    console.log("Current router : ", this.$router)
    
    if(window.location.href === "http://localhost:8080/") {
      console.log("Login Not OK")
      this.LoginOK = false
    }
    else {
      console.log("Login OK")
      this.LoginOK = true
    }
  },
  mounted: function() {
    this.startCheckInterval();
  },
  methods: {
    startCheckInterval() {
      setInterval(() => {
        this.checkPeriod();
      }, 60000);
    },
    checkPeriod() {
      console.log("CheckPeriod Function!! ")
        notice.checkInvalidPeriod()
        .then(data => {
          
          let temp = data.responseData
          //결과값이 있을 때
          // if (temp !== []) {
          //   console.log("!?")
          //   let len = this.alarms.length
          //   for(let i=0; i<temp.length; i++) {
          //     this.alarms[len+i] = {
          //       title : this.makeAlarmLabel(temp[i].type, temp[i].notice_id, temp[i].contents)
          //     }
          //   }
          //   this.isOpenedAlarm = true
          //   console.log(this.alarms)
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openGithub() {
      window.open("https://github.com/MastaDevCamp/MNGServer");
    },
    alarmListOpened() {
      this.isOpenedAlarm = false;
      this.alarms = []

      // //알람이 존재 && 열람하지 않음 ==> alarms_temp + 추가 ==> alarms_temp 출력
      // if(this.alarms.length != 0) {
      //   let alarms_temp_length = this.alarms_temp.length
      //   for(let i=0; i<this.alarms.length; i++) {
      //     alarms_temp[alarms_temp_length + i] = {
      //       title : this.makeAlarmLabel(alarm[i].type, temp[i].notice, temp[i].contents)
      //     }
      //   }
    },
    alarmList() {
      // this.isOpenedAlarm == true
    },
    makeAlarmLabel(type, index, contents) {
      let typeStr = "";
      if (type == 0) {
        typeStr = "공지사항 ";
      } else {
        typeStr = "이벤트 ";
      }
      let contentsSlice = "";
      if (contents.length > 15) {
        contentsSlice = contents.slice(0, 15) + "...";
      } else {
        contentsSlice = contents;
      }
      return typeStr + index + "가 삭제되었습니다.";
    }
  },
  data() {
    return {
      LoginOK: false, 
      imageSrc: "",
      isOpenedAlarm: false,
      drawer: false,
      alarms: [],
      alarms_temp: [],
      items: [
        {
          href: "home",
          router: true,
          title: "메인 화면",
          icon: "home"
        },
        {
          href: "users", 
          router: "true", 
          title: "사용자 게임정보 관리", 
          icon: "supervised_user_circle"
        },
        {
          href: "default", 
          router: "true", 
          title: "사용자 초기값 관리", 
          icon: "settings"
        },
        {
          href: "notice",
          router: true,
          title: "공지사항/이벤트 관리",
          icon: "notification_important"
        },
        {
          href: "deletedNotice",
          router: true,
          title: "푸시 알림",
          icon: "add_alert"
        },
        {
          href: "version",
          router: true,
          title: "버전 관리",
          icon: "folder_open"
        }
      ]
    };
  }
};
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/main';
@import 'css/main.css';

html, body, #app {
  height: 100%;
  margin: 0px;
  background-color: #f7f7f7;
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
  background-color: #152e56;
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
  transition: background-color 0.3s;
}

input[type=text].form-control, input[type=password].form-control, textarea.form-control {
  font-size: 14px;
}

.form-control:focus {
  background-color: #fff;
}
</style>
