<template>
	<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view slot="gBody">
				
				<graceHeader background="rgba(218,28,30,1)">
					<view class="grace-header-body" style="background:rgba(218,28,30,1);">
						<view class="grace-rows">
							<view class="grace-header-icons grace-icons icon-arrow-left grace-white" @tap="Back(1)" ></view>
							<view class="grace-flex-center" style="width: 750rpx;">
								<graceNavBar lineHeight='70rpx' :size="200"  color='#FFFFFF' activeColor='#FFFFFF' activeLineBg='#FFFFFF' activeLineWidth='85rpx' :items="tabs" :currentIndex="currentIndex" @change="navChange"></graceNavBar>
							</view>
						</view>
					</view>
				</graceHeader>
				
				<swiper style="width: 750rpx;" :style="{height:height}" class="swiper" :current="currentIndex" @change="swiperChange">
					<swiper-item class="demo" v-for="(item,index) in tabs" :key="index">
					
						<view v-show="item==='优惠卷'">
							<graceNavBar activeDirection="center" :isCenter="true" style_width='750rpx' lineHeight='70rpx' :size="200"  color='rgba(102,102,102,1)' activeColor='rgba(218,28,30,1)' activeLineBg='rgba(218,28,30,1)' activeLineWidth='150rpx' :items="cates" :currentIndex="catesIndex" @change="navChange_juan"></graceNavBar>	
							<swiper style="width: 750rpx;" :style="{height:height}" class="swiper" :current="catesIndex" @change="swiperChange_juan">
								<swiper-item class="demo" v-for="(item1,index1) in cates" :key="index1">
									<view v-show="item1==='未使用'">
										<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="jiazai(0)">
											<view class="grace-wrap grace-flex-center" v-for="(item,index) in weishiyong_list" :key="index" v-show="item.c_state==='可用'">
												<view style="margin-top: 10rpx; width: 714rpx;height: 218rpx;background-image: url(../../static/youhuijuan_keyong.png);background-size: contain;background-repeat: no-repeat;">
													<view class="grace-rows" style="margin-top: 30rpx;">
														<view class="grace-flex-bottom ">
															<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(255,255,255,1);">￥</text>
															<text style="margin-left: 20rpx; font-size:63rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item.progress_bar_num }}</text>
															<text style="margin-left: 30rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">手续费抵用券</text>
														</view>
														<view @tap="Goto('/pages/card_keeper/card_keeper')" style="margin-left: 150rpx; margin-top: 20rpx; text-align: center; line-height: 54rpx; left: 180rpx; width:161rpx;height:54rpx;background:rgba(255,255,255,1);border-radius: 30rpx;font-size:27rpx;font-weight:bold;color:rgba(254,135,79,1);">
															立即使用
														</view>
													</view>
													<view style="position: relative;top: 58rpx; margin: 0 20rpx;" class="grace-space-between">
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">到期时间：{{ item.end_time }}</view>
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">使用条件：{{item.tiaojian}}</view>
													</view>
												</view>
											</view>
											<view style="height: 100rpx;"></view>
										</scroll-view>
									</view>
									
									<view v-show="item1==='已使用'">
										<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="jiazai(1)">
											<view class="grace-wrap grace-flex-center" v-for="(item1,index1) in yishiyong_list" :key="index1" v-show="item1.c_state!='可用'">
												<view style="margin-top: 10rpx; width: 714rpx;height: 218rpx;background-image: url(../../static/youhuijuan_bukeyong.png);background-size: contain;background-repeat: no-repeat;">
													<view class="grace-rows" style="margin-top: 30rpx;">
														<view class="grace-flex-bottom ">
															<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(255,255,255,1);">￥</text>
															<text style="margin-left: 20rpx; font-size:63rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item1.progress_bar_num }}</text>
															<text style="margin-left: 30rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">手续费抵用券</text>
														</view>
														<!-- <view style="margin-left: 150rpx; margin-top: 20rpx; text-align: center; line-height: 54rpx; left: 180rpx; width:161rpx;height:54rpx;background:rgba(255,255,255,1);border-radius: 30rpx;font-size:29rpx;font-weight:bold;color:rgba(204,204,204,1);">
															不可用
														</view> -->
														<image src="../../static/yishiyong.png" style="width: 100rpx;height: 100rpx;position: relative;left: 200rpx;"></image>
													</view>
													<view style="position: relative;top: 58rpx; margin: 0 20rpx;" class="grace-space-between">
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">到期时间：{{item1.end_time}}</view>
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">不可用原因：{{ item1.tiaojian}}</view>
													</view>
												</view>
											</view>
											<view style="height: 100rpx;"></view>
										</scroll-view>
									</view>
									
									<view v-show="item1==='已过期'">
										<scroll-view class="grace-scroll-y" scroll-y :style="{height:height}" @scrolltolower="jiazai(2)">
											<view class="grace-wrap grace-flex-center" v-for="(item1,index1) in yiguoqi_list" :key="index1" v-show="item1.c_state!='可用'">
												<view style="margin-top: 10rpx; width: 714rpx;height: 218rpx;background-image: url(../../static/youhuijuan_bukeyong.png);background-size: contain;background-repeat: no-repeat;">
													<view class="grace-rows" style="margin-top: 30rpx;">
														<view class="grace-flex-bottom ">
															<text style="margin-left: 20rpx; font-size:29rpx;font-weight:400;color:rgba(255,255,255,1);">￥</text>
															<text style="margin-left: 20rpx; font-size:63rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item1.progress_bar_num }}</text>
															<text style="margin-left: 30rpx; font-size:32rpx;font-weight:400;color:rgba(255,255,255,1);">手续费抵用券</text>
														</view>
														<!-- <view style="margin-left: 150rpx; margin-top: 20rpx; text-align: center; line-height: 54rpx; left: 180rpx; width:161rpx;height:54rpx;background:rgba(255,255,255,1);border-radius: 30rpx;font-size:29rpx;font-weight:bold;color:rgba(204,204,204,1);">
															不可用
														</view> -->
														<image src="../../static/yiguoqi.png" style="width: 100rpx;height: 100rpx;position: relative;left: 200rpx;"></image>
													</view>
													<view style="position: relative;top: 58rpx; margin: 0 20rpx;" class="grace-space-between">
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">到期时间：{{item1.end_time}}</view>
														<view style="font-size:22rpx;font-weight:400;color:rgba(108,108,108,1);">不可用原因：{{ item1.tiaojian }}</view>
													</view>
												</view>
											</view>
											<view style="height: 100rpx;"></view>
										</scroll-view>
									</view>
						
								</swiper-item>
							</swiper>
						</view>
						
					</swiper-item>
				</swiper>
				
			</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceSegmentedControl from '../../graceUI/components/graceSegmentedControl.vue';
	
	import graceNavBar from "../../graceUI/components/graceNavBar.vue";
	import graceHeader from '../../graceUI/components/graceHeader.vue';
	export default {
		data() {
			return {
				currentIndex: 1,
				tabs: ['会员卡', '优惠卷'],
				height:'',
				cates : ["未使用", "已使用", "已过期"],
				catesIndex: 0,
				page:1,
				limit:20,
				type:'可用',
				lanjie:0,
				
				bill_money:0,
				quan:[],
				weishiyong_list:[],
				yishiyong_list:[],
				yiguoqi_list:[],
				current : 0,
			}
		},
		onShow() {
				this.weishiyong_list=[];
				this.yishiyong_list=[];
				this.yiguoqi_list=[];
				var sysinfo=uni.getSystemInfoSync();
				this.height=(sysinfo.safeArea.height-48)+'px';
				this.page=1;
				this.type='可用';
				this.get_data_list(0);
		},
		methods:{
			jiazai(type_index){
				this.page+=1;
				this.get_data_list(type_index);
			},
			get_data_list(type_index){
				console.log(type_index);
				var vm=this;
				this.req.post(
				this.lochost+'/mytrunk/discounts/club_card_list',
				{page:this.page,limit:this.limit,type:this.type},
				{},
				function(res){
					if(type_index===0){
						vm.yishiyong_list=[];
						vm.yiguoqi_list=[];
						for (let i = 0; i < res.data.length; i++) {
							vm.weishiyong_list.push(res.data[i]);
						};
					}else if(type_index===1){
						vm.weishiyong_list=[];
						vm.yiguoqi_list=[];
						for (let i = 0; i < res.data.length; i++) {
							vm.yishiyong_list.push(res.data[i]);
						};

					}else if(type_index===2){
						vm.weishiyong_list=[];
						vm.yishiyong_list=[];
						for (let i = 0; i < res.data.length; i++) {
							vm.yiguoqi_list.push(res.data[i]);
						};

					}
					
					
					
					
					// vm.quan=res.data.quan;
					// for (let i = 0; i <vm.quan.length; i++) {
					// 	if(vm.quan[i].c_state==='未使用'){
							
					// 	}else if(vm.quan[i].c_state==='已使用'){
							
					// 	}else if(vm.quan[i].c_state==='已过期'){
						
					// 	}
					// }
					console.log(res);
				}
				)
			},
			swiperChange: function (e) {
				var index = e.detail.current;
				this.currentIndex = index;


				console.log(e);
			},
			swiperChange_juan: function (e) {
				var index = e.detail.current;
				this.catesIndex = index;
				if(index===0){
					this.page=1;
					this.type='可用';
					if(this.lanjie===0){
						this.get_data_list(0);
						this.lanjie+=1;
					}else{
						this.lanjie=0;
					}
					
				}else if(index===1){
					this.page=1;
					this.type='已用';
					if(this.lanjie===0){
						this.get_data_list(1);
						this.lanjie+=1;
					}else{
						this.lanjie=0;
					}
				}else if(index===2){
					this.page=1;
					this.type='已过期';
					if(this.lanjie===0){
						this.get_data_list(2);
						this.lanjie+=1;
					}else{
						this.lanjie=0;
					}
				}
				console.log(e);
			},
			navChange: function (e) {
				this.currentIndex = e;

				console.log(e);
			},
			navChange_juan: function (e) {
				this.catesIndex = e;

				console.log(e);
			},
			change : function(e){
				this.current = e;
			}
		},
		components:{
			gracePage,
			graceSegmentedControl,
			graceNavBar,
			graceHeader
		}
	}
</script>

<style>
	.SegmentedControlIn{width:500rpx; padding:0 125rpx; margin-top:38rpx;}
</style>
