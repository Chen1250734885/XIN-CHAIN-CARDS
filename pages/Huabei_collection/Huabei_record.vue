<template>
	<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view slot="gBody" class="grace-body">
				<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="jiazai()">
					<view v-for="(item,index) in cloud_brush_list" :key="index" @tap="Goto('/pages/Huabei_collection/Huabei_details?id='+item.id)" style="margin-top: 20rpx; width:713rpx;height:170rpx;background:rgba(255,255,255,1);box-shadow:0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.06);border-radius:10rpx;">
						<view class="grace-space-between" style="margin: 0 24rpx;">
							<view style="margin-top: 15rpx;">
								<image src="../../static/credit_card_record_shijian.png" style="position: relative;top: 5rpx; width: 26rpx;height: 26rpx;"></image>
								<text style="margin-left: 10rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item.create_time }}</text>
							</view>
							<view style="margin-top: 15rpx;">
								<text style="font-size:25rpx;font-weight:400;" :style="{color:item.show_status==='交易成功'?'rgba(35,183,20,1)':item.show_status==='交易中'?'rgba(255, 170, 0, 255)':item.show_status==='交易失败'?'rgba(255, 0, 0, 255)':'rgba(85, 85, 85, 255)'}">{{ item.show_status }}</text>
								<image src="../../static/jiantou.png" style="margin-left: 10rpx; width: 10rpx;height: 24rpx;"></image>
							</view>
						</view>
						<view class="grace-rows">
							<view>
								<view class="grace-rows" style="margin-left: 25rpx;margin-top: 15rpx;">
									<image src="../../static/credit_card_record_zhi.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">花呗收款</view>
								</view>
								<view class="grace-rows" style="margin-left: 25rpx; margin-top: 10rpx;">
									<image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image>
									<view style="margin-left: 10rpx; font-size:24rpx;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 5rpx;">{{item.bank_withdraw_name}}</view>
								</view>
							</view>
							<view class="grace-rows" style="margin-top:35rpx;margin-left: 280rpx;">
								<view style="font-size:50rpx;font-weight:400;color:rgba(48,48,48,1);">{{ item.m_money }}</view>
								<view style="margin-left: 5rpx; margin-top: 20rpx; font-size: 30rpx;">元</view>
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
				limit:10,
				page:1,
				cloud_brush_list:[],
				// zhanghuneme:'',
			}
		},
		onLoad:function(){
			var sysinfo=uni.getSystemInfoSync();
			this.height=(sysinfo.safeArea.height - 20) + 'px';
			this.jiazai();
			// console.log('haha')
			// var vm = this;
			// // var url = this.lochost+"/mytrunk/huabei/get_huanbei_yewu";
			// vm.req.post(
			// vm.lochost+'/mytrunk/mycloudbrush/cloud_brush_list',
			// {page:vm.page,limit:vm.limit},
			// {},
			// function(res){
			// 	var brush_list=res.data;
			// 	for (let i = 0; i < brush_list.length; i++) {
			// 		vm.cloud_brush_list.push(brush_list[i])
			// 	}
			// 	console.log(res);
			// }
			// )
		},
		methods:{
			jiazai(){
				var vm=this;
				var page = this.page;
				if(page==0){
					uni.showToast({
						title:'没有数据了',
						icon:'none'
					})
					return
				}
				vm.req.post(
				vm.lochost+'/mytrunk/huabei/hua_bei_list',
				{page:page,limit:vm.limit},
				{},
				function(res){
					console.log(res);
					var brush_list=res.data;
					if(brush_list<vm.limit){
						vm.page = 0;
					}else{
						vm.page = page+1;
					}
					for (let i = 0; i < brush_list.length; i++) {
						vm.cloud_brush_list.push(brush_list[i])
					}
					console.log(res);
				}
				)
			},
			zhanghuneme(){
				
			}
		},
		components:{
			gracePage
		}
	}
</script>

<style>
</style>
