import request from "../"

export function getuserStatus() {
    return request({
        method: 'GET',
        url: '/login/status'
    })
}
export function logout() {
    return request({
        method: 'get',
        url: '/logout'
    })
}

export function getUserPlaylist(uid) {
    return request({
        method: 'get',
        url: `/user/playlist?uid=${uid}`
    })
}