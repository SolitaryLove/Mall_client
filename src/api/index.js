// 包含所有接口请求函数的模块

import ajax from './ajax';
import mockAjax from './mockAjax';

// 暴露所有接口请求函数的模块

// 获取三级分类列表数据
export const reqBaseCategoryList=()=>{
    return ajax({
        url:'/product/getBaseCategoryList',
        method:'GET',
    });
}
/* export const reqBaseCategoryList=()=>{
    return mockAjax({
        url:'/product/getBaseCategoryList',
        method:'GET',
    });
} */

// 获取mock模拟接口的数据banner和floor
export const reqBannerList=()=>{
    return mockAjax({
        url:'/banner',
        method:'GET',
    });
}
export const reqFloorList=()=>{
    return mockAjax({
        url:'/floor',
        method:'GET',
    });
}

// 搜索商品
// searchParams参数必须传且是一个对象，可以是一个空对象
// 用户发送请求时，参数为空对象代表获取端口默认搜索的数据
export const reqSearchInfo=(searchParams)=>{
    return ajax({
        url:'/list',
        method:'POST',
        data:searchParams,
    });
}

// 获取商品详情
export const reqDetailInfo=(skuId)=>{
    return ajax({
        url:`/item/${skuId}`,
        method:'GET',
    });
}

// 添加到购物车
export const reqAddToShopCart=(skuId,skuNum)=>{
    return ajax({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST',
    });
}

// 获取购物车数据
export const reqShopCartInfo=()=>{
    return ajax({
        url:'/cart/cartList',
        method:'GET',
    });
}

// 修改购物车商品选中状态
export const reqUpdateCartIsCheck=(skuId,isChecked)=>{
    return ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'GET',
    });
}

// 删除购物车中指定的商品
export const reqDeleteShopCart=(skuId)=>{
    return ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE',
    });
}

// 用户注册
export const reqUserRegister=(userInfo)=>{
    return ajax({
        url:`/user/passport/register`,
        methods:'POST',
        data:userInfo,
    });
}

// 获取验证码
export const reqGetCode=(phone)=>{
    return ajax({
        url:`/user/passport/sendCode/${phone}`,
        methods:'GET',
    });
}

// 用户登录
export const reqUserLogin=(userInfo)=>{
    return ajax({
        url:`/user/passport/login`,
        method:'POST',
        data:userInfo,
    })
}

// 获取用户信息(根据用户token)
export const reqGetUserInfo=()=>{
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'GET',
    });
}

// 获取用户的收货地址信息
export const reqUserAddressList=()=>{
    return ajax({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'GET',
    });
}

// 获取订单交易信息
export const reqTradeInfo=()=>{
    return ajax({
        url:'/order/auth/trade',
        method:'GET',
    });
}

// 提交订单
export const reqSubmitOrder=(tradeNo,tradeInfo)=>{
    return ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data:tradeInfo,
    });
}

// 获取订单支付信息
export const reqPayInfo=(orderId)=>{
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET',
    });
}

// 获取订单支付状态
export const reqPayStatus=(orderId)=>{
    return ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET',
    });
}

// 获取我的订单列表数据
export const reqMyOrderInfo=(page,limit)=>{
    return ajax({
        url:`/order/auth/${page}/${limit}`,
        methos:'GET',
    });
}