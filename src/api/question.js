import request from '../request'


export function question(params) {
    return request({
        url:'api/v1/question',
        method: 'get',
        params
    })
}

export function answer(data) {
    return request({
        url:'api/v1/answer',
        method: 'post',
        data
    })
}

export function correct(data) {
    return request({
        url:'api/v1/showMeTheRight',
        method: 'post',
        data
    })
}