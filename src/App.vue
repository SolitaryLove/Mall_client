<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';

  export default {
    name: 'App',
    components:{Header,Footer},
    mounted(){
      // 更改categoryList状态,发送请求获取分类数据
      this.$store.dispatch('home/getBaseGategoryList');
    }
  }
</script>

<style>
  
</style>
