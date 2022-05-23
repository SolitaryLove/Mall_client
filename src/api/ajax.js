/* 对axios进行二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response，而直接是响应体数据response.data
4. 统一处理请求错误，具体请求也可以选择处理或不处理 */

import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 引入Vuex的store
import store from '@/store';

// 配置不显示右上角的放置进度条小，只显示水平进度条
NProgress.configure({showSpinner:false});

// 创建一个新的axios实例进行二次封装
const service=axios.create({
    baseURL:'/api',// 当前项目中所有请求接口的基础路径
    timeout:20000,// 当ajax请求超出设置的时间就会报错
});

// 请求拦截器
service.interceptors.request.use((config)=>{
    // 显示进度条
    NProgress.start();
    // 请求头内部需要添加临时标识，后期每个请求都会携带该临时标识
    let userTempId=store.state.user.userTempId;
    if(userTempId){
        config.headers.userTempId=userTempId;
    }
    // 登录成功后，需要将token添加到请求头中，后期每个请求都会携带该token
    let token=store.state.user.token;
    if(token){
        config.headers.token=token;
    }
    return config;
},(error)=>{
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(response=>{
    // 隐藏进度条
    NProgress.done();
    return response.data;
},(error)=>{
    // 统一处理错误
    alert(`请求出错:{error.message}||未知错误`);
    return Promise.reject(error);
});

// 暴露二次封装的axios实例
export default service;