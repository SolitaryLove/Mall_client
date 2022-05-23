import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({showSpinner:false});

const service=axios.create({
    baseURL:'/mock',
    timeout:20000,
});

service.interceptors.request.use(config=>{
    NProgress.start();
    return config;
},error=>{
    return Promise.reject(error);
});

service.interceptors.response.use(response=>{
    NProgress.done();
    return response.data;
},error=>{
    alert(`请求出错:${error.message}||未知错误`);
    return Promise.reject(error);
});

export default service;
