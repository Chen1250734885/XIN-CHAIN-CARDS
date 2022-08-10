<template>
	<view>
		<!-- 持卡人 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">持卡人：</text>
			<text style="margin-left: 110rpx;">{{bc_account_name}}</text>
		</view>
		<!-- 卡号 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">卡号：</text>
			<text style="margin-left: 140rpx;">{{bc_bank_number}}</text>
		</view>
		<!-- 发卡银行 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">发卡银行：</text>
			<text style="margin-left: 89rpx;">{{bank_name}}</text>
		</view>
		<!-- 有效期 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">有效期：</text>
			<text style="margin-left: 120rpx;">{{bc_effective}}</text>
		</view>
		<!-- CVN2 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">CVN2：</text>
			<text style="margin-left: 130rpx;">{{bc_CVN2}}</text>
		</view>
		<!-- 账单日 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">账单日：</text>
			<text style="margin-left: 120rpx;">{{bc_bill}}日</text>
		</view>
		<!-- 还款日 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">还款日：</text>
			<text style="margin-left: 120rpx;">{{bc_repayment}}日</text>
		</view>
		<!-- 预留电话 -->
		<view style="width: 750rpx;height: 100rpx;background-color: #FFFFFF;margin-top: 1rpx;">
			<text style="line-height: 100rpx;margin-left: 38rpx;font-size: 28rpx;">预留电话：</text>
			<text style="margin-left: 100rpx;">{{bc_mobile}}</text>
		</view>
		<button @tap="shanchu" style="width: 500rpx;height: 80rpx;background-color:rgba(79,159,254,1);border-radius: 5rpx;margin-top: 40rpx;font-size: 28rpx;color: #FFFFFF;line-height: 80rpx;">确认删除</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				id: '',
				bc_account_name: '',
				bc_bank_number: '',
				bank_name: '',
				bc_effective: '',
				bc_CVN2: '***',
				bc_bill: '',
				bc_repayment: '',
				bc_mobile: ''

			}
		},
		onLoad(opt) {
			console.log(opt);
			this.id = opt.bc_id
			this.bc_account_name = opt.bc_account_name
			this.bc_bank_number = opt.bc_bank_number
			this.bank_name = opt.bank_name
			this.bc_effective = opt.bc_effective
			this.bc_bill = opt.bc_bill
			this.bc_repayment = opt.bc_repayment
			this.bc_mobile = opt.bc_mobile
			
		},
		methods:{
			shanchu(){
				this.req.post(
					this.lochost + '/index/index?method=del_savings', {bc_id:this.id}, {},
					function(res) {
						if(res.code === 200){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							});
							this.Back()
						}
						
					});
			}
		}
	}
</script>

<style>
</style>
