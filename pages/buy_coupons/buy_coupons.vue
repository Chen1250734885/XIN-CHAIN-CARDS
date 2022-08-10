<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
			<view style="width: 750rpx;height: 450rpx;background:rgba(255,255l,255,1)">
				<view class="grace-columns" style="position: absolute;top: 330rpx;left: 32rpx;">
					<text style="font-size:44rpx;font-weight:bold;color:rgba(218,28,30,1);">￥{{ selling_price }}</text>
					<text style="font-size:24rpx;font-weight:bold;text-decoration:line-through;color:rgba(204,204,204,1);">原价{{price_s}}</text>
				</view>
				<image :src="banners" style="position: absolute;top: 19rpx;left: 30rpx; width: 701rpx;height: 232rpx;"></image>
				<text style="font-size: 63rpx;color: #FFFFFF;position: absolute;left: 327rpx;top: 98rpx;">{{num}}张</text>
					<text style="font-size: 33rpx;color: #FFFFFF;position: absolute;left: 457rpx;top: 140rpx;">（可转让）</text>
				
			</view>
		
			<view @tap="get_pay_type(1)" class="grace-flex grace-flex-vcenter" style="margin-top: 30rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static/rise_vip_weixin.png" style="margin-left: 31rpx; width: 70rpx;height: 70rpx;"></image>
					<text style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">微信支付</text>
					<image :src="pay_tape===1?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'" style="position: relative; top: 17rpx;left: 400rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view>
			<view v-show="is_wx" @tap="get_pay_type(2)" class="grace-flex grace-flex-vcenter" style="margin-top: 5rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static/rise_vip_zhifubao.png" style="margin-left: 31rpx; width: 70rpx;height: 70rpx;"></image>
					<text style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">支付宝支付</text>
					<image :src="pay_tape===2?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'" style="position: relative; top: 17rpx;left: 375rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view>
			<view @tap="get_pay_type(3)" class="grace-flex grace-flex-vcenter" style="position: relative; margin-top: 5rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static/jinbi.png" style="margin-left: 31rpx; width: 70rpx;height: 70rpx;"></image>
					<text style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">金币支付</text>
					<text style="position: absolute;left: 260rpx;line-height: 60rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">剩余金币：{{ yue }}</text>
					<image :src="pay_tape===3?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'" style="position: relative; top: 17rpx;left: 400rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view>
			<button @tap="up_vip()" style="width:687rpx;height:90rpx;background:rgba(218,28,30,1);border-radius:6rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);margin-top: 250rpx;line-height: 90rpx;">立即购买</button>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				pay_tape:1,
				id:'',
				selling_price: "0",//实际售价
				price_s: 0,//原价
				banners:'',//显示的图片
				yue: "0",//客户余额
				is_wx:true,
				num: 0 //券套餐张数
				
			}
		},
		onLoad:function(opt){
			this.id=opt.id;
			this.get_info_data();
			// #ifdef H5
			var ua = navigator.userAgent.toLowerCase();
			// alert(ua)  
			if (ua.search(/MicroMessenger/i) > -1) {  
				this.is_wx=false;
			} else if (ua.search(/mqqbrowser/i) > -1) {  
				this.is_wx=true;
			} else {  
				this.is_wx=true;
			}
			// #endif
			
		},
		methods:{
			get_info_data(){
				var vm=this;
				vm.req.post(
				vm.lochost+'/index/index?method=deduct_roll_buy_page',
				{id:vm.id},
				{},
				function(res){
					console.log(res);
					vm.yue=res.data.balance;
					vm.banners=res.data.buy_img_url;
					vm.price_s=res.data.orig_price;
					vm.selling_price=res.data.sale_price;
					vm.num=res.data.num;
				}
				)
			},
			huoqu_list(){
				var vm=this;
				var type='';
				if(this.pay_tape===1){
					type='微信';
				}else if(this.pay_tape===2){
					type='支付宝';
				}else if(this.pay_tape===3){
					type='金币';
				}
			},
			get_pay_type(type){
				this.pay_tape=type;
				this.huoqu_list();
			},
			up_vip(){
				var vm=this;
				var type='';
				if(this.pay_tape===1){
					type=1;
				}else if(this.pay_tape===2){
					type=2;
				}else if(this.pay_tape===3){
					type=3;
				}
				vm.req.post(
				vm.lochost+'/index/index?method=deduct_roll_buy',
				{id:vm.id,pay_type:type},
				{},
				function(res){
					console.log(res);
					if(vm.pay_tape===3){
						vm.get_info_data();
						vm.msg_show(res.msg);
						
					}
					else{
						console.log(res.data);
						// #ifdef APP-PLUS
						var provider = '';
						var orderInfo = ''
						if (type === 1) {
							provider = 'wxpay';
							orderInfo = res.data.pay_data
						} else if (type === 2) {
							provider = 'alipay';
							orderInfo = res.data.pay_signature
						}
						console.log(provider);
						// 支付数据
						uni.requestPayment({
							provider: provider, // wxpay、alipay
							orderInfo: orderInfo, //微信、支付宝订单数据
							
							success: function(res) {
								uni.showToast({
									title: "支付成功",
								})
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(e) {
								console.log('fail:' + JSON.stringify(e.errMsg));
							}
						});
						// #endif
						
						// #ifdef H5
						// var jweixin = require('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js')
						
						if (type === 0) {
							function onBridgeReady() {
								WeixinJSBridge.invoke(
									'getBrandWCPayRequest', res.data.pay_data,
									function(res) {
						
										if (res.err_msg == "get_brand_wcpay_request:ok") {
											// window.location.href="https://xs.scthzy.com/user/index/index.html";
											// 使用以上方式判断前端返回,微信团队郑重提示：
											//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
										}
									});
							}
							if (typeof WeixinJSBridge == "undefined") {
								if (document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								} else if (document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						
							// wx.config({$payconfig});
							wx.ready(function() {
								wx.chooseWXPay(res.data.pay_data);
							});
							wx.error(function(res) {
								alert(res)
							});
						
						
						
						} else if (type === 2) {
							const form = res.data.pay_signature;
							// deleteExisting('#alipay'); // 判断之前是否插入过#alipay
							const div = document.createElement('div');
							div.id = 'alipay';
							div.innerHTML = form;
							document.body.appendChild(div);
							document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
						
						}
						
						
						
						
						
						// #endif
						
					}

					
				}
				)
			},
			
		
		},
		components:{
			gracePage
		}
	}
</script>

<style>
</style>


<!-- .grace-flex // 声明 flex
.grace-rows // flex 横向
.grace-columns  //flex 竖向
.grace-wrap //flex 自动换行
.grace-nowrap //flex 横向不换行
.grace-space-between //flex 横向两端对齐
.grace-flex-end //flex 横向右对齐
.grace-flex-center  //flex 横向居中
.grace-flex-top  //flex 垂直顶端对齐
.grace-flex-vcenter //flex 垂直居中对齐
.grace-flex-bottom //flex 垂直底部对齐
.grace-no-scale //元素不缩放 -->
