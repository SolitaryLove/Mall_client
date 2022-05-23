<template>
    <div class="pagination">
        <!-- 上一页，当前页码为第1页时禁用 -->
        <button :disabled="currentPageNo===1" 
            @click="$emit('changePageNo',currentPageNo-1)">上一页</button>
        
        <!-- 如果连续页码刚好是1-5则显示 -->
        <button v-if="startEnd.start>1" @click="$emit('changePageNo',1)">1</button>
        
        <button v-if="startEnd.start>2">...</button>

        <!-- 显示连续页码 -->
        <template v-for="page in startEnd.end">
            <button :class="{active:currentPageNo===page}" :key="page"
            v-if="page>=startEnd.start" @click="$emit('changePageNo',page)">{{page}}</button>
        </template>
        
        <button v-if="startEnd.end<totalPageNo-1">...</button>
        
        <!-- 如果连续页码最后一位小于总页数则显示 -->
        <button v-if="startEnd.end<totalPageNo" @click="$emit('changePageNo',totalPageNo)">{{totalPageNo}}</button>
        
        <!-- 下一页，当前页码为总页数时禁用 -->
        <button :disabled="currentPageNo===totalPageNo" 
            @click="$emit('changePageNo',currentPageNo+1)">下一页</button>

        <!-- 总条数 -->
        <span style="margin-left:30px">共{{total}}条</span>
    </div>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        currentPageNo:Number,// 当前页
        total:{type:Number,default:0},// 总条数
        pageSize:{type:Number,default:10},// 每页显示条数
        continueNo:{type:Number,required:true},// 连续页数
    },
    computed:{
        // 计算总页数
        totalPageNo(){
            let {total,pageSize}=this;
            return Math.ceil(total/pageSize);
        },
        // 计算连续页的起始位置和结束位置
        startEnd(){
            let {continueNo,currentPageNo,totalPageNo}=this;
            let start,end=0;
            // 连续页数大于总页数
            if(continueNo>totalPageNo){
                start=1,
                end=totalPageNo;
            }else{
                // 正常情况，总页数大于连续页数
                start=currentPageNo-Math.floor(continueNo/2);
                end=currentPageNo+Math.floor(continueNo/2);
                // 非正常情况在左侧，start<1，修正start
                if(start<1){
                    start=1;
                    end=continueNo;
                }
                // 非正常情况在右侧，end>totalPageNo，修正end
                if(end>totalPageNo){
                    end=totalPageNo;
                    start=totalPageNo-continueNo+1;
                }
            }
            return {start,end};
        }
    }
}
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            // background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
            // Neumorphism
            background: #e6eef4;
            box-shadow:  20px 20px 60px #c4cacf,
             -20px -20px 60px #ffffff;
            font-weight:bold;
            // transition:transform 0.3s;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }

            /* &:hover {
                transform:translateY(-3px);
            } */
        }
        span{
            margin: 0 5px;
            background: #e6eef4;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
        }
    }
</style>