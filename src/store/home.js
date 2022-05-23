import { reqBaseCategoryList,reqBannerList,reqFloorList } from "@/api";


const state=()=>({
    categoryList:[],// 分类数据
    bannerList:[],// 轮播图数据
    floorList:[],
});

const actions={
    // 异步任务，请求接口
    // 请求三级列表数据
    async getBaseGategoryList({commit}){
        const result=await reqBaseCategoryList();
        if(result.code===200){
            commit('RECEIVE_BASEGATEGORYLIST',result.data);
        }
    },
    // 请求轮播图数据
    async getBannerList({commit}){
        const result=await reqBannerList();
        if(result.code===200){
            commit(`RECEIVE_BANNERLIST`,result.data);
        }
    },
    async getFloorList({commit}){
        const result=await reqFloorList();
        if(result.code===200){
            commit(`RECEIVE_FLOORLIST`,result.data);
        }
    }
    
};

const mutations={
    RECEIVE_BASEGATEGORYLIST(state,payload){
        state.categoryList=payload;
    },
    RECEIVE_BANNERLIST(state,payload){
        state.bannerList=payload;
    },
    RECEIVE_FLOORLIST(state,payload){
        state.floorList=payload;
    }
};

export default {
    namespaced:true,// 开启命名空间
    state,
    actions,
    mutations,
}