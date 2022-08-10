<template>
	<!-- 我的商户 -->
	<view>
		<view class="td ">
			<!-- 我的直推数 -->
			<view class=" zhitui">
				<view style="font-size: 30rpx;color: #333333;font-family:PingFang SC;">我的直推</view>
				<text style="margin-left: 45rpx;font-size: 30rpx;font-family:PingFang SC;">{{zhitui}}</text>
			</view>
			<!-- 我的团队 -->
			<view class=" tuandui">
				<view style="font-size: 30rpx;color: #333333;font-family:PingFang SC;">我的团队</view>
				<text style="margin-left: 45rpx;font-size: 30rpx;font-family:PingFang SC;">{{tuandui}}</text>
			</view>
			<!-- VIP人数 -->
			<view class=" vip_r">
				<view style="font-size: 30rpx;color: #333333;font-family:PingFang SC;">VIP人数</view>
				<text style="margin-left: 45rpx;font-size: 30rpx;font-family:PingFang SC;">{{vip}}</text>
			</view>
		</view>
		<view class="shanghu">
			<view class="xianq" v-for="(item ,index) in child" :key="index">
				<view class="mz">
					<text class="ch">{{item.name}}</text>
					<text class="ch_2">{{item.level.name}}</text>
				</view>
				<view class="mz">
					<text class="phons">{{item.phone}}</text>
					<text class="phons_2">{{item.create_time}}</text>
				</view>
				<view class="xiaohua"></view>
				<view class="renshu">
					<text style="font-size:24rpx;color:rgba(51,51,51,1);margin-left: 33rpx;margin-right: 110rpx;">直推人数：{{item.zitui}}</text>
					<text style="font-size:24rpx;color:rgba(51,51,51,1);margin-right: 107rpx;">团队人数：{{item.tuandui}}</text>
					<text style="font-size:24rpx;color:rgba(51,51,51,1);">VIP人数：{{item.vip}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tuandui: '',
				vip: '',
				zhitui:'',
				child: []
			}
		},
		onShow() {
			var vm = this;
			vm.req.post(
			vm.lochost+'/mytrunk/userapi/get_shang_hu',
			{},
			{},
			function(res){
				console.log(res)
				vm.tuandui = res.data.tuandui;
				vm.zhitui = res.data.zhitui;
				vm.vip = res.data.vip
				var child_list = res.data.child
				for (let i = 0; i < child_list.length; i++) {
					vm.child.push(child_list[i])
				}
			})
		}
	}
</script>

<style>
	.td {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		padding-bottom: 19rpx;
	}

	.zhitui {
		display: inline-block;
		margin-top: 20rpx;
		margin-left: 54rpx;
		margin-right: 145rpx;
	}

	.tuandui {
		display: inline-block;
		margin-top: 20rpx;
		margin-right: 152rpx;
	}

	.vip_r {
		display: inline-block;
		margin-top: 20rpx;
	}

	.shanghu {
		margin-top: 16rpx;
	}

	.xianq {
		width: 750rpx;
		height: 138rpx;
		background-color: #FFFFFF;
		margin-bottom: 12rpx;
	}

	.mz {
		display: flex;
		justify-content: space-between;
	}

	.ch {
		font-size: 30rpx;
		color: rgba(68, 68, 68, 1);
		margin-left: 24rpx;
		margin-top: 15rpx;
	}

	.ch_2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-top: 21rpx;
		margin-right: 23rpx;
	}
	.phons{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(85,85,85,1);
		opacity:0.8;
		/* margin-top: -10rpx; */
		margin-left: 24rpx;
	}
	.phons_2{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(85,85,85,1);
		opacity:0.8;
		margin-right: 28rpx;
	}
	.xiaohua{
		width: 702rpx;
		height: 2rpx;
		background-color: #CECECE;
		margin-left: 24rpx;
		margin-top: 10rpx;
	}
	.renshu{
	}
</style>
