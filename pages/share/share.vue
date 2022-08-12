<template>
	<view class="share">
		<!-- 分享banner -->
		<view >
			<image src="../../static2/fenx.png" mode="" style="width: 750rpx;height: 390rpx;"></image>
		</view>
		<!-- 分享二维码 -->
		<view class="weimas" @tap="Goto('/pages/share/share_qr_code?uid='+uid)">
			<image src="../../static2/erwei.png" mode="" style="width: 42rpx;height: 42rpx;display: inline-block;margin-left: 25rpx;transform: translateY(-10rpx);"></image>
			<view style="display: inline-block;margin-left: 31rpx;line-height: 50rpx;">
			<view style="font-size: 32rpx;">分享二维码</view>
			<view style="font-size: 24rpx;color: rgba(241, 51, 51, 1);">分享二维码后请让客户关注一刷通微信公众号</view>
			</view>
			<image src="../../static2/gengduo.png" mode="" style="width: 19rpx;height: 34rpx;margin-left: 125rpx;transform: translateY(-10rpx);"></image>
		</view>
		<!-- 分享公众号 -->
		<!-- <view class="weimass" @tap="xianshi">
			<image src="../../static2/wex.png" mode="" style="width: 42rpx;height: 42rpx;margin-left: 25rpx;margin-right: 31rpx;transform: translateY(10rpx);"></image>
			<text style="font-size: 32rpx;">分享一刷通微信公众号（<text style="font-size: 32rpx;color: rgba(252, 128, 128, 1);font-weight: bold;">客服</text>）</text>
			<image src="../../static2/gengduo.png" mode="" style="width: 19rpx;height: 34rpx;margin-left: 155rpx;"></image>
		</view> -->
		<graceBottomDialog :show="show3" v-on:closeDialog="closeDialog3">
			
			<view slot="content">
				<view class="grace-flex grace-flex-vcenter " style="width: 750rpx;height: 310rpx;background: #F0F0F0;">
					<view class="grace-space-between" style="margin-left: 98rpx;margin-top: -60rpx;" >
						<view @tap="share_wx_hy()" class=" grace-columns">
							<image src="../../static2/weixinhaoyou.png" style=" width: 120rpx;height: 120rpx;"></image>
							<text style="font-size: 22rpx;margin-top: 18rpx;">分享给好友</text>
						</view>
						
						<view @tap="share_wx_pyq()" class=" grace-columns" style="margin-left: 97rpx;">
							<image src="../../static2/pengyouquan.png" style=" width: 120rpx;height: 120rpx;"></image>
							<text style="font-size: 22rpx;margin-top: 18rpx;">分享到朋友圈</text>
						</view>
						
						<!-- <view @tap="baocun()" class="grace-flex grace-columns">
							<image src="../../static/baocunbendi.png" style="margin: 0 auto; width: 100rpx;height: 100rpx;"></image>
							<text>保存到相册</text>
						</view> -->
					</view>
					<view class="quxioas" @tap="yingchang">取消</view>
					
				</view>
				
			</view>
		</graceBottomDialog>
		<!-- 客服帮助 -->
		<view class="kef_s" @tap="qiaozhuandaokehu">
			<image :style="'left:'+moveX+'px;top:'+moveY+'px'" @touchstart="drag_start" @touchmove.prevent="drag_hmove" src="../../static2/kefs.png"
			 mode="" style="width: 152rpx;height:79rpx;transform: translate(4rpx,4rpx);"></image>
		</view>
	</view>
</template>

<script>
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import gracePage from "../../graceUI/components/gracePage.vue";
	import _app from '@/js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		data() {
			return {
				uid: '',
				show3: false,
				imageUrl: '',
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
			}
		},
		onLoad:function(){
			this.user_index()
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
		},
		methods:{
			drag_start(event) {
				this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
				this.start[1] = event.touches[0].clientY - event.target.offsetTop;
			},
			drag_hmove(event) {
				let tag = event.touches;
				if (tag[0].clientX < 0) {
					tag[0].clientX = 0
				}
				if (tag[0].clientY < 0) {
					tag[0].clientY = 0
				}
				if (tag[0].clientX > this.windowWidth) {
					tag[0].clientX = this.windowWidth
				}
				if (tag[0].clientY > this.windowHeight) {
					tag[0].clientY = this.windowHeight
				}
				this.moveX = tag[0].clientX - this.start[0];
				this.moveY = tag[0].clientY - this.start[1];
			},
			qiaozhuandaokehu() {
				uni.navigateTo({
					url: '/pages/Last_page/Custome_services'
				})
			},
			// 获取用户id
			user_index(){
				var vm = this
				vm.req.post(
				vm.lochost+'/index/index?method=user_index',{},{},function(res){
					vm.uid = res.data.id
				}
				)
			},
			// 显示分享
			xianshi(){
				this.show3 = true;
				var vm = this
				vm.req.post(
					vm.lochost + '/share/get_share_data?uid=' + vm.uid,{
						uid: vm.uid
					},{},function(res){
						// console.log( res.data.share_we_chat_public_account.public_account_url);
						vm.imageUrl = res.data.share_we_chat_public_account.public_account_url
						console.log(vm.imageUrl);
					}
				)
			},
			// 取消分享按钮
			yingchang(){
				this.show3 = false;
			},
			closeDialog3(){
				this.show3 = false;
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.imageUrl, false, false);
				// #endif
			
				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			// 分享好友
			share_wx_hy() {
				uni.shareWithSystem({
					 summary: '',
					  href: this.imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//分享朋友圈
			share_wx_pyq() {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 2,
					imageUrl: this.imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		components:{
			gracePage,
			graceBottomDialog
		}
	}
</script>

<style>
	.kef_s {
		position: absolute;
		top: 550rpx;
		left: 598rpx;
		z-index: 9999;
		float: right;
	}
	.weimas{
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		margin-top: 5rpx;
		
	}
	.weimass{
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		line-height: 100rpx;
	}
	.quxioas{
		width: 750rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 1);
		position: absolute;
		bottom: 0;
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
