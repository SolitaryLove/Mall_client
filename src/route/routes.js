/* import Home             from '@/pages/Home';
import Search           from '@/pages/Search';
import Register         from '@/pages/Register';
import Login            from '@/pages/Login';
import Detail           from '@/pages/Detail';
import AddCartSuccess   from '@/pages/AddCartSuccess';
import ShopCart         from '@/pages/ShopCart';
import Trade            from '@/pages/Trade';
import Pay              from '@/pages/Pay';
import PaySuccess       from '@/pages/PaySuccess';
import Center           from '@/pages/Center';
    import MyOrder      from '@/pages/Center/MyOrder';
    import GroupOrder   from '@/pages/Center/GroupOrder'; */

// 路由懒加载
const Home=()=>import('@/pages/Home');// import函数可以让文件单独打包并动态加载
const Search=()=>import('@/pages/Search');
const Login=()=>import('@/pages/Login');
const Register=()=>import('@/pages/Register');
const Detail=()=>import('@/pages/Detail');
const AddCartSuccess=()=>import('@/pages/AddCartSuccess');
const ShopCart=()=>import('@/pages/ShopCart');
const Trade=()=>import('@/pages/Trade');
const Pay=()=>import('@/pages/Pay');
const PaySuccess=()=>import('@/pages/PaySuccess');
const Center=()=>import('@/pages/Center');
    const MyOrder=()=>import('@/pages/Center/MyOrder');
    const GroupOrder=()=>import('@/pages/Center/GroupOrder');


export default[
    {
        path:'/',
        redirect:'/home',// 重定向
    },
    {
        path:'/home',
        component:Home,
    },
    {
        name:'search',
        path:'/search/:keyword?',// params参数占位
        component:Search,
    },
    {
        path:'/register',
        component:Register,
        meta:{isHidden:true},
    },
    {
        path:'/login',
        component:Login,
        meta:{isHidden:true},
    },
    {
        name:'detail',
        path:'/detail/:goodsId',
        component:Detail,
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        beforeEnter:(to,from,next)=>{
            let skuNum=to.query.skuNum;
            let skuInfo=sessionStorage.getItem('SKUINFO_KEY');
            if(skuNum&&skuInfo){
                next();
            }else{
                alert('您还未添加商品到购物车中！');
                next(false);
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart,
    },
    {
        path:'/trade',
        component:Trade,
    },
    {
        path:'/pay',
        component:Pay,
        beforeEnter:(to,from,next)=>{
            // 只有从交易页面(创建订单)才能跳转到支付页面
            if(from.path==='/trade'){
                next();
            }else{
                alert('您没有跳转权限！');
                next(false);
            }
        },
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        beforeEnter:(to,from,next)=>{
            if(from.path==='/pay'){
                next();
            }else{
                alert('您没有跳转权限！');
                next(false);
            }
        }
    },
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder,
            },
            {
                path:'',
                redirect:'myorder',
            }
        ]
    }
]