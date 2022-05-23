<template>
    <!-- Swiper容器 -->
    <div class="swiper-container" ref="bannerSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
                v-for="banner in bannerList||floorList"
                :key="banner.id"
            ><img :src="banner.imageUrl"/>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';

    export default {
        name:'SlideLoop',
        props:['bannerList','floorList'],
        watch:{
            bannerList:{
                // 请求的数据返回时实例化Swiper
                handler(newVal,oldVal){
                    this.$nextTick(()=>{
                        new Swiper(this.$refs.bannerSwiper,{
                            // 自动切换(手动操作后不会停止自动切换)
                            autoplay:{disableOnInterraction:false},
                            loop:true,// 循环模式
                            // 如果需要分页器
                            pagination:{el:'.swiper-pagination'},
                            // 如果需要前进后退按钮
                            navigation:{
                                nextEl:'.swiper-button-next',
                                prevEl:'.swiper-button-prve',
                            }
                        });
                    });
                }
            },
            floorList:{
                immediate:true,
                handler(newVal,oldVal){
                    if(this.floorList===undefined) return;
                    this.$nextTick(()=>{
                        new Swiper(this.$refs.bannerSwiper,{
                            // 自动切换(手动操作后不会停止自动切换)
                            autoplay:{disableOnInterraction:false},
                            loop:true,// 循环模式
                            // 如果需要分页器
                            pagination:{el:'.swiper-pagination'},
                            // 如果需要前进后退按钮
                            navigation:{
                                nextEl:'.swiper-button-next',
                                prevEl:'.swiper-button-prve',
                            }
                        });
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    
</style>