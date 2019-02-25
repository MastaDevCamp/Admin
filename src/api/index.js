import axios from 'axios'
import router from '../router'
import moment from 'moment'

const DOMAIN = 'http://localhost:8201/admin'

const UNAUTHORIZED = 401
const onUnauthorizd = () => {
    router.push('/login')
}

const AUTHDOMAIN = 'http://175.210.61.143:8080'
const loginReqeust = (method, url, data) => {
  return axios({
    method, 
    url : AUTHDOMAIN + url, 
    data 
  }).then(data => data)
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authentiation'] = token ? `${token}` : null;
}

const request = (method, url, data) => {
  return  axios({
      method,
      url : DOMAIN + url,
      data
  }).then(result => result.data)
}

export const notice = {
  fetchNoticeAll() {
    return request('get', '/notice')
  },
  fetchNoticeWithType(type) {
    return request('get', '/notice/type/'+type)
  }, 
  fetchNoticeWithIdx(nid) {
    return request('get', '/notice/'+nid)
  },
  updateNoticeWithIdx(nid, title, contents, begin_at, finish_at) {
    console.log("?!?! : ", nid)
    return request('put', '/notice/'+nid, {title, contents, begin_at, finish_at}).then(({data}) => data)
  },
  create (type, title, contents, begin_at, finish_at) {
    return request('post', '/notice', { type, title, contents, begin_at, finish_at }).then(({data}) => data)
  }, 
  delete(nid) {
    return request('delete', '/notice/' + nid)
  },
  checkInvalidPeriod() {
    return request('get', '/notice/check-period')
  }
}

export const userdetail = {
  fetchUserAll() {
    return request('get', '/users')
  }, 
  fetchUserWithId(uid) {
    return request('get', '/users/' + uid)
  }, 
  updateUserWithId(uid, gold, ruby, heart) {
    return request('put', '/users/'+uid, {gold, ruby, heart})
  }
}

export const defaultVal = {
  fetchDefaultUser() {
    return request('get', '/default/user')
  }, 
  fetchDefaultPartner() {
    return request('get', '/default/partner')
  }, 
  modifyDefaultUser(gold, ruby, pushonoff, heart, reset) {
    return request('put', '/default/user', {gold, ruby, pushonoff, heart, reset})
  }, 
  modifyDefaultPartner(like, trust) {
    return request('put', '/default/partner', {like, trust})
  }
}

const {token} = localStorage 
if (token) setAuthInHeader(token)

export const formatter = {
  dateFormat(value) {
    if (value) {
      return moment(new Date(value)).utc().format('YYYY-MM-DD HH:mm')
    }
  }
}


export const board = {
    fetch() {
        return request('get', '/boards')
    }
}

export const auth = {
    login(username, password) {
        return loginReqeust('post', '/login/account', {"username":username,"password":password}).then(({data})=>data)
    }
}