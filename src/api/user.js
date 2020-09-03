import request from '../request'

export function user() {
    return request({
        url:'user',
        method: 'get'
    })
}

export function changeSomething(data) {
    return request({
        url:'user',
        method: 'put',
        data
    })
}

export function logOut() {
    return request({
        url:'logout',
        method: 'get'
    })
}