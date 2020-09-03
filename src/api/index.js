import request from '../request'

export function upload(data) {
    return request({
        url: 'upload',
        method : 'post',
        data
    })
}


export function index() {
    return request({
        url: 'index',
        method : 'get',
    })
}

export function bindSocket(data) {
    return request({
        url: 'bindSocket',
        method: 'post',
        data
    })
}

export function createRoom(data) {
    return request({
        url: 'createRoom',
        method: 'post',
        data
    })
}