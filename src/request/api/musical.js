import request from '../index'

export function getAllPlayListSong(id) {
    return request({
        method: 'get',
        url: `/playlist/track/all?id=${id}&limit=100&offset=1`
    })
}

export function getlyric(id) {
    return request({
        method: 'get',
        url: `/lyric?id=${id}`
    })
}

// 获取每日推荐歌单
export function getRecommnedSong() {
    return request({
        method: 'get',
        url: '/recommend/songs'
    })
}
// 登录状态
// export function getStatus() {
//     return request({
//         method: 'get',
//         url: '/login/status',

//     })
// }