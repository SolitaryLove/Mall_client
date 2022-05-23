import { reqDetailInfo } from "@/api";

const state={
    detailInfo:{},
}

const actions={
    async getDetailInfo({commit},skuId){
        const result=await reqDetailInfo(skuId);
        if(result.code===200){
            commit('RECEIVE_DETAILINFO',result.data);
        }
    }
}

const mutations={
    RECEIVE_DETAILINFO(state,payload){
        state.detailInfo=payload;
    }
}

const getters={
    // 商品分类面包屑
    categoryView(state){
        return state.detailInfo.categoryView||{};
    },
    // 商品详情
    skuInfo(state){
        return state.detailInfo.skuInfo||{};
    },
    // 商品销售属性列表
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList||[];
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}