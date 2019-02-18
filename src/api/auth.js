import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8180'
const UNAUTHORIZED = 401
const onUnauthorizd = () => {
    router.push('/login')
}

const request = (method, url, data) => {
    return axios({
        method,
        url : DOMAIN + url,
        data
    }).then(result => result.data)
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : null;
}

const {token} = localStorage 
if (token) setAuthInHeader(token)




export const board = {
    fetch() {
        return request('get', '/boards')
    }
}

export const auth = {
    login(name, password) {
        return request('post', '/login', {name, password})
    }
}