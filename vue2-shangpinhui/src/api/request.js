// 对axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";
// 引入store仓库
import store from '@/store'
// 1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    // 代表请求超时的时间5s
    timeout:5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，并作出操作
requests.interceptors.request.use((config)=>{
    // config：配置对象，里面有重要属性header请求头
    if(store.state.detail.uuid_token){
        // 给请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token给服务器
    if(store.state.user.token){
        // 给请求头添加一个字段
        config.headers.token = store.state.user.token
    }
    // 进度条开始动
    nprogress.start();
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数,服务器响应数据回来后，响应拦截器可以检测到并作出操作
    // 进度条结束
    nprogress.done();
    return res.data
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('false'))
});

export default requests;