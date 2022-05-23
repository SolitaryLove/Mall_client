import { reqAddToShopCart,reqShopCartInfo,reqUpdateCartIsCheck,reqDeleteShopCart } from "@/api";

const state={
    shopCartInfo:[],// 购物车信息
}

const actions={
    // 向购物车中添加商品
    async getAddToShopCart({commit},{skuId,skuNum}){
        const result=await reqAddToShopCart(skuId,skuNum);
        if(result.code===200){
            return Promise.resolve('success');
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 获取购物车信息
    async getShopCartInfo({commit}){
        const result=await reqShopCartInfo();
        if(result.code===200){
            commit('RECEIVE_SHOPCARTINFO',result.data[0]);
        }
    },
    // 修改购物车中商品的选中状态
    async updateCartIsCheck({commit},{skuId,isChecked}){
        const result=await reqUpdateCartIsCheck(skuId,isChecked);
        if(result.code===200){
            return Promise.resolve('success');
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 修改购物车中所有商品的选中状态
    updateCartIsCheckAll({getters,dispatch},isChecked){
        let promises=[];
        // 遍历购物车中所有的商品数量
        getters.cartInfo.forEach(item=>{
            // 如果每个商品选中状态与全选状态一致，保持不变
            if(item.isChecked===isChecked)return;
            // 请求改变所有与全选状态不一致的商品选中状态
            let promise=dispatch('updateCartIsCheck',{skuId:item.skuId,isChecked});
            promises.push(promise);
        });
        return Promise.all(promises);
    },
    // 删除购物车中指定的商品
    async deleteShopCart({commit},skuId){
        const result=await reqDeleteShopCart(skuId);
        if(result.code===200){
            return Promise.resolve('success');
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 删除购物车中指定的所有商品
    deleteShopCartAll({commit,getters,dispatch}){
        let promises=[];
        getters.cartInfo.forEach(item=>{
            if(!item.isChecked)return;
            let promise=dispatch('deleteShopCart',item.skuId);
            promises.push(promise);
        });
        return Promise.all(promises);
    }
}

const mutations={
    RECEIVE_SHOPCARTINFO(state,shopCartInfo){
        state.shopCartInfo=shopCartInfo;
    }
}

const getters={
    cartInfo(state){
        return state.shopCartInfo.cartInfoList||[];
    }
}

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}