import request from '../index'

export function getBanner() {
    return request({
        method: 'get',
        url: 'banner?type=2',
    })
}


export function playlist() {
    return request({
        method: 'get',
        url: '/personalized?limit=10'
    })
}

export function songList(id) {
    return request({
        method: 'post',
        url: `/playlist/detail?id=${id}`
    })
}