<template>
  <div>
    <v-form>
      <div class="headline text-xs-center pa-5">
        공지사항 관리
      </div>
    </v-form>
    <v-flex xs10 offset-xs1 >
      <v-card-title>
        <v-select
            :items="noticeItems"
            v-model="noticeTypeSelected"
            label="Type"
          ></v-select>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="rows"
      :search="search"
    >
    <template slot="items" slot-scope="props">
        <td class="text-xs-left" nowrap width="200">
            {{ props.item.title }}
        </td>
        <td class="text-xs-left" width="300">{{ props.item.contents }}</td>
        <td class="text-center">{{ props.item.begin_at }}</td>
        <td class="text-center">{{ props.item.finish_at }}</td>
        <td class="text-xs-left">{{ props.item.filelink }}</td>
        <td class="text-center">
          <v-dialog
          v-model="detailDialog"
          width="600">
          <v-btn slot="activator" color="primary" fab small dark v-on:click="showNotice(props.item.notice_id)">
            <v-icon>list</v-icon>
          </v-btn>
          <v-card>
            <v-card-title
              class="headline">
              공지사항 상세보기
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-subheader>제목</v-subheader>
                    <p>{{board.title}}</p>
                    <v-subheader>내용</v-subheader>
                    <p>{{board.contents}}</p>
                    <v-subheader>게시일</v-subheader>
                    <p>{{board.post_at}}</p>
                    <v-subheader>시작일</v-subheader>
                    <p>{{board.begin_at}}</p>
                    <v-subheader>종료일</v-subheader>
                    <p>{{board.finish_at}}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
          </v-dialog>
        </td>
        <td class="text-center">
          <v-dialog
          v-model="editDialog"
          persistent
          width="600">
          <v-btn slot="activator" color="green" fab small dark v-on:click="editNotice(props.item.notice_id)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">User Contents</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                    label="제목"
                    v-model="selectedNotice.title"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                    label="내용"
                    v-model="selectedNotice.contents"></v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                    label="시작일"
                    v-model="selectedNotice.begin_at"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                    label="종료일"
                    v-model="selectedNotice.finish_at"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="editDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="editSuccess(props.item.notice_id)">Save</v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>
        </td>
        <td class="text-center">
          <v-btn color="error" fab small dark v-on:click="deleteNotice(props.item.notice_id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    </v-flex>
    <v-container>
      <v-layout align-start justify-end row fill-height>
          <v-btn depressed large color="primary" to="/notice/create">공지사항 올리기</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {notice, formatter} from '../api'
export default {
  created() {
    this.fetchNotice()
  },
  methods : {
    editSuccess(nid) {
      console.log("수정 완료 : ", nid)
      this.editData = this.selectedNotice
      let beginDateFormatted = new Date(this.selectedNotice.begin_at).toISOString()
      let finishDateFormatted = new Date(this.selectedNotice.finish_at).toISOString()
      
      console.log("결과 : ", this.editData.title)
      console.log("으앙 : ", beginDateFormatted)
      notice.updateNoticeWithIdx(nid, this.editData.title, this.editData.contents, beginDateFormatted, finishDateFormatted)
      .then(data => {
        this.editDialog = false
      })
      .catch(err => {
        console.log(err)
      })
    },
    editNotice(idx) {
      console.log("수정 화면 : ", idx)
      notice.fetchNoticeWithIdx(idx)
      .then(data => {
        console.log("힝힝",data)
        this.selectedNotice = data.responseData
        this.selectedNotice.finish_at = formatter.dateFormat(this.selectedNotice.finish_at)
        this.selectedNotice.begin_at = formatter.dateFormat(this.selectedNotice.begin_at)
        this.selectedNotice.post_at = formatter.dateFormat(this.selectedNotice.post_at)
      
        this.editDialog = true
      })
      .catch(err => {
        console.log(err)
      })
      console.log("edit : ",idx)
    },
    fetchNotice() {
      console.log("fecthNotice")
      notice.fetchNoticeAll()
      .then(data => {
        if(data.responseMessage === "유저 권환 없음") {
          this.$router.push('/')
        }
        else {
          console.log("AUTHORIZATION")
          this.rows = data.responseData
          for(let i=0; i<this.rows.length; i++){
            if(this.rows[i].title.length > 15)
              this.rows[i].title = this.rows[i].title.slice(0,15) + "..."
            if(this.rows[i].contents.length > 100)
              this.rows[i].contents = this.rows[i].contents.slice(0,100) + "..."
            this.rows[i].finish_at = formatter.dateFormat(this.rows[i].finish_at)
            this.rows[i].begin_at = formatter.dateFormat(this.rows[i].begin_at)
            this.rows[i].post_at = formatter.dateFormat(this.rows[i].post_at)
          }
        }
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    toggleAll() {
        if (this.selected.length) {
          this.selected = []
        }
        else this.selected = this.rows.slice()
        console.log(this.selected)
    },
    showNotice(idx) {
      notice.fetchNoticeWithIdx(idx)
      .then(data => {
        if(data.responseMessage === "유저 권환 없음") {
          this.$router.push('/')
        }
        else {
          this.board = data.responseData
          this.board.finish_at = formatter.dateFormat(this.board.finish_at)
          this.board.begin_at = formatter.dateFormat(this.board.begin_at)
          this.board.post_at = formatter.dateFormat(this.board.post_at)
          
          this.detailDialog = true
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteNotice(idx) {
      console.log("delete : ",idx)
      notice.delete(idx)
      .then(data => {
        this.fetchNotice()
      })
    },
    fetchNoticeWithType() {
      if (this.noticeTypeSelected=="공지사항"){
        console.log("0")
        notice.fetchNoticeWithType(0)
          .then(data => {
          this.rows = data.responseData
          for(let i=0; i<this.rows.length; i++){
            if(this.rows[i].title.length > 15)
              this.rows[i].title = this.rows[i].title.slice(0,15) + "..."
            if(this.rows[i].contents.length > 100)
              this.rows[i].contents = this.rows[i].contents.slice(0,100) + "..."
            this.rows[i].finish_at = formatter.dateFormat(this.rows[i].finish_at)
            this.rows[i].begin_at = formatter.dateFormat(this.rows[i].begin_at)
            this.rows[i].post_at = formatter.dateFormat(this.rows[i].post_at)
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
      else {
        console.log("1")
        notice.fetchNoticeWithType(1)
          .then(data => {
          this.rows = data.responseData
          for(let i=0; i<this.rows.length; i++){
            if(this.rows[i].title.length > 15)
              this.rows[i].title = this.rows[i].title.slice(0,15) + "..."
            if(this.rows[i].contents.length > 100)
              this.rows[i].contents = this.rows[i].contents.slice(0,100) + "..."
            this.rows[i].finish_at = formatter.dateFormat(this.rows[i].finish_at)
            this.rows[i].begin_at = formatter.dateFormat(this.rows[i].begin_at)
            this.rows[i].post_at = formatter.dateFormat(this.rows[i].post_at)
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  watch : {
    noticeTypeSelected: function (type) {
      console.log("OK", type)
      this.fetchNoticeWithType()
    },
    selectedIdx : function(selected) {
      console.log("name : ", selected)
    },
    editDialog: function (result) {
      this.fetchNotice()
    }
  },
  computed : {
    
  },
  data(){
    return {
      detailDialog : false,
      editDialog : false,
      name : '',
      pagination : {
        rowsPerPage : 10,
        descending : true,
        sortBy : 'post_at'
      },
      selectedIdx : '',
      selected : [],
      selectedNotice : {},
      editData : {}, 
      search : '', 
      headers : [
        {
          text: '제목',
          align: 'center',
          sortable: false,
          values: 'title'
        }, 
        { text: '내용', values: 'contents', sortable: false, align: 'center'}, 
        { text: '시작일', values: 'begin_at', sortable: false, align: 'center' }, 
        { text: '종료일', values: 'finish_at', sortable: false, align: 'center' }, 
        { text: '이미지 파일',  values: 'filelink', sortable: false, align: 'center' }, 
        { text: '자세히', sortable: false, align: 'center' },
        { text: '수정', sortable: false, align: 'center' },
        { text: '삭제', sortable: false, align: 'center' }
      ],
      noticeTypeSelected : '',
      noticeItems : ['공지사항', '이벤트'], 
      rows: [],
      board : [],
    };
  },
};
</script>
