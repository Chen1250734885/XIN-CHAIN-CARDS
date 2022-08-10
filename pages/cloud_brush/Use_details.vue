<template>
	<!-- 余额使用明细 -->
	<view class="jilist">
		<view style="font-size: 22rpx; color:rgba(153,153,153,1);text-align: center;margin-top: 20rpx;" v-show="details.length == 0">
			<text>暂无余额明细</text>
		</view>
		<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="devoucher()">
			<view v-for="(item,index) in details" :key="index" style="margin: 1rpx auto; width:750rpx;height:120rpx;background:rgba(255,255,255,1);box-shadow:0px 2rpx 10rpx 0px rgba(255,255,255,0.06);border-radius:10rpx;">
				
				<view class="grace-space-between">
					<view style="left: 24rpx; position: relative;top:20rpx; font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">
						{{ item.show_str }}
					</view>
					<text style="margin-right: 24rpx; font-size:24rpx;font-weight:400;transform: translateY(40rpx);color: rgba(35, 183, 20, 1);" >{{item.state_str}}</text>
				</view>
				
				<view class="grace-rows" style="position: relative;top: 36rpx;left: 24rpx;">
					<image src="../../static/credit_card_record_shijian.png" style="position: relative;top: 5rpx; width: 26rpx;height: 26rpx;"></image>
					<view style="margin-left: 16rpx; font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item.date_str }}</view>
				</view>	
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				page: 0,
				details:[]
			}
		},
		onLoad() {
			this.devoucher()
		},
		onShow() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = (sysinfo.safeArea.height - 30) + 'px';
		},
		methods:{
			// 获取抵扣券明细列表
			devoucher(){
				var vm = this
				vm.page += 1;
				vm.req.post(
					vm.lochost + '/index/index?method=deduct_balance_log',{
						page: vm.page,
						size: 20
					},{},function(res){
						console.log(res);
						vm.details = res.data.data
					}
				)
			}
		}
	}
</script>

<style>
</style>
