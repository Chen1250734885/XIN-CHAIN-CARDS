<template>
	<view>
		<!-- 还款计划 -->
		<view class="yinx">
			<view class="yinx_bz" :style="'background-color: '+card.bank.back_color">
				<!-- 银行图标 -->
				<view class="yx" style="display: inline-block;">
					<image :src="card.bank.bank_icon_url" style="width: 100%;height: 100%;"></image>
				</view>
				<!-- 银行名称 -->
				<view class="mc" style="display: inline-block;">
					<text class="mc_h">{{card.name}}({{card.bc_bank_number.last}})</text>
					<view class="sz_2">
						<image src="../../static/xinyongka.png" mode=""></image>
					</view>
				</view>
			</view>

		</view>
		<!-- 账单金额 -->
		<view class="je">
			<view class="grace-rows grace-flex-vcenter" style="width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">账单金额：</text>
				<input type="number" v-model="zhangdanjine" @input="morenbishu" placeholder="请输入账单金额" placeholder-style="font-size:30rpx;font-weight:400;color:rgba(153,153,153,1);"
				 style="margin-left: 30rpx;width: 500rpx" />
			</view>

			<view @tap="show = true" class="grace-rows grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:120rpx;background:rgba(255,255,255,1);">
				<text style="margin-left: 35rpx; font-size:30rpx;font-weight:400;color:rgba(51,51,51,1);">还款日期：</text>
				<text style="font-size:30rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 30rpx;">{{ date.length>0?'已选择'+date.length+'天':'请选择还款日期' }}</text>

				<image src="../../static/jiantou.png" style="width: 14rpx;height: 24rpx;margin-left: 250rpx;"></image>
			</view>

			<!-- <view class="grace-space-between grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);">
				<view>
					<text style="margin-left: 35rpx; font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">手续费：</text>
					<text style="font-size:24rpx;font-weight:bold;color:rgba(255,102,0,1);margin-left: 30rpx;">{{objcts.souxufei}}元</text>
					<text style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 30rpx;">{{objcts.feilv}}元/万</text>
					<text style="height:40rpx;background:rgba(204,204,204,1); color: rgba(204,204,204,1);margin-left: 30rpx;margin-right: 39rpx;">|</text>
					<text style="margin-left: 35rpx; font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">预交金：</text>
					<text style="font-size:24rpx;font-weight:bold;color:rgba(255,102,0,1);margin-left: 30rpx;">{{objcts.yujiaojin}}元</text>
				</view>
			</view> -->
		</view>
		<!-- 同意协议 -->
		<view class="zf" :style="{'height':windowHeight}">
			<radio-group style="display: inline-block;" @change="giabian">
				<label class="radio">
					<radio color="#FF7200" style="transform: scale(0.7);margin-left: 38rpx;" value="1" :checked="is_xuanzhong" /></label>
				<text style="font-size: 24rpx;color: #999999;">同意</text>
				<text style="font-size: 24rpx;color: #FF7200;">《火星3.0计划授信还款服务协议》</text>
			</radio-group>
			<!-- 支付按钮1 -->
			<view class="bus" style="margin-top: 400rpx;margin-bottom: 272rpx;">
				<button class="bus_n" type="primary" @tap="open">确认支付</button>
			</view>
		</view>
		<ei-calendar @change="huoqu" v-model="date" :visible.sync="show" type="multiple" :disabledDate="disabledDate"
		 :custom-date="customDate" format="YYYY-MM-DD">
		</ei-calendar>
		<!-- 支付弹框1 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popups">
				<view class="zffs">
					<image class="zhifus" src="../../static/zhifu.png" mode=""></image>
					<view style="display: inline-block;transform: translateY(12rpx);">
						<text style="font-size: 34rpx;color:#333333;margin-left: 290rpx;">快捷支付</text>
					</view>
				</view>
				<view class="qx" @tap="close">
					<image src="../../static/quxiao.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
				</view>
				<view class="xiant"></view>
				<!-- 手续费、预交金 -->
				<view class="grace-space-between grace-flex-vcenter" style="margin-top: 2rpx; width:750rpx;height:60rpx;background:rgba(255,255,255,1);margin-bottom: 35rpx;">
					<view>
						<text style="margin-left: 35rpx; font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">手续费：</text>
						<text style="font-size:24rpx;font-weight:bold;color:#333333;margin-left: 30rpx;">{{shouxufei}}元</text>
						<text style="font-size:22rpx;font-weight:400;color:rgba(153,153,153,1);margin-left: 30rpx;">{{objcts.feilv}}元/万</text>
						<text style="height:40rpx;background:rgba(204,204,204,1); color: rgba(204,204,204,1);margin-left: 30rpx;margin-right: 39rpx;">|</text>
						<text style="margin-left: 35rpx; font-size:24rpx;font-weight:400;color:rgba(51,51,51,1);">预交金：</text>
						<text style="font-size:24rpx;font-weight:bold;color:#333333;margin-left: 30rpx;">{{yujiaojin}}元</text>
					</view>
				</view>
				
				<!-- 支付金额 -->
				<view style="text-align: center;margin-bottom: 69rpx;">
					<text style="font-size: 30rpx;color: #1678FF;margin-right: 150rpx;">启动总费用:</text>
					<text style="font-size: 30rpx;color: #333333;margin-right: 250rpx;">￥<text style="font-size: 60rpx;color: #333333;">{{que_ren.yujiaojin}}</text></text>
				</view>
				<!-- 订单信息 -->
				<!-- <view class="dindx">
					<text style="font-size: 24rpx;color: #999999;">订单信息</text>
					<text style="font-size: 26rpx;color: #333333;">启动总费用</text>
				</view> -->
				<view class="xiant"></view>
				<!-- 支付账户 -->
				<view class="dindx" style="margin-top: 20rpx;">
					<text style="font-size: 24rpx;color: #999999;">支付账户</text>
					<text style="font-size: 26rpx;color: #333333;">{{que_ren.card[0].name}}({{que_ren.card[0].bc_bank_number.last}})</text>
				</view>

				<button class="qr" @tap="queren">确认支付</button>
				<!-- @tap="querens" -->
			</view>
		</uni-popup>
		<!-- 支付弹框1 -->
		
		<!-- 支付弹框2 -->
		<uni-popup ref="popupk" type="center" style="margin-top: 10rpx;">
			<view class="popsks">
				<view class="qsrs" @tap="close">
					<image src="../../static/quxiao.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
				</view>
				<view style="margin-top: 30rpx;display: inline-block;">
					<text style="font-size: 28rpx;color: #333333;margin-left: 36rpx;font-weight:bold;">请输入支付验证码</text>
				</view>
				<button type="primary" class="login-sendmsg-btn" @tap="getVCode">{{vcodeBtnName}}</button>
				<!-- 电话号码提示 -->
				<view class="grace-rows grace-flex-vcenter" style="margin-left: 36rpx;margin-top: 9rpx;">
					<text style="font-size: 22rpx;color: #999999;">验证码将发送至手机：{{que_ren.card[0].phones}}</text>
				</view>
				<input type="number" focus style="width: 200rpx;margin-left: 185rpx;margin-top: 25rpx;font-size: 50rpx;"
				 :selection-start="-2" :maxlength="code_len" v-model="yanzhengma" @input="yanzms" />
				<view style="border-bottom: 2rpx solid #999999;width: 200rpx;margin-left: 150rpx;"></view>
			</view>
		</uni-popup>
		<!-- 支付弹框2 -->
		<!-- 鉴权 -->
		<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
			<view class="content2" slot="content" style="text-align: center;">
				<text style="font-size: 26rpx;">验证码已发送至您</text></br>
				<text style="font-size: 24rpx;">尾号{{ yuliushouji }}的手机</text>
				<input @input="jianquanjianzhenma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx"
				 placeholder="请输入验证码" />
			</view>
			<view slot="btns" class="grace-space-between">
				<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
				<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
			</view>
		</graceDialog>
		<!-- 鉴权 -->
	</view>
</template>

<script>
	var myDate = new Date();
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import MinPopup from '@/components/min-popup/min-popup.vue';
	export default {
		components: {
			EiCalendar,
			uniPopup,
			graceDialog,
			MinPopup
		},
		data() {
			return {
				windowHeight: "100%",
				checkInpu: false,
				checkInp: false,
				checkIn: false,
				checkI: false,
				show_pop: false,
				show: false,
				vcodeBtnName: "获取验证码",
				rad: true,
				zhangdanjine: '',
				yanzhengma: '',
				card: {
					bank: {
						back_color: ''
					},
					bc_bank_number: {
						last: ''
					}
				},
				yijianquan: 0,
				back_color: '',
				//点击支付的上传对象
				objcts: {
					bill_money: 0,
					dates: [],
					num: 0,
					card_id: '',
					yujiaojin: '0',
					feilv: 0,
					souxufei: '0'
				},
				//是否同意协议
				is_xuanzhong: false,
				date: [],
				customDate: [],
				//返回值是否可用
				is_go: false,
				//点击支付获取的对象
				que_ren: {
					card: [{
						bc_bank_number: {
							last: ''
						},
						phones: ''
					}]
				},
				code: '',
				daojishi_time: 60,
				// 鉴权
				show3: false,
				yuliushouji: '', //预留手机
				jianquan: {
					yuliushouji: '',
					order_num: '',
					sms_code: ''
				},
				code_len: 4, // 验证码长度
				yujiaojin: '0',
				shouxufei: 0,
				msg:''
			}
		},
		onLoad(opt) {
			console.log(opt)
			var that = this;
			//获取卡id
			this.$data.objcts.card_id = opt.card_id
			// console.log(that.lochost)
			that.req.post(that.lochost + '/mytrunk/souxin/jiazai_shengcheng', {
					card_id: opt.card_id
				}, {}, function(res) {
					// console.log(res.data.card);
					if (res.code == 200) {
						that.$data.card = res.data.card;
					} else {
						
						uni.showToast({
							title: res.msg
						})
					}


				}),
				uni.getSystemInfo({
					success: (res) => {
						this.windowHeight = res.windowHeight + "px";
					}
				})
		},
		onShow() {},
		methods: {
			//点击支付
			open() {
				var that = this;
				if (that.yijianquan === 0) {
					that.req.mypost(
						that.lochost + '/mytrunk/mypassageway/channel_authentication', {
							types: '3,4',
							card: this.card.id
						},
						function(res) {
							that.msg = res.msg
							if (res.code == 200) {
								if (res.data.is_need_SMS || res.data.is_need_SMS == 0) {
									var is_need_SMS = res.data.is_need_SMS;
									if (is_need_SMS == 0) {
										that.yijianquan = 1;
										that.shengchengdingdan();
									} else if (is_need_SMS == 1) {
										that.yijianquan = 1;
										that.show3 = true
										that.jianquan.yuliushouji = res.data.phone


									} else if (is_need_SMS == 2) {
										that.yijianquan = 1;
										uni.navigateTo({
											url: '/pages/souxin_view/souxin_view?url=' + res.data.url
										})
									}
								} else {
									that.shengchengdingdan();
								}
							} else {
								// that.shengchengdingdan();
								
								uni.showToast({
									title: that.msg,
									icon: 'none'
								})
								
							}
						})
					that.yijianquan = 1;
				} else {
					that.shengchengdingdan();
				}

			},
			// 验证码输入框选择了确认
			confirm3: function() {
				if (this.jianquan.sms_code == '') {
					uni.showToast({
						title: '请输入验证码'
					})
				} else {
					var vm = this;
					this.req.mypost(
						this.lochost + '/mytrunk/mypassageway/confirm_channel_authentication', {
							order_num: this.jianquan.order_num,
							sms_code: this.jianquan.sms_code,
						},
						function(res) {
							vm.show3 = false
							// vm.get_tongdao();
							vm.msg_show(res.msg);
							if (res.code == 200) {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								vm.shengchengdingdan()
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								vm.shengchengdingdan()
							}
						}
					)
				}
			},

			// 支付弹框
			shengchengdingdan() {
				var that = this;
				var objec = this.$data.objcts;

				var is_xuanzhong = this.$data.is_xuanzhong;
				var is_go = this.$data.is_go;
				if (!is_xuanzhong) {
					uni.showToast({
						title: '请同意星火计划授信还款服务协议',
						icon: 'none'
					})
					return;
				}
				if (!is_go) {
					uni.showToast({
						title: that.msg,
						icon: 'none'
					})
					return;
				}
				// console.log(objec);
				// return
				that.req.mypost(that.lochost + '/mytrunk/souxin/shengcheng_souxin', objec, function(res) {
					// uni.hideLoading();
					console.log(res);
					if (res.code == 200) {
						that.$data.que_ren = res.data;
						that.$data.shouxufei = res.data.shouxufei
						that.$data.yujiaojin = res.data.newyujiao
						that.$refs.popup.open()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})

			},
			//输入验证码
			yanzms: function(obj) {
				console.log(obj)
				var code = obj.detail.value;
				this.$data.code = code;
				console.log(this.$data.code.length)
				if (this.$data.code.length == 4) {
					this.querens()
				}
			},
			//鉴权验证码输入
			jianquanjianzhenma(res) {
				var value = res.detail.value;
				this.jianquan.sms_code = value;
			},
			//确认支付1
			querens: function() {
				var obj = {};
				obj.phone = this.$data.que_ren.card[0].bc_mobile;
				obj.code = this.$data.code;
				console.log(obj.code)
				var that = this;
				var url = that.lochost + '/mytrunk/souxin/confirm_souxin';
				that.req.mypost(url, obj, function(res) {
					console.log(res.msg);
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						var guoqu = function() {
							var myurl = '/pages/Details_plan/details_plans?id=' + res.data.id;
							uni.navigateTo({
								url: myurl
							})
						}
						that.close();


						setTimeout(guoqu, 1000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						// that.close();
					}
				})
			},
			// 确认支付2
			queren() {
				
				this.close();
				this.$refs.popupk.open()
			},
			closeDialog3() {
				this.show3 = false
			},
			//发送验证码
			getVCode: function() {
				var vcodeBtnName = this.$data.vcodeBtnName;
				if (vcodeBtnName != '获取验证码') {
					return;
				}
				var shuju = this.$data.que_ren;
				var phone = shuju.card[0].bc_mobile;
				// console.log(phone);
				var that = this;
				var url = that.lochost + '/mytrunk/souxin/get_code';
				that.req.post(url, {
					phone: phone
				}, {}, function(res) {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							// icon::'none'
						})
						that.daojishi();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//倒计时
			daojishi: function() {
				var that = this;
				var huidiao = function() {
					var num = that.$data.daojishi_time;
					num--;
					if (num <= 0) {
						that.$data.daojishi_time = 60;
						that.$data.vcodeBtnName = '获取验证码'
						return 0;
					} else {
						that.$data.vcodeBtnName = num + '秒';
						that.$data.daojishi_time = num;
					}
					setTimeout(huidiao, 1000);
				}
				huidiao();
			},
			// 支付弹框取消按钮
			close() {
				this.$refs.popup.close()
				this.$refs.popupk.close()
			},
			radios() {
				this.rad = false
			},
			//输入账单金额事件
			morenbishu: function(obj) {
				// console.log(obj)

				var shuzi = obj.detail.value;
				this.objcts.bill_money = shuzi;
				if (shuzi >= 2000) {
					this.huoqu();
					
				}
				// var that = this;
				// if (shuzi >= 2000) {
				// 	this.$data.objcts.bill_money = shuzi;
				// 	var objcts = this.objcts;
				// 	var newobj = {
				// 		bill_money: shuzi,
				// 		card_id: objcts.card_id
				// 	}
				// 	this.req.mypost(this.lochost + '/mytrunk/souxin/jiazai_shengcheng', newobj,  function(res) {
				// 		console.log(res);
				// 		if (res.code == 200) {
				// 			that.$data.objcts.bill_money = res.data.bill_money;
				// 			that.$data.objcts.dates = res.data.dates;
				// 			that.$data.objcts.feilv = res.data.feilv;
				// 			that.$data.objcts.num = res.data.num;
				// 			that.$data.objcts.yujiaojin = res.data.yujiaojin;
				// 			that.$data.objcts.souxufei = res.data.souxufei;
				// 			that.$data.date = res.data.dates;
				// 			that.$data.is_go = true;
				// 		} else {
				// 			uni.showToast({
				// 				title: res.msg,
				// 				icon:'none'
				// 			})
				// 			that.$data.is_go = false;
				// 		}
				// 	})
				// }
			},
			huoqu: function(obj) {
				// console.log(obj);
				// return
				this.objcts.dates = obj;
				var that = this;
				// this.$data.objcts.bill_money = shuzi;
				var objcts = this.objcts;
				// console.log(objcts);
				// var newobj = {
				// 	bill_money: this.objcts.bill_money,
				// 	card_id: objcts.card_id
				// }
				this.req.mypost(this.lochost + '/mytrunk/souxin/jiazai_shengcheng', objcts, function(res) {
					console.log(res.msg);
					if (res.code == 200) {
						that.$data.objcts.bill_money = res.data.bill_money;
						that.$data.objcts.dates = res.data.dates;
						that.$data.objcts.feilv = res.data.feilv;
						that.$data.objcts.num = res.data.num;
						that.$data.objcts.yujiaojin = res.data.yujiaojin;
						that.$data.objcts.souxufei = res.data.souxufei;
						that.$data.date = res.data.dates;
						that.$data.is_go = true;
					} else {
						that.$data.is_go = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						
					}
				})
			},


			//单选框选择
			giabian: function(obj) {
				console.log(obj)
				if (obj.detail.value == 1) {
					this.$data.is_xuanzhong = true;
				}
			},
			disabledDate(date) {
				const start = new Date();
				// 昨天
				const start_zuo = new Date(myDate.getTime() - 24 * 60 * 60 * 1000);
				// 今天
				const start_jin = new Date(myDate.getTime());
				// 下月底
				const date_end = new Date(); //0 表示1月
				// date_end.setDate(0)
				date_end.setMonth(date_end.getMonth() + 2);
				// 日期设置为0号, 0表示1号的前一天
				let lastDay = date_end.setDate(0);
				const end_date = new Date(lastDay).getTime();
				if (start.getHours() >= 16) {
					return date.getTime() <= start_jin || date.getTime() >= end_date;
				} else {
					return date.getTime() <= start_zuo || date.getTime() >= end_date;
				}

			},
			//修改天数
			change: function(obj) {
				obj.sort();
				this.$data.date = obj;
				this.$data.objcts.dates = obj;
			}
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.code-input {
		height: 0;
		width: 0;
		display: inline-block;
	}

	.code-input-item {
		width: 80rpx;
		height: 60rpx;
		border: 2rpx solid #999999;
		display: inline-block;
		/* justify-content: center; */
		text-align: center;
		color: #999999;
	}

	.check {
		height: 60rpx;
		width: 80rpx;
		/* margin-left: 2rpx; */
		border: 2rpx solid #999999;
		display: inline-block;
		color: #999999;
	}

	.checkInput {
		padding: 10rpx;
		margin-left: 15rpx;
		z-index: 999;
		font-size: 40rpx;
		margin-top: -6rpx;
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
		/* margin: 25rpx 30rpx; */
		transform: translateY(25rpx);
		margin-left: 30rpx;
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

	.je {
		margin-top: 10rpx;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.zf {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-top: 2rpx;
	}

	.bus_n {
		width: 500rpx;
		height: 90rpx;
	}

	.popsks {
		width: 550rpx;
		height: 380rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-top: -360rpx;
	}

	.qsrs {
		transform: translateY(20rpx);
		margin-left: 20rpx;
		margin-bottom: 30rpx;
	}

	.popups {
		width: 750rpx;
		height: 701rpx;
		background-color: #FFFFFF;
		/* border-radius: 10rpx; */
	}

	.xiant {
		border: 2rpx solid rgba(204, 204, 204, 1);
		margin-top: 20rpx;
	}

	.zhifus {
		width: 52rpx;
		height: 32rpx;
		vertical-align: middle;
		display: inline-block;
		transform: translateX(276rpx);
		padding-top: 20rpx;
	}

	.dindx {
		display: flex;
		justify-content: space-between;
		margin: 0 24rpx;
	}

	.login-sendmsg-btn {
		display: inline-block;
		border: 1rpx solid #1C68DA !important;
		background: none !important;
		color: #1C68DA !important;
		width: 180rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx !important;
		margin-left: 59rpx;
		transform: translateY(10rpx);
	}

	.qx {
		position: absolute;
		margin-left: 701rpx;
		margin-top: -34rpx;
	}

	.qr {
		display: inline-block;
		width: 500rpx;
		height: 90rpx;
		background-color: #1678FF;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		margin-top: 100rpx;
		margin-left: 124rpx;
		/* margin-bottom: -9rpx; */
	}
</style>
