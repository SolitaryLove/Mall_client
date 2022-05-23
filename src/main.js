import Vue from 'vue'
import App from './App.vue'

// 引入路由器
import router from './route'
// 引入状态管理器
import store from './store'
// 直接获取接口请求函数文件暴露的对象
import * as API from '@/api';
// 引入Mock模拟数据
import '@/mock/mockServer';
// 引入swiper.css
import 'swiper/css/swiper.css';

// 引入Vee-Validate(表单验证)
import '@/utils/validate';

// 按需引入ElementUI
import {Button,MessageBox,Message} from 'element-ui';
// 注册Button组件
Vue.use(Button);
// 注册MessageBox组件
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;// 带HTML片段的弹出框
Vue.prototype.$message=Message;// 消息提示框

// 引入Vue-Lazyload(图片懒加载)
import VueLazyload from 'vue-lazyload';
// 引入本地图片
import loading from '@/assets/images/loading.gif';
// 应用插件
Vue.use(VueLazyload,{loading});

// 全局注册组件
// 如果一个非路由组件被多个路由使用，定义在components文件夹并全局注册
import TypeNav from '@/components/TypeNav';
Vue.component('TypeNav',TypeNav);
import SlideLoop from '@/components/SlideLoop';
Vue.component('SlideLoop',SlideLoop);
import Pagination from '@/components/Pagination';
Vue.component('Pagination',Pagination);

// 指定不显示非生产环境模式的提示
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,// 注册路由器
  store,// 注册状态管理器
  beforeCreate(){
    Vue.prototype.$bus=this;// 安装全局事件总线
    Vue.prototype.$API=API;// 安装全局API
  }
}).$mount('#app')
