import request from '../index.js'

export function searchSong(value) {
    return request({
        method: 'get',
        url: `/search?keywords=${value}`
    })
}