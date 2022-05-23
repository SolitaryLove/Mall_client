<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
        <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
    name:'Zoom',
    props:['imgList'],
    data(){
        return {
            defaultIndex:0,
        }
    },
    computed:{
        defaultImg(){
            return this.imgList[this.defaultIndex]||{};
        }
    },
    mounted(){
        this.$bus.$on('changeDefaultIndex',this.changeDefaultIndex);
    },
    methods:{
        changeDefaultIndex(index){
            this.defaultIndex=index;
        },
        // 鼠标移动事件回调
        move(event){
            // 1.鼠标移动 → 蒙版移动
            let mask=this.$refs.mask;
            let mouseX=event.offsetX;
            let mouseY=event.offsetY;
            let maskX=mouseX-mask.offsetWidth/2;// 蒙版水平方向位置
            let maskY=mouseY-mask.offsetHeight/2;// 蒙版垂直方向位置
            mask.style.left=maskX+'px';
            mask.style.top=maskY+'px';
            // 边界限定
            if(maskX<0){
                mask.style.left=0+'px';
            }else if(maskX>mask.offsetWidth){
                mask.style.left=mask.offsetWidth+'px';
            }
            if(maskY<0){
                mask.style.top=0+'px';
            }else if(maskY>mask.offsetHeight){
                mask.style.top=mask.offsetHeight+'px';
            }
            // 2.蒙版移动 → 放大镜中图片移动
            let bigImg=this.$refs.bigImg;
            bigImg.style.left=-2*maskX+'px';
            bigImg.style.top=-2*maskY+'px';
            // 边界限定
            if(maskX<0){
                bigImg.style.left=0+'px';
            }else if(maskX>mask.offsetWidth){
                bigImg.style.left=-mask.offsetWidth*2+'px';
            }
            if(maskY<0){
                bigImg.style.top=0+'px';
            }else if(maskY>mask.offsetHeight){
                bigImg.style.top=-mask.offsetHeight*2+'px';
            }
        },
    },

};
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    // width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    // background-color: rgba(0, 255, 0, 0.3);
    background-color:rgba(192,192,192,.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
</style>