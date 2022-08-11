<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<view
				style="margin-top: 43rpx; background-image: url(../../static/logo_bgss.png);width: 750rpx;height: 450rpx;background-size:cover;">
				<view class="grace-rows">
					<view class="grace-columns" style="position:relative;top: 168rpx;left: 115rpx;">
						<text style="font-size:42rpx;font-weight:bold;color:rgba(254,255,254,1);">您已实名认证</text>
						<view class="grace-rows" style="margin-top: 25rpx;">
							<text style="font-size:30rpx;font-weight:500;color:rgba(254,255,254,1);">{{ name }}</text>
							<button @tap="xiugai"
								style="left: 40rpx; width:170rpx;height:50rpx;background:rgba(255,255,255,1);border-radius:15rpx;position: relative;font-size:24rpx;font-weight:400;color:#4F9FFE;line-height: 50rpx;z-index: 999;">
								修改信息
							</button>
						</view>
						<text
							style="margin-top: 25rpx; font-size:30rpx;font-weight:500;color:rgba(254,255,254,1);">{{ identity }}</text>
					</view>
				</view>
				<image src="../../static/yishiming.png"
					style="position: relative;bottom: 20rpx; left: 490rpx; width: 180rpx;height: 180rpx;"></image>
			</view>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				name: '鑫琏卡',
				identity: '5100000000000'
			}
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/personal_center/personal_center'
			})
		},
		onLoad(opt) {
			console.log(opt);
			var vm = this
			vm.name = opt.nickname;
			vm.identity = opt.identity;
		},
		onShow() {
			var vm = this;
			vm.req.post(
				vm.lochost + '/index/index?method=user_index', {}, {},
				function(res) {
					console.log(res);
					vm.name = res.data.real_name;
					vm.identity = res.data.identity;
				}
			)
		},
		methods: {
			xiugai() {
				this.Goto('/pages/authentication/modify_real_name')
			}
		},
		components: {
			gracePage
		}
	}
</script>

<style>
</style>
