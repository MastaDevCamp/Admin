<template>
    <vue-container>
    <div class="login my-5">
        <h2>Login to MNG Admin</h2>
        <form @submit.prevent="onSubmit">

            <div>
                <label for="name">Name</label>
                <input class="form-control" type="text" name="name" v-model="name" autofocus placeholder="name" />
            </div>
            <div>
                <label for="password">Password</label>
                <input class="form-control" type="password" v-model="password" placeholder="123123"/>
            </div>
            <button class="btn" :class="{'btn-success' : !invalidForm}" type="submit" :disabled="invalidForm">Login</button>
        </form>
        <p class="error" v-if="error">{{error}}</p>
    </div>
    </vue-container>
</template>

<script>
import {auth, setAuthInHeader} from '../api'
export default {
    data() {
        return {
            name : '',
            password : '', 
            error : '',
            rPath : ''
        }
    },
    computed : {
        invalidForm() {
            return !this.name || !this.password
        }
    },
    created() {
        this.rPath = this.$route.query.rPath || '/home'
    },
    methods : {
        onSubmit() {
            console.log(this.name, this.password)
            auth.login(this.name, this.password)
            .then(data => {
                localStorage.setItem('token', data.responseData.token)
                setAuthInHeader(data.responseData.token)
                this.$router.push(this.rPath)
                // console.log(data.responseData.token)
            })
            .catch(err => {
                console.log(err)
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
