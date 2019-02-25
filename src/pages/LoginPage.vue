<template>
    <div class="login my-5">
        <h2>MNG 관리자 페이지 로그인</h2>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="username">USERNAME</label>
                <input class="form-control" type="text" name="username" v-model="username" autofocus placeholder="name" />
            </div>
            <div>
                <label for="password">PASSWORD</label>
                <input class="form-control" type="password" v-model="password" placeholder="123123"/>
            </div>
            <button class="btn" :class="{'btn-success' : !invalidForm}" type="submit" :disabled="invalidForm">Login</button>
        </form>
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
import {auth, setAuthInHeader} from '../api'
export default {
    data() {
        return {
            username : '',
            password : '', 
            error : '',
            rPath : ''
        }
    },
    computed : {
        invalidForm() {
            return !this.username || !this.password
        }
    },
    created() {
        this.rPath = this.$route.query.rPath || '/home'
    },
    methods : {
        onSubmit() {
            console.log(this.username, this.password)
            
            auth.login(this.username, this.password)
            .then(data => {
                localStorage.setItem('token',  data.token)
                console.log(data)
                this.$router.push(this.rPath)
                setAuthInHeader(data.token)
            })
            .catch(err => {
                this.error = err
            })
        }
    }
}
</script>

<style>
.login {
    width: 400px;
    margin: 0 auto; 
}
.error {
    color : #f00;
}
</style>
