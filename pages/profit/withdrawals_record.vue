<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容   -->
			<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="shuaxin()">
				<view v-for="(item,index) in info_list" :key="index" style="margin-top: 20rpx; width:714rpx;height:120rpx;background:rgba(255,255,255,1);box-shadow:0px 2rpx 10rpx 0px rgba(255,255,255,0.06);border-radius:10rpx;margin-left: 20rpx;">
					<view class="grace-rows" style="display: flex;justify-content: space-between;transform: translateY(20rpx);margin-left: 10rpx;">
						<!-- <image src="../../static/credit_card_record_shou.png" style="width: 32rpx;height: 32rpx;"></image> -->
						<text style="margin-left: 13rpx; font-size:26rpx;font-weight:400;color:rgba(51,51,51,1);">{{item.order_str}}</text>
						<view style="transform: translateX(-20rpx);">
							<text style="margin-left: 200rpx; position: relative;bottom: 5rpx; font-size: 30rpx;font-weight:400;color:rgba(51,51,51,1);">-{{ item.w_should_money }}</text>
							<text style="position: relative;bottom: 5rpx; font-size: 30rpx;font-weight:400;color:rgba(51,51,51,1);">元</text>
						</view>

					</view>
					<view class="grace-rows" style="display: flex;justify-content: space-between;margin-top: 35rpx;margin-left: 24rpx;margin-right: 20rpx;">
						<view>
							<image src="../../static/credit_card_record_shijian.png" style="position: relative;top:5rpx ; width: 26rpx;height: 26rpx;"></image>
							<text style="margin-left: 15rpx; font-size:24rpx;font-weight:400;color:rgba(153,153,153,1);margin-right: 250rpx;">{{ item.w_show_time }}</text>
						</view>
						<text style="font-size:24rpx;font-weight:400;" :style="{color:item.w_state===1?'rgba(247,148,7,1)':item.w_state===9?'rgba(35,183,20,1)':item.w_state===2?'rgba(255, 0, 0, 255)':'rgba(120, 120, 120, 255)'}">{{ item.w_state==9?'交易成功':item.w_state==2?'提现失败':item.w_state==1?'审核中':'' }}</text>
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
				info_list: [],
				page: 0,
				height: '',
			}
		},
		onShow: function() {
			var sysinfo = uni.getSystemInfoSync();
			this.height = (sysinfo.safeArea.height - 25) + 'px';
			this.shuaxin();
		},
		methods: {
			shuaxin() {
				var vm = this;
				this.page += 1;
				vm.req.post(
					vm.lochost + '/index/index?method=user_withdrawal_record', {
						size: 10,
						page: vm.page
					}, {},
					function(res) {
						console.log(res);
						var info_user = res.data.data
						for (let i = 0; i < info_user.length; i++) {
							vm.info_list.push(info_user[i])
						}

					}
				)
			}
		},
		components: {
			gracePage
		}
	}
</script>

<style>
</style>


<!-- .grace-flex // 声明 flex
.grace-rows // flex 横向
.grace-columns  //flex 竖向
.grace-wrap //flex 自动换行
.grace-nowrap //flex 横向不换行
.grace-space-between //flex 横向两端对齐
.grace-flex-end //flex 横向右对齐
.grace-flex-center  //flex 横向居中
.grace-flex-top  //flex 垂直顶端对齐
.grace-flex-vcenter //flex 垂直居中对齐
.grace-flex-bottom //flex 垂直底部对齐
.grace-no-scale //元素不缩放 -->
