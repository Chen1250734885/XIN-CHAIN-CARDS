<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
		<!-- 页面內容 -->
		<view :style="{background: back_color}" style="margin: 10rpx auto; width:670rpx;height:220rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:20rpx;">
			<view :style="{backgroundImage: 'url('+back_img+')'}" style="width:670rpx;height:300rpx;background-size:288rpx 166rpx; background-repeat:no-repeat;background-position-x: 357rpx;background-position-y: 75rpx;" >
				<view style="position: relative;top: 30rpx;left: 30rpx;">
					<view class="grace-rows" style="position: relative;bottom: 10rpx;">
						<image :src="bank_icon_url" style="width: 50rpx;height: 50rpx;"></image>
						<view class="grace-columns" style="margin-left: 22rpx; position: relative;width: 300rpx;">
							<text style="margin-bottom: 2rpx; font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">{{ card_name }}</text>
							<image src="../../static/xinyongka.png" style="width: 60rpx;height: 22rpx;"></image>
						</view>
					</view>
					<view style="width:598rpx;height:1rpx;background:rgba(247,247,247,1);"></view>
					<view class="grace-rows">
						<view class="grace-columns" style="text-align: center;margin: 21rpx 50rpx;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bc_bill}}日</text>
						</view>
						
						<view class="grace-columns" style="text-align: center;margin: 21rpx 70rpx;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bc_repayment}}日</text>
						</view>
						
						<view class="grace-rows" style="text-align: center;margin:10rpx 0rpx;">
							<text style="font-size:70rpx;font-weight:bold;color:rgba(255,255,255,1);">{{shenyu}}</text>
							<view class="grace-columns" style="margin-top: 10rpx;">
								<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">已还金额</text>
								<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{repaymentNum}}元</text>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<view class="grace-rows" style="width:750rpx;height:90rpx;background:rgba(255,255,255,1);line-height: 90rpx;">
			<text style="margin-left: 35rpx; font-size:32rpx;font-weight:400;color:rgba(79,159,254,1);">往期计划</text>
			<text style="margin-left: 20rpx; color:rgba(79,159,254,1) ;">|</text>
			<text style="margin-left: 20rpx; color: #FF6600;font-size: 32rpx;">T</text>
			<text style="color: #4F9FFE;font-size: 32rpx;">o</text>
			<text style="margin-left: 10rpx; color: #FF6600;font-size: 32rpx;">P</text>
			<text style="color: #4F9FFE;font-size: 32rpx;">lan</text>
		</view>
		<view @tap="Goto('/pages/generation_plan/details_of_previous_plans?id='+item.id)" v-for="(item,index) in plan_list" :key="index" style="margin-top: 10rpx; width:750rpx;height:250rpx;background:rgba(255,255,255,1);">
			<view class="" style="margin-left: 30rpx;top: 10rpx;position: relative;">
				<view class="grace-rows" >
					<image src="../../static/preview_plan_rili.png" style="position: relative;top: 20rpx; width: 30rpx;height: 30rpx;left: -20rpx;"></image>
					<text style="margin-left: -10rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">{{ item.start_day }}</text>
				</view>
				<view class="grace-rows" style="margin-left: 25rpx;">
					<view class="grace-columns" style="width: 450rpx;">
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">还款总金额：{{ item.pay_money }}元</text>
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">启动金额：{{ item.price }}元</text>
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">自动分期还款：{{ item.back_times }}次</text>
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">已执行：{{ item.already_num }}次</text>
						<text style="font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);margin-top: 7rpx;">计划截止日期：{{ item.end_day }}</text>
					</view>
					<!-- 计划执行状态 -->
					<view>
						<button :style="{border:item.type===3?'2rpx solid rgba(153,153,153,1)':item.rp_state==='已暂停'?'2rpx solid rgba(255, 0, 0, 255)':item.type===4?'2rpx solid rgba(8,214,8,1)':item.type===2?'2rpx solid rgba(255, 170, 0, 255)':'2rpx solid rgba(153,153,153,1)',color:item.type===3?'rgba(153,153,153,1)':item.rp_state==='已暂停'?'rgba(255, 0, 0, 255)':item.type===4?'rgba(8,214,8,1)':item.type===2?'rgba(255, 170, 0, 255)':'rgba(153,153,153,1)' }" style="margin-top: 50rpx; width:180rpx;height:60rpx;border-radius:20rpx; font-size:30rpx;font-weight:400;line-height: 60rpx;background-color: #FFFFFF;">
							{{ item.type==3?'已终止':item.type==4?'已完成':item.type==2?'执行中':'' }}
						</button>
					</view>
				</view>
			</view>
		</view>
		
		
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import {myMixins} from "@/components/myMixins/myMixins.js"
	export default {
		mixins: [myMixins],
		data() {
			return {
				back_color:'',
				back_img:'',
				bank_icon_url:'',
				bc_bill:'',
				bc_repayment:'',
				card_name:'',
				id:'',
				shenyu:'',
				times:'',
				repaymentNum: '',
				page:1,
				limit:20,
				plan_list:[],
			}
		},
		onLoad:function(opt){
			console.log(opt);
			this.back_color=opt.back_color;
			this.back_img=opt.back_img;
			this.bank_icon_url=opt.bank_icon_url;
			this.bc_bill=opt.bc_bill;
			this.bc_repayment=opt.bc_repayment;
			this.card_name=opt.card_name;
			this.id=opt.id;
			this.shenyu=opt.shenyu;
			this.repaymentNum = opt.repaymentNum
			this.times=opt.times;
			this.get_info();
		},
		
		onReachBottom() {
			this.get_info();
		},
		methods:{
			get_info(){
				var vm=this;
				var page = this.page;
				if(page==0){
					uni.showToast({
						title:'没有更多',
						icon:'none'
					})
					return
				}
				// vm.page+=1;
				vm.req.post(
				vm.lochost+'/index/index?method=refund_plan_list',
				{page:page,size:vm.limit,bc_id:vm.id},
				{},
				function(res){
					console.log(res);
					if(res.code==200){
						var datas = res.data.data;
						if(datas.length<vm.limit){
							vm.page = 0;
						}else{
							vm.page = page+1;
						}
						console.log(datas);
						var plan_list = vm.plan_list;
						vm.each(datas,function(item){
							plan_list.push(item)
						})
						vm.plan_list = plan_list
					// uni.forEach(datas,function(item){
					// 	console.log(1)
					// })
						// vm.plan_list =vm.plan_list.coucat(datas);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				
				}
				)
				
			}
		},
		components:{
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
