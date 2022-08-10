<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 页面內容 -->
			<view class="grace-columns" :style="{background:bank.back_color}" style="margin: 20rpx 40rpx;width:670rpx;height:210rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:10rpx;">
				<view :style="{backgroundImage: 'url('+bank.back_img+')'}" style="width:670rpx;height:300rpx;background-size:288rpx 166rpx; background-repeat:no-repeat;background-position-x: 357rpx;background-position-y: 75rpx;">
					<view class="grace-rows" style="margin-left: 36rpx;margin-top: 30rpx;">
						<image :src="bank.bank_icon_url" style="width: 50rpx;height: 50rpx;"></image>
						<view class="grace-columns" style="margin-left: 22rpx;position: relative; bottom: 7rpx;">
							<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bank_name}}</text>
							<image src="../../static/xinyongka.png" style="width: 60rpx;height: 22rpx;"></image>
						</view>
					</view>
					<!-- 白色横线 -->
					<view style="margin-top: 10rpx; width:598rpx;height:1rpx;background:rgba(247,247,247,1);margin-left: 36rpx;"></view>
					<!-- 卡信息 -->
					<view class="grace-space-between" style="margin: 20rpx 100rpx;">
						<view class="grace-columns" style="text-align: center;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bc_bill}}日</text>
						</view>
						<view class="grace-columns" style="text-align: center;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.bc_repayment}}日</text>
						</view>
						<view class="grace-columns" style="text-align: center;">
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">已还金额</text>
							<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{bank.repaymentNum}}元</text>
						</view>
					</view>
				</view>
				<!-- 计划信息 -->
				<!-- 			<view style="width:670rpx;height:80rpx;background:rgba(255,255,255,1);border-radius:10rpx;" class="grace-rows">
				<text :style="{color:rp_state==='已暂停' ?'rgba(204,41,14,1)':rp_state==='执行中' ?'rgba(0,255,0,255)':'rgba(86,86,86,255)'}" style="margin-left: 45rpx; font-size:24rpx;font-weight:400;line-height: 80rpx;">{{ rp_state }}</text>
				<button @tap="zhongzhijihua(plan_id)" style="position: relative;left: 120rpx; margin-top: 10rpx; line-height: 60rpx; width:220rpx;height:60rpx;border:2rpx solid rgba(79,159,254,1);border-radius:10rpx; font-size:30rpx;font-weight:400;color:rgba(79,159,254,1);">终止计划</button>
			</view> -->
			</view>


			<!-- <view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">计划截止日期：{{end_time}}</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款总金额：{{zong_money}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">启动金额：{{rp_price}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">还款笔数：{{num}}笔</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx;">周转金手续费：{{revolving_fund}}元</text>
				</view>
				<view style="line-height: 60rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-top: 2rpx;font-size:32rpx;font-weight:400;color:rgba(51,51,51,1);">
					<text style="margin-left: 25rpx; font-size:32rpx;font-weight:bold;color:rgba(51,51,51,1);">还款手续费：{{poundage}}元</text>
					<text v-show="is_coupon!=0" style="font-size:32rpx;font-weight:bold;color:rgba(153,153,153,1);">（已使用抵用券：{{ coupon }}元）</text>
				</view>
			</view> -->

			<!-- 计划详情信息 -->
			<view class="grace-rows" style="margin-top: 10rpx; line-height: 90rpx; width:750rpx;height:90rpx;background:rgba(255,255,255,1);">
				<view style="margin-left: 25rpx; font-size:32rpx;font-weight:400;color:rgba(79,159,254,1);">计划详情</view>
				<view style="margin: 0 20rpx; font-size: 30rpx; color:rgba(36,159,230,1);">|</view>
				<view style="font-size: 32rpx; color:#FF6600;">P</view>
				<view style="font-size: 32rpx; color:#4F9FFE;">lan</view>
				<view style="margin-left: 20rpx; font-size: 32rpx; color:#FF6600;">D</view>
				<view style="font-size: 32rpx; color:#4F9FFE;">etails</view>
			</view>
			<view class="xianqi">
				<image src="../../static/preview_plan_rili.png" style="position: relative;top: 26rpx; width: 30rpx;height: 30rpx;left: 20rpx;"></image>
				<text style="margin-left: 30rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);transform: translateY(28rpx);position: relative;top: 16rpx">{{ plan.create_time }}</text>
				<view class="xianqi_1">
					<text style="font-size: 24rpx;margin-right: 65rpx;">还款总金额：{{plan.pay_back_price}}元</text>
					<text style="font-size: 24rpx;">还款笔数：{{plan.back_times}}笔</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right:90rpx;">启动金额：{{plan.had_price}}元</text>
					<text style="font-size: 24rpx;">还款手续费：{{plan.refund_poundage}}元</text>
				</view>
				<view class="xianqi_2">
					<text style="font-size: 24rpx;margin-right: 40rpx;">计划截止日期：{{plan.end_day}}</text>
					<text style="font-size: 24rpx;">周转金手续费：{{plan.revolve_poundage}}元</text>
				</view>
			</view>
			<!-- 子订单详情 -->
			<view v-for="(item,index) in details" :key="index" style="margin-top: 10rpx;">
				<!-- 时间 -->
				<!-- 	<view class="timej">
					<text style="margin-left: 25rpx;color: rgba(102, 102, 102, 1);">{{item.date}}</text>
				</view> -->
				<!-- 消费金额 -->
				<view class="xiaofeiv" v-for="(item1,index1) in item.plan" :key="index1">

					<view class="xiaofeivs">
						<view style="margin-top: 20rpx;margin-bottom: 30rpx;">消费（￥{{item1.money}}）</view>
						<view style="font-size: 22rpx;color: rgba(102, 102, 102, 1);">手续费：￥{{item1.poundage }}</view>
					</view>
					<!-- 消费执行时间 -->
					<view style="margin-top: 10rpx;position: absolute;right: 0;">
						<view style="font-size: 24rpx;margin-right: 28rpx;color: rgba(102, 102, 102, 1);margin-left: 96rpx;">{{item1.date}}</view>
						<view style="font-size: 24rpx;margin-right: 29rpx;color: rgba(102, 102, 102, 1);margin-top: 10rpx;margin-bottom: 10rpx;margin-left: 70rpx;">{{item1.time}}</view>
						<view style="font-size: 22rpx;margin-left: 70rpx;" :style="{color:item1.state==3?'rgba(243, 115, 0, 1)':item1.state==4?'rgba(154, 154, 154, 1)':item1.state==5?'rgba(207, 22, 57, 1)':item1.state==1?'rgba(154, 154, 154, 1)':''}">{{item1.state==3?'&nbsp执行成功':item1.state==4?'&nbsp取消执行':item1.state==5?'&nbsp执行失败':item1.state==1?'&#8195未执行':''}}</view>
					</view>

				</view>
				<!-- 还款金额 -->
				<view class="huankuans">
					<text style="margin-left: 25rpx;">还款：￥{{item.back_price}}</text>
					<!-- 还款状态 -->
					<text style="margin-right: 28rpx;font-size: 22rpx;" :style="{color:item.state==3?'rgba(243, 115, 0, 1)':item.state==4?'rgba(154, 154, 154, 1)':item.state==5?'rgba(207, 22, 57, 1)':item.state==1?'rgba(154, 154, 154, 1)': ''}">{{item.state==3?'执行成功':item.state==4?'取消执行':item.state==5?'执行失败':item.state==1? '未执行':''}}</text>
				</view>

			</view>
			<view style="text-align: center;margin:10rpx 0;">没有更多了</view>


			<!-- <view v-for="(item1,index1) in child" :key="index1" class="grace-rows" style="margin-top: 4rpx; width:750rpx;height:100rpx;"
			 :style="{background:item1.type==='还款'?'rgba(255,235,218,1)':'rgba(255,255,255,1)'}"> -->
			<!-- 状态 -->
			<!-- <view style=" margin: auto 20rpx; ">
					<view class="grace-columns">
						<image class="" :src="item1.type==='支付' && item1.state==='成功' ? '../../static/jihua_yixiaofei.png' : item1.type==='还款' && item1.state==='成功' ? '../../static/jihua_yihuankuan.png' : item1.type==='还款' ? '../../static/lanhuankuan.png' : item1.type==='支付' ? '../../static/weixiaofei.png':''"
						 style="width: 66rpx;height: 46rpx;"></image>
						<text style="font-size:22rpx;font-weight:400;text-align: center;" :style="{color:item1.state==='成功' ? 'rgba(243,114,0,1)': item1.state==='失败' ? 'rgba(255,0,0,255)':item1.type==='还款' &&(item1.state==='待执行' || item1.state==='已取消')?'rgba(129,185,255,1)' :'rgba(129, 129, 129, 255)'}">{{ item1.state }}</text>
					</view>
				</view> -->

			<!-- 信息 -->
			<!-- <view class="grace-columns">
					<view class="grace-space-between" style="margin-top: 5rpx;">
						<text style="font-size:28rpx;font-weight:400;color:rgba(51,51,51,1);">金额：￥{{item1.money}}</text>
						<text v-show="item1.type!='还款'" style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">类型：{{ item1.x_type }}</text>
					</view>
					<view style="margin-top: 8rpx; width:580rpx;height:1rpx;background:rgba(204,204,204,1);"></view>
					<view class="grace-space-between" style="margin-top: 8rpx;">
						<text v-show="item1.type!='还款'" style="font-size:22rpx;font-weight:400;color:rgba(102,102,102,1);">手续费：￥{{ item1.poundage }}</text>
						<text style="font-size:22rpx;font-weight:400;color:rgba(51,51,51,1);">{{ item1.date }}</text>
						<view>
							<text style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);">{{ item1.times }}</text> -->
			<!-- <image src="../../static/bianji.png" style="width: 30rpx;height: 30rpx;"></image> -->
			<!-- </view>
					</view>
				</view>
			</view> -->
			<!-- </view> -->

		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
		data() {
			return {
				plan_id: '',
				create_time: "2020年01月1日", //创建时间
				end_time: "2020-01-1", //截止时间
				zong_money: 0, //还款总金额
				num: 0, //刷卡次数
				rp_price: 0, //启动资金
				poundage: 0, //手续费
				// revolving_fund: "0", //周转金手续费
				back_price: 0, //已还金额
				stop_msg: null, //终止原因
				rp_state: "未执行", //执行状态
				state_stop: "无终止", //终止状态
				child: [], //子订单
				bank: {}, //银行卡信息
				is_coupon: 0, //是否使用优惠券
				coupon: 0, //抵扣券金额
				details: [], //子订单详情,
				plan: {}

			}
		},
		onLoad: function(opt) {
			this.plan_id = opt.id;
			this.get_info(this.plan_id);
			console.log(opt);
		},
		methods: {
			get_info(id) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/index/index?method=refund_plan_details', {
						id: vm.plan_id
					}, {},
					function(res) {
						console.log(res);
						vm.details = res.data.details
						vm.plan = res.data.plan
						// vm.child = res.data.child;
						// vm.bankname = res.data.bank.name;
						// vm.banklast = res.data.bank.bc_bank_number.last;
						vm.bank = res.data.bank;
						// vm.create_time = res.data.orders.create_time;
						// vm.end_time = res.data.orders.end_time;
						// vm.zong_money = res.data.orders.zong_money;
						// vm.num = res.data.orders.num;
						// vm.rp_price = res.data.orders.rp_price;
						// vm.poundage = res.data.orders.poundage;
						// vm.revolving_fund = res.data.orders.revolving_fund;
						// vm.back_price = res.data.orders.back_price;
						// vm.stop_msg = res.data.orders.stop_msg;
						// vm.rp_state = res.data.orders.rp_state;
						// vm.state_stop = res.data.orders.state_stop;
						// vm.yinhang = res.data.bank;
						// vm.is_coupon = res.data.orders.is_coupon, //是否使用优惠券
						// 	vm.coupon = res.data.orders.coupon //抵扣券金额
					}
				);
			},
			zhongzhijihua(id) {
				var vm = this;
				vm.req.post(
					vm.lochost + '/mytrunk/repaymentplan/stop_refund', {
						id: this.plan_id
					}, {},
					function(res) {
						setTimeout(function() {
							vm.msg_show(res.msg)
						}, 500);
						vm.Back(1);
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
	.xianqi {
		width: 750rpx;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
	}

	.xianqi_1 {
		display: flex;
		/* justify-content: space-between; */
		margin-left: 60rpx;
		margin-top: 20rpx;
		margin-right: 75rpx;
	}

	.xianqi_2 {
		display: flex;
		/* justify-content: space-between; */
		margin-left: 60rpx;
		margin-top: 10rpx;
		margin-right: 75rpx;
	}

	.timej {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.huankuans {
		width: 750rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.xiaofeiv {
		width: 750rpx;
		height: 130rpx;
		/* line-height: 120rpx; */
		background-color: #FFFFFF;
		font-size: 28rpx;
		margin-top: 1rpx;

	}

	.xiaofeivs {
		position: absolute;
		left: 28rpx;
	}
</style>
