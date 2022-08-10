<template>
	<!-- 安全设置 -->
	<view>
		<view class="delvs" @tap="xiugai">
			<view class="modsil">
				<image src="../../static2/denglv.png" mode="" class="mimas"></image>
				<text style="font-size: 30rpx;color: rgba(51, 51, 51, 1);margin-left: 20rpx;">登录密码</text>
			</view>
			<image src="../../static2/jianto.png" mode="" class="jiantom"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{}
		},
		methods:{
			xiugai(){
				this.Goto('/pages/Last_page/Security')
			}
		}
	}
</script>

<style>
	.delvs{
		width: 750rpx;
		height: 80rpx;
		background-color: #FFFFFF;
	}
	.mimas{
		width: 40rpx;
		height: 40rpx;
		transform: translateY(8rpx);
	}
	.modsil{
		display: inline-block;
		line-height: 80rpx;
		margin-left: 24rpx;
	}
	.jiantom{
		display: inline-block;
		width: 14rpx;
		height: 26rpx;
		transform: translate(511rpx,5rpx);
	}
</style>
