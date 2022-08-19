<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view style="margin: 15rpx auto;;width: 690rpx;height: 320rpx; background-size: contain;">
				<!-- <scroll-view class="grace-scroll-x" scroll-x="true" scroll-left="100"   >
					<view v-for="(item1,index) in data" :key="index" style="display: inline-block;">
						<image :src="item1.img_url" mode="" style="width: 524rpx;height: 270rpx;margin: 30rpx 43rpx;"></image>
						<view class="swiper">
							<text>剩余：</text>
							<text style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num1}}</text>
							<text style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num2}}</text>
							<text style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num3}}</text>
							<text style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num4}}</text>
							<text>张</text>
							<view  v-if="item1.state==1" class="jes">￥{{item1.price}}元</view> 
						</view>
						
					</view>
				</scroll-view> -->
				<swiper class="" style="height: 380rpx;">
					<swiper-item v-for="(item1,index) in data" :key="index" style="margin-left: 50rpx;">
						<image :src="item1.img_url" mode=""
							style="width: 550rpx;height: 270rpx;margin: 30rpx 20rpx;display: block;">
						</image>
						<view class="swiper">
							<text style="margin-left: 5rpx;">剩余：</text>
							<text
								style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num1}}</text>
							<text
								style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num2}}</text>
							<text
								style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num3}}</text>
							<text
								style="background-color: #000000;border-radius:6px;padding: 0 5rpx;margin-right: 5rpx;">{{item1.num4}}</text>
							<text>张</text>
							<view v-if="item1.state==1" class="jes">￥{{item1.price}}元</view>
						</view>
					</swiper-item>
				</swiper>
				</text>
			</view>

			<view
				style="margin: 5rpx auto; background-image: url(../../static/rise_vip_youshi.png);background-size: contain;width: 690rpx;height: 340rpx;">
				<view style="position: relative;top:85rpx;left: 75rpx;">
					<view v-for="(item,index) in texts" :key="index" class="grace-rows">
						<view
							style="position: relative;top: 12rpx; width:8rpx;height:8rpx;background:rgba(67,63,51,1);border-radius:50%;">
						</view>
						<text
							style="margin-left: 20rpx; font-size:24rpx;font-weight:400;color:rgba(84,82,76,1);">{{ item }}</text>
					</view>
				</view>
			</view>

			<view @tap="get_pay_type(0)" class="grace-flex grace-flex-vcenter"
				style="margin-top: 30rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static/rise_vip_weixin.png"
						style="margin-left: 31rpx; width: 70rpx;height: 70rpx;"></image>
					<text
						style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">微信支付</text>
					<image
						:src="pay_tape===0?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'"
						style="position: relative; top: 17rpx;left: 400rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view>
			<view v-show="is_wx" @tap="get_pay_type(1)" class="grace-flex grace-flex-vcenter"
				style="margin-top: 5rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static/rise_vip_zhifubao.png"
						style="margin-left: 31rpx; width: 70rpx;height: 70rpx;"></image>
					<text
						style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">支付宝支付</text>
					<image
						:src="pay_tape===1?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'"
						style="position: relative; top: 17rpx;left: 375rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view>
			<!-- 			<view v-show="is_have_card!==0" @tap="get_pay_type(2)" class="grace-flex grace-flex-vcenter"
				style="margin-top: 5rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
				<view class="grace-rows">
					<image src="../../static2/xlkzf.png" style="margin-left: 31rpx; width: 70rpx;height: 70rpx;">
					</image>
					<text
						style="margin-left: 31rpx; font-size:26rpx;font-weight:400;color:rgba(42,42,42,1);line-height:30px;">鑫链卡支付</text>
					<image
						:src="pay_tape===2?'../../static/rise_vip_xuanzhong.png':'../../static/rise_vip_weixuanzhong.png'"
						style="position: relative; top: 17rpx;left: 375rpx; width: 32rpx;height: 32rpx;"></image>
				</view>
			</view> -->


			<button @tap="up_vip()"
				style="margin-top: 100rpx; width:687rpx;height:90rpx;background:rgba(22,120,255,1);border-radius:6rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);line-height:90rpx;">立即升级</button>
			<!-- <button v-show="!xianshi"  style="margin-top: 100rpx; width:687rpx;height:90rpx;background:#999999;border-radius:6rpx;font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);line-height:90rpx;">已是会员</button> -->
		</view>
	</gracePage>
</template>
<!-- <script src="//res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script> -->
<!-- <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.inc.min.js"></script> -->
<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				pay_tape: 0,
				tubiao: '',
				texts: [],
				data: [],
				money: '',
				xianshi: true,
				is_wx: true,
				c_id: '',
				is_have_card: ''
			}
		},
		onShow: function() {
			this.huoqu_list();
			// #ifdef H5
			var ua = navigator.userAgent.toLowerCase();
			// alert(ua)  
			if (ua.search(/MicroMessenger/i) > -1) {
				this.is_wx = false;
			} else if (ua.search(/mqqbrowser/i) > -1) {
				this.is_wx = true;
			} else {
				this.is_wx = true;
			}
			// #endif
		},
		methods: {
			huoqu_list() {
				var vm = this;
				var type = '';
				if (this.pay_tape === 0) {
					type = 1;
				} else {
					type = 2;
				}
				vm.req.post(
					vm.lochost + '/index/index?method=user_upgrade_page', {}, {},
					function(res) {
						// console.log(res, "=============");
						vm.texts = res.data.text;
						vm.data = res.data.data;
						vm.tubiao = res.data.tubiao;
						vm.money = res.data.money;
						vm.is_have_card = res.data.is_have_card
						var xianshi1 = res.data.xianshi;
						if (xianshi1 === 1) {
							vm.xianshi = true;
						} else {
							vm.xianshi = false;
						}
						for (var i = 0; i < vm.data.length; i++) {
							console.log(vm.data[0]);
							vm.c_id = vm.data[0].c_id
						}
					}
				)
			},
			get_pay_type(type) {
				this.pay_tape = type;
				this.huoqu_list();
			},
			up_vip() {
				var vm = this;
				var type = '';
				if (this.pay_tape === 2) {
					vm.Goto('/pages/profit/Xinka')
					return
				}
				if (this.pay_tape === 0) {
					type = 1;
				} else {
					type = 2;
				}
				vm.req.post(
					vm.lochost + '/index/index?method=user_upgrade_confirm', {
						pay_type: type,
						c_id: vm.c_id
					}, {},
					function(res) {
						console.log(res);
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
							let form = res.data.pay_signature;
							location.href = 'https://openapi.alipay.com/gateway.do?' + form
							// // deleteExisting('#alipay'); // 判断之前是否插入过#alipay
							// let div = document.createElement('form');
							// div.id = 'alipay';
							// div.action = 'https://openapi.alipay.com/gateway.do';
							// div.method = 'post';
							// let newForm = form.split("&");
							// let html = '';
							// newForm.forEach(function (item) {
							//     let items = item.split("=");
							// 	let value = items[1]
							// 	let name = items[0]
							// 	if(items[0]=='timestamp'){
							// 		value = value.replace("+"," ");
							// 	}
							// 	html += '<input name="'+items[0]+'" value="'+decodeURIComponent(value)+'">'
							// });
							// console.log(html);
							// div.innerHTML = html;
							// document.body.appendChild(div);
							// document.querySelector('#alipay').submit(); // 执行后会唤起支付宝
						}

						// 为正常对接支付宝支付(未配置支付宝公钥/私钥)



						// #endif


					}
				)
			},

		},
		components: {
			gracePage
		}
	}
</script>


<style>
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.swiper {
		transform: translate(340rpx, -76rpx);
		z-index: 99;
		color: #FFFFFF;
	}

	.jes {
		transform: translateX(-468rpx);
		/* padding: -10rpx !important; */
		float: right;
		margin-top: -50rpx;
		font-size: 43rpx
	}
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
