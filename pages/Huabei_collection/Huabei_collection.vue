<template>
	<!-- 花呗收款 -->
	<view class="shoukuai">
		<view class="sk">
			<view class="money">
				<text class="money_s">支付金额</text>
			</view>
			<view class="mony">
				<text style="font-size:50rpx;font-weight:400;">￥</text>
				<input type="number" @input="tianxie" placeholder="请输入支付金额" :value="money" placeholder-style="font-size: 30rpx;"
				 style="width: 220rpx;display: inline-block;margin-left: 55rpx;transform: translateY(10rpx);" />
			</view>
			<view style="width:610rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 10rpx;margin-left: 41rpx;margin-bottom: 12rpx;"></view>
			<view style="display: inline-block;">
				<text class="daozhang">到账金额</text>
				<text :class="daozhang === 0? 'sz' : 'sz_t'">{{daozhang}}</text>
			</view>
			<view style="display: inline-block;">
				<text class="sxf">手续费</text>
				<text :class="shouxu === 0? 'szs_2' : 'szs_2t'">{{shouxu}}</text>
			</view>
		</view>
		<view class="sk_2">
			<view class="Receivables">
				<text class="ables">收款储蓄卡</text>
			</view>
			<view class="zhanghu" @tap="showDialog1">
				<image :src="shoukuanzhanghu_list[myindex].bank.bank_icon_color" class="imst" mode=""></image>
				<text style="font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">{{shoukuanzhanghu_list[myindex].bank.name}}({{shoukuanzhanghu_list[myindex].bc_bank_number.last}})</text>
			</view>
			<image src="../../static/jiantou.png" style="width: 15rpx;height: 25rpx;position: fixed;left: 636rpx;transform: translateY(-20rpx);"></image>
			<view style="width:610rpx;height:1rpx;background:#A5A5A5;opacity:0.5;margin-left: 41rpx;margin-top: 46rpx;"></view>

		</view>
		<view class="sk_3">
			<view class="quota">
				<text class="quor" style="margin-right: 136rpx;">单笔上限{{yewu.dan_quota}}元</text>
				<text class="quor_2">日交易限额{{yewu.ri_quota}}元</text>
			</view>
			<view class="quota_2">
				<text class="quor" style="margin-right: 75rpx;">交易时间：{{yewu.strart_times}}-{{yewu.end_times}}</text>
				<text class="quor_2" style="margin-left: 15rpx;">费率：{{yewu.rate}}%</text>
			</view>
		</view>

		<!-- 收款按钮 -->
		<view class="skbut">
			<button class="bon" @tap="queren">确认收款</button>
		</view>
		<!-- 收款记录 -->
		<image @tap="Goto('/pages/Huabei_collection/Huabei_record')" src="../../static/shoukuaijilu.png" style="width:166rpx;height: 166rpx;position: relative;margin-left: 550rpx;margin-top: 20rpx; "></image>

		<!-- 支付账户遮罩 -->
		<graceBottomDialog :show="show1" @closeDialog="closeDialog1">
			<view slot="btns">
				<view style="height: 80rpx;line-height: 80rpx;">
					<view class="grace-flex-center">
						<text style="font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">选择收款账户</text>
						<view style="position: relative;left: 230rpx;top: 5rpx;" @tap="closeDialog1">
							<image src="../../static/quxiao.png" style="width: 30rpx;height: 30rpx;"></image>
						</view>
					</view>
				</view>
			</view>
			<view slot="content">
				<scroll-view class="grace-scroll-y" scroll-y style="height: 400rpx;">
					<view @tap="qiehuanshoukuan(item,index)" v-for="(item,index) in shoukuanzhanghu_list" :key="index" class="grace-rows grace-flex-vcenter"
					 style="height: 80rpx;border-bottom: 2rpx solid #F7F7F7; ">
						<image :src="item.bank.bank_icon_color" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
						<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">{{item.name}}({{item.bc_bank_number.last}})</text>
					</view>
					<view @tap="Goto('/pages/add_savings_card/add_savings_card')" class="grace-rows grace-flex-vcenter" style="height: 80rpx;">
						<image src="../../static/tianjia.png" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
						<text style="margin-left: 25rpx; font-size:30rpx;font-weight:400;color:rgba(0,0,0,1);">添加储蓄卡</text>
					</view>
				</scroll-view>
			</view>
		</graceBottomDialog>
		<!-- 验证码弹窗 -->
		<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
			<view class="content2" slot="content" style="text-align: center;">
				<!-- <text>请输入验证码</text> -->
				<text style="font-size: 26rpx;">验证码已发送至您手机</text></br>
				<input v-model="code" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx" placeholder="请输入验证码" />
			</view>
			<view slot="btns" class="grace-space-between">
				<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
				<text class="grace-dialog-buttons grace-blue" @tap="yanzmehnduanxin">确认</text>
			</view>
		</graceDialog>
	</view>
</template>

<script>
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	export default {
		data() {
			return {
				show1: false,
				shoukuanzhanghu_list: [{
					bank: {
						bank_icon_color: '',
						name: '',
					},
					bc_bank_number: {
						last: ''
					}
				}],
				zhanghuneme: '',
				yewu: {},
				myindex: 0,
				money: '',
				daozhang: 0,
				shouxu: 0,
				order_num: '',
				code: '',
				// 验证码
				show3: false
			}

		},
		onLoad: function() {
			var vm = this;
			var url = this.lochost + '/mytrunk/Huabei/get_huanbei_yewu';
			this.req.post(url, {}, {}, function(res) {
				console.log(res);
				if (res.code == 200) {
					vm.shoukuanzhanghu_list = res.data.saving;
					vm.genghuanzhifuzhanghu(vm.shoukuanzhanghu_list);
					var yewu = res.data.yewu;
					yewu.rate = (yewu.rate * 100).toFixed(2);
					vm.yewu = res.data.yewu;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			})
		},
		methods: {
			showDialog1() {
				this.show1 = true;
			},
			closeDialog1() {
				this.show1 = false;
			},
			// 显示验证码输入框
			showDialog3: function() {
				this.show3 = true;
			},
			// 验证码关闭输入框
			closeDialog3: function() {
				this.show3 = false;
			},
			genghuanzhifuzhanghu(item) {
				if (item.length === 0) {
					this.zhanghuneme = '请添加信用卡';
				} else {
					console.log(item);
					this.zhanghuneme = item[0].name + '（' + item[0].bc_bank_number.last + '）'
					this.bc_id = item[0].id;
					// 换通道
					// this.tongdao()
				}
				this.show1 = false;
			},
			qiehuanshoukuan(item, index) {
				this.card_id = item.id
				this.myindex = index;
				this.shoukuanname = item.name + '(' + item.bc_bank_number.last + ')'
				this.closeDialog1()
			},
			tianxie(obj) {
				console.log(obj);
				var money = obj.detail.value;
				if (money < 0) {
					uni.showToast({
						title: '请输入正整数',
						icon: 'none'
					})
					return
				}
				var yewu = this.yewu;
				if (money > yewu.dan_quota) {
					uni.showToast({
						title: '输入高于一笔最大金额',
						icon: 'none'
					})
					return
				}
				this.money = money;
				
				if(this.money !== ''){
					var shouxu = (money * yewu.rate / 100).toFixed(2)
					var daozhang = (money - shouxu - yewu.fixed_rate).toFixed(2);
					this.shouxu = shouxu
					this.daozhang = daozhang
				}else{
					this.shouxu = 0
					this.daozhang = 0
				}

			},
			//确认收款
			queren() {
				var money = this.money;
				var yewu = this.yewu;
				var indexs = this.myindex;
				var saving = this.shoukuanzhanghu_list
				if (money < yewu.min_money) {
					uni.showToast({
						title: '金额小于最小金额',
						icon: 'none'
					})
					return
				}
				// var 
				console.log(saving[indexs])
				var that = this;
				var url = this.lochost + '/mytrunk/Huabei/shengcheng_hua_bai'
				this.req.post(url, {
					money: money,
					yewu_id: yewu.id,
					saving_id: saving[indexs].id,
				}, {}, function(res) {
					console.log(res);
					if (res.code == 200) {
						var data = res.data;
						that.order_num = data.order_num;
						// return
						if (data.is_need_SMS === 0) {
							uni.showToast({
								title: '花呗刷卡成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/Huabei_collection/Huabei_record'
								})
							}, 1000)
						} else if (data.is_need_SMS === 1) {
							// that.order_num=data.order_num;
							// that.yuliushouji=data.phone;
							that.show3 = true;
						} else if (data.is_need_SMS === 2) {
							that.Goto('/pages/web_view/web_view?url=' + res.data.url);
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//验证码短信
			yanzmehnduanxin() {
				var order_num = this.order_num;
				var code = this.code;
				if (!code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				var that = this;
				var url = that.lochost + '/mytrunk/Huabei/confim_huabei'
				this.req.post(url, {
					order_num: order_num,
					code: code
				}, {}, function(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '刷卡成功',
						})
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/Huabei_collection/Huabei_record'
							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},

		components: {
			graceBottomDialog,
			graceDialog
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content2 {
		padding: 30rpx;
		line-height: 50rpx;
	}

	.grace-dialog-buttons {
		width: 700rpx;
		line-height: 88rpx;
		height: 88rpx;
		display: block;
		overflow: hidden;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}

	.sk {
		width: 690rpx;
		height: 250rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin: 20rpx 30rpx;
	}

	.sk_2 {
		width: 690rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin: 20rpx 30rpx;
	}

	.sk_3 {
		width: 690rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-left: 30rpx;
	}

	.money {
		padding-top: 45rpx;
	}

	.Receivables {
		padding-top: 24rpx;
	}

	.money_s {
		font-size: 31rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-left: 39rpx;
	}

	.mony {
		padding-top: 20rpx;
		margin-left: 40rpx;
	}

	.ables {
		font-size: 31rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-left: 45rpx;
	}

	.zhanghu {
		margin-top: 19rpx;
		margin-left: 136rpx;
		transform: translateY(15rpx);
	}

	.daozhang {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-left: 45rpx;
	}

	.sz {
		position: fixed;
		margin-left: 120rpx;
		font-size: 30rpx;
		color: #999999;
	}

	.sz_t {
		position: fixed;
		margin-left: 120rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.sxf {
		position: fixed;
		margin-left: 236rpx;
		font-size: 24rpx;
		color: #333333;
		transform: translateY(5rpx);
	}

	.szs_2 {
		margin-left: 440rpx;
		font-size: 30rpx;
		color: #999999;
	}

	.szs_2t {
		margin-left: 440rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.quota {
		padding-top: 18rpx;
		margin-left: 42rpx;
	}

	.quota_2 {
		margin-bottom: 17rpx;
		margin-left: 42rpx;
	}

	.quor {

		font-size: 24rpx;
		color: rgba(51, 51, 51, 1);
	}

	.quor_2 {
		font-size: 24rpx;
		color: rgba(51, 51, 51, 1);
		/* margin-right: 125rpx; */
	}

	.skbut {
		margin-top: 169rpx;
	}

	.bon {
		width: 550rpx;
		height: 96rpx;
		background-color: #1678FF;
		border-radius: 10rpx;
		font-size: 32rpx;
		line-height: 96rpx;
		color: #FFFFFF;
	}

	.imst {
		width: 58rpx;
		height: 60rpx;
		/* background-color: #00B3FF; */
		display: inline-block;
		float: left;
		margin-left: -79rpx;
		transform: translateY(-11rpx);
	}
</style>
