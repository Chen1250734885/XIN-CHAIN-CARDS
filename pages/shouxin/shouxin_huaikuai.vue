<template>
	<view>
		<!-- 头部背景图片 -->
		<view class="daxiao">
			<image :src="banner.imgs" mode="aspectFit"></image>
		</view>
		<!-- 主体内容 -->
		<view class="bank" :style="'background-color: '+item.bank.back_color" v-for="(item,index) in datas">
			<!-- 银行图标 -->
			<view class="bank_ts">
				<image :src="item.bank.bank_icon_url" mode="aspectFill" style="width: 100%;height: 100%;"></image>
			</view>
			<!-- 银行详情 -->
			<view class="bank_t">

				<view class="bank_r">
					<text class="sz">{{item.name}}（{{item.bc_bank_number.last}}）</text>
					<view class="sz_2">
						<image src="../../static/xinyongka.png" mode=""></image>
					</view>
					<view class="sz_3">额度：{{item.edu}}</view>
				</view>
			</view>
			<!-- 立即开通 -->
			<view class="kaito">
				<view class="yinglian">
					<image src="../../static/xiaoyinlian.png" style="width: 100%; height: 100%;" mode=""></image>
				</view>
				<view v-if="item.kekaitong===0&&item.yi===0" class="liji" @tap="opens(item.id+'&types=3,4')" :style="{color:item.yi===0?'rgba(218,28,30,1)':'rgba(218,28,30,1)'}">暂不支持</view>
				<view v-else class="liji" @tap="opens(item.id+'&types=3,4')" :style="{color:item.kekaitong===0?'rgba(55,205,97,1)':'rgba(218,28,30,1)'}">{{ item.kekaitong===0?'开通完成':'立即开通' }}</view>
				<view v-show="item.kekaitong!=0" style="position: relative;right: -180rpx;bottom: 5rpx; width:20rpx;height:22rpx;background:rgba(218,28,30,1);border-radius:50%; font-size:20rpx;font-weight:400;color:rgba(255,255,255,1);text-align: center;line-height: 21rpx;transform: translateY(-56rpx);">{{ item.kekaitong }}</view>
			</view>
			<!-- 还款状态 -->
			<view class="zhuantai" v-if="item.jihua=='计划执行中'">{{item.jihua}}</view>
			<view class="zhuantais" v-else>{{item.jihua}}</view>
			<!-- 还款日期详情 -->
			<view class="grace-rows" v-if="item.zuihou">
				<view class="grace-columns" style="text-align: center;margin-left: 35rpx;margin-right: 60rpx;margin-top: 17rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{item.bc_bill}}日</text>
				</view>
				<view class="grace-columns" style="text-align: center;margin-top: 17rpx;margin-left: 0;margin-right: 50rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{item.bc_repayment}}日</text>
				</view>
				<view class="grace-rows" style="text-align: center;margin:8rpx 0rpx;">
					<text style="font-size:70rpx;font-weight:bold;color:rgba(255,255,255,1);">{{item.shenyu}}</text>
					<view class="grace-columns" style="margin-top: 10rpx;">
						<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">天到期</text>
						<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">({{item.times}})</text>
					</view>
				</view>
				<!-- 进度条 -->
				<view class="jindutiao" v-if="item.zuihou">
					<cmd-circle cid="circle11" type="circle" :stroke-width="2" :width="40" :percent="item.wanchen" :showInfo="true"
					 stroke-color="#00FF00" :font-size="10"></cmd-circle>
				</view>

			</view>
			<view class="grace-rows" v-else>
				<view class="grace-columns" style="text-align: center;margin: 17rpx 50rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">账单日</text>
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{item.bc_bill}}日</text>
				</view>
				<view class="grace-columns" style="text-align: center;margin: 17rpx 70rpx;">
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">还款日</text>
					<text style="font-size:26rpx;font-weight:400;color:rgba(255,255,255,1);">{{item.bc_repayment}}日</text>
				</view>
				<view class="grace-rows" style="text-align: center;margin:8rpx 0rpx;">
					<text style="font-size:70rpx;font-weight:bold;color:rgba(255,255,255,1);">{{item.shenyu}}</text>
					<view class="grace-columns" style="margin-top: 10rpx;">
						<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">天到期</text>
						<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">({{item.times}})</text>
					</view>
				</view>
			</view>
			<!-- 还款信息修改 -->
			<view class="but grace-nowrap">
				<button type="default" class="btns" plain="false" style="color: #FFFFFF;" @tap="Goto(index)">
					修改信息
				</button>
				<button type="default" class="btns" plain="false" style="color: #FFFFFF;" @tap="goutojilu(index)">
					还款记录
				</button>
				<button type="warn" class="btnst" plain="false" style="color: #FFFFFF;" v-if="item.zuihou" @tap="chakan(index)">
					查看计划
				</button>
				<button type="warn" class="btnst" plain="false" style="color: #FFFFFF;" v-else @tap="chengcheng(index)">
					生成计划
				</button>
			</view>
		</view>
		<view style="height:100rpx;"></view>
		<!-- 添加按钮 -->
		<view class="annu" @tap="Gotod">
			<button type="primary" class="bts">
				<image src="../../static/tj.png" style="width: 30rpx; height: 30rpx; margin-right: 7rpx;transform: translateY(3rpx);"
				 mode=""></image>
				添加信用卡
			</button>
		</view>

		<!-- 弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<view class="tub">!</view>
				<text style="font-size: 30rpx;color: #333333; line-height:290rpx;margin-left: 46rpx;">初次使用授信还款需完成图片认证</text>
				<view style="display: inline-block;">
					<button class="btn1" @tap="close">取消</button>
					<button class="btn2" @tap="renzhens">前往认证</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue";
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue";
	export default {
		components: {
			uniPopup,
			cmdProgress,
			cmdCircle
		},
		data() {
			return {
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
				progresstext: '50',
				banner: {},
				datas: [],
				zhenzheng: 0,
				// renzhen:false,
				types: ''
			}
		},
		onLoad(opt) {
			this.types = opt.types
			this.getData();
			console.log(this.types)
		},
		onShow() {
			this.getData();
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		methods: {
			// 添加信用卡
			Gotod() {
				uni.navigateTo({
					url: '/pages/add_credit_card/add_credit_card1?types=3,4'
				})
			},
			getData() {
				var that = this;
				that.req.post(that.lochost + '/mytrunk/souxin/get_souxin_data', {
					types: that.types
				}, {}, function(res) {
					console.log(res)
					//绑定banner图片
					if (res.code == 200) {
						that.$data.banner = res.data.banner;
						//绑定卡信息
						that.$data.datas = res.data.card;
						console.log(res.data.card)
						that.$data.zhenzheng = res.data.renzhen
						// that.$data.renzhen = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			//点击立即开通
			opens: function(id) {
				var zhenzheng = this.$data.zhenzheng;
				// if(zhenzheng==0){
				// 	this.open();
				// 	return;
				// }
				uni.navigateTo({
					url: '/pages/generation_plan/passageway?card_id=' + id
				})

			},
			//跳转认证
			renzhens: function() {
				this.close();
				uni.navigateTo({
					url: '/pages/Picture_seriously/seriously'
				})
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			sliderchange: function(event) {
				var val = event.detail.value;
				val = val / 10;
				this.progresstext = val;
				var deg = val / 100 * 360;
				if (deg <= 180) {
					this.rightprogress = 'rotate(' + (45 + deg) + 'deg)'
					this.leftprogress = 'rotate(' + (-45) + 'deg)'
				} else {
					this.rightprogress = 'rotate(' + (45 + 180) + 'deg)'
					this.leftprogress = 'rotate(' + (-45 + (deg - 180)) + 'deg)'
				}
			},
			//跳转到修改信息
			Goto: function(index) {
				console.log(index);
				var shuju = this.$data.datas[index];
				var url = '/pages/card_bag/modify_credit_card?bc_account_name=' + shuju.bc_account_name + '&bc_id=' + shuju.id +
					'&bc_bank_number=' + shuju.bc_bank_number.bc_bank_number + '&bc_bill=' + shuju.bc_bill + '&bc_repayment=' + shuju
					.bc_repayment + '&bc_cvn2=' + shuju.bc_cvn2 + '&bc_effective=' + shuju.bc_effective + '&bc_mobile=' + shuju.bc_mobile +
					'&edu=' + shuju.edu
				console.log(shuju)
				uni.navigateTo({
					url: url
				})
			},
			//跳转到还款记录
			goutojilu: function(index) {
				var shuju = this.$data.datas[index];
				console.log(shuju)
				var url = '/pages/Past_period/PastPeriod_plan?card_id=' + shuju.id;
				console.log(shuju)
				uni.navigateTo({
					url: url
				})
			},
			//查看计划
			chakan: function(index) {
				var shuju = this.$data.datas[index];
				console.log(shuju.id)
				var url = '/pages/Details_plan/details_plans?id=' + shuju.zuihou;
				console.log(shuju)
				uni.navigateTo({
					url: url
				})
			},
			//生成计划
			chengcheng: function(index) {
				var zhenzheng = this.$data.zhenzheng;
				// if(zhenzheng==0){
				// 	this.open();
				// 	return;
				// }
				var shuju = this.$data.datas[index];
				console.log(shuju)
				var url = '/pages/Repayment/Repayment_plan?card_id=' + shuju.id;
				console.log(shuju)
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.daxiao {
		width: 100%;
		height: 240rpx;
	}

	.daxiao image {
		width: 100%;
		height: 100%;
	}

	.bank {
		/* width: 670rpx; */
		/* height: 320rpx; */
		background-color: #F98100;
		border-radius: 20rpx;
		margin: 20rpx 40rpx;


	}

	.bank_t {
		position: absolute;
		margin-top: 11rpx;
		display: inline-block;
		float: left;
	}

	.bank_ts {
		display: inline-block;
		width: 70rpx;
		height: 70rpx;
		margin-top: 22rpx;
		margin-left: 36rpx;
		/* background-color: #000000; */

	}

	.bank_r {
		display: inline-block;
		margin-left: 22rpx;
	}

	.sz {
		display: inline-block;
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

	.sz_3 {
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.kaito {
		display: inline-block;
		width: 220rpx;
		height: 50rpx;
		margin-left: 328rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		align-items: center;

	}

	.yinglian {
		display: inline-block;
		width: 55rpx;
		height: 34rpx;
		margin-top: 8rpx;
		margin-bottom: 8rpx;
		margin-left: 32rpx;
		margin-right: 10rpx;
	}

	.liji {
		display: inline-block;
		font-size: 28rpx;
		color: #DA1C1E;
		transform: translateY(-7rpx);
		margin-left: -5rpx;
	}

	.zhuantai {
		width: 670rpx;
		height: 40rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: 29rpx;
		text-align: center;
		color: #37CD61;
	}

	.zhuantais {
		width: 670rpx;
		height: 40rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: 29rpx;
		text-align: center;
		color: #5E5E5E;
	}

	.but {
		padding: 20rpx 18rpx;
	}

	.btns {
		width: 180rpx;
		height: 60rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 10rpx;
		font-size: 30rpx;
		line-height: 60rpx;
	}

	.btnst {
		width: 185rpx;
		height: 60rpx;
		border: rpx solid #FFFFFF;
		border-radius: 10rpx;
		font-size: 30rpx;
		line-height: 55rpx;
	}

	uni-button[type=default][plain] {
		border: 2rpx solid #FFFFFF;
	}

	uni-button[type=warn][plain] {
		border: 4rpx solid #FFFFFF;
	}

	.bts {
		width: 750rpx;
		height: 100rpx;
		border-radius: 0;
		bottom: 0;
		position: fixed;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	.popup {
		width: 540rpx;
		height: 340rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.tub {
		position: fixed;
		width: 53rpx;
		height: 53rpx;
		border-radius: 50rpx;
		background-color: #F75A04;
		margin-left: 244rpx;
		margin-top: 30rpx;
		line-height: 53rpx;
		color: #FFFFFF;
		font-size: 48rpx;
		text-align: center;
	}

	.btn1 {
		width: 270rpx;
		height: 70rpx;
		background-color: #61A2FC;
		margin-top: -20rpx;
		margin-left: 0;
		margin-right: 0.1rpx;
		border-radius: 0;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		display: inline-block;
	}

	.btn2 {
		width: 269rpx;
		height: 70rpx;
		background-color: #1678FF;
		margin-top: -20rpx;
		/* margin-right: -1rpx; */
		border-radius: 0;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		display: inline-block;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-flow: wrap;
		align-items: center;
		border-radius: 50%;
		text-align: center;
		height: 400rpx;
		padding-top: 50rpx;
	}

	.circleprogress {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;

	}

	.circleprogress .progresstext {
		position: absolute;
		font-size: 40rpx;
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		color: #008000;
	}

	.circleprogress .wrapper {
		width: 100rpx;
		height: 200rpx;
		overflow: hidden;
	}

	.circleprogress .leftprogress,
	.rightprogress {
		width: 160rpx;
		height: 160rpx;
		border: 20rpx solid green;
		border-bottom: 20rpx solid #7ef22e;
		border-radius: 50%;

	}

	.circleprogress .leftprogress {
		border-right: 20rpx solid #7ef22e;
	}

	.circleprogress .rightprogress {
		border-left: 20rpx solid #7ef22e;
		margin-left: -100rpx;
	}

	.section {
		width: 80%;
		margin-top: 50rpx;
	}

	.jindutiao {
		margin-top: 17rpx;
		margin-left: 77rpx;
		margin-right: 15rpx;
	}
</style>
