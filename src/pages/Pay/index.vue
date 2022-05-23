<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。
            订单号：<em>{{orderNum}}</em>
          </span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{payInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    name:'Pay',
    data(){
        return {
            orderNum:'',// 订单编号
            payInfo:'',// 订单支付信息
            payStatus:0,// 订单支付状态
        }
    },
    beforeMount(){
        this.orderNum=this.$route.query.orderNum;
    },
    mounted(){
        this.getPayInfo();
    },
    methods:{
        // 获取订单支付信息
        async getPayInfo(){
            const result=await this.$API.reqPayInfo(this.orderNum);
            if(result.code===200){
                this.payInfo=result.data;
            }
        },
        // 点击立即支付
        async pay(){
            // 1.根据支付信息codeUrl生成二维码进行弹框提示
            try{
                let imgUrl=await QRCode.toDataURL(this.payInfo.codeUrl);
                // 将生成的二维码图片在弹框中进行展示
                this.$alert(`<img src="${imgUrl}"/>`,'请使用微信扫码支付',{
                    dangerouslyUseHTMLString:true,// 是否将message属性作为HTML片段处理
                    showClose:false,// 是否显示右上角关闭选项
                    showCancelButton:true,// 是否显示取消按钮
                    cancelButtonText:'支付遇到问题',// 取消按钮的文本内容
                    confirmButtonText:'我已成功支付',// 确定按钮的文本内容
                    center:true,// 是否居中
                    // MessageBox关闭前的回调，会暂停实例的关闭
                    beforeClose:(action,instance,done)=>{
                        // action → 用户点击的按钮
                        // confirm → 确定 cancel → 取消 close → 关闭
                        if(action==='confirm'){
                            if(!this.payStatus){
                                clearInterval(this.timer);
                                this.timer=null;
                                done();// 关闭弹框
                                this.$router.push('/paySuccess');
                            }
                        }else if(action==='cancel'){
                            this.$message.warning('支付功能走失了~');
                            clearInterval(this.timer);
                            this.timer=null;
                            done();
                        }
                    }
                }).catch(error=>{console.log(error.message)});
                // 开启轮询,每隔2秒向后台发送请求，获取当前订单的支付状态
                if(!this.timer){
                    this.timer=setInterval(async()=>{
                        const result=await this.$API.reqPayStatus(this.orderNum);
                        if(result.code===200){
                            // 存储支付成功的标识用于用户点击按钮时判断
                            this.payStatus=200;
                            this.$message.success('支付成功');
                            clearInterval(this.timer);
                            this.timer=null;
                            // 自动跳转到支付成功页面
                            this.$msgbox.close();// 关闭弹框
                            this.$router.push('/paySuccess');
                        }
                    },2000);
                }
            }catch(error){
                console.log(error);
                this.$message.error('生成二维码图片链接失败');
            }
        }
    }
}
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>