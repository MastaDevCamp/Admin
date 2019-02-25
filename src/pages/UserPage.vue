<template>
    <div>
        <div class="headline text-xs-center pa-5">
            사용자 게임정보
        </div>
        <v-flex xs10 offset-xs1>
            <v-data-table
            :headers="headers"
            :pagination.sync="pagination"
            :items="rows"
            >
            <template slot="items" slot-scope="props">
                <td class="text-center" nowrap width="200">{{props.item.usernum}}</td>
                <td class="text-center">{{props.item.gold}}</td>
                <td class="text-center">{{props.item.ruby}}</td>
                <td class="text-center">
                    <v-dialog
                    v-model="detailDialog"
                    width="300">
                    <v-btn slot="activator" color="primary" fab small dark v-on:click="showUser(props.item.uid)">
                        <v-icon>list</v-icon>
                    </v-btn>
                    <v-card>
                        <v-card-title
                        class="headline">
                        사용자 게임정보 상세보기
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12>
                                <v-subheader>사용자 인덱스</v-subheader>
                                <p class="text-center">{{user.usernum}}</p>
                                <v-subheader>닉네임</v-subheader>
                                <p class="text-center">{{user.nickname}}</p>
                                <v-subheader>푸시여부</v-subheader>
                                <p class="text-center" v-if="user.pushonoff=1">ON</p>
                                <p class="text-center" v-if="user.pushonoff=0">OFF</p>
                                <v-subheader>골드</v-subheader>
                                <p class="text-center">{{user.gold}}</p>
                                <v-subheader>루비</v-subheader>
                                <p class="text-center">{{user.ruby}}</p>
                                <v-subheader>하트</v-subheader>
                                <p class="text-center">{{user.heart}}</p>
                                <v-subheader>리셋</v-subheader>
                                <p class="text-center">{{user.reset}}</p>
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
                    width="600">
                    <v-btn slot="activator" color="green" fab small dark v-on:click="editUser(props.item.uid)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-card>
                        <v-card-title
                        class="headline">
                        사용자 게임정보 수정하기
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                label="골드"
                                v-model="selectedUser.gold"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                label="루비"
                                v-model="selectedUser.ruby"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                label="하트"
                                v-model="selectedUser.heart"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="editDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="editSuccess(props.item.uid)">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </td>
            </template>
            </v-data-table>
        </v-flex>    
    </div>
</template>

<script>
import {userdetail} from '../api'
export default {
    created() {
        this.fetchUsers()
    }, 
    methods : {
        fetchUsers() {
            console.log("fetchUsers")
            userdetail.fetchUserAll()
            .then(data => {
                if(data.responseMessage === "유저 권환 없음") {
                    this.$router.push('/')
                }
                else {
                    console.log("DATA : "+ data)
                    this.rows = data.responseData
                }
            })
            .catch(err => {
                console.log(err)
            })
        }, 
        showUser(uid) {
            userdetail.fetchUserWithId(uid)
            .then(data => {
                this.user = data.responseData
                this.detailDialog = true
            })
        },
        editUser(uid) {
            userdetail.fetchUserWithId(uid)
            .then(data => {
                this.selectedUser = data.responseData
                this.editDialog = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        editSuccess(uid) {
            userdetail.updateUserWithId(uid, this.selectedUser.gold, this.selectedUser.ruby, this.selectedUser.heart)
            .then(data => {
                this.editDialog = false 
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    watch : {
        editDialog : function(result) {
            this.fetchUsers()
        }
    },
    data() {
        return {
            rows : [],
            pagination : {
                rowsPerPage : 10,
                descending : false,
                sortBy : 'uid'
            },
            headers : [
                {
                text: '인덱스',
                align: 'center',
                sortable: false,
                values: 'usernum'
                }, 
                { text: '골드', values: 'gold', sortable: false, align: 'center' }, 
                { text: '루비', values: 'ruby', sortable: false, align: 'center' }, 
                { text: '자세히', sortable: false, align: 'center' },
                { text: '수정', sortable: false, align: 'center' },
            ],
            user : [],
            detailDialog : false,
            editDialog : false,
            search : '',
            selectedUser : {}, 
            editedUser : {}, 
        }
    }
}
</script>

<style>

</style>
