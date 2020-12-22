import axios from 'axios'
import qs from 'qs';
import {Toast} from 'vant'

let httpUrl = {
    // baseURL: 'https://tworktelecom.weein.cn',//测试环境
    // baseURL: '/api',//本地调试
    baseURL: 'https://qiyewechat.189.cn:8080',//生产环境
}

let instance = axios.create({
    baseURL: httpUrl.baseURL,
    timeout: 30000,
    withCredentials:true
});
//http请求拦截
instance.interceptors.request.use(config => {
    let SESSION = localStorage.getItem("SESSION")||'';
    config.headers.SESSION= SESSION;
    return config
}, error => {
    Toast.clear();
    return Promise.reject(error);
});

//封装请求
function getHttp(url, params) {
    return instance.get(url, {params})
}

function postHttp(url, params) {
    let newParams = qs.parse(qs.stringify(params));
    return instance.post(url, newParams)
}

function uploadImg(url, params) {
    let newParams = qs.stringify(params);
    return instance.post(url, newParams)
}

export { getHttp, postHttp,uploadImg,httpUrl}



