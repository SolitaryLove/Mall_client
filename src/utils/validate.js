import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// 错误提示信息本地化
// 引入中文message
import zh_CN from 'vee-validate/dist/locale/zh_CN';
VeeValidate.Validator.localize('zh_CN',{
    // 修改内置规则的message，让确认密码和密码相同
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同`
    },
    attributes:{
        phone: '手机号',
        code: '验证码',
        password:'密码',
        password2:'确认密码',
        isCheck:'协议'
    }
});
// 自定义校验规则，定义-协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    // 验证规则
    validate:value => {
        return value
    },
    // 错误提示信息
    getMessage : field => field + '必须同意',
});