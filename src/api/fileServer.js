import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8082'

const request = (method, url, data) => {
    return axios({
        method: method,
        url : DOMAIN + url,
        data: data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(function (response) {
        //handle success
        console.log(response);
        return response;
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
}

export const upload= {
    newVersion(data){
        return request('post', '/upload/newVersion', data);
    }
}