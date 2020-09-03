import Cookies from 'js-cookie'
import request from '../request'

export function login(data) {
    return request({
        url:'login',
        method: 'post',
        data
    }).then(res => {
        if (res.code === 200){
            Cookies.set('token',res.data.token_type + ' ' + res.data.access_token)
        }
        return res
    })
}