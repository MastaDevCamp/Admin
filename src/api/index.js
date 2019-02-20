import axios from 'axios'
import router from '../router'
import moment from 'moment'

const DOMAIN = 'http://localhost:8201'
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
    login(name, password) {
        return request('post', '/login', {name, password})
    }
}