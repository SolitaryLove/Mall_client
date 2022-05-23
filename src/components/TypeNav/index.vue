<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="moveOutDiv" @mouseenter="isShow=true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item"
                                :class="{item_on:currentIndex===index}"
                                v-for="(c1,index) in categoryList"
                                :key="c1.categoryId"
                                @mouseenter="moveInItem(index)">
                                <h3>
                                    <a href="javascript:;"
                                    :data-category1Id="c1.categoryId"
                                    :data-categoryName="c1.categoryName">
                                    {{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2) in c1.categoryChild"
                                        :key="c2.categoryId">
                                            <dt>
                                                <a href="javascript:;"
                                                :data-category2Id="c2.categoryId"
                                                :data-categoryName="c2.categoryName">
                                                {{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a href="javascript:;"
                                                    :data-category3Id="c3.categoryId"
                                                    :data-categoryName="c3.categoryName">
                                                    {{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
// 按需引入lodash
import throttle from 'lodash/throttle';

export default {
    name:'TypeNav',
    data(){
        return {
            currentIndex:-1,// 当前二级分类
            isShow:true,// 是否显示一级分类
        }
    },
    // 从vuex中获取数据到vue组件中
    computed:{
        ...mapState('home',['categoryList']),
    },
    methods:{
        // 鼠标移出全部分类
        moveOutDiv(){
            this.currentIndex=-1;
            if(this.$route.path!=='/home'){
                this.isShow=false;
            }
        },
        // 鼠标移入全部分类
        // 使用lodash实现函数节流
        // trailing:是否在时间间隔之后执行函数
        // leading:是否在时间间隔之前执行函数
        moveInItem:throttle(function(index){
            this.currentIndex=index;
        },20,{'trailing':false}),
        // 点击列表项搜索(事件委托)
        toSearch(event){
            // 获取目标元素(真正触发事件的元素)
            const targetNode=event.target;
            // 获取目标元素的data-属性组成的对象
            const data=targetNode.dataset;
            // 解构赋值
            // 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
            const {category1id,category2id,category3id,categoryname}=data;
            // 目标元素是否携带自定义属性的a标签
            if(categoryname){
                let location={name:'search'};
                let query={categoryName:categoryname||undefined};
                // 确定是几级id
                if(category1id){
                    query.categoryId=category1id||undefined;
                }else if(category2id){
                    query.categoryId=category2id||undefined;
                }else{
                    query.categoryId=category3id||undefined;
                }
                location.query=query;
                // 跳转之前要合并参数(TypeNav.query+Header.params)
                if(this.$route.params){
                    location.params=this.$route.params;
                }
                if(this.$route.path==="/home"){
                    this.$router.push(location);
                }else{
                    this.$router.replace(location);
                }
            }
        },
    },
    mounted(){
        // 当前组件在home组件中则显示
        if(this.$route.path!=='/home'){
            this.isShow=false;
        }
    },
    watch:{
        $route(){
            this.isShow=false;
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative; 

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            &.sort-enter{
                height:0;
                opacity:0;
            }
            &.sort-enter-to{
                height:461px;
                opacity:1;
            }
            &.sort-enter-active{
                transition:all 0.4s;
            }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    // width: 415px;
                                    width: 615px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &.item_on {
                        background-color:gray;
                        h3>a{
                            color:white;
                        }
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>