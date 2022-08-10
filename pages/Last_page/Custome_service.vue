<template>
	<!-- 联系客服 -->
	<view>
		<!-- 客服banner -->
		<view class="banner">
			<image src="../../static2/kafbanner.png" mode="" style="width: 100%;height: 100%;"></image>
		</view>
		<!-- 客服热线 -->
		<view class="rexians" @tap="phonecall">
			<image src="../../static2/kefu.png" mode="" class="kfs"></image>
			<view class="jianex"></view>
			<view class="dianhuas">
				<view style="font-size: 34rpx;color:rgba(28, 27, 27, 1);font-weight:normal;font-family:Adobe Heiti Std;">客服服务热线</view>
				<view style="font-size: 28rpx;color: rgba(127, 126, 126, 1);">{{phone_number}}</view>
			</view>
			<image src="../../static2/jianto.png" mode="" class="jtst"></image>
		</view>
		<!-- 微信 -->
		<view class="rexians" @tap="copy_weixin(we_chat_id)">
			<image src="../../static2/weix.png" mode="" class="kfs"></image>
			<view class="jianex"></view>
			<view class="dianhuas">
				<view style="font-size: 34rpx;color:rgba(28, 27, 27, 1);font-weight:normal;font-family:Adobe Heiti Std;">官方微信</view>
				<view style="font-size: 28rpx;color: rgba(127, 126, 126, 1);">复制微信账号，添加客服微信</view>
			</view>
			<image src="../../static2/jianto.png" mode="" class="jtst"></image>
		</view>
		<!-- 客服服务时间 -->
		<view class="fuwu">客服服务时间：周一至周日 9:30-18:00</view>
		<text style="font-size: 24rpx;color: rgba(153, 153, 153, 1);margin-left: 260rpx;">（法定节假日除外）</text>
		<!-- 微信复制弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<view class="sharhaoy">
					<text>分享好友</text>
				</view>
				<view class="sharhaoy_2">
					<text>复制成功，打开微信添加朋友粘贴号码搜索即可添加</text>
				</view>
				<image src="../../static2/fxtp.png" mode="" class="img_fx"></image>
				<view class="fx_an" @tap="ios_wx">
					<a href="weixin://dl/businessWebview/link/?appid=wx707c5fa91ef0a58c&url=http://baidu.com">我知道了</a>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				phone_number: '',
				we_chat_id: ''
			}
		},
		onLoad() {
			var vm = this
			this.req.post(
				this.lochost + '/index/index?method=contact_we', {
					type: 2 
				}, {},
				function(res) {
					console.log(res);
					vm.phone_number = res.data.phone_number
					vm.we_chat_id = res.data.we_chat_id
				}
			)
		},
		methods: {
			// 拨打电话
			phonecall() {
				uni.makePhoneCall({
					phoneNumber: this.phone_number //仅为示例
				});
			},
			// 微信复制
			copy_weixin(value) {
				this.$refs.popup.open()
				// console.log(value);

				// uni.setClipboardData({
				// 	data: value,
				// 	complete: function() {
				// 		console.log(data);
				// 	}
				// });
				uni.setClipboardData({
					data: value,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								console.log(res);
								// uni.showToast({
								// 	title: '已复制到剪贴板',
								// 	icon: 'none'
								// });
							}
						});
					}
				});
			},
			ios_wx() {
				this.$refs.popup.close()
				// var UIApplication = plus.ios_wx.import('UIApplication');
				// var NSURL = plus.ios_wx.import('NSURL');
				// var setting = NSURL.URLWithString('weixin://');
				// var application = UIApplication.sharedApplication();
				// application.openURL(setting);
				// plus.ios_wx.deleteObject(setting);
				// plus.ios_wx.deleteObject(application);

			}
		},
		components: {
			uniPopup
		}
	}
</script>

<style>
	.banner {
		width: 660rpx;
		height: 310rpx;
		margin-top: 31rpx;
		margin-left: 47rpx;
	}

	.rexians {
		width: 660rpx;
		height: 160rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-top: 42rpx;
		margin-left: 47rpx;
	}

	.kfs {
		width: 80rpx;
		height: 80rpx;
		transform: translate(23rpx, 40rpx);
		display: inline-block;
	}

	.jianex {
		display: inline-block;
		width: 2rpx;
		height: 80rpx;
		background: rgba(215, 213, 213, 1);
		transform: translate(36rpx, 40rpx);
	}

	.dianhuas {
		line-height: 60rpx;
		transform: translate(151rpx, -70rpx);
	}

	.jtst {
		display: inline-block;
		width: 18rpx;
		height: 28rpx;
		transform: translate(607rpx, -140rpx);
	}

	.fuwu {
		width: 437rpx;
		font-size: 24rpx;
		color: rgba(153, 153, 153, 1);
		margin-top: 308rpx;
		margin-left: 157rpx;
	}

	.popup {
		width: 500rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.sharhaoy {
		font-size: 34rpx;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		transform: translateY(13rpx);
	}

	.sharhaoy_2 {
		font-size: 24rpx;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		transform: translateY(23rpx);
	}

	.img_fx {
		width: 260rpx;
		height: 384rpx;
		margin-left: 140rpx;
		margin-top: 30rpx;
	}

	.fx_an {
		width: 500rpx;
		height: 59rpx;
		background-color: rgba(79, 159, 253, 1);
		border-radius: 0 0 10rpx 10rpx;
		margin-top: 15rpx;
		text-align: center;
		line-height: 59rpx;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	/*包含以下四种的链接*/
	a {
		text-decoration: none;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	/*正常的未被访问过的链接*/
	a:link {
		text-decoration: none;
	}

	/*已经访问过的链接*/
	a:visited {
		text-decoration: none;
	}

	/*鼠标划过(停留)的链接*/
	a:hover {
		text-decoration: none;
	}

	/* 正在点击的链接*/
	a:active {
		text-decoration: none;
	}
</style>
