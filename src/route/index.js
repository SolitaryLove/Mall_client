import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 声明使用插件
Vue.use(VueRouter);

const originPush=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,onComplete,onAbort){
	if(onComplete===undefined&&onAbort===undefined){
		return originPush.call(this,location,onComplete,onAbort).catch(()=>{});
	}else{// 如果有指定任意回调函数, 通过call调用源函数处理
		return originPush.call(this,location,onComplete,onAbort);
	}
};
VueRouter.prototype.replace=function(location,onComplete,onAbort){
	if(onComplete===undefined&&onAbort===undefined){
		return originReplace.call(this,location,onComplete,onAbort).catch(()=>{});
	}else{
		return originReplace.call(this,location,onComplete,onAbort);
	}
};

const router=new VueRouter({
    // 配置路由模式
    mode:'hash',
    // 配置路由规则
    routes,
	// 滚动行为
	scrollBehavior(to,from,savedPosition){
		return {x:0,y:0};
	}
});

import store from '@/store';
// 注册全局前置导航守卫
router.beforeEach(async(to,from,next)=>{
	// 1.导航守卫拦截，先去获取用户token和用户信息
	let token=store.state.user.token;
	let userInfo=store.state.user.userInfo.name;
	// 2.判断用户是否登录并进行相应跳转权限处理
	if(token){// token存在→用户登录成功
		// 用户登录成功后依然跳转到login
		if(to.path==='/login'){
			next('/');// 强制跳转到home
		}else{// 用户登录成功且不再跳转到login
			if(userInfo){// 已经获取到用户信息
				next();
			}else{// 没有获取到用户信息
				try{
					await store.dispatch('user/getUserInfo');
					next();
				}catch(error){
					store.dispatch('user/clearToken');
					next('/login');
				}
			}
		}
	}else{// token不存在→用户没有登录
		// 未登录访问(交易、支付、用户中心)相关页面
		// 会强制跳转到登陆页面，等完成登陆后才能访问
		let targetPath=to.path;
		if(targetPath.indexOf('/trade')!==-1
		||targetPath.indexOf('/pay')!==-1
		||targetPath.startsWith('/center')){
			// 完成登录后想跳转的页面
			next(`/login?redirect=${targetPath}`);
		}else{
			next();
		}
	}
});

export default router;