<template>
	<!-- 鑫链卡使用 -->
	<view slot="gBody">
		<!-- 卡编码 -->
		<view class="kabm">
			<text style="font-size: 28rpx; margin-left: 41rpx;margin-right: 95rpx;">卡编码:</text>
			<text>{{coding}}</text>
		</view>
		<!-- 使用对象 -->
		<view class="shiydx">
			<text style="font-size: 28rpx; margin-left: 41rpx;margin-right: 75rpx;">使用对象:</text>
			<input type="number" @input="tianxie" placeholder="请输入手机号码" :value="phone" placeholder-style="font-size: 22rpx;"
			 style="width: 240rpx;display: inline-block;transform: translateY(10rpx);" />
		</view>
		<!-- 提示 -->
		<text style="font-size: 22rpx;color: rgba(154, 154, 154, 1);margin-left: 43rpx;">*请确认输入手机号码是否正确，若输入错误，确认后无法撤回</text>
		<!-- 用户操作按钮 -->
		<view style="margin-top: 200rpx;margin-left: 50rpx;">
			<view class="zhuanran" @tap="zr_an">转让</view>
			<view class="ruer" @tap="sj_an">升级</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coding: '',
				phone: '',
				card_id: '',
				val: ''
			}
		},
		onLoad(opt) {
			this.coding = opt.coding
			this.card_id = opt.card_id
		},
		onShow() {},
		methods: {
			// 输入手机号码
			tianxie(obj) {
				this.val = obj.detail.value
				if (this.val.length > 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
			},
			// 转让按钮
			zr_an() {
				if (this.val == '') {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				} else {
					var vm = this
					vm.req.mypost(
						vm.lochost + '/index/index?method=send_card', {
							card_id: vm.card_id,
							phone: vm.val
						},
						function(res) {
							console.log(res);
							if (res.code == 200) {
								uni.showToast({
									title: '转让成功',
									icon: 'none'
								})
							}else{
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}

						}
					)
				}
			},
			// 升级按钮
			sj_an() {
				if (this.val == '') {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				} else {
					var vm = this
					vm.req.post(
						vm.lochost + '/index/index?method=upgrade_other', {
							phone: vm.val,
							card_id: vm.card_id,
						}, {},
						function(res) {
							console.log(res);
							if(res.code == 200){
								uni.showToast({
									title:'升级成功',
									icon:'none'
								})
							}
						}
					)
				}
			}
		}

	}
</script>

<style>
	.kabm {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
	}

	.shiydx {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
		margin-top: 1rpx;
		margin-bottom: 18rpx;
	}

	.zhuanran {
		width: 280rpx;
		height: 70rpx;
		background-color: #FFFFFF;
		color: rgba(154, 154, 154, 1);
		display: inline-block;
		font-size: 32rpx;
		line-height: 70rpx;
		text-align: center;
		margin-right: 100rpx;
	}

	.ruer {
		width: 280rpx;
		height: 70rpx;
		background-color: RGBA(3, 124, 234, 1);
		color: #FFFFFF;
		font-size: 32rpx;
		line-height: 70rpx;
		text-align: center;
		display: inline-block;
	}
</style>
