<template>
	<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view slot="gBody" class="grace-body">
				<scroll-view class="grace-scroll-y" scroll-y  :style="{height:height}" @scrolltolower="jiazai()">
					<view v-for="(item,index) in cloud_brush_list" :key="index" @tap="Goto('/pages/transaction_details/transaction_details?id='+item.id)" style="margin-top: 20rpx; width:713rpx;height:170rpx;background:rgba(255,255,255,1);box-shadow:0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.06);border-radius:10rpx;">
						<view class="grace-space-between" style="margin: 0 24rpx;">
							<view style="margin-top: 15rpx;">
								<image src="../../static/credit_card_record_shijian.png" style="position: relative;top: 5rpx; width: 26rpx;height: 26rpx;"></image>
								<text style="margin-left: 10rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item.show_time }}</text>
							</view>
							<view style="margin-top: 15rpx;">
								<text style="font-size:25rpx;font-weight:400;" :style="{color:item.show_status===2?'rgba(35,183,20,1)':item.show_status===1?'rgba(247,148,7,1)':item.show_status===3?'rgba(255, 0, 0, 255)':'rgba(85, 85, 85, 255)'}">{{ item.show_status==3?'交易失败': item.show_status==2?'交易成功':item.show_status==1?'交易中':''}}</text>
								<image src="../../static/jiantou.png" style="margin-left: 10rpx; width: 10rpx;height: 24rpx;"></image>
							</view>
						</view>
						<!-- 有失败原因时显示 -->
						<view v-if="item.show_status==3" style="display: flex;justify-content: space-between;">
							<view>
								<view class="grace-rows" style="margin-left: 25rpx;margin-top: 5rpx;">
									<image src="../../static/credit_card_record_zhi.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 5rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_pay_name}}({{item.pd_bank_card_num.slice(12)}})</view>
								</view>
								<view class="grace-rows" style="margin-left: 25rpx; margin-top: 5rpx;">
									<image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_withdraw_name}}({{item.pd_card_num.slice(15)}})</view>
								</view>
								<view style="font-size: 24rpx;color: rgba(204, 42, 14, 1);margin-left: 25rpx;">{{item.pd_remake_msg}}</view>
							</view>
							<view class="grace-rows" style="margin-top:35rpx;margin-right: 20rpx;">
								<view style="font-size:50rpx;font-weight:400;color:rgba(48,48,48,1);">{{ item.pd_money }}</view>
								<view style="margin-top: 20rpx; font-size: 30rpx;">元</view>
							</view>
						</view>
						<!-- 无失败原因时显示 -->
						<view v-else style="display: flex;justify-content: space-between;">
							<view>
								<view class="grace-rows" style="margin-left: 25rpx;margin-top: 15rpx;">
									<image src="../../static/credit_card_record_zhi.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 5rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_pay_name}}({{item.pd_bank_card_num.slice(12)}})</view>
								</view>
								<view class="grace-rows" style="margin-left: 25rpx; margin-top: 10rpx;">
									<image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_withdraw_name}}({{item.pd_card_num.slice(15)}})</view>
								</view>
							</view>
							<view class="grace-rows" style="margin-top:35rpx;margin-right: 20rpx;">
								<view style="font-size:50rpx;font-weight:400;color:rgba(48,48,48,1);">{{ item.pd_money }}</view>
								<view style="margin-top: 20rpx; font-size: 30rpx;">元</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				height:'',
				limit:20,
				page:0,
				cloud_brush_list:[],
			}
		},
		onLoad:function(){
			var sysinfo=uni.getSystemInfoSync();
			this.height=(sysinfo.safeArea.height-20)+'px';
			this.jiazai();
		},
		onBackPress(){
			uni.navigateTo({
				url: '/pages/cloud_brush/cloud_brush1'
			})
			return true;
		},
		methods:{
			jiazai(){
				var vm=this;
				this.page+=1;
				vm.req.post(
				vm.lochost+'/index/index?method=cloud_brush_list',
				{page:vm.page,size:vm.limit},
				{},
				function(res){
					var brush_list=res.data.data;
					for (let i = 0; i < brush_list.length; i++) {
						vm.cloud_brush_list.push(brush_list[i])
					}
					console.log(res);
				}
				)
			},
		},
		components:{
			gracePage
		}
	}
</script>

<style>
</style>
