// 登录
export const loginApi = (params: any) => useRequest.post('/api/web/user/login', params)

// 公告
export const getNowNewApi = (params: any) => useRequest.get('/api/web/homePage/latestNewsConsultation', params)
