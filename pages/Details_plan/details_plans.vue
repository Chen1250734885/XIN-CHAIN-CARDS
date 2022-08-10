<template>
	<!-- 计划详情 -->
	<view>
		<!-- 银行详情 -->
		<view class="yinx">
			<view class="yinx_bz" :style="'background-color: '+datas.bank_id.bank.back_color">
				<!-- 银行图标 -->
				<view class="yx" style="display: inline-block;">
					<image :src="datas.bank_id.bank.bank_icon_url" style="width: 100%;height: 100%;"></image>
				</view>
				<!-- 银行名称 -->
				<view class="mc" style="display: inline-block;">
					<text class="mc_h">{{datas.bank_id.name}}({{datas.bank_id.bc_bank_number.last}})</text>
					<view class="sz_2">
						<image src="../../static/xinyongka.png" mode=""></image>
					</view>
				</view>
				<!-- 授信还款图标 -->
				<view class="tb" style="display: inline-block;">
					<image src="../../static/shouxin.png" style="width: 100%; height: 100%;" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 账单详情 -->
		<view class="xq">
			<text style="font-size: 30rpx;color: #333333;margin-left: 33rpx;line-height: 120rpx;">账单金额：</text>
			<text style="font-size: 26rpx;color: #959595;margin-left: 89rpx;">{{datas.bill_money}}元</text>
		</view>
		<view class="xq" style="margin-top: 2rpx;">
			<text style="font-size: 30rpx;color: #333333;margin-left: 33rpx;line-height: 120rpx;">已还款：</text>
			<text style="font-size: 26rpx;color: #959595;margin-left: 118rpx;">{{datas.back_price}}元</text>
		</view>
		<view class="xq" style="margin-top: 2rpx;">
			<text style="font-size: 30rpx;color: #333333;margin-left: 33rpx;line-height: 120rpx;">还款日期：</text>
			<text style="font-size: 26rpx;color: #959595;margin-left: 89rpx;">共{{datas.tianshu}}天（{{datas.start_time}}至{{datas.end_time}}）</text>
		</view>
		<!-- 终止按钮 -->
		<view class="an">
			<view class="ty">
				<text style="font-size: 24rpx;color: #999999;">已同意</text>
				<text style="font-size: 24rpx;color: #FF7200;">《星火计划授信还款服务协议》</text>
			</view>
			<view class="an_jh">
				<button class="qxan_hon" v-if="datas.rp_state=='已终止'">{{datas.rp_state}}</button>
				<button class="qxan_lv" v-if="datas.rp_state=='已完成'">{{datas.rp_state}}</button>
				<button class="qxan" v-if="datas.rp_state=='执行中'">计划执行中，无法终止计划</button>
				<button class="qran" v-if="datas.rp_state=='未执行'" @tap="zongzijihua">终止计划</button>
				<button class="qran" v-if="datas.rp_state=='已暂停'" @tap="chongqijihua">重启计划</button>
			</view>
			<!-- 客服 -->
			<view class="tx">
				<text style="font-size: 28rpx;">计划开始执行后(产生消费或还款),无法终止计划。</text>
			</view>
			<view class="txs">
				<text style="font-size: 28rpx;margin-left: 120rpx;">如有疑问可联系客服</text>
			</view>
			<!-- 客服按钮 -->
			<view class="kf">
				<view class="phon" @tap="dadianhua">
					<image src="../../static/lianxikehu.png" style="width: 100%;height: 100%;" mode="aspectFit"></image>
					<!-- <view style="width: 26rpx;height: 26rpx;background-color: #FFFFFF;display: inline-block;margin-right: 9rpx;margin-left: -15rpx;transform: translateY(5rpx);"></view>
					联系客服 -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				big_order_id: 0,
				datas: {
					"id": 164,
					"name": "",
					"pid": 0,
					"sort": 100,
					"tubiao": "",
					"create_time": "2020-04-21 17:41:05",
					"update_time": 1587462065,
					"delete": 1,
					"status": 1,
					"delete_time": 0,
					"uid": "28",
					"pattern": "空卡代还",
					"passageway": null,
					"bank_id": {
						"id": 13,
						"name": "平安银行",
						"pid": 0,
						"sort": 100,
						"tubiao": "",
						"create_time": 1577324692,
						"update_time": 1587448406,
						"delete": 1,
						"status": 1,
						"delete_time": 0,
						"uid": "28",
						"bc_account_name": "毛文科",
						"bc_bank_number": {
							"bc_bank_number": "6221550863607572",
							"bc_bank_number_c": "6221********7572",
							"last": "7572"
						},
						"bc_branch": "信用卡",
						"bc_cvn2": "846",
						"bc_effective": "04/25",
						"bc_bill": "13",
						"bc_repayment": "30",
						"bc_mobile": "18227948197",
						"bc_bank_id": "16",
						"bc_bank_code": "",
						"provinces": "四川省",
						"city": "成都市",
						"is_test": "0",
						"recommend_cloud_channel": "",
						"passageway": "0",
						"edu": 0,
						"bank": {
							"id": 16,
							"name": "平安银行",
							"pid": 0,
							"sort": 100,
							"tubiao": "",
							"create_time": 1576030610,
							"update_time": 1587278743,
							"delete": 0,
							"status": 1,
							"delete_time": 0,
							"bank_abbreviation": "PAB",
							"bank_alphabet": "P",
							"is_recommend": "0",
							"bank_icon_url": "http://oudan.maowenke.cn/221987e77fe3a553ae2200f1a42acd25.png",
							"bank_icon_color": "http://oudan.maowenke.cn/50a58b0025d28e757d47820365730603.png",
							"back_img": "http://oudan.maowenke.cn/6e131583a654880abd08090fcfe09bc0.png",
							"back_color": "#e4631c",
							"is_enable": "可用",
							"add_user_id": "1",
							"b_num": "307",
							"is_kongka": 1
						}
					},
					"bill_money": 1000,
					"rp_price": 37.6,
					"back_price": 0,
					"city_code": "5101",
					"start_time": "04-22",
					"end_time": "04-23",
					"num": 2,
					"already_num": 0,
					"rp_state": "已终止",
					"card_number": "6221550863607572",
					"state_stop": "手动终止",
					"stop_time": 1587462252,
					"stop_msg": "客户手动终止",
					"prepared_price": 0,
					"poundage": 12.6,
					"repayment_order": null,
					"bank_code": "PAB",
					"user_error": null,
					"user_ip": "111.9.61.8",
					"app": "1",
					"is_coupon": 0,
					"stroke_number": 2,
					"revolving_fund": "0",
					"zong_money": 1023.6,
					"feilv": 0.0106,
					"coupon_id": null,
					"coupon": null,
					"is_fenrun": "1",
					"my_balance": null,
					"zong_huan": "1011",
					"tianshu": 1,
					"kefu": "18227948197"
				}
			}
		},
		onLoad(opt) {
			// console.log(opt);
			var id = opt.id;
			this.$data.big_order_id = id;
			var that = this;
			var url = this.lochost + '/mytrunk/souxin/get_big_info'
			console.log(this.lochost)
			this.req.post(url, {
				id: id
			}, {}, function(res) {
				console.log(res);
				if (res.code == 200) {
					that.$data.datas = res.data;
					that.$data.kefu = res.data.kefu;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})

		},
		// onUnload(){
		// 	uni.navigateTo({
		// 		url:'/pages/shouxin/shouxin_huaikuai'
		// 	})
		// },

		methods: {
			//联系客服
			dadianhua: function() {
				var num = this.$data.kefu;
				uni.makePhoneCall({
					phoneNumber: num
				})
			},
			//终止计划
			zongzijihua: function() {
				console.log(this.datas.id);
				var id = this.datas.id;
				var url = this.lochost + '/mytrunk/souxin/end_dingan';
				this.req.post(url, {
					id: id
				}, {}, function(res) {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({

							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.code,
							icon: 'none'
						})
					}
				})
			},
			//重启计划
			chongqijihua: function() {
				console.log(this.datas.id);
				var id = this.datas.id;
				var url = this.lochost + '/mytrunk/souxin/start_dingdan';
				this.req.post(url, {
					id: id
				}, {}, function(res) {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({

							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.code,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.tb {
		width: 80rpx;
		height: 80rpx;
		margin-left: 239rpx;
	}

	.yinx {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;

	}


	.yinx_bz {
		position: fixed;
		width: 690rpx;
		height: 130rpx;
		border-radius: 20rpx;
		background-color: #F98100;
		margin: 25rpx 30rpx;
	}

	.yx {
		width: 50rpx;
		height: 50rpx;
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

	.xq {
		width: 100%;
		height: 120rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.an {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-top: 2rpx;
	}

	.ty {
		padding-top: 15rpx;
		margin-left: 37rpx;
	}

	.an_jh {
		margin-top: 228rpx;
	}

	.qxan {
		width: 500rpx;
		height: 90rpx;
		background-color: #999999;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 90rpx;
	}

	.qran {
		width: 500rpx;
		height: 90rpx;
		background-color: #1678FF;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 90rpx;
		margin-top: 22rpx;
	}

	.qxan_lv {
		width: 500rpx;
		height: 90rpx;
		background-color: #ffffff;
		font-size: 28rpx;
		color: #08D608;
		line-height: 90rpx;
		margin-top: 22rpx;
	}

	.qxan_hon {
		width: 500rpx;
		height: 90rpx;
		background-color: #ffffff;
		font-size: 28rpx;
		color: red;
		line-height: 90rpx;
		margin-top: 22rpx;
	}

	.tx {
		width: 680rpx;
		height: 56rpx;
		margin-left: 88rpx;
		margin-top: 142rpx;
	}

	.txs {
		width: 680rpx;
		height: 56rpx;
		margin-left: 150rpx;
		margin-top: -20rpx;
	}

	.kf {
		margin-top: 21rpx;
	}

	.phon {

		width: 175rpx;
		height: 40rpx;
		margin-bottom: 129rpx;
		margin-left: 307rpx;
		margin-top: 21rpx;
	}
</style>
