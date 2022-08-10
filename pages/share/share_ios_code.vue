<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<!-- ios端分享下载二维码图片 -->
			<swiper-item style="width:375rpx;height: 667rpx;">
				<image :src="url" style="width: 100%;height: 100%;" mode="scaleToFill"></image>
			</swiper-item>
			<!-- 分享方式按钮选择 -->
			<graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3">

				<view slot="content">
					<view class="grace-flex grace-flex-vcenter grace-flex-center" style="width: 750rpx;height: 200rpx;background: #F0F0F0;">
						<view class="grace-space-between" style="width: 650rpx;">
							<view @tap="share_wx_hy()" class="grace-flex grace-columns">
								<image src="../../static/weixinhaoyou.png" style="margin: 0 auto; width: 100rpx;height: 100rpx;"></image>
								<text>分享给好友</text>
							</view>

							<view @tap="share_wx_pyq()" class="grace-flex grace-columns">
								<image src="../../static/pengyouquan.png" style="margin: 0 auto; width: 100rpx;height: 100rpx;"></image>
								<text>分享到朋友圈</text>
							</view>

							<view @tap="baocun()" class="grace-flex grace-columns">
								<image src="../../static/baocunbendi.png" style="margin: 0 auto; width: 100rpx;height: 100rpx;"></image>
								<text>保存到相册</text>
							</view>
						</view>

					</view>
				</view>
			</graceBottomDialog>
		</view>
	</gracePage>
</template>

<script>
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import _app from '@/js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/util/QS-SharePoster/QS-SharePoster.js';
	export default {
		onNavigationBarButtonTap(e) {
			this.showDialog3();
			console.log(e);
		},
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				img_base64: '',
				show3: false,
				file_path: '',
				url: ''
			}
		},
		onLoad: function() {
			var vm = this;
			vm.req.post(
				vm.lochost + '/mytrunk/index/get_app', {}, {},
				function(res) {
					console.log(res);
					vm.url = res.data.url
					// vm.file_path = res.data.url
					// vm.shareFc(res.data.img_url,res.data.url,res.data.username)
				}
			)
		},
		methods: {

			// 第3个演示 [ 单选 ]
			showDialog3: function() {
				// this.show3 = true;
				// #ifndef APP-PLUS
				this.msg_show('请截图后发送给好友')
				// #endif
				// #ifdef APP-PLUS
				this.show3 = true;
				// #endif

			},
			closeDialog3: function() {
				this.show3 = false;
			},
			baocun() {
				var vm = this;
				uni.saveImageToPhotosAlbum({
					filePath: vm.url,
					success: function() {
						vm.msg_show('保存成功');
						vm.closeDialog3();
					}
				});
			},

			changan() {
				this.showDialog3();
			},
			// async shareFc(backgroundImage,text,name) {
			// 		try {
			// 			console.log('准备生成:' + new Date())
			// 			var sys=uni.getSystemInfoSync();	
			// 			// const { screenWidth, screenHeight } = uni.getSystemInfoSync();	
			// 			var screenWidth =sys.windowWidth;
			// 			var screenHeight =sys.windowHeight;
			// 			console.log(sys);
			// 			// console.log(windowWidth, windowHeight);
			// 			// console.log(uni.getSystemInfoSync());
			// 			const d = await getSharePoster({
			// 				_this: this, //若在组件中使用 必传
			// 				type: 'testShareType',
			// 				backgroundImage:backgroundImage,
			// 				posterCanvasId: this.canvasId,	//canvasId
			// 				delayTimeScale: 20, //延时系数
			// 				// background: {
			// 				// 	width:screenWidth,
			// 				// 	height:screenHeight-44.5,
			// 				// 	backgroundColor: '#ffffff'
			// 				// },

			// 				// imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）, 图片为示例图片
			// 				//     return [{
			// 				//         url: backgroundImage,
			// 				//         dx: 0,
			// 				//         dy: 0,
			// 				//         dWidth: screenWidth,
			// 				//         dHeight: screenHeight-44.5
			// 				// },
			// 				// ]
			// 				// },
			// 				drawArray: ({
			// 					bgObj,
			// 					type,
			// 					bgScale
			// 				}) => {

			// 					const dx = bgObj.width * 0.5;
			// 					const fontSize = bgObj.width * 0.04;
			// 					const lineHeight = bgObj.height * 0.5;
			// 					//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
			// 					return new Promise((rs, rj) => {
			// 						rs([
			// 							{
			// 								type: 'text',
			// 								text: name,
			// 								size: fontSize,
			// 								color: 'rgba(255,255,255,255)',
			// 								alpha: 1,
			// 								textAlign: 'left',
			// 								textBaseline: 'middle',
			// 								infoCallBack(textLength) {
			// 									return {
			// 										// dx: bgObj.width * 0.44,
			// 										// dy: bgObj.width * 0.98
			// 										dx: screenWidth -97,
			// 										dy: screenHeight -15
			// 									}
			// 								}
			// 							},
			// 							{
			// 								type: 'qrcode',
			// 								text: text,
			// 								size: bgObj.width * 0.3,
			// 								dx: screenWidth -140,
			// 								// dy:  bgObj.width * 1.3015
			// 								dy: screenHeight -155
			// 							}
			// 						]);
			// 					})
			// 				},
			// 				setCanvasWH: ({
			// 					bgObj,
			// 					type,
			// 					bgScale
			// 				}) => { // 为动态设置画布宽高的方法，
			// 					this.poster = bgObj;
			// 				}
			// 			});
			// 			console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
			// 			this.img_base64=d.poster.tempFilePath;
			// 			this.poster.finalPath = d.poster.tempFilePath;
			// 			// this.qrShow = true;
			// 		} catch (e) {
			// 			_app.hideLoading();
			// 			_app.showToast(JSON.stringify(e));
			// 			console.log(JSON.stringify(e));
			// 		}
			// 	},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.url, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			// hideQr() {
			// 	this.qrShow = false;
			// }
			share_wx_hy() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: this.url,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			share_wx_pyq() {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 2,
					imageUrl: this.url,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
		},

		components: {
			gracePage,
			graceBottomDialog
		}
	}
</script>

<style>
	page{
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.grace-dialog-buttons {
		width: 150rpx;
		line-height: 88rpx;
		height: 88rpx;
		display: block;
		overflow: hidden;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}
</style>
