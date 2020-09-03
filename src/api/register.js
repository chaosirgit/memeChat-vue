import request from '../request'

export function register(data) {
    return request({
        url: 'api/v1/register',
        method: 'post',
        data
    })
}