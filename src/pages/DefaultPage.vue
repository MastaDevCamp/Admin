<template>
    <v-layout column justify-center>
    <v-form>
        <div class="headline text-xs-center pa-5">
            사용자 게임 초기값 관리
        </div>
    </v-form>
      <v-container grid-list-xl text-xs-center>
          <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
          label="푸시 여부"
          v-model="defaultUser.pushonoff"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="골드"
          v-model="defaultUser.gold"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="루비"
          v-model="defaultUser.ruby"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="하트"
          v-model="defaultUser.heart"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="리셋 수"
          v-model="defaultUser.reset"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="파트너 호감도"
          v-model="defaultPartner.like"
          :disabled="editTextDiabled"
          ></v-text-field>
          <v-text-field
          label="파트너 신뢰도"
          v-model="defaultPartner.trust"
          :disabled="editTextDiabled"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="wantToEdit==false" color="green" @click="editStart">Edit</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="editDefault">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
          </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import {defaultVal} from '../api'
export default {
    created() {
        this.fetchDefault()
    }, 
    methods : {
        editStart() {
            this.editTextDiabled = false
            this.wantToEdit = true
        }, 
        editDefault() {
            defaultVal.modifyDefaultUser(this.defaultUser.gold, this.defaultUser.ruby, this.defaultUser.pushonoff, this.defaultUser.heart, this.defaultUser.reset)
            .then(data=>{
                defaultVal.modifyDefaultPartner(this.defaultPartner.like, this.defaultPartner.trust)
                .then(data=>{
                    this.fetchDefault()
                    this.editTextDiabled = true
                    this.wantToEdit = false
                })
                .catch(err=>{
                    console.log("modify Partner Info Err : "+ err)
                })
            })
            .catch(err => {
                console.log("modify User Info Err : " + err)
            })
        },
        fetchDefault() {
            defaultVal.fetchDefaultUser()
            .then(data=> {
                if(data.responseMessage === "유저 권환 없음")
                {
                    this.$router.push('/')
                }
                else {
                    console.log(data.responseData)
                    this.defaultUser = data.responseData
                }
            }).catch(err=>{
                console.log(err)
            })

            defaultVal.fetchDefaultPartner()
            .then(data=> {
                if(data.responseMessage === "유저 권환 없음")
                {
                    this.$router.push('/')
                }
                else {
                    // console.log(data.responseData[0])
                    this.defaultPartner = data.responseData[0]
                }
            }).catch(err=>{
                console.log(err)
            })
            
        }
    }, 
    data() {
        return {
            defaultUser : [], 
            defaultPartner : [],
            wantToEdit : false,
            editTextDiabled : true,
            
        }
    }
}
</script>

<style>

</style>
