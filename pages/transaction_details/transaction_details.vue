<template>
		<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view slot="gBody">
				<view style="width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
					<view class="grace-columns">
						<view class="grace-space-between" style="margin-left: 60rpx;margin-top: 15rpx;margin-right: 60rpx;">
							<view style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1)">{{name}}</view>
							<view style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">{{ money }}元</view>
						</view>
						<view class="grace-flex-center" style="margin-top: 5rpx;">
							<view style="width:650rpx;height:2rpx;background:rgba(204,204,204,1);"></view>
						</view>
						<view style="margin-top: 15rpx;margin-left: 580rpx; font-size:22rpx;font-weight:400;" :style="{color:show_status===2?'rgba(0, 255, 0, 255)':show_status===3?'rgba(204,41,14,1)':show_status===1?'rgba(255, 170, 0, 255)':'rgba(112, 112, 112, 255)' }">{{ show_status==3?'交易失败': show_status==2?'交易成功':show_status==1?'交易中':'' }}</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">类型：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ m_type }}</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">交易单号：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ order_num }}</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">创建时间：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ create_time }}</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">手续费：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ poundage }}元</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">支付卡：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ show_pay_str }}</view>
					</view>
				</view>
				
				<view  style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">到账卡：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(153,153,153,1);">{{ show_arrive_str }}</view>
					</view>
				</view>
				
				<view v-if="show_status==3" style="margin-top: 10rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
					<view class="grace-space-between" style="margin: 0 60rpx;line-height: 60rpx;">
						<view style="font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">失败原因：</view>
						<view style="font-size:26rpx;font-weight:400;color:rgba(204,41,14,1);">{{ errors===null?'':errors }}</view>
					</view>
				</view>
			</view>
		</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				id:'',
				name: "银行扣款",//文字描述
				money: 5,//刷卡金额
				show_status: "交易中",//状态
				order_num: "285e01ccce0abee",//订单号
				create_time: "2019-12-24 16:31",//创建时间
				poundage: 1,//手续费
				show_pay_str: "中国银行(1511)",//信用卡字符串
				show_arrive_str: "中国银行(1511)",//储蓄卡字符串
				errors: '',//错误描述
				m_type:'云刷',
				}
		},
		onLoad:function(opt){
			var vm=this;
			this.id=opt.id;
			this.req.post(
			this.lochost+'/index/index?method=cloud_brush_details',
			{id:this.id},
			{},
			function(res){
				console.log(res);
				vm.name=res.data.show_str;
				vm.money=res.data.pd_money;
				vm.show_status=res.data.show_status;
				// vm.m_type=res.data.m_type;
				vm.order_num=res.data.pd_order_num;
				vm.create_time=res.data.pd_create_time;
				vm.poundage=res.data.show_poundage;
				vm.show_pay_str=res.data.show_pay_str;
				vm.show_arrive_str=res.data.show_arrive_str;
				vm.errors=res.data.pd_remake_msg;
				
			}
			)
		},
		components:{
			gracePage
		}
	}
</script>

<style>
</style>
