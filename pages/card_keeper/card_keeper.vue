<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<view class="grace-columns">
				<view
					v-for="(item, index) in card_list"
					:key="index"
					:style="{ background: item.back_color }"
					style="margin: 10rpx auto; width:680rpx;height:290rpx;box-shadow:0px 0px 15rpx 0px rgba(131,131,131,0.3);border-radius:30rpx;"
				>
					<view
						:style="{ backgroundImage: 'url(' + item.back_img + ')' }"
						style="width:680rpx;height:300rpx;background-size:288rpx 166rpx; background-repeat:no-repeat;background-position-x: 357rpx;background-position-y: 130rpx;"
					>
						<view style="margin: 30rpx 30rpx;">
							<view class="grace-rows">
								<image :src="item.bank_icon_url" style="width: 50rpx;height: 48rpx;"></image>
								<view class="grace-columns" style="margin-left: 15rpx; position: relative;bottom: 10rpx;width: 300rpx;">
									<!-- style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 300rpx;color: color:rgba(255,255,255,1);;" -->
									<view class="tepst">
										<text style="margin-bottom: 2rpx; font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item.bank_name }}</text>
									</view>

									<image src="../../static/xinyongka.png" style="width: 60rpx;height: 22rpx;"></image>
									<!-- <text style="font-size: 24rpx; color: #FFFFFF;" isTitle="xuant ">额度：{{item.edu}}</text> -->
								</view>
								<!-- 无通道时展示的状态 -->
								<view
									v-if="item.is_dredge === 0 && item.is_dredge_num === 0"
									@tap="
										Goto(
											'/pages/generation_plan/passageway?card_id=' +
												item.bc_id +
												'&type=2' +
												'&card_name=' +
												item.bank_name +
												'&bank_icon_url=' +
												item.bank_icon_color +
												'&bc_effective=' +
												item.bc_effective.slice(5) +
												'/' +
												item.bc_effective.slice(2, 4) +
												'&bc_cvn2=' +
												item.bc_cvn2 +
												'&back_img=' +
												item.bank_icon_url +
												'&card_color=' +
												item.back_color
										)
									"
									style=" margin-left: 24rpx; width:220rpx;height:40rpx;background:rgba(255,255,255,1);border-radius:20rpx;text-align: center;line-height: 40rpx;"
								>
									<image src="../../static/xiaoyinlian.png" style="width: 56rpx;height: 34rpx; position: relative; top: 3.5rpx;"></image>
									<text
										style="position: relative;bottom: 4rpx; line-height:34rpx ;margin-left: 10rpx; font-size:26rpx;font-weight:400;"
										:style="{ color: item.yi === 0 ? 'rgba(218,28,30,1)' : 'rgba(218,28,30,1)' }"
									>
										无通道
									</text>
								</view>
								<!-- 通道开通状态 -->
								<view
									v-else
									@tap="
										Goto(
											'/pages/generation_plan/passageway?card_id=' +
												item.bc_id +
												'&type=2' +
												'&card_name=' +
												item.bank_name +
												'&bank_icon_url=' +
												item.bank_icon_color +
												'&channel_id=' +
												item.channel_id +
												'&bc_effective=' +
												item.bc_effective.slice(5) +
												'/' +
												item.bc_effective.slice(2, 4) +
												'&bc_cvn2=' +
												item.bc_cvn2 +
												'&back_img=' +
												item.bank_icon_url +
												'&card_color=' +
												item.back_color +
												'&id=' +
												item.order_id +
												'&state=' +
												item.state +
												'&schema_arr=' +
												JSON.stringify(item.schema_arr)
										)
									"
									style=" margin-left: 24rpx; width:220rpx;height:40rpx;background:rgba(255,255,255,1);border-radius:20rpx;text-align: center;line-height: 40rpx;"
								>
									<image src="../../static/xiaoyinlian.png" style="width: 56rpx;height: 34rpx; position: relative; top: 3.5rpx;"></image>
									<text
										style="position: relative;bottom: 4rpx; line-height:34rpx ;margin-left: 10rpx; font-size:26rpx;font-weight:400;"
										:style="{ color: item.is_dredge_num === 0 ? 'rgba(55,205,97,1)' : 'rgba(218,28,30,1)' }"
									>
										{{ item.is_dredge_num === 0 ? '开通完成' : '立即开通' }}
									</text>
									<!-- 计划执行状态 -->
									<!-- <text style="position: relative;line-height:40rpx ;margin-left: 10rpx; font-size:26rpx;font-weight:400;"
									 :style="{ color: item.state === -1 ? '#C9C9C9' : item.state === 2 ? 'rgba(0,255,0,255)' : 'rgba(218,28,30,1)' }">
										{{
											item.state === -1
												? '无还款计划'
												: item.state == 0
												? '未确认'
												: item.state == 1
												? '未执行'
												: item.state == 2
												? '计划执行中'
												: item.state == 3
												? '执行成功'
												: item.state == 4
												? '取消执行'
												: item.state == 5
												? '计划已暂停'
												: ''
										}}
									</text> -->
								</view>
								<!-- 未开通通道数量 -->
								<view
									v-show="item.is_dredge_num != 0"
									style="position: relative;right: 25rpx;bottom: 10rpx; width:20rpx;height:20rpx;background:rgba(218,28,30,1);border-radius:50%; font-size:15rpx;font-weight:400;color:rgba(255,255,255,1);text-align: center;line-height: 20rpx;"
								>
									{{ item.is_dredge_num }}
								</view>
								<!-- 删除 -->
								<view
									@tap="
										Goto(
											'/pages/card_keeper/card_shanchu?id=' +
												item.bc_id +
												'&bc_account_name=' +
												item.bc_account_name +
												'&bank_name=' +
												item.bank_name +
												'&bc_bank_number=' +
												item.bc_bank_number_c +
												'&bc_effective=' +
												item.bc_effective +
												'&bc_mobile=' +
												item.bc_mobile +
												'&bc_repayment=' +
												item.bc_repayment +
												'&bc_bill=' +
												item.bc_bill
										)
									"
									style="margin-left: 15rpx;"
								>
									<image src="../../static/shanchu.png" style="width: 40rpx;height: 40rpx;"></image>
								</view>
							</view>
							<view style="position: relative;bottom: 3rpx; text-align: center; width:625rpx;height:1rpx;background:rgba(247,247,247,1);margin-left: 5rpx;"></view>
							<!-- <view style="position: relative;bottom: 3rpx; text-align: center; width:680rpx;height:40rpx;background:rgba(255,255,255,1);margin-left: -30rpx;" :style="{color:item.jihua==='无还款计划'?'rgba(153,153,153,1)':item.jihua==='没有查询到'?'rgba(153,153,153,1)':item.jihua==='计划执行中'?'rgba(63,192,0,1)':item.jihua==='计划暂停中'?'rgba(255,0,0,255)':'rgba(153,153,153,1)'}" >{{ item.jihua }}</view> -->

							<view class="grace-rows">
								<view class="grace-columns" style="text-align: center;margin: 21rpx 70rpx;">
									<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
									<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item.bc_bill }}日</text>
								</view>

								<view class="grace-columns" style="text-align: center;margin: 21rpx 70rpx;">
									<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
									<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{ item.bc_repayment }}日</text>
								</view>

								<view class="grace-rows" style="text-align: center;margin:10rpx -1rpx;">
									<text style="font-size:70rpx;font-weight:bold;color:rgba(255,255,255,1);">{{ item.repayment_time }}</text>
									<view class="grace-columns" style="margin-top: 10rpx;margin-left: 7rpx;">
										<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">天到期</text>
										<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">({{ item.repayment_date.substring(5) }})</text>
									</view>
								</view>
							</view>

							<view class="grace-nowrap">
								<!-- 修改信息 -->
								<button
									@tap="
										Goto(
											'/pages/card_bag/modify_credit_card?id=' +
												item.bc_bank_id +
												'&bc_account_name=' +
												item.bc_account_name +
												'&bank_name=' +
												item.bank_name +
												'&bc_bank_number=' +
												item.bc_bank_number +
												'&bc_effective=' +
												item.bc_effective.slice(5) +
												'/' +
												item.bc_effective.slice(2, 4) +
												'&bc_mobile=' +
												item.bc_mobile +
												'&bc_repayment=' +
												item.bc_repayment +
												'&bc_bill=' +
												item.bc_bill +
												'&bc_cvn2=' +
												item.bc_cvn2 +
												'&bc_id=' +
												item.bc_id
										)
									"
									type="primary"
									class="grace-button"
									plain="true"
									style="width:180rpx;height:55rpx;border:2rpx solid rgba(255,255,255,1);border-radius:25rpx;"
								>
									<text style="position: relative;bottom: 5rpx; font-size:28rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 50rpx;">修改信息</text>
								</button>
								<!-- 还款信息 -->
								<button
									@tap="
										Goto(
											'/pages/generation_plan/payment_history?back_color=' +
												item.back_color +
												'&back_img=' +
												item.back_img +
												'&bank_icon_url=' +
												item.bank_icon_url +
												'&card_name=' +
												item.bank_name +
												'&id=' +
												item.bc_id +
												'&bc_bill=' +
												item.bc_bill +
												'&bc_repayment=' +
												item.bc_repayment +
												'&repaymentNum=' +
												item.repaymentNum +
												'&times=' +
												item.times
										)
									"
									type="primary"
									class="grace-button"
									plain="true"
									style="width:180rpx;height:55rpx;border:2rpx solid rgba(255,255,255,1);border-radius:25rpx;"
								>
									<text style="position: relative;bottom: 5rpx; font-size:28rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 50rpx;">还款记录</text>
								</button>
								<!-- 我要还款、查看计划 -->
								<button
									@tap="
										Goto(
											item.state === 2 || item.state === 5
												? '/pages/generation_plan/details_of_the_plan?id=' + item.order_id
												: '/pages/generation_plan/passageway?card_id=' +
														item.bc_id +
														'&card_color=' +
														item.back_color +
														'&card_name=' +
														item.bank_name +
														'&card_icon=' +
														item.bank_icon_url +
														'&huankuanri=' +
														item.bc_repayment +
														'&channel_id=' +
														item.channel_id +
														'&type=3' +
														'&bank_icon_url=' +
														item.bank_icon_color +
														'&schema_arr=' +
														JSON.stringify(item.schema_arr) +
														'&bc_effective=' +
														item.bc_effective.slice(5) +
														'/' +
														item.bc_effective.slice(2, 4) +
														'&bc_cvn2=' +
														item.bc_cvn2 +
														'&back_img=' +
														item.bank_icon_url +
														'&state=' +
														item.state
										)
									"
									type="primary"
									class="grace-button"
									plain="true"
									style="width:180rpx;height:55rpx;border:4rpx solid rgba(255,255,255,1);border-radius:25rpx;"
								>
									<text style="position: relative;bottom: 8rpx; font-size:28rpx;font-weight:400;color:rgba(255,255,255,1);font-weight:bold;line-height: 55rpx;">
										{{ item.state === 2 || item.state === 5 ? '查看计划' : '我要还款' }}
									</text>
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				v-show="card_list.length == 0"
				style="width: 680rpx;height: 290rpx;border-radius: 30rpx;margin: 10rpx auto;background:rgba(255,255,255,1);box-shadow:0px 0px 15px 0px rgba(131,131,131,0.3);"
				@tap="Goto('/pages/add_credit_card/add_credit_card1?types=1,2')"
			>
				<view style="width: 60rpx;height: 60rpx;margin: 0 auto;">
					<image src="../../static2/tianjia.png" mode="" style="width: 100%;height: 100%;transform: translateY(69rpx);"></image>
				</view>
				<view style="text-align: center;margin-top: 70rpx;"><text style="color: rgba(79, 159, 254, 1);font-size: 24rpx;">添加信用卡</text></view>
			</view>
			<view style="height:100rpx;"></view>
			<!-- 添加信用卡 -->
			<button
				@tap="Goto('/pages/add_credit_card/add_credit_card1?types=1,2')"
				style="position: fixed;bottom: 0; width:750rpx;height:100rpx;background:rgba(79,159,254,1);font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);line-height: 100rpx;border-radius: 0rpx ;"
			>
				+添加信用卡
			</button>

			<!-- 	<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
					<view class="content2" slot="content" style="text-align: center;">
						<text style="font-size: 26rpx;">确认删除该银行卡</text></br>
					</view>
					<view slot="btns" class="grace-space-between">
						<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
						<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
					</view>
				</graceDialog> -->
		</view>
	</gracePage>
</template>

<script>
import graceDialog from '../../graceUI/components/graceDialog.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import cmdProgress from '@/components/cmd-progress/cmd-progress.vue';
import cmdCircle from '@/components/cmd-circle/cmd-circle.vue';
import { myMixins } from '@/components/myMixins/myMixins.js';
export default {
	mixins: [myMixins],
	data() {
		return {
			card_list: [],
			show3: false,
			bc_id: '',
			kekaitong: 0,
			types: '',
			days: [],
			state: ''
		};
	},
	onLoad: function() {
		// var state = uni.getStorageSync('user_u_state');
		// var vm = this
		// vm.req.post(
		// 	vm.lochost + '/index/index?method=get_authentication_state',{},{},function(res){
		// 		console.log(res);
		// 		if(res.code == 200){
		// 			vm.state = res.data.u_state
		// 		}
		// 	}
		// )
		// if (this.state !== 1) {
		// 	uni.navigateTo({
		// 		url: '/pages/authentication/modify_real_name'
		// 	});
		// 	this.Back();
		// } else {
		// 	this.shuaxin();
		// }
	},
	// onUnload() {
	// 	uni.switchTab({
	// 		url:'/pages/index/index'
	// 	})
	// },
	onBackPress(){
		uni.switchTab({
				url:'/pages/index/index'
			})
		return true;
	},
	onShow() {
		this.shuaxin();
	},
	methods: {
		shuaxin() {
			// console.log(this.types);
			const vm = this;
			// var obj = {}
			this.req.post(
				this.lochost + '/index/index?method=credit_card_list',
				{
					type: 2
				},
				{},
				function(res) {
					vm.card_list = res.data;
					var datas = res.data;
					console.log(res.data);
					var a = new Date().toLocaleDateString();
					console.log(a);
					a = a.replace(/\//g, '/');
					var nowdate = Math.floor(new Date().getTime() / 1000);
					console.log(nowdate);
					for (var i = 0; i < vm.card_list.length; i++) {
						datas[i].repayment_time = Math.ceil((datas[i].repayment_time - nowdate) / 86400);
					}
					console.log(datas);
					vm.card_list = datas;
				}
			);
		},

		// zhangtaiyanse(jihua){
		// 	if(jihua==='无还款计划'){
		// 		return {color:'rgba(51,51,51,1)'}
		// 	}else if(jihua==='没有查询到'){
		// 		return {color:'rgba(51,51,51,1)'}
		// 	}else if(jihua==='计划执行中'){
		// 		return {color:'rgba(63,192,0,1)'}
		// 	}else if(jihua==='计划暂停中'){
		// 		return{color:'rgba(255, 0, 0, 255)'}
		// 	}
		// },

		// 显示验证码输入框
		showDialog3: function(bc_id) {
			this.bc_id = bc_id;
			this.show3 = true;
		},
		// 关闭输入框
		closeDialog3: function() {
			this.show3 = false;
		},
		// 验证码输入框选择了确认
		confirm3: function() {
			this.shanchu();
			this.closeDialog3();
			this.bc_id = '';
		},
		shanchu() {
			var vm = this;
			var url = '/mytrunk/cardmanagement/del_credit';
			vm.req.post(
				vm.lochost + url,
				{
					bc_id: this.bc_id
				},
				{},
				function(res) {
					vm.msg_show(res.msg);
					vm.shuaxin();
				}
			);
		},
		woyaohuankuan() {
			// var date= new Date(); //0 表示1月
			// date.setDate(0)
			// date.setMonth(date.getMonth() + 2);
			// // 日期设置为0号, 0表示1号的前一天
			// let lastDay = date.setDate(0);
			// console.log('最后一天：' + new Date(lastDay).getTime())
			this.Goto(
				'/pages/generation_plan/generation_plan?card_id=' +
					item.id +
					'&card_color=' +
					item.bank.back_color +
					'&card_name=' +
					item.bank.name +
					'（' +
					item.bc_bank_number.last +
					'）' +
					'&card_icon=' +
					item.bank.bank_icon_url +
					'&huankuanri=' +
					item.bc_repayment
			);
		}
	},
	components: {
		gracePage,
		graceDialog,
		cmdProgress,
		cmdCircle
	}
};
</script>

<style>
.content2 {
	padding: 30rpx;
	line-height: 50rpx;
}

.grace-dialog-buttons {
	width: 700rpx;
	line-height: 88rpx;
	height: 88rpx;
	display: block;
	text-align: center;
	font-size: 26rpx;
	color: #999999;
}

.jindutiao {
	margin-top: 17rpx;
	margin-left: 77rpx;
	margin-right: 15rpx;
}

.tepst {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 250rpx;
	color: rgba(255, 255, 255, 1);
	/* background: -webkit-linear-gradient(left, transparent, #fff 55%); */
	/* 	background: -o-linear-gradient(right, transparent, #fff 55%);
		background: -moz-linear-gradient(right, transparent, #fff 55%);
		background: linear-gradient(to right, transparent, #fff 55%); */
}
</style>
