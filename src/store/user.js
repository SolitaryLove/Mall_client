import { reqGetCode, reqGetUserInfo, reqUserLogin, reqUserRegister, reqUserAddressList } from "@/api";
import { getUserTempId } from "@/utils/userabout";


const state={
    // 用户临时标识
    userTempId:getUserTempId(),
    // 用户注册验证码
    code:'',
    // 用户身份标识
    token:localStorage.getItem('TOKEN_KEY'),
    // 用户信息
    userInfo:{},
    // 用户收货地址信息
    userAddressList:[],
}

const actions={
    // 用户注册
    async userRegister({commit},userInfo){
        const result=await reqUserRegister(userInfo);
        if(result.code===200){
            return 'success';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 获取验证码
    async getCode({commit},phone){
        const result=await reqGetCode(phone);
        if(result.code===200){
            commit('RECEIVE_CODE',result.data);
            return 'success';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户登录
    async userLogin({commit},userInfo){
        const result=await reqUserLogin(userInfo);
        if(result.code===200){
            commit('RECEIVE_TOKEN',result.data.token);
            localStorage.setItem('TOKEN_KEY',result.data.token);
            return 'success';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        const result=await reqGetUserInfo();
        if(result.code===200){
            commit('RECEIVE_USERINFO',result.data);
            return 'success';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 退出登录(清除用户token)
    clearToken({state,commit}){
        commit('RESET_TOKEN');
        localStorage.removeItem('TOKEN_KEY');
        state.userInfo={};
    },
    // 获取用户收货地址信息
    async getUserAddressList({commit}){
        const result=await reqUserAddressList();
        if(result.code===200){
            commit('RECEIVE_USERADDRESSLIST',result.data);
        }
    }
}

const mutations={
    RECEIVE_CODE(state,code){
        state.code=code;
    },
    RECEIVE_TOKEN(state,token){
        state.token=token;
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    RESET_TOKEN(state){
        state.token='';
    },
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList=userAddressList;
    }
}

export default{
    namespaced:true,
    state,
    actions,
    mutations,
}