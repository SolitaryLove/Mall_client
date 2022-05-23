module.exports={
    lintOnSave:false,// 禁用ESLint语法检查
    // 配置服务器
    devServer:{
        open:true,// 自动打开浏览器
        proxy:{
            '/api':{
                // 转发的目标服务器地址
                // target:'http://api.atguigu.cn',
                // target:'http://39.98.123.211',
                target:'http://gmall-h5-api.atguigu.cn',
            }
        }
    },
}