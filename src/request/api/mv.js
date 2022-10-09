import request from "../";

export function getMv(id) {
    return request({
        method: "GET",
        url: `/mv/url?id=${id}`
    })
}
export function getMvData(id) {
    return request({
        method: "GET",
        url: `/mv/detail?mvid=${id}`
    })
}

export function getsimilMvData(id) {
    return request({
        method: "GET",
        url: `/simi/mv?mvid=${id}`
    })
}
export function getSongerMvData() {
    return request({
        method: "GET",
        url: `/artist/mv?id=12081`
    })
}
export function getMvCommentData(id) {
    return request({
        method: 'get',
        url: `/comment/mv?id=${id}`
    })
}