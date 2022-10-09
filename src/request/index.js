import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    withCredentials: true,
});

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('token-------')
    // config.headers.Authorization = sessionStorage.getItem('cookie')
    request.credentials = true;
    return config;
});

export default request