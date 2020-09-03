import request from '../request'


export function myQuestion(params) {
    return request({
        url: 'api/v1/myQuestion',
        method : 'get',
        params
    })
}