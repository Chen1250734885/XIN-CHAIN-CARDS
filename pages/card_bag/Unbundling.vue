<template>
	<!-- 删除储蓄卡 -->
	<view>
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">持卡人：</text>
				<view class="grace-columns">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);margin-left: 100rpx;">{{user_name}}</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">卡号：</text>
				<view class="grace-columns">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);margin-left: 130rpx;">{{bank_card}}</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">发卡银行：</text>
				<view class="grace-columns">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);margin-left: 80rpx;">{{bank_name}}</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 2rpx; width:750rpx;height:100rpx;background:rgba(255,255,255,1);">
			<view class="grace-rows" style="position: relative;top: 30rpx;left: 38rpx;">
				<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">预留电话：</text>
				<view class="grace-columns">
					<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);margin-left: 80rpx;">{{bank_tel}}</text>
				</view>
			</view>
		</view>
		<button @tap="submit" type="primary" style="margin-top: 50rpx; width:500rpx;height:90rpx;background:#1678FF;border-radius:6rpx;">确认删除</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_name: '',
				bank_card: '',
				bank_name: '',
				bank_tel: '',
				bc_id: ''
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.user_name = opt.bc_account_name;
			this.bank_card = opt.bank_card
			this.bank_name = opt.bank_name
			this.bank_tel = opt.bank_tel
			this.bc_id = opt.bc_id
		},
		methods: {
			submit() {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=del_savings', {
						bc_id: vm.bc_id,
					}, {},
					function(res) {
						if (res.code == 200) {
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 700);
						} else {
							vm.msg_show(res.msg);
						}
					}
				)
			}
		}
	}
</script>

<style>
</style>
