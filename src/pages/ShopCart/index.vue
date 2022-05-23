<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <div class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" 
                            :Checked="cart.isChecked===1?true:false" 
                            @click="updateOneCheck(cart)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl">
                        <div class="item-msg">{{cart.skuName}}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{cart.skuPrice}}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="changeCartNum(cart,-1,true)">-</a>
                        <input autocomplete="off" 
                            type="text" minnum="1" class="itxt" 
                            :value="cart.skuNum"
                            @change="changeCartNum(cart,$event.target.value*1,false)">
                        <a href="javascript:void(0)" class="plus" @click="changeCartNum(cart,1,true)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="javascript:;" class="sindelet" @click="deleteOne(cart.skuId)">删除</a>
                        <br><a href="#none">移到收藏</a>
                    </li>
                </div>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input type="checkbox" class="chooseAll" v-model="isCheckAll">
                <span>全选</span>
            </div>
            <div class="option">
                <a href="javascript:" @click="deleteAll">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{checkedNum}}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{allMoney}}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name:'ShopCart',
    mounted(){
        this.getShopCartInfo();
    },
    methods:{
        // 获取购物车中的商品信息
        getShopCartInfo(){
            this.$store.dispatch('shopcart/getShopCartInfo');
        },
        // 修改商品数量（正数代表增加，负数代表减少）
        async changeCartNum(cart,disNum,flag){
            // 如果通过点击+号和-号，传递的1和-1是变化的量
            // 如果通过输入框，传递的是最终的量
            // flag用于判断用户是点击+-还是通过输入框修改商品数量
            let originNum=cart.skuNum;
            if(flag){
                if(originNum+disNum<1){disNum=1-originNum};
            }else{
                if(disNum<1){disNum=1-originNum}else{disNum-=originNum}
            }
            // 经过判断及处理，此时disNum代表变化的量
            try{
                await this.$store.dispatch('shopcart/getAddToShopCart',
                {skuId:cart.skuId,skuNum:disNum});
                this.getShopCartInfo();
            }catch(error){
                alert(error.message);
            }
        },
        // 修改商品选中状态
        async updateOneCheck(cart){
            try{
                await this.$store.dispatch('shopcart/updateCartIsCheck',{
                    skuId:cart.skuId,
                    isChecked:cart.isChecked?0:1,
                });
                this.getShopCartInfo();
            }catch(error){
                alert(error.message);
            }
        },
        // 删除指定商品
        async deleteOne(skuId){
            try{
                await this.$store.dispatch('shopcart/deleteShopCart',skuId);
                this.getShopCartInfo();
            }catch(error){
                alert(error.message);
            }
        },
        // 删除指定的所有商品
        async deleteAll(){
            try{
                await this.$store.dispatch('shopcart/deleteShopCartAll');
                this.getShopCartInfo();
            }catch(error){
                alert(error.message);
            }
        }
    },
    computed:{
        ...mapState({
            shopCartInfo:state=>state.shopcart.shopCartInfo||[],
        }),
        // 购物车列表
        cartInfoList(){return this.shopCartInfo.cartInfoList||[]},
        // 已选择商品数量
        checkedNum(){
            return this.cartInfoList.reduce((prev,next)=>{
                if(next.isChecked){prev+=next.skuNum}
                return prev;
            },0)
        },
        // 已选择商品总价
        allMoney(){
            return this.cartInfoList.reduce((prev,next)=>{
                if(next.isChecked){prev+=next.skuNum*next.skuPrice;}
                return prev;
            },0)
        },
        // 是否全选
        isCheckAll:{
            get(){
                return this.cartInfoList.every((item)=>item.isChecked);
            },
            async set(val){
                // 发送请求修改购物车中所有商品的选中状态(并发请求)
                // 调用该action返回的是Promise.all的结果
                try{
                    await this.$store.dispatch('shopcart/updateCartIsCheckAll',val?1:0);
                    this.getShopCartInfo();
                }catch(error){
                    alert('修改失败'+error.message);
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;
          display:flex;
          align-items: center;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 23px;
              height: 32px;
              text-align: center;
              line-height: 32px;
              // padding: 8px;
              
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 23px;
              text-align: center;
              line-height: 32px;
              // padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;
      display:flex;
      justify-content: space-between;
      align-items:center;

      .select-all {
        padding: 10px;
        overflow: hidden;
        // float: left;
        input{
          margin-right:3px;
        }

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding-right: 20px;
        overflow: hidden;
        // float: left;

        a {
          // float: left;
          padding: 0 20px;
          color: #666;
        }
      }

      .money-box {
        // float: right;
        display:flex;
        align-items:center;

        .chosed {
          line-height: 26px;
          // float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 26px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
  li{
    list-style-type:none;
  }
</style>

        