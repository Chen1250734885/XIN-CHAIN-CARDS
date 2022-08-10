<template>
	<!-- 关于我们 -->
	<view>
		<view style="text-align: center;">
			<image src="../../static2/logo.png" mode="" class="loohos"></image>
			<text >版本号：v{{version}}</text>
		</view>
		<view class="jiaoc" @tap="shiyong">
			<text style="margin-left: 43rpx;">使用教程</text>
			<image src="../../static2/jianto.png" mode="" style="width: 14rpx;height: 26rpx;transform: translate(-24rpx,37rpx);"></image>
		</view>
		
		<view style="margin-top: 612rpx;text-align: center;">
			<view style="font-size: 24rpx;color: rgba(153, 153, 153, 1);">四川欧迈卡电子科技有限公司版权所有</view>
			<view style="font-size: 24rpx;color: rgba(153, 153, 153, 1);">copyright © 2018 Yuanchuang</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				version: ''
			}
		},
		onShow() {
			this.version = this.req.get_sys_edition()
		},
		methods:{
			shiyong(){
				var vm = this
				console.log(1211);
				uni.navigateTo({
					url:'../souxin_view/souxin_view?url=https://m.xliank.com/api/share/using_help'
				})
				// vm.Goto('https://m.xliank.com/api/share/using_help')
				// vm.req.get(
				// 	vm.lochost + '/share/using_help',{},{},function(res){
				// 		console.log(res);
				// 	}
				// )
			}
		}
	}
</script>

<style>
	.loohos{
		width: 172rpx;
		height: 187rpx;
		margin: 49rpx 289rpx 17rpx; 
	}
	.jiaoc{
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		margin-top: 83rpx;
		display: flex;
		justify-content: space-between;
	}
</style>
