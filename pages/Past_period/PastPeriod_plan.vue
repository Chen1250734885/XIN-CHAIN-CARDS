<template>
	<!-- 还款记录 -->
	<view>
		<!-- 银行详情 -->
		<view class="yinx">
			<view class="yinx_bz" :style="'background-color: '+card_info.bank.back_color">
				<!-- 银行图标 -->
				<view class="yx" style="display: inline-block;">
					<image :src="card_info.bank.bank_icon_url" style="width: 100%;height: 100%;"></image>
				</view>
				<!-- 银行名称 -->
				<view class="mc" style="display: inline-block;">
					<text class="mc_h">{{card_info.name}}({{card_info.bc_bank_number.last}})</text>
					<view class="sz_2">
						<image src="../../static/xinyongka.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="grace-rows" style="width:750rpx;height:90rpx;background:rgba(255,255,255,1);line-height: 90rpx;margin-top: 10rpx;">
			<text style="margin-left: 35rpx; font-size:32rpx;font-weight:400;color:rgba(79,159,254,1);">往期计划</text>
			<text style="margin-left: 20rpx; color:rgba(79,159,254,1) ;">|</text>
			<text style="margin-left: 20rpx; color: #FF6600;font-size: 32rpx;">T</text>
			<text style="color: #4F9FFE;font-size: 32rpx;">o</text>
			<text style="margin-left: 10rpx; color: #FF6600;font-size: 32rpx;">P</text>
			<text style="color: #4F9FFE;font-size: 32rpx;">lan</text>
		</view>
		<!--记录列表 -->
		<view v-for="(items,index) in mydatas"  style="margin-top: 10rpx; width:750rpx;height:190rpx;background:rgba(255,255,255,1);">
			<view class="" style="margin-left: 25rpx;top: 10rpx;position: relative;">
				<view class="grace-rows" >
					<image src="../../static/preview_plan_rili.png" style="position: relative;top: 5rpx; width: 30rpx;height: 30rpx;" @tap="xiangqing(items.id)"></image>
					<text style="margin-left: 30rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">{{items.create_time}}</text>
				</view>
				<view class="grace-rows" style="margin-left: 65rpx;">
					<view class="grace-columns" style="width: 450rpx;">
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">账单金额：{{items.bill_money}}元</text>
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">已还款：{{items.back_price}}元</text>
						
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">还款日期：共{{items.tianshu}}天（{{items.start_time}}至{{items.end_time}}）</text>
					</view>
					<view>
						<button class="qnss" v-if="items.rp_state=='已终止'">
							{{items.state_stop}}
						</button>
						<button class="qns" v-if="items.rp_state=='已完成'">
							{{items.rp_state}}
						</button>
						<button class="sqns" v-if="items.rp_state!='已终止'&&items.rp_state!='已完成'">
							{{items.rp_state}}
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
				return {
					card_id:'',
					mydatas:[],
					card_info:{},
					page:1,
					limit:10,
					
				}
			},
			onLoad(opt) {
				// console.log(opt)
				var that = this;
				that.$data.card_id = opt.card_id;
				// that.req.post(that.lochost+'/mytrunk/souxin/wangqi_jihua',{card_id:opt.card_id},{},function(res){
				// 	console.log(res);
				// 	that.$data.card_info = res.data.card;
				// 	that.$data.datas = res.data.data;
				// })
				that.getData();
			},
			onReachBottom:function(re){
				console.log('触底了');
				this.getData();
			},
			onPullDownRefresh:function(){
				uni.stopPullDownRefresh();
				return 0;
			},
			methods:{
				getData:function(){
					var page = this.$data.page;
					if(page==0){
						uni.showToast({
							title:'没有更多',
							icon:'none'
						})
						return 0;
					}
					var limit = this.$data.limit;
					var card_id = this.$data.card_id;
					var that = this;
					that.req.post(that.lochost+'/mytrunk/souxin/wangqi_jihua',{card_id:card_id,page:page,limit:limit},{},function(res){
						console.log(res);
						if(res.code==200){
							if(res.data.data.length<limit){
								that.$data.page=0;
							}else{
								that.$data.page=page+1;
							}
							that.$data.card_info = res.data.card;
							// var $newdata = [];
							//  for(var a=0;a<20;a++){
							// 	 $newdata.push(res.data.data[0])
							//  }
							var mydatas = that.$data.mydatas;
							that.each(res.data.data,function(item){
								mydatas.push(item);
							})
							that.$data.mydatas = mydatas;
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					})
				},
				//跳转详情
				xiangqing:function(id){
					console.log(id)
					var url = '/pages/Details_plan/details_plans?id='+id;
					uni.navigateTo({
						url:url
					})
				}
			}
	}
</script>

<style>
	.yinx {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
	
	}
	
	.yinx_bz {
		/* position: fixed; */
		width: 690rpx;
		height: 130rpx;
		border-radius: 20rpx;
		background-color: #F98100;
		transform: translateY(25rpx);
		margin-left: 30rpx;
	}
	
	.yx {
		width: 70rpx;
		height: 70rpx;
		/* background-color: #FFFFFF; */
		margin-top: 38rpx;
		margin-left: 46rpx;
		float: left;
	}
	
	.mc {
		margin-top: 37rpx;
		margin-left: 19rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.sz_2 {
		width: 60rpx;
		height: 22rpx;
	}
	
	.sz_2 image {
		width: 100%;
		height: 100%;
		transform: translateY(-10rpx);
	}
	.qns{
		width: 180rpx;
		height: 60rpx;
		border:1rpx solid rgba(8,214,8,1);
		font-size: 30rpx;
		color: #08D608;
		line-height: 60rpx;
		background-color: #FFFFFF;
	}
	.qnss{
		width: 180rpx;
		height: 60rpx;
		border:1rpx solid red;
		font-size: 30rpx;
		color: red;
		line-height: 60rpx;
		background-color: #FFFFFF;
	}
	.sqns{
		width: 180rpx;
		height: 60rpx;
		border:1rpx solid #828282;
		font-size: 30rpx;
		color: #828282;
		line-height: 60rpx;
		background-color: #FFFFFF;
	}
	button::after{ border: none;}
</style>
