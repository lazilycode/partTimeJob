import request from '@/utils/request'

// 开启关闭关卡接口

export function level_openOrClose(data) {
    return request({
        url: '/admin/level/openOrClose',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}