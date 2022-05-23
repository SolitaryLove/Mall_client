import { reqSearchInfo } from "@/api";

const state={
    searchInfo:{},
}
const actions={
    async getSearchInfo({commit},searchParams){
        const result=await reqSearchInfo(searchParams);
        if(result.code===200){
            commit('RECEIVE_SEARCHINFO',result.data);
        }
    }
}
const mutations={
    RECEIVE_SEARCHINFO(state,payload){
        state.searchInfo=payload;
    }
}
const getters={
    // 返回品牌列表
    attrsList(state){
        return state.searchInfo.attrsList||[];
    },
    // 返回属性列表
    goodsList(state){
        return state.searchInfo.goodsList||[];
    },
    // 返回商品列表
    trademarkList(state){
        return state.searchInfo.trademarkList||[];
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}