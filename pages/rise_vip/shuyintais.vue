<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<!-- 进度条 -->
			<view class="grace-space-between" style="margin-top: 16rpx;padding: 0 24rpx;">
				<view class="grace-flex-center" style="background-image:url(../../static/cloud_brush_danghang1.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">1.支付信息</text>
				</view>
				<view class="grace-flex-center" style="background-image:url(../../static/guidance_bg.png);background-repeat: no-repeat; width: 350rpx;height: 40rpx;background-size: contain;">
					<text style="font-size:28rpx;font-weight:400;color:rgba(255,255,255,1)">2.收款信息</text>
				</view>
			</view>

			<view style="margin: 31rpx auto;  width:702rpx;height:252rpx;box-shadow:0px 2rpx 6rpx 0px rgba(129,78,171,0.3);border-radius:20rpx;">
				<view style="width:702rpx;height:95rpx;background:rgba(255,255,255,1);">
					<text style="margin-left: 15rpx; line-height: 90rpx; font-size:32rpx;font-weight:bold;color:#1678FF;">收款信息|<text
						 style="color: #FC5F00;margin-left: 15rpx;">R</text>eceivables <text style="color: #FC5F00;margin-left: 20rpx;">I</text>nformation</text>
				</view>
				<view class="grace-rows grace-flex-vcenter" style="margin:5rpx 0; width:702rpx;height:150rpx;background:rgba(255,255,255,1);border-radius: 0 0 20rpx 20rpx;"
				 @tap="showDialog2">
					<text style="margin-left: 19rpx;font-size:40rpx;font-weight:400;color:rgba(0,0,0,1);">到账金额:</text>
					<view class="grace-columns" style="text-align: center;">
						<view>
							<text style="font-size:30rpx;font-weight:400;color:rgba(252,95,0,1);">￥</text>
							<text style="font-size: 30rpx;">{{ money }}</text>
						</view>
						<view style="width:500rpx;height:1rpx;background:rgba(51,51,51,1);opacity:0.5;margin-top: 13rpx;"></view>
					</view>
				</view>
			</view>

			<view @tap="submit" class="bmit">
				<text style="font-size:30rpx;font-weight:400;color:rgba(255,255,255,1);">确认</text>
			</view>
			<!-- <image @tap="Goto('/pages/credit_card_record/credit_card_record')" src="../../static/yunshuajilu.png" style="width:170rpx;height: 170rpx;position: relative;margin-left: 550rpx;margin-top: 20rpx; "></image> -->

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
						<view @tap="qiehuanshoukuan(item)" v-for="(item,index) in shoukuanzhanghu_list" :key="index" class="grace-rows grace-flex-vcenter"
						 style="height: 80rpx;border-bottom: 2rpx solid #F7F7F7; ">
							<image :src="item.bank_icon_color" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:28rpx;font-weight:400;color:rgba(0,0,0,1);">{{item.bc_bank_name}}</text>
						</view>
						<view @tap="Goto('/pages/add_savings_card/add_savings_card')" class="grace-rows grace-flex-vcenter" style="height: 80rpx;">
							<image src="../../static/tianjia.png" style="width: 38rpx;height: 38rpx;margin-left: 30rpx;"></image>
							<text style="margin-left: 25rpx; font-size:30rpx;font-weight:400;color:rgba(0,0,0,1);">添加储蓄卡</text>
						</view>
					</scroll-view>
				</view>
			</graceBottomDialog>



			<!-- 消费地区遮罩 -->
			<!-- 			<mpvue-city-picker
			:deepLength="deepLength"
			:themeColor="themeColor" 
			ref="mpvueCityPicker1" 
			:pickerValueDefault="cityPickerValueDefault1" 
			@onConfirm="onConfirm1"></mpvue-city-picker> -->


			<!-- 新地区选择 -->
			<graceAddressPicker :channel_id="channel_id" :show="show4" @confirm="confirm1" :level="2" @close="close1"
			 cancelTColor="关闭"></graceAddressPicker>

			<!-- 验证码弹窗 -->
			<graceDialog :isTitle="false" :show="show3" :isCloseBtn="false" width='500rpx'>
				<view class="content2" slot="content" style="text-align: center;">
					<!-- <text>请输入验证码</text> -->
					<text style="font-size: 26rpx;">验证码已发送至您手机</text></br>
					<input v-model="yanzhengma" style="margin-top: 20rpx; height: 80rpx; border-bottom:#B2B2B2 solid 2rpx" placeholder="请输入验证码" />
				</view>
				<view slot="btns" class="grace-space-between">
					<text class="grace-dialog-buttons" @tap="closeDialog3">关闭</text>
					<text class="grace-dialog-buttons grace-blue" @tap="confirm3">确认</text>
				</view>
			</graceDialog>
			<!-- 云刷验证短信确认 -->
			<uni-popup ref="popup" type="center" :maskClick="false">
				<view class="popup" >
					<view style="position: absolute;right: 10rpx;top:10rpx;" @tap="quxaos">
						<image src="../../static2/quxiao.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
					</view>
					<view style="text-align: center;transform: translateY(40rpx);">
						<text>{{show_str}}</text>
					</view>
					<view style="transform: translateY(60rpx);">
						<view style="display: inline-block;transform: translateY(30rpx);margin-left: 20rpx;">短信验证码：</view>
						<input v-model="qr_yanzhengma" style="height: 20rpx; border-bottom:#B2B2B2 solid 2rpx;display: inline-block;margin-left: 190rpx;font-size: 26rpx;margin-top: -20rpx;text-align: center;"
						 placeholder="请输入验证码" />
					</view>
					<view class="sub_betw" @tap="yansbumi">
						<text>确认</text>
					</view>
				</view>
			</uni-popup>

		</view>
	</gracePage>
</template>

<script>
	// 验证码
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import gracePage from "../../graceUI/components/gracePage.vue";
	// 遮罩层
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	// 地区选择
	// import mpvuePicker from '../../graceUI/threeComponents/mpvuePicker.vue';
	// import mpvueCityPicker from '../../graceUI/threeComponents/mpvueCityPicker.vue';
	// 新地区选择
	import graceAddressPicker from '../../graceUI/components/graceAddressPicker.vue';
	export default {
		data() {
			return {
				coupon: '',
				coupon_id: '',
				shoukuanname: '暂无收款账户',
				shoukuanzhanghu_list: [],
				show1: false,
				show2: false,
				show4: false,
				bc_id: '', //支付id
				channel_id: '', //通道id
				card_id: '', //收款id
				pay_money: '', //要刷的钱
				money: '暂无到账金额', //收款的钱
				deepLength: 2,
				themeColor: '#007AFF', //颜色
				cityText1: "点击选择", //文本
				cityPickerValueDefault1: [1, 0],
				//记录全部信息用于表单提交
				city1: null,
				level: 2,
				c_code: '',
				// 验证码
				show3: false,
				yuliushouji: '',
				yanzhengma: '', //验证码
				order_num: '', //订单号
				merchant_id: '',
				channels_id: '',
				is_jump_url: '',
				show_str: '',
				qr_yanzhengma: '',
				zfqdid: '', // 云刷短信确认支付渠道,
				zf_order_num: '',
				tongdaoname: ''

			}
		},
		onLoad: function(opt) {
			console.log(opt);
			var vm = this
			
			// vm.coupon=opt.coupon;
			// vm.coupon_id=opt.coupon_id;
			vm.bc_id = opt.bc_id
			vm.channels_id = opt.channel_id
			vm.pay_money = opt.pay_money
			vm.money = opt.num
			vm.tongdaoname = opt.tongdaoname
			vm.req.post(
				vm.lochost + '/index/index?method=savings_card_list', {
					pc_id: vm.channel_id
				}, {},
				function(res) {
					console.log(res.data);
					vm.shoukuanzhanghu_list = res.data;
					vm.qiehuanshoukuan(vm.shoukuanzhanghu_list[0]);
					// vm.shou_money(); 
					console.log(vm.shoukuanzhanghu_list);
				}
			)
			// 获取地区信息
			vm.req.post(
				vm.lochost + '/index/index?method=default_address', {}, {},
				function(res) {
					console.log(res);
					vm.cityText1 = res.data.city
					vm.c_code = res.data.city_code
				}
			)

		},
		onBackPress(){
			uni.navigateTo({
				url: '/pages/cloud_brush/cloud_brush1'
			})
			return true;
		},
		methods: {
			// 取消云刷短信确认弹框
			quxaos(){
				this.$refs.popup.close()
			},
			// 显示验证码输入框
			showDialog3: function() {
				this.show3 = true;
			},
			// 关闭输入框
			closeDialog3: function() {
				this.show3 = false;
			},
			// 验证码输入框选择了确认
			confirm3: function() {
				if (this.yanzhengma === '') {
					this.msg_show('请输入验证码')
				} else {
					var vm = this;
					this.req.post(
						this.lochost + '/index/index?method=confirm_channel_authentication', {
							order_num: this.order_num,
							sms_code: this.yanzhengma,
							type: 3
						}, {},
						function(res) {
							vm.closeDialog3();
							var is_need_SMS = res.data.is_need_SMS;
							if (is_need_SMS === 0) {
								vm.msg_show(res.msg);
								setTimeout(function() {
									vm.reto('/pages/credit_card_record/credit_card_record')
								}, 500);
							} else if (is_need_SMS === 2) {
								uni.redirectTo({
									url: '/pages/web_view/webs_view?url=' + res.data.url
								})
								// vm.Goto('/pages/web_view/web_view?url='+res.data.url);
							}

							// 跳转去哪？
						}
					)
				}

			},


			submit() {
				var vm = this;
				if (vm.c_code === '' || vm.card_id === '') {
					vm.msg_show('请将信息填写完整');
				} else {
					var obj = {
						channel_id: vm.channels_id,
						bc_id: vm.bc_id,
						card_id: vm.card_id,
						money: vm.pay_money,
						c_code: vm.c_code,
						merchant_id: vm.merchant_id
					}
					vm.req.mypost(
						vm.lochost + '/index/index?method=cloud_brush', obj, 
						function(res) {
							console.log(res);
							if(res.code == 200){
								vm.is_jump_url = res.data.is_jump_url
								if (res.data.is_jump_url == 1) {
									vm.Goto('/pages/web_view/webs_view?url=' + res.data.jump_url);
									console.log(res.data.jump_url);
								
								} else if (res.data.is_jump_url == 2) {
									vm.$refs.popup.open()
									vm.show_str = res.data.show_str
									vm.zfqdid = res.data.channel_id
									vm.zf_order_num = res.data.order_num
								} else if (res.data.is_jump_url == 0) {
									vm.msg_show(res.msg);
									setTimeout(function() {
										vm.reto('/pages/credit_card_record/credit_card_record')
									}, 500);
								}
							}else{
								vm.msg_show(res.msg);
							}
							
						}
					)
				}
			},
			// 云刷短信确认
			yansbumi() {
				var vm = this
				vm.req.mypost(
					vm.lochost + '/index/index?method=cloud_pay_confirm', {
						channel_id: vm.zfqdid,
						sms_code: vm.qr_yanzhengma,
						order_num: vm.zf_order_num
					},
					function(res) {
						console.log(res);
						vm.$refs.popup.close()
						if (res.data.is_jump_url == 1) {
							vm.Goto('/pages/web_view/webs_view?url=' + res.data.jump_url);
						} else {
							vm.msg_show(res.msg);
							setTimeout(function() {
								vm.reto('/pages/credit_card_record/credit_card_record')
							}, 500);
						}

					}
				)
			},
			// shou_money(){
			// 	var vm=this
			// 	vm.req.post(
			// 	vm.lochost+'/mytrunk/mycloudbrush/yun_account_get',
			// 	{bc_id:vm.bc_id,money:vm.pay_money,channel_id:vm.channel_id,coupon:vm.coupon},
			// 	{},
			// 	function(res){
			// 		vm.money=res.data.money
			// 	}
			// 	)
			// },
			qiehuanshoukuan(item) {
				this.card_id = item.bc_id
				this.shoukuanname = item.bc_bank_name
				this.closeDialog1()
			},
			showDialog1() {
				this.show1 = true;
			},
			closeDialog1() {
				this.show1 = false;
			},
			showDialog2() {
				this.show2 = true;
			},
			closeDialog2() {
				this.show2 = false;
			},
			// 新地区选择
			close1: function() {
				this.show4 = false;
			},
			open1: function() {
				this.show4 = true;
			},
			confirm1: function(e) {
				// 返回选中城市的编号及文本信息
				console.log(e);
				this.c_code = e.codes[0];
				this.cityText1 = e.names[0];
				this.close1();
			},
			// cityPicker1 : function(){
			// 	this.$refs.mpvueCityPicker1.show();
			// },
			// onConfirm1(e) {
			// 	var cityText1  = e.label;
			// 	var cityValue1 = e.value;
			// 	var cityCode1  = e.cityCode;
			// 	console.log(cityText1, cityValue1, cityCode1);
			// 	this.cityText1 = cityText1;
			// 	this.cityPickerValueDefault1 = cityValue1;
			// 	this.city1 = e;
			// },
		},
		components: {
			graceDialog,
			gracePage,
			graceBottomDialog,
			// mpvuePicker,
			// mpvueCityPicker

			graceAddressPicker
		}
	}
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
		overflow: hidden;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}

	.bmit {
		margin-top: 221rpx;
		width: 500rpx;
		height: 90rpx;
		background: #1678FF;
		box-shadow: 0px 2rpx 5rpx 0px rgba(67, 67, 67, 0.3);
		border-radius: 20rpx;
		line-height: 90rpx;
		text-align: center;
		margin-left: 140rpx;
	}

	/*包含以下四种的链接*/
	a {
		text-decoration: none;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	/*正常的未被访问过的链接*/
	a:link {
		text-decoration: none;
	}

	/*已经访问过的链接*/
	a:visited {
		text-decoration: none;
	}

	/*鼠标划过(停留)的链接*/
	a:hover {
		text-decoration: none;
	}

	/* 正在点击的链接*/
	a:active {
		text-decoration: none;
	}

	.popup {
		width: 500rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.sub_betw {
		position: absolute;
		bottom: 0;
		width: 500rpx;
		height: 70rpx;
		background-color: rgba(79, 186, 254, 1);
		border-radius: 0 0 10rpx 10rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
	}
</style>
