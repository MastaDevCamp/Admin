<template>
    <v-container fluid grid-list-md>
        <div class="headline text-xs-center pa-5">
            공지사항 작성
        </div>
        <form @submit.prevent="onSubmit">
            <v-layout wrap align-center>
            <v-flex d-flex xs8 offset-xs2>
                <v-select
                :items="items"
                v-model="type"
                label="Type"
                >
                </v-select>
            </v-flex>
        </v-layout>
        <v-layout wrap align-center>
            <v-flex xs8 offset-xs2 d-flex>
                <v-text-field
                v-model="title"
                label="Title"
                single-line>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout wrap align-center>
            <v-flex xs8 offset-xs2>
            <v-textarea
            v-model="contents"
            box
            label="Contents"
            auto-grow
            ></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs4 offset-xs2>
                <v-dialog
                ref="beginDateDialog"
                v-model="beginDateModal"
                :return-value.sync="beginDate"
                persistent
                lazy
                full-width
                width="290px"
                >
                <v-text-field
                slot="activator"
                v-model="beginDate"
                label="게시할 날짜"
                prepend-icon="event"
                readonly
                ></v-text-field>
                <v-date-picker v-model="beginDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="beginDateModal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.beginDateDialog.save(beginDate)">OK</v-btn>
                </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs4>
                <v-dialog
                    ref="beginTimeDialog"
                    v-model="beginTimeModal"
                    :return-value.sync="beginTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                    >
                    <v-text-field
                    slot="activator"
                    v-model="beginTime"
                    label="게시할 시간"
                    prepend-icon="access_time"
                    readonly
                    ></v-text-field>
                    <v-time-picker
                    v-if="beginTimeModal"
                    v-model="beginTime"
                    full-width
                    >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="beginTimeModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.beginTimeDialog.save(beginTime)">OK</v-btn>
                    </v-time-picker>
                </v-dialog>
            </v-flex>
      </v-layout>
      <v-layout row wrap>
            <v-flex xs4 offset-xs2>
                <v-dialog
                ref="finishDateDialog"
                v-model="finishDateModal"
                :return-value.sync="finishDate"
                persistent
                lazy
                full-width
                width="290px"
                >
                <v-text-field
                slot="activator"
                v-model="finishDate"
                label="종료할 날짜"
                prepend-icon="event"
                readonly
                ></v-text-field>
                <v-date-picker v-model="finishDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="finishDateModal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.finishDateDialog.save(finishDate)">OK</v-btn>
                </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs4>
                <v-dialog
                    ref="finishTimeDialog"
                    v-model="finishTimeModal"
                    :return-value.sync="finishTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                    >
                    <v-text-field
                    slot="activator"
                    v-model="finishTime"
                    label="종료할 시간"
                    prepend-icon="access_time"
                    readonly
                    ></v-text-field>
                    <v-time-picker
                    v-if="finishTimeModal"
                    v-model="finishTime"
                    full-width
                    >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="finishTimeModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.finishTimeDialog.save(finishTime)">OK</v-btn>
                    </v-time-picker>
                </v-dialog>
            </v-flex> 
       </v-layout>
       <v-layout wrap align-center>
           <v-flex xs8 offset-xs9>
                <v-btn color="success"
                class="btn"
                type="submit"
                >
                Submit
                </v-btn>
           </v-flex>
       </v-layout>
        </form>
        
    </v-container>
</template>

<script>
import {notice} from '../api'

export default {
    computed : {
        invalidForm() {
            return !this.title || !this.contents || !this.type
        }
    }, 
    created() {
        
    },
    methods : {
        onSubmit() {
            let beginDateString = this.beginDate +"T" + this.beginTime + ":00.000+0000"
            let beginDateFormatted = new Date(beginDateString)
            let finishDateString = this.finishDate +"T" + this.finishTime + ":00.000+0000"
            let finishDateFormatted = new Date(finishDateString)
            console.log(beginDateFormatted)
            console.log(finishDateFormatted)

            let typeNum
            if(this.type=="공지사항"){
                typeNum = 0 
            }
            else {
                typeNum = 1
            }

            notice.create(typeNum, this.title, this.contents, beginDateFormatted, finishDateFormatted)
            .then(data => {
                this.$router.replace('/notice')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    data () {
        return {
            type : "",
            title : "",
            contents : "",
            items : ['공지사항','이벤트'],
            beginDate: new Date().toISOString().substr(0, 10),
            finishDate: new Date().toISOString().substr(0, 10),
            beginDateModal: false,
            finishDateModal: false,
            beginTime : null,
            finishTime : null,
            beginTimeModal: false,
            finishTimeModal: false,
        }
    }
}
</script>

<style>
.v-select {
    align-items: center;
}
</style>
