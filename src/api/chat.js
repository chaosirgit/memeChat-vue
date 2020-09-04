import request from '../request'

export function upload(data) {
    return request({
        url: 'upload',
        method : 'post',
        data
    })
}


export function roomInfo() {
    return request({
        url: 'roomInfo',
        method : 'get',
    })
}

export function outRoom() {
    return request({
        url: 'outRoom',
        method : 'post',
    })
}

export function sendMsg(data) {
    return request({
        url: 'sendMsg',
        method : 'post',
        data
    })
}
