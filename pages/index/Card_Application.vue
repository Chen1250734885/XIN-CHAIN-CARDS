<template>
	<!-- 申请信用卡 -->
	<view class="shenkatodao">
		<view class="bankas">
			<image src="../../static2/banka.png" mode="" style="width: 690rpx;height: 306rpx;margin-top: 19rpx;margin-left: 31rpx;"></image>
		</view>
		<view class="remenyi">
			<text style="margin-left: 31rpx;">热门银行</text>
		</view>
		<view class="yinhangs">
			<view class="mins_yin">
				<view style="text-align: center;transform: translateY(37rpx);">
					<image src="../../static2/misheng.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view style="text-align: center;">
					<text style="font-size:24rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);line-height:90rpx;">民生银行</text>
				</view>
			</view>
			<view class="mins_yin">
				<view style="text-align: center;transform: translateY(37rpx);">
					<image src="../../static2/guangda.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view style="text-align: center;">
					<text style="font-size:24rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);line-height:90rpx;">光大银行</text>
				</view>
			</view>
			<view class="mins_yin">
				<view style="text-align: center;transform: translateY(37rpx);">
					<image src="../../static2/zhongxin.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view style="text-align: center;">
					<text style="font-size:24rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);line-height:90rpx;">中信银行</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page{
		background-color: RGBA(247, 247, 247, 1);
	}
	.bankas{
		width: 750rpx;
		height: 360rpx;
		background-color: #FFFFFF;
	}
	.remenyi{
		width: 750rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		font-size:24rpx;
		color:rgba(51,51,51,1);
		line-height:40rpx;
	}
	.yinhangs{
		display: inline-block;
	}
	.mins_yin{
		width: 186rpx;
		height: 186rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		margin-right: 1rpx;
		display: inline-block;
	}
</style>
