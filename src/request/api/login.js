import request from '../index.js'

export function login(number, password) {
    return request({
        method: 'get',
        url: `/login/cellphone?phone=${number}&password=${password}`
    })
}
export function getuserInfo(id) {
    return request({
        method: 'get',
        url: `/user/detail?uid=${id}`
    })
}