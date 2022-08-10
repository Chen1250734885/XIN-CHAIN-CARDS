<template>
	<!-- 我的推广 -->
	<view class="tuiguang">
		<scroll-view class="grace-scroll-y" scroll-y="true" :style="{height:height}" @scrolltolower="popularize()">
		<view class="tgsys" v-for="(item,index) in popularizes" :key="index">
			<view class="tgyh_1">
				<text style="font-size: 30rpx;color: rgba(68, 68, 68, 1);">{{item.name}}</text>
				<text style="font-size: 22rpx;color: rgba(52, 52, 52, 1);">{{item.gl_name}}</text>
			</view>
			<view class="tgyh_2">
				<text style="font-size: 22rpx;color: rgba(86, 86, 86, 1);">{{item.tel}}</text>
				<text style="font-size: 22rpx;color: rgba(52, 52, 52, 1);">{{item.time}}</text>
			</view>
			<!-- 间隔线 -->
			<view style="border-bottom: 1rpx solid rgba(204, 204, 204, 1);width: 702rpx;margin-top: 30rpx;margin-left: 25rpx;"></view>
			<view class="tgyh_3" >
				<text>{{item.str[0]}}</text>
				<text>{{item.str[1]}}</text>
				<text>{{item.str[2]}}</text>
			</view>
		</view>
		<view style="color: rgba(68, 68, 68, 1);text-align: center;margin-top: 10rpx;margin-bottom: 20rpx;">没有更多了</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				page:0,
				popularizes: [],
				
			}
		},
		onShow() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = (sysinfo.safeArea.height - 20) + 'px';
			this.popularize()
		},
		methods:{
			popularize(){
				var vm = this
				vm.page=vm.page+1;
				vm.req.post(
				vm.lochost + '/index/index?method=popularize_list',{
					page: vm.page,
					size: 20
				},{},
				function(res){
					console.log(res.data);
					var popularize_list = res.data.data
					for(let i = 0; i < popularize_list.length;i++){
						vm.popularizes.push(popularize_list[i])
					}
				}
				)
			}
		}
	}
</script>

<style>
	.tgsys{
		width: 750rpx;
		height: 160rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
	}
	.tgyh_1{
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
		transform: translateY(15rpx);
	}
	.tgyh_2{
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
		transform: translateY(15rpx);
		/* border-bottom: 1rpx solid rgba(204, 204, 204, 1); */
	}
	.tgyh_3{
		display: flex;
		justify-content: space-between;
		margin: 0 25rpx;
		transform: translateY(15rpx);
		font-size: 24rpx;
	}
</style>
